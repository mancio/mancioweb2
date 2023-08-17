import CookieConsent from "react-cookie-consent";
import './App.css';
import MoveSVG from './animation/MoveSVG';
import Cup from './svg/cup.svg';
import Cloud from './svg/cloud.svg';
import Car from './svg/car.svg';
import Face from './svg/face.svg'
import {getRandomNumber} from "./logic/Functions";
import { Routes, Route, BrowserRouter } from "react-router-dom"
import Menu from "./pages/Menu";
import Recipes from "./pages/Recipes";
import {MENU, RECIPES} from "./logic/Names";
import RecipesGen from "./pages/RecipesGen";
import MoveSimpleSVG from "./animation/MoveSimpleSVG";

function App() {
    const svgs = [Car,Cup,Cloud,Face];
    const elements = 20;

    const generateRandomArray = (size, svgs) => {
        const randomArray = [];
        for (let i = 0; i < size; i++) {
            const randomIndex = getRandomNumber(0, svgs.length - 1);
            const randomElement = svgs[randomIndex];
            randomArray.push(randomElement);
        }
        return randomArray;
    };

    const svgArray = generateRandomArray(elements, svgs);

    function renderMoveSVGs(svgFiles) {
        return svgFiles.map((svg, index) => (
            <MoveSimpleSVG key={`svg-${index}`} svgFile={svg} />
        ));
    }

    return (
        <div className="App">
            <CookieConsent>This website uses cookies to enhance the user experience.</CookieConsent>
            {renderMoveSVGs(svgArray)}
            <div className="frame">
                <BrowserRouter>
                    <Routes>
                        <Route exact path={MENU} element={<Menu/>} />
                        <Route path={RECIPES} element={<Recipes/>} />
                        <Route path={RECIPES + '/:recipeName'} element={<RecipesGen/>} />
                    </Routes>
                </BrowserRouter>
            </div>
        </div>
    );
}

export default App;
