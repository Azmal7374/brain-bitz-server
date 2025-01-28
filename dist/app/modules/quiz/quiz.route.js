"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartQuiz = void 0;
const express_1 = __importDefault(require("express"));
const quiz_controller_1 = require("./quiz.controller");
const router = express_1.default.Router();
router.post('/startQuiz', quiz_controller_1.startQuizController);
exports.StartQuiz = router;
