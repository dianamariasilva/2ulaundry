import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAVhcei_0vLIQpBsUlP33KqRJ9WX0mBNts",
    authDomain: "ulaundry-c6406.firebaseapp.com",
    projectId: "ulaundry-c6406",
    storageBucket: "ulaundry-c6406.appspot.com",
    messagingSenderId: "951633576087",
    appId: "1:951633576087:web:a5369b580039acbbe1e9d2",
    measurementId: "G-CW0CR62CK9"
};
// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);

export const db = fb.firestore();

