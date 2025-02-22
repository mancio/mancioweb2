import BetterButton from "../components/BetterButton";
import {useNavigate} from "react-router-dom";
import {MENU} from "../logic/Names";
import {useState} from "react";
import {calculateAge} from "../logic/Functions";

function HowOld(){

    const navigate = useNavigate();

    const [days, setDays] = useState(12);
    const [months, setMonths] = useState(8);
    const [years, setYears] = useState(1986);

    return(
        <div>
            <div className="title">
                <p>How Old am I</p>
            </div>
            <div className='dashboard'>
                <input
                    type="number"
                    value={days}
                    onChange={(e) => setDays(e.target.value)}
                    placeholder="Enter day"
                    className="age-field"
                />
                <input
                    type="number"
                    value={months}
                    onChange={(e) => setMonths(e.target.value)}
                    placeholder="Enter month"
                    className="age-field"
                />
                <input
                    type="number"
                    value={years}
                    onChange={(e) => setYears(e.target.value)}
                    placeholder="Enter years"
                    className="age-field"
                />

                <h1>Today you are {calculateAge(days,months, years)} years old</h1>
            </div>
            <BetterButton text="Back" click={() => navigate(MENU)}/>
        </div>)
}

export default HowOld;