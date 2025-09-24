"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMeetingUseCase = void 0;
class UpdateMeetingUseCase {
    constructor(meetingRepository, roomRepository) {
        this.meetingRepository = meetingRepository;
        this.roomRepository = roomRepository;
    }
    async execute(meetingId, userId, meetingData) {
        const existingMeeting = await this.meetingRepository.findById(meetingId);
        if (!existingMeeting) {
            throw new Error('Reunião não encontrada');
        }
        if (existingMeeting.userId !== userId) {
            throw new Error('Acesso negado. Você só pode editar suas próprias reuniões');
        }
        if (meetingData.roomId && meetingData.roomId !== existingMeeting.roomId) {
            const room = await this.roomRepository.findById(meetingData.roomId);
            if (!room) {
                throw new Error('Sala não encontrada');
            }
        }
        const startTime = meetingData.startTime ? new Date(meetingData.startTime) : existingMeeting.startTime;
        const endTime = meetingData.endTime ? new Date(meetingData.endTime) : existingMeeting.endTime;
        const roomId = meetingData.roomId || existingMeeting.roomId;
        if (startTime >= endTime) {
            throw new Error('Horário de início deve ser anterior ao horário de fim');
        }
        if (meetingData.startTime || meetingData.endTime || meetingData.roomId) {
            const conflicts = await this.meetingRepository.checkTimeConflict(roomId, startTime, endTime, meetingId);
            if (conflicts.length > 0) {
                throw new Error(`Conflito de horário detectado. Já existe uma reunião agendada: "${conflicts[0].title}" das ${conflicts[0].startTime.toLocaleTimeString()} às ${conflicts[0].endTime.toLocaleTimeString()}`);
            }
        }
        return await this.meetingRepository.update(meetingId, meetingData);
    }
}
exports.UpdateMeetingUseCase = UpdateMeetingUseCase;
//# sourceMappingURL=UpdateMeetingUseCase.js.map