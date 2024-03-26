import React, { useState } from 'react';
import '../App.css';
import TempBoard from "../components/TempBoard";

function Temperature(){
    const [inputPassword, setInputPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // This should be replaced with the SHA-256 hash of your actual password.
    const hashedPassword = 'f3766fd4c9ae95209cac2de9718418c7bea8ca31bde4ab9982d04888e79eb17a';

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
            <form onSubmit={handleSubmit}>
                <input className='password-field'
                    type="password"
                    value={inputPassword}
                    onChange={(e) => setInputPassword(e.target.value)}
                />
                <button type="submit">Enter</button>
            </form>
            {isAuthenticated && (
                <div>
                    <h1>Temperature in Casina</h1>
                    <TempBoard/>
                </div>
            )}
        </div>
    );
}

export default Temperature;