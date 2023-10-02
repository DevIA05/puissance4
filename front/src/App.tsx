import type { JSXElement } from 'solid-js';

// TODO: Mettre en place un composant "context" `gameState` ?

import Header from './components/header';
import Board from './components/board';
import GameContext from './components/gameContext';

export default function (): JSXElement {
  return (
    <>
      <GameContext>
        {/* <Header /> */}
        <Board />
      </GameContext>
    </>
  )
}