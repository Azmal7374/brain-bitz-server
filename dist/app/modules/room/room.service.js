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
const category_model_1 = __importDefault(require("../category/category.model"));
const room_model_1 = __importDefault(require("./room.model"));
class RoomService {
    constructor(io) {
        RoomService.io = io; // Initialize the static Socket.IO instance
    }
    // Create a new room
    static createRoom(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, quizCategories, timer, roomCode, qrCode } = data;
            // Fetch questions from the selected categories
            const categories = yield category_model_1.default.find({
                name: { $in: quizCategories },
            });
            const questions = categories.flatMap((category) => category.questions);
            // Check if the room already exists to determine if a leader exists
            let room = yield room_model_1.default.findOne({ roomCode });
            // If room doesn't exist, create a new one and set the first user as the leader
            if (!room) {
                room = yield room_model_1.default.create({
                    roomCode, // Use the roomCode passed from the frontend
                    users: [{ username, isLeader: true }], // First user as the leader
                    quizCategories,
                    questions,
                    timer,
                    qrCode, // Use the qrCode passed from the frontend
                    leader: username, // Store the leader's username
                });
                // Notify all users (optional)
                if (RoomService.io) {
                    RoomService.io.emit('roomCreated', { roomCode, username });
                }
            }
            else {
                // If the room exists, add the new user without changing the leader
                room.users.push({ username });
                yield room.save();
            }
            // Send the room and leader's information back to the frontend
            const leader = room.leader; // Retrieve leader from the database
            return { room, leader };
        });
    }
    // Join an existing room
    static joinRoom(roomCode, username) {
        return __awaiter(this, void 0, void 0, function* () {
            const room = yield room_model_1.default.findOne({ roomCode });
            if (!room) {
                throw new Error('Room not found');
            }
            // Check if the username already exists in the room
            const userExists = room.users.some((user) => user.username === username);
            if (userExists) {
                throw new Error('Username already exists in the room');
            }
            // Add the user to the room
            room.users.push({ username });
            yield room.save();
            // Notify all users in the room about the new user
            if (RoomService.io) {
                RoomService.io.to(roomCode).emit('userJoined', { username, roomCode });
            }
            else {
                console.warn('Socket.IO instance is not initialized');
            }
            return room;
        });
    }
    // Get all rooms
    static getAllRooms() {
        return __awaiter(this, void 0, void 0, function* () {
            const rooms = yield room_model_1.default.find(); // Fetch all rooms from the database
            return rooms;
        });
    }
    // Static method to fetch a single room by roomCode
    static getRoomByCode(roomCode) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Ensure we are looking for the correct field: roomCode
                const room = yield room_model_1.default.findOne({ roomCode }); // Use roomCode instead of roomId
                return room;
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error('Failed to retrieve the room: ' + error.message);
                }
                else {
                    throw new Error('Failed to retrieve the room: An unknown error occurred.');
                }
            }
        });
    }
}
exports.default = RoomService;
