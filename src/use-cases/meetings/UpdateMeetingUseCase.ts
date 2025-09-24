import { Meeting } from '@prisma/client';
import { IMeetingRepository } from '../../repositories/IMeetingRepository';
import { IRoomRepository } from '../../repositories/IRoomRepository';
import { IUpdateMeetingUseCase } from '../../repositories/IMeetingUseCases';
import { UpdateMeetingData } from '../../domain/Meeting';

export class UpdateMeetingUseCase implements IUpdateMeetingUseCase {
  constructor(
    private meetingRepository: IMeetingRepository,
    private roomRepository: IRoomRepository
  ) {}

  async execute(meetingId: number, userId: number, meetingData: UpdateMeetingData): Promise<Meeting> {
    // Verificar se a reunião existe
    const existingMeeting = await this.meetingRepository.findById(meetingId);
    if (!existingMeeting) {
      throw new Error('Reunião não encontrada');
    }

    // Verificar se o usuário é o organizador
    if (existingMeeting.userId !== userId) {
      throw new Error('Acesso negado. Você só pode editar suas próprias reuniões');
    }

    // Se está alterando a sala, verificar se ela existe
    if (meetingData.roomId && meetingData.roomId !== existingMeeting.roomId) {
      const room = await this.roomRepository.findById(meetingData.roomId);
      if (!room) {
        throw new Error('Sala não encontrada');
      }
    }

    // Validar horários se estão sendo alterados
    const startTime = meetingData.startTime ? new Date(meetingData.startTime) : existingMeeting.startTime;
    const endTime = meetingData.endTime ? new Date(meetingData.endTime) : existingMeeting.endTime;
    const roomId = meetingData.roomId || existingMeeting.roomId;

    if (startTime >= endTime) {
      throw new Error('Horário de início deve ser anterior ao horário de fim');
    }

    // Verificar conflitos de horário (excluindo a própria reunião)
    if (meetingData.startTime || meetingData.endTime || meetingData.roomId) {
      const conflicts = await this.meetingRepository.checkTimeConflict(
        roomId,
        startTime,
        endTime,
        meetingId
      );

      if (conflicts.length > 0) {
        throw new Error(`Conflito de horário detectado. Já existe uma reunião agendada: "${conflicts[0].title}" das ${conflicts[0].startTime.toLocaleTimeString()} às ${conflicts[0].endTime.toLocaleTimeString()}`);
      }
    }

    // Atualizar reunião
    return await this.meetingRepository.update(meetingId, meetingData);
  }
}