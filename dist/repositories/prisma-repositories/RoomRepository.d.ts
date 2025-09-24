import { PrismaClient, Room } from '@prisma/client';
import { IRoomRepository } from '../IRoomRepository';
export declare class RoomRepository implements IRoomRepository {
    private prisma;
    constructor(prisma: PrismaClient);
    findAll(): Promise<Room[]>;
    findById(id: number): Promise<Room | null>;
    create(roomData: Omit<Room, 'id'>): Promise<Room>;
    update(id: number, roomData: Partial<Room>): Promise<Room>;
    delete(id: number): Promise<void>;
}
//# sourceMappingURL=RoomRepository.d.ts.map