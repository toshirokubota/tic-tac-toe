import { useState } from "react";
import { Tile } from "./Tile";
import type { TileState, TileType } from "../types";

export default function Board({tiles, setTiles, turn, setTurn}:
    {
        tiles: TileType[],
        turn: boolean,
        setTiles: React.Dispatch<React.SetStateAction<TileType[]>>,
        setTurn: React.Dispatch<React.SetStateAction<boolean>>
    } 
) {
    return (
        <div className="board">
        {
            tiles.map((tile,index) => 
                <Tile key={index} tile={tile} turn={turn} setTiles={setTiles} setTurn={setTurn}/>)
        }
        </div>
    )
}