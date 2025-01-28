import express from 'express';
import { startQuizController } from './quiz.controller';

const router = express.Router();

router.post('/startQuiz', startQuizController);

export const StartQuiz = router;
