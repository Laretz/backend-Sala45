import { Room } from '@prisma/client';

export interface IGetAllRoomsUseCase {
  execute(): Promise<Room[]>;
}

export interface IGetRoomUseCase {
  execute(roomId: number): Promise<Room | null>;
}