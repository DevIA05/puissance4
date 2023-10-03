import { Show } from "solid-js";
import { actualPage, PageEnum, gameLanguage, setActualPage } from "../App";
import { backToModeSelection } from "./languageDict";
import { GameStepEnum, PieceEnum, setGameStep, setTurn } from "./gameContext";
import { getInitialBoard, setBoardState, setWinningPieces } from "./board";

function resetLocalGame() {
    setTurn(PieceEnum.red)
    setWinningPieces([])
    setBoardState(getInitialBoard())
    setGameStep(GameStepEnum.playing)
}

function onClick() {
    resetLocalGame()
    setActualPage(PageEnum.menu)
}

export default function () {
    return (
        <Show when={actualPage() != PageEnum.menu}>
            <div class="absolute left-0 top-1/2 ml-2 cursor-pointer select-none" onClick={onClick}>
                {backToModeSelection[gameLanguage]}
            </div>
        </Show>
    )
}