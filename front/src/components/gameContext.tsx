import { JSXElement, createEffect, createSignal } from "solid-js";

// TODO: Rename
export enum PieceEnum {
    red="red",
    yellow="yellow",
    empty="white"
}// TODO: Add a "standby" step ? why ?
export enum GameStepEnum {
    playing,
    draw,
    win,
    opponentLeft,
}

export const [turn, setTurn] = createSignal(PieceEnum.red)
export const [gameStep, setGameStep] = createSignal(GameStepEnum.playing)

export function switchTurn() {
    setTurn((prev) =>
        prev == PieceEnum.red ? PieceEnum.yellow : PieceEnum.red
    )
}

export default function (props: {children: JSXElement}) {
    // TODO: Mettre en place action quand win / null / nouvelle partie ici
    // createEffect(()=> {
    //     switch (gameStep()) {
    //         case GameStepEnum.null:
    //             break;
    //         case GameStepEnum.win:
    //             break;
    //         case GameStepEnum.playing:
    //             break;
    //         default:
    //             console.log("gameStep() case error")
    //     }
    // })
    return props.children
}