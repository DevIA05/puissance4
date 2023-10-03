import type { JSXElement } from 'solid-js';

// TODO: Mettre en place un composant "context" `gameState` ?

import Header from './components/header';
import Board from './components/board';
import GameContext from './components/gameContext';
import { LanguageEnum } from './components/languageDict';

// TODO: Par default utiliser la langue du browser
// TODO: The user should be able to change langage
export const gameLanguage = LanguageEnum.eng

export default function (): JSXElement {
  return (
    <>
      <Header />
      {/* <Menu /> */}
      {/* <GameContext> */}
        {/* <Header /> */}
        {/* <Board /> */}
      {/* </GameContext> */}
    </>
  )
}