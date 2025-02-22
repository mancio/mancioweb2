import {getEmoji} from "../logic/Functions";
import '../App.css';
import { useNavigate } from 'react-router-dom';
import {DASHBOARD, DICE, FART, HOW_OLD, KITCHEN_TOOLS, RECIPES, SCORE_COUNTER, TEMP} from "../logic/Names";
import ArcadeButton from "../components/ArcadeButton";

function Menu(){

    const navigate = useNavigate();

    return(
        <div>
            <div className="title">
                <p> {getEmoji()} Mancio Page {getEmoji()}</p>
            </div>
            <ArcadeButton text="Recipes" click={()=>navigate(RECIPES)}/>
            <ArcadeButton text="How Old" click={()=>navigate(HOW_OLD)}/>
            <ArcadeButton text="Dashboard" click={()=>navigate(DASHBOARD)}/>
            <ArcadeButton text="Score Counter" click={()=>navigate(SCORE_COUNTER)}/>
            <ArcadeButton text="Kitchen Tools" click={()=>navigate(KITCHEN_TOOLS)}/>
            <ArcadeButton text="Dice" click={()=>navigate(DICE)}/>
            <ArcadeButton text="Fart&Run" click={()=>navigate(FART)}/>
            <ArcadeButton text="TempCasina" click={()=>navigate(TEMP)}/>
        </div>
    );
}

export default Menu;