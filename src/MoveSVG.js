import {useState} from "react";
import { useSpring, animated, to } from "react-spring";
import {getFileNameNoExt, xAxis, yAxis} from "./logic/Functions";


function MoveSVG({ svgFile }) {

    const [px, setPx] = useState(100);
    const [position, setPosition] = useState(genRandPos(px))

    function genRandPos(px){
        return {
            x: Math.random() * (window.innerWidth - px),
            y: Math.random() * (window.innerHeight - px),
        };
    }

    function genRandDeg(){
        return Math.random() * 360;
    }

    function getRadians(deg){
        return deg * (Math.PI / 180);
    }

    function getDistance(rad, axis){
        if (axis === xAxis) return Math.cos(rad) * 2;
        else if (axis === yAxis) return Math.sin(rad) * 2;
    }

    function getNewPos(position){
        const deg = genRandDeg();
        const rad = getRadians(deg);
        const deltaX = getDistance(rad, xAxis);
        const deltaY = getDistance(rad, yAxis);
        const newX = position.x + deltaX;
        const newY = position.y + deltaY;
        return { x: newX, y: newY };
    }

    function isTouching (x,y,px){
        return x < 0 || x > window.innerWidth - px || y < 0 || y > window.innerHeight - px;
    }

    const springProps = useSpring({
        from: { x: position.x, y: position.y },
        to: async (next) => {


            x: position.x, y: position.y



        },
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

