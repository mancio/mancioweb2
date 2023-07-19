import React, { useEffect, useState } from 'react';
import { ReactComponent as Car } from './svg/car.svg';
import { ReactComponent as Cup } from './svg/cup.svg';
import { ReactComponent as Cloud } from './svg/cloud.svg';

const Background = () => {
    const [left, setLeft] = useState(0);
    const [top, setTop] = useState(0);
    const [direction, setDirection] = useState('right');

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    useEffect(() => {
        const interval = setInterval(() => {
            if (direction === 'right') {
                setLeft((prevLeft) => prevLeft + 5);
                if (left > screenWidth) {
                    setDirection('left');
                    setLeft(screenWidth);
                    setTop(getRandomPosition(screenHeight));
                }
            } else {
                setLeft((prevLeft) => prevLeft - 5);
                if (left < 0) {
                    setDirection('right');
                    setLeft(0);
                    setTop(getRandomPosition(screenHeight));
                }
            }
        }, 50);

        return () => {
            clearInterval(interval);
        };
    }, [direction, left, screenWidth, screenHeight]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (direction === 'up') {
                setTop((prevTop) => prevTop - 5);
                if (top < 0) {
                    setDirection('down');
                    setTop(0);
                    setLeft(getRandomPosition(screenWidth));
                }
            } else {
                setTop((prevTop) => prevTop + 5);
                if (top > screenHeight) {
                    setDirection('up');
                    setTop(screenHeight);
                    setLeft(getRandomPosition(screenWidth));
                }
            }
        }, 50);

        return () => {
            clearInterval(interval);
        };
    }, [direction, top, screenHeight, screenWidth]);

    const getRandomPosition = (max) => {
        return Math.floor(Math.random() * max);
    };

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }}>
            <Car
                style={{
                    position: 'absolute',
                    left,
                    top,
                    width: '20px',
                    height: '20px',
                }}
            />
            <Cloud
                style={{
                    position: 'absolute',
                    left,
                    top,
                    width: '20px',
                    height: '20px',
                }}
            />
            <Cup
                style={{
                    position: 'absolute',
                    left,
                    top,
                    width: '20px',
                    height: '20px',
                }}
            />
        </div>
    );
};

export default Background;
