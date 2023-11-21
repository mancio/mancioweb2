import {COOKING} from "../logic/Names";
import cooking from '../pictures/buttons/cooking-button.svg';
import React from 'react';


function StaticButton({style, color, text, click}){

    const width = window.innerWidth < 400 ? window.innerWidth /1.2 : 500;

    function addBrEvery20Chars(text) {
        const chunkSize = 20;
        let chunks = [];
        for (let i = 0; i < text.length; i += chunkSize) {
            const chunk = text.slice(i, i + chunkSize);
            chunks.push(chunk);
        }

        const jsxArray = chunks.map((chunk, index) => (
            <React.Fragment key={index}>
                {chunk}
                {index < chunks.length - 1 && <br />}
            </React.Fragment>
        ));

        return jsxArray;
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
        fontSize: 'large',
        textAlign: 'center', // Optionally center the text
    };

    return(
        <div>
            <button
                style={{ ...btnStyle, backgroundImage: `url(${getStyle(style)})` }}
                className='every-button'
                onClick={click}>
                {addBrEvery20Chars(text)}
            </button>
        </div>
    )
}

export default StaticButton;