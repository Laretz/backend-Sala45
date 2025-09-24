const express = require('express');
const { body, validationResult } = require('express-validator');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Aplicar autenticação em todas as rotas
router.use(authenticateToken);

// Validações para criação/edição de reunião
const meetingValidation = [
  body('title')
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Título é obrigatório e deve ter no máximo 200 caracteres'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Descrição deve ter no máximo 1000 caracteres'),
  body('startTime')
    .isISO8601()
    .withMessage('Data/hora de início inválida'),
  body('endTime')
    .isISO8601()
    .withMessage('Data/hora de término inválida'),
  body('roomId')
    .isInt({ min: 1 })
    .withMessage('ID da sala inválido')
];

// Função para verificar conflitos de horário
const checkTimeConflict = async (prisma, roomId, startTime, endTime, excludeMeetingId = null) => {
  const whereClause = {
    roomId: roomId,
    OR: [
      {
        AND: [
          { startTime: { lte: startTime } },
          { endTime: { gt: startTime } }
        ]
      },
      {
        AND: [
          { startTime: { lt: endTime } },
          { endTime: { gte: endTime } }
        ]
      },
      {
        AND: [
          { startTime: { gte: startTime } },
          { endTime: { lte: endTime } }
        ]
      }
    ]
  };

  // Excluir a própria reunião ao editar
  if (excludeMeetingId) {
    whereClause.id = { not: excludeMeetingId };
  }

  const conflictingMeetings = await prisma.meeting.findMany({
    where: whereClause,
    include: {
      user: {
        select: { name: true, email: true }
      }
    }
  });

  return conflictingMeetings;
};

