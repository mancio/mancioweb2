import '../App.css';
import {recipeList} from "../logic/Names";
import {removeSpaceLowerCaseString} from "../logic/Functions";
import {useParams} from "react-router-dom";
function RecipesGen(){

    const recipeName = useParams();

    const recipe = recipeList.find(recipe => removeSpaceLowerCaseString(recipe.name) === removeSpaceLowerCaseString(recipeName));

    console.log(recipe);

    if (!recipe) {
        return (
            <div className='title'>
                <p>Recipe not found</p>
            </div>
            );
    }

    return(
      <div className='recipe-box'>
        <div className='title'>
            <p>{recipe.name}</p>
        </div>
      </div>
    );
}

export default RecipesGen;