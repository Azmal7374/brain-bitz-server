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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startQuiz = void 0;
const quiz_model_1 = __importDefault(require("./quiz.model"));
const startQuiz = (_a) => __awaiter(void 0, [_a], void 0, function* ({ roomId }) {
    try {
        const room = yield quiz_model_1.default.findById(roomId);
        if (!room) {
            throw new Error('Room not found');
        }
        // Type assertion (casting) to Room to ensure proper type handling
        const typedRoom = room;
        typedRoom.quizStarted = true;
        typedRoom.currentQuestionIndex = 0;
        typedRoom.timeLeft = typedRoom.questions[0].timeLimit; // Set initial time limit based on first question
        // Reset users' answers
        typedRoom.users.forEach(user => {
            user.answers = [];
        });
        yield typedRoom.save();
        return typedRoom;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error('Failed to retrieve the room: ' + error.message);
        }
        else {
            throw new Error('Failed to retrieve the room: An unknown error occurred.');
        }
    }
});
exports.startQuiz = startQuiz;
