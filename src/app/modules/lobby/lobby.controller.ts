import { Request, Response } from 'express';
import TriviaService from './lobby.service';
import { playerSchema } from './players.model';
import { quizSchema } from './quiz.model';
import { lobbySchema } from './lobby.model';

// Create Player function
export const createPlayer = (req: Request, res: Response) => {
  try {
    const parsedData = playerSchema.parse(req.body);
    TriviaService.addPlayerToLobby(parsedData.team, parsedData.playerId);
    res.status(201).json({ message: 'Player created' });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: 'An unknown error occurred' });
    }
  }
};

// Create Quiz function
export const createQuiz = (req: Request, res: Response) => {
  try {
    const parsedData = quizSchema.parse(req.body);
    const newQuiz = TriviaService.createQuiz(parsedData);
    res.status(201).json(newQuiz);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: 'An unknown error occurred' });
    }
  }
};

// Create Lobby function
export const createLobby = (req: Request, res: Response) => {
  try {
    const parsedData = lobbySchema.parse(req.body);
    const newLobby = TriviaService.createLobby(
      parsedData.quizId,
      parsedData.leaderId,
    );
    res.status(201).json(newLobby);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: 'An unknown error occurred' });
    }
  }
};

// Add Player to Lobby function
export const addPlayerToLobby = (req: Request, res: Response) => {
  const { lobbyId, playerId } = req.body;
  TriviaService.addPlayerToLobby(lobbyId, playerId);
  res.status(200).json({ message: 'Player added to lobby' });
};
