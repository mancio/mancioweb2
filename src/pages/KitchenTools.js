import BetterButton from "../components/BetterButton";
import {FLOUR, HYDRATION, MENU, WATER} from "../logic/Names";
import {useNavigate} from "react-router-dom";
import '../App.css';
import {useState} from "react";
import {getFlour, getHydration, getWater} from "../logic/Functions";

function KitchenTools(){

    const navigate = useNavigate();

    const [hy, setHy] = useState(65);
    const [fl, setFl] = useState(600);
    const [wt, setWt] = useState(390);

    const handleInputChange = (event, type) => {
        const newValue = event.target.value;
        if (type === HYDRATION) {
            setHy(newValue);
        } else if (type === FLOUR) {
            setFl(newValue);
        } else if (type === WATER) {
            setWt(newValue);
        }
    };

    function calculate(type) {
        if(type === HYDRATION) setHy(getHydration(wt, fl));
        if(type === FLOUR) setFl(getFlour(hy, wt));
        if(type === WATER) setWt(getWater(hy, fl));
    }

    return(
        <div>
            <div className='recipe-box'>
                <h3>Dough Hydration Calculator</h3>
                <div className='border-frame'>
                    <div className='row-el'>
                        <label>Hydration (%):
                        <input
                            className='input-number'
                            type="number"
                            name="hy"
                            id='hy'
                            min='1'
                            max='100'
                            value={hy}
                            onChange={(e) => handleInputChange(e, HYDRATION)}
                        />
                        </label>
                        <BetterButton text='find' click={() => calculate(HYDRATION)}/>
                    </div>
                    <div className='row-el'>
                        <label>Flour (gr):
                        <input
                            className='input-number'
                            type="number"
                            name="fl"
                            id='fl'
                            min='1'
                            value={fl}
                            onChange={(e) => handleInputChange(e, FLOUR)}
                        />
                        </label>
                        <BetterButton text='find' click={() => calculate(FLOUR)}/>
                    </div>
                    <div className='row-el'>
                        <label>Water (gr/ml):
                        <input
                            className='input-number'
                            type="number"
                            name="w"
                            id='w'
                            min='1'
                            value={wt}
                            onChange={(e) => handleInputChange(e, WATER)}
                        />
                        </label>
                        <BetterButton text='find' click={() => calculate(WATER)}/>
                    </div>
                </div>
            </div>
            <BetterButton text="Back" click={()=>navigate(MENU)}/>
        </div>
    );
}

export default KitchenTools;