import * as tf from '@tensorflow/tfjs-node';
import { createModel } from './Model'; 
import { inspect } from 'util';

export class Agent {
  model: tf.LayersModel;
  discountFactor: number;
  numEpochs: number;
  
  constructor() {
    // Create a TensorFlow.js model for the agent
    // The model should take the game state as input and produce output for each possible column
    // Use a softmax output layer to estimate move probabilities
    const inputShape = [6, 7]; // To represent a 6x7 game board
    const outputUnits = 7;    // For 7 columns (7 possible actions)
    this.model = createModel(inputShape, outputUnits);
    this.discountFactor = 0.9;
    this.numEpochs = 100;
  }
  
  // Method to choose a move based on the current game state
  chooseMove(state: number[][]): number {
    // Convert the game state into a TensorFlow.js tensor
    const stateTensor = tf.tensor([state]);

    // Use the model to estimate move probabilities
    const probabilities = this.model.predict(stateTensor) as tf.Tensor;
    const probabilitiesArray = Array.from(probabilities.dataSync()) as number[];

    // Choose a move based on the probabilities
    const validMoves: number[] = [];
    for (let col = 0; col < probabilitiesArray.length; col++) {
      // Check if the column is valid (i.e., not already full)
      if (state[0][col] === 0) {
        validMoves.push(col);
      }
    }

    // Sample a move from the probability distribution
    const sampledMove = this.sampleMove(probabilitiesArray, validMoves);

    return sampledMove;
  }
  
  // Method to sample a move from the probabilities
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
  
    // This should never happen, but just in case, return the last valid move
    return validMoves[validMoves.length - 1];
  }
  
  // Method to learn from experiences (reinforcement learning)
  learnFromExperience(
    states: number[][][],
    actions: number[],
    reward: number,
  ) {
    const learningRate = 0.1; // Learning rate
    const targetDiscount = this.discountFactor; // Discount factor for future rewards

    // Iterate through states and actions in reverse order
    for (let t = states.length - 1; t >= 0; t--) {
      const state = tf.tensor(states[t]);
      const action = actions[t];

      // Calculate the current Q value for the given state and action
      const currentQ = this.model.predict(state) as tf.Tensor;
      const currentQArray = Array.from(currentQ.dataSync()) as number[];

      // Calculate the expected reward for the next state
      let targetQ = reward;
      
      // If it's not the last state, add the discounting of future rewards
      if (t < states.length - 1) {
        const nextState = tf.tensor(states[t + 1]);
        const nextStateQ = this.model.predict(nextState) as tf.Tensor;
        const nextStateQArray = Array.from(nextStateQ.dataSync()) as number[];

        // Choose the maximum Q value for the next state
        const maxNextQ = Math.max(...nextStateQArray);

        // Calculate the expected reward by adding the discount
        targetQ += targetDiscount * maxNextQ;
      }

      // Update the Q value for the chosen action in the current state
      currentQArray[action] = (1 - learningRate) * currentQArray[action] + learningRate * targetQ;

      // Update the model with the new Q value
      this.model.fit(state, tf.tensor([currentQArray]));
    }
  }
}
