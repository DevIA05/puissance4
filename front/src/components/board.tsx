import { For, createSignal } from "solid-js"
import BoardItem from "./boardItem"
import { PieceEnum } from "./navbar"

export type boardStateDictType = { [key: number]: PieceEnum[] }

export const rows = [0, 1, 2, 3, 4, 5]
export const columns = [0, 1, 2, 3, 4, 5, 6]

const boardStateDict: boardStateDictType = {}

// TODO: Rewrite
for (const row of rows) {
    boardStateDict[row] = [PieceEnum.empty,PieceEnum.empty,PieceEnum.empty,PieceEnum.empty,PieceEnum.empty,PieceEnum.empty,PieceEnum.empty]
}

// TODO: Move in context like file ?
export const [boardState, setBoardState] = createSignal(boardStateDict) 

export default function () {
    return (
        <div class="flex justify-center mt-5">
            <div class="grid grid-cols-7 bg-blue-800">
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