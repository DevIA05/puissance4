import type { JSXElement } from 'solid-js';

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