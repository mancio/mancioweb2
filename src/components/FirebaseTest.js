import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import '../App.css';

const path = 'test';

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

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

function FirebaseTest() {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Reference to your Firebase database
                const database = firebase.database();

                // Sample reference to a specific node in the database
                const dataRef = database.ref(path);

                const snapshot = await dataRef.once('value');
                const fetchedData = snapshot.val();
                setData(fetchedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleWriteData = async () => {
        try {
            // Reference to your Firebase database
            const database = firebase.database();

            // Sample reference to a specific node in the database
            const dataRef = database.ref(path);

            // Data to be written to the database
            const newData = {
                message: 'Hello, Firebase!',
                timestamp: new Date().toString()
            };

            // Write the data to the database
            await dataRef.set(newData);
            console.log('Data written successfully!');
        } catch (error) {
            console.error('Error writing data:', error);
        }
    };

    return (
        <div className='recipe-box'>
            <h1>Firebase Realtime Database Test</h1>
            <button onClick={handleWriteData}>Write Data</button>
            {data ? (
                <pre>{JSON.stringify(data, null, 2)}</pre>
            ) : (
                <p>Loading data...</p>
            )}
        </div>
    );
}

export default FirebaseTest;