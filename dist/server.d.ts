import { PrismaClient } from '@prisma/client';
declare const app: import("express-serve-static-core").Express;
declare global {
    namespace Express {
        interface Request {
            prisma: PrismaClient;
            user?: {
                id: number;
                name: string;
                email: string;
            };
        }
    }
}
export default app;
//# sourceMappingURL=server.d.ts.map