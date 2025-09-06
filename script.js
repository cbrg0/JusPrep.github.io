document.addEventListener("DOMContentLoaded", function () {
  const authToggleBtn = document.getElementById("authToggleBtn");
  const authSection = document.querySelector(".auth-section");

  authToggleBtn.addEventListener("click", () => {
    authSection.classList.toggle("visible");
  });

  // Логика авторизации
  document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    alert(`Вход успешен: ${username}`);
  });

  document.getElementById("registerForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("regUsername").value.trim();
    const password = document.getElementById("regPassword").value.trim();
    alert(`Регистрация успешна: ${username}`);
  });

  // Мобильные иконки (замена для красоты)
  const cardIcons = document.querySelectorAll(".card-icon");
  cardIcons.forEach(icon => {
    if (window.innerWidth <= 768) {
      if (icon.classList.contains("fa-book-open")) icon.className = "fas fa-book";
      if (icon.classList.contains("fa-folder-open")) icon.className = "fas fa-folder";
      if (icon.classList.contains("fa-file-alt")) icon.className = "fas fa-file";
    }
  });
});
