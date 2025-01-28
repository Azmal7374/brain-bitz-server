/* eslint-disable no-console */
import { Request, Response } from 'express';
import { createRoomSchema, joinRoomSchema } from './room.validation';
import RoomService from './room.service';

class RoomController {
  async createRoom(req: Request, res: Response): Promise<void> {
    try {
      // Validate incoming request body using the createRoomSchema
      const validatedData = createRoomSchema.parse(req.body);

      // Call the RoomService to create a new room
      const room = await RoomService.createRoom(validatedData);

      // Respond with the created room data
      res.status(201).json(room);
    } catch (error) {
      // Handle any validation errors
      res
        .status(400)
        .json({
          error: error instanceof Error ? error.message : 'Invalid input',
        });
    }
  }

  async joinRoom(req: Request, res: Response): Promise<void> {
    try {
      // Validate incoming request body using joinRoomSchema
      const validatedData = joinRoomSchema.parse(req.body);

      // Call the RoomService to join a room
      const room = await RoomService.joinRoom(
        validatedData.roomCode,
        validatedData.username,
      );

      // Respond with the updated room data
      res.status(200).json(room);
    } catch (error) {
      res
        .status(400)
        .json({
          error: error instanceof Error ? error.message : 'Invalid input',
        });
    }
  }

  async getAllRooms(req: Request, res: Response): Promise<void> {
    try {
      // Fetch all rooms from the RoomService
      const rooms = await RoomService.getAllRooms();
      res.status(200).json(rooms);
    } catch (error) {
      res
        .status(500)
        .json({
          error:
            error instanceof Error ? error.message : 'Internal server error',
        });
    }
  }

  // Explicitly return Promise<void> and don't return res directly
  async getRoomByCode(req: Request, res: Response): Promise<void> {
    const { roomCode } = req.params; // Extract roomCode from URL parameters

    try {
      // Get the room from RoomService
      const room = await RoomService.getRoomByCode(roomCode);
      console.log(room);

      // If the room is not found, send 404 response
      if (!room) {
        res.status(404).json({ message: 'Room not found' });
        return; // Ensure to return after sending a response to stop further execution
      }

      // If the room is found, send the room data as a response
      res.status(200).json(room);
    } catch (error) {
      // Handle any errors during the request
      res.status(500).json({
        error: error instanceof Error ? error.message : 'Internal server error',
      });
    }
  }
}

export default new RoomController();
