import type { TileType, PlayerType } from "../types";
import { staticAsset } from "../libs";

export function Tile({setTiles, tile, turn}:
    {
        tile: TileType,
        turn: PlayerType,
        setTiles: React.Dispatch<React.SetStateAction<TileType[]>>,
    }
) {
    const handleClick = (_event: React.MouseEvent<HTMLButtonElement>)=> {
        if(!tile.state) {
            setTiles(prev => prev.map(k => k === tile ? {...k, state: turn}: k));
        }
    }
    return (
        <button 
            className={"tile-button" + `${tile.state ? ' taken': ''}`}
            onClick={handleClick}>
            {
            tile.state !== undefined ? 
                <img src={staticAsset(tile.state.image)} alt='' /> :
                null
            }
        </button>
    )
}