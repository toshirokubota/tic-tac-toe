import { Tile } from "./Tile";
import type { PlayerType, TileType } from "../types";

export default function Board({tiles, setTiles, turn, setPlayed}:
    {
        tiles: TileType[],
        turn: PlayerType,
        setTiles: React.Dispatch<React.SetStateAction<TileType[]>>,
        setPlayed: React.Dispatch<React.SetStateAction<boolean>>
    } 
) {
    return (
        <div className="board">
        {
            tiles.map((tile,index) => 
                <Tile key={index} tile={tile} turn={turn} setTiles={setTiles} setPlayed={setPlayed}/>)
        }
        </div>
    )
}