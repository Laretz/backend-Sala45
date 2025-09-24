import { Room } from '@prisma/client';
import { IRoomRepository } from '../repositories/IRoomRepository';
import { IGetRoomUseCase } from '../repositories/IRoomUseCases';
export declare class GetRoomUseCase implements IGetRoomUseCase {
    private roomRepository;
    constructor(roomRepository: IRoomRepository);
    execute(roomId: number): Promise<Room | null>;
}
//# sourceMappingURL=GetRoomUseCase.d.ts.map