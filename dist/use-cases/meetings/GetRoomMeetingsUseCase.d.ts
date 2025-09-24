import { Meeting } from "@prisma/client";
import { IMeetingRepository } from "../../repositories/IMeetingRepository";
import { IRoomRepository } from "../../repositories/IRoomRepository";
import { IGetRoomMeetingsUseCase } from "../../repositories/IMeetingUseCases";
export declare class GetRoomMeetingsUseCase implements IGetRoomMeetingsUseCase {
    private meetingRepository;
    private roomRepository;
    constructor(meetingRepository: IMeetingRepository, roomRepository: IRoomRepository);
    execute(roomId: number, date?: Date): Promise<Meeting[]>;
}
//# sourceMappingURL=GetRoomMeetingsUseCase.d.ts.map