"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeetingRepository = void 0;
const date_fns_1 = require("date-fns");
class MeetingRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(meetingData) {
        return await this.prisma.meeting.create({
            data: meetingData,
        });
    }
    async findById(id) {
        return await this.prisma.meeting.findUnique({
            where: { id },
            include: {
                user: { select: { id: true, name: true, email: true } },
                room: true,
            },
        });
    }
    async findByUserId(userId) {
        return await this.prisma.meeting.findMany({
            where: { userId },
            include: {
                room: true,
                user: { select: { id: true, name: true, email: true } },
            },
            orderBy: { startTime: 'asc' },
        });
    }
    async findByRoomId(roomId) {
        return await this.prisma.meeting.findMany({
            where: { roomId },
            include: {
                user: { select: { id: true, name: true, email: true } },
                room: true,
            },
            orderBy: { startTime: 'asc' },
        });
    }
    async findByRoomAndDate(roomId, date) {
        const startOfDayDate = (0, date_fns_1.startOfDay)(date);
        const endOfDayDate = (0, date_fns_1.endOfDay)(date);
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
    async update(id, meetingData) {
        return await this.prisma.meeting.update({
            where: { id },
            data: meetingData,
        });
    }
    async delete(id) {
        await this.prisma.meeting.delete({
            where: { id },
        });
    }
    async checkTimeConflict(roomId, startTime, endTime, excludeMeetingId) {
        const whereClause = {
            roomId,
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
exports.MeetingRepository = MeetingRepository;
//# sourceMappingURL=MeetingRepository.js.map