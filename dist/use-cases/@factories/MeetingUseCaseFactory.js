"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeetingUseCaseFactory = void 0;
const MeetingRepository_1 = require("../../repositories/prisma-repositories/MeetingRepository");
const RoomRepository_1 = require("../../repositories/prisma-repositories/RoomRepository");
const CreateMeetingUseCase_1 = require("../meetings/CreateMeetingUseCase");
const GetMeetingUseCase_1 = require("../meetings/GetMeetingUseCase");
const GetUserMeetingsUseCase_1 = require("../meetings/GetUserMeetingsUseCase");
const GetRoomMeetingsUseCase_1 = require("../meetings/GetRoomMeetingsUseCase");
const UpdateMeetingUseCase_1 = require("../meetings/UpdateMeetingUseCase");
const DeleteMeetingUseCase_1 = require("../meetings/DeleteMeetingUseCase");
const CheckMeetingConflictUseCase_1 = require("../meetings/CheckMeetingConflictUseCase");
class MeetingUseCaseFactory {
    static getMeetingRepository(prisma) {
        if (!this.meetingRepository) {
            this.meetingRepository = new MeetingRepository_1.MeetingRepository(prisma);
        }
        return this.meetingRepository;
    }
    static getRoomRepository(prisma) {
        if (!this.roomRepository) {
            this.roomRepository = new RoomRepository_1.RoomRepository(prisma);
        }
        return this.roomRepository;
    }
    static createCreateMeetingUseCase(prisma) {
        const meetingRepository = this.getMeetingRepository(prisma);
        const roomRepository = this.getRoomRepository(prisma);
        return new CreateMeetingUseCase_1.CreateMeetingUseCase(meetingRepository, roomRepository);
    }
    static createGetMeetingUseCase(prisma) {
        const meetingRepository = this.getMeetingRepository(prisma);
        return new GetMeetingUseCase_1.GetMeetingUseCase(meetingRepository);
    }
    static createGetUserMeetingsUseCase(prisma) {
        const meetingRepository = this.getMeetingRepository(prisma);
        return new GetUserMeetingsUseCase_1.GetUserMeetingsUseCase(meetingRepository);
    }
    static createGetRoomMeetingsUseCase(prisma) {
        const meetingRepository = this.getMeetingRepository(prisma);
        const roomRepository = this.getRoomRepository(prisma);
        return new GetRoomMeetingsUseCase_1.GetRoomMeetingsUseCase(meetingRepository, roomRepository);
    }
    static createUpdateMeetingUseCase(prisma) {
        const meetingRepository = this.getMeetingRepository(prisma);
        const roomRepository = this.getRoomRepository(prisma);
        return new UpdateMeetingUseCase_1.UpdateMeetingUseCase(meetingRepository, roomRepository);
    }
    static createDeleteMeetingUseCase(prisma) {
        const meetingRepository = this.getMeetingRepository(prisma);
        return new DeleteMeetingUseCase_1.DeleteMeetingUseCase(meetingRepository);
    }
    static createCheckMeetingConflictUseCase(prisma) {
        const meetingRepository = this.getMeetingRepository(prisma);
        return new CheckMeetingConflictUseCase_1.CheckMeetingConflictUseCase(meetingRepository);
    }
}
exports.MeetingUseCaseFactory = MeetingUseCaseFactory;
//# sourceMappingURL=MeetingUseCaseFactory.js.map