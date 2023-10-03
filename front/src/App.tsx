import { createSignal, Switch, type JSXElement, Match } from 'solid-js';
import { io } from 'socket.io-client';

import Header from './components/header';
import Board from './components/board';
import GameContext from './components/gameContext';
import { LanguageEnum } from './components/languageDict';
import Menu from './components/menu';

// TODO: Move this elsewere (in component Board online)
const socket = io('http://localhost:8000')
socket.emit("test request", 123)
socket.on("message", (req) => {
  console.log(req)
})

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
      </Switch>
    </>
  )
}