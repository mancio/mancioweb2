import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {
    changeIngredientQuantity, getLanguagesByCode,
    getRecipeByUrl,
    getRecipeData, getRecipeNameByCodeLang, numberToEmoji,
} from "../logic/Functions";
import {EMPTY, ITALIAN, MAGIC_SEPARATOR, RECIPES} from "../logic/Names";
import IngredientMultiplier from "../components/IngredientMultiplier";
import YouTubeLogo from "../pictures/icons/YouTube.svg";
import BetterButton from "../components/BetterButton";
import {recipeDataModel, recipeModel} from "../components/recipes/RecipesList";

function RecipesGen(){

    const navigate = useNavigate();

    const [recipeName, setRecipeName] = useState(useParams().recipeName);
    const [recipe, setRecipe] = useState(recipeModel);
    const [recipeData, setRecipeData] = useState(recipeDataModel);
    const [multiplier, setMultiplier] = useState(1);
    const [languageList, setLanguageList] = useState([ITALIAN]);

    useEffect(() => {
        const currentRecipe = getRecipeByUrl(recipeName);
        setRecipe(currentRecipe);
    }, [recipeName]);

    useEffect(() => {
        const currentRecipeData = getRecipeData(recipe.text);
        setRecipeData(currentRecipeData);
    }, [recipe]);

    useEffect(() => {
        const currentLangList = getLanguagesByCode(recipe.code);
        setLanguageList(currentLangList);
    }, [recipe]);

    function findFirstPictureUrl(num){
        // Iterate through the pictures array to find the picture with number 0
        for (let picture of recipeData.pictures) {
            if (picture.number === num) {
                return picture.url;
            }
        }
        // Return null if no picture with number 0 is found
        return null;
    }

    function changeLanguage(ln){
        const newRecipe = getRecipeNameByCodeLang(recipe.code, ln);
        setRecipeName(newRecipe);
    }

    return(
        <div className='recipe-box'>
            <div className='title2'>
                <h3>{recipe.name}</h3>
            </div>
            <img className='recipe-img' src={findFirstPictureUrl(0)} alt={recipe.name}/>
            <p>{recipeData.servings}</p>
            {MAGIC_SEPARATOR}
            <IngredientMultiplier multiplier={multiplier} setMultiplier={setMultiplier}/>
            <h3>Ingredients</h3>
            {recipeData.ingredients.map((ingredients, index) => (
                <div key={index}>
                    <p>🔆 {changeIngredientQuantity(ingredients, multiplier)} 🔆</p>
                </div>
            ))}
            {MAGIC_SEPARATOR}
            <h3>Steps:</h3>
            {recipeData.steps.map((step, index) => (
                <div key={index}>
                    <p style={{textAlign: 'left'}}>{numberToEmoji(index + 1)} ➼ {step}</p>
                    {(findFirstPictureUrl(index + 1)) &&
                        <img className='recipe-img' src={findFirstPictureUrl(index + 1)} alt={`Step ${index + 1}`}/>}
                </div>
            ))}
            {!recipeData.notes.includes(EMPTY) && (
                <div>
                    {MAGIC_SEPARATOR}
                    <h3>Notes</h3>
                    <p>{recipeData.notes}</p>
                </div>
            )}
            {!recipeData.video.includes(EMPTY) && (
                <div>
                    {MAGIC_SEPARATOR}
                    <h1>Link to video</h1>
                    <a href={recipeData.video} target="_blank" rel="noopener noreferrer">
                        <img src={YouTubeLogo} alt="Watch on YouTube" width="100"/>
                    </a>
                </div>
            )}
            <div className='language-line'>
                <h3>Languages:</h3>
                {languageList.map((language) => (
                    <BetterButton key={language} text={language} click={() => changeLanguage(language)}/>
                ))}
            </div>
            <BetterButton text="Back" click={() => navigate(RECIPES)}/>
        </div>
    );
}

export default RecipesGen;