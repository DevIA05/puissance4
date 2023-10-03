export enum LanguageEnum {
    fr="french",
    eng="english",
    ch="chinnois"
}

export const gameTitle: { [key in LanguageEnum]: string } = {french : "Puissance 4", english: "Connect 4", chinnois: "电源4"}

export const gameModeLocal: { [key in LanguageEnum]: string } = {french : "Partie local", english: "Local versus", chinnois: "本地部分"}
export const gameModeOnline: { [key in LanguageEnum]: string } = {french : "Partie en ligne", english: "Online versus", chinnois: "在线部分"}
export const gameModeIA: { [key in LanguageEnum]: string } = {french : "Partie contre IA", english: "IA", chinnois: "人工智能"}

