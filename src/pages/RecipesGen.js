import '../App.css';
import {
    changeIngredientQuantity,
    getSharedLanguage, numberToEmoji,
    removeSpaceLowerCaseString,
    setSharedLanguage
} from "../logic/Functions";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {recipesList} from "../logic/RecipesList";
import {RECIPES} from "../logic/Names";
import BetterButton from "../components/BetterButton";
import IngredientMultiplier from "../components/IngredientMultiplier";
function RecipesGen(){

    const navigate = useNavigate();
    const recipeName = useParams().recipeName;
    const [languageList, setLanguageList] = useState([]);
    const [currentLanguage, setCurrentLanguage] = useState(getSharedLanguage());
    const [recipe, setRecipe] = useState(null);
    const [multiplier, setMultiplier] = useState(1);


    useEffect(() => {
        let provList = [];
        const recipe = recipesList.find((recipe) => {
            let match = false;
            const recipeNamePairs = Object.entries(recipe.name);
            for (const [language, name] of recipeNamePairs) {
                if (!provList.includes(language)) {
                    provList.push(language);
                }
                if (removeSpaceLowerCaseString(name) === removeSpaceLowerCaseString(recipeName) && !match) {
                    match = true;
                    setCurrentLanguage(language);
                    setSharedLanguage(language);
                }
            }
            if (match) return true; // Exit the loop when a match is found
            return false;
        });
        setRecipe(recipe);
        setLanguageList(provList);
        // eslint-disable-next-line
    },[]);


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
            <h3>{recipe.name[currentLanguage]}</h3>
            {imgBool[getLastIndex()] && <img className='recipe-img' src={recipe.picture} alt={recipe.name[currentLanguage]}/>}
            <p>{recipe.portions[currentLanguage]}</p>
            <IngredientMultiplier multiplier={multiplier} setMultiplier={setMultiplier}/>
            <h3>Ingredients</h3>
            {recipe.ingredients[currentLanguage].map((ingredients, index) => (
                <div key={index}>
                    <p>🔆 {changeIngredientQuantity(ingredients, multiplier)} 🔆</p>
                </div>
            ))}
            <h3>Steps:</h3>
            {recipe.steps.map((step, index) => (
                <div key={index}>
                    <p style={{ textAlign: 'left' }}>{numberToEmoji(index + 1)} ➼ {step.description[currentLanguage]}</p>
                    {imgBool[index] && <img className='recipe-img' src={step.picture} alt={`Step ${index + 1}`} />}
                </div>
            ))}
            {recipe.notes && (
                <div>
                    <h3>Notes</h3>
                    <p>{recipe.notes[currentLanguage]}</p>
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

export default RecipesGen;