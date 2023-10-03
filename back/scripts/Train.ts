import { Connector4 } from './Connector4';
import { Agent } from './Agent';


const env = new Connector4();
const agent = new Agent();

const numEpisodes = 10; // Nombre d'épisodes d'entraînement

for (let episode = 0; episode < numEpisodes; episode++) {
  let done = false;
  const states: number[][][] = [];
  const actions: number[] = [];
  const rewards: number[] = [];

  while (!done) {
    const state = env.getState();
    const action = agent.chooseMove(state);
    const validMove = env.playMove(action);

    if (validMove) {
      states.push(state);
      actions.push(action);

      if (env.isGameOver()) {
        done = true;
        // Calculez la récompense en fonction du résultat du jeu (par exemple, 1 pour une victoire, 0 pour une égalité, -1 pour une défaite)
        const reward = env.getReward();
        rewards.push(reward);
      }
    }
  }

  // Mettez à jour l'agent en fonction des expériences de l'épisode
  agent.learnFromExperience(states, actions, rewards);

  // Réinitialisez l'environnement pour le prochain épisode
  env.reset();
}
