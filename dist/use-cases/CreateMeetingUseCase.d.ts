import { Meeting } from '@prisma/client';
import { IMeetingRepository } from '../repositories/IMeetingRepository';
import { IRoomRepository } from '../repositories/IRoomRepository';
import { ICreateMeetingUseCase } from '../repositories/IMeetingUseCases';
import { CreateMeetingData } from '../domain/Meeting';
export declare class CreateMeetingUseCase implements ICreateMeetingUseCase {
    private meetingRepository;
    private roomRepository;
    constructor(meetingRepository: IMeetingRepository, roomRepository: IRoomRepository);
    execute(meetingData: CreateMeetingData): Promise<Meeting>;
}
//# sourceMappingURL=CreateMeetingUseCase.d.ts.map