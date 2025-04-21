import {initializeApp} from "firebase/app";
import {getDatabase, onValue, ref, set} from "firebase/database";
import {DESKTOP, ENGLISH, ITALIAN, LANGUAGE_RECIPE_KEY, PHONE, RECIPES, TABLET} from "./Names";
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
import {useEffect} from "react";
import {recipeFullList} from "../components/recipes/RecipesList";

export function roundStringToTwoDecimals(strNum) {
    const num = parseFloat(strNum);
    return num.toFixed(2);
}

export function batteryPercentage(voltageStr) {
    const voltage = parseFloat(voltageStr);
    const MAX_VOLTAGE = 5.20;
    const MIN_VOLTAGE = 4.80;
    // Clamp the voltage to ensure it's within the expected range
    const clampedVoltage = Math.max(MIN_VOLTAGE, Math.min(MAX_VOLTAGE, voltage));
    // Calculate the percentage
    const percentage = ((clampedVoltage - MIN_VOLTAGE) / (MAX_VOLTAGE - MIN_VOLTAGE)) * 100;
    // Return the percentage as a string with two decimal places
    return `${percentage.toFixed(2)}%`;
}

/////////// recipes list handler

export function sortArrayOfStringsAlphabetically(stringsArray) {
    return stringsArray.slice().sort((a, b) => {
        return a.localeCompare(b);
    });
}

export function getRecipeTitle(text) {
    // Split the text into lines
    const lines = text.split('\n');

    // Find the index of the first hyphen
    const firstHyphenIndex = lines.findIndex(line => line.trim() === '-');

    // Return the trimmed line after the first hyphen if it exists
    if (firstHyphenIndex !== -1 && lines.length > firstHyphenIndex + 1) {
        return lines[firstHyphenIndex + 1].trim();
    }

    // If the line after the first hyphen is not found, return an empty string
    return '';
}

// Function to extract the language from the recipe text
export function extractLanguage(text) {
    // Split the text into lines
    const lines = text.split('\n');

    // Return the first trimmed line that contains any text
    for (const line of lines) {
        const trimmedLine = line.trim();
        if (trimmedLine) {
            return trimmedLine;
        }
    }

    // If no non-empty line is found, return an empty string
    return '';
}


function splitTextIntoBlocks(text) {
    // Trim leading and trailing whitespace from the entire text
    text = text.trim();

    // Split the trimmed text into lines
    const lines = text.split('\n');

    // Prepare an array to hold the blocks
    let blocks = [];
    let currentBlock = [];

    // Iterate through each line
    lines.forEach(line => {
        // Check if the line is just a dash
        if (line.trim() === '-') {
            // When a dash is found and there is collected text, save it as a block
            if (currentBlock.length > 0) {
                blocks.push(currentBlock.join('\n')); // Join the block without trimming internal content
                currentBlock = []; // Reset current block
            }
        } else {
            // If not a dash, add the line to the current block
            currentBlock.push(line);
        }
    });

    // Add the last block if any lines remain
    if (currentBlock.length > 0) {
        blocks.push(currentBlock.join('\n'));
    }

    if(blocks.length !== 8) console.log(`Please check "-" separators in ${blocks[0]} ${blocks[1]}.
        Only ${blocks.length} blocks are found.
        use "EMPTY" tag if there is no text`);

    return blocks;
}

export function getRecipeData(text){
    const textBlocks = splitTextIntoBlocks(text);
    const recipeLanguage = textBlocks[0].trim();
    const recipeName = textBlocks[1].trim();
    const servings = textBlocks[2].trim();
    const ingredients = textBlocks[3].trim().split('\n');
    const steps = textBlocks[4].trim().split('\n\n');
    const notes = textBlocks[5].trim();

    const pictureLines = textBlocks[6].trim().split('\n');

    // Prepare an array to hold the number and URL pairs
    let pictures = [];

    // Iterate through each line, assuming each line contains a picture
    pictureLines.forEach(line => {
        const trimmedLine = line.trim();
        if (trimmedLine) { // Ensure the line is not empty
            // Split the line around ' - ' to separate the number and the URL part
            const parts = trimmedLine.split(' - ');

            // Parse the number, assumed to be before ' - '
            const number = parseInt(parts[0], 10);

            // Extract the URL from between the brackets
            const url = parts[1].slice(1, -1); // Removes the enclosing []

            // Store the number and URL as an object in the pictures array
            pictures.push({ number, url });
        }
    });

   const video = textBlocks[7].trim();

   return {
       language: recipeLanguage,
       name: recipeName,
       servings: servings,
       ingredients: ingredients,
       steps: steps,
       notes: notes,
       pictures: pictures,
       video: video
   };
}

