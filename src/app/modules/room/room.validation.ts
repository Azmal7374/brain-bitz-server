import { z } from 'zod';

export const createRoomSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  quizCategories: z
    .array(z.string())
    .min(1, 'At least one quiz category must be selected'),
  timer: z.number().min(10, 'Timer must be at least 10 seconds'),
  roomCode: z
    .string()
    .length(6, 'Room code must be exactly 6 characters'),
  qrCode: z.string().min(1, 'QR Code is required'), // QR Code validation
});

// Join room validation schema
export const joinRoomSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  roomCode: z.string().length(6, 'Room code must be exactly 6 characters'),
});
