import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';

// Carregar variáveis de ambiente
dotenv.config();

// Configurar timezone
process.env.TZ = process.env.TZ || 'America/Sao_Paulo';

// Inicializar Prisma
const prisma = new PrismaClient();

// Criar app Express
const app = express();
const PORT = process.env.PORT || 3001;

// Estender interface Request para incluir prisma
declare global {
  namespace Express {
    interface Request {
      prisma: PrismaClient;
      user?: {
        id: number;
        name: string;
        email: string;
      };
    }
  }
}

// Middlewares
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware para disponibilizar Prisma nas rotas
app.use((req: Request, res: Response, next: NextFunction) => {
  req.prisma = prisma;
  next();
});

// Importar rotas
import authRoutes from './http/routes/auth';
import roomRoutes from './http/routes/rooms';
import meetingRoutes from './http/routes/meetings';

// Usar rotas
app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/meetings', meetingRoutes);

// Rota de teste
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ message: 'Servidor funcionando!', timestamp: new Date().toISOString() });
});

// Middleware de tratamento de erros
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Algo deu errado!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Erro interno do servidor'
  });
});

// Middleware para rotas não encontradas
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🔄 Encerrando servidor...');
  await prisma.$disconnect();
  process.exit(0);
});

export default app;