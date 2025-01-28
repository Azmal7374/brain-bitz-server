import { z } from 'zod';

export const playerSchema = z.object({
  playerId: z.string().min(1, 'Player ID is required'),
  team: z.enum(['red', 'blue', 'green', 'yellow']),
  answers: z.array(z.string()).min(1, 'Player must have at least one answer'),
});

export type Player = z.infer<typeof playerSchema>;
