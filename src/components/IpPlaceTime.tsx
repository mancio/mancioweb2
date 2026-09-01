import {useEffect, useState} from "react";
import {addOneSecond, getTimeDateFormatted} from "../logic/Functions";
import {MIDNIGHT_AS_24H_STRING, SEARCHING_MESSAGE} from "../logic/Names";
import '../App.css';

function IpPlaceTime(){

    const [time, setTime] = useState(SEARCHING_MESSAGE);
    const [date, setDate] = useState(SEARCHING_MESSAGE);

    useEffect(() => {
        // Function to fetch info and update state
        const fetchInfo = () => {
            getTimeDateFormatted()
                .then((info) => {
                    if (info) { // Make sure info is not null
                        setTime(info.time);
                        setDate(info.date);
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        };

        // Call fetchInfo immediately to not wait for the first interval to elapse
        fetchInfo();

    }, []);

    useEffect(() => {
        if (time !== SEARCHING_MESSAGE){
            const timer = setTimeout(()=>{
                setTime(addOneSecond(time));
            },1000);
            return () => clearInterval(timer);
        }
    },[time])

    useEffect(() => {
        if (time === MIDNIGHT_AS_24H_STRING) window.location.reload();
    },[time])

    return(
        <div className="time-now">
            <span>Time now: {time}</span>
            <span className="time-now-sep">·</span>
            <span>Day: {date}</span>
        </div>
    )

}
export default IpPlaceTime;