"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-console */
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./app/config"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const socketHandler_1 = __importDefault(require("./app/utlis/socketHandler"));
let server;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Connect to the database
            yield mongoose_1.default.connect(config_1.default.database_url);
            console.log('Database connected successfully');
            // Start HTTP server
            const httpServer = (0, http_1.createServer)(app_1.default);
            // Set up Socket.IO server
            const io = new socket_io_1.Server(server, {
                cors: {
                    origin: 'https://ideal-unity-production.up.railway.app', // Specify allowed origin (production URL)
                    methods: ['GET', 'POST'], // Allow both GET and POST methods
                    credentials: true, // Enable credentials if required
                },
            });
            // Attach socket handler
            (0, socketHandler_1.default)(io);
            // Start listening
            server = httpServer.listen(config_1.default.port, () => {
                console.log(`Server is running on port ${config_1.default.port}`);
            });
        }
        catch (err) {
            console.error('Database connection failed:', err);
            process.exit(1);
        }
    });
}
main();
// Handle unhandled promise rejections
process.on('unhandledRejection', (reason) => {
    console.error('Unhandled Rejection:', reason);
    if (server) {
        server.close(() => {
            console.log('Server closed due to unhandled rejection.');
            process.exit(1);
        });
    }
    else {
        process.exit(1);
    }
});
// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    if (server) {
        server.close(() => {
            console.log('Server closed due to uncaught exception.');
            process.exit(1);
        });
    }
    else {
        process.exit(1);
    }
});
