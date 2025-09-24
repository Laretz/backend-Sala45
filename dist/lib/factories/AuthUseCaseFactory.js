"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUseCaseFactory = void 0;
const UserRepository_1 = require("../../repositories/UserRepository");
const RegisterUserUseCase_1 = require("../../use-cases/RegisterUserUseCase");
const LoginUserUseCase_1 = require("../../use-cases/LoginUserUseCase");
const GetUserUseCase_1 = require("../../use-cases/GetUserUseCase");
class AuthUseCaseFactory {
    static getUserRepository(prisma) {
        if (!this.userRepository) {
            this.userRepository = new UserRepository_1.UserRepository(prisma);
        }
        return this.userRepository;
    }
    static createRegisterUserUseCase(prisma) {
        const userRepository = this.getUserRepository(prisma);
        return new RegisterUserUseCase_1.RegisterUserUseCase(userRepository);
    }
    static createLoginUserUseCase(prisma) {
        const userRepository = this.getUserRepository(prisma);
        return new LoginUserUseCase_1.LoginUserUseCase(userRepository);
    }
    static createGetUserUseCase(prisma) {
        const userRepository = this.getUserRepository(prisma);
        return new GetUserUseCase_1.GetUserUseCase(userRepository);
    }
}
exports.AuthUseCaseFactory = AuthUseCaseFactory;
//# sourceMappingURL=AuthUseCaseFactory.js.map