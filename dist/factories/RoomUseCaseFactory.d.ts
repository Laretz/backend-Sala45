import { PrismaClient } from '@prisma/client';
import { GetAllRoomsUseCase } from '../use-cases/GetAllRoomsUseCase';
import { GetRoomUseCase } from '../use-cases/GetRoomUseCase';
import { GetRoomMeetingsUseCase } from '../use-cases/GetRoomMeetingsUseCase';
export declare class RoomUseCaseFactory {
    private static roomRepository;
    private static meetingRepository;
    private static getRoomRepository;
    private static getMeetingRepository;
    static createGetAllRoomsUseCase(prisma: PrismaClient): GetAllRoomsUseCase;
    static createGetRoomUseCase(prisma: PrismaClient): GetRoomUseCase;
    static createGetRoomMeetingsUseCase(prisma: PrismaClient): GetRoomMeetingsUseCase;
}
//# sourceMappingURL=RoomUseCaseFactory.d.ts.map