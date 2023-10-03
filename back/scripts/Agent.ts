import * as tf from '@tensorflow/tfjs-node';
import { createModel } from './model'; 
import { inspect } from 'util';

export class Agent{
  model: tf.LayersModel;
  discountFactor: number;
  numEpochs: number;
  
  constructor() {
    // Créez un modèle TensorFlow.js pour l'agent
    // Le modèle doit prendre en entrée l'état du jeu et produire une sortie pour chaque colonne possible
    // Utilisez une couche de sortie softmax pour estimer les probabilités des coups
    const inputShape = [6, 7]; // Pour représenter un plateau de jeu de 6x7
    const outputUnits = 7;    // Pour 7 colonnes (7 actions possibles)
    this.model = createModel(inputShape, outputUnits);
    this.discountFactor = 0.9;
    this.numEpochs = 100;
  }
  
  // Méthode pour choisir un coup en fonction de l'état actuel du jeu
  chooseMove(state: number[][]): number {
    // Convertissez l'état du jeu en un tenseur TensorFlow.js
    const stateTensor = tf.tensor([state]);

    // Utilisez le modèle pour estimer les probabilités des coups
    const probabilities = this.model.predict(stateTensor) as tf.Tensor;
    const probabilitiesArray = Array.from(probabilities.dataSync()) as number[];

    // Choisissez un coup en fonction des probabilités
    const validMoves: number[] = [];
    for (let col = 0; col < probabilitiesArray.length; col++) {
    // Vérifiez si la colonne est valide (c'est-à-dire qu'elle n'est pas déjà pleine)
        if (state[0][col] === 0) {
            validMoves.push(col);
        }
    }

    // Échantillonnez un coup à partir de la distribution des probabilités
    const sampledMove = this.sampleMove(probabilitiesArray, validMoves);

    return sampledMove;
}
  
  // Méthode pour échantillonner un coup à partir des probabilités
  sampleMove(probabilities: number[], validMoves: number[]): number {
    const totalProbability = probabilities.reduce((sum, prob, col) => {
      if (validMoves.includes(col)) {
        return sum + prob;
      }
      return sum;
    }, 0);
  
    const randomValue = Math.random() * totalProbability;
  
    let cumulativeProbability = 0;
    for (let col = 0; col < probabilities.length; col++) {
      if (validMoves.includes(col)) {
        cumulativeProbability += probabilities[col];
        if (randomValue < cumulativeProbability) {
          return col;
        }
      }
    }
  
    // Cela ne devrait jamais se produire, mais au cas où, retournez le dernier coup valide
    return validMoves[validMoves.length - 1];
  }
  
  // Méthode pour apprendre à partir des expériences (apprentissage par renforcement)
  learnFromExperience(
    states: number[][][],
    actions: number[],
    rewards: number[],
  ) {
    // Mettez en œuvre l'apprentissage par renforcement avec TensorFlow.js
    const numExperiences = states.length;

    // Préparez les tableaux pour stocker les états d'entrée et les cibles
    const inputStates: tf.Tensor[] = [];
    const targets: tf.Tensor[] = [];
  
    for (let i = 0; i < numExperiences; i++) {
      const state = states[i];
      const action = actions[i];
      const reward = rewards[i];
  
      // Convertissez l'état en tenseur TensorFlow.js
      const stateTensor = tf.tensor([state]);
  
      // Préparez la cible pour l'apprentissage
      const nextStateTensor = tf.tensor([states[i + 1]]); // L'état suivant
// ===========================================================================================
      debugger
      // @ts-ignore: Keep this console.log statement
      console.log("===========================================================")
      console.log('Contenu de nextStateTensor :', inspect(nextStateTensor.arraySync()));
      console.log("===========================================================")
// ===========================================================================================
      const target = reward + this.discountFactor * (this.model.predict(nextStateTensor) as tf.Tensor[])[0].dataSync()[0];  
      // Obtenez la prédiction du modèle pour l'action choisie
      const predicted = (this.model.predict(stateTensor) as tf.Tensor[])[0].arraySync() as number[];

      // Calculez l'avantage
      const advantage = target - predicted[0];
  
      // Stockez les états en entrée et les cibles
      inputStates.push(stateTensor);
      targets.push(tf.scalar(target));
  
      // Libérez la mémoire des tenseurs temporaires
      stateTensor.dispose();
      nextStateTensor.dispose();
    }
  
    // Entraînez le modèle avec les états en entrée et les cibles
    const xs = tf.concat(inputStates);
    const ys = tf.concat(targets);
    this.model.fit(xs, ys, { epochs: this.numEpochs });
  
    // Libérez la mémoire des tenseurs
    xs.dispose();
    ys.dispose();
  }
}
