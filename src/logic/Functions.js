 export function getFileNameNoExt (file){
    return file.split("/").pop().split(".")[0];
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

 ////////////////////////


export function getEmoji(){
    const emojis = ['😊', '🎉', '🌟', '🐶', '🍕'];
    const randomIndex = Math.floor(Math.random() * emojis.length);
    return emojis[randomIndex];
}
