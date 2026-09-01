import fart1 from '../sounds/farts/fart1.mp3';
import fart2 from '../sounds/farts/fart2.mp3';
import fart3 from '../sounds/farts/fart3.mp3';
import fart4 from '../sounds/farts/fart4.mp3';
import fart5 from '../sounds/farts/fart5.mp3';
import fart6 from '../sounds/farts/fart6.mp3';
import fart7 from '../sounds/farts/fart7.mp3';
import fart8 from '../sounds/farts/fart8.mp3';
import fart9 from '../sounds/farts/fart9.mp3';
import fart10 from '../sounds/farts/fart10.mp3';
import fart11 from '../sounds/farts/fart11.mp3';
import fart12 from '../sounds/farts/fart12.mp3';
import fart13 from '../sounds/farts/fart13.mp3';
import fart14 from '../sounds/farts/fart14.mp3';

export interface Fart {
    name: string;
    audio: string;
}

export const farts: Fart[] = [
    {name: 'Toot Toot', audio: fart1},
    {name: 'Jack the Ripper', audio: fart2},
    {name: 'Snap Crackle Plop', audio: fart3},
    {name: 'Squit', audio: fart4},
    {name: 'Squat', audio: fart5},
    {name: 'Raspberry', audio: fart6},
    {name: 'Tuppence', audio: fart7},
    {name: 'Lift Off', audio: fart8},
    {name: 'Trouser Trumpet', audio: fart9},
    {name: 'The Fizzler', audio: fart10},
    {name: 'Windy Valley', audio: fart11},
    {name: 'Eine Kleine Fartmusik', audio: fart12},
    {name: 'Fartception', audio: fart13},
    {name: 'Fart The Return', audio: fart14},
];

const playFart = (index: number): void => {
    new Audio(farts[index].audio).play()
        .then(() => console.log("I'm farting!: " + farts[index].name))
        .catch(err => console.log(err));
};

const getRandomFartIndex = (): number => Math.floor(Math.random() * farts.length);

export const playRandomFart = (): void => playFart(getRandomFartIndex());

export const playArmageddonFart = async (): Promise<void> => {
    const timer = (ms: number) => new Promise(res => setTimeout(res, ms));
    for (let i = 0; i <= 50; i++) {
        playFart(getRandomFartIndex());
        await timer(500);
    }
};

export const playSingleFart = (name: string): void => {
    const index = farts.findIndex(fart => fart.name === name);
    if (index !== -1) {
        playFart(index);
    } else {
        console.log("Fart not found: " + name);
    }
};

export const askToStop = function (): void {
    window.alert('ehehh you wish.....');
};
