"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserMeetingsUseCase = void 0;
class GetUserMeetingsUseCase {
    constructor(meetingRepository) {
        this.meetingRepository = meetingRepository;
    }
    async execute(userId) {
        return await this.meetingRepository.findByUserId(userId);
    }
}
exports.GetUserMeetingsUseCase = GetUserMeetingsUseCase;
//# sourceMappingURL=GetUserMeetingsUseCase.js.map