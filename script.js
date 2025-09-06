console.log("Сайт работает!");

// Кнопка авторизации
const authToggleBtn = document.getElementById("authToggleBtn");
const authSection = document.querySelector(".auth-section");
authToggleBtn.addEventListener("click", () => {
  authSection.style.display = authSection.style.display === "flex" ? "none" : "flex";
});

// Закрытие при клике вне поля
document.addEventListener("click", (e) => {
  if(!authSection.contains(e.target) && e.target !== authToggleBtn){
    authSection.style.display = "none";
  }
});

// TODO: Firebase регистрация/вход и сохранение прогресса

