import { staticAsset } from "../libs";
import { imageNames, type PlayerType } from "../types";

export default function Header({turn, reset}: 
    {
        turn: PlayerType | null,
        reset: ()=>void
    }) {
    return (
        <header>
            <div className='player-icons'>
                <img src={staticAsset('/images/icon-x.svg')} alt='x-icon' />
                <img src={staticAsset('/images/icon-o.svg')} alt='x-icon' />
            </div>
            <div className="turn">
                {
                    turn ? 
                        turn.image === imageNames[0] ? 
                        //<svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
                        <svg viewBox="0 0 32 32">
                            <g transform="scale(0.5)">
                                <path d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z" fill="#A8BFC9" fillRule="evenodd"/>
                            </g>
                        </svg>
                        :
                        //<svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
                        <svg viewBox="0 0 32 32">
                            <g transform="scale(0.5)">
                                <path d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z" fill="#A8BFC9"/>
                            </g>
                        </svg>
                    :
                    null
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