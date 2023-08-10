import MyButton from "../components/MyButton";
import { useNavigate } from 'react-router-dom';
import {MENU, recipeList} from "../logic/Names";
import {removeSpaceLowerCaseString} from "../logic/Functions";

function Recipes(){

    const navigate = useNavigate();

    return(
        <div>
            <div className='title'>
                <p>Recipes</p>
            </div>
            {recipeList.map((recipe, index) => (
                <MyButton text={recipe.name} key={index} onPress={()=>navigate(removeSpaceLowerCaseString(recipe.name))}/>
            ))}
            <MyButton text="Back" onPress={()=>navigate(MENU)}/>
        </div>
    );
}


export default Recipes;