const { MCTS } = require('mcts');
const {ConnectFour} = require('boardgame.io');

// const app: Application = express();
// const port = 3000;

// app.get('/train', (req, res) => {
//     // Créer une nouvelle instance du jeu
//     let game = new ConnectFour();

//     // Créer une nouvelle instance de l'arbre de recherche Monte Carlo
//     let mcts = new MCTS(game);

//     // Définir le nombre d'itérations pour l'apprentissage par renforcement
//     let iterations = 10000;

//     // Entraîner l'IA avec l'apprentissage par renforcement
//     for (let i = 0; i < iterations; i++) {
//         // Réinitialiser le jeu et l'arbre de recherche à chaque itération
//         game.reset();
//         mcts = new MCTS(game);

//         // Continuer à jouer jusqu'à ce que le jeu soit terminé
//         while (!game.isGameOver()) {
//             // Effectuer une recherche pour déterminer le meilleur coup
//             mcts.search();

//             // Jouer le meilleur coup
//             let bestMove = mcts.getBestMove();
//             game.play(bestMove);
//         }

//         // Mettre à jour les valeurs Q en fonction du résultat du jeu
//         mcts.updateQValues();
//     }

//     res.send('Training complete');
// });

// app.listen(port, () => {
//     console.log(`Server is running at http://localhost:${port}`);
// });
