"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.playerSchema = void 0;
const zod_1 = require("zod");
exports.playerSchema = zod_1.z.object({
    playerId: zod_1.z.string().min(1, 'Player ID is required'),
    team: zod_1.z.enum(['red', 'blue', 'green', 'yellow']),
    answers: zod_1.z.array(zod_1.z.string()).min(1, 'Player must have at least one answer'),
});
