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

    // Verificar conflitos de horário
    const conflicts = await this.meetingRepository.checkTimeConflict(
      meetingData.roomId,
      startTime,
      endTime
    );

    if (conflicts.length > 0) {
      throw new Error(`Conflito de horário detectado. Já existe uma reunião agendada: "${conflicts[0].title}" das ${conflicts[0].startTime.toLocaleTimeString()} às ${conflicts[0].endTime.toLocaleTimeString()}`);
    }

    // Criar reunião com datas convertidas
    const meetingDataWithDates = {
      ...meetingData,
      startTime,
      endTime
    };
    
    return await this.meetingRepository.create(meetingDataWithDates);
  }
}