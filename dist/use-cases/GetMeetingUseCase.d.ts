import { Meeting } from '@prisma/client';
import { IMeetingRepository } from '../repositories/IMeetingRepository';
import { IGetMeetingUseCase } from '../repositories/IMeetingUseCases';
export declare class GetMeetingUseCase implements IGetMeetingUseCase {
    private meetingRepository;
    constructor(meetingRepository: IMeetingRepository);
    execute(meetingId: number, userId: number): Promise<Meeting | null>;
}
//# sourceMappingURL=GetMeetingUseCase.d.ts.map