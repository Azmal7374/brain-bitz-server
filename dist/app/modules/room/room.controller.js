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
const room_validation_1 = require("./room.validation");
const room_service_1 = __importDefault(require("./room.service"));
class RoomController {
    createRoom(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Validate incoming request body using the createRoomSchema
                const validatedData = room_validation_1.createRoomSchema.parse(req.body);
                // Call the RoomService to create a new room
                const room = yield room_service_1.default.createRoom(validatedData);
                // Respond with the created room data
                res.status(201).json(room);
            }
            catch (error) {
                // Handle any validation errors
                res
                    .status(400)
                    .json({
                    error: error instanceof Error ? error.message : 'Invalid input',
                });
            }
        });
    }
    joinRoom(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Validate incoming request body using joinRoomSchema
                const validatedData = room_validation_1.joinRoomSchema.parse(req.body);
                // Call the RoomService to join a room
                const room = yield room_service_1.default.joinRoom(validatedData.roomCode, validatedData.username);
                // Respond with the updated room data
                res.status(200).json(room);
            }
            catch (error) {
                res
                    .status(400)
                    .json({
                    error: error instanceof Error ? error.message : 'Invalid input',
                });
            }
        });
    }
    getAllRooms(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Fetch all rooms from the RoomService
                const rooms = yield room_service_1.default.getAllRooms();
                res.status(200).json(rooms);
            }
            catch (error) {
                res
                    .status(500)
                    .json({
                    error: error instanceof Error ? error.message : 'Internal server error',
                });
            }
        });
    }
    // Explicitly return Promise<void> and don't return res directly
    getRoomByCode(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { roomCode } = req.params; // Extract roomCode from URL parameters
            try {
                // Get the room from RoomService
                const room = yield room_service_1.default.getRoomByCode(roomCode);
                console.log(room);
                // If the room is not found, send 404 response
                if (!room) {
                    res.status(404).json({ message: 'Room not found' });
                    return; // Ensure to return after sending a response to stop further execution
                }
                // If the room is found, send the room data as a response
                res.status(200).json(room);
            }
            catch (error) {
                // Handle any errors during the request
                res.status(500).json({
                    error: error instanceof Error ? error.message : 'Internal server error',
                });
            }
        });
    }
}
exports.default = new RoomController();
