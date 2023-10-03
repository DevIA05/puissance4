import express, { Express, Request, Response , Application } from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io'

import dotenv from 'dotenv';

// TODO: Découper le fichier

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
type RoomType = {
  id: number,
  playerOneSocketId: string | undefined,
  playerTwoSocketId: string | undefined,
}

// TODO: Utiliser une DB !?
let rooms: RoomType[] = [0,1,2].map((id) => {
  return {id, playerOneSocketId: undefined, playerTwoSocketId: undefined}
})

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});

function getAvailableRoom(rooms: RoomType[]) {
  const roomForPlayerTwo = rooms.filter((room) => room.playerOneSocketId && !room.playerTwoSocketId)
  if (roomForPlayerTwo.length != 0) {
    return roomForPlayerTwo[0]
  } else {
    return rooms.filter((room) => !room.playerOneSocketId)[0]
  }
}

function updateRooms(room: RoomType, socketId: string) {
  let player:number;
  if (!room.playerOneSocketId) {
    room.playerOneSocketId = socketId
    player = 1 
  } else {
    room.playerTwoSocketId = socketId
    player = 2
  }

  const oldRooms = rooms.filter((_room) => room.id != _room.id)
  oldRooms.push(room)
  rooms = oldRooms
  return player
}

io.on('connection', (socket) => {
  console.log('new player connected')

  const room = getAvailableRoom(rooms)
  const roomId = String(room.id)
  const player = updateRooms(room, socket.id)

  console.log("room", room)
  socket.emit("is player", player == 1 ? "yellow" : "red"); // ! Pas une erreur ici mais intentionel

  socket.join(roomId)
  if (player == 2) {
    io.to(roomId).to(room.playerOneSocketId as string).emit("opponent ready")
  }
  socket.on("move", (req) => {
    console.log("req", req)
    io.to(roomId).to(player == 1
      ? rooms.filter((_room) => room.id == _room.id)[0].playerTwoSocketId as string
      : rooms.filter((_room) => room.id == _room.id)[0].playerOneSocketId as string)
      .emit('opponent move', req)
  })
  // TODO: Add an listenner to the disconnect event from client 
  // and remove from the room (socket and variable) 
})

server.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});