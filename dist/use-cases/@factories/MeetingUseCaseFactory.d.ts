import { PrismaClient } from '@prisma/client';
import { CreateMeetingUseCase } from '../meetings/CreateMeetingUseCase';
import { GetMeetingUseCase } from '../meetings/GetMeetingUseCase';
import { GetUserMeetingsUseCase } from '../meetings/GetUserMeetingsUseCase';
import { GetRoomMeetingsUseCase } from '../meetings/GetRoomMeetingsUseCase';
import { UpdateMeetingUseCase } from '../meetings/UpdateMeetingUseCase';
import { DeleteMeetingUseCase } from '../meetings/DeleteMeetingUseCase';
import { CheckMeetingConflictUseCase } from '../meetings/CheckMeetingConflictUseCase';
export declare class MeetingUseCaseFactory {
    private static meetingRepository;
    private static roomRepository;
    private static getMeetingRepository;
    private static getRoomRepository;
    static createCreateMeetingUseCase(prisma: PrismaClient): CreateMeetingUseCase;
    static createGetMeetingUseCase(prisma: PrismaClient): GetMeetingUseCase;
    static createGetUserMeetingsUseCase(prisma: PrismaClient): GetUserMeetingsUseCase;
    static createGetRoomMeetingsUseCase(prisma: PrismaClient): GetRoomMeetingsUseCase;
    static createUpdateMeetingUseCase(prisma: PrismaClient): UpdateMeetingUseCase;
    static createDeleteMeetingUseCase(prisma: PrismaClient): DeleteMeetingUseCase;
    static createCheckMeetingConflictUseCase(prisma: PrismaClient): CheckMeetingConflictUseCase;
}
//# sourceMappingURL=MeetingUseCaseFactory.d.ts.map