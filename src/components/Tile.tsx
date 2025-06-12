import type { TileType } from "../types";
import { staticAsset } from "../libs";

export function Tile({setTiles, tile, turn, setTurn}:
    {
        tile: TileType,
        turn: boolean,
        setTiles: React.Dispatch<React.SetStateAction<TileType[]>>,
        setTurn: React.Dispatch<React.SetStateAction<boolean>>
    }
) {
    const handleClick = (_event: React.MouseEvent<HTMLButtonElement>)=> {
        if(!tile.state) {
            setTiles(prev => prev.map(k => k === tile ? {state: turn ? 'Second': 'First'}: k));
            setTurn(prev => !prev);
        }
    }
    return (
        <button 
            className={"tile-button" + `${tile.state ? ' taken': ''}`}
            onClick={handleClick}>
            {
            tile.state === 'First' ? 
                <img src={staticAsset('/images/icon-x.svg')} alt='x-icon' /> :
            tile.state === 'Second' ?
                <img src={staticAsset('/images/icon-o.svg')} alt='x-icon' /> : null
            }
        </button>
    )
}