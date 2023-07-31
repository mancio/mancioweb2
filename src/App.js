import './App.css';
import MoveSVG from './MoveSVG';
import Cup from './svg/cup.svg';
import Cloud from './svg/cloud.svg';
import Car from './svg/car.svg';
function App() {
    const svgs = [Car,Cup,Cloud];

    function renderMoveSVGs(svgFiles) {
        return svgFiles.map((svg, index) => (
            <MoveSVG key={`svg-${index}`} svgFile={svg} />
        ));
    }


  return (
    <div className="App">
        {renderMoveSVGs(svgs)}
    </div>
  );
}

export default App;
