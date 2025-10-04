console.log("JusPrep с Firebase Auth запущен!");

// === Инициализация Firebase ===
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAZMt2qM5b8ebQvWlG_LnEqDRID1Qbh42U",
  authDomain: "jusprep-e9ad2.firebaseapp.com",
  projectId: "jusprep-e9ad2",
  storageBucket: "jusprep-e9ad2.firebasestorage.app",
  messagingSenderId: "832094265855",
  appId: "1:832094265855:web:d8e325a48763a2aca687ca"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// === Работа модального окна ===
const loginBtn = document.getElementById("loginBtn");
const modal = document.getElementById("authModal");
const closeBtn = document.querySelector(".modal .close");
const tablinks = document.querySelectorAll(".tablink");
const tabcontents = document.querySelectorAll(".tabcontent");

loginBtn.addEventListener("click", () => {
  modal.style.display = "flex";
  openTab("loginTab");
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});

function openTab(tabName) {
  tabcontents.forEach((tc) => tc.classList.remove("active"));
  tablinks.forEach((btn) => btn.classList.remove("active"));

  document.getElementById(tabName).classList.add("active");
  document.querySelector(`[data-tab="${tabName}"]`).classList.add("active");
}

tablinks.forEach((btn) => {
  btn.addEventListener("click", () => openTab(btn.dataset.tab));
});

// === Обработчик входа ===
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Вход выполнен успешно!");
    modal.style.display = "none";
  } catch (error) {
    alert("Ошибка входа: " + error.message);
  }
});

// === Обработчик регистрации ===
document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    alert("Регистрация успешна!");
    document.getElementById("registerForm").reset();
    openTab("loginTab");
  } catch (error) {
    alert("Ошибка регистрации: " + error.message);
  }
});

// === (опционально) выход из аккаунта ===
function logout() {
  signOut(auth).then(() => {
    alert("Вы вышли из аккаунта");
  });
}
