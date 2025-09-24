"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeetingController = void 0;
const MeetingUseCaseFactory_1 = require("../factories/MeetingUseCaseFactory");
class MeetingController {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(req, res) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                res.status(401).json({ error: 'Usuário não autenticado' });
                return;
            }
            const { title, description, startTime, endTime, roomId } = req.body;
            if (!title || !startTime || !endTime || !roomId) {
                res.status(400).json({ error: 'Título, horário de início, fim e sala são obrigatórios' });
                return;
            }
            const meetingData = {
                title,
                description,
                startTime: new Date(startTime),
                endTime: new Date(endTime),
                roomId: Number(roomId),
                userId,
            };
            const createMeetingUseCase = MeetingUseCaseFactory_1.MeetingUseCaseFactory.createCreateMeetingUseCase(this.prisma);
            const meeting = await createMeetingUseCase.execute(meetingData);
            res.status(201).json(meeting);
        }
        catch (error) {
            console.error('Erro ao criar reunião:', error);
            res.status(400).json({ error: error.message || 'Erro interno do servidor' });
        }
    }
    async getAll(req, res) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                res.status(401).json({ error: 'Usuário não autenticado' });
                return;
            }
            const getUserMeetingsUseCase = MeetingUseCaseFactory_1.MeetingUseCaseFactory.createGetUserMeetingsUseCase(this.prisma);
            const meetings = await getUserMeetingsUseCase.execute(userId);
            res.json(meetings);
        }
        catch (error) {
            console.error('Erro ao buscar reuniões:', error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }
    async getById(req, res) {
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
            const getMeetingUseCase = MeetingUseCaseFactory_1.MeetingUseCaseFactory.createGetMeetingUseCase(this.prisma);
            const meeting = await getMeetingUseCase.execute(meetingId, userId);
            if (!meeting) {
                res.status(404).json({ error: 'Reunião não encontrada' });
                return;
            }
            res.json(meeting);
        }
        catch (error) {
            console.error('Erro ao buscar reunião:', error);
            if (error.message.includes('Acesso negado')) {
                res.status(403).json({ error: error.message });
            }
            else {
                res.status(500).json({ error: 'Erro interno do servidor' });
            }
        }
    }
    async update(req, res) {
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
            const updateData = {
                title: title || '',
                description,
                startTime: startTime ? new Date(startTime) : new Date(),
                endTime: endTime ? new Date(endTime) : new Date(),
                roomId: roomId ? Number(roomId) : 0,
            };
            if (!title || !startTime || !endTime || !roomId) {
                res.status(400).json({ error: 'Campos obrigatórios: title, startTime, endTime, roomId' });
                return;
            }
            updateData.title = title;
            updateData.startTime = new Date(startTime);
            updateData.endTime = new Date(endTime);
            updateData.roomId = Number(roomId);
            const updateMeetingUseCase = MeetingUseCaseFactory_1.MeetingUseCaseFactory.createUpdateMeetingUseCase(this.prisma);
            const meeting = await updateMeetingUseCase.execute(meetingId, userId, updateData);
            res.json(meeting);
        }
        catch (error) {
            console.error('Erro ao atualizar reunião:', error);
            if (error.message.includes('Acesso negado') || error.message.includes('não encontrada')) {
                res.status(403).json({ error: error.message });
            }
            else {
                res.status(400).json({ error: error.message || 'Erro interno do servidor' });
            }
        }
    }
    async delete(req, res) {
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
            const deleteMeetingUseCase = MeetingUseCaseFactory_1.MeetingUseCaseFactory.createDeleteMeetingUseCase(this.prisma);
            await deleteMeetingUseCase.execute(meetingId, userId);
            res.status(204).send();
        }
        catch (error) {
            console.error('Erro ao deletar reunião:', error);
            if (error.message.includes('Acesso negado') || error.message.includes('não encontrada')) {
                res.status(403).json({ error: error.message });
            }
            else {
                res.status(500).json({ error: 'Erro interno do servidor' });
            }
        }
    }
    async checkConflict(req, res) {
        try {
            const { roomId, startTime, endTime, excludeMeetingId } = req.query;
            if (!roomId || !startTime || !endTime) {
                res.status(400).json({ error: 'roomId, startTime e endTime são obrigatórios' });
                return;
            }
            const checkConflictUseCase = MeetingUseCaseFactory_1.MeetingUseCaseFactory.createCheckMeetingConflictUseCase(this.prisma);
            const conflicts = await checkConflictUseCase.execute(Number(roomId), new Date(startTime), new Date(endTime), excludeMeetingId ? Number(excludeMeetingId) : undefined);
            res.json({ conflicts });
        }
        catch (error) {
            console.error('Erro ao verificar conflitos:', error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }
}
exports.MeetingController = MeetingController;
//# sourceMappingURL=MeetingController.js.map