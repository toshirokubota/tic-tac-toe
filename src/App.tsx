import { useEffect, useRef, useState } from 'react';
import './App.css'
import Board from './components/Board'
import Header from './components/Header'
import { type TileType, type PlayerType, imageNames } from './types';
import { checkForWinBy, nextIntelligentMove } from './libs';
import StatusBar from './components/StatusBar';
import InitialSetup from './components/InitialSetup';

function App() {
  // const tmpTiles: TileType[] = (new Array(9)).map((_a,i)=> ({state: undefined, id: i}));
  // console.log('tmpTiles: ', tmpTiles);
  const [tiles, setTiles] = useState<TileType[]>(
    (new Array(9).fill(null)).map((_a,i) => ({state: undefined, id: i}))
  );
  const [players, setPlayers] = useState<PlayerType[]>(
    [{image: imageNames[0], cpu: false, wins: 0, ties: 0}, 
    {image: imageNames[1], cpu: true, wins: 0, ties: 0}]
  )
  const [started, setStarted] = useState<boolean>(false);
  const [turn, setTurn] = useState<PlayerType>(players[0]);
  const [isInitialRender, setIsInitialRender] = useState<boolean>(true);

  useEffect(() => {
    if(isInitialRender) {
      setIsInitialRender(false);
    } else if(checkForWinBy(tiles, players[0])) {
      console.log('First Win!!!');
      setPlayers(prev => [{...prev[0], wins: prev[0].wins + 1}, {...prev[1]}]);
    } else if(checkForWinBy(tiles, players[1])) {
      console.log('Second Win!!!');
      setPlayers(prev => [{...prev[0]}, {...prev[1], wins: prev[1].wins + 1}]);
    } else if(tiles.reduce((acc, curr) => acc + (curr.state === undefined ? 1: 0), 0) === 0) {
      setPlayers(prev => [{...prev[0], ties: prev[0].ties + 1}, {...prev[1], ties: prev[1].ties + 1}]);
      console.log("It's a tie!!!");
    } else {
      switchTurn();
    }
  }, [tiles]);
  
  useEffect(()=> {
    console.log('Turn change. ', turn);
    if(turn.cpu) {
      const opponent = turn === players[0] ? players[1]: players[0];
      const pick = nextIntelligentMove(tiles, turn, opponent);
      console.log('next computer move: ', pick, tiles);
      if(pick) {
        setTiles(prev => prev.map(tile => tile === pick ? (
          {...tile, state: turn}): tile));
        //switchTurn();
      }
    }
  }, [turn]);

  const startGame = () => {
    setStarted(true);
    setTiles(new Array(9).fill(null).map((_a,i) => ({state: undefined, id: i})));
    setTurn(players[0]);
    setIsInitialRender(true);
  }
  const switchTurn = () => {
    console.log('switchTurn: ', 'from Player ', (turn === players[0] ? 0: 1), 'to Player ', (turn === players[0] ? 1: 0))
    setTurn(turn === players[0] ? players[1]: players[0]);
  }

  return (
    <>
    {
      started ?
      <>
        <Header turn={turn} reset={startGame}/>
        <main>
          <Board tiles={tiles} setTiles={setTiles} turn={turn}/>
          <StatusBar players={players} />
        </main>
      </>
      :
      <InitialSetup startGame={startGame}/>
    }
    </>
  )
}

export default App
