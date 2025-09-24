"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomController = void 0;
const client_1 = require("@prisma/client");
const RoomUseCaseFactory_1 = require("../../use-cases/@factories/RoomUseCaseFactory");
const MeetingUseCaseFactory_1 = require("../../use-cases/@factories/MeetingUseCaseFactory");
class RoomController {
    constructor(prisma) {
        this.prisma = prisma || new client_1.PrismaClient();
    }
    async getAll(req, res) {
        try {
            const getAllRoomsUseCase = RoomUseCaseFactory_1.RoomUseCaseFactory.createGetAllRoomsUseCase(this.prisma);
            const rooms = await getAllRoomsUseCase.execute();
            res.json(rooms);
        }
        catch (error) {
            console.error('Erro ao buscar salas:', error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }
    async getById(req, res) {
        try {
            const roomId = Number(req.params.id);
            if (isNaN(roomId)) {
                res.status(400).json({ error: 'ID da sala inválido' });
                return;
            }
            const getRoomUseCase = RoomUseCaseFactory_1.RoomUseCaseFactory.createGetRoomUseCase(this.prisma);
            const room = await getRoomUseCase.execute(roomId);
            if (!room) {
                res.status(404).json({ error: 'Sala não encontrada' });
                return;
            }
            res.json(room);
        }
        catch (error) {
            console.error('Erro ao buscar sala:', error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }
    async getMeetingsByDate(req, res) {
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
            const getRoomMeetingsUseCase = RoomUseCaseFactory_1.RoomUseCaseFactory.createGetRoomMeetingsUseCase(this.prisma);
            const meetings = await getRoomMeetingsUseCase.execute(roomId, queryDate);
            res.json(meetings);
        }
        catch (error) {
            console.error('Erro ao buscar reuniões da sala:', error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }
    async getMeetings(req, res) {
        try {
            const roomId = Number(req.params.id);
            if (isNaN(roomId)) {
                res.status(400).json({ error: 'ID da sala inválido' });
                return;
            }
            const { date } = req.query;
            let queryDate;
            if (date) {
                queryDate = new Date(date);
                if (isNaN(queryDate.getTime())) {
                    res.status(400).json({ error: 'Data inválida' });
                    return;
                }
            }
            const getRoomMeetingsUseCase = MeetingUseCaseFactory_1.MeetingUseCaseFactory.createGetRoomMeetingsUseCase(this.prisma);
            const meetings = await getRoomMeetingsUseCase.execute(roomId, queryDate);
            res.json(meetings);
        }
        catch (error) {
            console.error('Erro ao buscar reuniões da sala:', error);
            if (error.message.includes('não encontrada')) {
                res.status(404).json({ error: error.message });
            }
            else {
                res.status(500).json({ error: 'Erro interno do servidor' });
            }
        }
    }
}
exports.RoomController = RoomController;
//# sourceMappingURL=RoomController.js.map