/*
 * JusPrep: язык страниц с тестами.
 *
 * Язык выбирается на главной странице и хранится в localStorage (jusprep_lang).
 * Русский текст вопросов не меняется. Казахский перевод лежит рядом в полях
 * question_kz, options_kz, explanation_kz, meta_kz. Поле correct общее для обоих
 * языков, поэтому правильный ответ не может разойтись между версиями.
 * Если у вопроса нет казахского поля, показывается русский текст.
 */
(function () {
    var lang = "ru";
    try {
        lang = localStorage.getItem("jusprep_lang") === "kz" ? "kz" : "ru";
    } catch (e) { /* localStorage недоступен: остаётся русский */ }

    // Общие надписи интерфейса тестов
    var dict = {
        "Проверить ответ": "Жауапты тексеру",
        "Ответить": "Жауап беру",
        "Следующий вопрос →": "Келесі сұрақ →",
        "Следующий вопрос →": "Келесі сұрақ →",
        "Посмотреть результат": "Нәтижені көру",
        "Завершить": "Аяқтау",
        "Тест завершен!": "Тест аяқталды!",
        "Тест успешно пройден! 🎉": "Тест сәтті аяқталды! 🎉",
        "Тест успешно завершен! 🎉": "Тест сәтті аяқталды! 🎉",
        "Вернуться в меню": "Мәзірге оралу",
        "Вернуться к разделам": "Бөлімдерге оралу",
        "📖 Объяснение:": "📖 Түсіндірме:",
        "Объяснение:": "Түсіндірме:",
        "Пояснение:": "Түсіндірме:",
        "Тестирование": "Тестілеу",
        "⚠️ Вы не вошли в аккаунт — результат не сохранился в личном кабинете.": "⚠️ Сіз аккаунтқа кірмегенсіз — нәтиже жеке кабинетте сақталмады.",
        "✅ Результат успешно сохранен в личном кабинете!": "✅ Нәтиже жеке кабинетте сәтті сақталды!",
        "❌ Ошибка сохранения результата.": "❌ Нәтижені сақтау кезінде қате шықты.",
        "Комплексный тест: выберите формат": "Кешенді тест: форматты таңдаңыз",
        "Экспресс-тест": "Экспресс-тест",
        "Оптимально": "Оңтайлы",
        "Углубленная проверка": "Тереңдетілген тексеру",
        "Полный экзамен": "Толық емтихан"
    };

    var JP = {
        lang: lang,
        isKz: lang === "kz",

        // JP.t("Проверить ответ") или JP.t("рус", "қаз")
        t: function (ru, kz) {
            if (lang !== "kz") return ru;
            if (typeof kz === "string") return kz;
            return Object.prototype.hasOwnProperty.call(dict, ru) ? dict[ru] : ru;
        },

        // Возвращает массив вопросов на текущем языке.
        // Объекты копируются, исходный массив и поле correct не меняются.
        localize: function (questions) {
            if (lang !== "kz" || !Array.isArray(questions)) return questions;
            return questions.map(function (q) {
                var out = {};
                for (var k in q) {
                    if (Object.prototype.hasOwnProperty.call(q, k)) out[k] = q[k];
                }
                ["question", "options", "explanation", "meta", "stage"].forEach(function (f) {
                    var kz = q[f + "_kz"];
                    if (kz === undefined) return;
                    // Защита: казахских вариантов должно быть столько же, сколько русских
                    if (f === "options" && (!Array.isArray(kz) || !Array.isArray(q.options) || kz.length !== q.options.length)) return;
                    out[f] = kz;
                });
                return out;
            });
        },

        // То же для объекта вида { "module-1": [...], "module-2": [...] }
        localizeModules: function (modules) {
            if (lang !== "kz" || !modules) return modules;
            var out = {};
            for (var k in modules) {
                if (Object.prototype.hasOwnProperty.call(modules, k)) out[k] = JP.localize(modules[k]);
            }
            return out;
        },

        // Статичные надписи в разметке: <h1 data-kz="Философия">Философия</h1>
        // Для текста с тегами внутри: data-kz-html="..."
        applyStatic: function (root) {
            if (lang !== "kz") return;
            var scope = root || document;
            scope.querySelectorAll("[data-kz]").forEach(function (el) {
                el.textContent = el.getAttribute("data-kz");
            });
            scope.querySelectorAll("[data-kz-html]").forEach(function (el) {
                el.innerHTML = el.getAttribute("data-kz-html");
            });
            scope.querySelectorAll("[data-kz-title]").forEach(function (el) {
                el.setAttribute("title", el.getAttribute("data-kz-title"));
            });
        }
    };

    window.JP = JP;

    if (lang === "kz") {
        document.documentElement.lang = "kk";
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", function () { JP.applyStatic(); });
        } else {
            JP.applyStatic();
        }
    }
})();
