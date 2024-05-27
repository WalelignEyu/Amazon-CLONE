import firebase from "firebase/compat/app";
// Auth
import { getAuth } from "firebase/auth";
import  "firebase/compat/firestore";
import "firebase/compat/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyCmoMP1f8fZiGYScINFITg2Z5oIF6PNpp4",
	authDomain: "clone-b033a.firebaseapp.com",
	projectId: "clone-b033a",
	storageBucket: "clone-b033a.appspot.com",
	messagingSenderId: "1039548560231",
	appId: "1:1039548560231:web:f4e19b11c14851ee98f5c2",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = app.firestore();
