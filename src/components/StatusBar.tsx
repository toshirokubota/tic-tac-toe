import type { PlayerType } from "../types";

export default function StatusBar({players}:
    {players: PlayerType[]}
) {
    const xlabel = players[0].you ? (players[1].cpu ? 'YOU': 'P1'): (players[0].cpu ? 'CPU': 'P2');
    const olabel = players[1].you ? (players[0].cpu ? 'YOU': 'P1'): (players[1].cpu ? 'CPU': 'P2');
    
    return (
        <div className="status-bar flex justify-around items-center gap-4">
            <div className='x-status'>
                <p>X ({xlabel}) </p>
                <p className="font-bold text-xl">{players[0].wins}</p>
            </div>
            <div className='tie-status'>
                <p>TIES</p>
                <p className="font-bold text-xl">{players[0].ties}</p>
            </div>
            <div className='o-status'>
                <p>O ({olabel})</p>
                <p className="font-bold text-xl">{players[1].wins}</p>
            </div>
        </div>
    )
}