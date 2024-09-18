import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCMDJ3B8AMZAF8dWfP3YUAcjcSOiDD8jHc",
    authDomain: "my-class-manager-7d616.firebaseapp.com",
    databaseURL: "https://my-class-manager-7d616-default-rtdb.firebaseio.com",
    projectId: "my-class-manager-7d616",
    storageBucket: "my-class-manager-7d616.appspot.com",
    messagingSenderId: "1083600905104",
    appId: "1:1083600905104:web:aa6e3fa0101389ec0e8915"
};

export default app = initializeApp(firebaseConfig);