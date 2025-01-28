import { z } from 'zod';

export const lobbySchema = z.object({
  lobbyId: z.string().min(1, 'Lobby ID is required'),
  quizId: z.string().min(1, 'Quiz ID is required'),
  leaderId: z.string().min(1, 'Leader ID is required'),
  players: z.array(z.string()).min(1, 'At least one player is required'),
  currentQuestionIndex: z
    .number()
    .min(0, 'Index must be greater than or equal to 0'),
  status: z.enum(['waiting', 'in-progress', 'completed']),
});

export type Lobby = z.infer<typeof lobbySchema>;
