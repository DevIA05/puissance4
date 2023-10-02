import { createEffect, createSignal, on } from "solid-js"
import { boardState, setBoardState } from "./board"

export enum PieceEnum {
    red="red",
    yellow="yellow",
    empty="white"
}

const [turn, setTurn] = createSignal(PieceEnum.red)

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
    setBoardState((prev) => {
        const newDict = {...prev}
        newDict[row][column] = turn()
        return newDict
    })
    switchTurn()
}

export default function (props: BoardItemProps) {
    const [fillColor, setFillColor] = createSignal<PieceEnum>(PieceEnum.empty)
    
    createEffect(on(boardState,()=> {
        setFillColor(boardState()[props.row][props.column])
    }))
    return (
        <svg height="100" width="100" onClick={() => onclick(props.row, props.column)}>
            <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill={fillColor()} />
        </svg>
    )
}