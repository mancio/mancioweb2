import {COOKING} from "../logic/Names";
import cooking from '../pictures/buttons/cooking-button.svg';
import {Fragment} from 'react';


function StaticButton({style, color, text, click}){

    const width = window.innerWidth < 600 ? window.innerWidth /1.2 : 500;
    const fontSize = window.innerWidth < 600 ? 'large': 'x-large';

    function returnHtmlText(text, charLimit) {
        const chunks = [];
        let start = 0;

        while (start < text.length) {
            let end = start + charLimit;
            if (end < text.length && text[end] !== ' ' && text[end - 1] !== ' ') {
                let nextSpace = text.indexOf(' ', end);
                end = nextSpace !== -1 ? nextSpace : text.length;
            }

            chunks.push(text.substring(start, end).trim());
            start = end + 1;
        }

        return chunks.map((chunk, index) => (
            <Fragment key={index}>
                {chunk}
                {index < chunks.length - 1 && <br />}
            </Fragment>
        ));
    }


    function getStyle(style){
        if(style === COOKING) return cooking;
    }

    const btnStyle = {
        width: `${width}px`,
        height: `${width/8}px`,
        border: 'none',
        margin: '10px',
        outline: 'none',
        cursor: 'pointer',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundColor: 'transparent',
        overflow: 'hidden',
        color: color || 'white',
        fontSize: fontSize,
        textAlign: 'center', // Optionally center the text
    };

    return(
        <div>
            <button
                style={{ ...btnStyle, backgroundImage: `url(${getStyle(style)})` }}
                className='every-button'
                onClick={click}>
                {returnHtmlText(text, 20)}
            </button>
        </div>
    )
}

export default StaticButton;