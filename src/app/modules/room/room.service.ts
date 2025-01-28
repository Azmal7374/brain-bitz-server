import { Server } from 'socket.io';
import categoryModel from '../category/category.model';
import roomModel from './room.model';

class RoomService {
  private static io: Server;

  constructor(io: Server) {
    RoomService.io = io; // Initialize the static Socket.IO instance
  }

  // Create a new room
 static async createRoom(data: {
  username: string;
  quizCategories: string[];
  timer: number;
  roomCode: string;
  qrCode: string;
}) {
  const { username, quizCategories, timer, roomCode, qrCode } = data;

  // Fetch questions from the selected categories
  const categories = await categoryModel.find({
    name: { $in: quizCategories },
  });
  const questions = categories.flatMap((category) => category.questions);

  // Check if the room already exists to determine if a leader exists
  let room = await roomModel.findOne({ roomCode });

  // If room doesn't exist, create a new one and set the first user as the leader
  if (!room) {
    room = await roomModel.create({
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
  } else {
    // If the room exists, add the new user without changing the leader
    room.users.push({ username });
    await room.save();
  }

  // Send the room and leader's information back to the frontend
  const leader = room.leader; // Retrieve leader from the database
  return { room, leader };
}

  

  // Join an existing room
  static async joinRoom(roomCode: string, username: string) {
    const room = await roomModel.findOne({ roomCode });

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
    await room.save();

    // Notify all users in the room about the new user
    if (RoomService.io) {
      RoomService.io.to(roomCode).emit('userJoined', { username, roomCode });
    } else {
      console.warn('Socket.IO instance is not initialized');
    }

    return room;
  }

  // Get all rooms
  static async getAllRooms() {
    const rooms = await roomModel.find(); // Fetch all rooms from the database
    return rooms;
  }

  // Static method to fetch a single room by roomCode
  static async getRoomByCode(roomCode: string) {
    try {
      // Ensure we are looking for the correct field: roomCode
      const room = await roomModel.findOne({ roomCode }); // Use roomCode instead of roomId
      return room;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error('Failed to retrieve the room: ' + error.message);
      } else {
        throw new Error(
          'Failed to retrieve the room: An unknown error occurred.',
        );
      }
    }
  }
}

export default RoomService;
