import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { MeetingUseCaseFactory } from '../../use-cases/@factories/MeetingUseCaseFactory';
import { CreateMeetingData, UpdateMeetingData } from '../../domain/Meeting';

export class MeetingController {
  constructor(private prisma: PrismaClient) {}

  async create(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ error: 'Usuário não autenticado' });
        return;
      }

      const { title, description, startTime, endTime, roomId }: CreateMeetingData = req.body;

      // Validações básicas
      if (!title || !startTime || !endTime || !roomId) {
        res.status(400).json({ error: 'Título, horário de início, fim e sala são obrigatórios' });
        return;
      }

      const meetingData: CreateMeetingData = {
        title,
        description,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        roomId: Number(roomId),
        userId,
      };

      const createMeetingUseCase = MeetingUseCaseFactory.createCreateMeetingUseCase(this.prisma);
      const meeting = await createMeetingUseCase.execute(meetingData);

      res.status(201).json(meeting);
    } catch (error: any) {
      console.error('Erro ao criar reunião:', error);
      res.status(400).json({ error: error.message || 'Erro interno do servidor' });
    }
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ error: 'Usuário não autenticado' });
        return;
      }

      const getUserMeetingsUseCase = MeetingUseCaseFactory.createGetUserMeetingsUseCase(this.prisma);
      const meetings = await getUserMeetingsUseCase.execute(userId);

      res.json(meetings);
    } catch (error: any) {
      console.error('Erro ao buscar reuniões:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ error: 'Usuário não autenticado' });
        return;
      }

      const meetingId = Number(req.params.id);
      if (isNaN(meetingId)) {
        res.status(400).json({ error: 'ID da reunião inválido' });
        return;
      }

      const getMeetingUseCase = MeetingUseCaseFactory.createGetMeetingUseCase(this.prisma);
      const meeting = await getMeetingUseCase.execute(meetingId, userId);

      if (!meeting) {
        res.status(404).json({ error: 'Reunião não encontrada' });
        return;
      }

      res.json(meeting);
    } catch (error: any) {
      console.error('Erro ao buscar reunião:', error);
      if (error.message.includes('Acesso negado')) {
        res.status(403).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Erro interno do servidor' });
      }
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ error: 'Usuário não autenticado' });
        return;
      }

      const meetingId = Number(req.params.id);
      if (isNaN(meetingId)) {
        res.status(400).json({ error: 'ID da reunião inválido' });
        return;
      }

      const { title, description, startTime, endTime, roomId } = req.body;

      const updateData: UpdateMeetingData = {
        title: title || '',
        description,
        startTime: startTime ? new Date(startTime) : new Date(),
        endTime: endTime ? new Date(endTime) : new Date(),
        roomId: roomId ? Number(roomId) : 0,
      };

      // Validar campos obrigatórios
      if (!title || !startTime || !endTime || !roomId) {
        res.status(400).json({ error: 'Campos obrigatórios: title, startTime, endTime, roomId' });
        return;
      }

      // Recriar updateData com valores validados
      updateData.title = title;
      updateData.startTime = new Date(startTime);
      updateData.endTime = new Date(endTime);
      updateData.roomId = Number(roomId);

      const updateMeetingUseCase = MeetingUseCaseFactory.createUpdateMeetingUseCase(this.prisma);
      const meeting = await updateMeetingUseCase.execute(meetingId, userId, updateData);

      res.json(meeting);
    } catch (error: any) {
      console.error('Erro ao atualizar reunião:', error);
      if (error.message.includes('Acesso negado') || error.message.includes('não encontrada')) {
        res.status(403).json({ error: error.message });
      } else {
        res.status(400).json({ error: error.message || 'Erro interno do servidor' });
      }
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ error: 'Usuário não autenticado' });
        return;
      }

      const meetingId = Number(req.params.id);
      if (isNaN(meetingId)) {
        res.status(400).json({ error: 'ID da reunião inválido' });
        return;
      }

      const deleteMeetingUseCase = MeetingUseCaseFactory.createDeleteMeetingUseCase(this.prisma);
      await deleteMeetingUseCase.execute(meetingId, userId);

      res.status(204).send();
    } catch (error: any) {
      console.error('Erro ao deletar reunião:', error);
      if (error.message.includes('Acesso negado') || error.message.includes('não encontrada')) {
        res.status(403).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Erro interno do servidor' });
      }
    }
  }

  async checkConflict(req: Request, res: Response): Promise<void> {
    try {
      const { roomId, startTime, endTime, excludeMeetingId } = req.query;

      if (!roomId || !startTime || !endTime) {
        res.status(400).json({ error: 'roomId, startTime e endTime são obrigatórios' });
        return;
      }

      const checkConflictUseCase = MeetingUseCaseFactory.createCheckMeetingConflictUseCase(this.prisma);
      const conflicts = await checkConflictUseCase.execute(
        Number(roomId),
        new Date(startTime as string),
        new Date(endTime as string),
        excludeMeetingId ? Number(excludeMeetingId) : undefined
      );

      res.json({ conflicts });
    } catch (error: any) {
      console.error('Erro ao verificar conflitos:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}