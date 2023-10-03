import { createSignal, Switch, type JSXElement, Match } from 'solid-js';

import Header from './components/header';
import Board from './components/board';
import GameContext from './components/gameContext';
import { LanguageEnum } from './components/languageDict';
import Menu from './components/menu';
import Online from './components/online';

// TODO: Par default utiliser la langue du browser
// TODO: The user should be able to change langage
export const gameLanguage = LanguageEnum.fr

// TODO: Rename
export enum PageEnum {
  menu,
  local,
  online,
  ia
}

// TODO: Rename
export const [actualPage, setActualPage] = createSignal(PageEnum.menu)

// TODO: Rename "Board" component to "LocalBoard"
export default function (): JSXElement {
  return (
    <>
      <Header />
      <Switch>
        <Match when={actualPage() == PageEnum.menu}>
          <Menu />
        </Match>
        <Match when={actualPage() == PageEnum.local}>
          <GameContext>
            <Board />
          </GameContext>
        </Match>
        <Match when={actualPage() == PageEnum.online}>
          <Online />
        </Match>
      </Switch>
    </>
  )
}