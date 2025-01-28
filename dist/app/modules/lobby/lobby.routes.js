"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LobbyRoutes = void 0;
const express_1 = __importDefault(require("express"));
const lobby_controller_1 = require("./lobby.controller");
const router = express_1.default.Router();
// Quiz Routes
router.post('/quiz', lobby_controller_1.createQuiz);
// Lobby Routes
router.post('/lobby', lobby_controller_1.createLobby);
router.post('/lobby/addPlayer', lobby_controller_1.addPlayerToLobby);
// Player Routes
router.post('/player', lobby_controller_1.createPlayer);
exports.default = router;
exports.LobbyRoutes = router;
