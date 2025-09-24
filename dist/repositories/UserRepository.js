"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
class UserRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userData) {
        return await this.prisma.user.create({
            data: userData,
        });
    }
    async findByEmail(email) {
        return await this.prisma.user.findUnique({
            where: { email },
        });
    }
    async findById(id) {
        return await this.prisma.user.findUnique({
            where: { id },
        });
    }
    async update(id, userData) {
        return await this.prisma.user.update({
            where: { id },
            data: userData,
        });
    }
    async delete(id) {
        await this.prisma.user.delete({
            where: { id },
        });
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=UserRepository.js.map