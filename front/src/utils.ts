import { boardStateDictType } from "./components/board";

function checkLeft(row: number, column: number, boardStateDict: boardStateDictType) {
    if (column < 3) return;

    const actualPieceColor = boardStateDict[row][column]
    if (boardStateDict[row][column - 1] == actualPieceColor &&
        boardStateDict[row][column - 2] == actualPieceColor &&
        boardStateDict[row][column - 3] == actualPieceColor) {
            return true
    } else { return false }
}

function checkRight(row: number, column: number, boardStateDict: boardStateDictType) {
    if (column > 3) return;

    const actualPieceColor = boardStateDict[row][column]
    if (boardStateDict[row][column + 1] == actualPieceColor &&
        boardStateDict[row][column + 2] == actualPieceColor &&
        boardStateDict[row][column + 3] == actualPieceColor) {
            return true
    } else { return false }
}

function checkUp(row: number, column: number, boardStateDict: boardStateDictType) {
    if (row < 3) return;

    const actualPieceColor = boardStateDict[row][column]
    if (boardStateDict[row - 1][column] == actualPieceColor &&
        boardStateDict[row - 2][column] == actualPieceColor &&
        boardStateDict[row - 3][column] == actualPieceColor) {
            return true
    } else { return false }
}

function checkDown(row: number, column: number, boardStateDict: boardStateDictType) {
    if (row > 2) return;

    const actualPieceColor = boardStateDict[row][column]
    if (boardStateDict[row + 1][column] == actualPieceColor &&
        boardStateDict[row + 2][column] == actualPieceColor &&
        boardStateDict[row + 3][column] == actualPieceColor) {
            return true
    } else { return false }
}

export function checkWin(row: number, column: number, boardStateDict: boardStateDictType) {
    if (checkLeft(row, column, boardStateDict)) return true;
    else if (checkRight(row, column, boardStateDict)) return true;
    else if (checkUp(row, column, boardStateDict)) return true;
    else if (checkDown(row, column, boardStateDict)) return true;
}