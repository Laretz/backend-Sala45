import { PrismaClient, User } from '@prisma/client';
import { IUserRepository } from '../IUserRepository';
import { CreateUserData } from '../../domain/User';

export class UserRepository implements IUserRepository {
  constructor(private prisma: PrismaClient) {}

  async create(userData: CreateUserData): Promise<User> {
    return await this.prisma.user.create({
      data: userData,
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id: number): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }

  async update(id: number, userData: Partial<User>): Promise<User> {
    return await this.prisma.user.update({
      where: { id },
      data: userData,
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }
}