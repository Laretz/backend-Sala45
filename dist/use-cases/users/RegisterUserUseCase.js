"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterUserUseCase = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class RegisterUserUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(userData) {
        const existingUser = await this.userRepository.findByEmail(userData.email);
        if (existingUser) {
            throw new Error('Email já está em uso');
        }
        const saltRounds = 10;
        const hashedPassword = await bcryptjs_1.default.hash(userData.password, saltRounds);
        const user = await this.userRepository.create({
            ...userData,
            password: hashedPassword,
        });
        const token = this.generateToken(user.id);
        return {
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
            message: 'Usuário registrado com sucesso',
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
exports.RegisterUserUseCase = RegisterUserUseCase;
//# sourceMappingURL=RegisterUserUseCase.js.map