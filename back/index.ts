import express, { Request, Response , Application } from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io'
import dotenv from 'dotenv';

import { getAvailableRoom, getRooms, updateRooms } from './room.utils';
import { PieceEnum, PlayerMoveType, updateBoard } from './board.utils';
import { GameStepEnum, checkWinGlobal } from './winDetection.utils';

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
  
  const room = getAvailableRoom()
  const roomId = String(room.id)
  const player = updateRooms(room, socket.id)
  // TODO: Use this for the emit just after
  const playerPiece = player == 1 ? PieceEnum.yellow : PieceEnum.red
  
  console.log('new player connected in room', roomId)
  // console.log("room", room)
  socket.emit("is player", player == 1 ? "yellow" : "red"); // ! Pas une erreur ici mais intentionel

  socket.join(roomId)

  if (player == 2) {
    io.to(roomId).to(room.playerOneSocketId as string).emit("opponent ready")
  }

  socket.on("move", (req: PlayerMoveType) => {
    console.log("move => ", req)
    // Mise à jour du board
    room.board = updateBoard(req.row, req.column, room.board, playerPiece)
    updateRooms(room, socket.id) // TODO: May return updatedRoom !?
    const updatedRoom = getRooms().filter((_room) => _room.id == room.id)[0]
    // console.log("updatedRoom", updatedRoom)
    // ! Use getRooms().filter ??
    // TODO: Check that the winning condition is working properly
    // Winning condition
    const totalWinningPieces = checkWinGlobal(updatedRoom.board)
    if (totalWinningPieces.length > 0) {
      console.log("in room", roomId, "player", playerPiece, "won")
      io.to(roomId).emit("game result", {
        result: GameStepEnum.win,
        board: updatedRoom.board,
        winningPieces: totalWinningPieces
      })
      // TODO: Disconnect socket and reset rooms
      // ! Vérif la condition de null
    } else {
      io.to(roomId).emit('moved', updatedRoom.board) // ! Envoyer le board actualisé plutôt
    }
  })
  // TODO: Add an listenner to the disconnect event from client 
  // and remove from the room (socket and variable) 
})

server.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});