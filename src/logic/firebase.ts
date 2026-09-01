import {initializeApp, type FirebaseApp} from "firebase/app";
import {getDatabase, onValue, ref, set, type DatabaseReference} from "firebase/database";

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

let dbApp: FirebaseApp | null = null;

export function isDbSet(): boolean {
    return dbApp !== null;
}

export function getFirebaseSetUp(): void {
    dbApp = initializeApp(firebaseConfig);
}

export function setRef(path: string): DatabaseReference {
    if (!dbApp) throw new Error('Firebase is not initialised: call getFirebaseSetUp() first');
    return ref(getDatabase(dbApp), path);
}

/** The caller declares the payload shape; Realtime Database values are untyped on the wire. */
export function readDb<T>(path: string, callback: (value: T) => void): void {
    onValue(setRef(path), snapshot => callback(snapshot.val() as T));
}

export function writeDb(reference: DatabaseReference, value: unknown): void {
    set(reference, value)
        .then(() => {
            console.log("Data saved successfully");
        })
        .catch((error: unknown) => {
            console.error('Error writing data to Firebase:', error);
        });
}
