import { PrismaClient, Room } from '@prisma/client';
import { IRoomRepository } from '../IRoomRepository';

export class RoomRepository implements IRoomRepository {
  constructor(private prisma: PrismaClient) {}

  async findAll(): Promise<Room[]> {
    return await this.prisma.room.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async findById(id: number): Promise<Room | null> {
    return await this.prisma.room.findUnique({
      where: { id },
    });
  }

  async create(roomData: Omit<Room, 'id'>): Promise<Room> {
    return await this.prisma.room.create({
      data: roomData,
    });
  }

  async update(id: number, roomData: Partial<Room>): Promise<Room> {
    return await this.prisma.room.update({
      where: { id },
      data: roomData,
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.room.delete({
      where: { id },
    });
  }
}