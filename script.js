const validUsername = "user"; // Пример имени пользователя
const validPassword = "password"; // Пример пароля

document.getElementById("loginForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === validUsername && password === validPassword) {
    alert("Вход успешен!");
    window.location.href = "dashboard.html"; // Переход на личный кабинет
  } else {
    alert("Неверное имя пользователя или пароль.");
  }
});