import { Meeting } from '@prisma/client';
import { IMeetingRepository } from '../../repositories/IMeetingRepository';
import { IGetUserMeetingsUseCase } from '../../repositories/IMeetingUseCases';

export class GetUserMeetingsUseCase implements IGetUserMeetingsUseCase {
  constructor(private meetingRepository: IMeetingRepository) {}

  async execute(userId: number): Promise<Meeting[]> {
    return await this.meetingRepository.findByUserId(userId);
  }
}