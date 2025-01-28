export interface Quiz {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface Lobby {
  lobbyId: string;
  quizId: string;
  leaderId: string;
  players: string[];
  currentQuestionIndex: number;
  status: 'waiting' | 'in-progress' | 'completed';
}

export interface Player {
  playerId: string;
  team: 'red' | 'blue' | 'green' | 'yellow';
  answers: string[];
}
