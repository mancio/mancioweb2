import {useEffect, useState} from "react";
import { useSpring, animated, to } from "react-spring";
import {getFileNameNoExt} from "../logic/Functions";


function MoveSVG({ svgFile }) {

    const [px] = useState(100);
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

    function getDistance(rad){
        const deltaX = Math.cos(rad);
        const deltaY = Math.sin(rad);
        return {disX: deltaX * window.innerWidth, distY: deltaY * window.innerHeight}
    }

    function getNewPos(position){
        const deg = genRandDeg();
        const rad = getRadians(deg);
        const distance = getDistance(rad);
        const newX = position.x + distance.disX;
        const newY = position.y + distance.distY;
        return { x: newX, y: newY };
    }

    function newBorder(position){
        const borderX = position.x < 0 ? 0 : position.x > window.innerWidth - px ? window.innerWidth - px : position.x;
        const borderY = position.y < 0 ? 0 : position.y > window.innerHeight - px ? window.innerHeight - px : position.y;
        return { x: borderX, y: borderY };
    }

    function isTouching (position,px){
        return position.x < 0 || position.x > window.innerWidth - px || position.y < 0 || position.y > window.innerHeight - px;
    }

    const [springProps, set] = useSpring(() => ({
        from: { x: position.x, y: position.y },
        to: { x: position.x, y: position.y },
        config: { duration: 3000 },
    }));

    useEffect(() => {
        const interval = setInterval(() => {
            const newPos = getNewPos(position);
            if (isTouching(newPos, px)) {
                const borders = newBorder(newPos);
                setPosition({ x: borders.x, y: borders.y });
                set({ x: borders.x, y: borders.y });
            } else {
                setPosition({ x: newPos.x, y: newPos.y });
                set({ x: newPos.x, y: newPos.y });
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

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

