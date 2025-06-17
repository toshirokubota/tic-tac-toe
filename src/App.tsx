import { useEffect, useState } from 'react';
import './App.css'
import Board from './components/Board'
import Header from './components/Header'
import { type TileType, type PlayerType, imageNames } from './types';
import { checkForWinBy, customParse, customStringify, nextIntelligentMove } from './libs';
import StatusBar from './components/StatusBar';
import InitialSetup from './components/InitialSetup';
import EndGame from './components/EndGame';
import ResetGame from './components/ResetGame';

function App() {
  const [tiles, setTiles] = useState<TileType[]>(()=>
    (new Array(9).fill(null)).map((_a,i) => ({state: undefined, id: i}))
  );
  const [players, setPlayers] = useState<PlayerType[]>(()=>[
        {image: imageNames[0], cpu: false, you: true, wins: 0, ties: 0 },
        {image: imageNames[1], cpu: true, you: false, wins: 0, ties: 0 },
  ]);
  const [turn, setTurn] = useState<PlayerType>(players[0]);
  const [played, setPlayed] = useState<boolean>(false);
  const [initialized, setInitialized] = useState<boolean>(false);
  const [ended, setEnded] = useState<boolean>(false);
  const [winner, setWinner] = useState<PlayerType | null>(null);
  const [reset, setReset] = useState<boolean>(false);
  const gameStorageKey = 'tic-tac-toe-tiles';

  const handleUnload = () => {
    console.log('unmounting the app.', initialized, tiles);
    // localStorage.setItem(gameStorageKey, 
    //   customStringify(players, tiles, turn, winner, initialized, ended, numPlays, reset));
  }

  //Load the game state if exists
  // useEffect(()=>{
  //   const item = localStorage.getItem(gameStorageKey);
  //   if(item) {
  //     const obj = customParse(item)
  //     setPlayers(obj.players);
  //     setTiles(obj.tiles);
  //     setTurn(obj.turn);
  //     setWinner(obj.winner);
  //     setInitialized(true); //obj.initialized);
  //     setEnded(obj.ended);
  //     setReset(obj.reset);
  //     console.log('loaded game state from the storage.', obj);
  //     //localStorage.removeItem(gameStorageKey);
  //   }

  //   window.addEventListener('beforeunload', handleUnload);
  //   return () => window.removeEventListener('beforeunload', handleUnload);
  // }, []);

  //FSM for the game
  useEffect(() => {
    console.log('Effect - Played Before: ', tiles, players, initialized, played, winner);
    if(played) {
      if(checkForWinBy(tiles, players[0])) {
        console.log('First Win!!!');
        setWinner(players[0]);
        setPlayers(prev => [{...prev[0], wins: prev[0].wins + 1}, {...prev[1]}]);
        setEnded(true);
      } else if(checkForWinBy(tiles, players[1])) {
        console.log('Second Win!!!');
        setWinner(players[1]);
        setPlayers(prev => [{...prev[0]}, {...prev[1], wins: prev[1].wins + 1}]);
        setEnded(true);
      } else if(tiles.reduce((acc,curr)=> curr.state == undefined ? acc: acc + 1, 0) === 9) {
        console.log("It's a tie!!!");
        setPlayers(prev => [{...prev[0], ties: prev[0].ties + 1}, {...prev[1], ties: prev[1].ties + 1}]);
        setWinner(null);
        setEnded(true);
      } else {
        console.log('Play continue...');
      }

      setPlayed(false);
      //console.log('Switch players. ', turn);
      switchTurn();

      console.log('store the current state. Tiles = ', tiles);
      localStorage.setItem(gameStorageKey, 
          customStringify(players, tiles, turn, winner, initialized, ended, reset));
    } else {
      console.log('Turn change. Possible CPU play:', turn, initialized, played);
      if(turn?.cpu && !winner) {
        const opponent = turn === players[0] ? players[1]: players[0];
        const pick = nextIntelligentMove(tiles, turn, opponent);
        console.log('next computer move: ', pick, tiles);
        if(pick) {
          setTiles(prev => prev.map(tile => tile === pick ? (
            {...tile, state: turn}): tile));
          setPlayed(true);
        }
      }
      localStorage.setItem(gameStorageKey, 
          customStringify(players, tiles, turn, winner, initialized, ended, reset));
    }
    console.log('Effect - Played After: ', tiles, players, initialized, played, winner);

  }, [played, players]);
  
  //CPU's play
  // useEffect(()=> {
  //   console.log('Turn change. Possible CPU play:', turn, initialized, played);
  //   if(turn?.cpu) {
  //     const opponent = turn === players[0] ? players[1]: players[0];
  //     const pick = nextIntelligentMove(tiles, turn, opponent);
  //     console.log('next computer move: ', pick, tiles);
  //     if(pick) {
  //       setTiles(prev => prev.map(tile => tile === pick ? (
  //         {...tile, state: turn}): tile));
  //       setPlayed(true);
  //     }
  //   }
  //   localStorage.setItem(gameStorageKey, 
  //       customStringify(players, tiles, turn, winner, initialized, ended, reset));
  // }, [turn]);

  // useEffect(()=>{
  //   console.log('store the current state. Tiles = ', tiles);
  //   localStorage.setItem(gameStorageKey, 
  //       customStringify(players, tiles, turn, winner, initialized, ended, reset));
  // },[players, tiles, turn, winner, initialized, ended, reset]);

  const restartGame = () => {
    console.log('restartGame: ', players);
    setTiles(new Array(9).fill(null).map((_a,i) => ({state: undefined, id: i})));
    setTurn(players[0]);
    setEnded(false);
    setWinner(null);
  }
  const switchTurn = () => {
    console.log('switchTurn: ', 'from Player ', turn, 'to Player ', (turn.image === players[0].image ? players[1]: players[0]))
    setTurn((prev)=> prev.image === players[0].image ? players[1]: players[0]);
  }

  return (
    <>
    {
      initialized ?
      <>
        {
          ended &&
          <EndGame players={players} winner={winner} 
                  quit={()=>{setEnded(false); setInitialized(false)}} restart={restartGame}/>
        }
        {
          reset && 
          <ResetGame cancel={()=>setReset(false)} restart={()=>{setReset(false); restartGame()}} />
        }
        <>
          <Header turn={turn} reset={()=>setReset(true)}/>
          <main>
            <Board tiles={tiles} setTiles={setTiles} turn={turn} setPlayed={setPlayed}/>
            <StatusBar players={players} />
          </main>
        </>
      </>
      :
      <InitialSetup setPlayers={setPlayers} start={()=>{setInitialized(true); restartGame();}}/>
    }
    </>
  )
}

export default App
