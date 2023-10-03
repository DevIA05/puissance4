import { gameLanguage } from "../App";
import { gameModeIA, gameModeLocal, gameModeOnline } from "./languageDict";
import MenuButton from "./menuButton";

// TODO: Créer un composant MenuButton
// TODO: Mettre en place un mouseOver shadow sur les boutons

export default function () {
    return (
        <div class="grid grid-cols-3 justify-center mt-10 h-40">
                <MenuButton title={gameModeLocal[gameLanguage]} />
                <MenuButton title={gameModeOnline[gameLanguage]} />
                <MenuButton title={gameModeIA[gameLanguage]} />
        </div>
    )
}