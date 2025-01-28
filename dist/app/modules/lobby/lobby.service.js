"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
// import { Player } from './players.model';
class TriviaService {
    constructor() {
        this.lobbies = [];
        this.quizzes = [];
    }
    // private players: Player[];
    // Create a quiz
    createQuiz(quizData) {
        const newQuiz = quizData;
        this.quizzes.push(newQuiz);
        return newQuiz;
    }
    // Create a lobby
    createLobby(quizId, leaderId) {
        const lobbyId = (0, uuid_1.v4)();
        const lobby = {
            lobbyId,
            quizId,
            leaderId,
            players: [],
            currentQuestionIndex: 0,
            status: 'waiting',
        };
        this.lobbies.push(lobby);
        return lobby;
    }
    // Add a player to a lobby
    addPlayerToLobby(lobbyId, playerId) {
        const lobby = this.lobbies.find((lobby) => lobby.lobbyId === lobbyId);
        if (lobby && !lobby.players.includes(playerId)) {
            lobby.players.push(playerId);
        }
    }
    // Get current question for the lobby
    getCurrentQuestion(lobbyId) {
        const lobby = this.lobbies.find((lobby) => lobby.lobbyId === lobbyId);
        if (lobby) {
            return this.quizzes[lobby.currentQuestionIndex];
        }
        return undefined;
    }
    // Start the quiz
    startQuiz(lobbyId) {
        const lobby = this.lobbies.find((lobby) => lobby.lobbyId === lobbyId);
        if (lobby) {
            lobby.status = 'in-progress';
        }
    }
}
exports.default = new TriviaService();
