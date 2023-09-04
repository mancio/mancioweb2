import BetterButton from "../components/BetterButton";
import {BRISCOLA, SCOPA} from "../logic/Names";
import {useState} from "react";
import '../App.css';

import Asso from '../pictures/asso_di_coppe.svg';
import Tre from '../pictures/tre_spade.svg';
import Re from '../pictures/re_denari.jpg';
import Cavallo from '../pictures/cavallo_denari.png';
import Fante from '../pictures/fante_bastoni.jpg';
import Sette from '../pictures/sette_denari.svg';
import Sei from '../pictures/sei_coppe.jpg';
import Cinque from '../pictures/cinque_bastoni.jpg';
import Quattro from '../pictures/quattro_bastoni.jpg';
import Due from '../pictures/due_denari.jpg';

function ScoreCounter(){

    const [game, setGame] = useState(null);
    const [score, setScore] = useState(0);

    const cardList = [
        {
            card: Asso,
            briscola: 11,
            scopa: 16
        },
        {
            card: Tre,
            briscola: 10,
            scopa: 13
        },
        {
            card: Re,
            briscola: 4,
            scopa: 10
        },
        {
            card: Cavallo,
            briscola: 3,
            scopa: 10
        },
        {
            card: Fante,
            briscola: 2,
            scopa: 10
        },
        {
            card: Sette,
            briscola: 0,
            scopa: 21
        },
        {
            card: Sei,
            briscola: 0,
            scopa: 18
        },
        {
            card: Cinque,
            briscola: 0,
            scopa: 15
        },
        {
            card: Quattro,
            briscola: 0,
            scopa: 14
        },
        {
            card: Due,
            briscola: 0,
            scopa: 12
        }
    ]

    function selectGame(game){
        setGame(game);
    }



    function showCards(type) {
        return (
            <div className="card-table">
                {cardList.map((el, index) => (
                    <div key={index} >
                        {el[type] !== 0 && (
                            <img
                                className='card'
                                src={image}
                                alt={index.toString()}
                            />
                        )}
                    </div>
                ))}
            </div>
        )
    }

    return(
        <div className='dashboard'>
            <BetterButton text={BRISCOLA} click={() => selectGame(BRISCOLA)}/>
            <BetterButton text={SCOPA + ' - Primiera'} click={() => selectGame(SCOPA)}/>
            {(game) && (game === BRISCOLA) && (
                    <div>
                        {showCards(BRISCOLA.toLowerCase())}
                    </div>
                )}
            {(game) && (game === SCOPA) && (
                <div>
                    <p>{showCards(SCOPA.toLowerCase())}</p>
                </div>
            )}
        </div>
    )
}

export default ScoreCounter;