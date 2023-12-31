import { createEffect, createSignal } from "solid-js"

import { GameStepEnum, PieceEnum, gameStep, setGameStep, setTurn, switchTurn, turn } from "./gameContext"
import { boardState, setWinningPieces, updateBoard, winningPieces } from "./board"

import { checkNull, checkWinGlobal } from "../winDetection.utils"

import "./boardItem.css"

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
        <svg height="100" width="100" onClick={() => onclick(props.row, props.column)}>
            <circle class={isBlinking() ? "blink": ""} cx="50" cy="50" r="40" stroke="black" stroke-width="1" fill={fillColor()} />
        </svg>
    )
}