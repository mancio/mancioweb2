import '../App.css';
import {getCurrentLanguage, removeSpaceLowerCaseString, setCurrentLanguage} from "../logic/Functions";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {recipesList} from "../logic/RecipesList";
import MyButton from "../components/MyButton";
import {RECIPES} from "../logic/Names";
function RecipesGen(){

    const navigate = useNavigate();

    const recipeName = useParams().recipeName;

    const recipe = recipesList.find((recipe) => {
        const recipeNames = Object.entries(recipe.name); // Get an array of [language, name] pairs
        const matchingLanguagePair = recipeNames.find(([_, name]) => {
            return removeSpaceLowerCaseString(name) === removeSpaceLowerCaseString(recipeName);
        });
        if (matchingLanguagePair) {
            setCurrentLanguage(matchingLanguagePair[0]);
            return true; // Exit the loop when a match is found
        }
        return false;
    });

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
                <MyButton text='Back' onPress={() => navigate(RECIPES)} />
            </div>
        );
    }

    return(
        <div className='recipe-box'>
            <h3>{recipe.name[getCurrentLanguage()]}</h3>
            {imgBool[getLastIndex()] && <img className='recipe-img' src={recipe.picture} alt={recipe.name[getCurrentLanguage()]}/>}
            <p>{recipe.portions[getCurrentLanguage()]}</p>
            <h3>Ingredients</h3>
            {recipe.ingredients[getCurrentLanguage()].map((ingredients, index) => (
                <div key={index}>
                    <p>- {ingredients}</p>
                </div>
            ))}
            <h3>Steps:</h3>
            {recipe.steps.map((step, index) => (
                <div key={index}>
                    <p>{index + 1} - {step.description[getCurrentLanguage()]}</p>
                    {imgBool[index] && <img className='recipe-img' src={step.picture} alt={`Step ${index + 1}`} />}
                </div>
            ))}
            <MyButton text="Back" onPress={()=>navigate(RECIPES)}/>
      </div>
    );
}

export default RecipesGen;