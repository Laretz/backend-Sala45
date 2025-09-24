"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckMeetingConflictUseCase = void 0;
class CheckMeetingConflictUseCase {
    constructor(meetingRepository) {
        this.meetingRepository = meetingRepository;
    }
    async execute(roomId, startTime, endTime, excludeMeetingId) {
        return await this.meetingRepository.checkTimeConflict(roomId, startTime, endTime, excludeMeetingId);
    }
}
exports.CheckMeetingConflictUseCase = CheckMeetingConflictUseCase;
//# sourceMappingURL=CheckMeetingConflictUseCase.js.map