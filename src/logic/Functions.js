import { initializeApp } from "firebase/app";
import { getDatabase, onValue, set, ref } from "firebase/database";
import {ENGLISH, LANGUAGE_RECIPE_KEY} from "./Names";

export function getFileNameNoExt (file){
    return file.split("/").pop().split(".")[0];
}

export function removeSpaceLowerCaseString(str){
    return str.replace(/\s+/g, '').toLowerCase();
}


export function setCurrentLanguage(language){
    localStorage.setItem(LANGUAGE_RECIPE_KEY, language);
}

export function getCurrentLanguage(){
    return localStorage.getItem(LANGUAGE_RECIPE_KEY) || ENGLISH;
}

export const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

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

