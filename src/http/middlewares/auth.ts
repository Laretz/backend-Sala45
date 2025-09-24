import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

interface JwtPayload {
  userId: number;
  email: string;
}

const prisma = new PrismaClient();

export const authenticateToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      res.status(401).json({ error: 'Token de acesso requerido' });
      return;
    }

    // Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    
    // Buscar usuário no banco
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, name: true, email: true }
    });

    if (!user) {
      res.status(401).json({ error: 'Usuário não encontrado' });
      return;
    }

    // Adicionar usuário ao request
    req.user = user;
    next();
  } catch (error: any) {
    if (error.name === 'JsonWebTokenError') {
      res.status(403).json({ error: 'Token inválido' });
      return;
    }
    if (error.name === 'TokenExpiredError') {
      res.status(403).json({ error: 'Token expirado' });
      return;
    }
    
    console.error('Erro na autenticação:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};