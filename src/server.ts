/* eslint-disable no-console */
import mongoose from 'mongoose';
import app from './app';
import config from './app/config';
import { createServer, Server } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import socketHandler from './app/utlis/socketHandler';

let server: Server; 

async function main() {
  try {
    // Connect to the database
    await mongoose.connect(config.database_url as string);
    console.log('Database connected successfully');

    // Start HTTP server
    const httpServer = createServer(app);

   // Set up Socket.IO server
const io = new SocketIOServer(server, {
  cors: {
    origin: 'https://ideal-unity-production.up.railway.app', 
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

    socketHandler(io);

    server = httpServer.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });
  } catch (err) {
    console.error('Database connection failed:', err);
    process.exit(1);
  }
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
  } else {
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
  } else {
    process.exit(1);
  }
});
