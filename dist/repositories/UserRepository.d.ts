import { PrismaClient, User } from '@prisma/client';
import { IUserRepository } from './IUserRepository';
import { CreateUserData } from '../domain/User';
export declare class UserRepository implements IUserRepository {
    private prisma;
    constructor(prisma: PrismaClient);
    create(userData: CreateUserData): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    findById(id: number): Promise<User | null>;
    update(id: number, userData: Partial<User>): Promise<User>;
    delete(id: number): Promise<void>;
}
//# sourceMappingURL=UserRepository.d.ts.map