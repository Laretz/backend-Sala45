import { PrismaClient } from '@prisma/client';
import { RegisterUserUseCase } from '../users/RegisterUserUseCase';
import { LoginUserUseCase } from '../users/LoginUserUseCase';
import { GetUserUseCase } from '../users/GetUserUseCase';
export declare class AuthUseCaseFactory {
    private static userRepository;
    private static getUserRepository;
    static createRegisterUserUseCase(prisma: PrismaClient): RegisterUserUseCase;
    static createLoginUserUseCase(prisma: PrismaClient): LoginUserUseCase;
    static createGetUserUseCase(prisma: PrismaClient): GetUserUseCase;
}
//# sourceMappingURL=AuthUseCaseFactory.d.ts.map