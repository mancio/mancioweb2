import React, { useState, useEffect } from 'react';
import Camel from '../pictures/icons/camel.svg';
import Temperato from '../pictures/icons/temperato.svg';
import SantaCold from '../pictures/icons/santa-cold.svg';
import placeHolder from '../pictures/icons/placeHolder.svg';

import {
    batteryPercentage,
    getFirebaseSetUp, getTimeDifference, getUnixTime,
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

    const [datetime, setDatetime] = useState('');  // Thermometer update time (Unix)
    const [temperature, setTemperature] = useState('');
    const [voltage, setVoltage] = useState('');
    const [icon, setIcon] = useState('');
    const [timeDifference, setTimeDifference] = useState('');  // State for time difference

    // Fetch thermometer data from Firebase
    useEffect(() => {
        readDb<string>(DB_TIME_PATH, (data) => {
            setDatetime(data);
        });
        readDb<string>(DB_TEMP_PATH, (data) => {
            setTemperature(data);
        });
        readDb<string>(DB_VOLTAGE_PATH, (data) => {
            setVoltage(data);
        });
    }, []);

    // Determine which icon to show based on temperature
    useEffect(() => {
        const celsius = Number(temperature);
        if (temperature === '') {
            setIcon(placeHolder);
        } else if (celsius > 29) {
            setIcon(Camel);
        } else if (celsius >= 13 && celsius <= 29) {
            setIcon(Temperato);
        } else {
            setIcon(SantaCold);
        }
    }, [temperature]);

    // Fetch current time from World Time API and calculate time difference
    useEffect(() => {
        if (datetime) {  // Only run if datetime is available
            const fetchTimeDifference = async () => {
                const currentUnixTime = getUnixTime();
                const difference = getTimeDifference(Number(datetime), currentUnixTime);  // Calculate time difference
                setTimeDifference(difference);  // Update state with time difference
            };
            fetchTimeDifference();
        }
    }, [datetime]);  // Re-run if datetime changes

    return (
        <div>
            <h2>Last update: {unixToPolishTime(Number(datetime))} ({timeDifference} ago) Polish time</h2>
            <h2>🌡️: {roundStringToTwoDecimals(temperature)} ℃</h2>
            <img src={icon} alt="temp-emoji" style={{ width: '100px', height: 'auto' }} />
            <h3>Battery level: {batteryPercentage(voltage)}</h3>
            <h3>🔋: {roundStringToTwoDecimals(voltage)} Volts</h3>
        </div>
    );
}

export default TempBoard;

