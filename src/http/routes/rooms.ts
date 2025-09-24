import { Router } from 'express';
import { authenticateToken } from '../middlewares/auth';
import { RoomController } from '../controllers/RoomController';

const router = Router();
const roomController = new RoomController();

// Aplicar middleware de autenticação a todas as rotas
router.use(authenticateToken);

// GET /api/rooms - Listar todas as salas
router.get('/', (req, res) => roomController.getAll(req, res));

// GET /api/rooms/:id - Obter detalhes de uma sala
router.get('/:id', (req, res) => roomController.getById(req, res));

// GET /api/rooms/:id/meetings/:date - Obter reuniões de uma sala em uma data específica
router.get('/:id/meetings/:date', (req, res) => roomController.getMeetingsByDate(req, res));

export default router;