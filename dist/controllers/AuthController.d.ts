import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
export declare class AuthController {
    private prisma;
    constructor(prisma: PrismaClient);
    register(req: Request, res: Response): Promise<void>;
    login(req: Request, res: Response): Promise<void>;
    getMe(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=AuthController.d.ts.map