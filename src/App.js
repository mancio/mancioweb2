import './App.css';
import MoveSVG from './MoveSVG';
import Cup from './svg/cup.svg';
import Cloud from './svg/cloud.svg';
import Car from './svg/car.svg';
import Face from './svg/face.svg'
import {getRandomNumber} from "./logic/Functions";
function App() {
    const svgs = [Car,Cup,Cloud,Face];

    const generateRandomArray = (size, svgs) => {
        const randomArray = [];
        for (let i = 0; i < size; i++) {
            const randomIndex = getRandomNumber(0, svgs.length - 1);
            const randomElement = svgs[randomIndex];
            randomArray.push(randomElement);
        }
        return randomArray;
    };

    const svgArray = generateRandomArray(100, svgs);

    function renderMoveSVGs(svgFiles) {
        return svgFiles.map((svg, index) => (
            <MoveSVG key={`svg-${index}`} svgFile={svg} />
        ));
    }


  return (
    <div className="App">
        {renderMoveSVGs(svgArray)}
    </div>
  );
}

export default App;
