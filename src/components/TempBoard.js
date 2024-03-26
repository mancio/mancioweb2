import React, { useState, useEffect } from 'react';
import {getFirebaseSetUp, isDbSet, readDb, unixToPolishTime} from "../logic/Functions";
import {DB_TEMP_PATH, DB_TIME_PATH, DB_VOLTAGE_PATH} from "../logic/Names";

function TempBoard() {

    if (!isDbSet()) getFirebaseSetUp();

    const [datetime, setDatetime] = useState('');
    const [temperature, setTemperature] = useState('');
    const [voltage, setVoltage] = useState('');


    useEffect(() => {
        readDb(DB_TIME_PATH, (data) => {
            setDatetime(data);
        });
        readDb(DB_TEMP_PATH, (data) => {
            setTemperature(data);
        });
        readDb(DB_VOLTAGE_PATH, (data) => {
            setVoltage(data);
        });
    }, []);

    return (
        <div>
            <p>Last update: {unixToPolishTime(datetime)}</p>
            <p>🌡️: {temperature} ℃ </p>
            <p>🔋: {voltage} Volts</p>
        </div>
    );
}

export default TempBoard;
