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

// Простейший логин/регистрация
const validUsername = "user";
const validPassword = "password";

document.getElementById("loginForm").addEventListener("submit", function(e){
  e.preventDefault();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  if(username === validUsername && password === validPassword){
    alert("Вход успешен!");
    modal.style.display = "none";
  } else {
    alert("Неверное имя пользователя или пароль");
  }
});

document.getElementById("registerForm").addEventListener("submit", function(e){
  e.preventDefault();
  const username = document.getElementById("regUsername").value.trim();
  const password = document.getElementById("regPassword").value.trim();
  if(username.length<3){ alert("Имя пользователя минимум 3 символа"); return; }
  if(password.length<6){ alert("Пароль минимум 6 символов"); return; }
  alert(`Регистрация успешна!\nИмя пользователя: ${username}`);
  document.getElementById("registerForm").reset();
});
