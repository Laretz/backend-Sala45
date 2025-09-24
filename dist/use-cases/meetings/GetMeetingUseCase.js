"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetMeetingUseCase = void 0;
class GetMeetingUseCase {
    constructor(meetingRepository) {
        this.meetingRepository = meetingRepository;
    }
    async execute(meetingId, userId) {
        const meeting = await this.meetingRepository.findById(meetingId);
        if (!meeting) {
            return null;
        }
        if (meeting.userId !== userId) {
            throw new Error('Acesso negado. Você só pode visualizar suas próprias reuniões');
        }
        return meeting;
    }
}
exports.GetMeetingUseCase = GetMeetingUseCase;
//# sourceMappingURL=GetMeetingUseCase.js.map