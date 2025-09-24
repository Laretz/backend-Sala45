import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
export declare class MeetingController {
    private prisma;
    constructor(prisma: PrismaClient);
    create(req: Request, res: Response): Promise<void>;
    getAll(req: Request, res: Response): Promise<void>;
    getById(req: Request, res: Response): Promise<void>;
    update(req: Request, res: Response): Promise<void>;
    delete(req: Request, res: Response): Promise<void>;
    checkConflict(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=MeetingController.d.ts.map