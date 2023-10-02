const tf = require('@tensorflow/tfjs-node');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Définition de l'environnement du jeu Puissance 4
class ConnectFourEnv {

  board: number[][]; // Plateau de jeu 6x7
  currentPlayer: number; // Joueur 1 commence
  winner: number | null; // Stocke le gagnant

  constructor() {
    this.board = Array.from({ length: 6 }, () => Array(7).fill(0)); // Plateau de jeu 6x7
    this.currentPlayer = 1; // Joueur 1 commence
    this.winner = null; // Stocke le gagnant
  }

  reset() {
    this.board = Array.from({ length: 6 }, () => Array(7).fill(0));
    this.currentPlayer = 1;
    this.winner = null;
  }

 // Autres méthodes pour les actions, les observations, la vérification des victoires, etc.
}

interface ConnectFourEnv {
  reset(): void;
  getState(): number[]; // Remplacez le type en fonction de ce que retourne votre getState
  step(action: number): [number[], number, boolean];
  // Autres méthodes et propriétés nécessaires
}

// Fonction d'apprentissage par renforcement avec Q-learning
async function qLearningAgent(
  env: ConnectFourEnv, 
  numEpisodes: number, 
  learningRate: number, 
  discountFactor: number, 
  epsilon: number) {  

  const Q = tf.zeros([6, 7, 7]); // Tableau Q (état, action)

  for (let episode = 0; episode < numEpisodes; episode++) {
    env.reset();
    let done = false;

    while (!done) {
      const state = env.getState();
      let action;

      if (Math.random() < epsilon) {
        action = Math.floor(Math.random() * 7); // Exploration aléatoire
      } else {
        const QValues = Q.gather(tf.tensor(state));
        action = (await QValues.argMax().data())[0]; // Exploitation
      }

      const [nextState, reward, isDone] = env.step(action);
      const nextQValues = Q.gather(tf.tensor(nextState));
      const maxNextQValue = (await nextQValues.max().data())[0];

      // Mise à jour de la table Q
      const updatedQValue = (1 - learningRate) * Q.get([...state, action]) +
        learningRate * (reward + discountFactor * maxNextQValue);
      Q.set(updatedQValue, [...state, action]);

      done = isDone;
    }
  }

  return Q;
}

// Fonction pour jouer contre l'IA
async function playAgainstAgent(Q) {
  const env = new ConnectFourEnv();
  env.reset();
  let done = false;

  while (!done) {
    const state = env.getState();
    const QValues = Q.gather(tf.tensor(state));
    const action = (await QValues.argMax().data())[0];

    console.log(`L'IA joue ${action}`);
    const [nextState, , isDone] = env.step(action);
    env.render();

    if (isDone) {
      done = true;
      console.log('Fin du jeu.');
    } else {
      rl.question('Votre tour (0-6) : ', (input) => {
        const playerAction = parseInt(input, 10);
        const [nextState, , isDone] = env.step(playerAction);
        env.render();

        if (isDone) {
          done = true;
          console.log('Fin du jeu.');
        }
      });
    }
  }
  rl.close();
}

// Paramètres d'apprentissage
const numEpisodes = 10000;
const learningRate = 0.1;
const discountFactor = 0.99;
const epsilon = 0.1;

// Entraîner l'agent
const trainedQ = await qLearningAgent(new ConnectFourEnv(), numEpisodes, learningRate, discountFactor, epsilon);

// Jouer contre l'IA
playAgainstAgent(trainedQ);

// import express, { Express, Request, Response , Application } from 'express';
// import dotenv from 'dotenv';

// //For env File 
// dotenv.config();

// const app: Application = express();
// const port = process.env.PORT;

// app.get('/', (req: Request, res: Response) => {
//   res.send('Welcome to Express & TypeScript Server');
// });

// app.listen(port, () => {
//   console.log(`Server is Fire at http://localhost:${port}`);
// });

