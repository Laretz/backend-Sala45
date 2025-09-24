import { PrismaClient } from '@prisma/client';
import { GetAllRoomsUseCase } from '../rooms/GetAllRoomsUseCase';
import { GetRoomUseCase } from '../rooms/GetRoomUseCase';
import { GetRoomMeetingsUseCase } from '../meetings/GetRoomMeetingsUseCase';
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