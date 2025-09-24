import { Room } from '@prisma/client';
import { IRoomRepository } from '../repositories/IRoomRepository';
import { IGetAllRoomsUseCase } from '../repositories/IRoomUseCases';
export declare class GetAllRoomsUseCase implements IGetAllRoomsUseCase {
    private roomRepository;
    constructor(roomRepository: IRoomRepository);
    execute(): Promise<Room[]>;
}
//# sourceMappingURL=GetAllRoomsUseCase.d.ts.map