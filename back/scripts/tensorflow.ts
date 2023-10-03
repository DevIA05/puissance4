import * as tf from '@tensorflow/tfjs-node';
import fs from 'fs';

// Hyperparamètres
const numStates = 16; // Nombre d'états possibles
const numActions = 4; // Nombre d'actions possibles (haut, bas, gauche, droite)
const learningRate = 0.1;
const discountFactor = 0.9;
const explorationRate = 0.1;
const numEpisodes = 1000;

// Création du modèle Q
const model = tf.sequential();
model.add(tf.layers.dense({ units: numActions, inputShape: [numStates], activation: 'linear' }));
model.compile({ optimizer: tf.train.sgd(learningRate), loss: 'meanSquaredError' });

// Fonction epsilon-greedy pour choisir une action
function chooseAction(state: number, qValues: tf.Tensor<tf.Rank>): number {
  if (Math.random() < explorationRate) {
    return Math.floor(Math.random() * numActions);
  } else {
    const values = qValues.arraySync()[0];
    return values.indexOf(Math.max(...values));
  }
}

// Entraînement de l'agent
for (let episode = 0; episode < numEpisodes; episode++) {
  let state = Math.floor(Math.random() * numStates);
  let done = false;
  
  while (!done) {
    const qValues = model.predict(tf.tensor([[state]]));
    const action = chooseAction(state, qValues);
    
    // Effectuer l'action et observer la récompense et le nouvel état
    const nextState = Math.floor(Math.random() * numStates);
    const reward = (nextState === 15) ? 1 : 0; // Récompense si l'état final est atteint
    
    // Calcul de la cible Q
    const targetQ = qValues.clone();
    const nextQValues = model.predict(tf.tensor([[nextState]]));
    const maxNextQ = tf.max(nextQValues, axis=1);
    targetQ[0][action] = reward + discountFactor * maxNextQ;
    
    // Entraînement du modèle
    model.fit(tf.tensor([[state]]), targetQ, { epochs: 1, verbose: 0 });
    
    state = nextState;
    if (state === 15) done = true; // Fin de l'épisode si l'état final est atteint
  }
}

// Sauvegarde du modèle
model.save('q-learning-model')
  .then(() => {
    console.log('Modèle sauvegardé.');
  })
  .catch((err) => {
    console.error('Erreur lors de la sauvegarde du modèle :', err);
  });
