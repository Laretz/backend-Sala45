export interface Meeting {
    id: number;
    title: string;
    description?: string;
    startTime: Date;
    endTime: Date;
    userId: number;
    roomId: number;
    createdAt: Date;
    updatedAt: Date;
}
export interface CreateMeetingData {
    title: string;
    description?: string;
    startTime: Date;
    endTime: Date;
    userId: number;
    roomId: number;
}
export interface UpdateMeetingData {
    title: string;
    description?: string;
    startTime: Date;
    endTime: Date;
    roomId: number;
}
export interface MeetingConflict {
    id: number;
    title: string;
    startTime: Date;
    endTime: Date;
    user: {
        id: number;
        name: string;
        email: string;
    };
}
//# sourceMappingURL=Meeting.d.ts.map