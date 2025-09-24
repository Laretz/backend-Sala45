"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const auth_1 = require("../middlewares/auth");
const AuthController_1 = require("../controllers/AuthController");
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
const authController = new AuthController_1.AuthController(prisma);
router.post('/register', (req, res) => authController.register(req, res));
router.post('/login', (req, res) => authController.login(req, res));
router.get('/me', auth_1.authenticateToken, (req, res) => authController.getMe(req, res));
exports.default = router;
//# sourceMappingURL=auth.js.map