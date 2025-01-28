"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.joinRoomSchema = exports.createRoomSchema = void 0;
const zod_1 = require("zod");
exports.createRoomSchema = zod_1.z.object({
    username: zod_1.z.string().min(1, 'Username is required'),
    quizCategories: zod_1.z
        .array(zod_1.z.string())
        .min(1, 'At least one quiz category must be selected'),
    timer: zod_1.z.number().min(10, 'Timer must be at least 10 seconds'),
    roomCode: zod_1.z
        .string()
        .length(6, 'Room code must be exactly 6 characters'),
    qrCode: zod_1.z.string().min(1, 'QR Code is required'), // QR Code validation
});
// Join room validation schema
exports.joinRoomSchema = zod_1.z.object({
    username: zod_1.z.string().min(1, 'Username is required'),
    roomCode: zod_1.z.string().length(6, 'Room code must be exactly 6 characters'),
});
