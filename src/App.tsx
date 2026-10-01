import CookieConsent from "react-cookie-consent";
import './App.css';
import Dice3 from './pictures/dice/dice-3.svg'
import Dice5 from './pictures/dice/dice-5.svg'
import Face from './pictures/icons/face.svg'
import {getDisplayType, getRandomNumber} from "./logic/Functions";
import { Routes, Route, BrowserRouter } from "react-router-dom"
import {
    DICE,
    FART, HOW_OLD,
    KITCHEN_TOOLS,
    MENU,
    PHONE,
    RECIPES,
    SCORE_COUNTER,
    TABLET, TEMP
} from "./logic/Names";
import {lazy, Suspense} from "react";
import MoveSVG from "./animation/MoveSVG";
import Footer from "./components/Footer";
const Menu = lazy(() => import('./pages/Menu'));
const Recipes = lazy(() => import('./pages/Recipes'));
const RecipesGen = lazy(() => import('./pages/RecipesGen'));
const ScoreCounter = lazy(() => import('./pages/ScoreCounter'));
const KitchenTools = lazy(() => import('./pages/KitchenTools'));
const Dice = lazy(() => import('./pages/Dice'));
const Fart = lazy(() => import('./pages/Fart'));
const Temperature = lazy(() => import('./pages/Temperature'));
const HowOld = lazy(() => import('./pages/HowOld'));


function App() {
    const svgs = [Dice3, Dice5, Face];
    const type = getDisplayType();
    const elements =
        type === PHONE ? 3 :
        type === TABLET ? 5 :
        8;

    const generateRandomArray = (size: number, svgs: string[]): string[] => {
        const randomArray: string[] = [];
        for (let i = 0; i < size; i++) {
            const randomIndex = getRandomNumber(0, svgs.length - 1);
            const randomElement = svgs[randomIndex];
            randomArray.push(randomElement);
        }
        return randomArray;
    };

    const svgArray = generateRandomArray(elements, svgs);

    function renderMoveSVGs(svgFiles: string[]) {
        return svgFiles.map((svg, index) => (
            <MoveSVG key={`svg-${index}`} svgFile={svg} />
        ));
    }

    return (
        <div className="App">
            <CookieConsent
                style={{zIndex: 10001, alignItems: 'center'}}
                contentStyle={{flex: '1 1 auto', minWidth: 0, margin: '10px'}}
                buttonStyle={{fontSize: '16px', padding: '10px 18px', borderRadius: '8px'}}
            >This website uses cookies to enhance the user experience.</CookieConsent>
            <Suspense fallback={<div>Loading...</div>}>
                {renderMoveSVGs(svgArray)}
                <div className="frame">
                    <BrowserRouter>
                        <Routes>
                            <Route path={MENU} element={<Menu />} />
                            <Route path={RECIPES} element={<Recipes />} />
                            <Route path={RECIPES + '/:recipeName'} element={<RecipesGen />} />
                            <Route path={SCORE_COUNTER} element={<ScoreCounter />} />
                            <Route path={KITCHEN_TOOLS} element={<KitchenTools />} />
                            <Route path={DICE} element={<Dice />} />
                            <Route path={FART} element={<Fart />} />
                            <Route path={TEMP} element={<Temperature />} />
                            <Route path={HOW_OLD} element={<HowOld /> } />
                        </Routes>
                    </BrowserRouter>
                </div>
            </Suspense>
            {/* outside .frame: its transform would otherwise anchor position:fixed to it */}
            <Footer/>
        </div>
    );
}

export default App;
