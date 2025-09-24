import { Meeting } from '@prisma/client';
import { IMeetingRepository } from '../../repositories/IMeetingRepository';
import { IRoomRepository } from '../../repositories/IRoomRepository';
import { IUpdateMeetingUseCase } from '../../repositories/IMeetingUseCases';
import { UpdateMeetingData } from '../../domain/Meeting';
export declare class UpdateMeetingUseCase implements IUpdateMeetingUseCase {
    private meetingRepository;
    private roomRepository;
    constructor(meetingRepository: IMeetingRepository, roomRepository: IRoomRepository);
    execute(meetingId: number, userId: number, meetingData: UpdateMeetingData): Promise<Meeting>;
}
//# sourceMappingURL=UpdateMeetingUseCase.d.ts.map