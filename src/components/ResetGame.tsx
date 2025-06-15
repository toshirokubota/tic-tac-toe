
export default function ResetGame({cancel, restart}:
    {
        cancel: ()=>void, restart: ()=>void
    }
) {
    return (
        <div className="modal-bg">
            <div className='modal-fg'>
                <h1>RESTART GAME?</h1>
                <div className='flex gap-4'>
                    <button className="silver-button" onClick={cancel}>NO, CANCEL</button>
                    <button className="orange-button" onClick={restart}>YES, RESTART</button>
                </div>
            </div>
        </div>
    )
}