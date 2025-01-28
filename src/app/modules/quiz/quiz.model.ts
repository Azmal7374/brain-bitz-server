import { model, Schema } from "mongoose";
import { QuizRoom } from "./quiz.interface";

const QuizSchema = new Schema<QuizRoom>({
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

const QuizModel = model<QuizRoom>('QuizRoom', QuizSchema);

export default QuizModel;
