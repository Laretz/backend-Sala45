"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMeetingUseCase = void 0;
class CreateMeetingUseCase {
    constructor(meetingRepository, roomRepository) {
        this.meetingRepository = meetingRepository;
        this.roomRepository = roomRepository;
    }
    async execute(meetingData) {
        const startTime = new Date(meetingData.startTime);
        const endTime = new Date(meetingData.endTime);
        const room = await this.roomRepository.findById(meetingData.roomId);
        if (!room) {
            throw new Error('Sala não encontrada');
        }
        if (startTime >= endTime) {
            throw new Error('Horário de início deve ser anterior ao horário de fim');
        }
        if (startTime < new Date()) {
            throw new Error('Não é possível agendar reuniões no passado');
        }
        const conflicts = await this.meetingRepository.checkTimeConflict(meetingData.roomId, startTime, endTime);
        if (conflicts.length > 0) {
            throw new Error(`Conflito de horário detectado. Já existe uma reunião agendada: "${conflicts[0].title}" das ${conflicts[0].startTime.toLocaleTimeString()} às ${conflicts[0].endTime.toLocaleTimeString()}`);
        }
        const meetingDataWithDates = {
            ...meetingData,
            startTime,
            endTime
        };
        return await this.meetingRepository.create(meetingDataWithDates);
    }
}
exports.CreateMeetingUseCase = CreateMeetingUseCase;
//# sourceMappingURL=CreateMeetingUseCase.js.map