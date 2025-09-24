import { Room } from '@prisma/client';
import { IRoomRepository } from '../../repositories/IRoomRepository';
import { IGetRoomUseCase } from '../../repositories/IRoomUseCases';

export class GetRoomUseCase implements IGetRoomUseCase {
  constructor(private roomRepository: IRoomRepository) {}

  async execute(roomId: number): Promise<Room | null> {
    return await this.roomRepository.findById(roomId);
  }
}