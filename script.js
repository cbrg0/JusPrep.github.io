console.log("Сайт для подготовки к олимпиадам работает!");

// Всплывающее окно авторизации
const authBtn = document.getElementById("authBtn");
const authModal = document.getElementById("authModal");
const closeModal = document.querySelector(".auth-modal .close");

authBtn.addEventListener("click", () => {
  authModal.style.display = "block";
});

closeModal.addEventListener("click", () => {
  authModal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target == authModal) {
    authModal.style.display = "none";
  }
});

// Простейший "логин" и "регистрация" (для демо)
document.getElementById("loginForm").addEventListener("submit", function(e){
  e.preventDefault();
  alert("Вход успешен!");
  authModal.style.display = "none";
});

document.getElementById("registerForm").addEventListener("submit", function(e){
  e.preventDefault();
  alert("Регистрация успешна!");
  authModal.style.display = "none";
});
