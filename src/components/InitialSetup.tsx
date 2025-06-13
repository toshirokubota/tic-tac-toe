import { staticAsset } from "../libs";

export default function InitialSetup({startGame}: {startGame: (cpu: boolean)=>void}) {
    return (
        <div className="flex flex-col items-center">
            <div className="flex justify-center">
                <img src={staticAsset('/images/icon-x.svg')} alt='x-icon' />
                <img src={staticAsset('/images/icon-o.svg')} alt='o-icon' />
             </div>
             <form>
                <div>
                    <fieldset>
                    <legend>PICK PLAYER 1'S MARK</legend>
                    </fieldset>
                    <label htmlFor="player-mark-x">
                        <input type='radio' id='player-mark-x' name='player-mark' value='x'/>
                        <img src={staticAsset('/images/icon-x.svg')} alt='x-icon' />
                    </label>
                    <label htmlFor="player-mark-o">
                        <input type='radio' id='player-mark-o' name='player-mark' value='o'/>
                        <img src={staticAsset('/images/icon-o.svg')} alt='o-icon' />
                    </label>
                    <p>REMEMBER: X GOES FIRST</p>
                </div>
                <button onClick={()=>startGame(true)}>NEW GAME (VS. CPU)</button>
                <button onClick={()=>startGame(false)}>NEW GAME (VS. PLAYER)</button>
             </form>
        </div>
    )
}