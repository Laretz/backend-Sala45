const express = require('express');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Aplicar autenticação em todas as rotas
router.use(authenticateToken);

// GET /api/rooms - Listar todas as salas
router.get('/', async (req, res) => {
  try {
    const rooms = await req.prisma.room.findMany({
      orderBy: { name: 'asc' }
    });

    res.json({ rooms });
  } catch (error) {
    console.error('Erro ao buscar salas:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// GET /api/rooms/:id - Obter detalhes de uma sala específica
router.get('/:id', async (req, res) => {
  try {
    const roomId = parseInt(req.params.id);

    if (isNaN(roomId)) {
      return res.status(400).json({ error: 'ID da sala inválido' });
    }

    const room = await req.prisma.room.findUnique({
      where: { id: roomId },
      include: {
        meetings: {
          where: {
            startTime: {
              gte: new Date()
            }
          },
          orderBy: { startTime: 'asc' },
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true
              }
            }
          }
        }
      }
    });

    if (!room) {
      return res.status(404).json({ error: 'Sala não encontrada' });
    }

    res.json({ room });
  } catch (error) {
    console.error('Erro ao buscar sala:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// GET /api/rooms/:id/meetings/:date - Listar reuniões de uma sala em uma data específica
router.get('/:id/meetings/:date', async (req, res) => {
  try {
    const roomId = parseInt(req.params.id);
    const date = req.params.date;

    if (isNaN(roomId)) {
      return res.status(400).json({ error: 'ID da sala inválido' });
    }

    // Validar formato da data (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      return res.status(400).json({ error: 'Formato de data inválido. Use YYYY-MM-DD' });
    }

    const targetDate = new Date(date);
    if (isNaN(targetDate.getTime())) {
      return res.status(400).json({ error: 'Data inválida' });
    }

    // Definir início e fim do dia
    const startOfDay = new Date(targetDate);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(targetDate);
    endOfDay.setHours(23, 59, 59, 999);

    // Verificar se a sala existe
    const room = await req.prisma.room.findUnique({
      where: { id: roomId }
    });

    if (!room) {
      return res.status(404).json({ error: 'Sala não encontrada' });
    }

    // Buscar reuniões da sala na data especificada
    const meetings = await req.prisma.meeting.findMany({
      where: {
        roomId: roomId,
        startTime: {
          gte: startOfDay,
          lte: endOfDay
        }
      },
      orderBy: { startTime: 'asc' },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    res.json({ 
      room: {
        id: room.id,
        name: room.name,
        capacity: room.capacity,
        location: room.location
      },
      date,
      meetings 
    });
  } catch (error) {
    console.error('Erro ao buscar reuniões da sala:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

module.exports = router;