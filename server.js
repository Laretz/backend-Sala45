const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');

// Carregar variáveis de ambiente
dotenv.config();

// Inicializar Prisma
const prisma = new PrismaClient();

// Criar app Express
const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware para disponibilizar Prisma nas rotas
app.use((req, res, next) => {
  req.prisma = prisma;
  next();
});

// Importar rotas
const authRoutes = require('./routes/auth');
const roomRoutes = require('./routes/rooms');
const meetingRoutes = require('./routes/meetings');

// Usar rotas
app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/meetings', meetingRoutes);

// Rota de teste
app.get('/api/health', (req, res) => {
  res.json({ message: 'Servidor funcionando!', timestamp: new Date().toISOString() });
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Algo deu errado!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Erro interno do servidor'
  });
});

// Middleware para rotas não encontradas
app.use('*', (req, res) => {
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