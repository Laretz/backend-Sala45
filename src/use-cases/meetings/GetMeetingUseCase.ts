import { Meeting } from '@prisma/client';
import { IMeetingRepository } from '../../repositories/IMeetingRepository';
import { IGetMeetingUseCase } from '../../repositories/IMeetingUseCases';

export class GetMeetingUseCase implements IGetMeetingUseCase {
  constructor(private meetingRepository: IMeetingRepository) {}

  async execute(meetingId: number, userId: number): Promise<Meeting | null> {
    const meeting = await this.meetingRepository.findById(meetingId);
    
    if (!meeting) {
      return null;
    }

    // Verificar se o usuário é o organizador da reunião
    if (meeting.userId !== userId) {
      throw new Error('Acesso negado. Você só pode visualizar suas próprias reuniões');
    }

    return meeting;
  }
}