import { useNavigate, useParams } from "react-router-dom";
import {useEffect, useState} from "react";
import {
    changeIngredientQuantity,
    findPictureUrl,
    findRecipeByUrl,
    getRecipeURLByIdAndLanguage,
    numberToEmoji,
} from "../logic/Functions";
import type {Language} from "../data/recipes/types";
import { useWakeLock } from "react-screen-wake-lock";
import {ENGLISH, ITALIAN, MAGIC_SEPARATOR, POLISH, RECIPES} from "../logic/Names";
import IngredientMultiplier from "../components/IngredientMultiplier";
import YouTubeLogo from "../pictures/icons/YouTube.svg";
import BetterButton from "../components/BetterButton";

const CHECKED_INGREDIENTS_KEY = "checkedIngredients";

function RecipesGen() {

    const { isSupported, request, release } = useWakeLock({
        onRequest: () => console.log("Screen Wake Lock: requested!"),
        onError: () => console.error("An error occurred"),
        onRelease: () => console.log("Screen Wake Lock: released!"),
        reacquireOnPageVisible: true,
    });

    useEffect(() => {
        if (isSupported) {
            request(); // Automatically request the wake lock when the component mounts
        }

        return () => {
            release(); // Automatically release the wake lock when the component unmounts
        };
        // eslint-disable-next-line
    }, [isSupported]);

    const navigate = useNavigate();
    const { recipeName: recipeURLName } = useParams();

    const languageList: Language[] = [ITALIAN, ENGLISH, POLISH];

    const match = findRecipeByUrl(recipeURLName ?? '');
    const ingredientCount = match?.translation.ingredients.length ?? 0;

    const [multiplier, setMultiplier] = useState(1);

    const [checkedIngredients, setCheckedIngredients] = useState<boolean[]>(() => {
        const savedState = localStorage.getItem(CHECKED_INGREDIENTS_KEY);
        const parsedState: boolean[] = savedState ? JSON.parse(savedState) : [];
        // Ensure the array length matches the number of ingredients
        return parsedState.length === ingredientCount
            ? parsedState
            : new Array(ingredientCount).fill(false);
    });

    useEffect(() => {
        // Update localStorage whenever checkedIngredients changes
        localStorage.setItem(CHECKED_INGREDIENTS_KEY, JSON.stringify(checkedIngredients));
    }, [checkedIngredients]);

    if (!match) {
        return (
            <div className='recipe-box'>
                <div className='title2'>
                    <h3>Recipe not found</h3>
                </div>
                <BetterButton text="Back" click={() => navigate(RECIPES)} />
            </div>
        );
    }

    const {recipe, language, translation} = match;

    const handleCheckboxChange = (index: number) => {
        const updatedCheckedIngredients = [...checkedIngredients];
        updatedCheckedIngredients[index] = !updatedCheckedIngredients[index];
        setCheckedIngredients(updatedCheckedIngredients);
        localStorage.setItem(CHECKED_INGREDIENTS_KEY, JSON.stringify(updatedCheckedIngredients));
    };

    function goToRecipe(ln: Language) {
        navigate(getRecipeURLByIdAndLanguage(recipe.id, ln));
    }

    const heroImage = findPictureUrl(recipe, language, 0);

    return (
        <div className='recipe-box'>
            <div className='title2'>
                <h3>{translation.title}</h3>
            </div>
            {heroImage && <img className='recipe-img' src={heroImage} alt={translation.title} />}
            <p>{translation.servings}</p>
            {MAGIC_SEPARATOR}
            <IngredientMultiplier multiplier={multiplier} setMultiplier={setMultiplier} />
            <h3>Ingredients</h3>
            {translation.ingredients.map((ingredient, index) => (
                <div key={index} className="ingredient-item">
                    <input
                        type="checkbox"
                        className="ingredient-checkbox"
                        checked={checkedIngredients[index] ?? false}
                        onChange={() => handleCheckboxChange(index)}
                    />
                    <p style={{ textDecoration: checkedIngredients[index] ? 'line-through' : 'none' }}>
                        {changeIngredientQuantity(ingredient, multiplier)}
                    </p>
                </div>
            ))}
            {MAGIC_SEPARATOR}
            <h3>Steps:</h3>
            {translation.steps.map((step, index) => {
                const stepImage = findPictureUrl(recipe, language, index + 1);
                return (
                    <div key={index}>
                        <p style={{ textAlign: 'left' }}>{numberToEmoji(index + 1)} ➼ {step}</p>
                        {stepImage &&
                            <img className='recipe-img' src={stepImage} alt={`Step ${index + 1}`} />}
                    </div>
                );
            })}
            {translation.notes && (
                <div>
                    {MAGIC_SEPARATOR}
                    <h3>Notes</h3>
                    <p>{translation.notes}</p>
                </div>
            )}
            {recipe.video && (
                <div>
                    {MAGIC_SEPARATOR}
                    <h1>Link to video</h1>
                    <a href={recipe.video} target="_blank" rel="noopener noreferrer">
                        <img src={YouTubeLogo} alt="Watch on YouTube" width="100" />
                    </a>
                </div>
            )}
            <div className='language-line'>
                <h3>Languages:</h3>
                {languageList.map((lang) => (
                    <BetterButton key={lang} text={lang} click={() => goToRecipe(lang)} />
                ))}
            </div>
            <BetterButton text="Back" click={() => navigate(RECIPES)} />
        </div>
    );
}

export default RecipesGen;
