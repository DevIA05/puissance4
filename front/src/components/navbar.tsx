import { createSignal } from "solid-js"

// TODO: Move
export enum PieceEnum {
    red="red",
    yellow="yellow",
    empty="white"
}

// TODO: Move
export const [turn, setTurn] = createSignal(PieceEnum.red)

export default function () {
    const color = () => turn() == PieceEnum.red ? "#ff0000" : "#ffff00"
    return(
        <div class="w-full h-36 bg-slate-700">
            <h1 class="text-center font-extrabold text-[75px] select-none">Connect 4</h1>
            <p class="text-white text-xl">Turn:</p>
            <div class="w-16 h-8" style={`background-color: ${color()}`}></div>
        </div>
    )
}