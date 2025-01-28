import { Router } from 'express';
import { RoomRoutes } from '../modules/room/room.route';
import { CategoryRoutes } from '../modules/category/category.route';
import { LobbyRoutes } from '../modules/lobby/lobby.routes';
import { StartQuiz } from '../modules/quiz/quiz.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/room',
    route: RoomRoutes,
  },
  {
    path: '/categories',
    route: CategoryRoutes,
  },
  {
    path: '/lobby',
    route: LobbyRoutes,
  },
  {
    path: '/start',
    route: StartQuiz,
  }
  
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
