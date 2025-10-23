document.addEventListener("DOMContentLoaded", () => {
  const submitBtn = document.getElementById("submitQuiz");
  if (!submitBtn) return;

  submitBtn.addEventListener("click", () => {
    const correctAnswers = {
      q1: "A",
      q2: "A",
      q3: "A",
      q4: "A",
      q5: "A",
      q6: "A",
      q7: "A",
      q8: "A"
    };

    let score = 0;
    let total = Object.keys(correctAnswers).length;
    let feedback = "<h2>Результаты:</h2><ul>";

    for (let q in correctAnswers) {
      const selected = document.querySelector(`input[name="${q}"]:checked`);
      if (selected) {
        if (selected.value === correctAnswers[q]) {
          score++;
          feedback += `<li><b>${q}</b>: ✅ Верно</li>`;
        } else {
          feedback += `<li><b>${q}</b>: ❌ Неверно</li>`;
        }
      } else {
        feedback += `<li><b>${q}</b>: ❌ Не выбран ответ</li>`;
      }
    }

    feedback += "</ul>";
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = `${feedback}<p><b>Итог:</b> ${score}/${total}</p>`;
  });
});
