console.log("Сайт для подготовки к олимпиадам работает!");

// Переключение формы авторизации
document.getElementById("authToggleBtn").addEventListener("click", () => {
  document.querySelector(".auth-section").classList.toggle("visible");
});

// Локальные данные для примера входа
const validUsername = "user";
const validPassword = "password";

// Вход
document.getElementById("loginForm").addEventListener("submit", function(event) {
  event.preventDefault();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (username === validUsername && password === validPassword) {
    alert("Вход успешен!");
    document.querySelector(".auth-section").classList.remove("visible");
  } else {
    alert("Неверное имя пользователя или пароль.");
  }
});

// Регистрация
document.getElementById("registerBtn").addEventListener("click", function(event) {
  event.preventDefault();
  const regUsername = document.getElementById("regUsername").value.trim();
  const regPassword = document.getElementById("regPassword").value.trim();

  if (regUsername.length < 3) {
    alert("Имя пользователя должно быть не менее 3 символов.");
    return;
  }
  if (regPassword.length < 6) {
    alert("Пароль должен быть не менее 6 символов.");
    return;
  }

  alert(`Регистрация успешна!\nИмя пользователя: ${regUsername}`);
  document.getElementById("loginForm").reset();
  document.getElementById("regUsername").value = "";
  document.getElementById("regPassword").value = "";
});
