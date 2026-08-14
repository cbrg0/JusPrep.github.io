// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc, updateDoc } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBxECtixerAiOZAntZqdk9OLAiwC3-xvI8",
    authDomain: "jusprep-e9ad2.firebaseapp.com",
    projectId: "jusprep-e9ad2",
    storageBucket: "jusprep-e9ad2.firebasestorage.app",
    messagingSenderId: "832094265855",
    appId: "1:832094265855:web:df390cb36037d457a687ca"
};

// Инициализация сервисов
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Экспортируем готовые объекты и методы для использования на любых страницах
export { auth, db, onAuthStateChanged, signOut, doc, getDoc, setDoc, updateDoc };
