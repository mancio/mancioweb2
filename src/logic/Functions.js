import {initializeApp} from "firebase/app";
import {getDatabase, onValue, ref, set} from "firebase/database";
import {ENGLISH, LANGUAGE_RECIPE_KEY} from "./Names";


export function changeIngredientQuantity(ingredient, multiplier) {
    const regex = /(\d+\/\d+|\d+(\.\d+)?)/;
    const match = ingredient.match(regex);

    if (match) {
        let quantity;

        if (match[0].includes('/')) {
            // If the match is a fraction, split it and compute the fractional value
            const [numerator, denominator] = match[0].split('/').map(Number);
            quantity = numerator / denominator;
        } else {
            // If the match is a decimal or whole number, parse it as a float
            quantity = parseFloat(match[0]);
        }

        const updatedQuantity = quantity * multiplier;

        // Format the number: one decimal place if not a whole number, no decimal if it's a whole number
        const formattedQuantity = updatedQuantity % 1 === 0 ? Math.round(updatedQuantity) : updatedQuantity.toFixed(1);

        return ingredient.replace(regex, formattedQuantity);
    }

    return ingredient;
}

export function numberToEmoji(number) {
    const emojiMap = {
        '1': '❶',
        '2': '❷',
        '3': '❸',
        '4': '❹',
        '5': '❺',
        '6': '❻',
        '7': '❼',
        '8': '❽',
        '9': '❾',
        '10': '❿'
    };

    // Convert the number to a string for processing
    const numStr = number.toString();

    // Special case for 10
    if (numStr === '10') {
        return emojiMap[numStr];
    }

    // Map each digit to its emoji and join
    return numStr.split('').map(digit => emojiMap[digit]).join('');
}

export function getFileNameNoExt (file){
    return file.split("/").pop().split(".")[0];
}

export function removeSpaceLowerCaseString(str){
    return str.replace(/\s+/g, '').toLowerCase();
}


export function setSharedLanguage(language){
    localStorage.setItem(LANGUAGE_RECIPE_KEY, language);
}

export function getSharedLanguage(){
    return localStorage.getItem(LANGUAGE_RECIPE_KEY) || ENGLISH;
}

export const getRandomNumber = (min = 1, max = 6) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

export function getRealRandomInt(min = 1, max = 6) {
    let range = max - min + 1;
    let randomArray = new Uint32Array(1);
    window.crypto.getRandomValues(randomArray);
    return min + (randomArray[0] % range);
}

// Functions to move svg

export function genRandPos(px){
    return {
         x: Math.random() * (window.innerWidth - px),
         y: Math.random() * (window.innerHeight - px),
    };
}

export function genRandDeg(){
    return Math.random() * 360;
}

export function getRadians(deg){
    return deg * (Math.PI / 180);
}

export function getDistance(rad){
    const deltaX = Math.cos(rad);
    const deltaY = Math.sin(rad);
    return {disX: deltaX * window.innerWidth, distY: deltaY * window.innerHeight}
}

export function getNewPos(position){
    const deg = genRandDeg();
    const rad = getRadians(deg);
    const distance = getDistance(rad);
    const newX = position.x + distance.disX;
    const newY = position.y + distance.distY;
    return { x: newX, y: newY };
}

export function newBorder(position, px){
    const borderX = position.x < 0 ? 0 : position.x > window.innerWidth - px ? window.innerWidth - px : position.x;
    const borderY = position.y < 0 ? 0 : position.y > window.innerHeight - px ? window.innerHeight - px : position.y;
    return { x: borderX, y: borderY };
}

export function isTouching (position,px){
    return position.x < 0 || position.x > window.innerWidth - px || position.y < 0 || position.y > window.innerHeight - px;
}


export function getRelativeSize(percentage){
    const screenArea = window.innerWidth * window.innerHeight;
    const objectArea = (percentage / 100) * screenArea;
    return Math.sqrt(objectArea);
}

export function fpsToMs(fps){
    return 1000 / fps;
}

////////////////////////


export function getEmoji(){
    const emojis = ['😊', '🎉', '🌟', '🐶', '🍕'];
    const randomIndex = Math.floor(Math.random() * emojis.length);
    return emojis[randomIndex];
}

// db management

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
    databaseURL: process.env.REACT_APP_DATABASE,
};

let dbApp = null;

export function isDbSet(){
    return dbApp !== null;
}

export function getFirebaseSetUp(){
    dbApp = initializeApp(firebaseConfig);
}

export function setRef(path){
    return ref(getDatabase(dbApp), path);
}

export function readDb(path, callback){
    const dashboardRef = setRef(path);

    onValue(dashboardRef, (snapshot) => {
        const data = snapshot.val();
        callback(data);
    });
}

export function writeDb(ref, value) {
    set(ref, value)
        .then(() => {
            console.log("Data saved successfully");
        })
        .catch((error) => {
            console.error('Error writing data to Firebase:', error);
        });
}

export async function getInfoFromIp() {
    try {
        const token = process.env.REACT_APP_TIME_TOKEN;
        const response = await fetch('https://timezoneapi.io/api/ip/?token=' + token);
        const data = await response.json();

        return {
            city: data.data.city,
            state: data.data.state,
            country: data.data.country,
            date: data.data.datetime.date,
            time: data.data.datetime.time,
        };
    } catch (error) {
        console.error(error);
        return null;
    }
}

export function formatDate(inputDate) {
    // Split the input date string into day, month, and year components
    const [month, day, year] = inputDate.split('/').map(Number);

    // Create a new Date object
    const date = new Date(year, month - 1, day);

    // Define an array for month names
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    // Define an array for day names
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    // Get the day, month, and year components from the date object
    const formattedDay = dayNames[date.getDay()];
    const formattedMonth = monthNames[date.getMonth()];
    const formattedYear = date.getFullYear();

    // Return the formatted date string
    return `${formattedDay} ${day} ${formattedMonth} ${formattedYear}`;
}


export function addOneSecond(inputTime) {
    try {
        // Parse the inputTime string into a Date object
        const timeParts = inputTime.split(':');

        let hours = parseInt(timeParts[0]);
        let minutes = parseInt(timeParts[1]);
        let seconds = parseInt(timeParts[2]);

        // Add one second
        seconds += 1;

        // Handle overflow in seconds and minutes
        if (seconds >= 60) {
            seconds = 0;
            minutes += 1;
        }
        if (minutes >= 60) {
            minutes = 0;
            hours += 1;
        }
        if (hours >= 24) {
            hours = 0;
        }

        // Format the updated time
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    } catch (error) {
        return "Invalid input format or values";
    }
}


// Pizza functions

export function getHydration(water, flour){
    return Math.round((water / flour) * 100);
}

export function getFlour(hydration, water) {
    return Math.round((100 * water) / hydration);
}

export function getWater(hydration, flour){
    return Math.round((hydration / 100) * flour);
}

