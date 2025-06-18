import { imageNames, type TileType } from "../types";
import { staticAsset } from "../libs";

export function Tile({setTiles, tile, turn, movePhase}:
    {
        tile: TileType,
        turn: number,
        setTiles: React.Dispatch<React.SetStateAction<TileType[]>>,
        movePhase: ()=> void
    }
) {
    const handleClick = (_event: React.MouseEvent<HTMLButtonElement>)=> {
        if(tile.state < 0) {
            console.log('Tile is clicked. ', tile, turn);
            setTiles(prev => prev.map(k => k === tile ? {...k, state: turn}: k));
            movePhase();
        }
    }
    return (
        <button 
            className={"tile-button" + `${tile.state >= 0 ? ' taken': ''}` + `${turn == 0 ? ' turn-1': (turn == 1 ? ' turn-2': '')}`}
            onClick={handleClick}
            aria-label={tile.state < 0 ? 'not yet taken by either player': (tile.state == 0 ? 'taken by player 1': 'taken by player 2')}
            >
            {
            tile.state >=0 ? 
                <img src={staticAsset(imageNames[tile.state])} alt={tile.state === 0 ? 'x': 'o'} /> :
                null
            }
        </button>
    )
}