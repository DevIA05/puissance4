import * as tf from '@tensorflow/tfjs-node';

export function createModel(inputShape: number[], outputUnits: number): tf.LayersModel {
  const model = tf.sequential();
  model.add(tf.layers.dense({ units: 64, activation: 'relu', inputShape }));
  model.add(tf.layers.dense({ units: 32, activation: 'relu' }));
  model.add(tf.layers.dense({ units: outputUnits, activation: 'softmax' }));
  
  model.compile({
    loss: 'categoricalCrossentropy',
    optimizer: tf.train.adam(),
    metrics: ['accuracy'],
  });

  return model;
}
