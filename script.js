// Переключение видимости авторизации
document.getElementById("authToggleBtn").addEventListener("click", () => {
  const auth = document.querySelector(".auth-section");
  auth.style.display = auth.style.display === "block" ? "none" : "block";
});

// "База данных" через localStorage для демонстрации
const users = JSON.parse(localStorage.getItem("users") || "{}");

// Регистрация
document.getElementById("registerForm").addEventListener("submit", e => {
  e.preventDefault();
  const username = document.getElementById("regUsername").value.trim();
  const password = document.getElementById("regPassword").value.trim();
  if(users[username]) { alert("Пользователь уже существует!"); return; }
  users[username] = { password, progress:{} };
  localStorage.setItem("users", JSON.stringify(users));
  alert("Регистрация успешна!");
  loginUser(username);
});

// Вход
document.getElementById("loginForm").addEventListener("submit", e => {
  e.preventDefault();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  if(!users[username] || users[username].password !== password) { alert("Неверные данные"); return; }
  loginUser(username);
});

function loginUser(username){
  alert(`Добро пожаловать, ${username}!`);
  document.querySelector(".auth-section").style.display="none";
  // Здесь можно обновлять прогресс пользователя и личный кабинет
}
