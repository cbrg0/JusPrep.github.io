console.log("Сайт JusPrep запущен!");

// Модальное окно
const loginBtn = document.getElementById("loginBtn");
const modal = document.getElementById("authModal");
const closeBtn = document.querySelector(".modal .close");
const tablinks = document.querySelectorAll(".tablink");
const tabcontents = document.querySelectorAll(".tabcontent");

loginBtn.addEventListener("click", () => {
  modal.style.display = "flex";
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});

// Переключение табов
tablinks.forEach(btn => {
  btn.addEventListener("click", () => {
    tablinks.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const tab = btn.dataset.tab;
    tabcontents.forEach(tc => tc.classList.remove("active"));
    document.getElementById(tab).classList.add("active");
  });
});


// ===============================
// 🔥 Firebase Auth
// ===============================
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } 
from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

import { getApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";

const app = getApp();
const auth = getAuth(app);

// Регистрация нового пользователя
document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    alert("Регистрация успешна!");
    document.getElementById("registerForm").reset();
    modal.style.display = "none";
  } catch (error) {
    alert("Ошибка: " + error.message);
  }
});

// Вход пользователя
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Вход выполнен!");
    modal.style.display = "none";
    loginBtn.innerHTML = '<i class="fas fa-user-check"></i>'; // меняем иконку
  } catch (error) {
    alert("Ошибка: " + error.message);
  }
});
