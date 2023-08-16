import '../App.css';
import {removeSpaceLowerCaseString} from "../logic/Functions";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {recipesList} from "../logic/RecipesList";
import MyButton from "../components/MyButton";
import {RECIPES} from "../logic/Names";
function RecipesGen(){

    const navigate = useNavigate();

    const recipeName = useParams();

    const recipe = recipesList.find(recipe => removeSpaceLowerCaseString(recipe.name) === removeSpaceLowerCaseString(recipeName.recipeName));

    const [stepPictures, setStepPictures] = useState([]);

    useEffect(() => {
        const loadImages = async () => {
            const promises = recipe.steps.map((step) => {
                return new Promise((resolve) => {
                    const img = new Image();
                    img.src = step.picture;
                    img.onload = () => resolve(true);
                    img.onerror = () => resolve(false);
                });
            });

            const results = await Promise.all(promises);
            setStepPictures(results);
        };

        loadImages().then(() => console.log("Images loaded"));
    }, [recipe.steps]);


    if (!recipe) {
        return (
            <div className='title'>
                <p>Recipe not found</p>
            </div>
        );
    }

    return(
      <div className='recipe-box'>
            <h3>{recipe.name}</h3>
            <p>Portions: {recipe.portions}</p>
            <h3>Steps:</h3>
            {recipe.steps.map((step, index) => (
                <div key={index}>
                    <p>{index + 1} - {step.description}</p>
                    {stepPictures[index] && <img className='recipe-img' src={step.picture} alt={`Step ${index + 1}`} />}
                </div>
            ))}
          <MyButton text="Back" onPress={()=>navigate(RECIPES)}/>
      </div>
    );
}

export default RecipesGen;