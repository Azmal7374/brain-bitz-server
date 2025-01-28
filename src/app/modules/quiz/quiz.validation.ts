import { z } from 'zod';

// Define the validation schema using Zod
const quizSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  roomCode: z.string().min(6, 'Room code must be at least 6 characters'),
  selectedQuizzes: z
    .array(z.string())
    .min(1, 'At least one quiz must be selected'),
  timer: z.number().min(10, 'Timer must be at least 10 seconds'),
});

export { quizSchema };
