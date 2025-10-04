console.log("✅ script.js подключён!");
console.log("Сайт JusPrep запущен!");

// Элементы
const loginBtn = document.getElementById("loginBtn");
const modal = document.getElementById("authModal");
const closeBtn = document.querySelector(".modal .close");
const tablinks = document.querySelectorAll(".tablink");
const tabcontents = document.querySelectorAll(".tabcontent");

// Открыть модалку
loginBtn.addEventListener("click", () => {
  console.log("🟢 Кнопка 'Вход / Регистрация' нажата");
  modal.style.display = "flex";
});

// Закрыть модалку
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

// Вход
document.getElementById("loginForm").addEventListener("submit", function(e){
  e.preventDefault();
  alert("Вход успешен! (в будущем — Firebase Auth)");
  modal.style.display = "none";
});

// Регистрация
document.getElementById("registerForm").addEventListener("submit", function(e){
  e.preventDefault();
  alert("Регистрация успешна! (в будущем — Firebase Auth)");
  modal.style.display = "none";
});

