"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startQuizController = void 0;
const quiz_service_1 = require("./quiz.service");
const startQuizController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { roomId } = req.body;
    if (!roomId) {
        res.status(400).json({ message: 'Room ID is required' });
        return;
    }
    try {
        const room = yield (0, quiz_service_1.startQuiz)({ roomId });
        if (!room) {
            res.status(404).json({ message: 'Room not found' });
            return;
        }
        res.status(200).json({
            message: 'Quiz started successfully',
            room,
        });
    }
    catch (error) {
        res.status(500).json({
            error: error instanceof Error ? error.message : 'An unknown error occurred',
        });
    }
});
exports.startQuizController = startQuizController;
