"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const QuizSchema = new mongoose_1.Schema({
    leader: {
        type: String,
        required: true,
    },
    quizStarted: {
        type: Boolean,
        default: false,
    },
    currentQuestionIndex: {
        type: Number,
        default: 0,
    },
    timeLeft: {
        type: Number,
        default: 0,
    },
    users: [{
            username: { type: String, required: true },
            answers: { type: [String], default: [] },
        }],
    questions: [{
            question: { type: String, required: true },
            options: { type: [String], required: true },
            correctAnswer: { type: String, required: true },
            timeLimit: { type: Number, required: true },
        }],
    roomCode: { type: String, required: true },
    quizCategories: [{ type: String, required: true }],
    timer: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    qrCodets: { type: String, required: true },
});
const QuizModel = (0, mongoose_1.model)('QuizRoom', QuizSchema);
exports.default = QuizModel;
