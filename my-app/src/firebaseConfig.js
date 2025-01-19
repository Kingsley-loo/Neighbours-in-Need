import { initializeApp } from '@firebase/app';
import { getAuth } from '@firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCnpjJgxCMVlL_080EhYkiURfqagci0LJM",
    authDomain: "hackathon-a5bf0.firebaseapp.com",
    projectId: "hackathon-a5bf0",
    storageBucket: "hackathon-a5bf0.firebasestorage.app",
    messagingSenderId: "513917016002",
    appId: "1:513917016002:web:ad146735ffaf566ad1285b",
    measurementId: "G-6DEDFYEZ1S"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;