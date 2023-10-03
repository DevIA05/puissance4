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
// TODO: Mettre en place un fichier webSocket.ts !? comment ?
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
  
  console.log('new player (', playerPiece, ') connected in room', roomId)
  // console.log("room", room)

  socket.emit("player color", player == 1 ? "yellow" : "red"); // ! Pas une erreur ici mais intentionel

  // TODO: When game ended, delete / empty the room
  socket.join(roomId)

  if (player == 2) {
    io.to(roomId).to(room.playerOneSocketId as string).emit("opponent ready")
  }

  socket.on("move", (req: PlayerMoveType) => {
    console.log(playerPiece, "move =>", req)
    // TODO: Verify if the move is legal (turn, position) ?? Actualy dealt by the front

    // Mise à jour du board
    room.board = updateBoard(req.row, req.column, room.board, playerPiece)
    updateRooms(room, socket.id)
    const updatedRoom = getRooms().filter((_room) => _room.id == room.id)[0]

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