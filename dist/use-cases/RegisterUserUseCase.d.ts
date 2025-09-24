import { IUserRepository } from '../repositories/IUserRepository';
import { IRegisterUserUseCase } from '../repositories/IAuthUseCases';
import { CreateUserData, AuthResponse } from '../domain/User';
export declare class RegisterUserUseCase implements IRegisterUserUseCase {
    private userRepository;
    constructor(userRepository: IUserRepository);
    execute(userData: CreateUserData): Promise<AuthResponse>;
    private generateToken;
}
//# sourceMappingURL=RegisterUserUseCase.d.ts.map