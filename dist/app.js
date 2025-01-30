"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const globalErrorHandler_1 = __importDefault(require("./app/middleware/globalErrorHandler"));
const routes_1 = __importDefault(require("./app/routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: ['http://localhost:3000', 'https://ideal-unity-production.up.railway.app'],
    credentials: true,
}));
// application routes
app.use('/api', routes_1.default);
app.use(globalErrorHandler_1.default);
app.use((req, res) => {
    res.status(404).json({
        success: false,
        statusCode: 404,
        message: 'Not found',
    });
});
exports.default = app;
