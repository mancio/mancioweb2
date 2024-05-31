import '../App.css';
import {
    changeIngredientQuantity, convertRecipeToList,
    getSharedLanguage, numberToEmoji,
    removeSpaceLowerCaseString,
    setSharedLanguage
} from "../logic/Functions";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {recipesList} from "../components/recipes/RecipesList";
import {ENGLISH, ITALIAN, MAGIC_SEPARATOR, RECIPES} from "../logic/Names";
import BetterButton from "../components/BetterButton";
import IngredientMultiplier from "../components/IngredientMultiplier";
import YouTubeLogo from "../pictures/icons/YouTube.svg";

function RecipesGen2(){

    const navigate = useNavigate();
    const recipeName = useParams().recipeName;
    const [languageList, setLanguageList] = useState([]);
    const [currentLanguage, setCurrentLanguage] = useState(getSharedLanguage());
    const [recipe, setRecipe] = useState(null);
    const [multiplier, setMultiplier] = useState(1);




    useEffect(() => {
        let provList = [];

        // Find the matching recipe based on name and shared language
        const matchedRecipe = recipesList.find(r => {
            const recipeNamePairs = Object.entries(r.name);

            return recipeNamePairs.some(([language, name]) => {
                const isNameMatch = removeSpaceLowerCaseString(name) === removeSpaceLowerCaseString(recipeName);
                if (isNameMatch && language === getSharedLanguage()) {
                    return true;
                } else if (isNameMatch && language === ITALIAN) {
                    setCurrentLanguage(ITALIAN);
                    setSharedLanguage(ITALIAN);
                    return true;
                } else if (isNameMatch && language === ENGLISH) {
                    setCurrentLanguage(ENGLISH);
                    setSharedLanguage(ENGLISH);
                    return true;
                }
                return false;
            });
        });

        // If a matching recipe is found, process its languages
        if (matchedRecipe) {
            Object.keys(matchedRecipe.name).forEach(language => {
                provList.push(language);
            });

            // Assuming you want to set these only if the recipe is found
            setCurrentLanguage(getSharedLanguage());
            setSharedLanguage(getSharedLanguage());
            setRecipe(matchedRecipe);
        }

        setLanguageList(provList);
        // eslint-disable-next-line
    }, []);


    const [imgBool, setImgBool] = useState([]);

    function getLastIndex(){
        return imgBool.length - 1;
    }

    function picturePromise(src){
        return new Promise((resolve) => {
            const img = new Image();
            img.src = src;
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
        });
    }

    useEffect(() => {
        if (recipe) {
            const loadImages = async () => {
                const promises = recipe.steps.map((step) => {
                    return picturePromise(step.picture);
                });
                const lastPromise = picturePromise(recipe.picture);
                const results = await Promise.all([...promises, lastPromise]);
                setImgBool(results);
            };
            loadImages().then(() => console.log("Images loaded"));
        }
    }, [recipe]);

    if (!recipe) {
        return (
            <div className='title'>
                <p>Recipe not found</p>
                <BetterButton text='Back' click={() => navigate(RECIPES)} />
            </div>
        );
    }

    return(
        <div className='recipe-box'>
            <div className='title2'>
                <h3>{recipe.name[currentLanguage]}</h3>
            </div>
            {imgBool[getLastIndex()] && <img className='recipe-img' src={recipe.picture} alt={recipe.name[currentLanguage]}/>}
            <p>{recipe.portions[currentLanguage]}</p>
            {MAGIC_SEPARATOR}
            <IngredientMultiplier multiplier={multiplier} setMultiplier={setMultiplier}/>
            <h3>Ingredients</h3>
            {recipe.ingredients[currentLanguage].map((ingredients, index) => (
                <div key={index}>
                    <p>🔆 {changeIngredientQuantity(ingredients, multiplier)} 🔆</p>
                </div>
            ))}
            {MAGIC_SEPARATOR}
            <h3>Steps:</h3>
            {recipe.steps.map((step, index) => (
                <div key={index}>
                    <p style={{ textAlign: 'left' }}>{numberToEmoji(index + 1)} ➼ {step.description[currentLanguage]}</p>
                    {imgBool[index] && <img className='recipe-img' src={step.picture} alt={`Step ${index + 1}`} />}
                </div>
            ))}
            {MAGIC_SEPARATOR}
            {recipe.notes && (
                <div>
                    <h3>Notes</h3>
                    <p>{recipe.notes[currentLanguage]}</p>
                </div>
            )}
            {recipe.video && (
                <div>
                    {MAGIC_SEPARATOR}
                    <h1>Link to video</h1>
                    <a href={recipe.video} target="_blank" rel="noopener noreferrer">
                        <img src={YouTubeLogo} alt="Watch on YouTube" width="100"/>
                    </a>
                </div>
            )}
            <div className='language-line'>
                <h3>Languages:</h3>
                {languageList.map((language) => (
                    <BetterButton key={language} text={language} click={() => setCurrentLanguage(language)} />
                ))}
            </div>
            <BetterButton text="Back" click={()=>navigate(RECIPES)}/>
      </div>
    );
}

export default RecipesGen2;