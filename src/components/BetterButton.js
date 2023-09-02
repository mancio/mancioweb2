import '../App.css';

function BetterButton({text, click}){
    return (
        <div>
            <button className='betterBt' type="button" onClick={click}>{text}</button>
        </div>
    )
}

export default BetterButton;