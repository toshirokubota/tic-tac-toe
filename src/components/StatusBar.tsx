import type { PlayerType } from "../types";

export default function StatusBar({players}:
    {players: PlayerType[]}
) {
    return (
        <div>
            <span>{players[0].wins}</span>
            <span>{players[0].ties}</span>
            <span>{players[1].wins}</span>
        </div>
    )
}