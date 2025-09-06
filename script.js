document.addEventListener("DOMContentLoaded", function () {
  const authToggleBtn = document.getElementById("authToggleBtn");
  const authSection = document.querySelector(".auth-section");

  authToggleBtn.addEventListener("click", () => {
    authSection.classList.toggle("visible");
  });

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
});
