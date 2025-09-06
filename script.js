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
  if(e.target === modal) modal.style.display = "none";
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

// Простая регистрация/логин (для будущей БД)
document.getElementById("loginForm").addEventListener("submit", function(e){
  e.preventDefault();
  alert("Вход успешен! (потом будет база)");
  modal.style.display = "none";
});

document.getElementById("registerForm").addEventListener("submit", function(e){
  e.preventDefault();
  alert("Регистрация успешна! (потом будет база)");
  document.getElementById("registerForm").reset();
});
