import { IMeetingRepository } from '../../repositories/IMeetingRepository';
import { IDeleteMeetingUseCase } from '../../repositories/IMeetingUseCases';
export declare class DeleteMeetingUseCase implements IDeleteMeetingUseCase {
    private meetingRepository;
    constructor(meetingRepository: IMeetingRepository);
    execute(meetingId: number, userId: number): Promise<void>;
}
//# sourceMappingURL=DeleteMeetingUseCase.d.ts.map