// Function to get recipes by language and text and return their titles
export function getRecipesByLangText(lang, text) {
    const partName = text.toLowerCase();

    // Flatten the nested recipe lists
    const allRecipes = recipeFullList.flatMap(entry => entry[1]);

    // Filter the recipes array to get only the recipes that match the specified language and include the given text
    const filteredRecipes = allRecipes.filter(recipeText => {
        const recipeLang = extractLanguage(recipeText);
        return recipeLang === lang && getRecipeTitle(recipeText.toLowerCase()).includes(partName);
    });

    // Map the filtered recipes to their titles
    return filteredRecipes.map(getRecipeTitle);
}

// Function to get the recipe text and ID by URL
export function getRecipeIDTextByUrl(recipeURL) {
    const normalizedRecipeURL = removeSpaceLowerCaseString(recipeURL);

    // Iterate over the nested arrays in recipeFullList
    for (const [id, recipeList] of recipeFullList) {
        // Check each recipe text in the current recipe list
        for (const recipeText of recipeList) {
            if (removeSpaceLowerCaseString(getRecipeTitle(recipeText)) === normalizedRecipeURL) {
                return { id, recipeText }; // Return the ID and text if a match is found
            }
        }
    }

    // Return null or some indicator if no match is found
    return null;
}

// Function to get the recipe URL by ID and language
export function getRecipeURLByIdAndLanguage(id, language) {
    // Find the recipe list by the specified ID
    const recipeListEntry = recipeFullList.find(entry => entry[0] === id);

    // If the recipe list entry is found, search for the translation
    if (recipeListEntry) {
        const recipeList = recipeListEntry[1];
        const translation = recipeList.find(recipeText => extractLanguage(recipeText) === language);

        // If the translation is found, construct and return the URL
        if (translation) {
            const recipeURL = removeSpaceLowerCaseString(getRecipeTitle(translation));
            return `${RECIPES}/${recipeURL}`;
        }
    }

    // Return the default recipes URL if the recipe or translation is not found
    return RECIPES;
}


//////// end

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
    return localStorage.getItem(LANGUAGE_RECIPE_KEY) || ITALIAN || ENGLISH;
}

export function setSharedObject(name, object){
    localStorage.setItem(name, JSON.stringify(object));
}

export function getSharedObject(name){
    return JSON.parse(localStorage.getItem(name));
}

