"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetRoomUseCase = void 0;
class GetRoomUseCase {
    constructor(roomRepository) {
        this.roomRepository = roomRepository;
    }
    async execute(roomId) {
        return await this.roomRepository.findById(roomId);
    }
}
exports.GetRoomUseCase = GetRoomUseCase;
//# sourceMappingURL=GetRoomUseCase.js.map