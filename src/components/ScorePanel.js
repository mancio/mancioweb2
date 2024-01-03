import '../App.css';
import {useState} from "react";

function ScorePanel(){

    const [ready, setReady] = useState(false);
    const [players, setPlayers] = useState(0);

    return(
        <div>
            {(!ready) && (
                <div>
                    <h1>players number </h1>
                </div>
            )}
            <div className='dashboard'>
                <p>prova</p>
            </div>
        </div>
    )
}

export default ScorePanel;