export function removeSharedObject(name){
    localStorage.removeItem(name);
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

export function isPhoneInVerticalOrientation() {
    // Adjust this based on common phone screen widths in CSS pixels
    const maxWidthForPhone = 480; // Increased to accommodate larger phones
    const width = window.innerWidth;
    const height = window.innerHeight;

    const isPhone = width <= maxWidthForPhone; // Check if the width is within phone range
    const isVertical = height > width; // Check if the height is greater than the width

    return isPhone && isVertical;
}

export function getDisplayType() {
    const width = window.innerWidth;

    if (width <= 768) {
        return PHONE;
    } else if (width > 768 && width <= 1024) {
        return TABLET;
    } else {
        return DESKTOP;
    }
}

export function useRefreshOnDisplayChange(){

    useEffect(() => {
        const handleOrientationChange = () => {
            // Refresh the page
            window.location.reload();
        };

        window.addEventListener('orientationchange', handleOrientationChange);

        // Clean up
        return () => {
            window.removeEventListener('orientationchange', handleOrientationChange);
        };
    }, []);
}

export function isTouchDevice(){return navigator.maxTouchPoints > 0;}

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
        const response = await fetch('https://get.geojs.io/v1/ip/geo.json');
        const data = await response.json();

        // Extract timezone from the response
        const timezone = data.timezone;

        // Get the current date and time in the extracted timezone
        const currentTime = new Date().toLocaleString('en-US', { timeZone: timezone });

        // Split the date and time
        const [date, time] = currentTime.split(', ');

        return {
            date: date,
            time: time,
        };
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function getTimeZone(){
    try {
        const response = await fetch('https://get.geojs.io/v1/ip/geo.json');
        const data = await response.json();
        return {
            timeZone: data.timezone
        };
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getTimeDateFormatted() {
    const timeZoneData = await getTimeZone(); // Await the timezone data

    if (timeZoneData && timeZoneData.timeZone) {
        const currentDate = new Date(); // Get the current date and time

        // Format date as DD/MM/YYYY
        const formattedDate = new Intl.DateTimeFormat('en-GB', {
            timeZone: timeZoneData.timeZone,
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }).format(currentDate);

        // Format time as HH:MM:SS
        const formattedTime = new Intl.DateTimeFormat('en-GB', {
            timeZone: timeZoneData.timeZone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        }).format(currentDate);

        return {
            date: formattedDate,
            time: formattedTime
        };
    } else {
        console.error('Unable to retrieve timezone.');
        return null;
    }
}

export function getUnixTime() { return  Math.floor(Date.now() / 1000); }

export function getTimeDifference(thermometerUnixTimestamp, currentUnixTime) {
    // Calculate the time difference in seconds
    const timeDifferenceInSeconds = currentUnixTime - thermometerUnixTimestamp;

    // If the difference is negative (future timestamp), return a meaningful message
    if (timeDifferenceInSeconds < 0) {
        return 'error';
    }

    // Calculate days, hours, and minutes
    const days = Math.floor(timeDifferenceInSeconds / (3600 * 24));
    const hours = Math.floor((timeDifferenceInSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((timeDifferenceInSeconds % 3600) / 60);

    // Format the result based on the number of days and hours
    if (days > 0) {
        return `${days} days, ${hours} hours`;
    } else if (hours > 0) {
        return `${hours} hours, ${minutes} minutes`;
    } else {
        return `${minutes} minutes`;
    }
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

export function unixToPolishTime(unixTimestamp) {
    // Convert the Unix timestamp to milliseconds
    const date = new Date(unixTimestamp * 1000);

    // Format the date in Polish locale
    const formattedDate = date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    // Format the time in Polish locale, ensuring it's in 24-hour format without seconds
    const formattedTime = date.toLocaleTimeString('pl-PL', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });

    // Combine the formatted date and time
    return `${formattedDate} ${formattedTime}`;
}


// age calculator
export function calculateAge(day, month, year) {
    const today = new Date();
    const birthDate = new Date(year, month - 1, day); // month is 0-indexed in JavaScript Date

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    const dayDifference = today.getDate() - birthDate.getDate();

    // Adjust age if the current date is before the birthdate in the current year
    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
        age--;
    }

    return age;
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

/////// Fart page stuff

export const farts = [
    { name: 'Toot Toot', audio: fart1 },
    { name: 'Jack the Ripper', audio: fart2 },
    { name: 'Snap Crackle Plop', audio: fart3 },
    { name: 'Squit', audio: fart4 },
    { name: 'Squat', audio: fart5 },
    { name: 'Raspberry', audio: fart6 },
    { name: 'Tuppence', audio: fart7 },
    { name: 'Lift Off', audio: fart8 },
    { name: 'Trouser Trumpet', audio: fart9 },
    { name: 'The Fizzler', audio: fart10 },
    { name: 'Windy Valley', audio: fart11 },
    { name: 'Eine Kleine Fartmusik', audio: fart12 },
    { name: 'Fartception', audio: fart13 },
    { name: 'Fart The Return', audio: fart14 }
];

const playFart = index => {
    new Audio(farts[index].audio).play()
        .then(() => console.log("I'm farting!: " + farts[index].name))
        .catch(err => console.log(err));
};

const getRandomFartIndex = () => Math.floor(Math.random() * farts.length);

export const playRandomFart = () => playFart(getRandomFartIndex());

export const playArmageddonFart = async () => {
    const timer = ms => new Promise(res => setTimeout(res, ms));
    for (let i = 0; i <= 50; i++) {
        playFart(getRandomFartIndex());
        await timer(500);
    }
};

export const playSingleFart = name => {
    const index = farts.findIndex(fart => fart.name === name);
    if (index !== -1) {
        playFart(index);
    } else {
        console.log("Fart not found: " + name);
    }
};

export const askToStop = function (){
    window.alert('ehehh you wish.....');
}

////////////// finish fart page stuff