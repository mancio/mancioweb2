import BetterButton from "../components/BetterButton";
import {BRISCOLA, MENU, SCOPA} from "../logic/Names";
import {useState} from "react";
import '../App.css';

import Asso from '../pictures/cards/asso_di_coppe.svg';
import Tre from '../pictures/cards/tre_spade.svg';
import Re from '../pictures/cards/re_denari.jpg';
import Cavallo from '../pictures/cards/cavallo_denari.png';
import Fante from '../pictures/cards/fante_bastoni.jpg';
import Sette from '../pictures/cards/sette_denari.svg';
import Sei from '../pictures/cards/sei_coppe.jpg';
import Cinque from '../pictures/cards/cinque_bastoni.jpg';
import Quattro from '../pictures/cards/quattro_bastoni.jpg';
import Due from '../pictures/cards/due_denari.jpg';
import {useNavigate} from "react-router-dom";
import ScorePanel from "../components/ScorePanel";
import {isPhoneInVerticalOrientation, useRefreshOnDisplayChange} from "../logic/Functions";

function ScoreCounter(){

    useRefreshOnDisplayChange();


    const navigate = useNavigate();

    const [game, setGame] = useState(null);
    const [score, setScore] = useState(0);
    const [selCards, setSelCards] = useState([]);
    const [lastCardIndex, setLastCardIndex] = useState(null);

    const cardList = [
        {
            card: Asso,
            name: 'Asso',
            briscola: 11,
            scopa: 16
        },
        {
            card: Tre,
            name: 'Tre',
            briscola: 10,
            scopa: 13
        },
        {
            card: Re,
            name: 'Re',
            briscola: 4,
            scopa: 10
        },
        {
            card: Cavallo,
            name: 'Cavallo',
            briscola: 3,
            scopa: 10
        },
        {
            card: Fante,
            name: 'Fante',
            briscola: 2,
            scopa: 10
        },
        {
            card: Sette,
            name: 'Sette',
            briscola: 0,
            scopa: 21
        },
        {
            card: Sei,
            name: 'Sei',
            briscola: 0,
            scopa: 18
        },
        {
            card: Cinque,
            name: 'Cinque',
            briscola: 0,
            scopa: 15
        },
        {
            card: Quattro,
            name: 'Quattro',
            briscola: 0,
            scopa: 14
        },
        {
            card: Due,
            name: 'Due',
            briscola: 0,
            scopa: 12
        }
    ]

    function reset(){
        setSelCards([]);
        setScore(0);
        setLastCardIndex(null);
    }

    function selectGame(game){
        reset();
        setGame(game);
    }


    function addPoint(el, type, index) {
        const cardName = el.name;
        setSelCards([...selCards, cardName]);
        setScore(score + el[type]);
        setLastCardIndex(index);
    }

    function showCards(type) {
        return (
            <div className="card-table">
                {cardList.map((el, index) => (
                    <div key={index} >
                        {el[type] !== 0 && (
                            <img
                                className={index === lastCardIndex ? 'card-selected' : 'card'}
                                src={el.card}
                                alt={index.toString()}
                                onClick={() => addPoint(el, type, index)}
                            />
                        )}
                    </div>
                ))}
            </div>
        )
    }

    function checkScore(score){
        if (score === 60) return (<div><h3>Draw! ⚖️</h3></div>);
        if (score < 60) return (<div><h3>You lose! 👎</h3></div>);
        if (score > 60) return (<div><h3>You win! 🏆</h3></div>);
    }

    function divisor() {
        return (
            <h1 className={isPhoneInVerticalOrientation() ? 'h2Equivalent' : ''}>
                •☽────✧˖°˖☆˖°˖✧────☾•
            </h1>
        )
    }

    return (
        <div className='dashboard'>
            <ScorePanel/>
            {divisor()}
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
            {(game) && (score !== 0) && (
                <div>
                    <h3>Cards selected: {selCards.join(" ")} = {score}</h3>
                    {(game === BRISCOLA) && checkScore(score)}
                </div>
            )}
            {(game) && (<BetterButton text="Reset Cards Score" click={() => reset()}/>)}
            {divisor()}
            <BetterButton text="Back" click={() => navigate(MENU)}/>
        </div>
    )
}

export default ScoreCounter;