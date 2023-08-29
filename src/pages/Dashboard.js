import MyButton from "../components/MyButton";
import {MENU} from "../logic/Names";
import {getEmoji, getFirebaseSetUp, isDbSet, readDb, setRef, writeDb} from "../logic/Functions";
import {useNavigate} from "react-router-dom";
import {useEffect, useRef, useState} from "react";

const path = 'dashboard';

function Dashboard(){

    const navigate = useNavigate();

    if (!isDbSet()) getFirebaseSetUp();

    const [dashboardText, setDashboardText] = useState('');
    const inputRef = useRef(null);

    // Load data from Firebase on component mount
    useEffect(() => {
        readDb(path, (data) => {
            console.log(data);
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
        if (inputRef.current) {
            inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
        }
    }, [dashboardText]); // This effect will run whenever dashboardText changes



    return(
        <div>
            <div className="title">
                <p> {getEmoji()} DashBoard Copy/Paste {getEmoji()}</p>
            </div>
            <div className='dashboard'>
                <p>prova</p>
                <textarea
                    value={dashboardText}
                    onChange={handleInputChange}
                    className="text-box"
                    ref={inputRef}
                    placeholder="Type here"
                />
            </div>
            <MyButton text="Back" onPress={() => navigate(MENU)}/>
        </div>
    );
}
export default Dashboard;