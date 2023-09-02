import {MENU} from "../logic/Names";
import {getEmoji, getFirebaseSetUp, isDbSet, readDb, setRef, writeDb} from "../logic/Functions";
import {useNavigate} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import BetterButton from "../components/BetterButton";
import '../App.css';

const path = 'dashboard';

function Dashboard(){

    const navigate = useNavigate();

    if (!isDbSet()) getFirebaseSetUp();

    const [dashboardText, setDashboardText] = useState('');
    const textAreaRef = useRef(null);

    // Load data from Firebase on component mount
    useEffect(() => {
        readDb(path, (data) => {
            setDashboardText(data);
        })
    }, []);

    const handleInputChange = (event) => {
        const newText = event.target.value;
        setDashboardText(newText);

        const dashboardRef = setRef(path);
        writeDb(dashboardRef, newText);
    };

    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = 'auto'; // Reset height to auto
            textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
        }
    }, [dashboardText]); // This effect will run whenever dashboardText changes



    return(
        <div>
            <div className="title">
                <p> {getEmoji()} DashBoard Copy/Paste {getEmoji()}</p>
            </div>
            <div className='dashboard'>
                <textarea
                    value={dashboardText}
                    onChange={handleInputChange}
                    className="text-box"
                    ref={textAreaRef}
                    placeholder="Type here"
                />
            </div>
            <BetterButton text="Back" click={() => navigate(MENU)}/>
        </div>
    );
}
export default Dashboard;