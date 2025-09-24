"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetRoomMeetingsUseCase = void 0;
class GetRoomMeetingsUseCase {
    constructor(meetingRepository, roomRepository) {
        this.meetingRepository = meetingRepository;
        this.roomRepository = roomRepository;
    }
    async execute(roomId, date) {
        const room = await this.roomRepository.findById(roomId);
        if (!room) {
            throw new Error("Sala não encontrada");
        }
        if (date) {
            return await this.meetingRepository.findByRoomAndDate(roomId, date);
        }
        else {
            return await this.meetingRepository.findByRoomId(roomId);
        }
    }
}
exports.GetRoomMeetingsUseCase = GetRoomMeetingsUseCase;
//# sourceMappingURL=GetRoomMeetingsUseCase.js.map