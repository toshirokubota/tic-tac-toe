import { Tile } from "./Tile";
import type { PlayerType, TileType } from "../types";

export default function Board({tiles, setTiles, turn}:
    {
        tiles: TileType[],
        turn: PlayerType,
        setTiles: React.Dispatch<React.SetStateAction<TileType[]>>
    } 
) {
    return (
        <div className="board">
        {
            tiles.map((tile,index) => 
                <Tile key={index} tile={tile} turn={turn} setTiles={setTiles}/>)
        }
        </div>
    )
}