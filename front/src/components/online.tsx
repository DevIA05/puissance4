import { io } from 'socket.io-client';
import { PieceEnum } from './gameContext';
import { onCleanup } from 'solid-js';


export default function () {
    let playerPieceColor :PieceEnum

    const socket = io('http://localhost:8000')
    // socket.emit("test request", 123)
    socket.on("is player", (req) => {
      console.log(req)
      playerPieceColor = req == "red" ? PieceEnum.red : PieceEnum.yellow
    })
    
    onCleanup(()=> {
        // TODO: Check if working properly
        socket.disconnect()
    })
    return (<div>ONLINE GAME MATCHMAKING</div>)
}