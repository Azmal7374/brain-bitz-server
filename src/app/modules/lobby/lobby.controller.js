"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPlayerToLobby = exports.createLobby = exports.createQuiz = exports.createPlayer = void 0;
const lobby_service_1 = __importDefault(require("./lobby.service"));
const players_model_1 = require("./players.model");
const quiz_model_1 = require("./quiz.model");
const lobby_model_1 = require("./lobby.model");
// Create Player function
const createPlayer = (req, res) => {
    try {
        const parsedData = players_model_1.playerSchema.parse(req.body);
        lobby_service_1.default.addPlayerToLobby(parsedData.team, parsedData.playerId);
        res.status(201).json({ message: 'Player created' });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        }
        else {
            res.status(400).json({ message: 'An unknown error occurred' });
        }
    }
};
exports.createPlayer = createPlayer;
// Create Quiz function
const createQuiz = (req, res) => {
    try {
        const parsedData = quiz_model_1.quizSchema.parse(req.body);
        const newQuiz = lobby_service_1.default.createQuiz(parsedData);
        res.status(201).json(newQuiz);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        }
        else {
            res.status(400).json({ message: 'An unknown error occurred' });
        }
    }
};
exports.createQuiz = createQuiz;
// Create Lobby function
const createLobby = (req, res) => {
    try {
        const parsedData = lobby_model_1.lobbySchema.parse(req.body);
        const newLobby = lobby_service_1.default.createLobby(parsedData.quizId, parsedData.leaderId);
        res.status(201).json(newLobby);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        }
        else {
            res.status(400).json({ message: 'An unknown error occurred' });
        }
    }
};
exports.createLobby = createLobby;
// Add Player to Lobby function
const addPlayerToLobby = (req, res) => {
    const { lobbyId, playerId } = req.body;
    lobby_service_1.default.addPlayerToLobby(lobbyId, playerId);
    res.status(200).json({ message: 'Player added to lobby' });
};
exports.addPlayerToLobby = addPlayerToLobby;
