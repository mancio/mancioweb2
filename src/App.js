import CookieConsent from "react-cookie-consent";
import './App.css';
import Tree from './pictures/icons/christmas-tree.svg'
import Santa from './pictures/icons/santa.svg'
import SnowMan from './pictures/icons/snowman.svg'
import {getDisplayType, getRandomNumber} from "./logic/Functions";
import { Routes, Route, BrowserRouter } from "react-router-dom"
import {
    DASHBOARD,
    DICE,
    FART,
    KITCHEN_TOOLS,
    MENU,
    PHONE,
    RECIPES,
    SCORE_COUNTER,
    TABLET
} from "./logic/Names";
import {lazy, Suspense} from "react";
import MoveSVG from "./animation/MoveSVG";
import IpPlaceTime from "./components/IpPlaceTime";
const Menu = lazy(() => import('./pages/Menu'));
const Recipes = lazy(() => import('./pages/Recipes'));
const RecipesGen = lazy(() => import('./pages/RecipesGen'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const ScoreCounter = lazy(() => import('./pages/ScoreCounter'));
const KitchenTools = lazy(() => import('./pages/KitchenTools'));
const Dice = lazy(() => import('./pages/Dice'));
const Fart = lazy(() => import('./pages/Fart'));


function App() {
    const svgs = [Tree, Santa, SnowMan];
    const type = getDisplayType();
    const elements =
        type === PHONE ? 5 :
        type === TABLET ? 10 :
        20;

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
            <MoveSVG key={`svg-${index}`} svgFile={svg} />
        ));
    }

    return (
        <div className="App">
            <CookieConsent>This website uses cookies to enhance the user experience.</CookieConsent>
            <Suspense fallback={<div>Loading...</div>}>
                {renderMoveSVGs(svgArray)}
                <div className="frame">
                    <BrowserRouter>
                        <Routes>
                            <Route exact path={MENU} element={<Menu />} />
                            <Route path={RECIPES} element={<Recipes />} />
                            <Route path={RECIPES + '/:recipeName'} element={<RecipesGen />} />
                            <Route path={DASHBOARD} element={<Dashboard />} />
                            <Route path={SCORE_COUNTER} element={<ScoreCounter />} />
                            <Route path={KITCHEN_TOOLS} element={<KitchenTools />} />
                            <Route path={DICE} element={<Dice />} />
                            <Route path={FART} element={<Fart />} />
                        </Routes>
                    </BrowserRouter>
                    <IpPlaceTime/>
                </div>
            </Suspense>
        </div>
    );
}

export default App;
