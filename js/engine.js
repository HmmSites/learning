/* =====================================================================
   engine.js – Aufgaben-Engine
   Baut aus einem Thema einen gemischten Aufgabensatz:
     1. explizite Aufgaben (q[]) aus den Lehrplandaten
     2. automatische Wissens-Checks aus den Merkblatt-Einträgen (f[])
     3. Mathe-Generatoren mit zufälligen Zahlen
   und prüft Antworten.
   ===================================================================== */
(function (global) {
  "use strict";

  /* ---------- Hilfsfunktionen ---------- */
  function shuffle(arr, rnd) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor((rnd || Math.random)() * (i + 1));
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }
  function pick(arr, n, rnd) { return shuffle(arr, rnd).slice(0, n); }

  // Normalisierung für Textvergleiche: klein, ohne Satzzeichen,
  // Umlaute/ß auf gängige Ersatzschreibweisen abbilden.
  function norm(s) {
    return String(s == null ? "" : s)
      .toLowerCase()
      .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
      .replace(/[.,;:!?"'`´’()\[\]{}\s\-–—/\\]+/g, "");
  }
  function numNorm(s) {
    var t = String(s == null ? "" : s).trim().replace(/\s/g, "").replace(",", ".");
    if (!/^[-+]?\d*\.?\d+$/.test(t)) return NaN;
    return parseFloat(t);
  }

  /* ---------- Antwortprüfung ---------- */
  function checkAnswer(task, response) {
    var ok = false, correctText = "", explanation = task.e || "";
    switch (task.k) {
      case "mc": {
        var ci = task.c;
        ok = response === ci;
        correctText = task.o[ci];
        break;
      }
      case "tf": {
        ok = response === task.a;
        correctText = task.a ? "Wahr" : "Falsch";
        break;
      }
      case "num": {
        var v = numNorm(response);
        var target = typeof task.a === "number" ? task.a : numNorm(task.a);
        var tol = task.tol != null ? task.tol : 0.005;
        ok = !isNaN(v) && Math.abs(v - target) <= Math.max(tol, Math.abs(target) * 0.001);
        correctText = String(task.a);
        if (task.unit) correctText += " " + task.unit;
        break;
      }
      case "gap": {
        var accepted = (task.a || []).map(function (group) {
          return String(group).split("|");
        });
        var vals = Array.isArray(response) ? response : [response];
        ok = accepted.length > 0 && vals.length === accepted.length;
        if (ok) {
          for (var i = 0; i < accepted.length; i++) {
            var given = norm(vals[i]);
            var hit = accepted[i].some(function (alt) { return norm(alt) === given; });
            if (!hit) { ok = false; break; }
          }
        }
        correctText = accepted.map(function (g) { return g[0]; }).join(", ");
        break;
      }
      case "order": {
        var sol = task.a;
        ok = Array.isArray(response) && response.length === sol.length &&
             response.every(function (x, i) { return x === sol[i]; });
        correctText = sol.join(" → ");
        break;
      }
      case "match": {
        // response: {leftIndex: rightIndex}; geprüft wird die Zuordnung
        var solPairs = task.pairs;
        ok = response && Object.keys(response).length === solPairs.length;
        if (ok) {
          for (var li = 0; li < solPairs.length; li++) {
            var want = solPairs[li][1];
            var got = response[li] != null ? task.right[response[li]] : null;
            if (got !== want) { ok = false; break; }
          }
        }
        correctText = solPairs.map(function (p) { return p[0] + " = " + p[1]; }).join("; ");
        break;
      }
      default:
        ok = false;
    }
    return { ok: ok, correctText: correctText, explanation: explanation };
  }

  /* ---------- Automatische Wissens-Checks aus Merkblatt-Einträgen ---------- */
  // Einträge mit gleicher Erklärung sind für Zuordnungs-/Wahr-Falsch-Aufgaben
  // mehrdeutig (zwei Begriffe, dieselbe Bedeutung) und werden verworfen.
  function unambiguousFacts(facts) {
    if (!facts) return [];
    var seen = {};
    return facts.filter(function (f) {
      var key = norm(f[1]);
      if (!key || seen[key]) return false;
      seen[key] = true;
      return true;
    });
  }

  function buildFromFacts(rawFacts, rnd) {
    var tasks = [];
    var facts = unambiguousFacts(rawFacts);
    if (facts.length < 2) {
      return tasks;
    }
    facts.forEach(function (fact, idx) {
      var term = fact[0], meaning = fact[1];
      // MC: Welche Erklärung passt zum Begriff?
      var distractors = pick(facts.filter(function (_, i) { return i !== idx; })
        .map(function (f) { return f[1]; }), 3, rnd);
      var options = shuffle([meaning].concat(distractors), rnd);
      tasks.push({
        k: "mc",
        q: "Was bedeutet <b>" + escapeHtml(term) + "</b>?",
        o: options.map(escapeHtml),
        c: options.indexOf(meaning),
        e: term + " – " + meaning,
        _fact: true
      });
    });
    // Wahr/Falsch: Begriff und eine (evtl. falsche) Erklärung
    facts.forEach(function (fact, idx) {
      var others = facts.filter(function (_, i) { return i !== idx; });
      var useCorrect = rnd() < 0.5 || others.length === 0;
      var partner = useCorrect ? fact : others[Math.floor(rnd() * others.length)];
      tasks.push({
        k: "tf",
        q: "Stimmt diese Aussage?<br><b>" + escapeHtml(fact[0]) + "</b> bedeutet: " + escapeHtml(partner[1]),
        a: useCorrect,
        e: fact[0] + " – " + fact[1],
        _fact: true
      });
    });
    return tasks;
  }

  function buildMatchFromFacts(rawFacts, rnd) {
    var facts = unambiguousFacts(rawFacts);
    if (facts.length < 2) return null;
    var chosen = pick(facts, Math.min(4, facts.length), rnd);
    var left = chosen.map(function (f) { return f[0]; });
    var right = shuffle(chosen.map(function (f) { return f[1]; }), rnd);
    return {
      k: "match",
      q: "Ordne Begriff und Erklärung zu.",
      pairs: chosen.map(function (f) { return [f[0], f[1]]; }),
      left: left,
      right: right,
      e: "Begriffe sicher verknüpfen."
    };
  }

  /* ---------- Mathe-Generatoren ---------- */
  function ri(min, max, rnd) { return Math.floor(rnd() * (max - min + 1)) + min; }

  var GENERATORS = {
    grundrechnen: function (g, rnd) {
      var a = ri(2, 20 + g * 8, rnd), b = ri(2, 12 + g * 4, rnd);
      var ops = ["+", "−", "·"];
      var op = ops[Math.floor(rnd() * ops.length)];
      if (op === "−" && b > a) { var tmp = a; a = b; b = tmp; }
      var val = op === "+" ? a + b : op === "−" ? a - b : a * b;
      return { k: "num", q: "Berechne: " + a + " " + op + " " + b, a: val,
        e: "Grundrechenart sicher ausführen." };
    },
    runden: function (g, rnd) {
      var step = [10, 100, 1000][ri(0, 2, rnd)];
      var n = ri(step * 10, step * 999, rnd);
      return { k: "num", q: "Runde " + n.toLocaleString("de-DE") + " auf " +
        (step === 10 ? "Zehner" : step === 100 ? "Hunderter" : "Tausender") + ".",
        a: Math.round(n / step) * step, e: "Auf die nächstgelegene Stelle runden." };
    },
    bruch: function (g, rnd) {
      var n1 = ri(1, 5, rnd), d1 = ri(n1 + 1, 8, rnd);
      var n2 = ri(1, 4, rnd), d2 = ri(n2 + 1, 8, rnd);
      var z = n1 * d2 + n2 * d1, nn = d1 * d2;
      return { k: "num", q: "Berechne " + n1 + "/" + d1 + " + " + n2 + "/" + d2 +
        " = z/n. Wie groß ist der Zähler z vor dem Kürzen?", a: z,
        e: "Gleichnamig machen: " + (n1 * d2) + "/" + nn + " + " + (n2 * d1) + "/" + nn + " = " + z + "/" + nn + "." };
    },
    prozent: function (g, rnd) {
      var p = [5, 10, 20, 25, 50, 75][ri(0, 5, rnd)];
      var base = [20, 40, 50, 80, 120, 200, 400][ri(0, 6, rnd)];
      return { k: "num", q: "Wie viel sind " + p + " % von " + base + "?",
        a: base * p / 100, e: base + " · " + (p / 100) + " = " + (base * p / 100) + "." };
    },
    gleichung: function (g, rnd) {
      var x = ri(1, 12, rnd), a = ri(2, 6, rnd), b = ri(1, 15, rnd);
      return { k: "num", q: "Löse die Gleichung: " + a + "x + " + b + " = " + (a * x + b) + ". Wie groß ist x?",
        a: x, e: a + "x = " + (a * x) + " → x = " + x + "." };
    },
    potenz: function (g, rnd) {
      var a = ri(2, 5, rnd), m = ri(2, 3, rnd), n = ri(1, 2, rnd);
      return { k: "num", q: "Berechne " + a + "^" + m + " · " + a + "^" + n + ".",
        a: Math.pow(a, m + n), e: a + "^" + (m + n) + " = " + Math.pow(a, m + n) + " (Exponenten addieren)." };
    },
    pythagoras: function (g, rnd) {
      var triples = [[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17], [9, 12, 15]];
      var t = triples[ri(0, triples.length - 1, rnd)];
      return { k: "num", q: "Rechtwinkliges Dreieck mit Katheten " + t[0] + " cm und " + t[1] +
        " cm. Wie lang ist die Hypotenuse in cm?", a: t[2],
        e: t[0] + "² + " + t[1] + "² = " + t[2] + "² → c = " + t[2] + " cm." };
    },
    flaeche: function (g, rnd) {
      var a = ri(3, 12, rnd), b = ri(3, 12, rnd);
      return { k: "num", q: "Rechteck mit a = " + a + " cm, b = " + b + " cm. Wie groß ist der Flächeninhalt in cm²?",
        a: a * b, e: "A = a · b = " + a + " · " + b + " = " + (a * b) + " cm²." };
    },
    kreis: function (g, rnd) {
      var r = ri(2, 10, rnd);
      return { k: "num", q: "Kreis mit Radius " + r + " cm. Fläche in cm² (π ≈ 3,14, auf 1 Dezimale)?",
        a: Math.round(3.14 * r * r * 10) / 10, tol: 0.05,
        e: "A = π · r² = 3,14 · " + r + "² = " + (Math.round(3.14 * r * r * 10) / 10) + " cm²." };
    },
    funktion: function (g, rnd) {
      var m = ri(-4, 5, rnd) || 2, t = ri(-8, 8, rnd), x = ri(-4, 6, rnd);
      return { k: "num", q: "Gegeben y = " + m + "x " + (t >= 0 ? "+ " + t : "− " + (-t)) +
        ". Wie groß ist y für x = " + x + "?", a: m * x + t,
        e: m + " · " + x + (t >= 0 ? " + " + t : " − " + (-t)) + " = " + (m * x + t) + "." };
    },
    zins: function (g, rnd) {
      var k = [100, 200, 500, 800, 1000][ri(0, 4, rnd)];
      var p = [2, 3, 4, 5][ri(0, 3, rnd)];
      return { k: "num", q: "Zinsen für " + k + " € zu " + p + " % in einem Jahr (in €)?",
        a: k * p / 100, e: "Z = K · p/100 = " + k + " · " + p + "/100 = " + (k * p / 100) + " €." };
    },
    wahrscheinlichkeit: function (g, rnd) {
      var n = [4, 6, 8, 10, 12, 20][ri(0, 5, rnd)];
      return { k: "mc", q: "Ein fairer " + n + "-seitiger Körper wird einmal geworfen. Wie groß ist die Wahrscheinlichkeit für eine bestimmte Zahl?",
        o: ["1/" + n, "1/" + (n - 1), "1/" + (n + 1), n + "/1"], c: 0,
        e: "Bei " + n + " gleich wahrscheinlichen Ergebnissen: P = 1/" + n + "." };
    },
    trigonometrie: function (g, rnd) {
      var angles = [[30, 0.5], [45, 0.707], [60, 0.866], [90, 1]];
      var a = angles[ri(0, angles.length - 1, rnd)];
      return { k: "num", q: "sin(" + a[0] + "°) ≈ ? (auf 3 Dezimalstellen)", a: a[1], tol: 0.002,
        e: "sin(" + a[0] + "°) ≈ " + a[1] + "." };
    },
    exponential: function (g, rnd) {
      var a = [2, 3, 5, 10][ri(0, 3, rnd)];
      var n = ri(2, 5, rnd);
      return { k: "num", q: "Berechne " + a + "^" + n + ".", a: Math.pow(a, n),
        e: a + "^" + n + " = " + Math.pow(a, n) + "." };
    }
  };

  // Welche Generatoren passen zu welcher Jahrgangsstufe?
  // Ordnet jedem Rechengenerator Stichwörter zu, damit die automatischen
  // Aufgaben zum jeweiligen Thema passen und nicht quer zum Lehrplan stehen.
  var GENERATOR_KEYWORDS = {
    grundrechnen: ["grundrechen", "rechnen", "natuerliche zahl", "zahlenraum", "kopfrechnen", "geld"],
    runden: ["runden", "ueberschlag", "schaetzen", "dezimal"],
    flaeche: ["flaeche", "umfang", "rechteck", "quadrat", "viereck", "geometrie"],
    bruch: ["bruch", "brueche", "bruchrechn", "rationale zahl", "dezimalbruch", "bruchteil"],
    prozent: ["prozent", "rabatt", "anteil", "verhaeltnis"],
    gleichung: ["gleichung", "terme", "termumformung", "lineare", "loesen", "variable"],
    potenz: ["potenz", "potenzgesetz", "potenzregel", "exponent", "wurzel"],
    pythagoras: ["pythagoras", "satz des", "rechtwinklig", "hypotenuse"],
    kreis: ["kreis", "zylinder", "kugel", "kegel", "radius", "durchmesser", "koerper"],
    funktion: ["funktion", "graph", "steigung", "ableit", "kurvendiskussion", "analysis", "gerade"],
    zins: ["zins", "kapital", "spar", "kredit", "wirtschaft", "rechnungswesen"],
    wahrscheinlichkeit: ["wahrscheinlich", "zufall", "stochastik", "statistik", "daten", "mittelwert"],
    trigonometrie: ["trigonometrie", "sinus", "kosinus", "tangens", "winkel", "dreieck"],
    exponential: ["exponential", "wachstum", "zerfall", "logarithmus", "e-funktion"],
  };

  function themeText(theme) {
    var parts = [theme.t || "", theme.d || "", theme.l || ""];
    (theme.f || []).forEach(function (f) { parts.push(f[0], f[1]); });
    (theme.q || []).forEach(function (q) { parts.push(q.q || ""); });
    return parts.join(" ").toLowerCase();
  }

  // Wählt nur Generatoren, deren Stichwörter im Thema vorkommen. Passt keiner,
  // bleibt der Übungssatz rein thematisch (keine fachfremden Rechenaufgaben).
  function generatorsFor(grade, theme) {
    var byGrade = [
      "grundrechnen", "runden", "flaeche", "bruch", "prozent", "gleichung",
      "potenz", "pythagoras", "kreis", "funktion", "zins", "wahrscheinlichkeit",
      "trigonometrie", "exponential"
    ];
    var allowed = byGrade.slice();
    if (grade <= 5) allowed = ["grundrechnen", "runden", "flaeche"];
    else if (grade === 6) allowed = ["grundrechnen", "runden", "bruch", "flaeche", "prozent"];
    else if (grade === 7) allowed = ["grundrechnen", "bruch", "prozent", "gleichung", "flaeche"];
    else if (grade === 8) allowed = ["gleichung", "potenz", "funktion", "kreis", "wahrscheinlichkeit"];
    else if (grade === 9) allowed = ["gleichung", "potenz", "pythagoras", "kreis", "funktion", "trigonometrie"];

    if (!theme) return allowed;
    var hay = themeText(theme);
    var matched = allowed.filter(function (name) {
      return GENERATOR_KEYWORDS[name].some(function (kw) { return hay.indexOf(kw) !== -1; });
    });
    return matched;
  }

  function buildGeneratorTasks(subjectKey, grade, count, rnd, theme) {
    if (subjectKey !== "mathematik") return [];
    var names = generatorsFor(grade, theme);
    if (!names.length) return [];
    var out = [];
    for (var i = 0; i < count; i++) {
      var name = names[Math.floor(rnd() * names.length)];
      var task = GENERATORS[name](grade, rnd);
      task._gen = true;
      task._id = "gen-" + name + "-" + i;
      out.push(task);
    }
    return out;
  }

  /* ---------- Aufgabensatz bauen ---------- */
  function buildTasks(theme, ctx) {
    var rnd = Math.random;
    var subjectKey = ctx.subjectKey;
    var grade = ctx.grade;
    var tasks = [];
    var uid = 0;
    function withId(t, kind) {
      t._id = kind + "-" + (uid++);
      return t;
    }

    // 1. explizite Aufgaben
    (theme.q || []).forEach(function (t) {
      var c = clone(t);
      if (c.k === "match") {
        c.left = c.pairs.map(function (p) { return p[0]; });
        c.right = shuffle(c.pairs.map(function (p) { return p[1]; }), rnd);
      }
      if (c.k === "order" && !c.display) {
        c.display = shuffle(c.a.slice(), rnd);
      }
      tasks.push(withId(c, "exp"));
    });

    // 2. Wissens-Checks aus den Merkblatt-Einträgen
    var auto = buildFromFacts(theme.f || [], rnd);
    // nur so viele Auto-MC/WF wie nötig, damit der Satz nicht zu lang wird
    var mc = auto.filter(function (t) { return t.k === "mc"; });
    var tf = auto.filter(function (t) { return t.k === "tf"; });
    pick(mc, Math.min(mc.length, 3), rnd).forEach(function (t) { tasks.push(withId(t, "fact")); });
    pick(tf, Math.min(tf.length, 2), rnd).forEach(function (t) { tasks.push(withId(t, "fact")); });

    var m = buildMatchFromFacts(theme.f || [], rnd);
    if (m) tasks.push(withId(m, "match"));

    // 3. Mathe-Generatoren (nur wenn sie zum Thema passen)
    buildGeneratorTasks(subjectKey, grade, 3, rnd, theme)
      .forEach(function (t) { tasks.push(t); });

    // 4. Fallback: sehr schlanke Themen bekommen mindestens eine Aufgabe
    if (!tasks.length && (theme.f || []).length) {
      tasks.push(withId({
        k: "tf",
        q: "Stimmt diese Aussage?<br><b>" + escapeHtml(theme.f[0][0]) + "</b> bedeutet: " + escapeHtml(theme.f[0][1]),
        a: true, e: theme.f[0][0] + " – " + theme.f[0][1]
      }, "fallback"));
    }

    // mischen, aber die expliziten Aufgaben zuerst behalten ist nicht nötig –
    // gemischte Reihenfolge erhöht die Abwechslung
    return shuffle(tasks, rnd);
  }

  function clone(o) { return JSON.parse(JSON.stringify(o)); }
  function escapeHtml(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  global.TaskEngine = {
    buildTasks: buildTasks,
    checkAnswer: checkAnswer,
    shuffle: shuffle,
    norm: norm,
    numNorm: numNorm,
    escapeHtml: escapeHtml
  };
})(window);
