import { PageEnum, gameLanguage, setActualPage } from "../App";
import { gameModeIA, gameModeLocal, gameModeOnline } from "./languageDict";
import MenuButton from "./menuButton";

// TODO: Créer un composant MenuButton
// TODO: Mettre en place un mouseOver shadow sur les boutons
function onClick(page: PageEnum) {
    setActualPage(page)
}
export default function () {
    return (
        <div class="grid grid-cols-3 justify-center mt-10 h-40">
                <MenuButton title={gameModeLocal[gameLanguage]} onClick={() => onClick(PageEnum.local)}/>
                <MenuButton title={gameModeOnline[gameLanguage]} onClick={() => onClick(PageEnum.online)}/>
                <MenuButton title={gameModeIA[gameLanguage]} onClick={() => console.log("TODO switch to mode IA")}/>
        </div>
    )
}