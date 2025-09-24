import { IUserRepository } from '../../repositories/IUserRepository';
import { ILoginUserUseCase } from '../../repositories/IAuthUseCases';
import { LoginData, AuthResponse } from '../../domain/User';
export declare class LoginUserUseCase implements ILoginUserUseCase {
    private userRepository;
    constructor(userRepository: IUserRepository);
    execute(loginData: LoginData): Promise<AuthResponse>;
    private generateToken;
}
//# sourceMappingURL=LoginUserUseCase.d.ts.map