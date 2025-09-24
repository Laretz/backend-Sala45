import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
export declare class RoomController {
    private prisma;
    constructor(prisma?: PrismaClient);
    getAll(req: Request, res: Response): Promise<void>;
    getById(req: Request, res: Response): Promise<void>;
    getMeetingsByDate(req: Request, res: Response): Promise<void>;
    getMeetings(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=RoomController.d.ts.map