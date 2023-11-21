import {COOKING} from "../logic/Names";
import cooking from '../pictures/buttons/cooking-button.svg';

function StaticButton({style, padding, color, text, click}){

    const defMargin = '10px';

    function getStyle(style){
        if(style === COOKING) return cooking;
    }

    const btnStyle = {
        // Width: '400px',
        // maxWidth: '300px',
        border: 'none',
        // margin: defMargin,
        // paddingTop: '10px', // Adjust as needed
        // paddingBottom: '10px', // Adjust as needed
        // paddingLeft: padding || defMargin,
        // paddingRight: padding || defMargin,
        paddingLeft: '50px',
        paddingRight: '50px',
        margin: '10px',
        outline: 'none',
        cursor: 'pointer',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundColor: 'transparent',
        overflow: 'hidden',
        color: color || 'white',
        fontSize: 'x-large',
        // whiteSpace: 'normal', // Corrected spelling and uncommented
        wordBreak: 'break-all',
        textAlign: 'center', // Optionally center the text
    };

    return(
        <div>
            <button
                style={{ ...btnStyle, backgroundImage: `url(${getStyle(style)})` }}
                className='every-button'
                onClick={click}>
                {text}
            </button>
        </div>
    )
}

export default StaticButton;