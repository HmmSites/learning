/* =====================================================================
   app.js – Auswahl, Routing, Ansichten, Fortschritt
   ===================================================================== */
(function () {
  "use strict";
  var C = window.CURRICULUM || {};
  var ORDER = window.SCHOOL_ORDER || Object.keys(C);
  var E = window.TaskEngine;
  var STORE_KEY = "lpt-progress-v1";

  /* ---------------- Zustand ---------------- */
  var state = { schule: null, klasse: null, fach: null, search: "" };
  var session = null; // aktive Aufgabe

  var progress = loadProgress();
  function loadProgress() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return { xp: 0, answered: 0, correct: 0, themes: {} };
  }
  function saveProgress() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(progress)); } catch (e) {}
  }
  function themeKey(sk, fk, kl, idx) { return sk + "|" + fk + "|" + kl + "|" + idx; }

  /* ---------------- Hilfen ---------------- */
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  function esc(s) { return E.escapeHtml(s); }

  function subjectList(sk, kl) {
    var out = [];
    var subs = (C[sk] && C[sk].subjects) || {};
    Object.keys(subs).forEach(function (key) {
      var s = subs[key];
      if (!kl || s.klassen.indexOf(Number(kl)) !== -1) out.push({ key: key, sub: s });
    });
    return out;
  }
  function themeCount(sk, fk, kl) {
    var s = C[sk] && C[sk].subjects[fk];
    if (!s) return 0;
    var t = s.themen[kl] || s.themen[String(kl)];
    return t ? t.length : 0;
  }

  function setFachColor(color) {
    document.documentElement.style.setProperty("--fach-color", color || "#12386b");
  }

  /* ---------------- Auswahl-Chips ---------------- */
  function renderChooser() {
    // Schularten
    var cs = $("#chip-schule");
    cs.innerHTML = ORDER.map(function (sk) {
      var sc = C[sk];
      return '<button class="chip" role="tab" data-schule="' + sk + '" aria-selected="' +
        (state.schule === sk) + '">' + sc.deco + " " + esc(sc.name) + "</button>";
    }).join("");

    // Klassen
    var ck = $("#chip-klasse");
    var klassen = state.schule ? C[state.schule].klassen : [5, 6, 7, 8, 9, 10];
    ck.innerHTML = klassen.map(function (k) {
      return '<button class="chip" role="tab" data-klasse="' + k + '" aria-selected="' +
        (Number(state.klasse) === k) + '">Klasse ' + k + "</button>";
    }).join("");

    // Fächer
    var cf = $("#chip-fach");
    if (!state.schule) {
      cf.innerHTML = '<span class="hint" style="color:var(--ink-faint);font-size:14px">Bitte zuerst eine Schulart wählen.</span>';
    } else {
      var list = subjectList(state.schule, state.klasse);
      if (!list.length) list = subjectList(state.schule, null);
      cf.innerHTML = list.map(function (o) {
        return '<button class="chip fach" role="tab" data-fach="' + o.key + '" aria-selected="' +
          (state.fach === o.key) + '"><span class="dot" style="background:' + o.sub.color + '"></span>' +
          o.sub.icon + " " + esc(o.sub.name) + "</button>";
      }).join("");
    }

    // Schnellstatistik
    var total = 0, done = 0;
    Object.keys(progress.themes).forEach(function (k) { total++; if (progress.themes[k].done) done++; });
    $("#quickstats").innerHTML =
      "<span>Fächer gesamt: <b>" + countSubjects() + "</b></span>" +
      "<span>Themen gesamt: <b>" + countThemes() + "</b></span>" +
      "<span>Aufgaben gelöst: <b>" + progress.answered + "</b></span>" +
      "<span>Themen geschafft: <b>" + done + "</b></span>";

    var fk = state.fach && C[state.schule] && C[state.schule].subjects[state.fach];
    setFachColor(fk ? fk.color : (state.schule ? C[state.schule].color : "#12386b"));
  }
  function countSubjects() {
    var n = 0;
    ORDER.forEach(function (sk) { n += Object.keys(C[sk].subjects).length; });
    return n;
  }
  function countThemes() {
    var n = 0;
    ORDER.forEach(function (sk) {
      var subs = C[sk].subjects;
      Object.keys(subs).forEach(function (k) {
        var th = subs[k].themen;
        Object.keys(th).forEach(function (kl) { n += th[kl].length; });
      });
    });
    return n;
  }

  /* ---------------- HUD ---------------- */
  function renderHud() {
    $("#hud-xp").textContent = progress.xp;
    $("#hud-done").textContent = progress.correct;
    var rate = progress.answered ? Math.round(progress.correct / progress.answered * 100) : null;
    $("#hud-rate").textContent = rate === null ? "–" : rate + "%";
  }

  /* ---------------- Ansichten ---------------- */
  function viewHome() {
    var html = '<div class="hero"><h1>Üben für den <span class="accent">LehrplanPLUS</span> Bayern</h1>' +
      '<p class="lede">Wähle oben Schulart, Jahrgangsstufe und Fach. Zu jedem Thema bekommst du ein Merkblatt, ' +
      'Karteikarten und einen gemischten Übungssatz – Klasse 5 bis 10, Realschule, Gymnasium und Mittelschule.</p></div>';
    html += '<div class="section-head"><h2>Schularten</h2><span class="hint">Klick auf eine Karte, um zu starten</span></div>';
    html += '<div class="school-grid">';
    ORDER.forEach(function (sk) {
      var sc = C[sk];
      var faecher = Object.keys(sc.subjects);
      var themen = 0;
      faecher.forEach(function (k) {
        Object.keys(sc.subjects[k].themen).forEach(function (kl) { themen += sc.subjects[k].themen[kl].length; });
      });
      html += '<button class="school-card" data-schule="' + sk + '">' +
        '<span class="deco">' + sc.deco + "</span>" +
        '<span class="tag">Schulart</span>' +
        "<h3>" + esc(sc.name) + "</h3>" +
        "<p>" + esc(sc.info) + "</p>" +
        '<span class="bar"><span class="pill">' + faecher.length + " Fächer</span>" +
        '<span class="pill">' + themen + " Themen</span>" +
        '<span class="pill">Klasse 5–10</span></span></button>';
    });
    html += "</div>";
    return html;
  }

  function crumbs(parts) {
    return '<div class="crumbs">' + parts.map(function (p, i) {
      var last = i === parts.length - 1;
      return (last ? "<span>" + esc(p.label) + "</span>"
        : '<a href="' + p.href + '">' + esc(p.label) + "</a>") +
        (last ? "" : '<span class="sep">›</span>');
    }).join("") + "</div>";
  }

  function viewFach() {
    var sc = C[state.schule], sub = sc.subjects[state.fach];
    var kl = String(state.klasse);
    var themes = sub.themen[kl] || [];
    var html = crumbs([
      { label: "Start", href: "#/" },
      { label: sc.name, href: "#/s/" + state.schule },
      { label: "Klasse " + state.klasse, href: "#/s/" + state.schule + "/" + state.klasse },
      { label: sub.name }
    ]);
    html += '<div class="hero"><h1>' + sub.icon + " " + esc(sub.name) +
      ' <span class="accent">Klasse ' + state.klasse + "</span></h1>" +
      '<p class="lede">' + themes.length + " Themen aus dem Fachlehrplan " + esc(sub.name) +
      " für die " + state.klasse + ". Jahrgangsstufe an der " + esc(sc.name) + ".</p>" +
      '<div class="hero-meta"><span class="badge schule">' + sc.deco + " " + esc(sc.name) + "</span>" +
      '<span class="badge">Klasse <b>' + state.klasse + "</b></span>" +
      '<span class="badge">Themen <b>' + themes.length + "</b></span></div></div>";

    html += '<div class="section-head"><h2>Themen</h2><span class="hint">Merkblatt, Karteikarten und Übungen</span></div>';
    if (!themes.length) {
      html += '<div class="empty">Für dieses Fach liegen in Klasse ' + state.klasse + " keine Themen vor.</div>";
    } else {
      html += '<div class="theme-grid">';
      themes.forEach(function (th, i) {
        var key = themeKey(state.schule, state.fach, state.klasse, i);
        var pr = progress.themes[key];
        var pct = pr ? Math.round(pr.best / pr.total * 100) : 0;
        var check = pr && pr.done ? '<span class="check" title="geschafft">✅</span>' : "";
        html += '<button class="theme-card" data-theme="' + i + '">' + check +
          "<h3>" + esc(th.t) + "</h3><p>" + esc(th.d) + "</p>" +
          '<div class="meta"><span class="count">' + (th.q ? th.q.length + " + " : "") +
          (th.f ? th.f.length : 0) + " Karten</span>" +
          '<span class="progress-mini"><i style="width:' + pct + '%"></i></span>' +
          '<span class="count">' + pct + "%</span></div>" +
          '<div class="meta" style="margin-top:6px"><span style="font-family:JetBrains Mono,monospace;font-size:11px">' +
          esc(th.l || "") + "</span></div></button>";
      });
      html += "</div>";
    }
    return html;
  }

  function viewKlasse() {
    var sc = C[state.schule];
    var subs = subjectList(state.schule, state.klasse);
    var html = crumbs([
      { label: "Start", href: "#/" },
      { label: sc.name, href: "#/s/" + state.schule },
      { label: "Klasse " + state.klasse }
    ]);
    html += '<div class="hero"><h1>' + sc.deco + " " + esc(sc.name) +
      ' <span class="accent">Klasse ' + state.klasse + "</span></h1>" +
      '<p class="lede">Alle Fächer der ' + state.klasse + '. Jahrgangsstufe im Überblick.</p></div>';
    html += '<div class="section-head"><h2>Fächer</h2><span class="hint">' + subs.length + " Fächer</span></div>";
    html += '<div class="theme-grid">';
    subs.forEach(function (o) {
      var th = o.sub.themen[String(state.klasse)] || [];
      html += '<button class="theme-card" data-gofach="' + o.key + '" style="--fach-color:' + o.sub.color + '">' +
        "<h3>" + o.sub.icon + " " + esc(o.sub.name) + "</h3>" +
        "<p>" + th.length + " Themen für Klasse " + state.klasse + "</p>" +
        '<div class="meta"><span class="count">' + th.length + " Themen</span></div></button>";
    });
    html += "</div>";
    return html;
  }

  function viewSchule() {
    var sc = C[state.schule];
    var subs = subjectList(state.schule, null);
    var html = crumbs([{ label: "Start", href: "#/" }, { label: sc.name }]);
    html += '<div class="hero"><h1>' + sc.deco + " " + esc(sc.name) + "</h1>" +
      '<p class="lede">' + esc(sc.info) + "</p>" +
      '<div class="hero-meta"><span class="badge">Fächer <b>' + subs.length + "</b></span>" +
      '<span class="badge">Klassen <b>5–10</b></span></div></div>';
    html += '<div class="section-head"><h2>Fächer</h2><span class="hint">Wähle oben auch eine Klasse</span></div>';
    html += '<div class="theme-grid">';
    subs.forEach(function (o) {
      var total = 0;
      Object.keys(o.sub.themen).forEach(function (kl) { total += o.sub.themen[kl].length; });
      html += '<button class="theme-card" data-gofach="' + o.key + '" style="--fach-color:' + o.sub.color + '">' +
        "<h3>" + o.sub.icon + " " + esc(o.sub.name) + "</h3>" +
        "<p>Klassen " + o.sub.klassen.join(", ") + "</p>" +
        '<div class="meta"><span class="count">' + total + " Themen</span></div></button>";
    });
    html += "</div>";
    return html;
  }

  /* ---------------- Themenseite: Merkblatt + Start ---------------- */
  function viewTheme(idx) {
    var sc = C[state.schule], sub = sc.subjects[state.fach];
    var th = sub.themen[String(state.klasse)][idx];
    var key = themeKey(state.schule, state.fach, state.klasse, idx);
    var pr = progress.themes[key];
    var html = crumbs([
      { label: "Start", href: "#/" },
      { label: sc.name, href: "#/s/" + state.schule },
      { label: "Klasse " + state.klasse, href: "#/s/" + state.schule + "/" + state.klasse },
      { label: sub.name, href: "#/s/" + state.schule + "/" + state.klasse + "/" + state.fach },
      { label: th.t }
    ]);
    html += '<div class="hero"><h1>' + esc(th.t) + "</h1><p class=\"lede\">" + esc(th.d) + "</p>" +
      '<div class="hero-meta"><span class="badge schule">' + sc.deco + " " + esc(sc.name) + "</span>" +
      '<span class="badge">Klasse <b>' + state.klasse + "</b></span>" +
      '<span class="badge">' + esc(sub.name) + "</span>" +
      '<span class="badge">Lehrplan <b>' + esc(th.l || "–") + "</b></span>" +
      (pr && pr.done ? '<span class="badge" style="background:var(--green-soft);border-color:var(--green)">✅ geschafft</span>' : "") +
      "</div></div>";

    // Merkblatt
    html += '<div class="section-head"><h2>Merkblatt</h2><span class="hint">Das musst du wissen</span></div>';
    html += '<div class="theme-grid" style="grid-template-columns:repeat(auto-fill,minmax(300px,1fr))">';
    (th.f || []).forEach(function (f) {
      html += '<div class="task" style="margin:0"><div class="task-head" style="margin:0">' +
        '<span class="task-no" style="background:' + sub.color + '">' + esc(f[0]) + "</span></div>" +
        '<div class="task-q">' + esc(f[1]) + "</div></div>";
    });
    html += "</div>";

    html += '<div class="view-actions"><button class="btn fach" id="start-uebung">Übung starten ▶</button>' +
      '<button class="btn ghost" id="start-karten">Karteikarten üben</button>' +
      '<a class="btn ghost" href="#/s/' + state.schule + "/" + state.klasse + "/" + state.fach + '">‹ zurück</a></div>';
    return html;
  }

  /* ---------------- Übungssitzung ---------------- */
  function startSession(idx, mode) {
    var sc = C[state.schule], sub = sc.subjects[state.fach];
    var th = sub.themen[String(state.klasse)][idx];
    var tasks = E.buildTasks(th, { subjectKey: state.fach, grade: Number(state.klasse) });
    if (mode === "karten") {
      tasks = (th.f || []).map(function (f, i) {
        return { k: "flip", _id: "flip-" + i, q: f[0], a: f[1], e: f[0] + " – " + f[1] };
      });
    }
    session = {
      idx: idx, theme: th, tasks: tasks, mode: mode || "uebung",
      results: {}, cursor: 0, answered: 0, correct: 0
    };
    renderSession();
  }

  function renderSession() {
    var sc = C[state.schule], sub = sc.subjects[state.fach];
    var html = crumbs([
      { label: "Start", href: "#/" },
      { label: sc.name, href: "#/s/" + state.schule },
      { label: "Klasse " + state.klasse, href: "#/s/" + state.schule + "/" + state.klasse },
      { label: sub.name, href: "#/s/" + state.schule + "/" + state.klasse + "/" + state.fach },
      { label: session.theme.t, href: "#/s/" + state.schule + "/" + state.klasse + "/" + state.fach + "/" + session.idx },
      { label: session.mode === "karten" ? "Karteikarten" : "Übung" }
    ]);
    html += '<div class="hero"><h1>' + esc(session.theme.t) + "</h1>" +
      '<p class="lede">' + (session.mode === "karten"
        ? "Karteikarten: erst überlegen, dann aufdecken."
        : "Beantworte alle Aufgaben. Du bekommst sofort Rückmeldung.") + "</p></div>";

    var total = session.tasks.length;
    html += '<div class="taskbar"><div class="progress-big"><i id="pb" style="width:' +
      (session.answered / total * 100) + '%"></i></div>' +
      '<span class="counter" id="counter">' + session.answered + " / " + total +
      " gelöst · " + session.correct + " richtig</span></div>";

    html += '<div id="tasks">';
    session.tasks.forEach(function (t, i) { html += renderTask(t, i); });
    html += "</div>";

    html += '<div class="view-actions"><button class="btn fach" id="finish">Auswertung anzeigen</button>' +
      '<button class="btn ghost" id="again">Neu mischen</button>' +
      '<a class="btn ghost" href="#/s/' + state.schule + "/" + state.klasse + "/" + state.fach + "/" + session.idx + '">‹ Thema</a></div>';
    $("#view").innerHTML = html;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function renderTask(t, i) {
    var n = i + 1;
    var body = "";
    if (t.k === "mc") {
      body = '<div class="opts">' + t.o.map(function (o, oi) {
        return '<button class="opt" data-task="' + i + '" data-opt="' + oi + '">' +
          '<span class="key">' + "ABCD"[oi] + "</span><span>" + o + "</span></button>";
      }).join("") + "</div>";
    } else if (t.k === "tf") {
      body = '<div class="opts">' +
        '<button class="opt" data-task="' + i + '" data-tf="1"><span class="key">✓</span><span>Wahr</span></button>' +
        '<button class="opt" data-task="' + i + '" data-tf="0"><span class="key">✗</span><span>Falsch</span></button></div>';
    } else if (t.k === "num" || t.k === "gap") {
      if (t.k === "gap") {
        var parts = String(t.q).split(/\[\[(\d+)\]\]/);
        var ghtml = "";
        parts.forEach(function (p) {
          if (/^\d+$/.test(p) && parts.indexOf(p) > 0) {
            var gi = Number(p) - 1;
            ghtml += '<input type="text" data-gap="' + gi + '" data-gapi="' + i + '" autocomplete="off" size="10">';
          } else if (p) {
            ghtml += esc(p);
          }
        });
        body = '<div class="gaps">' + ghtml + "</div>" +
          '<div class="view-actions" style="margin-top:12px"><button class="btn small fach" data-check="' + i + '">Prüfen</button></div>';
      } else {
        body = '<div class="input-row"><input type="text" inputmode="decimal" data-input="' + i +
          '" placeholder="Zahl eingeben" autocomplete="off">' +
          (t.unit ? '<span class="unit">' + esc(t.unit) + "</span>" : "") +
          '<button class="btn small fach" data-check="' + i + '">Prüfen</button></div>';
      }
    } else if (t.k === "order") {
      body = '<div class="order-list" data-order="' + i + '">' + t.display.map(function (x, oi) {
        return '<div class="order-item" data-oi="' + oi + '"><span class="grip">≡</span>' +
          '<span class="num">' + (oi + 1) + "</span><span>" + esc(x) + "</span></div>";
      }).join("") + "</div>" +
        '<div class="view-actions" style="margin-top:12px"><button class="btn small fach" data-check="' + i + '">Prüfen</button></div>';
    } else if (t.k === "match") {
      body = '<div class="match-grid" data-match="' + i + '">' +
        '<div class="match-col">' + t.left.map(function (x, li) {
          return '<button class="match-item" data-side="L" data-li="' + li + '">' + esc(x) + "</button>";
        }).join("") + "</div>" +
        '<div class="match-col">' + t.right.map(function (x, ri) {
          return '<button class="match-item" data-side="R" data-ri="' + ri + '">' + esc(x) + "</button>";
        }).join("") + "</div></div>" +
        '<div class="view-actions" style="margin-top:12px"><button class="btn small fach" data-check="' + i + '">Prüfen</button></div>';
    } else if (t.k === "flip") {
      body = '<div class="view-actions"><button class="btn small fach" data-flip="' + i + '">Aufdecken</button></div>';
    }
    return '<div class="task" id="task-' + i + '" data-kind="' + t.k + '">' +
      '<div class="task-head"><span class="task-no">' + n + "</span>" +
      '<div class="task-q">' + t.q + (t.unit ? ' <span class="unit">in ' + esc(t.unit) + "</span>" : "") + "</div></div>" +
      body + '<div class="fb-slot"></div></div>';
  }

  /* ---------------- Antworten prüfen ---------------- */
  function markSolved(i, ok, res) {
    var t = session.tasks[i];
    if (session.results[i] == null) {
      session.answered++;
      if (ok) session.correct++;
      progress.answered++;
      if (ok) { progress.correct++; progress.xp += 10; }
      saveProgress();
    }
    session.results[i] = ok;
    renderHud();
    var pb = $("#pb"); if (pb) pb.style.width = (session.answered / session.tasks.length * 100) + "%";
    var c = $("#counter"); if (c) c.textContent = session.answered + " / " + session.tasks.length +
      " gelöst · " + session.correct + " richtig";
    var slot = $("#task-" + i + " .fb-slot");
    if (slot) {
      slot.innerHTML = '<div class="feedback ' + (ok ? "ok" : "no") + '">' +
        '<div class="fb-title">' + (ok ? "✓ Richtig!" : "✗ Leider falsch") + "</div>" +
        (!ok ? '<div class="sol">Lösung: ' + esc(res.correctText) + "</div>" : "") +
        (res.explanation ? "<p>" + res.explanation + "</p>" : "") + "</div>";
    }
  }

  function onTaskClick(e) {
    var btn = e.target.closest("[data-opt],[data-tf],[data-check],[data-flip],[data-side]");
    if (!btn) return;
    var taskEl = btn.closest(".task");
    var i = Number(taskEl.id.replace("task-", ""));
    var t = session.tasks[i];

    if (btn.hasAttribute("data-opt")) {
      var oi = Number(btn.getAttribute("data-opt"));
      var res = E.checkAnswer(t, oi);
      $$(".opt", taskEl).forEach(function (b) {
        b.disabled = true;
        var bi = Number(b.getAttribute("data-opt"));
        if (bi === t.c) b.classList.add("correct");
        else if (bi === oi) b.classList.add("wrong");
      });
      markSolved(i, res.ok, res);
    } else if (btn.hasAttribute("data-tf")) {
      var val = btn.getAttribute("data-tf") === "1";
      var res2 = E.checkAnswer(t, val);
      $$(".opt", taskEl).forEach(function (b) {
        b.disabled = true;
        var bv = b.getAttribute("data-tf") === "1";
        if (bv === t.a) b.classList.add("correct");
        else if (bv === val) b.classList.add("wrong");
      });
      markSolved(i, res2.ok, res2);
    } else if (btn.hasAttribute("data-check")) {
      if (t.k === "num") {
        var inp = $('[data-input="' + i + '"]', taskEl);
        var res3 = E.checkAnswer(t, inp.value);
        inp.classList.add(res3.ok ? "correct" : "wrong");
        inp.disabled = true;
        btn.disabled = true;
        markSolved(i, res3.ok, res3);
      } else if (t.k === "gap") {
        var inputs = $$('[data-gapi="' + i + '"]', taskEl);
        var vals = inputs.map(function (el) { return el.value; });
        var resG = E.checkAnswer(t, vals);
        var accepted = (t.a || []).map(function (g) { return String(g).split("|"); });
        inputs.forEach(function (el, k) {
          var given = E.norm(el.value);
          var hit = accepted[k] && accepted[k].some(function (alt) { return E.norm(alt) === given; });
          el.classList.add(hit ? "correct" : "wrong");
          el.disabled = true;
        });
        btn.disabled = true;
        markSolved(i, resG.ok, resG);
      } else if (t.k === "order") {
        var order = $$(".order-item", taskEl).map(function (el) { return Number(el.getAttribute("data-oi")); });
        var res4 = E.checkAnswer(t, order);
        $$(".order-item", taskEl).forEach(function (el, k) {
          el.classList.add(order[k] === t.a[k] ? "correct" : "wrong");
        });
        btn.disabled = true;
        markSolved(i, res4.ok, res4);
      } else if (t.k === "match") {
        var res5 = E.checkAnswer(t, t._response || {});
        $$(".match-item", taskEl).forEach(function (b) { b.classList.add("done"); });
        btn.disabled = true;
        markSolved(i, res5.ok, res5);
      }
    } else if (btn.hasAttribute("data-flip")) {
      var slot = $("#task-" + i + " .fb-slot");
      if (!slot.innerHTML) {
        slot.innerHTML = '<div class="feedback ok"><div class="fb-title">💡 ' + esc(t.q) + "</div><p>" +
          esc(t.a) + "</p></div>";
      } else {
        slot.innerHTML = "";
      }
    } else if (btn.hasAttribute("data-side")) {
      handleMatchClick(taskEl, i, t, btn);
    }
  }

  function handleMatchClick(taskEl, i, t, btn) {
    if (!t._response) t._response = {};
    if (!t._selectedL) t._selectedL = null;
    var side = btn.getAttribute("data-side");
    if (side === "L") {
      $$('[data-side="L"]', taskEl).forEach(function (b) { b.classList.remove("sel"); });
      btn.classList.add("sel");
      t._selectedL = Number(btn.getAttribute("data-li"));
    } else {
      var ri = Number(btn.getAttribute("data-ri"));
      if (t._selectedL == null) { showToast("Zuerst links einen Begriff wählen.", "bad"); return; }
      t._response[t._selectedL] = ri;
      var lb = $('[data-side="L"][data-li="' + t._selectedL + '"]', taskEl);
      lb.classList.remove("sel");
      lb.classList.add("done");
      btn.classList.add("done");
      lb.setAttribute("data-pair", ri);
      t._selectedL = null;
    }
  }

  /* ---------------- Auswertung ---------------- */
  function showResult() {
    var total = session.tasks.length;
    var pct = total ? Math.round(session.correct / total * 100) : 0;
    var stars = pct >= 90 ? "★★★★★" : pct >= 75 ? "★★★★☆" : pct >= 50 ? "★★★☆☆" : pct >= 25 ? "★★☆☆☆" : "★☆☆☆☆";
    var key = themeKey(state.schule, state.fach, state.klasse, session.idx);
    var prev = progress.themes[key] || { best: 0, total: total, done: false };
    prev.total = total;
    prev.best = Math.max(prev.best, session.correct);
    if (pct >= 60) prev.done = true;
    progress.themes[key] = prev;
    saveProgress();

    var msg = pct >= 90 ? "Hervorragend! Das Thema sitzt." :
      pct >= 60 ? "Gut gemacht! Du hast das Thema geschafft." :
      pct >= 40 ? "Fast! Schau dir das Merkblatt noch einmal an." :
      "Noch nicht ganz – wiederhole das Merkblatt und probiere es erneut.";
    $("#view").innerHTML =
      '<div class="result-card"><div class="score">' + pct + "%</div>" +
      '<div class="stars">' + stars + "</div>" +
      "<h2>" + session.correct + " von " + total + " richtig</h2>" +
      "<p>" + msg + "</p>" +
      '<div class="view-actions" style="justify-content:center">' +
      '<button class="btn fach" id="again2">Nochmal üben</button>' +
      '<a class="btn ghost" href="#/s/' + state.schule + "/" + state.klasse + "/" + state.fach + '">Weitere Themen</a>' +
      "</div></div>";
    window.scrollTo({ top: 0, behavior: "smooth" });
    showToast(pct >= 60 ? "Thema geschafft! +" + (session.correct * 10) + " XP" : "Weiter üben!", pct >= 60 ? "good" : "bad");
  }

  /* ---------------- Toast ---------------- */
  var toastTimer;
  function showToast(msg, kind) {
    var el = $("#toast");
    el.textContent = msg;
    el.className = "toast show" + (kind ? " " + kind : "");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.className = "toast"; }, 2600);
  }

  /* ---------------- Routing ---------------- */
  function route() {
    var h = location.hash.replace(/^#\/?/, "");
    var parts = h ? h.split("/") : [];
    session = null;
    if (parts[0] === "s" && parts[1]) {
      state.schule = C[parts[1]] ? parts[1] : null;
      state.klasse = parts[2] ? Number(parts[2]) : state.klasse;
      state.fach = parts[3] && C[state.schule].subjects[parts[3]] ? parts[3] : null;
      if (state.fach && parts[2] &&
          C[state.schule].subjects[state.fach].klassen.indexOf(Number(parts[2])) === -1) {
        state.fach = null;
      }
    }
    renderChooser();
    renderHud();
    var v = $("#view");
    if (parts[0] === "s" && parts[1] && state.fach && parts[4] != null) {
      v.innerHTML = viewTheme(Number(parts[4]));
    } else if (parts[0] === "s" && parts[1] && state.fach) {
      v.innerHTML = viewFach();
    } else if (parts[0] === "s" && parts[1] && parts[2]) {
      v.innerHTML = viewKlasse();
    } else if (parts[0] === "s" && parts[1]) {
      v.innerHTML = viewSchule();
    } else {
      v.innerHTML = viewHome();
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function go(hash) { location.hash = hash; }

  /* ---------------- Events ---------------- */
  function bind() {
    document.addEventListener("click", function (e) {
      var chip = e.target.closest(".chip");
      if (chip) {
        if (chip.dataset.schule) {
          state.schule = chip.dataset.schule; state.fach = null;
          go("#/s/" + state.schule + (state.klasse ? "/" + state.klasse : ""));
        } else if (chip.dataset.klasse) {
          state.klasse = Number(chip.dataset.klasse);
          if (state.schule) go("#/s/" + state.schule + "/" + state.klasse);
          else { renderChooser(); }
        } else if (chip.dataset.fach) {
          state.fach = chip.dataset.fach;
          go("#/s/" + state.schule + "/" + state.klasse + "/" + state.fach);
        }
        return;
      }
      var sc = e.target.closest(".school-card");
      if (sc && sc.dataset.schule) { go("#/s/" + sc.dataset.schule); return; }
      var gf = e.target.closest("[data-gofach]");
      if (gf) { go("#/s/" + state.schule + "/" + state.klasse + "/" + gf.dataset.gofach); return; }
      var tc = e.target.closest("[data-theme]");
      if (tc) { go("#/s/" + state.schule + "/" + state.klasse + "/" + state.fach + "/" + tc.dataset.theme); return; }

      if (e.target.id === "start-uebung") { startSession(Number(currentThemeIdx()), "uebung"); return; }
      if (e.target.id === "start-karten") { startSession(Number(currentThemeIdx()), "karten"); return; }
      if (e.target.id === "again" || e.target.id === "again2") { startSession(session ? session.idx : Number(currentThemeIdx()), "uebung"); return; }
      if (e.target.id === "finish") { showResult(); return; }
      if (e.target.closest("#tasks")) { onTaskClick(e); return; }
    });

    window.addEventListener("hashchange", route);

    document.addEventListener("keydown", function (e) {
      if (e.key !== "Enter") return;
      var el = e.target;
      if (el && (el.hasAttribute("data-input") || el.hasAttribute("data-gap"))) {
        var task = el.closest(".task");
        var cb = task && task.querySelector("[data-check]");
        if (cb) { cb.click(); }
      }
    });

    var search = $("#search");
    search.addEventListener("input", function () {
      state.search = search.value.trim().toLowerCase();
      runSearch(state.search);
    });
    $("#btn-help").addEventListener("click", openHelp);
    $("#modal-close").addEventListener("click", closeModal);
    $("#modal").addEventListener("click", function (e) { if (e.target.id === "modal") closeModal(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeModal(); });
    $("#btn-reset").addEventListener("click", function () {
      if (confirm("Fortschritt wirklich zurücksetzen?")) {
        progress = { xp: 0, answered: 0, correct: 0, themes: {} };
        saveProgress(); renderHud(); renderChooser();
        showToast("Fortschritt zurückgesetzt.", "bad");
      }
    });
  }

  function currentThemeIdx() {
    var h = location.hash.replace(/^#\/?/, "").split("/");
    return h[4];
  }

  function runSearch(q) {
    var v = $("#view");
    if (!q) { route(); return; }
    var results = [];
    var schools = ORDER;
    schools.forEach(function (sk) {
      var subs = C[sk].subjects;
      Object.keys(subs).forEach(function (fk) {
        var s = subs[fk];
        Object.keys(s.themen).forEach(function (kl) {
          s.themen[kl].forEach(function (th, i) {
            var hay = (th.t + " " + th.d + " " + th.l + " " +
              (th.f || []).map(function (f) { return f[0] + " " + f[1]; }).join(" ")).toLowerCase();
            if (hay.indexOf(q) !== -1) {
              results.push({ sk: sk, fk: fk, kl: kl, i: i, th: th, sub: s });
            }
          });
        });
      });
    });
    var html = '<div class="hero"><h1>Suchergebnisse</h1><p class="lede">' +
      results.length + ' Treffer für „' + esc(q) + '“ – in allen Schularten und Klassen.</p></div>';
    if (!results.length) {
      html += '<div class="empty">Keine Themen gefunden. Probiere ein anderes Stichwort.</div>';
    } else {
      html += '<div class="theme-grid">';
      results.slice(0, 60).forEach(function (r) {
        html += '<button class="theme-card" data-sr="' + r.sk + "|" + r.fk + "|" + r.kl + "|" + r.i +
          '" style="--fach-color:' + r.sub.color + '">' +
          "<h3>" + esc(r.th.t) + "</h3><p>" + esc(r.th.d) + "</p>" +
          '<div class="meta"><span class="count">' + C[r.sk].name + " · " + esc(r.sub.name) +
          " · Kl. " + r.kl + "</span></div></button>";
      });
      html += "</div>";
    }
    v.innerHTML = html;
    $$("[data-sr]", v).forEach(function (b) {
      b.addEventListener("click", function () {
        var p = b.dataset.sr.split("|");
        state.schule = p[0]; state.fach = p[1]; state.klasse = Number(p[2]);
        $("#search").value = ""; state.search = "";
        go("#/s/" + p[0] + "/" + p[2] + "/" + p[1] + "/" + p[3]);
      });
    });
  }

  /* ---------------- Hilfe ---------------- */
  function openHelp() {
    $("#modal-body").innerHTML =
      "<h2>So funktioniert der LehrplanTrainer</h2>" +
      "<p>Diese Seite übt die Inhalte des bayerischen Lehrplans <strong>LehrplanPLUS</strong> für " +
      "Realschule, Gymnasium und Mittelschule, Klasse 5 bis 10.</p>" +
      "<h3>1. Auswählen</h3><p>Oben wählst du Schulart, Jahrgangsstufe und Fach. Über das Suchfeld findest du " +
      "Themen auch direkt, z. B. „Bruch“, „Satzglieder“ oder „Photosynthese“.</p>" +
      "<h3>2. Merkblatt lesen</h3><p>Jedes Thema hat ein Merkblatt mit den wichtigsten Begriffen und Regeln.</p>" +
      "<h3>3. Üben</h3><p>Der Übungssatz mischt vier Aufgabentypen: " +
      "<code>Multiple Choice</code>, <code>Lückentext/Zahl eingeben</code>, <code>Zuordnen</code> und " +
      "<code>Wahr/Falsch</code>. In Mathematik kommen automatisch Rechenaufgaben mit neuen Zahlen dazu. " +
      "Du bekommst sofort Rückmeldung mit Lösung und Erklärung.</p>" +
      "<h3>4. Fortschritt</h3><p>Richtige Antworten bringen XP. Ab 60 % gilt ein Thema als geschafft. " +
      "Der Fortschritt wird nur lokal im Browser gespeichert.</p>" +
      "<h3>Quelle</h3><p>Lehrplanstruktur nach <a href=\"https://www.lehrplanplus.bayern.de\" target=\"_blank\" rel=\"noopener\">lehrplanplus.bayern.de</a> " +
      "(Staatsinstitut für Schulqualität und Bildungsforschung, ISB). Die Aufgaben sind eigene Übungen.</p>";
    $("#modal").hidden = false;
  }
  function closeModal() { $("#modal").hidden = true; }

  /* ---------------- Start ---------------- */
  bind();
  route();
  window.addEventListener("load", renderHud);
})();
