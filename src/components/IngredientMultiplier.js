import {DECREASE, INCREASE} from "../logic/Names";

function IngredientMultiplier({ multiplier, setMultiplier }) {

    const increment = 0.5;

    const buttonStyle = { background: "transparent",
        cursor: 'pointer', border: 'none' };

    function changeQuantity(type) {
        if (type === INCREASE) setMultiplier(multiplier + increment);
        if (type === DECREASE && multiplier > 1) setMultiplier(multiplier - increment);
    }

    return (
        <div>
            <h3>Multiplier:
                <button onClick={() => changeQuantity(DECREASE)} style={buttonStyle}>⬅️</button>
                X{multiplier}
                <button onClick={() => changeQuantity(INCREASE)} style={buttonStyle}>➡️</button>
            </h3>
        </div>
    )
}

export default IngredientMultiplier;