import { PrismaClient } from '@prisma/client';
import { CreateMeetingUseCase } from '../../use-cases/CreateMeetingUseCase';
import { GetMeetingUseCase } from '../../use-cases/GetMeetingUseCase';
import { GetUserMeetingsUseCase } from '../../use-cases/GetUserMeetingsUseCase';
import { GetRoomMeetingsUseCase } from '../../use-cases/GetRoomMeetingsUseCase';
import { UpdateMeetingUseCase } from '../../use-cases/UpdateMeetingUseCase';
import { DeleteMeetingUseCase } from '../../use-cases/DeleteMeetingUseCase';
import { CheckMeetingConflictUseCase } from '../../use-cases/CheckMeetingConflictUseCase';
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