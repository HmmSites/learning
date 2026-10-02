/* =====================================================================
   theme.js – Hell-/Dunkelmodus
   Die Wahl liegt in einem Cookie (plus localStorage als Ausfallsicherung,
   falls Cookies blockiert sind) und wird sofort beim Laden gesetzt, damit
   die Seite nicht kurz hell aufblitzt.
   ===================================================================== */
(function () {
  "use strict";
  var COOKIE = "lpt_theme";
  var STORE = "lpt-theme";
  var root = document.documentElement;

  function readCookie() {
    var m = document.cookie.match(/(?:^|;\s*)lpt_theme=([^;]+)/);
    return m ? decodeURIComponent(m[1]) : null;
  }
  function writeCookie(v) {
    var d = new Date();
    d.setTime(d.getTime() + 31536000000); // 1 Jahr
    document.cookie = COOKIE + "=" + encodeURIComponent(v) +
      ";expires=" + d.toUTCString() + ";path=/;SameSite=Lax";
  }
  function fromStore() {
    try {
      var v = localStorage.getItem(STORE);
      if (v === "light" || v === "dark") return v;
    } catch (e) {}
    var c = readCookie();
    return c === "light" || c === "dark" ? c : null;
  }
  function fromSystem() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark" : "light";
  }
  function apply(mode) {
    root.setAttribute("data-theme", mode);
    root.style.colorScheme = mode;
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", mode === "dark" ? "#161b26" : "#f6f1e6");
  }

  var mode = fromStore() || fromSystem();
  apply(mode);

  window.ThemeSwitch = {
    get: function () { return root.getAttribute("data-theme") || "light"; },
    set: function (m) {
      mode = m === "dark" ? "dark" : "light";
      apply(mode);
      writeCookie(mode);
      try { localStorage.setItem(STORE, mode); } catch (e) {}
      document.dispatchEvent(new CustomEvent("themechange", { detail: { mode: mode } }));
      return mode;
    },
    toggle: function () { return this.set(this.get() === "dark" ? "light" : "dark"); }
  };
})();
