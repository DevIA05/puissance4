//  Représenter le jeu et l'environnement

export class Connector4 {
    board: number[][]; // Représentation du tableau de jeu
    currentPlayer: number; // Joueur actuel (1 ou 2)
    private lastMoveRow: number | null = null;
    private lastMoveCol: number | null = null;
  
    constructor() {
      // Initialisez le tableau de jeu et le joueur actuel
      this.board = Array.from({ length: 6 }, () => Array(7).fill(0));
      this.currentPlayer = 1;
    }
  
    // Méthode pour jouer un coup
    playMove(col: number): boolean {
      // Vérifiez si la colonne est valide et effectuez le mouvement
      // Mettez à jour le tableau de jeu et le joueur actuel
      // Vérifiez si le jeu est terminé (victoire ou égalité)
      // Retournez true si le coup est valide, sinon false
      if (col < 0 || col >= 7) {
        // Colonne invalide
        return false;
      }
    
      // Trouver la première case vide dans la colonne
      let row = -1;
      for (let i = 5; i >= 0; i--) {
        if (this.board[i][col] === 0) {
          row = i;
          break;
        }
      }
    
      if (row === -1) {
        // Colonne pleine
        return false;
      }
    
      // Placez le jeton du joueur actuel dans la case vide
      this.board[row][col] = this.currentPlayer;
      this.lastMoveRow = row /* La rangée où le jeton a été placé */;
      this.lastMoveCol = col;
    
      // Vérifiez si le jeu est terminé (victoire ou égalité)
      if (this.checkForWin(row, col)) {
        // Le joueur actuel a gagné
        console.log(`Joueur ${this.currentPlayer} a gagné !`);
        return true;
      } else if (this.checkForDraw()) {
        // Match nul
        console.log("Match nul !");
        return true;
      }
    
      // Passez au joueur suivant
      this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
      return true;
    }

    // Méthode pour vérifier si le jeu est terminé par une victoire
    checkForWin(row: number, col: number): boolean {
        // Vérifiez les 4 directions possibles à partir de la position actuelle
        const directions = [
        [0, 1], // Horizontal (droite)
        [1, 0], // Vertical (bas)
        [1, 1], // Diagonale bas droite
        [-1, 1], // Diagonale haut droite
        ];
    
        for (const [dr, dc] of directions) {
        let count = 1; // Compteur de jetons consécutifs
    
        // Parcourez les deux sens opposés de la direction
        for (let i = -3; i <= 3; i++) {
            if (i === 0) continue; // Ignorez la position actuelle
            const r = row + i * dr;
            const c = col + i * dc;
    
            // Vérifiez que la position est à l'intérieur du tableau
            if (
            r >= 0 &&
            r < 6 &&
            c >= 0 &&
            c < 7 &&
            this.board[r][c] === this.currentPlayer
            ) {
            count++;
            if (count === 4) {
                // Le joueur actuel a aligné 4 jetons dans cette direction, ce qui signifie la victoire
                return true;
            }
            } else {
            // Si le jeton suivant n'appartient pas au joueur actuel, réinitialisez le compteur
            count = 1;
            }
        }
        }
    
        return false; // Aucune victoire détectée
    }

    // Méthode pour vérifier si le jeu est terminé par un match nul
    checkForDraw(): boolean {
        // Le jeu est un match nul s'il n'y a plus de cases vides
        for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 7; col++) {
            if (this.board[row][col] === 0) {
            return false; // Il reste au moins une case vide, le jeu n'est pas un match nul
            }
        }
        }
        return true; // Aucune case vide, le jeu est un match nul
    }  
  
    // Méthode pour afficher le tableau de jeu
    printBoard() {
      // Affichez le tableau de jeu dans la console
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
      console.log(" 1 2 3 4 5 6 7"); // Affichez les numéros de colonne
    }
  
    // Méthode pour vérifier si le jeu est terminé
    isGameOver(): boolean {
        // Vérifiez d'abord s'il y a une victoire
        for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 7; col++) {
            if (this.board[row][col] === this.currentPlayer) {
            // Si le joueur actuel a un jeton à cette position, vérifiez s'il a gagné
            if (this.checkForWin(row, col)) {
                return true; // Le jeu est terminé par une victoire
            }
            }
        }
        }
    
        // Ensuite, vérifiez s'il y a un match nul
        if (this.checkForDraw()) {
        return true; // Le jeu est terminé par un match nul
        }
    
        return false; // Le jeu n'est pas encore terminé
    }

    getState(): number[][] {
        return this.board;
    }

    getReward(): number {
        if (this.lastMoveRow !== null && this.lastMoveCol !== null) {
            if (this.checkForWin(this.lastMoveRow, this.lastMoveCol)) {
              if (this.currentPlayer === 1) {
                // Joueur 1 a gagné, récompensez-le
                return 1;
              } else {
                // Joueur 2 a gagné, pénalisez-le
                return -1;
              }
            } else if (this.checkForDraw()) {
              // Le jeu est un match nul
              return 0;
            } else {
              // Le jeu n'est pas encore terminé
              return 0; // Vous pouvez ajuster la récompense par défaut selon vos besoins
            }
        } else {
            return 0
        }
    }  

    reset() {
        this.board = Array.from({ length: 6 }, () => Array(7).fill(0));
        this.currentPlayer = 1;
        this.lastMoveRow = null; // Réinitialisez également lastMoveRow et lastMoveCol
        this.lastMoveCol = null;
    }
}
  