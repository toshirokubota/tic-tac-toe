import { type TileType, type PlayerType, imageNames } from "../types";
import { staticAsset } from "../libs";

export function Tile({setTiles, tile, turn, setPlayed}:
    {
        tile: TileType,
        turn: PlayerType,
        setTiles: React.Dispatch<React.SetStateAction<TileType[]>>,
        setPlayed: React.Dispatch<React.SetStateAction<boolean>>,
    }
) {
    const handleClick = (_event: React.MouseEvent<HTMLButtonElement>)=> {
        if(!tile?.state) {
            console.log('Tile is clicked. ', tile, turn);
            setTiles(prev => prev.map(k => k === tile ? {...k, state: turn}: k));
            setPlayed(true);
        }
    }
    return (
        <button 
            className={"tile-button" + `${tile.state ? ' taken': ''}` + `${turn ? (turn.image === imageNames[0] ? ' turn-1': ' turn-2'): ''}`}
            onClick={handleClick}>
            {
            tile.state !== undefined ? 
                <img src={staticAsset(tile.state.image)} alt={tile.state.image === imageNames[0] ? 'x': 'o'} /> :
                null
            }
        </button>
    )
}