/*
 * Медведь на экране итогов теста: короткая фраза в зависимости от результата.
 * Страницы тестов написаны по-разному, поэтому скрипт не вмешивается в их код:
 * он ждёт, когда на странице появится строка с результатом («… 7 из 10 …» или «10 сұрақтың 7 …»),
 * и ставит под ней медведя с репликой.
 */
(function () {
    "use strict";

    var RU = /(?:ответили на|результат:)\s*(\d+)\s*из\s*(\d+)/i;
    var KZ = /(?:Сіз|нәтижеңіз:)\s*(\d+)\s*сұрақтың\s*(\d+)/;

    var PHRASES = {
        top: ["Блестяще! Так держать.", "Почти без ошибок. На олимпиаде пригодится.", "Отличный результат. Можно браться за тему посложнее."],
        good: ["Хорошо. Загляни в пояснения к ошибкам, и будет отлично.", "Крепкий результат. Ещё один подход, и выйдет почти без ошибок."],
        mid: ["Половина пути пройдена. Пройди тест ещё раз, вопросы перемешаются.", "Неплохо для начала. Учебник по этой теме лежит в «Материалах»."],
        low: ["Бывает. Каждая ошибка сейчас минус одна ошибка на олимпиаде.", "Начни с материалов по теме и возвращайся. Я подожду."]
    };
    var PHRASES_KZ = {
        top: ["Керемет! Осылай жалғастыр.", "Қатесіз дерлік. Олимпиадада пайдасы тиеді.", "Тамаша нәтиже. Енді күрделірек тақырыпты алуға болады."],
        good: ["Жақсы. Қателердің түсіндірмесін қарап шық, сонда өте жақсы болады.", "Мықты нәтиже. Тағы бір рет, сонда қатесіз дерлік шығады."],
        mid: ["Жолдың жартысы өтті. Тестті қайта тапсыр, сұрақтар араласады.", "Бастау үшін жаман емес. Осы тақырыптың оқулығы «Материалдарда» бар."],
        low: ["Болады. Қазіргі әр қате олимпиададағы бір қатеге аз деген сөз.", "Тақырып бойынша материалдардан баста да, қайта орал. Мен күтемін."]
    };

    function isKz() {
        try { return localStorage.getItem("jusprep_lang") === "kz"; } catch (e) { return false; }
    }

    function pick(list, n) { return list[n % list.length]; }

    function scoreFrom(text) {
        var m = text.match(RU);
        if (m) return { score: +m[1], total: +m[2] };
        m = text.match(KZ);
        if (m) return { score: +m[2], total: +m[1] };
        return null;
    }

    function addBear(el, res) {
        var host = el.parentNode;
        if (!host || host.querySelector(".jp-react")) return;
        var ratio = res.total ? res.score / res.total : 0;
        var key = ratio >= 0.9 ? "top" : ratio >= 0.7 ? "good" : ratio >= 0.4 ? "mid" : "low";
        var box = document.createElement("div");
        box.className = "jp-react";
        var img = document.createElement("img");
        img.src = "/assets/images/bear-320.png";
        img.alt = "";
        img.width = 72;
        img.height = 68;
        var say = document.createElement("p");
        say.className = "jp-say";
        say.textContent = pick((isKz() ? PHRASES_KZ : PHRASES)[key], res.score + res.total);
        box.appendChild(img);
        box.appendChild(say);
        host.insertBefore(box, el.nextSibling);
    }

    function scan(root) {
        if (!root || root.nodeType !== 1) return;
        var nodes = root.querySelectorAll("p, div, h2, h3");
        for (var i = 0; i < nodes.length; i++) {
            var el = nodes[i];
            // ищем самый внутренний элемент со строкой результата
            if (el.children.length > 4) continue;
            var res = scoreFrom(el.textContent || "");
            if (res && !el.querySelector("p, div")) { addBear(el, res); return; }
        }
    }

    function start() {
        new MutationObserver(function (records) {
            records.forEach(function (r) {
                Array.prototype.forEach.call(r.addedNodes, function (n) {
                    if (n.nodeType === 1) scan(n.parentNode || n);
                });
            });
        }).observe(document.body, { childList: true, subtree: true });
    }

    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
    else start();
})();
