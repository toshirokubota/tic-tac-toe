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
  const [tiles, setTiles] = useState<TileType[]>(
    (new Array(9).fill(null)).map((_a,i) => ({state: undefined, id: i}))
  );
  const [players, setPlayers] = useState<PlayerType[]>([
        {image: imageNames[0], cpu: false, you: true, wins: 0, ties: 0 },
        {image: imageNames[1], cpu: true, you: false, wins: 0, ties: 0 },
  ]);
  const [turn, setTurn] = useState<PlayerType>(players[0]);
  const [started, setStarted] = useState<boolean>(false);
  const [ended, setEnded] = useState<boolean>(false);
  const [isInitialRender, setIsInitialRender] = useState<boolean>(true);
  const [winner, setWinner] = useState<PlayerType | null>(null);
  const [reset, setReset] = useState<boolean>(false);
  const gameStorageKey = 'tic-tac-toe-tiles';

  //Load the game state if exists
  useEffect(()=>{
    const item = localStorage.getItem(gameStorageKey);
    if(item) {
      const obj = customParse(item)
      setPlayers(obj.players);
      setTiles(obj.tiles);
      setTurn(obj.turn);
      setWinner(obj.winner);
      setStarted(obj.started);
      setEnded(obj.ended);
      setIsInitialRender(obj.isInitialRender);
      setReset(obj.reset);
      console.log('loaded game state from the storage.', obj);
    }
  }, []);

  //FSM for the game
  useEffect(() => {
    if(isInitialRender) {
      console.log('setting initial-render to false')
      setIsInitialRender(false);
      setTurn(players[0]);
      setWinner(null);
      localStorage.setItem(gameStorageKey, customStringify(players, tiles, turn, winner, started, ended, isInitialRender, reset))
    } else if(checkForWinBy(tiles, players[0])) {
      console.log('First Win!!!');
      setWinner(players[0]);
      setPlayers(prev => [{...prev[0], wins: prev[0].wins + 1}, {...prev[1]}]);
      setEnded(true);
      localStorage.removeItem(gameStorageKey);
    } else if(checkForWinBy(tiles, players[1])) {
      console.log('Second Win!!!');
      setWinner(players[1]);
      setPlayers(prev => [{...prev[0]}, {...prev[1], wins: prev[1].wins + 1}]);
      setEnded(true);
      localStorage.removeItem(gameStorageKey);
    } else if(tiles.reduce((acc, curr) => acc + (curr.state === undefined ? 1: 0), 0) === 0) {
      setPlayers(prev => [{...prev[0], ties: prev[0].ties + 1}, {...prev[1], ties: prev[1].ties + 1}]);
      console.log("It's a tie!!!");
      setEnded(true);
      localStorage.removeItem(gameStorageKey);
    } else {
      switchTurn();
    localStorage.setItem(gameStorageKey, customStringify(players, tiles, turn, winner, started, ended, isInitialRender, reset))
    }
  }, [tiles]);
  
  //CPU's play
  useEffect(()=> {
    console.log('Turn change. ', turn, started);
    if(turn?.cpu) {
      const opponent = turn === players[0] ? players[1]: players[0];
      const pick = nextIntelligentMove(tiles, turn, opponent);
      console.log('next computer move: ', pick, tiles);
      if(pick) {
        setTiles(prev => prev.map(tile => tile === pick ? (
          {...tile, state: turn}): tile));
      }
    }
    localStorage.setItem(gameStorageKey, customStringify(players, tiles, turn, winner, started, ended, isInitialRender, reset))
  }, [turn]);

  //Start of the game
  useEffect(()=>{
    if(!ended && players.length == 2) {
      //setTiles(new Array(9).fill(null).map((_a,i) => ({state: undefined, id: i})));
      setIsInitialRender(true);
      setStarted(true);
      console.log('Initial players: ', [{...players[0]}, {...players[1]}]);
    }
    localStorage.setItem(gameStorageKey, customStringify(players, tiles, turn, winner, started, ended, isInitialRender, reset))
  }, [players])

  const restartGame = () => {
    console.log('restartGame: ', players);
    setTiles(new Array(9).fill(null).map((_a,i) => ({state: undefined, id: i})));
    setIsInitialRender(true);
    setEnded(false);
  }
  const switchTurn = () => {
    console.log('switchTurn: ', 'from Player ', turn, 'to Player ', (turn === players[0] ? players[1]: players[0]))
    setTurn((prev)=> prev === players[0] ? players[1]: players[0]);
  }

  return (
    <>
    {
      started ?
      <>
        {
          ended &&
          <EndGame players={players} winner={winner} quit={()=>{setEnded(false); setStarted(false)}} restart={restartGame}/>
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
      <InitialSetup setPlayers={setPlayers}/>
    }
    </>
  )
}

export default App
