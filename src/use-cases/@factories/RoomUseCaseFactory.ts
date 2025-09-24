import { PrismaClient } from '@prisma/client';
import { RoomRepository } from '../../repositories/prisma-repositories/RoomRepository';
import { MeetingRepository } from '../../repositories/prisma-repositories/MeetingRepository';
import { GetAllRoomsUseCase } from '../rooms/GetAllRoomsUseCase';
import { GetRoomUseCase } from '../rooms/GetRoomUseCase';
import { GetRoomMeetingsUseCase } from '../meetings/GetRoomMeetingsUseCase';

export class RoomUseCaseFactory {
  private static roomRepository: RoomRepository;
  private static meetingRepository: MeetingRepository;

  private static getRoomRepository(prisma: PrismaClient): RoomRepository {
    if (!this.roomRepository) {
      this.roomRepository = new RoomRepository(prisma);
    }
    return this.roomRepository;
  }

  private static getMeetingRepository(prisma: PrismaClient): MeetingRepository {
    if (!this.meetingRepository) {
      this.meetingRepository = new MeetingRepository(prisma);
    }
    return this.meetingRepository;
  }

  static createGetAllRoomsUseCase(prisma: PrismaClient): GetAllRoomsUseCase {
    const roomRepository = this.getRoomRepository(prisma);
    return new GetAllRoomsUseCase(roomRepository);
  }

  static createGetRoomUseCase(prisma: PrismaClient): GetRoomUseCase {
    const roomRepository = this.getRoomRepository(prisma);
    return new GetRoomUseCase(roomRepository);
  }

  static createGetRoomMeetingsUseCase(prisma: PrismaClient): GetRoomMeetingsUseCase {
    const meetingRepository = this.getMeetingRepository(prisma);
    const roomRepository = this.getRoomRepository(prisma);
    return new GetRoomMeetingsUseCase(meetingRepository, roomRepository);
  }
}