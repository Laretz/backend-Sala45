import { Meeting } from '@prisma/client';
import { IMeetingRepository } from '../repositories/IMeetingRepository';
import { IGetUserMeetingsUseCase } from '../repositories/IMeetingUseCases';
export declare class GetUserMeetingsUseCase implements IGetUserMeetingsUseCase {
    private meetingRepository;
    constructor(meetingRepository: IMeetingRepository);
    execute(userId: number): Promise<Meeting[]>;
}
//# sourceMappingURL=GetUserMeetingsUseCase.d.ts.map