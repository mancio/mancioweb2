import React, { useState } from 'react';
import '../App.css';
import TempBoard from "../components/TempBoard";
import BetterButton from "../components/BetterButton";
import {MENU} from "../logic/Names";
import {useNavigate} from "react-router-dom";

function Temperature(){

    const navigate = useNavigate();


    const [inputPassword, setInputPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // This should be replaced with the SHA-256 hash of your actual password.
    const hashedPassword = process.env.REACT_APP_TEMP_PASSWORD;

    const checkPassword = async (enteredPassword) => {
        const encoder = new TextEncoder();
        const data = encoder.encode(enteredPassword);
        const hash = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hash));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return hashHex === hashedPassword;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = await checkPassword(inputPassword);
        setIsAuthenticated(isValid);
    };

    return (
        <div className='dashboard'>
            {!isAuthenticated && (
                <form>
                <BetterButton text="Enter" click={handleSubmit}/>
                <input className='password-field'
                       type="password"
                       value={inputPassword}
                       onChange={(e) => setInputPassword(e.target.value)}
                />
            </form>
            )}
            {isAuthenticated && (
                <div>
                    <h1>Temperature in Casina</h1>
                    <TempBoard/>
                </div>
            )}
            <BetterButton
                text="Back"
                click={()=>navigate(MENU)}
            />
        </div>
    );
}

export default Temperature;