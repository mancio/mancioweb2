import {useState} from "react";
import { useSpring, animated, to } from "react-spring";


function MoveSVG({ svgFile }) {

    const [position, setPosition] = useState(genRandPos())

    function getFileNameNoExt (file){
        return file.split("/").pop().split(".")[0];
    }

    function genRandPos(){
        return {
            x: Math.random() * window.innerWidth ,
            y: Math.random() * window.innerHeight,
        };
    }

    const springProps = useSpring({
        to: { x: position.x, y: position.y },
        config: { tension: 200, friction: 20 },
    });

    return (
        <div style={{ position: "absolute" }}>
            <animated.img
                src={svgFile}
                alt={getFileNameNoExt(svgFile)}
                style={{
                    position: "absolute",
                    width: "100px",
                    transform: to(
                        [springProps.x, springProps.y],
                        (x, y) => `translate3d(${x}px, ${y}px, 0)`),
                }}
            />
        </div>
    );

}

export default MoveSVG;

