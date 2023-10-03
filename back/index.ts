import express, { Request, Response , Application } from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io'
import dotenv from 'dotenv';

import { getAvailableRoom, getRooms, updateRooms } from './room.utils';

//For env File 
dotenv.config();
const port = process.env.PORT;

const app: Application = express();
const server = createServer(app)
const io = new Server(server, {
  cors:{
    origin: "*"
  }
})

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});

io.on('connection', (socket) => {
  console.log('new player connected')

  const room = getAvailableRoom()
  const roomId = String(room.id)
  const player = updateRooms(room, socket.id)

  console.log("room", room)
  socket.emit("is player", player == 1 ? "yellow" : "red"); // ! Pas une erreur ici mais intentionel

  socket.join(roomId)

  if (player == 2) {
    io.to(roomId).to(room.playerOneSocketId as string).emit("opponent ready")
  }

  socket.on("move", (req) => {
    console.log("move => ", req)
    // ! Mettre à jour le board, vérif les conditions de wins / null
    io.to(roomId).to(player == 1
      ? getRooms().filter((_room) => room.id == _room.id)[0].playerTwoSocketId as string
      : getRooms().filter((_room) => room.id == _room.id)[0].playerOneSocketId as string)
      .emit('opponent moved', req) // ! Envoyer le board actualisé plutôt
  })
  // TODO: Add an listenner to the disconnect event from client 
  // and remove from the room (socket and variable) 
})

server.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});