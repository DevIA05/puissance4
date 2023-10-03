import { gameLanguage } from "../App"
import {gameTitle } from "./languageDict"
import HeaderButton from "./headerButton"
// TODO: Utiliser le theme tailwind pour les couleurs
// TODO: Ajouter possibilté de revenir au choix du mode de jeu
// TODO: Créer un composant avec le bouton back to game mode selection
export default function () {
    // TODO: Améliorer l'affichage du "turn" => utiliser la piece qui s'affiche en haut du board
    // const color = () => turn() == PieceEnum.red ? "#ff0000" : "#ffff00"
    return(
        <div class="relative w-full h-36 bg-yellow-400">
            <HeaderButton />
            <h1 class="text-center font-extrabold text-[75px] select-none text-[#ff0000]">{gameTitle[gameLanguage]}</h1>
        </div>
    )
}