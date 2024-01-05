import '../App.css';
import {useEffect, useState} from "react";
import BetterButton from "./BetterButton";
import {PLAYER_NAMES, PLAYERS_SCORE, STEP1, STEP2, STEP3} from "../logic/Names";
import {getSharedObject, removeSharedObject, setSharedObject} from "../logic/Functions";

function ScorePanel(){

    const [step, setStep] = useState(STEP1);
    const [playerNumber, setPlayerNumber] = useState(0);
    const [playerNames, setPlayerNames] = useState([]);
    const [scores, setScores] = useState([]);

    useEffect(() => {
        const storedScores = getSharedObject(PLAYERS_SCORE);
        const storedNames = getSharedObject(PLAYER_NAMES);

        if (storedScores && storedNames) {
            setScores(storedScores);
            setPlayerNames(storedNames);
            setStep(STEP3);
        }
    }, []); // Empty dependency array means this runs once after the component mounts

    useEffect(() => {
        if (scores.length > 0) {
            setSharedObject(PLAYERS_SCORE, scores);
        }
    }, [scores]); // This useEffect runs every time 'scores' changes

    function updateScore(index, newValue) {
        // Create a new array with the updated value
        const updatedScores = scores.map((score, i) => {
            if (i === index) {
                return newValue; // Update the specific score
            }
            return score; // Keep all other scores the same
        });

        setScores(updatedScores); // Set the new array as the state
    }

    function areAllNamesFilled() {
        // Returns true if there's at least one empty name
        const isAnyNameEmpty = playerNames.some(name => name.trim() === '');
        return !isAnyNameEmpty; // Invert the result because we want false if any name is empty
    }

    function reducePlayers(){
        if (playerNumber !== 0) setPlayerNumber(playerNumber-1);
    }

    function increasePlayers(){
        setPlayerNumber(playerNumber+1);
    }

    function reduceScore(index){
        if (scores[index] !== 0) {
            updateScore(index, scores[index]-1);
        }
    }

    function increaseScore(index){
        updateScore(index, scores[index]+1);
    }

    function resetScore(){
        removeSharedObject(PLAYER_NAMES);
        removeSharedObject(PLAYERS_SCORE);
        setStep(STEP1);
    }

    function changePanel(moveTo){
        if (moveTo === STEP2){
            if (playerNumber === 0) alert("at least one player");
            else {
                setPlayerNames(Array(playerNumber).fill(''));
                setScores(Array(playerNumber).fill(0));
                setStep(STEP2);
            }
        }
        if (moveTo === STEP3){
            if (!areAllNamesFilled()) alert("please write all the players names");
            else {
                setSharedObject(PLAYER_NAMES, playerNames);
                setStep(STEP3);
            }
        }
    }

    const handleNameChange = (event, index) => {
        const newPlayerNames = [...playerNames];
        newPlayerNames[index] = event.target.value;
        setPlayerNames(newPlayerNames);
    };

    function generateTextAreas() {
        let textAreas = [];

        for (let i = 0; i < playerNumber; i++) {
            textAreas.push(
                <div>
                    <p>Write player {i+1} name: </p>
                    <textarea
                        key={i}
                        placeholder={`Player ${i + 1} - Type name here`}
                        onChange={(e) => handleNameChange(e, i)}
                    />
                </div>
            );
        }

        return textAreas;
    }

    const centerFlexStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    };

    return (
        <div>
            {(step === STEP1) && (
                <div>
                    <h1 style={centerFlexStyle}>
                    Players number:
                        <BetterButton text="<" click={() => reducePlayers()}/>
                        {playerNumber}
                        <BetterButton text=">" click={() => increasePlayers()}/>
                        <BetterButton text="Set player number" click={() => changePanel(STEP2)}/>
                    </h1>
                </div>
            )}
            {step === STEP2 && (
                <div>
                    {generateTextAreas()}
                    <BetterButton text="Ready" click={() => changePanel(STEP3)}/>
                </div>
            )}
            {step === STEP3 && (
                <div>
                    <h2>Players score:</h2>
                    {playerNames.map((name, index) => (
                        <h2 key={index} style={centerFlexStyle} >
                            {name}
                            <BetterButton text="<" click={() => reduceScore(index)}/>
                            {scores[index]}
                            <BetterButton text=">" click={() => increaseScore(index)}/>
                        </h2>
                    ))}
                </div>
            )}
            <BetterButton text="Reset Score Panel" click={() => resetScore()}/>
        </div>
    )
}

export default ScorePanel;