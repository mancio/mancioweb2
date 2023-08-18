import MyButton from "../components/MyButton";
import {useNavigate} from "react-router-dom";
import {MENU} from "../logic/Names";
import {getEmoji} from "../logic/Functions";

import { useState, useEffect } from 'react';
import firebase from "firebase/compat";

const firebaseConfig = {
    // Your Firebase configuration
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();


function Dashboard(){

    const navigate = useNavigate();

    const [spaceContent, setSpaceContent] = useState('');

    useEffect(() => {
        const documentId = 'BjvsVeAU8oimIXNDyufi';
        const fieldName = 'space';

        db.collection('yourCollection').doc(documentId).get()
            .then((doc) => {
                if (doc.exists) {
                    const fieldValue = doc.data()[fieldName];
                    setSpaceContent(fieldValue); // Update state with field value
                } else {
                    console.log('Document not found');
                }
            })
            .catch((error) => {
                console.error('Error getting document:', error);
            });
    }, []); // Empty dependency array ensures this runs once on component mount


    return(
        <div>
            <div className="title">
                <p> {getEmoji()} DashBoard Copy/Paste {getEmoji()}</p>
            </div>
            <div className='dashboard'>
                <p>prova</p>
                <input type="text" className="text-box" placeholder="Type here"/>
            </div>
            <MyButton text="Back" onPress={() => navigate(MENU)}/>
        </div>
    );
}
export default Dashboard;