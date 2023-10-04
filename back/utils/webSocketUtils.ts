import { Server, Socket } from "socket.io";
import { PieceEnum, PlayerMoveType, updateBoard } from "./board.utils";
import { getAvailableRoom, updateRooms, getRooms, resetRoom, RoomType } from "./room.utils";
import { checkWinGlobal, GameStepEnum, checkNull } from "./winDetection.utils";

function onMove(io: Server, socket: Socket, req: PlayerMoveType, room: RoomType, roomId: string, playerPiece: PieceEnum.red | PieceEnum.yellow) {
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
      resetRoom(Number(roomId))
      // TODO: Disconnect socket and reset rooms
      // TODO: Verify if this works properly
    // Draw condition
    } else if (checkNull(updatedRoom.board)){
      console.log("draw in room", roomId)

      io.to(roomId).emit("game result", {
        result: GameStepEnum.draw,
        board: updatedRoom.board
      })
      resetRoom(Number(roomId))
      // TODO: Disconnect socket and reset rooms
    } else {
      io.to(roomId).emit('moved', updatedRoom.board)
    }
  }

export function webSocketConnection(socket: Socket, io:Server) {
  
    const room = getAvailableRoom()
    const roomId = String(room.id)
    const player = updateRooms(room, socket.id)
    const playerPiece = player == 1 ? PieceEnum.yellow : PieceEnum.red // Pas une erreur ici mais intentionel (inversion=> p1:yellow ; p2:red)
    
    console.log('new player (', playerPiece, ') connected in room', roomId)
  
    socket.emit("player color", playerPiece);
    
    // TODO: When game ended, delete / empty the room ?
    socket.join(roomId)
  
    if (player == 2) {
      io.to(roomId).to(room.playerOneSocketId as string).emit("opponent ready")
    }
  
    // TODO: Put the anonymous functions in external functions
    socket.on("move", (req: PlayerMoveType) => onMove(io, socket, req, room, roomId, playerPiece))
  
    socket.on("disconnect", () => {
      // Disconnect the other player
      io.to(roomId).emit("disconnection order")
  
      console.log(playerPiece, "player of room", roomId, "disconnected by itself")
      // console.log("rooms before reset",getRooms())
      resetRoom(Number(roomId))
      // console.log("rooms after reset",getRooms())
  
    })
    // TODO: Add an listenner to the disconnect event from client 
    // and remove from the room (socket and variable)
  }