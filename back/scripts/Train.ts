import { Connect4 } from './Connect4';
import { Agent } from './Agent';

debugger

const env: Connect4 = new Connect4();
const agent: Agent = new Agent();

const numEpisodes: number = 10; // Number of training episodes

for (let episode: number = 0; episode < numEpisodes; episode++) {
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
        // Calculate the reward based on the game result (e.g. 1 for a win, 0 for a tie, -1 for a loss)
        const reward = env.getReward();
        rewards.push(reward);
      }
    }
  }

  // @ts-ignore: Keep this console.log statement
  console.log("===============================================================")
  console.log(`Episode:  ${episode}`)
  console.log("===============================================================")

  // Update the agent based on experiences in the episode
  agent.learnFromExperience(states, actions, rewards[episode]);

  // Show the game at the end of the episode
  env.printBoard();

  // Reset the environment for the next episode
  env.reset();
}
