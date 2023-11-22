import '../App.css';

function BetterButton({text, click}){

    return (
        <div>
            <button
                className='betterBt'
                onClick={click}>{text}
            </button>
        </div>
    )
}

export default BetterButton;