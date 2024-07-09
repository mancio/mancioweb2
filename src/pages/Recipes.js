import {
    getRecipesByLangText,
    getSharedLanguage,
    removeSpaceLowerCaseString,
    setSharedLanguage, sortArrayOfStringsAlphabetically
} from "../logic/Functions";
import {COOKING, ENGLISH, ITALIAN, MENU, POLISH} from "../logic/Names";
import BetterButton from "../components/BetterButton";
import SearchBar from "../components/SearchBar";
import StaticButton from "../components/StaticButton";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

function Recipes() {

    const navigate = useNavigate();

    const [selectedLanguage, setSelectedLanguage] = useState(getSharedLanguage());
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredRecipes, setFilteredRecipes] = useState([]);

    const handleLanguageChange = (event) => {
        const newLanguage = event.target.value;
        setSelectedLanguage(newLanguage);
        setSharedLanguage(newLanguage);
    };

    const handleSearchTermChange = (newSearchTerm) => {
        setSearchTerm(newSearchTerm);
    };

    // Update the filtered recipes list every time the search term changes
    useEffect(() => {
        const filtered = getRecipesByLangText(selectedLanguage, searchTerm);
        setFilteredRecipes(sortArrayOfStringsAlphabetically(filtered));
    }, [selectedLanguage, searchTerm]);

    return(
        <div>
            <div className='title'>
                <p>Recipes</p>
                <div className='dashboard'>
                    <p>Language: <select onChange={handleLanguageChange} value={getSharedLanguage()}>
                        <option value={ENGLISH}>English</option>
                        <option value={ITALIAN}>Italian</option>
                        <option value={POLISH}>Polish</option>
                    </select>
                    </p>
                </div>
            </div>

            <SearchBar onSearchTermChange={handleSearchTermChange} />

            {filteredRecipes.map((recipe, index) => {
                return (
                    <StaticButton
                        style={COOKING}
                        color='black'
                        text={recipe}
                        key={index}
                        click={() => navigate(removeSpaceLowerCaseString(recipe))}
                    />
                );
            })}
            <BetterButton
                text="Back"
                click={()=>navigate(MENU)}
            />
        </div>
    );

}

export default Recipes;