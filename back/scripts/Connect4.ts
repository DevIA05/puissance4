// Represent the game and the environment

export class Connect4 {
  board: number[][]; // Representation of the game board
  currentPlayer: number; // Current player (1 or 2)
  private lastMoveRow: number | null = null;
  private lastMoveCol: number | null = null;

  constructor() {
    // Initialize the game board and the current player
    this.board = Array.from({ length: 6 }, () => Array(7).fill(0));
    this.currentPlayer = 1;
  }

  // Method to make a move
  playMove(col: number): boolean {
    // Check if the column is valid and make the move
    // Update the game board and the current player
    // Check if the game is over (win or draw)
    // Return true if the move is valid, otherwise false
    if (col < 0 || col >= 7) {
      // Invalid column
      return false;
    }
  
    // Find the first empty slot in the column
    let row = -1;
    for (let i = 5; i >= 0; i--) {
      if (this.board[i][col] === 0) {
        row = i;
        break;
      }
    }
  
    if (row === -1) {
      // Column is full
      return false;
    }
  
    // Place the current player's token in the empty slot
    this.board[row][col] = this.currentPlayer;
    this.lastMoveRow = row /* The row where the token was placed */;
    this.lastMoveCol = col;
  
    // Check if the game is over (win or draw)
    if (this.checkForWin(row, col)) {
      // The current player has won
      console.log(`Player ${this.currentPlayer} has won!`);
      return true;
    } else if (this.checkForDraw()) {
      // It's a draw
      console.log("Draw!");
      return true;
    }
  
    // Switch to the next player
    this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
    return true;
  }

  // Method to check if the game is over due to a win
  checkForWin(row: number, col: number): boolean {
      // Check the 4 possible directions from the current position
      const directions = [
      [0, 1], // Horizontal (right)
      [1, 0], // Vertical (down)
      [1, 1], // Diagonal bottom-right
      [-1, 1], // Diagonal top-right
      ];
  
      for (const [dr, dc] of directions) {
      let count = 1; // Counter for consecutive tokens
  
      // Traverse in both opposite directions of the direction
      for (let i = -3; i <= 3; i++) {
          if (i === 0) continue; // Ignore the current position
          const r = row + i * dr;
          const c = col + i * dc;
  
          // Check that the position is within the board
          if (
          r >= 0 &&
          r < 6 &&
          c >= 0 &&
          c < 7 &&
          this.board[r][c] === this.currentPlayer
          ) {
          count++;
          if (count === 4) {
              // The current player has aligned 4 tokens in this direction, which means a win
              return true;
          }
          } else {
          // If the next token doesn't belong to the current player, reset the counter
          count = 1;
          }
      }
      }
  
      return false; // No win detected
  }

  // Method to check if the game is over due to a draw
  checkForDraw(): boolean {
      // The game is a draw if there are no more empty slots
      for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 7; col++) {
          if (this.board[row][col] === 0) {
          return false; // At least one empty slot remains, the game is not a draw
          }
      }
      }
      return true; // No empty slots, the game is a draw
  }  

  // Method to display the game board
  printBoard() {
    // Display the game board in the console
    for (let row = 0; row < 6; row++) {
      let rowStr = "|";
      for (let col = 0; col < 7; col++) {
        if (this.board[row][col] === 0) {
          rowStr += " ";
        } else if (this.board[row][col] === 1) {
          rowStr += "X";
        } else if (this.board[row][col] === 2) {
          rowStr += "O";
        }
        rowStr += "|";
      }
      console.log(rowStr);
    }
    console.log(" 1 2 3 4 5 6 7"); // Display column numbers
  }

  // Method to check if the game is over
  isGameOver(): boolean {
      // First, check if there is a win
      for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 7; col++) {
          if (this.board[row][col] === this.currentPlayer) {
          // If the current player has a token at this position, check if they have won
          if (this.checkForWin(row, col)) {
              return true; // Game is over due to a win
          }
          }
      }
      }
  
      // Next, check if there is a draw
      if (this.checkForDraw()) {
      return true; // Game is over due to a draw
      }
  
      return false; // The game is not yet over
  }

  getState(): number[][] {
      return this.board;
  }

  getReward(): number {
      if (this.lastMoveRow !== null && this.lastMoveCol !== null) {
          if (this.checkForWin(this.lastMoveRow, this.lastMoveCol)) {
            if (this.currentPlayer === 1) {
              // Player 1 has won, reward them
              return 1;
            } else {
              // Player 2 has won, penalize them
              return -1;
            }
          } else if (this.checkForDraw()) {
            // The game is a draw
            return 0;
          } else {
            // The game is not yet over
            return 0; // You can adjust the default reward as needed
          }
      } else {
          return 0
      }
  }  

  reset() {
      this.board = Array.from({ length: 6 }, () => Array(7).fill(0));
      this.currentPlayer = 1;
      this.lastMoveRow = null; // Also reset lastMoveRow and lastMoveCol
      this.lastMoveCol = null;
  }
}
