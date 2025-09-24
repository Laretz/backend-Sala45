import { IMeetingRepository } from '../repositories/IMeetingRepository';
import { ICheckMeetingConflictUseCase } from '../repositories/IMeetingUseCases';
import { MeetingConflict } from '../domain/Meeting';
export declare class CheckMeetingConflictUseCase implements ICheckMeetingConflictUseCase {
    private meetingRepository;
    constructor(meetingRepository: IMeetingRepository);
    execute(roomId: number, startTime: Date, endTime: Date, excludeMeetingId?: number): Promise<MeetingConflict[]>;
}
//# sourceMappingURL=CheckMeetingConflictUseCase.d.ts.map