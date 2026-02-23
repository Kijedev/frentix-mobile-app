// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDw1O52NrGwplBGl0bs_p6ja-nVN9SE0rA",
  authDomain: "frentix-app.firebaseapp.com",
  projectId: "frentix-app",
  storageBucket: "frentix-app.firebasestorage.app",
  messagingSenderId: "220319376385",
  appId: "1:220319376385:web:523a075a1dd2b6a14e0c00"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default app;