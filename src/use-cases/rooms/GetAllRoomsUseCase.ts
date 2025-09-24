import { Room } from '@prisma/client';
import { IRoomRepository } from '../../repositories/IRoomRepository';
import { IGetAllRoomsUseCase } from '../../repositories/IRoomUseCases';

export class GetAllRoomsUseCase implements IGetAllRoomsUseCase {
  constructor(private roomRepository: IRoomRepository) {}

  async execute(): Promise<Room[]> {
    return await this.roomRepository.findAll();
  }
}