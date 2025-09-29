import { Meeting } from '@prisma/client';
import { IMeetingRepository } from '../../repositories/IMeetingRepository';
import { IRoomRepository } from '../../repositories/IRoomRepository';
import { ICreateMeetingUseCase } from '../../repositories/IMeetingUseCases';
import { CreateMeetingData } from '../../domain/Meeting';

export class CreateMeetingUseCase implements ICreateMeetingUseCase {
  constructor(
    private meetingRepository: IMeetingRepository,
    private roomRepository: IRoomRepository
  ) {}

  async execute(meetingData: CreateMeetingData): Promise<Meeting> {
    // Converter datas se necessário
    const startTime = new Date(meetingData.startTime);
    const endTime = new Date(meetingData.endTime);

    // Validar se a sala existe
    const room = await this.roomRepository.findById(meetingData.roomId);
    if (!room) {
      throw new Error('Sala não encontrada');
    }

    // Validar horários
    if (startTime >= endTime) {
      throw new Error('Horário de início deve ser anterior ao horário de fim');
    }

    // Validar se não é no passado
    if (startTime < new Date()) {
      throw new Error('Não é possível agendar reuniões no passado');
    }

    // Validar duração
    const calculatedDuration = Math.round((endTime.getTime() - startTime.getTime()) / (1000 * 60));
    if (calculatedDuration !== meetingData.duration) {
      throw new Error('A duração informada não corresponde ao intervalo entre início e fim');
    }

    // Verificar conflitos de horário
    const conflicts = await this.meetingRepository.checkTimeConflict(
      meetingData.roomId,
      startTime,
      endTime
    );

    if (conflicts.length > 0) {
      throw new Error(`Conflito de horário detectado. Já existe uma reunião agendada: "${conflicts[0].title}" das ${conflicts[0].startTime.toLocaleTimeString()} às ${conflicts[0].endTime.toLocaleTimeString()}`);
    }

    // Determinar status baseado na duração
    // Reuniões de 30 minutos são aprovadas automaticamente
    // Reuniões de 1h ou 2h precisam de aprovação
    const status = meetingData.duration === 30 ? 'APPROVED' : 'PENDING';

    // Criar reunião com datas convertidas e status
    const meetingDataWithDates = {
      ...meetingData,
      startTime,
      endTime,
      status
    };
    
    return await this.meetingRepository.create(meetingDataWithDates);
  }
}