import '../App.css'
import {MENU} from "../logic/Names";
import BetterButton from "../components/BetterButton";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {getRealRandomInt} from "../logic/Functions";

import one from '../pictures/dice/dice-1.svg'
import two from '../pictures/dice/dice-2.svg'
import three from '../pictures/dice/dice-3.svg'
import four from '../pictures/dice/dice-4.svg'
import five from '../pictures/dice/dice-5.svg'
import six from '../pictures/dice/dice-6.svg'

function Dice(){

    const navigate = useNavigate();

    const faces = [one, two, three, four, five, six];

    const [face, setFace] = useState(one);

    function getNumber() {
        let count = 0;  // Start a counter

        function changeFace() {
            const number = getRealRandomInt() - 1;
            // const number = getRandomNumber() - 1;
            setFace(faces[number]);

            count++;
            if (count < 10) {  // If we haven't changed the face 10 times yet
                setTimeout(changeFace, 300);  // Wait for 1 second and call changeFace again
            }
        }

        changeFace();  // Call the function for the first time
    }

    return(
        <div>
            <div className='recipe-box'>
                <h3>DiCe - Random number generator</h3>
                <div className='border-frame'>
                    <BetterButton text="6 Face - Throw it! " click={()=>getNumber()}/>
                    <img
                        // className={index === lastCardIndex ? 'card-selected' : 'card'}
                        src={face}
                        alt="dice"
                        // onClick={() => addPoint(el, type, index)}
                    />
                </div>
            </div>
            <BetterButton text="Back" click={()=>navigate(MENU)}/>
        </div>
    )
}

export default Dice;