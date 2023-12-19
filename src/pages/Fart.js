import {MENU} from "../logic/Names";
import BetterButton from "../components/BetterButton";
import {useNavigate} from "react-router-dom";

function Fart(){

    const navigate = useNavigate();

    return(
        <div>
            <div className='recipe-box'>
                <h3>Fart for fun</h3>
            </div>
            <BetterButton text="Back" click={() => navigate(MENU)}/>
        </div>
    )
}

export default Fart;