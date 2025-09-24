import { PrismaClient } from '@prisma/client';
import { UserRepository } from '../../repositories/prisma-repositories/UserRepository';
import { RegisterUserUseCase } from '../users/RegisterUserUseCase';
import { LoginUserUseCase } from '../users/LoginUserUseCase';
import { GetUserUseCase } from '../users/GetUserUseCase';

export class AuthUseCaseFactory {
  private static userRepository: UserRepository;

  private static getUserRepository(prisma: PrismaClient): UserRepository {
    if (!this.userRepository) {
      this.userRepository = new UserRepository(prisma);
    }
    return this.userRepository;
  }

  static createRegisterUserUseCase(prisma: PrismaClient): RegisterUserUseCase {
    const userRepository = this.getUserRepository(prisma);
    return new RegisterUserUseCase(userRepository);
  }

  static createLoginUserUseCase(prisma: PrismaClient): LoginUserUseCase {
    const userRepository = this.getUserRepository(prisma);
    return new LoginUserUseCase(userRepository);
  }

  static createGetUserUseCase(prisma: PrismaClient): GetUserUseCase {
    const userRepository = this.getUserRepository(prisma);
    return new GetUserUseCase(userRepository);
  }
}