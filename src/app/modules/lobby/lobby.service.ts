import { v4 as uuidv4 } from 'uuid';
import { Lobby } from './lobby.model';
import { Quiz } from './quiz.model';
// import { Player } from './players.model';

class TriviaService {
  private lobbies: Lobby[] = [];
  private quizzes: Quiz[] = [];
  // private players: Player[];

  // Create a quiz
  createQuiz(quizData: Quiz): Quiz {
    const newQuiz = quizData;
    this.quizzes.push(newQuiz);
    return newQuiz;
  }

  // Create a lobby
  createLobby(quizId: string, leaderId: string): Lobby {
    const lobbyId = uuidv4();
    const lobby: Lobby = {
      lobbyId,
      quizId,
      leaderId,
      players: [],
      currentQuestionIndex: 0,
      status: 'waiting',
    };
    this.lobbies.push(lobby);
    return lobby;
  }

  // Add a player to a lobby
  addPlayerToLobby(lobbyId: string, playerId: string): void {
    const lobby = this.lobbies.find((lobby) => lobby.lobbyId === lobbyId);
    if (lobby && !lobby.players.includes(playerId)) {
      lobby.players.push(playerId);
    }
  }

  // Get current question for the lobby
  getCurrentQuestion(lobbyId: string): Quiz | undefined {
    const lobby = this.lobbies.find((lobby) => lobby.lobbyId === lobbyId);
    if (lobby) {
      return this.quizzes[lobby.currentQuestionIndex];
    }
    return undefined;
  }

  // Start the quiz
  startQuiz(lobbyId: string): void {
    const lobby = this.lobbies.find((lobby) => lobby.lobbyId === lobbyId);
    if (lobby) {
      lobby.status = 'in-progress';
    }
  }
}

export default new TriviaService();
