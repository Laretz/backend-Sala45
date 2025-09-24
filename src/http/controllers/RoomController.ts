import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { RoomUseCaseFactory } from '../../use-cases/@factories/RoomUseCaseFactory';
import { MeetingUseCaseFactory } from '../../use-cases/@factories/MeetingUseCaseFactory';

export class RoomController {
  private prisma: PrismaClient;
  
  constructor(prisma?: PrismaClient) {
    this.prisma = prisma || new PrismaClient();
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const getAllRoomsUseCase = RoomUseCaseFactory.createGetAllRoomsUseCase(this.prisma);
      const rooms = await getAllRoomsUseCase.execute();

      res.json(rooms);
    } catch (error: any) {
      console.error('Erro ao buscar salas:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const roomId = Number(req.params.id);
      if (isNaN(roomId)) {
        res.status(400).json({ error: 'ID da sala inválido' });
        return;
      }

      const getRoomUseCase = RoomUseCaseFactory.createGetRoomUseCase(this.prisma);
      const room = await getRoomUseCase.execute(roomId);

      if (!room) {
        res.status(404).json({ error: 'Sala não encontrada' });
        return;
      }

      res.json(room);
    } catch (error: any) {
      console.error('Erro ao buscar sala:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async getMeetingsByDate(req: Request, res: Response): Promise<void> {
    try {
      const roomId = Number(req.params.id);
      const dateParam = req.params.date;
      
      if (isNaN(roomId)) {
        res.status(400).json({ error: 'ID da sala inválido' });
        return;
      }

      const queryDate = new Date(dateParam);
      if (isNaN(queryDate.getTime())) {
        res.status(400).json({ error: 'Data inválida' });
        return;
      }

      const getRoomMeetingsUseCase = RoomUseCaseFactory.createGetRoomMeetingsUseCase(this.prisma);
      const meetings = await getRoomMeetingsUseCase.execute(roomId, queryDate);

      res.json(meetings);
    } catch (error: any) {
      console.error('Erro ao buscar reuniões da sala:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async getMeetings(req: Request, res: Response): Promise<void> {
    try {
      const roomId = Number(req.params.id);
      if (isNaN(roomId)) {
        res.status(400).json({ error: 'ID da sala inválido' });
        return;
      }

      const { date } = req.query;
      let queryDate: Date | undefined;

      if (date) {
        queryDate = new Date(date as string);
        if (isNaN(queryDate.getTime())) {
          res.status(400).json({ error: 'Data inválida' });
          return;
        }
      }

      const getRoomMeetingsUseCase = MeetingUseCaseFactory.createGetRoomMeetingsUseCase(this.prisma);
      const meetings = await getRoomMeetingsUseCase.execute(roomId, queryDate);

      res.json(meetings);
    } catch (error: any) {
      console.error('Erro ao buscar reuniões da sala:', error);
      if (error.message.includes('não encontrada')) {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Erro interno do servidor' });
      }
    }
  }
}