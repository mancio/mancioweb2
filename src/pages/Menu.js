import {getEmoji} from "../logic/Functions";
import MyButton from "../components/MyButton";
import '../App.css';
import { useNavigate } from 'react-router-dom';
import {RECIPES} from "../logic/Names";

function Menu(){

    const navigate = useNavigate();

    return(
        <div>
            <div className="title">
                <p> {getEmoji()} Mancio Page {getEmoji()}</p>
            </div>
            <MyButton text="Recipes" onPress={()=>navigate(RECIPES)}/>
        </div>
    );
}

export default Menu;