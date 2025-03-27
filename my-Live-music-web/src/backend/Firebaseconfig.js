import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

//database service from firebase
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCEV0nKTqzkRZxGmvZeQwhDLgG3SvnbOnI",
  authDomain: "my-live-music-web.firebaseapp.com",
  projectId: "my-live-music-web",
  storageBucket: "my-live-music-web.firebasestorage.app",
  messagingSenderId: "870155164661",
  appId: "1:870155164661:web:661bc08e6645db83bd1ebc",
  measurementId: "G-P5NCFF7X4X",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export let __AUTH = getAuth(firebaseApp);
export let __DB = getFirestore(firebaseApp);

export default firebaseApp;



