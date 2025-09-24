"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUserUseCase = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class LoginUserUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(loginData) {
        const user = await this.userRepository.findByEmail(loginData.email);
        if (!user) {
            throw new Error('Credenciais inválidas');
        }
        const isPasswordValid = await bcryptjs_1.default.compare(loginData.password, user.password);
        if (!isPasswordValid) {
            throw new Error('Credenciais inválidas');
        }
        const token = this.generateToken(user.id);
        return {
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
            message: 'Login realizado com sucesso',
        };
    }
    generateToken(userId) {
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new Error('JWT_SECRET não está definido');
        }
        return jsonwebtoken_1.default.sign({ userId }, jwtSecret, { expiresIn: '7d' });
    }
}
exports.LoginUserUseCase = LoginUserUseCase;
//# sourceMappingURL=LoginUserUseCase.js.map