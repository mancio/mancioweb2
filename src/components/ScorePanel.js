import '../App.css';
import {useState} from "react";
import {MENU} from "../logic/Names";
import BetterButton from "./BetterButton";

function ScorePanel(){

    const [ready, setReady] = useState(false);
    const [players, setPlayers] = useState(0);
    const [names, setNames] = useState([]);

    function reduce(){
        if (players !== 0) setPlayers(players-1);
    }

    function increase(){
        setPlayers(players+1);
    }

    function generateTextAreas() {
        let textAreas = [];

        for (let i = 0; i < players; i++) {
            textAreas.push(
                <textarea
                    key={i}
                    // value={''}
                    // onChange={(e) => handleInputChange(e, i)}
                    className="text-box"
                    placeholder={`Player ${i + 1} - Type here`}
                />
            );
        }

        return textAreas;
    }

    return (
        <div>
            {(!ready) && (
                <div>
                    <h1 style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        Players number:
                        <BetterButton text="<" click={() => reduce()}/>
                        {players}
                        <BetterButton text=">" click={() => increase()}/>
                        <BetterButton text="Ready" click={() => setReady(true)}/>
                    </h1>
                </div>
            )}
            {ready && (
                <div>
                    {generateTextAreas()}
                </div>
            )}
        </div>
    )
}

export default ScorePanel;