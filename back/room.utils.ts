type RoomType = {
    id: number,
    playerOneSocketId: string | undefined,
    playerTwoSocketId: string | undefined,
}

// TODO: Utiliser une DB !?
let rooms: RoomType[] = [0,1,2].map((id) => {
    return {id, playerOneSocketId: undefined, playerTwoSocketId: undefined}
})

export function getRooms() {
    return rooms
}

export function getAvailableRoom() {
    const roomForPlayerTwo = rooms.filter((room) => room.playerOneSocketId && !room.playerTwoSocketId)
    if (roomForPlayerTwo.length != 0) {
      return roomForPlayerTwo[0]
    } else {
      return rooms.filter((room) => !room.playerOneSocketId)[0]
    }
}

export function updateRooms(room: RoomType, socketId: string) {
    let player:number;
    if (!room.playerOneSocketId) {
      room.playerOneSocketId = socketId
      player = 1 
    } else {
      room.playerTwoSocketId = socketId
      player = 2
    }
  
    const oldRooms = rooms.filter((_room) => room.id != _room.id)
    oldRooms.push(room)
    rooms = oldRooms
    return player
}