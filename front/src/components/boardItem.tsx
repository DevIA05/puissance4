import { createEffect, createSignal } from "solid-js"

import { GameStepEnum, PieceEnum, gameStep, setGameStep, setTurn, switchTurn, turn } from "./gameContext"
import { boardState, setWinningPieces, updateBoard, winningPieces } from "./board"
import { PageEnum, actualPage } from "../App"

import { checkNull, checkWinGlobal } from "../winDetection.utils"

import "./boardItem.css"
import { playerPieceColor } from "./online"

type BoardItemProps = {
    row: number,
    column: number
}
type PlayerMoveType = {
    row: number,
    column: number
}

export const [playerMove, setPlayerMove] = createSignal<PlayerMoveType>()

function onclickLocal(row:number, column: number) {
    // If spot already taken
    if (boardState()[row][column] != PieceEnum.empty) return;
    
    // TODO: Change to be able to click on the whole column
    if (row == 5 || boardState()[row + 1][column] != PieceEnum.empty) {
        // Update board
        updateBoard(row, column)

        // Check win situations
        const totalWinningPieces = checkWinGlobal()
        if (totalWinningPieces.length > 0) {
            setGameStep(GameStepEnum.win)
            setWinningPieces(totalWinningPieces)

        // Check null situations
        } else if (checkNull()) {
            setGameStep(GameStepEnum.draw)
        }

        // Switch to other player
        if (gameStep() == GameStepEnum.playing) {
            switchTurn()
        } else {setTurn(PieceEnum.red)}
    }
}

function onClickOnline(row:number, column: number) {
    if (turn() != playerPieceColor()) return;
    if (boardState()[row][column] != PieceEnum.empty) return;

    // TODO: Change to be able to click on the whole column
    if (row == 5 || boardState()[row + 1][column] != PieceEnum.empty) {
        setPlayerMove({row, column})
    }
}

export default function (props: BoardItemProps) {
    const [fillColor, setFillColor] = createSignal<PieceEnum>(PieceEnum.empty)
    const [isBlinking, setIsBlinking] = createSignal(false)
    
    createEffect(()=> {
        setFillColor(boardState()[props.row][props.column])
    })

    createEffect(() => {        
        if (winningPieces().filter((piece) => piece.column == props.column && piece.row == props.row).length > 0) {
            setIsBlinking(true)
        } else {setIsBlinking((prev) => prev ? false : prev )}
    })

    return (
        <svg height="100" width="100" onClick={() => actualPage() == PageEnum.local
            ? onclickLocal(props.row, props.column)
            : onClickOnline(props.row, props.column)}
        >
            <circle class={isBlinking() ? "blink": ""} cx="50" cy="50" r="40" stroke="black" stroke-width="1" fill={fillColor()} />
        </svg>
    )
}