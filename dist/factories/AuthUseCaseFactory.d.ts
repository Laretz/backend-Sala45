import { PrismaClient } from '@prisma/client';
import { RegisterUserUseCase } from '../use-cases/RegisterUserUseCase';
import { LoginUserUseCase } from '../use-cases/LoginUserUseCase';
import { GetUserUseCase } from '../use-cases/GetUserUseCase';
export declare class AuthUseCaseFactory {
    private static userRepository;
    private static getUserRepository;
    static createRegisterUserUseCase(prisma: PrismaClient): RegisterUserUseCase;
    static createLoginUserUseCase(prisma: PrismaClient): LoginUserUseCase;
    static createGetUserUseCase(prisma: PrismaClient): GetUserUseCase;
}
//# sourceMappingURL=AuthUseCaseFactory.d.ts.map