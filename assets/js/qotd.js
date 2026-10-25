/*
 * Вопрос дня на главной. Каждый день один и тот же вопрос у всех посетителей.
 * Вопросы лежат по одному в /assets/data/qotd/<номер>.json (собирает tools/build_qotd.js из тестов).
 * Использование: <div id="qotd"></div>, затем JPQotd.setLang("ru" | "kz").
 */
(function () {
    "use strict";

    var COUNT = 428; // обновляется скриптом сборки
    var STORE = "jusprep_qotd";
    var lang = "ru";
    var item = null;
    var index = 0;

    var T = {
        ru: {
            label: "Вопрос дня",
            grade: "класс",
            right: "Верно.",
            wrong: "Неверно. Правильный ответ отмечен зелёным.",
            more: "Решать тест по этой теме",
            tomorrow: "Завтра будет новый вопрос.",
            happy: ["Отлично, так держать!", "Точно в цель.", "Это было уверенно."],
            cheer: ["Бывает. Прочитай пояснение, и в следующий раз получится.", "Хороший вопрос, чтобы запомнить. Пояснение ниже.", "Ничего страшного, на олимпиаде этот уже не поймает."],
            error: "Не удалось загрузить вопрос. Обновите страницу."
        },
        kz: {
            label: "Күн сұрағы",
            grade: "сынып",
            right: "Дұрыс.",
            wrong: "Қате. Дұрыс жауап жасылмен белгіленген.",
            more: "Осы тақырып бойынша тест шешу",
            tomorrow: "Ертең жаңа сұрақ болады.",
            happy: ["Керемет, осылай жалғастыр!", "Дәл таптың.", "Сенімді жауап."],
            cheer: ["Болады. Түсіндірмені оқы, келесі жолы шығады.", "Есте сақтауға жақсы сұрақ. Түсіндірме төменде.", "Ештеңе етпейді, олимпиадада бұл енді қателестірмейді."],
            error: "Сұрақты жүктеу мүмкін болмады. Бетті жаңартыңыз."
        }
    };

    function today() {
        var d = new Date();
        return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    }

    function dayIndex() {
        var d = new Date();
        var days = Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 86400000);
        // шаг 157 взаимно прост с количеством вопросов, поэтому соседние дни попадают в разные отрасли
        return (days * 157) % COUNT;
    }

    function readAnswer() {
        try {
            var s = JSON.parse(localStorage.getItem(STORE) || "null");
            return s && s.day === today() ? s.pick : null;
        } catch (e) { return null; }
    }

    function saveAnswer(pick) {
        try { localStorage.setItem(STORE, JSON.stringify({ day: today(), pick: pick })); } catch (e) { /* без хранилища просто не запоминаем */ }
    }

    function esc(s) {
        return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; });
    }

    function render() {
        var root = document.getElementById("qotd");
        if (!root) return;
        var t = T[lang];
        if (!item) { root.innerHTML = '<p class="qotd-note">' + esc(t.error) + "</p>"; return; }
        var k = lang === "kz" ? 1 : 0;
        var pick = readAnswer();
        var answered = pick !== null;
        var ok = answered && pick === item.c;
        var phrases = ok ? t.happy : t.cheer;

        var opts = item.o[k].map(function (text, i) {
            var cls = "qotd-opt";
            if (answered && i === item.c) cls += " is-right";
            else if (answered && i === pick) cls += " is-wrong";
            return '<button type="button" class="' + cls + '" data-i="' + i + '"' + (answered ? " disabled" : "") + ">" + esc(text) + "</button>";
        }).join("");

        root.innerHTML =
            '<div class="qotd-head">' +
                "<div>" +
                    '<p class="qotd-label">' + esc(t.label) + "</p>" +
                    '<p class="qotd-meta">' + esc(item.bn[k]) + ", " + esc(item.g) + " " + esc(t.grade) + "</p>" +
                "</div>" +
                
            "</div>" +
            '<p class="qotd-q">' + esc(item.q[k]) + "</p>" +
            '<div class="qotd-opts">' + opts + "</div>" +
            (answered
                ? '<div class="qotd-after">' +
                      '<div class="qotd-react"><img src="/assets/images/bear-320.png" alt="" width="56" height="56">' +
                      '<p class="qotd-say">' + esc(phrases[index % phrases.length]) + "</p></div>" +
                      '<p class="qotd-verdict ' + (ok ? "is-right" : "is-wrong") + '">' + esc(ok ? t.right : t.wrong) + "</p>" +
                      '<p class="qotd-expl">' + esc(item.e[k]) + "</p>" +
                      '<p class="qotd-links"><a href="/tests/' + item.g + "/" + item.b + '/index.html">' + esc(t.more) + "</a>" +
                      '<span class="qotd-note">' + esc(t.tomorrow) + "</span></p>" +
                  "</div>"
                : "");

        Array.prototype.forEach.call(root.querySelectorAll(".qotd-opt"), function (btn) {
            btn.addEventListener("click", function () {
                saveAnswer(Number(btn.getAttribute("data-i")));
                render();
            });
        });
    }

    function load() {
        index = dayIndex();
        fetch("/assets/data/qotd/" + index + ".json")
            .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
            .then(function (data) { item = data; render(); })
            .catch(function () { item = null; render(); });
    }

    window.JPQotd = {
        setLang: function (l) { lang = l === "kz" ? "kz" : "ru"; render(); }
    };

    try { lang = localStorage.getItem("jusprep_lang") === "kz" ? "kz" : "ru"; } catch (e) { /* по умолчанию русский */ }
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", load);
    else load();
})();
