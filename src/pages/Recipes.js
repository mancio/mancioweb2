import { useNavigate } from 'react-router-dom';
import {COOKING, ENGLISH, ITALIAN, MENU, POLISH} from "../logic/Names";
import {getSharedLanguage, removeSpaceLowerCaseString, setSharedLanguage} from "../logic/Functions";
import {recipesList} from "../logic/RecipesList";
import {useState} from "react";
import BetterButton from "../components/BetterButton";
import StaticButton from "../components/StaticButton";

function Recipes(){

    const navigate = useNavigate();

    const [selectedLanguage, setSelectedLanguage] = useState(getSharedLanguage());

    const handleLanguageChange = (event) => {
        const newLanguage = event.target.value;
        setSelectedLanguage(newLanguage);
        setSharedLanguage(newLanguage);
    };

    return(
        <div>
            <div className='title'>
                <p>Recipes</p>
                <div className='dashboard'>
                    <p>Language: <select onChange={handleLanguageChange} value={getSharedLanguage()}>
                        <option value={ENGLISH}>English</option>
                        <option value={ITALIAN}>Italian</option>
                        <option value={POLISH}>Polish</option>
                    </select>
                    </p>
                </div>
            </div>
            {recipesList.map((recipe, index) => {
                const translatedRecipeName = recipe.name[selectedLanguage] || recipe.name[ITALIAN] ||
                    recipe.name[ENGLISH];
                return (
                    <StaticButton
                        style={COOKING}
                        color='black'
                        text={translatedRecipeName}
                        key={index}
                        click={()=>navigate(removeSpaceLowerCaseString(translatedRecipeName))}
                    />
                );
            })}
            <BetterButton
                text="Back"
                click={()=>navigate(MENU)}
            />
        </div>
    );
}


export default Recipes;