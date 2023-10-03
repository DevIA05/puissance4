export enum LanguageEnum {
    fr="french",
    eng="english",
    ch="chinnois"
}

export const gameTitle: { [key in LanguageEnum]: string } = {french : "Puissance 4", english: "Connect 4", chinnois: "电源4"}