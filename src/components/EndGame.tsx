import { staticAsset } from "../libs";
import type { PlayerType } from "../types";

export default function EndGame({winner, players, restart, quit}:
    {
        winner: PlayerType | null, 
        players: PlayerType[],
        restart: ()=>void,
        quit: ()=>void
    }
) {
    console.log('EndGame: ', players, winner, winner===players[0], winner===players[1]);
    const winnerIdx = winner ? (winner.image === players[0].image ? 0: 1): -1;
    const winnerStatement = (winner: PlayerType | null, players: PlayerType[]): string => {
        if(winner) {
            if(players[0].cpu || players[1].cpu) { //played against a computer
                if(!winner.cpu) {
                    return 'YOU WON!';
                } else {
                    return 'OH NO, YOU LOST ...';
                }
            } else { //played against a human
                if(winnerIdx === 0) return 'PLAYER 1 WINS!'
                else return 'PLAYER 2 WINS!'
            }
        } 
        return '';
    }
    return (
        <div className="modal-bg">
            <div className='modal-fg'>
                <p>{winnerStatement(winner, players)}</p>
                <>
                    {
                        winner ? 
                            <h1 className={`${winnerIdx === 0 ? 'winner-x': 'winner-o'}`}>
                                <img src={staticAsset(winner.image)} alt='the logo of the winner' />
                                TAKES THE ROUND
                            </h1>
                        :
                            <h1>ROUND TIED</h1>
                    }
                </>
                <div className='flex gap-4'>
                    <button className="silver-button" onClick={quit}>QUIT</button>
                    <button className="orange-button" onClick={restart}>NEXT ROUND</button>
                </div>
            </div>
        </div>
    )
}