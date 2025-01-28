import { Request, Response } from 'express';
import { startQuiz } from './quiz.service';

export const startQuizController = async (req: Request, res: Response): Promise<void> => {
  const { roomId } = req.body;

  if (!roomId) {
    res.status(400).json({ message: 'Room ID is required' });
    return;
  }

  try {
    const room = await startQuiz({ roomId });

    if (!room) {
      res.status(404).json({ message: 'Room not found' });
      return;
    }

    res.status(200).json({
      message: 'Quiz started successfully',
      room,
    });
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : 'An unknown error occurred',
    });
  }
};
