import { staticAsset } from "../libs";
import type { TurnType } from "../types";

export default function Header({turn, reset}: 
    {
        turn: boolean,
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
                        turn ? <img src={staticAsset('/images/icon-x.svg')} alt='x-icon' /> :
                        <img src={staticAsset('/images/icon-o.svg')} alt='x-icon' />
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