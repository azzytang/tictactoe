// TicTacToe Example
/**
 * Generic board game types
 * @type Player: json object, in the format of
 * {
 *  id: string, unique player id
 *  username: string, the player's display name
 * }
 * @type BoardGame: json object, in the format of
 * {
 *  // creator read write fields
 *  state: json object, which represents any board game state
 *  joinable: boolean (default=true), whether or not the room can have new players added to it
 *  finished: boolean (default=false), when true there will be no new board game state changes
 *
 *  // creator read only
 *  players: [Player], array of player objects
 *  version: Number, an integer value that increases by 1 with each state change
 * }
 * @type BoardGameResult: json object, in the format of
 * {
 *  // fields that creator wants to overwrite
 *  state?: json object, which represents any board game state
 *  joinable?: boolean, whether or not the room can have new players added to it
 *  finished?: boolean, when true there will be no new board game state changes
 * }
 */

/**
 * onRoomStart
 * @returns {BoardGameResult}
 */
 function onRoomStart() {
  console.log("onRoomStart")
  return {
    state: {
      playerIdToHand: {},
      winner: null,
  }
}
}

/**
 * onPlayerJoin
 * @param {Player} player, represents the player that is attempting to join this game
 * @param {BoardGame} currentGame
 * @returns {BoardGameResult}
 */
function onPlayerJoin(player, boardGame) {
  console.log("onPlayerJoin", player, boardGame);

  const currentState = boardGame.state;
  const currentPlayerIdToHand = currentState.playerIdToHand;
  currentPlayerIdToHand[player.id] = null;

  if (Object.keys(currentPlayerIdToHand).length === 2){
    return{
 
      state: currentState,
      joinable: false
    };
  };
  return {
    state: currentState
  }
}




/**
 * onPlayerMove
 * @param {Player} player, the player that is attempting to make a move
 * @param {*} move json object, controlled the creator that represents the player's move
 * @param {BoardGame} currentGame
 * @returns {BoardGameResult}
 */
function onPlayerMove(player, move, boardGame) {
  const currentState = boardGame.state;
  const currentPlayerIdToHand = currentState.playerIdToHand;
  console.log("onPlayerJoin", player, move, boardGame)
  currentPlayerIdToHand[player.id] = move.hand
  const {players} = boardGame
  
  const allPlayerMoved = Object.values(currentPlayerIdToHand).every((e)=> e)
  const hands = Object.values(currentPlayerIdToHand)
  if (allPlayerMoved) {
    if (hands[0] === hands[1]){
      currentState.winner='no one'} 
    else if (hands[0] === 'rock') {
        if (hands[1]=== 'paper') {
          currentState.winner= players[1].username
      } else {
          currentState.winner= players[0].username
      }
    } else if (hands[0]=== 'paper'){
        if (hands[1] === 'rock') {
          currentState.winner=  players[0].username
        } else {
          currentState.winner= players[1].username
        }
    } else {
        if (hands[1] === 'rock') {
          currentState.winner= players[1].username
        } else {
          currentState.winner= players[0].username
        }
    }
    return {
      state: currentState,
      finished: true
    }

  }
  return {

    state: currentState
    
  };
}

/**
 * onPlayerQuit
 * @param {Player} player, the player that is attempting to quit the game
 * @param {BoardGame} currentGame
 * @returns {BoardGameResult}
 */
function onPlayerQuit(player, boardGame) {
  console.log("onPlayerQuit", player, boardGame)

  return {

  };
}

module.exports = {
  onRoomStart,
  onPlayerJoin,
  onPlayerMove,
  onPlayerQuit,
};


