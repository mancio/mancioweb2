import {useEffect, useState} from "react";
import arcade from '../pictures/buttons/arcade.svg'
import arcade2 from '../pictures/buttons/arcade_hover.svg'
import arcade3 from '../pictures/buttons/arcade_hover2.svg'
import '../App.css';
import {isTouchDevice} from "../logic/Functions";

function ArcadeButton({text, click}){
    const svgs = [arcade, arcade2, arcade3];

    const btnStyle = {
        width: '300px',
        height: '40px',
        border: 'none',
        padding: '0', // Resets any default padding
        margin: '10px', // Resets any default margin
        outline: 'none', // Removes the focus outline
        cursor: 'pointer',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundColor: 'transparent',
        overflow: 'hidden', // Ensures no overflow outside the button's boundary
        color: 'white',
        fontSize: 'x-large',
    };

    const [currentSvg, setCurrentSvg] = useState(0);
    const [isHovering, setIsHovering] = useState(false);

    let interval;

    useEffect(() => {
        if (isHovering || isTouchDevice()) {
            interval = setInterval(() => {
                setCurrentSvg(prevSvg => (prevSvg + 1) % svgs.length);
            }, 500);
        } else {
            setCurrentSvg(0);
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isHovering]);

    return (
        <div>
            <button
                className="every-button"
                style={{ ...btnStyle, backgroundImage: `url(${svgs[currentSvg]})` }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                onClick={click}
                aria-label="Arcade Button"
            >{text}</button>
        </div>
    );
}

export default ArcadeButton;