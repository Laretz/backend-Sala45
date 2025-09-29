import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middlewares/auth';
import { MeetingController } from '../controllers/MeetingController';

const router = express.Router();
const prisma = new PrismaClient();
const meetingController = new MeetingController(prisma);

// Aplicar autenticação em todas as rotas
router.use(authenticateToken);

// POST /api/meetings - Criar nova reunião
router.post('/', (req, res) => meetingController.create(req, res));

// GET /api/meetings - Listar reuniões do usuário
router.get('/', (req, res) => meetingController.getAll(req, res));

// GET /api/meetings/check-conflict - Verificar conflitos de horário
router.get('/check-conflict', (req, res) => meetingController.checkConflict(req, res));

// GET /api/meetings/pending - Listar reuniões pendentes (apenas RH/ADMIN)
router.get('/pending', (req, res) => meetingController.getPendingMeetings(req, res));

// GET /api/meetings/:id - Obter reunião específica
router.get('/:id', (req, res) => meetingController.getById(req, res));

// PUT /api/meetings/:id - Atualizar reunião
router.put('/:id', (req, res) => meetingController.update(req, res));

// PUT /api/meetings/:id/approve - Aprovar/Rejeitar reunião (apenas RH/ADMIN)
router.put('/:id/approve', (req, res) => meetingController.approveMeeting(req, res));

// DELETE /api/meetings/:id - Excluir reunião
router.delete('/:id', (req, res) => meetingController.delete(req, res));

export default router;