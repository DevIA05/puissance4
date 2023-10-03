import { gameLanguage } from "../App"
import { PieceEnum, turn } from "./gameContext"
import { LanguageEnum, gameTitle } from "./languageDict"
// TODO: Utiliser le theme tailwind pour les couleurs
// TODO: Améliorer l'affichage du "turn"

export default function () {
    // const color = () => turn() == PieceEnum.red ? "#ff0000" : "#ffff00"
    return(
        <div class="w-full h-36 bg-yellow-400">
            <h1 class="text-center font-extrabold text-[75px] select-none text-[#ff0000]">{gameTitle[gameLanguage]}</h1>
            {/* TODO: Move elsewhere */}
            {/* <p class="text-white text-xl select-none">Turn:</p> */}
            {/* <div class="w-16 h-8" style={`background-color: ${color()}`}></div> */}
        </div>
    )
}