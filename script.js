// Пример валидных данных для входа
const validUsername = "user";
const validPassword = "password";

// Обработка формы входа
document.getElementById("loginForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (username === validUsername && password === validPassword) {
    alert("Вход успешен!");
    // Тут можно сделать перенаправление на личный кабинет:
    // window.location.href = "dashboard.html";
  } else {
    alert("Неверное имя пользователя или пароль.");
  }
});

// Обработка формы регистрации (пока просто заглушка)
document.getElementById("registerForm").addEventListener("submit", function(event) {
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

  // Здесь можно добавить логику регистрации (на сервер, локальное хранилище и т.п.)
  alert(`Регистрация успешна!\nИмя пользователя: ${regUsername}`);
  
  // Очистка формы
  document.getElementById("registerForm").reset();
});
