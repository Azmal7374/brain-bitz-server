"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quizSchema = void 0;
const zod_1 = require("zod");
// Define the validation schema using Zod
const quizSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Name is required'),
    roomCode: zod_1.z.string().min(6, 'Room code must be at least 6 characters'),
    selectedQuizzes: zod_1.z
        .array(zod_1.z.string())
        .min(1, 'At least one quiz must be selected'),
    timer: zod_1.z.number().min(10, 'Timer must be at least 10 seconds'),
});
exports.quizSchema = quizSchema;
