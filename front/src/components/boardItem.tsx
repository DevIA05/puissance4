import { createEffect, createSignal } from "solid-js"

import { GameStepEnum, PieceEnum, gameStep, setGameStep, setTurn, switchTurn, turn } from "./gameContext"
import { boardState, columns, rows, setBoardState } from "./board"

import { checkWin } from "../utils"

type BoardItemProps = {
    row: number,
    column: number
}

function onclick(row:number, column: number) {
    // If spot already taken
    if (boardState()[row][column] != PieceEnum.empty) return;

    // Update board
    if (row == 5 || boardState()[row + 1][column] != PieceEnum.empty) {
        setBoardState((prev) => {
            const newDict = {...prev}
            newDict[row][column] = turn()
            return newDict
        })
        // Check win situations
        for (const row of rows) {
            for (const column of columns) {
                const result = checkWin(row, column, boardState())
                if (result) {
                    console.log(turn() + "wins");
                    setGameStep(GameStepEnum.win)
                    break;
                }
            }
        }

        // Check null situations
        if (gameStep() == GameStepEnum.playing) {
            const emptyPos = boardState()[0].filter((piece) => piece == PieceEnum.empty)
            if (emptyPos.length == 0) {
                console.log("match null")
                setGameStep(GameStepEnum.null)
            }
        }

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
            <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill={fillColor()} />
        </svg>
    )
}