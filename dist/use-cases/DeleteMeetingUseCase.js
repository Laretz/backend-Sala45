"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteMeetingUseCase = void 0;
class DeleteMeetingUseCase {
    constructor(meetingRepository) {
        this.meetingRepository = meetingRepository;
    }
    async execute(meetingId, userId) {
        const meeting = await this.meetingRepository.findById(meetingId);
        if (!meeting) {
            throw new Error('Reunião não encontrada');
        }
        if (meeting.userId !== userId) {
            throw new Error('Acesso negado. Você só pode excluir suas próprias reuniões');
        }
        await this.meetingRepository.delete(meetingId);
    }
}
exports.DeleteMeetingUseCase = DeleteMeetingUseCase;
//# sourceMappingURL=DeleteMeetingUseCase.js.map