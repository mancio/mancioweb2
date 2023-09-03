import BetterButton from "../components/BetterButton";
import {BRISCOLA, SCOPA} from "../logic/Names";
import {useState} from "react";
import '../App.css';

function ScoreCounter(){

    const [game, setGame] = useState(null);

    function selectGame(game){
        setGame(game);
    }

    return(
        <div className='dashboard'>
            <BetterButton text={BRISCOLA} click={() => selectGame(BRISCOLA)}/>
            <BetterButton text={SCOPA} click={() => selectGame(SCOPA)}/>
            {(game) && (game === BRISCOLA) && (
                    <div>
                        <p>{BRISCOLA}</p>
                    </div>
                )}
            {(game) && (game === SCOPA) && (
                <div>
                    <p>{SCOPA}</p>
                </div>
            )}
        </div>
    )
}

export default ScoreCounter;