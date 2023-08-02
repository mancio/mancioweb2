import {useEffect, useState} from "react";
import { useSpring, animated, to } from "react-spring";
import {genRandPos, getFileNameNoExt, getNewPos, isTouching, newBorder} from "../logic/Functions";


function MoveSVG({ svgFile }) {

    const [px] = useState(100);
    const [position, setPosition] = useState(genRandPos(px))

    const [springProps, set] = useSpring(() => ({
        from: { x: position.x, y: position.y },
        to: { x: position.x, y: position.y },
        config: { duration: 5000 },
    }));

    useEffect(() => {
        const interval = setInterval(() => {
            const newPos = getNewPos(position);
            if (isTouching(newPos, px)) {
                const borders = newBorder(newPos, px);
                setPosition({ x: borders.x, y: borders.y });
                set({ x: borders.x, y: borders.y });
            } else {
                setPosition({ x: newPos.x, y: newPos.y });
                set({ x: newPos.x, y: newPos.y });
            }
        }, 2000);

        return () => {
            clearInterval(interval);
        };
        // eslint-disable-next-line
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

