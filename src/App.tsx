import { useEffect, useState } from 'react';
import './App.css'
import Board from './components/Board'
import Header from './components/Header'
import type { TileType, TileState } from './types';
import { checkForWinBy, nextIntelligentMove } from './libs';

function App() {
  // const tmpTiles: TileType[] = (new Array(9)).map((_a,i)=> ({state: undefined, id: i}));
  // console.log('tmpTiles: ', tmpTiles);
  const [tiles, setTiles] = useState<TileType[]>(
    (new Array(9).fill(null)).map((_a,i) => ({state: undefined, id: i}))
  );
  const [turn, setTurn] = useState<boolean>(false);

  useEffect(() => {
    if(checkForWinBy(tiles, 'First')) {
      console.log('First Win!!!');
    } else if(checkForWinBy(tiles, 'Second')) {
      console.log('Second Win!!!');
    }
  }, [tiles]);
  
  useEffect(()=> {
    console.log('Turn change. ', turn);
    if(turn) {
      const pick = nextIntelligentMove(tiles, 'Second');
      console.log('next computer move: ', pick, tiles);
      if(pick) {
        setTiles(prev => prev.map(tile => tile === pick ? ({...tile, state: 'Second'}): tile));
        setTurn(!turn);
      }
    }
  }, [turn]);

  const resetGame = () => {
    setTiles(new Array(9).fill(null).map((_a,i) => ({state: undefined, id: i})));
    setTurn(false);
  }

  return (
    <>
      <Header turn={turn} reset={resetGame}/>
      <main>
        <Board tiles={tiles} setTiles={setTiles} turn={turn} setTurn={setTurn}/>
      </main>
    </>
  )
}

export default App
