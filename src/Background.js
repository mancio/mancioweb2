import React, { useEffect, useRef } from 'react';
import { ReactComponent as CarIcon } from './svg/car.svg';
import { ReactComponent as CloudIcon } from './svg/cloud.svg';
import { ReactComponent as CupIcon } from './svg/cup.svg';

const Background = () => {
    const carRef = useRef(null);
    const cloudRef = useRef(null);
    const cupRef = useRef(null);

    useEffect(() => {
        const animateElements = () => {
            const car = carRef.current;
            const cloud = cloudRef.current;
            const cup = cupRef.current;

            let carPosition = { x: 100, y: 100 };
            let cloudPosition = { x: 200, y: 50 };
            let cupPosition = { x: 300, y: 150 };

            let carDirection = { x: 1, y: 1 };
            let cloudDirection = { x: -1, y: -1 };
            let cupDirection = { x: 1, y: -1 };

            const moveElements = () => {
                car.setAttribute('transform', `translate(${carPosition.x}, ${carPosition.y})`);
                cloud.setAttribute('transform', `translate(${cloudPosition.x}, ${cloudPosition.y})`);
                cup.setAttribute('transform', `translate(${cupPosition.x}, ${cupPosition.y})`);

                carPosition.x += carDirection.x; // Adjust the X-axis movement speed as needed
                carPosition.y += carDirection.y; // Adjust the Y-axis movement speed as needed

                cloudPosition.x += cloudDirection.x; // Adjust the X-axis movement speed as needed
                cloudPosition.y += cloudDirection.y; // Adjust the Y-axis movement speed as needed

                cupPosition.x += cupDirection.x; // Adjust the X-axis movement speed as needed
                cupPosition.y += cupDirection.y; // Adjust the Y-axis movement speed as needed

                const screenWidth = window.innerWidth;
                const screenHeight = window.innerHeight;

                const carWidth = car.getBoundingClientRect().width;
                const carHeight = car.getBoundingClientRect().height;

                const cloudWidth = cloud.getBoundingClientRect().width;
                const cloudHeight = cloud.getBoundingClientRect().height;

                const cupWidth = cup.getBoundingClientRect().width;
                const cupHeight = cup.getBoundingClientRect().height;

                if (carPosition.x <= 0 || carPosition.x + carWidth >= screenWidth) {
                    carDirection.x *= -1;
                }

                if (carPosition.y <= 0 || carPosition.y + carHeight >= screenHeight) {
                    carDirection.y *= -1;
                }

                if (cloudPosition.x <= 0 || cloudPosition.x + cloudWidth >= screenWidth) {
                    cloudDirection.x *= -1;
                }

                if (cloudPosition.y <= 0 || cloudPosition.y + cloudHeight >= screenHeight) {
                    cloudDirection.y *= -1;
                }

                if (cupPosition.x <= 0 || cupPosition.x + cupWidth >= screenWidth) {
                    cupDirection.x *= -1;
                }

                if (cupPosition.y <= 0 || cupPosition.y + cupHeight >= screenHeight) {
                    cupDirection.y *= -1;
                }

                requestAnimationFrame(moveElements);
            };

            requestAnimationFrame(moveElements);
        };

        animateElements();
    }, []);

    return (
        <svg width="100%" height="100%" style={{ position: 'fixed', top: 0, left: 0 }}>
            <g>
                <CarIcon ref={carRef} width="50" height="30" />
                <CloudIcon ref={cloudRef} width="80" height="50" />
                <CupIcon ref={cupRef} width="40" height="60" />
            </g>
        </svg>
    );
};

export default Background;
