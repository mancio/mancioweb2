 export function getFileNameNoExt (file){
    return file.split("/").pop().split(".")[0];
}

 export const getRandomNumber = (min, max) => {
     return Math.floor(Math.random() * (max - min + 1) + min);
 };

