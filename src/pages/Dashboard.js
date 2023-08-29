import MyButton from "../components/MyButton";
import {MENU} from "../logic/Names";
import {getEmoji, getFirebaseSetUp, isDbSet, readDb, setRef, writeDb} from "../logic/Functions";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

function Dashboard(){

    const navigate = useNavigate();

    if (!isDbSet()) getFirebaseSetUp();

    const [dashboardText, setDashboardText] = useState('');

    // Load data from Firebase on component mount
    useEffect(() => {
        readDb('dashboard', (data) => {
            console.log(data);
            setDashboardText(data);
        })
    }, []);

    const handleInputChange = (event) => {
        const newText = event.target.value;
        setDashboardText(newText);

        const dashboardRef = setRef('dashboard');
        writeDb(dashboardRef, newText);
    };


    return(
        <div>
            <div className="title">
                <p> {getEmoji()} DashBoard Copy/Paste {getEmoji()}</p>
            </div>
            <div className='dashboard'>
                <p>prova</p>
                <input
                    type="text"
                    value={dashboardText}
                    onChange={handleInputChange}
                    className="text-box"
                    placeholder="Type here"
                />
            </div>
            <MyButton text="Back" onPress={() => navigate(MENU)}/>
        </div>
    );
}
export default Dashboard;