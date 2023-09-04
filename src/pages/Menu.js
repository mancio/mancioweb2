import {getEmoji} from "../logic/Functions";
import '../App.css';
import { useNavigate } from 'react-router-dom';
import {DASHBOARD, RECIPES, SCORE_COUNTER} from "../logic/Names";
import BetterButton from "../components/BetterButton";

function Menu(){

    const navigate = useNavigate();

    return(
        <div>
            <div className="title">
                <p> {getEmoji()} Mancio Page {getEmoji()}</p>
            </div>
            <BetterButton text="Recipes" click={()=>navigate(RECIPES)}/>
            <BetterButton text="Dashboard" click={()=>navigate(DASHBOARD)}/>
            <BetterButton text="Score Counter" click={()=>navigate(SCORE_COUNTER)}/>
        </div>
    );
}

export default Menu;