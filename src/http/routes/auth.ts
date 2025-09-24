import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middlewares/auth';
import { AuthController } from '../controllers/AuthController';

const router = express.Router();
const prisma = new PrismaClient();
const authController = new AuthController(prisma);

// Rota de registro
router.post('/register', (req, res) => authController.register(req, res));

// Rota de login
router.post('/login', (req, res) => authController.login(req, res));

// Rota para obter dados do usuário autenticado
router.get('/me', authenticateToken, (req, res) => authController.getMe(req, res));

export default router;