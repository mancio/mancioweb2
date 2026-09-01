import {MENU} from "../logic/Names";
import BetterButton from "../components/BetterButton";
import {useNavigate} from "react-router-dom";
import '../App.css';
import {askToStop, farts, playArmageddonFart, playRandomFart, playSingleFart} from "../logic/Functions";
import Poop from '../pictures/buttons/fart.svg';

function Fart(){

    const navigate = useNavigate();

    return(
        <div>
            <div className='recipe-box'>
                <h2>Fart for fun</h2>
                <h3>💩 Click a button and listen a fart 💩</h3>
                <img src={Poop} alt="Poop" width="100" height="100"/>
                <div className="button-grid">
                    <BetterButton click={() => playRandomFart()} text="Random Fart"/>
                    {farts.map(fart => (
                        <BetterButton
                            click={() => playSingleFart(fart.name)}
                            text={fart.name}
                            key={fart.name}
                        />
                    ))}

                    <BetterButton click={() => playArmageddonFart()} text="Armageddon"/>
                    <BetterButton click={() => askToStop()} text="Stop farting"/>
                </div>

            </div>
            <BetterButton text="Back" click={() => navigate(MENU)}/>
        </div>
    )
}

export default Fart;