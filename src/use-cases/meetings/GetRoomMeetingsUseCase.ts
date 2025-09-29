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

    let meetings: Meeting[];
    if (date) {
      meetings = await this.meetingRepository.findByRoomAndDate(roomId, date);
    } else {
      meetings = await this.meetingRepository.findByRoomId(roomId);
    }

    // Filtrar apenas reuniões aprovadas para exibição nas salas
    return meetings.filter(meeting => meeting.status === 'APPROVED');
  }
}
