import React, { useEffect, useRef } from 'react';
import {fpsToMs, genRandPos, getRelativeSize} from "../logic/Functions";

function MoveSimpleSVG({ svgFile }) {
    const margin = 10;
    const startPos = genRandPos(margin);
    const relSize = getRelativeSize(0.5);
    const canvasRef = useRef(null);
    let ctx = null;
    let x_icon = startPos.x;
    let y_icon = startPos.y;
    let stepX = 2;
    let stepY = 2;
    const size_x = relSize;
    const size_y = relSize;
    const canvas_size_x = window.innerWidth - margin;
    const canvas_size_y = window.innerHeight - margin;
    let anim_img = null;
    let animationInterval = null; // To store the animation interval

    useEffect(() => {
        const canvas = canvasRef.current;
        // eslint-disable-next-line
        ctx = canvas.getContext('2d');
        // eslint-disable-next-line
        anim_img = new Image(size_x, size_y);
        anim_img.onload = function () {
            startAnimation(); // Start the animation when the image is loaded
        };
        anim_img.src = svgFile;

        return () => {
            clearInterval(animationInterval); // Clean up the animation interval when the component unmounts
        };
    }, [svgFile]);

    const startAnimation = () => {
        if (!animationInterval) {
            animationInterval = setInterval(myAnimation, fpsToMs(60));
        }
    };

    const myAnimation = () => {
        ctx.clearRect(0, 0, canvas_size_x, canvas_size_y);
        if (x_icon < 0 || x_icon > canvas_size_x - size_x) {
            stepX = -stepX;
        }
        if (y_icon < 0 || y_icon > canvas_size_y - size_y) {
            stepY = -stepY;
        }
        x_icon += stepX;
        y_icon += stepY;
        ctx.drawImage(anim_img, x_icon, y_icon, size_x, size_y);
    };

    return (
        <div style={{ position: 'absolute', width: "auto" }}>
            <canvas
                ref={canvasRef}
                width={canvas_size_x}
                height={canvas_size_y}
                style={{ border: 'solid 1px', position: 'relative' }}
            />
        </div>
    );
}

export default MoveSimpleSVG;
