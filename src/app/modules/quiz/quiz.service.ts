import { QuizRoom } from "./quiz.interface";
import QuizModel from "./quiz.model";

interface StartQuizRequest {
  roomId: string;
}

export const startQuiz = async ({ roomId }: StartQuizRequest): Promise<QuizRoom | null> => {
  try {
    const room = await QuizModel.findById(roomId);

    if (!room) {
      throw new Error('Room not found');
    }

    // Type assertion (casting) to Room to ensure proper type handling
    const typedRoom = room as QuizRoom;

    typedRoom.quizStarted = true;
    typedRoom.currentQuestionIndex = 0;
    typedRoom.timeLeft = typedRoom.questions[0].timeLimit;  // Set initial time limit based on first question

    // Reset users' answers
    typedRoom.users.forEach(user => {
      user.answers = [];
    });

    await typedRoom.save();
    return typedRoom;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error('Failed to retrieve the room: ' + error.message);
    } else {
      throw new Error('Failed to retrieve the room: An unknown error occurred.');
    }
  }
};
