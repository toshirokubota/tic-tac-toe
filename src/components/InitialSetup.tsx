import { useState } from "react";
import { staticAsset } from "../libs";
import { imageNames, type PlayerType } from "../types";

export default function InitialSetup({setPlayers}: 
    {
        setPlayers: React.Dispatch<React.SetStateAction<PlayerType[]>>
    }) {
        const [icon, setIcon] = useState<string>('x');
        const handleChange = (event: React.ChangeEvent) => {
            const value = (event.target as HTMLInputElement).value;
            setIcon(value);
            console.log('handleChange: ', icon);
        }
        const initializeAndStart = (cpu: boolean) => {
            if(icon === 'x') {
                setPlayers([
                    {image: imageNames[0], cpu: false, you: true, wins: 0, ties: 0 },
                    {image: imageNames[1], cpu: cpu, you: false, wins: 0, ties: 0 },
                    ])
            } else {
                setPlayers([
                    {image: imageNames[0], cpu: cpu, you: false, wins: 0, ties: 0 },
                    {image: imageNames[1], cpu: false, you: true, wins: 0, ties: 0 },
                    ])
            }
       }

    return (
        <div className="flex flex-col items-center w-full my-16">
            <div className="flex justify-center">
                <img src={staticAsset('/images/icon-x.svg')} alt='x-icon' className="w-8"/>
                <img src={staticAsset('/images/icon-o.svg')} alt='o-icon' className="w-8"/>
             </div>
             <form className='start-form'>
                <div className='flex flex-col justify-center my-8'>
                    <fieldset className="my-4">
                        <legend>PICK PLAYER 1'S MARK</legend>
                    </fieldset>
                    <div className="radio-group my-4">
                        <label htmlFor="player-mark-x">
                            <input type='radio' id='player-mark-x' name='player-mark' value='x'
                                onChange={handleChange}/>
                            <svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z"/>
                            </svg>
                        </label>
                        <label htmlFor="player-mark-o">
                            <input type='radio' id='player-mark-o' name='player-mark' value='o'
                                onChange={handleChange}/>
                            <svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
                            <path d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z"/>
                            </svg>
                        </label>                        
                    </div>
                    <p className="my-4">REMEMBER: X GOES FIRST</p>
                </div>
                <button onClick={(e)=>{e.preventDefault(); initializeAndStart(true)}}
                    className='start-vs-cpu my-2'>
                        NEW GAME (VS. CPU)</button>
                <button onClick={(e)=>{e.preventDefault(); initializeAndStart(false)}}
                    className='start-vs-human my-2'>
                        NEW GAME (VS. PLAYER)</button>
             </form>
        </div>
    )
}