import { gameLanguage } from "../App";
import { gameModeIA, gameModeLocal, gameModeOnline } from "./languageDict";

export default function () {
    return (
        <div class="flex justify-center">
            {/* <div class="grid grid-cols-3"> */}
                <div>{gameModeLocal[gameLanguage]}</div>
                <div class="px-20">{gameModeOnline[gameLanguage]}</div>
                <div>{gameModeIA[gameLanguage]}</div>
            {/* </div> */}
        </div>
    )
}