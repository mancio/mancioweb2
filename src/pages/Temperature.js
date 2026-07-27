import React from 'react';
import '../App.css';
import TempBoard from "../components/TempBoard";
import BetterButton from "../components/BetterButton";
import {MENU} from "../logic/Names";
import {useNavigate} from "react-router-dom";

function Temperature(){

    const navigate = useNavigate();

    return (
        <div className='dashboard'>
            <div>
                <h1>Temperature</h1>
                <TempBoard/>
            </div>
            <BetterButton
                text="Back"
                click={()=>navigate(MENU)}
            />
        </div>
    );
}

export default Temperature;