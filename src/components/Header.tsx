import { staticAsset } from "../libs";
import type { PlayerType } from "../types";

export default function Header({turn, reset}: 
    {
        turn: PlayerType,
        reset: ()=>void
    }) {
    return (
        <header>
            <div>
                <img src={staticAsset('/images/icon-x.svg')} alt='x-icon' />
                <img src={staticAsset('/images/icon-o.svg')} alt='x-icon' />
            </div>
            <div>
                {
                    turn ? <img src={staticAsset(turn.image)} alt='current player icon' />: null
                }
                <span>TURN</span>
            </div>
            <button>
                <img src={staticAsset('/images/icon-restart.svg')} alt='restart-icon' 
                onClick={reset}/>
            </button>
        </header>
    )
}