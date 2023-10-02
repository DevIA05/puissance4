import type { JSXElement } from 'solid-js';

// TODO: Mettre en place un composant "context" `gameState` ?

import Navbar from './components/navbar';
import Board from './components/board';

export default function (): JSXElement {
  return (
    <>
      <Navbar />
      <Board />
    </>
  )
}