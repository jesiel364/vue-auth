import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyA2AhM0VBM2gZHgY0HPFFQUfdVYJS9usTI",
  authDomain: "primeiro-projeto-6d3f8.firebaseapp.com",
  databaseURL: "https://primeiro-projeto-6d3f8-default-rtdb.firebaseio.com",
  projectId: "primeiro-projeto-6d3f8",
  storageBucket: "primeiro-projeto-6d3f8.appspot.com",
  messagingSenderId: "1010182689466",
  appId: "1:1010182689466:web:0d684f115e0833de5e2883",
  measurementId: "G-ETP1BX25J2",
};

const app = initializeApp(firebaseConfig);

export default app