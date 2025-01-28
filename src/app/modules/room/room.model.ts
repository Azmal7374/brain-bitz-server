import mongoose, { Schema, Document } from 'mongoose';

// Question Interface for questions inside Room model
export interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

// Room Interface for the Room model
export interface Room extends Document {
  roomCode: string; // Unique code for the room
  leader: string; // Leader of the room
  users: { username: string }[]; // Array of users in the room
  quizCategories: string[]; // Array of selected quiz categories
  questions: Question[]; // Questions inside the room
  timer: number; // Timer value
  createdAt: Date; // Room creation date
  qrCode: string; // QR code (Base64 string)
}

const roomSchema = new Schema<Room>({
  roomCode: { type: String, required: true, unique: true }, // Unique Room Code
  leader: { type: String, required: true }, // Room leader's username
  users: [
    {
      username: { type: String, required: true }, // Username of users in the room
    },
  ],
  quizCategories: [{ type: String, required: true }], // Selected quiz categories
  questions: [
    {
      question: { type: String, required: true }, // Question text
      options: [{ type: String, required: true }], // Options for the question
      correctAnswer: { type: String, required: true }, // Correct answer
    },
  ],
  timer: { type: Number, required: true }, // Timer for the room
  qrCode: { type: String, required: true }, // QR Code for the room
  createdAt: { type: Date, default: Date.now }, // Created at timestamp
});

// Create Room Model
const roomModel = mongoose.model<Room>('Room', roomSchema);

export default roomModel;
