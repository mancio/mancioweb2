import {useEffect, useState} from "react";
import {addOneSecond, formatDate, getInfoFromIp} from "../logic/Functions";
import {MIDNIGHT_AS_24H_STRING, SEARCHING_MESSAGE} from "../logic/Names";
import '../App.css';

function IpPlaceTime(){

    const [time, setTime] = useState(SEARCHING_MESSAGE);
    const [date, setDate] = useState(SEARCHING_MESSAGE);

    const [bottomPosition, setBottomPosition] = useState('0px');

    const timeNowStyle = {
        backgroundColor: 'black',
        color: 'white',
        textAlign: 'center',
        fontSize: 'large',
        borderRadius: '30px',
        padding: '20px',
        marginTop: bottomPosition,
        width: '300px',
        marginLeft: 'auto',
        marginRight: 'auto'
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