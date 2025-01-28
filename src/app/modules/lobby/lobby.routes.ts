import express from 'express';
import {
  addPlayerToLobby,
  createLobby,
  createPlayer,
  createQuiz,
} from './lobby.controller';

const router = express.Router();

// Quiz Routes
router.post('/quiz', createQuiz);

// Lobby Routes
router.post('/lobby', createLobby);
router.post('/lobby/addPlayer', addPlayerToLobby);

// Player Routes
router.post('/player', createPlayer);

export default router;

export const LobbyRoutes = router;
