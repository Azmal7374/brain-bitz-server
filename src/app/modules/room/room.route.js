"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomRoutes = void 0;
const express_1 = __importDefault(require("express"));
const room_controller_1 = __importDefault(require("./room.controller"));
const router = express_1.default.Router();
router.post('/create', room_controller_1.default.createRoom);
router.post('/join', room_controller_1.default.joinRoom);
router.get('/:roomCode', room_controller_1.default.getRoomByCode);
router.get('/', room_controller_1.default.getAllRooms);
exports.RoomRoutes = router;
