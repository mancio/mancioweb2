import React, { useState, useEffect } from 'react';
import {genRandPos, getNewPos, isTouching, newBorder} from "../logic/Functions";

const MoveSimpleSVG = ({svgFile}) => {

    const [px] = useState(100);

    const [position, setPosition] = useState(genRandPos(px));

    useEffect(() => {
        const moveInterval = setInterval(() => {

            const newPos = getNewPos(position);

            if (isTouching(newPos, px)) {
                const borders = newBorder(newPos, px);
                setPosition({ x: borders.x, y: borders.y });
            } else {
                setPosition({ x: newPos.x, y: newPos.y });
            }
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

