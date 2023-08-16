import React, { useState, useEffect } from 'react';
import {genRandPos} from "../logic/Functions";

const MoveSimpleSVG = ({svgFile}) => {

    const [px] = useState(100);

    const [position, setPosition] = useState(genRandPos(px));

    const [direction, setDirection] = useState({
        x: Math.random() > 0.5 ? 1 : -1,
        y: Math.random() > 0.5 ? 1 : -1,
    });

    useEffect(() => {
        const moveInterval = setInterval(() => {
            setPosition((prevPosition) => {
                const newX = prevPosition.x + direction.x;
                const newY = prevPosition.y + direction.y;

                if (newX >= window.innerWidth || newX <= 0) {
                    setDirection((prevDirection) => ({
                        ...prevDirection,
                        x: -prevDirection.x,
                    }));
                }

                if (newY >= window.innerHeight || newY <= 0) {
                    setDirection((prevDirection) => ({
                        ...prevDirection,
                        y: -prevDirection.y,
                    }));
                }

                return { x: newX, y: newY };
            });
        }, 16); // Update roughly every frame (60fps)

        return () => clearInterval(moveInterval);
    }, []);

    return (
        <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
            <img
                src={svgFile}
                width="50px"
                alt="Moving SVG"
                style={{
                    position: 'absolute',
                    transform: `translate(${position.x}px, ${position.y}px)`,
                }}
            />
        </div>
    );
};

export default MoveSimpleSVG;

