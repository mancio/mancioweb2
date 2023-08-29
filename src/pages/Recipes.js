import MyButton from "../components/MyButton";
import { useNavigate } from 'react-router-dom';
import {MENU} from "../logic/Names";
import {removeSpaceLowerCaseString} from "../logic/Functions";
import {recipesList} from "../logic/RecipesList";
import {useState} from "react";

function Recipes(){

    const navigate = useNavigate();

    const [selectedLanguage, setSelectedLanguage] = useState('EN'); // Default language is English

    const handleLanguageChange = (event) => {
        const newLanguage = event.target.value;
        setSelectedLanguage(newLanguage);
    };

    const getTranslatedRecipeName = (recipe, language) => {
        if (recipe.name[language]) {
            return recipe.name[language];
        } else if (recipe.name.EN) {
            return recipe.name.EN;
        } else if (recipe.name.IT) {
            return recipe.name.IT;
        } else {
            return recipe.name;
        }
    };

    return(
        <div>
            <div className='title'>
                <p>Recipes</p>
                <div className='dashboard'>
                    <p>Language: <select id='languageDropdown' onChange={handleLanguageChange}>
                        <option value='EN'>English</option>
                        <option value='IT'>Italian</option>
                    </select>
                    </p>
                </div>
            </div>
            {recipesList.map((recipe, index) => {
                const translatedRecipeName = getTranslatedRecipeName(recipe, selectedLanguage);
                return (
                    <MyButton text={translatedRecipeName} key={index} onPress={()=>navigate(removeSpaceLowerCaseString(translatedRecipeName))}/>
                );
            })}
            <MyButton text="Back" onPress={()=>navigate(MENU)}/>
        </div>
    );
}


export default Recipes;