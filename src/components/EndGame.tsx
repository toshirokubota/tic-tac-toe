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
    const winnerStatement = (winner: PlayerType | null, players: PlayerType[]): string => {
        if(winner) {
            if(players[0].cpu || players[1].cpu) { //played against a computer
                if(!winner.cpu) {
                    return 'You won!';
                } else {
                    return 'On no, you lost ...';
                }
            } else { //played against a human
                if(winner === players[0]) return 'Player 1 wins!'
                else return 'Player 2 wins!'
            }
        } else return '';
    }
    return (
        <div className="modal-bg">
            <div className='modal-fg'>
                <p>{winnerStatement(winner, players)}</p>
                <>
                    {
                        winner ? 
                            <h1>
                                <img src={staticAsset(winner.image)} alt='the logo of the winner' />
                                TAKES THE ROUND
                            </h1>
                        :
                            <h1>ROUND TIED</h1>
                    }
                </>
                <div className='flex gap-4'>
                    <button className="silver-button" onClick={quit}>Quit</button>
                    <button className="orange-button" onClick={restart}>Next Round</button>
                </div>
            </div>
        </div>
    )
}