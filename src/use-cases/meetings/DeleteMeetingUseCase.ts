import { IMeetingRepository } from '../../repositories/IMeetingRepository';
import { IDeleteMeetingUseCase } from '../../repositories/IMeetingUseCases';

export class DeleteMeetingUseCase implements IDeleteMeetingUseCase {
  constructor(private meetingRepository: IMeetingRepository) {}

  async execute(meetingId: number, userId: number): Promise<void> {
    // Verificar se a reunião existe
    const meeting = await this.meetingRepository.findById(meetingId);
    if (!meeting) {
      throw new Error('Reunião não encontrada');
    }

    // Verificar se o usuário é o organizador
    if (meeting.userId !== userId) {
      throw new Error('Acesso negado. Você só pode excluir suas próprias reuniões');
    }

    // Deletar reunião
    await this.meetingRepository.delete(meetingId);
  }
}