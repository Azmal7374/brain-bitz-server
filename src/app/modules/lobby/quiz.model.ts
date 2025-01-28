import { z } from 'zod';

export const quizSchema = z.object({
  question: z.string().min(1, 'Question is required'),
  options: z
    .array(z.string())
    .min(2, 'There must be at least 2 options')
    .max(4, 'There can be at most 4 options'),
  correctAnswer: z.string().min(1, 'Correct answer is required'),
});

export type Quiz = z.infer<typeof quizSchema>;
