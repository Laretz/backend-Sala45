import { User } from '@prisma/client';
import { IUserRepository } from '../../repositories/IUserRepository';
import { IGetUserUseCase } from '../../repositories/IAuthUseCases';

export class GetUserUseCase implements IGetUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(userId: number): Promise<User | null> {
    return await this.userRepository.findById(userId);
  }
}