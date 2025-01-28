"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const room_route_1 = require("../modules/room/room.route");
const category_route_1 = require("../modules/category/category.route");
const lobby_routes_1 = require("../modules/lobby/lobby.routes");
const quiz_route_1 = require("../modules/quiz/quiz.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/room',
        route: room_route_1.RoomRoutes,
    },
    {
        path: '/categories',
        route: category_route_1.CategoryRoutes,
    },
    {
        path: '/lobby',
        route: lobby_routes_1.LobbyRoutes,
    },
    {
        path: '/start',
        route: quiz_route_1.StartQuiz,
    }
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
