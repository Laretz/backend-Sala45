"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomRepository = void 0;
class RoomRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        return await this.prisma.room.findMany({
            orderBy: { name: 'asc' },
        });
    }
    async findById(id) {
        return await this.prisma.room.findUnique({
            where: { id },
        });
    }
    async create(roomData) {
        return await this.prisma.room.create({
            data: roomData,
        });
    }
    async update(id, roomData) {
        return await this.prisma.room.update({
            where: { id },
            data: roomData,
        });
    }
    async delete(id) {
        await this.prisma.room.delete({
            where: { id },
        });
    }
}
exports.RoomRepository = RoomRepository;
//# sourceMappingURL=RoomRepository.js.map