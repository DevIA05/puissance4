import { createEffect, createSignal } from "solid-js"
import { boardState, setBoardState } from "./board"
import { PieceEnum, setTurn, turn } from "./navbar"

function switchTurn() {
    setTurn((prev) =>
        prev == PieceEnum.red ? PieceEnum.yellow : PieceEnum.red
    )
}

type BoardItemProps = {
    row: number,
    column: number
}

function onclick(row:number, column: number) {
    if (boardState()[row][column] != PieceEnum.empty) return;
    if (row == 5 || boardState()[row + 1][column] != PieceEnum.empty) {
        setBoardState((prev) => {
            const newDict = {...prev}
            newDict[row][column] = turn()
            return newDict
        })
        switchTurn()
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