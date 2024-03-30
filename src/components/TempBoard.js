import React, { useState, useEffect } from 'react';
import {
    batteryPercentage,
    getFirebaseSetUp,
    isDbSet,
    readDb,
    roundStringToTwoDecimals,
    unixToPolishTime
} from "../logic/Functions";
import {
    DB_TEMP_PATH,
    DB_TIME_PATH,
    DB_VOLTAGE_PATH,
} from "../logic/Names";

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
            <h2>Last update: {unixToPolishTime(datetime)}</h2>
            <h2>🌡️: {roundStringToTwoDecimals(temperature)} ℃ </h2>
            <h2>🔋: {roundStringToTwoDecimals(voltage)} Volts</h2>
            <h2>Battery level: {batteryPercentage(voltage)}</h2>
        </div>
    );
}

export default TempBoard;
