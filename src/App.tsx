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
  const [initialized, setInitialized] = useState<boolean>(false);
  const [ended, setEnded] = useState<boolean>(false);
  const [numPlays, setNumPlays] = useState<number>(0);
  const [winner, setWinner] = useState<PlayerType | null>(null);
  const [reset, setReset] = useState<boolean>(false);
  const gameStorageKey = 'tic-tac-toe-tiles';

  const handleUnload = () => {
    console.log('unmounting the app.', initialized, tiles);
    // localStorage.setItem(gameStorageKey, 
    //   customStringify(players, tiles, turn, winner, initialized, ended, numPlays, reset));
  }

  //Load the game state if exists
  useEffect(()=>{
    const item = localStorage.getItem(gameStorageKey);
    if(item) {
      const obj = customParse(item)
      setPlayers(obj.players);
      setTiles(obj.tiles);
      setTurn(obj.turn);
      setWinner(obj.winner);
      setInitialized(true); //obj.initialized);
      setEnded(obj.ended);
      setNumPlays(obj.numPlays);
      setReset(obj.reset);
      console.log('loaded game state from the storage.', obj);
      //localStorage.removeItem(gameStorageKey);
    }

    window.addEventListener('beforeunload', handleUnload);
    return () => window.removeEventListener('beforeunload', handleUnload);
  }, []);

  //FSM for the game
  useEffect(() => {
    const n = tiles.reduce((acc,curr) => curr.state != undefined ? acc + 1: acc, 0);
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
    } else if(n === 9) {
      console.log("It's a tie!!!");
      setPlayers(prev => [{...prev[0], ties: prev[0].ties + 1}, {...prev[1], ties: prev[1].ties + 1}]);
      setWinner(null);
      setEnded(true);
    } 
    setNumPlays(n);
    console.log('Effect - Tiles: ', tiles, initialized, n);

  }, [tiles]);
  
  //CPU's play
  useEffect(()=> {
    console.log('Turn change. ', turn, initialized);
    if(turn?.cpu) {
      const opponent = turn === players[0] ? players[1]: players[0];
      const pick = nextIntelligentMove(tiles, turn, opponent);
      console.log('next computer move: ', pick, tiles);
      if(pick) {
        setTiles(prev => prev.map(tile => tile === pick ? (
          {...tile, state: turn}): tile));
      }
    }
  }, [turn]);

  //Switch a player after a tile being selected.
  useEffect(()=>{
    if(numPlays > 0) {
      console.log('Switch players. ', turn, numPlays);
      switchTurn();
    }
  }, [numPlays]);

  useEffect(()=>{
    console.log('store the current state. Turn = ', turn);
    localStorage.setItem(gameStorageKey, 
        customStringify(players, tiles, turn, winner, initialized, ended, numPlays, reset));
  },[players, tiles, turn, winner, initialized, ended, numPlays, reset]);

  // //Start of the game
  // useEffect(()=>{
  //   if(!ended && players.length == 2) {
  //     setStarted(true);
  //     console.log('Initial players: ', [{...players[0]}, {...players[1]}]);
  //   }
  // }, [players])

  const restartGame = () => {
    console.log('restartGame: ', players);
    setTiles(new Array(9).fill(null).map((_a,i) => ({state: undefined, id: i})));
    setTurn(players[0]);
    setEnded(false);
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
            <Board tiles={tiles} setTiles={setTiles} turn={turn}/>
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
