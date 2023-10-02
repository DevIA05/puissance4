import { createEffect, createSignal, on } from "solid-js"
import { PieceEnum, boardState, setBoardState } from "./board"

type BoardItemProps = {
    row: number,
    column: number
}

function onclick(row:number, column: number) {
    console.log("onclick")
    setBoardState((prev) => {
        const newDict = {...prev}
        newDict[row][column] = PieceEnum.red
        return newDict
    })
    console.log(boardState())
}

export default function (props: BoardItemProps) {
    const [fillColor, setFillColor] = createSignal<PieceEnum>(PieceEnum.empty)
    
    createEffect(on(boardState,()=> {
        console.log("createEffect")
        console.log(boardState()[props.row][props.column]);
        
        setFillColor(boardState()[props.row][props.column])
    }))
    return (
        <svg height="100" width="100" onClick={() => onclick(props.row, props.column)}>
            <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill={fillColor()} />
        </svg>
    )
}