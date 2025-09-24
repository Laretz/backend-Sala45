import { IMeetingRepository } from "../../repositories/IMeetingRepository";
import { ICheckMeetingConflictUseCase } from "../../repositories/IMeetingUseCases";
import { MeetingConflict } from "../../domain/Meeting";

export class CheckMeetingConflictUseCase
  implements ICheckMeetingConflictUseCase
{
  constructor(private meetingRepository: IMeetingRepository) {}

  async execute(
    roomId: number,
    startTime: Date,
    endTime: Date,
    excludeMeetingId?: number
  ): Promise<MeetingConflict[]> {
    return await this.meetingRepository.checkTimeConflict(
      roomId,
      startTime,
      endTime,
      excludeMeetingId
    );
  }
}
