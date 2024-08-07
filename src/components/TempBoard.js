import React, { useState, useEffect } from 'react';
import Camel from '../pictures/icons/camel.svg';
import Temperato from '../pictures/icons/temperato.svg';
import SantaCold from '../pictures/icons/santa-cold.svg';
import placeHolder from '../pictures/icons/placeHolder.svg';

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
    const [icon, setIcon] = useState('');


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

    useEffect(() => {
        if(temperature === ''){
            setIcon(placeHolder);
        }
        else if (temperature > 29) {
            setIcon(Camel);
        } else if (temperature >= 13 && temperature <= 29) {
            setIcon(Temperato);
        } else {
            setIcon(SantaCold);
        }
    },[temperature])


    return (
        <div>
            <h2>Last update: {unixToPolishTime(datetime)}</h2>
            <h2>🌡️: {roundStringToTwoDecimals(temperature)} ℃</h2>
            <img src={icon} alt="temp-emoji" style={{width: '100px', height: 'auto'}}/>
            <h3>Battery level: {batteryPercentage(voltage)}</h3>
            <h3>🔋: {roundStringToTwoDecimals(voltage)} Volts</h3>
        </div>
    );

}

export default TempBoard;
