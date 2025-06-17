import { staticAsset } from "../libs";
import { imageNames, type PlayerType } from "../types";

export default function EndGame({winner, players, restart, quit}:
    {
        winner: number, 
        players: PlayerType[],
        restart: ()=>void,
        quit: ()=>void
    }
) {
    console.log('EndGame: ', players, winner);
    const winnerStatement = (winner: number, players: PlayerType[]): string => {
        if(winner >= 0) {
            if(players[0].cpu || players[1].cpu) { //played against a computer
                if(!players[winner].cpu) {
                    return 'YOU WON!';
                } else {
                    return 'OH NO, YOU LOST ...';
                }
            } else { //played against a human
                if(winner === 0) return 'PLAYER 1 WINS!'
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
                        winner >= 0 ? 
                            <h1 className={`${winner === 0 ? 'winner-x': 'winner-o'}`}>
                                <img src={staticAsset(imageNames[winner])} alt='the logo of the winner' />
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