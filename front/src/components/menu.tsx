import { gameLanguage } from "../App";
import { gameModeIA, gameModeLocal, gameModeOnline } from "./languageDict";

// TODO: Créer un composant MenuButton
// TODO: Mettre en place un mouseOver shadow sur les boutons

export default function () {
    return (
        <div class="grid grid-cols-3 justify-center mt-10 h-40">
            {/* <div class="grid grid-cols-3"> */}
                <div class="text-center h-fit">{gameModeLocal[gameLanguage]}</div>
                <div class="text-center mx-20 h-fit">{gameModeOnline[gameLanguage]}</div>
                <div class="mx-5">
                    <div class="text-center h-fit">{gameModeIA[gameLanguage]}</div>
                </div>
            {/* </div> */}
        </div>
    )
}