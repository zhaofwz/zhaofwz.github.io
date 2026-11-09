/* ============================================================
   传奇发布网 - 交互脚本
   ============================================================ */
(function () {
    "use strict";

    /* ---------- Banner 轮播 ---------- */
    var slides = document.querySelectorAll(".slide");
    var dots = document.querySelectorAll(".banner-dots i");
    if (slides.length > 0) {
        var cur = 0;
        function show(i) {
            slides.forEach(function (s) { s.classList.remove("active"); });
            dots.forEach(function (d) { d.classList.remove("on"); });
            slides[i].classList.add("active");
            if (dots[i]) dots[i].classList.add("on");
            cur = i;
        }
        function next() { show((cur + 1) % slides.length); }
        setInterval(next, 4500);
        dots.forEach(function (d, i) {
            d.addEventListener("click", function () { show(i); });
        });
    }

    /* ---------- 回到顶部 ---------- */
    var topBtn = document.getElementById("toTop");
    if (topBtn) {
        window.addEventListener("scroll", function () {
            topBtn.style.display = window.pageYOffset > 400 ? "block" : "none";
        });
        topBtn.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    /* ---------- 导航当前页高亮 ---------- */
    var path = window.location.pathname.replace(/\/+$/, "").split("/").pop().toLowerCase();
    if (path === "" || path === "index.html") path = "index.html";
    document.querySelectorAll(".nav a").forEach(function (a) {
        var hp = (a.getAttribute("href") || "").toLowerCase();
        if (hp === path || (path === "index.html" && hp === "")) {
            a.classList.add("active");
        }
    });

    /* ---------- 搜索框（纯前端提示） ---------- */
    var sb = document.querySelector(".search-box button");
    var si = document.querySelector(".search-box input");
    if (sb && si) {
        function doSearch() {
            var kw = si.value.trim();
            if (!kw) { alert("请输入要搜索的游戏名称或关键词"); return; }
            // 在所有游戏卡片中过滤（同页内高亮匹配项）
            var cards = document.querySelectorAll(".game-card");
            var found = 0;
            cards.forEach(function (c) {
                var txt = c.textContent;
                if (txt.indexOf(kw) > -1) { c.style.borderColor = "#ff5a2c"; found++; }
                else { c.style.borderColor = ""; }
            });
            if (found === 0) alert("暂无与「" + kw + "」相关的游戏，试试其他关键词吧");
        }
        sb.addEventListener("click", doSearch);
        si.addEventListener("keydown", function (e) { if (e.key === "Enter") doSearch(); });
    }
})();
