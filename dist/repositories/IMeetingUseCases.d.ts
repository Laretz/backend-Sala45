import { Meeting } from '@prisma/client';
import { CreateMeetingData, UpdateMeetingData, MeetingConflict } from '../domain/Meeting';
export interface ICreateMeetingUseCase {
    execute(meetingData: CreateMeetingData): Promise<Meeting>;
}
export interface IGetMeetingUseCase {
    execute(meetingId: number, userId: number): Promise<Meeting | null>;
}
export interface IGetUserMeetingsUseCase {
    execute(userId: number): Promise<Meeting[]>;
}
export interface IGetRoomMeetingsUseCase {
    execute(roomId: number, date?: Date): Promise<Meeting[]>;
}
export interface IUpdateMeetingUseCase {
    execute(meetingId: number, userId: number, meetingData: UpdateMeetingData): Promise<Meeting>;
}
export interface IDeleteMeetingUseCase {
    execute(meetingId: number, userId: number): Promise<void>;
}
export interface ICheckMeetingConflictUseCase {
    execute(roomId: number, startTime: Date, endTime: Date, excludeMeetingId?: number): Promise<MeetingConflict[]>;
}
//# sourceMappingURL=IMeetingUseCases.d.ts.map