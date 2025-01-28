import { Document} from 'mongoose';

interface User {
  username: string;
  answers: string[];
}

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
  timeLimit: number;
}

export interface QuizRoom extends Document {
  leader: string;
  quizStarted: boolean;
  currentQuestionIndex: number;
  timeLeft: number;
  users: User[];
  questions: Question[];
  roomCode: string; // Add missing properties
  quizCategories: string[]; // Add missing properties
  timer: number; // Add missing properties
  createdAt: Date; // Add missing properties
  qrCodets: string; // Add missing properties
}

