// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpTTychGfDi4J7Mo4e3jpIusZHgtHVHxU",
  authDomain: "fit5032-50180.firebaseapp.com",
  projectId: "fit5032-50180",
  storageBucket: "fit5032-50180.firebasestorage.app",
  messagingSenderId: "1061813704441",
  appId: "1:1061813704441:web:f92464362095581aa1f428"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const db = getFirestore();
export default db;
