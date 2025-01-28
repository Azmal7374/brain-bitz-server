"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quizSchema = void 0;
const zod_1 = require("zod");
exports.quizSchema = zod_1.z.object({
    question: zod_1.z.string().min(1, 'Question is required'),
    options: zod_1.z
        .array(zod_1.z.string())
        .min(2, 'There must be at least 2 options')
        .max(4, 'There can be at most 4 options'),
    correctAnswer: zod_1.z.string().min(1, 'Correct answer is required'),
});
