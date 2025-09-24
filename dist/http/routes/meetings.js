"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const auth_1 = require("../middlewares/auth");
const MeetingController_1 = require("../controllers/MeetingController");
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
const meetingController = new MeetingController_1.MeetingController(prisma);
router.use(auth_1.authenticateToken);
router.post('/', (req, res) => meetingController.create(req, res));
router.get('/', (req, res) => meetingController.getAll(req, res));
router.get('/check-conflict', (req, res) => meetingController.checkConflict(req, res));
router.get('/:id', (req, res) => meetingController.getById(req, res));
router.put('/:id', (req, res) => meetingController.update(req, res));
router.delete('/:id', (req, res) => meetingController.delete(req, res));
exports.default = router;
//# sourceMappingURL=meetings.js.map