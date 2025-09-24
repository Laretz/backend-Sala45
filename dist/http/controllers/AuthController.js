"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const AuthUseCaseFactory_1 = require("../../use-cases/@factories/AuthUseCaseFactory");
class AuthController {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async register(req, res) {
        try {
            const { name, email, password } = req.body;
            if (!name || !email || !password) {
                res.status(400).json({ error: 'Nome, email e senha são obrigatórios' });
                return;
            }
            if (password.length < 6) {
                res.status(400).json({ error: 'Senha deve ter pelo menos 6 caracteres' });
                return;
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                res.status(400).json({ error: 'Email inválido' });
                return;
            }
            const registerUserUseCase = AuthUseCaseFactory_1.AuthUseCaseFactory.createRegisterUserUseCase(this.prisma);
            const result = await registerUserUseCase.execute({ name, email, password });
            res.status(201).json(result);
        }
        catch (error) {
            console.error('Erro no registro:', error);
            res.status(400).json({ error: error.message || 'Erro interno do servidor' });
        }
    }
    async login(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                res.status(400).json({ error: 'Email e senha são obrigatórios' });
                return;
            }
            const loginUserUseCase = AuthUseCaseFactory_1.AuthUseCaseFactory.createLoginUserUseCase(this.prisma);
            const result = await loginUserUseCase.execute({ email, password });
            res.json(result);
        }
        catch (error) {
            console.error('Erro no login:', error);
            res.status(401).json({ error: error.message || 'Erro interno do servidor' });
        }
    }
    async getMe(req, res) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                res.status(401).json({ error: 'Usuário não autenticado' });
                return;
            }
            const getUserUseCase = AuthUseCaseFactory_1.AuthUseCaseFactory.createGetUserUseCase(this.prisma);
            const user = await getUserUseCase.execute(userId);
            if (!user) {
                res.status(404).json({ error: 'Usuário não encontrado' });
                return;
            }
            const { password, ...userWithoutPassword } = user;
            res.json(userWithoutPassword);
        }
        catch (error) {
            console.error('Erro ao buscar usuário:', error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=AuthController.js.map