// POST /api/meetings - Criar nova reunião
router.post('/', meetingValidation, async (req, res) => {
  try {
    // Verificar erros de validação
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        error: 'Dados inválidos',
        details: errors.array()
      });
    }

    const { title, description, startTime, endTime, roomId } = req.body;
    const userId = req.user.id;

    // Converter strings para Date
    const start = new Date(startTime);
    const end = new Date(endTime);

    // Validar se a data de início é anterior à de término
    if (start >= end) {
      return res.status(400).json({ error: 'Data de início deve ser anterior à data de término' });
    }

    // Validar se a reunião não é no passado
    if (start < new Date()) {
      return res.status(400).json({ error: 'Não é possível agendar reuniões no passado' });
    }

    // Verificar se a sala existe
    const room = await req.prisma.room.findUnique({
      where: { id: roomId }
    });

    if (!room) {
      return res.status(404).json({ error: 'Sala não encontrada' });
    }

    // Verificar conflitos de horário
    const conflicts = await checkTimeConflict(req.prisma, roomId, start, end);
    if (conflicts.length > 0) {
      return res.status(409).json({ 
        error: 'Conflito de horário detectado',
        conflicts: conflicts.map(meeting => ({
          id: meeting.id,
          title: meeting.title,
          startTime: meeting.startTime,
          endTime: meeting.endTime,
          user: meeting.user.name
        }))
      });
    }

    // Criar reunião
    const meeting = await req.prisma.meeting.create({
      data: {
        title,
        description: description || null,
        startTime: start,
        endTime: end,
        userId,
        roomId
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        room: true
      }
    });

    res.status(201).json({
      message: 'Reunião criada com sucesso',
      meeting
    });
  } catch (error) {
    console.error('Erro ao criar reunião:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// GET /api/meetings - Listar reuniões do usuário
router.get('/', async (req, res) => {
  try {
    const userId = req.user.id;
    const { upcoming } = req.query;

    let whereClause = { userId };
    
    // Filtrar apenas reuniões futuras se solicitado
    if (upcoming === 'true') {
      whereClause.startTime = { gte: new Date() };
    }

    const meetings = await req.prisma.meeting.findMany({
      where: whereClause,
      orderBy: { startTime: 'asc' },
      include: {
        room: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    res.json({ meetings });
  } catch (error) {
    console.error('Erro ao buscar reuniões:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// GET /api/meetings/:id - Obter detalhes de uma reunião
router.get('/:id', async (req, res) => {
  try {
    const meetingId = parseInt(req.params.id);

    if (isNaN(meetingId)) {
      return res.status(400).json({ error: 'ID da reunião inválido' });
    }

    const meeting = await req.prisma.meeting.findUnique({
      where: { id: meetingId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        room: true
      }
    });

    if (!meeting) {
      return res.status(404).json({ error: 'Reunião não encontrada' });
    }

    res.json({ meeting });
  } catch (error) {
    console.error('Erro ao buscar reunião:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// PUT /api/meetings/:id - Editar reunião
router.put('/:id', meetingValidation, async (req, res) => {
  try {
    const meetingId = parseInt(req.params.id);
    const userId = req.user.id;

    if (isNaN(meetingId)) {
      return res.status(400).json({ error: 'ID da reunião inválido' });
    }

    // Verificar erros de validação
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        error: 'Dados inválidos',
        details: errors.array()
      });
    }

    // Verificar se a reunião existe e pertence ao usuário
    const existingMeeting = await req.prisma.meeting.findUnique({
      where: { id: meetingId }
    });

    if (!existingMeeting) {
      return res.status(404).json({ error: 'Reunião não encontrada' });
    }

    if (existingMeeting.userId !== userId) {
      return res.status(403).json({ error: 'Você só pode editar suas próprias reuniões' });
    }

    const { title, description, startTime, endTime, roomId } = req.body;

    // Converter strings para Date
    const start = new Date(startTime);
    const end = new Date(endTime);

    // Validar se a data de início é anterior à de término
    if (start >= end) {
      return res.status(400).json({ error: 'Data de início deve ser anterior à data de término' });
    }

    // Verificar se a sala existe
    const room = await req.prisma.room.findUnique({
      where: { id: roomId }
    });

    if (!room) {
      return res.status(404).json({ error: 'Sala não encontrada' });
    }

    // Verificar conflitos de horário (excluindo a própria reunião)
    const conflicts = await checkTimeConflict(req.prisma, roomId, start, end, meetingId);
    if (conflicts.length > 0) {
      return res.status(409).json({ 
        error: 'Conflito de horário detectado',
        conflicts: conflicts.map(meeting => ({
          id: meeting.id,
          title: meeting.title,
          startTime: meeting.startTime,
          endTime: meeting.endTime,
          user: meeting.user.name
        }))
      });
    }

    // Atualizar reunião
    const updatedMeeting = await req.prisma.meeting.update({
      where: { id: meetingId },
      data: {
        title,
        description: description || null,
        startTime: start,
        endTime: end,
        roomId
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        room: true
      }
    });

    res.json({
      message: 'Reunião atualizada com sucesso',
      meeting: updatedMeeting
    });
  } catch (error) {
    console.error('Erro ao atualizar reunião:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// DELETE /api/meetings/:id - Cancelar reunião
router.delete('/:id', async (req, res) => {
  try {
    const meetingId = parseInt(req.params.id);
    const userId = req.user.id;

    if (isNaN(meetingId)) {
      return res.status(400).json({ error: 'ID da reunião inválido' });
    }

    // Verificar se a reunião existe e pertence ao usuário
    const meeting = await req.prisma.meeting.findUnique({
      where: { id: meetingId }
    });

    if (!meeting) {
      return res.status(404).json({ error: 'Reunião não encontrada' });
    }

    if (meeting.userId !== userId) {
      return res.status(403).json({ error: 'Você só pode cancelar suas próprias reuniões' });
    }

    // Deletar reunião
    await req.prisma.meeting.delete({
      where: { id: meetingId }
    });

    res.json({ message: 'Reunião cancelada com sucesso' });
  } catch (error) {
    console.error('Erro ao cancelar reunião:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

module.exports = router;