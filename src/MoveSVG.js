import {useState} from "react";
import { useSpring, animated, to } from "react-spring";
import {getFileNameNoExt} from "./logic/Functions";


function MoveSVG({ svgFile }) {

    const [position, setPosition] = useState(genRandPos())

    function genRandPos(){
        const px = 100;
        return {
            x: Math.random() * (window.innerWidth - px),
            y: Math.random() * (window.innerHeight - px),
        };
    }

    function genRandAngle(){
        return Math.random() * 360;
    }

    function degToRadians(deg){
        return deg * (Math.PI / 180);
    }

    const springProps = useSpring({
        to: { x: position.x, y: position.y },
        config: { tension: 200, friction: 20 },
    });

    return (
        <div style={{ position: "absolute", width: "auto"}}>
            <animated.img
                src={svgFile}
                alt={getFileNameNoExt(svgFile)}
                style={{
                    position: "relative",
                    width: "50px",
                    transform: to(
                        [springProps.x, springProps.y],
                        (x, y) => `translate3d(${x}px, ${y}px, 0)`),
                }}
            />
        </div>
    );

}

export default MoveSVG;

