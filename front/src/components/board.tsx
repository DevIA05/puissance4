import { For, createSignal } from "solid-js"
import BoardItem from "./boardItem"
import { PieceEnum, turn } from "./gameContext"

export type boardStateDictType = { [key: number]: PieceEnum[] }
// TODO: Use PieceType[] instead !?
export type WinningPiecesType = { row: number, column: number}[]

export const rows = [0, 1, 2, 3, 4, 5]
export const columns = [0, 1, 2, 3, 4, 5, 6]

export function getInitialBoard() {
    const initialBoardStateDict: boardStateDictType = {}
    
    // TODO: Rewrite
    for (const row of rows) {
        initialBoardStateDict[row] = [PieceEnum.empty,PieceEnum.empty,PieceEnum.empty,PieceEnum.empty,PieceEnum.empty,PieceEnum.empty,PieceEnum.empty]
    }
    return initialBoardStateDict
}

export const [boardState, setBoardState] = createSignal<boardStateDictType>(getInitialBoard())

export const [winningPieces, setWinningPieces] = createSignal<WinningPiecesType>([])

export function updateBoard(row:number, column: number) {
    setBoardState((prev) => {
        const newDict = {...prev}
        newDict[row][column] = turn()
        return newDict
    })
}

export default function () {
    return (
        <div class="flex justify-center mt-5">
            <div class="grid grid-cols-7 bg-blue-800 border-4 border-r-black border-l-black border-b-black border-t-blue-900">
                <For each={rows}>{(row: number) => {
                    return (
                        <For each={columns}>{(column)=> {
                                return(<BoardItem row={row} column={column}/>)
                                }
                            }
                        </For>
                    )}}
                </For>
            </div>
        </div>
    )
}