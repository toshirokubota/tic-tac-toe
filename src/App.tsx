import { useEffect, useState } from 'react';
import './App.css'
import Board from './components/Board'
import Header from './components/Header'
import { type TileType, type PlayerType, type GamePhase } from './types';
import { checkForWinBy, customParse, customStringify, nextIntelligentMove } from './libs';
import StatusBar from './components/StatusBar';
import InitialSetup from './components/InitialSetup';
import EndGame from './components/EndGame';
import ResetGame from './components/ResetGame';

function App() {
  const [tiles, setTiles] = useState<TileType[]>(
    (new Array(9).fill(null)).map((_a,i) => ({state: -1, id: i}))
  );
  const [players, setPlayers] = useState<PlayerType[]>([]);
  const [turn, setTurn] = useState<number>(-1);
  const [phase, setPhase] = useState<GamePhase>("Idle");
  const [winner, setWinner] = useState<number>(-1);
  const gameStorageKey = 'tic-tac-toe-tiles';

  //FSM for the game
  useEffect(() => {
    console.log('Effect - Before: ', tiles, players, phase, turn, winner);
    if(phase === 'Idle') {
      const item = localStorage.getItem(gameStorageKey);
      if(item) {
        const obj = customParse(item)
        setPlayers(obj.players);
        setTiles(obj.tiles);
        setTurn(obj.turn);
        setWinner(obj.winner);
        setPhase(obj.phase);
        console.log('loaded game state from the storage.', obj);
        //localStorage.removeItem(gameStorageKey);
      } else {
        setPhase('Setup');
      }
    // } else if(phase === 'Restart'){
    //   restartGame();
    } else if(phase === 'Played1' || phase === 'Played2') {
      if(checkForWinBy(tiles, 0)) {
        console.log('First Win!!!');
        setWinner(0);
        setPlayers(prev => [{...prev[0], wins: prev[0].wins + 1}, {...prev[1]}]);
        setPhase('Over');
      } else if(checkForWinBy(tiles, 1)) {
        console.log('Second Win!!!');
        setWinner(1);
        setPlayers(prev => [{...prev[0]}, {...prev[1], wins: prev[1].wins + 1}]);
        setPhase('Over');
      } else if(tiles.reduce((acc,curr)=> curr.state < 0 ? acc: acc + 1, 0) === 9) {
        console.log("It's a tie!!!");
        setPlayers(prev => [{...prev[0], ties: prev[0].ties + 1}, {...prev[1], ties: prev[1].ties + 1}]);
        setWinner(-1);
        setPhase('Over');
      } else {
        console.log('Play continue...');
        switchTurn();
      }
    } else if(phase==='Thinking1' || phase === 'Thinking2') {
      console.log('Turn change. Possible CPU play:', turn, phase);
      if(players[turn].cpu) {
        const opponent = turn === 0 ? 1: 0;
        const pick = nextIntelligentMove(tiles, turn, opponent);
        console.log('next computer move: ', pick, tiles);
        if(pick) {
          setTiles(prev => prev.map(tile => tile === pick ? (
            {...tile, state: turn}): tile));
          movePhase();
        }
      }
    }
    if(phase != 'Idle') {
      console.log('store the current state. Tiles = ', tiles);
      localStorage.setItem(gameStorageKey, 
          customStringify(players, tiles, turn, winner, phase));
    }
    console.log('Effect - After: ', tiles, players, phase, turn, winner);

  }, [phase]);
  
  const restartGame = () => {
    console.log('restartGame: ', players);
    setTiles(new Array(9).fill(null).map((_a,i) => ({state: -1, id: i})));
    setTurn(0);
    setWinner(-1);
    setPhase('Thinking1')
  }
  const switchTurn = () => {
    console.log('switchTurn: ', 'from Player ', turn, 'to Player ', (turn === 0 ? 1: 0))
    if(phase === 'Played1') {
      setTurn(1);
      setPhase('Thinking2');
    } else if(phase === 'Played2') {
      setTurn(0);
      setPhase('Thinking1');
    } else {
      console.log("switchTurn: invoked at a wrong phase.", phase);
    }
  }
  const movePhase = () => {
    if(phase === 'Thinking1') setPhase('Played1');
    else if(phase === 'Thinking2') setPhase('Played2');
    else console.log("movePhase: invoked at a wrong phase.", phase);
  } 

  return (
    <>
      <>
        {
          phase === 'Over' &&
          <EndGame players={players} winner={winner} 
                  quit={()=>{setPhase('Setup')}} restart={()=>setPhase('Restart')}/>
        }
        {
          phase === 'Restart' && 
          <ResetGame cancel={()=>setPhase(turn == 0 ? 'Thinking1': 'Thinking2')} restart={()=>setPhase('Restart')} />
        }
        {
          phase === 'Setup' && 
          <InitialSetup setPlayers={setPlayers} start={()=>setPhase('Restart')}/>
        }
        {
          phase !== 'Setup' &&
          <>
            <Header turn={turn} reset={()=>setPhase('Restart')}/>
            <main>
              <Board tiles={tiles} setTiles={setTiles} turn={turn} movePhase={movePhase}/>
              {players.length == 2 && <StatusBar players={players} />}
            </main>
          </>
        }
      </>
    </>
  )
}

export default App
