const validUsername = "user";  // Пример имени пользователя
const validPassword = "password";  // Пример пароля

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
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const messageDiv = document.getElementById('message');

function showMessage(text, success = true) {
  messageDiv.textContent = text;
  messageDiv.style.color = success ? 'green' : 'red';
}

// Регистрация
registerForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const username = document.getElementById('registerUsername').value.trim();
  const password = document.getElementById('registerPassword').value;

  if (localStorage.getItem(username)) {
    showMessage('Пользователь уже существует', false);
    return;
  }

  localStorage.setItem(username, password);
  showMessage('Регистрация успешна! Теперь войдите.');
  registerForm.reset();
});

// Вход
loginForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const username = document.getElementById('loginUsername').value.trim();
  const password = document.getElementById('loginPassword').value;

  const storedPassword = localStorage.getItem(username);

  if (storedPassword && storedPassword === password) {
    showMessage('Вход успешен!');
    // Тут можно сделать редирект или показать приватную часть сайта
  } else {
    showMessage('Неверное имя пользователя или пароль', false);
  }

  loginForm.reset();
});
