"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            res.status(401).json({ error: 'Token de acesso requerido' });
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
            select: { id: true, name: true, email: true }
        });
        if (!user) {
            res.status(401).json({ error: 'Usuário não encontrado' });
            return;
        }
        req.user = user;
        next();
    }
    catch (error) {
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
exports.authenticateToken = authenticateToken;
//# sourceMappingURL=auth.js.map