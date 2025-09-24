import { Room } from '@prisma/client';

export interface IRoomRepository {
  findAll(): Promise<Room[]>;
  findById(id: number): Promise<Room | null>;
  create(roomData: Omit<Room, 'id'>): Promise<Room>;
  update(id: number, roomData: Partial<Room>): Promise<Room>;
  delete(id: number): Promise<void>;
}