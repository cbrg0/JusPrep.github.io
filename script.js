// script.js
const validUsername = "user";  // Пример имени пользователя
const validPassword = "password";  // Пример пароля

// Обработка формы входа
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();  // Отменяем стандартное поведение формы

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Проверяем правильность введённых данных
    if (username === validUsername && password === validPassword) {
        // Переход на страницу личного кабинета (в реальной жизни тут будет перенаправление на сервер)
        alert("Вход успешен!");
        window.location.href = "dashboard.html";  // Переход на личный кабинет
    } else {
        alert("Неверное имя пользователя или пароль.");
    }
});