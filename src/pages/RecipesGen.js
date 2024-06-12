import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import {
    changeIngredientQuantity, getLanguagesById,
    getRecipeByUrl,
    getRecipeData, getRecipeTitle, getRecipeURLByIdAndLanguage, numberToEmoji,
} from "../logic/Functions";
import { EMPTY, ITALIAN, MAGIC_SEPARATOR, RECIPES } from "../logic/Names";
import IngredientMultiplier from "../components/IngredientMultiplier";
import YouTubeLogo from "../pictures/icons/YouTube.svg";
import BetterButton from "../components/BetterButton";
import { recipeDataModel, recipeModel } from "../components/recipes/RecipesList";

function RecipesGen() {
    const navigate = useNavigate();
    const { recipeName: recipeURLName } = useParams();

    const [recipeFullName, setRecipeFullName] = useState("");
    const [recipe, setRecipe] = useState(recipeModel);
    const [recipeData, setRecipeData] = useState(recipeDataModel);
    const [multiplier, setMultiplier] = useState(1);
    const [languageList, setLanguageList] = useState([ITALIAN]);

    const fetchRecipeData = useCallback((recipeURLName) => {
        const currentRecipe = getRecipeByUrl(recipeURLName);
        setRecipe(currentRecipe);
        setRecipeFullName(getRecipeTitle(currentRecipe.translations.text));
        const currentRecipeData = getRecipeData(currentRecipe.translations.text);
        setRecipeData(currentRecipeData);
        const currentLangList = getLanguagesById(currentRecipe.id);
        setLanguageList(currentLangList);
    }, []);

    useEffect(() => {
        fetchRecipeData(recipeURLName);
    }, [fetchRecipeData, recipeURLName]);

    function findFirstPictureUrl(num) {
        // Iterate through the pictures array to find the picture with number 0
        for (let picture of recipeData.pictures) {
            if (picture.number === num) {
                return picture.url;
            }
        }
        // Return null if no picture with number 0 is found
        return null;
    }

    function goToRecipe(ln) {
        navigate(getRecipeURLByIdAndLanguage(recipe.id, ln));
    }

    return (
        <div className='recipe-box'>
            <div className='title2'>
                <h3>{recipeFullName}</h3>
            </div>
            <img className='recipe-img' src={findFirstPictureUrl(0)} alt={recipeFullName} />
            <p>{recipeData.servings}</p>
            {MAGIC_SEPARATOR}
            <IngredientMultiplier multiplier={multiplier} setMultiplier={setMultiplier} />
            <h3>Ingredients</h3>
            {recipeData.ingredients.map((ingredient, index) => (
                <div key={index}>
                    <p>🔆 {changeIngredientQuantity(ingredient, multiplier)} 🔆</p>
                </div>
            ))}
            {MAGIC_SEPARATOR}
            <h3>Steps:</h3>
            {recipeData.steps.map((step, index) => (
                <div key={index}>
                    <p style={{ textAlign: 'left' }}>{numberToEmoji(index + 1)} ➼ {step}</p>
                    {findFirstPictureUrl(index + 1) &&
                        <img className='recipe-img' src={findFirstPictureUrl(index + 1)} alt={`Step ${index + 1}`} />}
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
                        <img src={YouTubeLogo} alt="Watch on YouTube" width="100" />
                    </a>
                </div>
            )}
            <div className='language-line'>
                <h3>Languages:</h3>
                {languageList.map((language) => (
                    <BetterButton key={language} text={language} click={() => goToRecipe(language)} />
                ))}
            </div>
            <BetterButton text="Back" click={() => navigate(RECIPES)} />
        </div>
    );
}

export default RecipesGen;
