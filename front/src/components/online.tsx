// TODO: refactor with / use board.tsx
import { io } from 'socket.io-client';
import GameContext, { GameStepEnum, PieceEnum, setGameStep, switchTurn } from './gameContext';
import { createEffect, createSignal, onCleanup } from 'solid-js';
import Board, { WinningPiecesType, boardStateDictType, setBoardState, setWinningPieces } from './board';
import { playerMove } from './boardItem';

export const [playerPieceColor, setPlayerPieceColor] = createSignal<PieceEnum>()

// TODO: Don't use GameStepEnum but a specific one ?
type WinningRequestType = {
    result: GameStepEnum,
    board: boardStateDictType,
    winningPieces?: WinningPiecesType
}

export default function () {
    // TODO: Put url in .env
    const socket = io('http://localhost:8000')

    // player color
    socket.on("player color", (req) => {
      console.log(req)
      setPlayerPieceColor(req == "red" ? PieceEnum.red : PieceEnum.yellow)
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
    
    // TODO: Check these ones works properly
    socket.on("moved", (req: boardStateDictType)=> {
        switchTurn()
        setBoardState(req)
    })
    socket.on("game result", (req: WinningRequestType) => {
        setBoardState(req.board);
        setWinningPieces(req.winningPieces as WinningPiecesType)
        setGameStep(req.result)
    })

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