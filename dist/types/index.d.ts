export interface User {
    id: number;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface Room {
    id: number;
    name: string;
    capacity: number;
    location: string;
}
export interface Meeting {
    id: number;
    title: string;
    description?: string | null;
    startTime: Date;
    endTime: Date;
    createdAt: Date;
    updatedAt: Date;
    userId: number;
    roomId: number;
    user?: User;
    room?: Room;
}
export interface CreateUserData {
    name: string;
    email: string;
    password: string;
}
export interface LoginData {
    email: string;
    password: string;
}
export interface CreateMeetingData {
    title: string;
    description?: string;
    startTime: string | Date;
    endTime: string | Date;
    roomId: number;
    userId: number;
}
export interface UpdateMeetingData {
    title: string;
    description?: string;
    startTime: string | Date;
    endTime: string | Date;
    roomId: number;
}
export interface AuthResponse {
    message: string;
    user: Omit<User, 'password'>;
    token: string;
}
export interface ApiResponse<T = any> {
    message?: string;
    data?: T;
    error?: string;
    details?: any[];
}
export interface JwtPayload {
    userId: number;
    iat?: number;
    exp?: number;
}
export interface MeetingConflict {
    id: number;
    title: string;
    startTime: Date;
    endTime: Date;
    user: string;
}
//# sourceMappingURL=index.d.ts.map