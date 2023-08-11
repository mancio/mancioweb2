import '../App.css';
import {recipeList} from "../logic/Names";
import {removeSpaceLowerCaseString} from "../logic/Functions";
import {useParams} from "react-router-dom";
function RecipesGen(){

    const recipeName = useParams();

    console.log(removeSpaceLowerCaseString(recipeList[0].name));

    const recipe = recipeList.find(recipe => removeSpaceLowerCaseString(recipe.name) === recipeName);

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