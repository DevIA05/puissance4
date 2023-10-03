export enum LanguageEnum {
    fr="french",
    eng="english",
    ch="chinnois"
}

type LanguageDictType = { [key in LanguageEnum]: string }

export const gameTitle: LanguageDictType = {french : "Puissance 4", english: "Connect 4", chinnois: "电源4"}

export const gameModeLocal: LanguageDictType = {french : "Partie local", english: "Local versus", chinnois: "本地部分"}
export const gameModeOnline: LanguageDictType = {french : "Partie en ligne", english: "Online versus", chinnois: "在线部分"}
export const gameModeIA: LanguageDictType = {french : "Partie contre IA", english: "IA", chinnois: "人工智能"}

export const backToModeSelection: LanguageDictType = {french : "Séléction du mode de jeu", english: "Back to game mode selection", chinnois: "返回游戏模式选择"}