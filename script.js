console.log("Сайт JusPrep запущен!");

// Получаем элементы
const loginBtn = document.getElementById("loginBtn");
const modal = document.getElementById("authModal");
const closeBtn = document.querySelector(".modal .close");
const tablinks = document.querySelectorAll(".tablink");
const tabcontents = document.querySelectorAll(".tabcontent");

// Открыть модальное окно
loginBtn.addEventListener("click", () => {
  modal.style.display = "flex";
  // По умолчанию — вкладка "Вход"
  openTab("loginTab");
});

// Закрыть окно
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// Закрытие по клику вне окна
window.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});

// Функция переключения табов
function openTab(tabName) {
  tabcontents.forEach((tc) => tc.classList.remove("active"));
  tablinks.forEach((btn) => btn.classList.remove("active"));

  document.getElementById(tabName).classList.add("active");
  document.querySelector(`[data-tab="${tabName}"]`).classList.add("active");
}

// Навешиваем обработчики на табы
tablinks.forEach((btn) => {
  btn.addEventListener("click", () => {
    const tab = btn.dataset.tab;
    openTab(tab);
  });
});

// Функции входа и регистрации (пока фейковые)
document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Вход выполнен! (позже добавим Firebase Auth)");
  modal.style.display = "none";
});

document.getElementById("registerForm").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Регистрация успешна! (позже добавим Firebase Auth)");
  document.getElementById("registerForm").reset();
  openTab("loginTab");
});
