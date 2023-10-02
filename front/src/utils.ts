import { boardStateDictType } from "./components/board";
import { PieceEnum } from "./components/gameContext";

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

function checkDownLeft(row: number, column: number, boardStateDict: boardStateDictType) {
    if (row > 2 || column < 4) return;

    const actualPieceColor = boardStateDict[row][column]
    if (boardStateDict[row + 1][column - 1] == actualPieceColor &&
        boardStateDict[row + 2][column - 2] == actualPieceColor &&
        boardStateDict[row + 3][column - 3] == actualPieceColor) {
            return true
    } else { return false }
}

function checkUpLeft(row: number, column: number, boardStateDict: boardStateDictType) {
    if (row < 4 || column < 4) return;

    const actualPieceColor = boardStateDict[row][column]
    if (boardStateDict[row - 1][column - 1] == actualPieceColor &&
        boardStateDict[row - 2][column - 2] == actualPieceColor &&
        boardStateDict[row - 3][column - 3] == actualPieceColor) {
            return true
    } else { return false }
}

function checkUpRight(row: number, column: number, boardStateDict: boardStateDictType) {
    if (row < 4 || column > 3) return;

    const actualPieceColor = boardStateDict[row][column]
    if (boardStateDict[row - 1][column + 1] == actualPieceColor &&
        boardStateDict[row - 2][column + 2] == actualPieceColor &&
        boardStateDict[row - 3][column + 3] == actualPieceColor) {
            return true
    } else { return false }
}

function checkDownRight(row: number, column: number, boardStateDict: boardStateDictType) {
    if (row > 2 || column > 3) return;

    const actualPieceColor = boardStateDict[row][column]
    if (boardStateDict[row + 1][column + 1] == actualPieceColor &&
        boardStateDict[row + 2][column + 2] == actualPieceColor &&
        boardStateDict[row + 3][column + 3] == actualPieceColor) {
            return true
    } else { return false }
}

export function checkWin(row: number, column: number, boardStateDict: boardStateDictType) {
    if (boardStateDict[row][column] == PieceEnum.empty) return false;

    if (checkLeft(row, column, boardStateDict)) return true;
    else if (checkRight(row, column, boardStateDict)) return true;
    else if (checkUp(row, column, boardStateDict)) return true;
    else if (checkDown(row, column, boardStateDict)) return true;
    else if (checkDownLeft(row, column, boardStateDict)) return true;
    else if (checkUpLeft(row, column, boardStateDict)) return true;
    else if (checkUpRight(row, column, boardStateDict)) return true;
    else if (checkDownRight(row, column, boardStateDict)) return true;
    else return false;
}