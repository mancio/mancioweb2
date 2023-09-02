import {useEffect, useState} from "react";
import {addOneSecond, getInfoFromIp} from "../logic/Functions";
import {SEARCHING_MESSAGE} from "../logic/Names";
import '../App.css';

function IpPlaceTime(){

    const [city, setCity] = useState(SEARCHING_MESSAGE);
    const [region, setRegion] = useState(SEARCHING_MESSAGE);
    const [country, setCountry] = useState(SEARCHING_MESSAGE);
    const [time, setTime] = useState(SEARCHING_MESSAGE);
    const [date, setDate] = useState(SEARCHING_MESSAGE);

    useEffect(() => {
        getInfoFromIp()
            .then((info) => {
                setCity(info.city);
                setRegion(info.state);
                setCountry(info.country);
                setTime(info.time)
                setDate(info.date);
            })
            .catch((error) => {
            console.error(error);
        });
    },[])

    useEffect(() => {
        if (time !== SEARCHING_MESSAGE){
            const timer = setTimeout(()=>{
                setTime(addOneSecond(time));
            },1000);
            return () => clearInterval(timer);
        }
    },[time])

    return(
        <div className='time-now'>
            <p>{city}, {region}, {country}</p>
            <p>Real Time: {time}</p>
            <p>Day: {date}</p>
        </div>
    )

}
export default IpPlaceTime;