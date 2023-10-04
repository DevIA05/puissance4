import * as tf from '@tensorflow/tfjs-node';
import { Connect4 } from './Connect4';
import { createModel } from './model';

// Paramètres d'entraînement
const numEpochs = 1000; // Nombre d'époques d'entraînement
const learningRate = 0.001; // Taux d'apprentissage
const epsilon = 0.1; // Epsilon pour l'exploration (ajustez selon vos besoins)

// Créez l'environnement du jeu Connect4
const env = new Connect4();

// Créez le modèle de l'agent
const inputShape = [6, 7]; // La forme d'entrée correspond à la taille du tableau de jeu
const outputUnits = 7; // Nombre d'actions possibles (nombre de colonnes)
const model = createModel(inputShape, outputUnits);

// Fonction pour choisir une action en fonction de l'epsilon-greedy
function chooseAction(state: number[][]): number {
  if (Math.random() < epsilon) {
    // Exploration aléatoire
    return Math.floor(Math.random() * outputUnits);
  } else {
    // Exploitation en utilisant le modèle
    const qValues = model.predict(tf.tensor([state])) as tf.Tensor;
    const action = tf.argMax(qValues, 1).dataSync()[0];
    qValues.dispose();
    return action;
  }
}

// Fonction pour entraîner l'agent
async function trainAgent(): Promise<void> {
  const optimizer = tf.train.adam(learningRate);

  for (let epoch = 0; epoch < numEpochs; epoch++) {
    let state = env.getState();
    let done = false;

    while (!done) {
      const action = chooseAction(state);

      // Effectuez l'action dans l'environnement
      const prevState = tf.tensor([state]);
      const nextState = tf.tensor([env.board]);
      const reward = tf.tensor(env.getReward());
      const target = tf.add(reward, tf.mul(tf.scalar(0.99), model.predict(nextState)));
      const loss = tf.losses.meanSquaredError(target, model.predict(prevState));
      const grads = tf.grads((modelWeights) => loss(modelWeights));

      // Mettez à jour les poids du modèle
      optimizer.applyGradients(grads(model.trainableWeights));
      grads.dispose();

      state = nextState.arraySync();
      done = env.isGameOver();

      prevState.dispose();
      nextState.dispose();
      target.dispose();
      loss.dispose();
    }

    env.reset();
  }
}

// Entraînez l'agent
trainAgent().then(() => {
  console.log('Entraînement terminé.');
  // Maintenant, vous pouvez utiliser l'agent pour jouer au Puissance 4 !
});
