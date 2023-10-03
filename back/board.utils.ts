export enum PieceEnum {
    red="red",
    yellow="yellow",
    empty="white"
}// TODO: Add a "standby" step ? why ?

export type boardStateDictType = { [key: number]: PieceEnum[] }

const rows = [0, 1, 2, 3, 4, 5]

export function getInitialBoard() {
    const initialBoardStateDict: boardStateDictType = {}
    
    // TODO: Rewrite
    for (const row of rows) {
        initialBoardStateDict[row] = [PieceEnum.empty,PieceEnum.empty,PieceEnum.empty,PieceEnum.empty,PieceEnum.empty,PieceEnum.empty,PieceEnum.empty]
    }
    return initialBoardStateDict
}