"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const client_1 = require("@prisma/client");
dotenv_1.default.config();
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((req, res, next) => {
    req.prisma = prisma;
    next();
});
const auth_1 = __importDefault(require("./http/routes/auth"));
const rooms_1 = __importDefault(require("./http/routes/rooms"));
const meetings_1 = __importDefault(require("./http/routes/meetings"));
app.use('/api/auth', auth_1.default);
app.use('/api/rooms', rooms_1.default);
app.use('/api/meetings', meetings_1.default);
app.get('/api/health', (req, res) => {
    res.json({ message: 'Servidor funcionando!', timestamp: new Date().toISOString() });
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Algo deu errado!',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Erro interno do servidor'
    });
});
app.use('*', (req, res) => {
    res.status(404).json({ error: 'Rota não encontrada' });
});
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});
process.on('SIGINT', async () => {
    console.log('\n🔄 Encerrando servidor...');
    await prisma.$disconnect();
    process.exit(0);
});
exports.default = app;
//# sourceMappingURL=server.js.map