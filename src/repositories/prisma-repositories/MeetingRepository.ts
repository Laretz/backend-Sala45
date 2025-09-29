import { PrismaClient, Meeting } from '@prisma/client';
import { IMeetingRepository } from '../IMeetingRepository';
import { CreateMeetingData, UpdateMeetingData, MeetingConflict } from '../../domain/Meeting';
import { startOfDay, endOfDay } from 'date-fns';

export class MeetingRepository implements IMeetingRepository {
  constructor(private prisma: PrismaClient) {}

  async create(meetingData: CreateMeetingData): Promise<Meeting> {
    return await this.prisma.meeting.create({
      data: meetingData,
    });
  }

  async findById(id: number): Promise<Meeting | null> {
    return await this.prisma.meeting.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, name: true, email: true } },
        room: true,
      },
    });
  }

  async findByUserId(userId: number): Promise<Meeting[]> {
    return await this.prisma.meeting.findMany({
      where: { userId },
      include: {
        room: true,
        user: { select: { id: true, name: true, email: true } },
      },
      orderBy: { startTime: 'asc' },
    });
  }

  async findByRoomId(roomId: number): Promise<Meeting[]> {
    return await this.prisma.meeting.findMany({
      where: { roomId },
      include: {
        user: { select: { id: true, name: true, email: true } },
        room: true,
      },
      orderBy: { startTime: 'asc' },
    });
  }

  async findByRoomAndDate(roomId: number, date: Date): Promise<Meeting[]> {
    const startOfDayDate = startOfDay(date);
    const endOfDayDate = endOfDay(date);

    return await this.prisma.meeting.findMany({
      where: {
        roomId,
        startTime: {
          gte: startOfDayDate,
          lte: endOfDayDate,
        },
      },
      include: {
        user: { select: { id: true, name: true, email: true } },
        room: true,
      },
      orderBy: { startTime: 'asc' },
    });
  }

  async update(id: number, meetingData: UpdateMeetingData): Promise<Meeting> {
    return await this.prisma.meeting.update({
      where: { id },
      data: meetingData,
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.meeting.delete({
      where: { id },
    });
  }

  async checkTimeConflict(
    roomId: number,
    startTime: Date,
    endTime: Date,
    excludeMeetingId?: number
  ): Promise<MeetingConflict[]> {
    const whereClause: any = {
      roomId,
      // Apenas considerar reuniões aprovadas ou pendentes como conflito
      status: {
        in: ['APPROVED', 'PENDING']
      },
      OR: [
        {
          AND: [
            { startTime: { lte: startTime } },
            { endTime: { gt: startTime } },
          ],
        },
        {
          AND: [
            { startTime: { lt: endTime } },
            { endTime: { gte: endTime } },
          ],
        },
        {
          AND: [
            { startTime: { gte: startTime } },
            { endTime: { lte: endTime } },
          ],
        },
      ],
    };

    if (excludeMeetingId) {
      whereClause.id = { not: excludeMeetingId };
    }

    const conflictingMeetings = await this.prisma.meeting.findMany({
      where: whereClause,
      include: {
        user: { select: { id: true, name: true, email: true } },
        room: true,
      },
    });

    return conflictingMeetings.map((meeting) => ({
      id: meeting.id,
      title: meeting.title,
      startTime: meeting.startTime,
      endTime: meeting.endTime,
      user: {
        id: meeting.user.id,
        name: meeting.user.name,
        email: meeting.user.email,
      },
    }));
  }
}