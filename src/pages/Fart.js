import {MENU} from "../logic/Names";
import BetterButton from "../components/BetterButton";
import {useNavigate} from "react-router-dom";
import '../App.css';
import {askToStop, getNamesOfFarts, playArmageddonFart, playRandomFart, playSingleFart} from "../logic/Functions";

function Fart(){

    const navigate = useNavigate();

    return(
        <div>
            <div className='recipe-box'>
                <h2>Fart for fun</h2>
                <h3>Click a button and listen a fart 💩</h3>
                <div className="button-grid">
                    <BetterButton click={() => playRandomFart()} text="Random Fart"/>
                    {getNamesOfFarts().map(name => {
                        return (
                            <BetterButton click={() => playSingleFart(name)} text={name} key={name}/>
                        )
                    })}
                    <BetterButton click={() => playArmageddonFart()} text="Armageddon"/>
                    <BetterButton click={() => askToStop()} text="Stop farting"/>
                </div>

            </div>
            <BetterButton text="Back" click={() => navigate(MENU)}/>
        </div>
    )
}

export default Fart;