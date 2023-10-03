// TODO: refactor with / use board.tsx
import { io } from 'socket.io-client';
import GameContext, { PieceEnum } from './gameContext';
import { createEffect, onCleanup } from 'solid-js';
import Board from './board';
import { playerMove } from './boardItem';

export default function () {
    let playerPieceColor :PieceEnum

    // TODO: Put in .env
    const socket = io('http://localhost:8000')

    // player color
    socket.on("is player", (req) => {
      console.log(req)
      playerPieceColor = req == "red" ? PieceEnum.red : PieceEnum.yellow
      if (req == "yellow") {
        console.log("waiting for an opponent")
        socket.on('opponent ready', (req) => console.log("opponent is ready")
        )
      } else {
        console.log("red so opponent is already ready")
      }}
    )
    
    createEffect(() => {
        const move = playerMove()
        if (!move) return;

        socket.emit("move", move)
    })
    
    // TODO: Mettre en place ceux-ci
    // socket.on("opponent move") => update board ; switch turn
    // socket.on("game result")

    onCleanup(()=> {
        // TODO: Check if working properly
        socket.disconnect()
    })
    return (
        <GameContext>
            <Board />
        </GameContext>
    );
}