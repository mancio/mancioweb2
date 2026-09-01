import '../App.css';

interface BetterButtonProps {
    text: string;
    click: () => void;
}

function BetterButton({text, click}: BetterButtonProps){

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