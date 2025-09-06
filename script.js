console.log("Сайт для подготовки к олимпиадам работает!");

// Работа с модальным окном входа
const loginBtn = document.getElementById("loginBtn");
const modal = document.getElementById("loginModal");
const closeBtn = document.querySelector(".close");

loginBtn.addEventListener("click", () => {
  modal.style.display = "flex";
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});
