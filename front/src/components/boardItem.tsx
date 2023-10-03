import { createEffect, createSignal } from "solid-js"

import { GameStepEnum, PieceEnum, gameStep, setGameStep, setTurn, switchTurn, turn } from "./gameContext"
import { boardState, columns, rows, setBoardState, updateBoard } from "./board"

import { checkNull, checkWinGlobal } from "../winDetection.utils"

type BoardItemProps = {
    row: number,
    column: number
}

function onclick(row:number, column: number) {
    // If spot already taken
    if (boardState()[row][column] != PieceEnum.empty) return;

    if (row == 5 || boardState()[row + 1][column] != PieceEnum.empty) {
        // Update board
        updateBoard(row, column)

        // Check win situations
        if (checkWinGlobal()) {
            setGameStep(GameStepEnum.win)

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

export default function (props: BoardItemProps) {
    const [fillColor, setFillColor] = createSignal<PieceEnum>(PieceEnum.empty)
    
    createEffect(()=> {
        setFillColor(boardState()[props.row][props.column])
    })
    return (
        <svg height="100" width="100" onClick={() => onclick(props.row, props.column)}>
            <circle cx="50" cy="50" r="40" stroke="black" stroke-width="1" fill={fillColor()} />
        </svg>
    )
}