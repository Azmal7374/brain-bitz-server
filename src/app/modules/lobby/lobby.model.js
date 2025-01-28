"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lobbySchema = void 0;
const zod_1 = require("zod");
exports.lobbySchema = zod_1.z.object({
    lobbyId: zod_1.z.string().min(1, 'Lobby ID is required'),
    quizId: zod_1.z.string().min(1, 'Quiz ID is required'),
    leaderId: zod_1.z.string().min(1, 'Leader ID is required'),
    players: zod_1.z.array(zod_1.z.string()).min(1, 'At least one player is required'),
    currentQuestionIndex: zod_1.z
        .number()
        .min(0, 'Index must be greater than or equal to 0'),
    status: zod_1.z.enum(['waiting', 'in-progress', 'completed']),
});
