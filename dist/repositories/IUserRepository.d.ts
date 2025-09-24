import { User } from '@prisma/client';
import { CreateUserData } from '../domain/User';
export interface IUserRepository {
    create(userData: CreateUserData): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    findById(id: number): Promise<User | null>;
    update(id: number, userData: Partial<User>): Promise<User>;
    delete(id: number): Promise<void>;
}
//# sourceMappingURL=IUserRepository.d.ts.map