"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomUseCaseFactory = void 0;
const RoomRepository_1 = require("../../repositories/RoomRepository");
const MeetingRepository_1 = require("../../repositories/MeetingRepository");
const GetAllRoomsUseCase_1 = require("../../use-cases/GetAllRoomsUseCase");
const GetRoomUseCase_1 = require("../../use-cases/GetRoomUseCase");
const GetRoomMeetingsUseCase_1 = require("../../use-cases/GetRoomMeetingsUseCase");
class RoomUseCaseFactory {
    static getRoomRepository(prisma) {
        if (!this.roomRepository) {
            this.roomRepository = new RoomRepository_1.RoomRepository(prisma);
        }
        return this.roomRepository;
    }
    static getMeetingRepository(prisma) {
        if (!this.meetingRepository) {
            this.meetingRepository = new MeetingRepository_1.MeetingRepository(prisma);
        }
        return this.meetingRepository;
    }
    static createGetAllRoomsUseCase(prisma) {
        const roomRepository = this.getRoomRepository(prisma);
        return new GetAllRoomsUseCase_1.GetAllRoomsUseCase(roomRepository);
    }
    static createGetRoomUseCase(prisma) {
        const roomRepository = this.getRoomRepository(prisma);
        return new GetRoomUseCase_1.GetRoomUseCase(roomRepository);
    }
    static createGetRoomMeetingsUseCase(prisma) {
        const meetingRepository = this.getMeetingRepository(prisma);
        const roomRepository = this.getRoomRepository(prisma);
        return new GetRoomMeetingsUseCase_1.GetRoomMeetingsUseCase(meetingRepository, roomRepository);
    }
}
exports.RoomUseCaseFactory = RoomUseCaseFactory;
//# sourceMappingURL=RoomUseCaseFactory.js.map