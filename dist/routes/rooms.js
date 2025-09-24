"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const RoomController_1 = require("../controllers/RoomController");
const router = (0, express_1.Router)();
const roomController = new RoomController_1.RoomController();
router.use(auth_1.authenticateToken);
router.get('/', (req, res) => roomController.getAll(req, res));
router.get('/:id', (req, res) => roomController.getById(req, res));
router.get('/:id/meetings/:date', (req, res) => roomController.getMeetingsByDate(req, res));
exports.default = router;
//# sourceMappingURL=rooms.js.map