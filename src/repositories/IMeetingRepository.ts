import { Meeting } from '@prisma/client';
import { CreateMeetingData, UpdateMeetingData, MeetingConflict } from '../domain/Meeting';

export interface IMeetingRepository {
  create(meetingData: CreateMeetingData): Promise<Meeting>;
  findById(id: number): Promise<Meeting | null>;
  findByUserId(userId: number): Promise<Meeting[]>;
  findByRoomId(roomId: number): Promise<Meeting[]>;
  findByRoomAndDate(roomId: number, date: Date): Promise<Meeting[]>;
  update(id: number, meetingData: UpdateMeetingData): Promise<Meeting>;
  delete(id: number): Promise<void>;
  checkTimeConflict(roomId: number, startTime: Date, endTime: Date, excludeMeetingId?: number): Promise<MeetingConflict[]>;
}