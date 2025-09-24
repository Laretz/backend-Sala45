import { User } from '@prisma/client';
import { CreateUserData, LoginData, AuthResponse } from '../types';
export interface IRegisterUserUseCase {
    execute(userData: CreateUserData): Promise<AuthResponse>;
}
export interface ILoginUserUseCase {
    execute(loginData: LoginData): Promise<AuthResponse>;
}
export interface IGetUserUseCase {
    execute(userId: number): Promise<User | null>;
}
//# sourceMappingURL=IAuthUseCases.d.ts.map