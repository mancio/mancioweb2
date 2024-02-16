import {useEffect, useState} from "react";
import {addOneSecond, formatDate, getInfoFromIp} from "../logic/Functions";
import {MIDNIGHT_AS_24H_STRING, SEARCHING_MESSAGE} from "../logic/Names";
import '../App.css';

function IpPlaceTime(){

    const [time, setTime] = useState(SEARCHING_MESSAGE);
    const [date, setDate] = useState(SEARCHING_MESSAGE);

    const [bottomPosition, setBottomPosition] = useState('0px');

    const timeNowStyle = {
        display: "inline-block",
        backgroundColor: "black",
        color: "white",
        textAlign: "center",
        fontSize: "large",
        borderRadius: "30px",
        padding: "11px",
        marginTop: bottomPosition,
    };

    const updatePosition = () => {
        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;
        const newBottomPosition = `${viewportWidth / viewportHeight}px`;
        setBottomPosition(newBottomPosition);
    };

    useEffect(() => {
        window.addEventListener('resize', updatePosition);

        // Set initial position
        updatePosition();

        // Cleanup listener when component unmounts
        return () => window.removeEventListener('resize', updatePosition);
    }, []);

    useEffect(() => {
        // Function to fetch info and update state
        const fetchInfo = () => {
            getInfoFromIp()
                .then((info) => {
                    if (info) { // Make sure info is not null
                        setTime(info.time);
                        setDate(formatDate(info.date));
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        };

        // Call fetchInfo immediately to not wait for the first interval to elapse
        fetchInfo();

        // Set up the interval to repeat fetchInfo every 30 sec
        const intervalId = setInterval(fetchInfo, 30 * 1000);

        // Clean-up function to clear the interval when the component unmounts or the effect re-runs
        return () => clearInterval(intervalId);
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
        <div style={timeNowStyle}>
            <p>Time now: {time}</p>
            <p>Day: {date}</p>
        </div>
    )

}
export default IpPlaceTime;