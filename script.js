console.log("Сайт для подготовки к олимпиадам работает!");

// Показ/скрытие формы авторизации
const authToggleBtn = document.getElementById("authToggleBtn");
const authSection = document.querySelector(".auth-section");

authToggleBtn.addEventListener("click", () => {
  authSection.style.display = authSection.style.display === "flex" ? "none" : "flex";
});

// Простой вход
const validUsername = "user";
const validPassword = "password";

document.getElementById("loginForm").addEventListener("submit", function(event){
  event.preventDefault();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if(username === validUsername && password === validPassword){
    alert("Вход успешен!");
  } else {
    alert("Неверное имя пользователя или пароль.");
  }
});

// Регистрация
document.getElementById("registerForm").addEventListener("submit", function(event){
  event.preventDefault();
  const regUsername = document.getElementById("regUsername").value.trim();
  const regPassword = document.getElementById("regPassword").value.trim();

  if(regUsername.length < 3){
    alert("Имя пользователя должно быть не менее 3 символов.");
    return;
  }
  if(regPassword.length < 6){
    alert("Пароль должен быть не менее 6 символов.");
    return;
  }

  alert(`Регистрация успешна!\nИмя пользователя: ${regUsername}`);
  document.getElementById("registerForm").reset();
});
