import React, { useState, useEffect } from 'react';
import { ThemeProvider, Typography, Button, Stack } from '@mui/material';



import client, { events } from '@urturn/client';
import theme from './theme';

function App() {
  const [boardGame, setBoardGame] = useState(client.getBoardGame() || {});
  useEffect(() => {
    const onStateChanged = (newBoardGame) => {
      setBoardGame(newBoardGame);
    };
    events.on('stateChanged', onStateChanged);
    return () => {
      events.off('stateChanged', onStateChanged);
    };
  }, []);
  
  console.log('boardGame:', boardGame);
  const {state: {winner, currentPlayerIdToHand = {}}={currentPlayerIdToHand: {}}} = boardGame
  const player = client.getLocalPlayer();
  const currentHand = currentPlayerIdToHand[player.id];
  console.log(winner)
  return (
    <ThemeProvider theme={theme}>
      
      {winner ? <Typography color="white">{winner ? `${winner} won` : "waiting for other player..."}</Typography>
      : 
      <Stack>
        <Button onClick={()=> {client.makeMove({hand: 'rock'})}}>Rock</Button>
        <Button onClick={()=> {client.makeMove({hand: 'paper'})}}>Paper</Button>
        <Button onClick={()=> {client.makeMove({hand: 'scissors'})}}>Scissors</Button>
      </Stack> 
      }
      
    </ThemeProvider> 
  );
}

export default App;
