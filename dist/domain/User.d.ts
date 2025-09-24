export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface CreateUserData {
    name: string;
    email: string;
    password: string;
}
export interface AuthResponse {
    user: {
        id: number;
        name: string;
        email: string;
    };
    token: string;
    message: string;
}
export interface LoginData {
    email: string;
    password: string;
}
//# sourceMappingURL=User.d.ts.map