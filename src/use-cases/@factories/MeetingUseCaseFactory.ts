import { PrismaClient } from '@prisma/client';
import { MeetingRepository } from '../../repositories/prisma-repositories/MeetingRepository';
import { RoomRepository } from '../../repositories/prisma-repositories/RoomRepository';
import { CreateMeetingUseCase } from '../meetings/CreateMeetingUseCase';
import { GetMeetingUseCase } from '../meetings/GetMeetingUseCase';
import { GetUserMeetingsUseCase } from '../meetings/GetUserMeetingsUseCase';
import { GetRoomMeetingsUseCase } from '../meetings/GetRoomMeetingsUseCase';
import { UpdateMeetingUseCase } from '../meetings/UpdateMeetingUseCase';
import { DeleteMeetingUseCase } from '../meetings/DeleteMeetingUseCase';
import { CheckMeetingConflictUseCase } from '../meetings/CheckMeetingConflictUseCase';

export class MeetingUseCaseFactory {
  private static meetingRepository: MeetingRepository;
  private static roomRepository: RoomRepository;

  private static getMeetingRepository(prisma: PrismaClient): MeetingRepository {
    if (!this.meetingRepository) {
      this.meetingRepository = new MeetingRepository(prisma);
    }
    return this.meetingRepository;
  }

  private static getRoomRepository(prisma: PrismaClient): RoomRepository {
    if (!this.roomRepository) {
      this.roomRepository = new RoomRepository(prisma);
    }
    return this.roomRepository;
  }

  static createCreateMeetingUseCase(prisma: PrismaClient): CreateMeetingUseCase {
    const meetingRepository = this.getMeetingRepository(prisma);
    const roomRepository = this.getRoomRepository(prisma);
    return new CreateMeetingUseCase(meetingRepository, roomRepository);
  }

  static createGetMeetingUseCase(prisma: PrismaClient): GetMeetingUseCase {
    const meetingRepository = this.getMeetingRepository(prisma);
    return new GetMeetingUseCase(meetingRepository);
  }

  static createGetUserMeetingsUseCase(prisma: PrismaClient): GetUserMeetingsUseCase {
    const meetingRepository = this.getMeetingRepository(prisma);
    return new GetUserMeetingsUseCase(meetingRepository);
  }

  static createGetRoomMeetingsUseCase(prisma: PrismaClient): GetRoomMeetingsUseCase {
    const meetingRepository = this.getMeetingRepository(prisma);
    const roomRepository = this.getRoomRepository(prisma);
    return new GetRoomMeetingsUseCase(meetingRepository, roomRepository);
  }

  static createUpdateMeetingUseCase(prisma: PrismaClient): UpdateMeetingUseCase {
    const meetingRepository = this.getMeetingRepository(prisma);
    const roomRepository = this.getRoomRepository(prisma);
    return new UpdateMeetingUseCase(meetingRepository, roomRepository);
  }

  static createDeleteMeetingUseCase(prisma: PrismaClient): DeleteMeetingUseCase {
    const meetingRepository = this.getMeetingRepository(prisma);
    return new DeleteMeetingUseCase(meetingRepository);
  }

  static createCheckMeetingConflictUseCase(prisma: PrismaClient): CheckMeetingConflictUseCase {
    const meetingRepository = this.getMeetingRepository(prisma);
    return new CheckMeetingConflictUseCase(meetingRepository);
  }
}