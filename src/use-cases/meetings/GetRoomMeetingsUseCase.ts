import { Meeting } from "@prisma/client";
import { IMeetingRepository } from "../../repositories/IMeetingRepository";
import { IRoomRepository } from "../../repositories/IRoomRepository";
import { IGetRoomMeetingsUseCase } from "../../repositories/IMeetingUseCases";

export class GetRoomMeetingsUseCase implements IGetRoomMeetingsUseCase {
  constructor(
    private meetingRepository: IMeetingRepository,
    private roomRepository: IRoomRepository
  ) {}

  async execute(roomId: number, date?: Date): Promise<Meeting[]> {
    // Verificar se a sala existe
    const room = await this.roomRepository.findById(roomId);
    if (!room) {
      throw new Error("Sala não encontrada");
    }

    if (date) {
      return await this.meetingRepository.findByRoomAndDate(roomId, date);
    } else {
      return await this.meetingRepository.findByRoomId(roomId);
    }
  }
}
