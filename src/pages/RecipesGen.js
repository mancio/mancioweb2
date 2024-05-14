import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getRecipeByUrl, recipeModel} from "../logic/Functions";
import {ITALIAN} from "../logic/Names";

function RecipesGen(){

    const recipeName = useParams().recipeName;
    const [recipe, setRecipe] = useState(recipeModel);
    const [language, setLanguage] = useState(ITALIAN);

    useEffect(() => {
        const currentRecipe = getRecipeByUrl(recipeName);
        setRecipe(currentRecipe);
    }, []);

    return(
        <div className='recipe-box'>
            <div className='title2'>
                <h3>{recipe.name}</h3>
            </div>

        </div>
    );
}

export default RecipesGen;