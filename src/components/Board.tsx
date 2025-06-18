import { Tile } from "./Tile";
import type { TileType } from "../types";

export default function Board({tiles, setTiles, turn, movePhase}:
    {
        tiles: TileType[],
        turn: number,
        setTiles: React.Dispatch<React.SetStateAction<TileType[]>>,
        movePhase: ()=> void
    } 
) {
    return (
        <div className="board" aria-live='polite'>
        {
            tiles.map((tile,index) => 
                <Tile key={index} tile={tile} turn={turn} setTiles={setTiles} movePhase={movePhase}/>)
        }
        </div>
    )
}