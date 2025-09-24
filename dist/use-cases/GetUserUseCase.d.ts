import { User } from '@prisma/client';
import { IUserRepository } from '../repositories/IUserRepository';
import { IGetUserUseCase } from '../repositories/IAuthUseCases';
export declare class GetUserUseCase implements IGetUserUseCase {
    private userRepository;
    constructor(userRepository: IUserRepository);
    execute(userId: number): Promise<User | null>;
}
//# sourceMappingURL=GetUserUseCase.d.ts.map