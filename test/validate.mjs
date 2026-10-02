// Prüft die aufgeteilten Datendateien und die Aufgaben-Engine.
// Aufruf:  node test/validate.mjs
import fs from "fs";
import vm from "node:vm";

const files = [
  "data/schools.js",
  "data/subjects-grundschule.js",
  "data/subjects-mittelschule.js",
  "data/subjects-foerderschule.js",
  "data/subjects-realschule.js",
  "data/subjects-gymnasium.js",
  "data/subjects-wirtschaftsschule.js",
  "data/subjects-fachoberschule.js",
  "data/subjects-berufsoberschule.js",
  "data/curriculum.js",
  "js/engine.js",
];

const win = {};
const ctx = { window: win, console, Math, Date, JSON, Object, Array, String, Number };
vm.createContext(ctx);
for (const f of files) vm.runInContext(fs.readFileSync(f, "utf8"), ctx, { filename: f });

const C = win.CURRICULUM, ORDER = win.SCHOOL_ORDER, E = win.TaskEngine;
const problems = [];
let themen = 0, faecher = 0, tasks = 0;
const types = {};

// Baut zur Lösung einer Aufgabe die passende (richtige) Antwort.
function correctResponse(task) {
  switch (task.k) {
    case "mc": return task.c;
    case "tf": return task.a;
    case "num": return task.a;
    case "gap": return (task.a || []).map((g) => String(g).split("|")[0]);
    case "order": return task.a.slice();
    case "match": {
      const resp = {};
      task.right.forEach((text, ri) => {
        const li = task.pairs.findIndex((p) => p[1] === text);
        if (li >= 0) resp[li] = ri;
      });
      return resp;
    }
    default: return null;
  }
}

function check(tag, cond, msg) { if (!cond) problems.push(tag + ": " + msg); }

for (const sk of ORDER) {
  check("school", !!C[sk], "Schulart fehlt: " + sk);
  const subs = C[sk].subjects;
  faecher += Object.keys(subs).length;
  for (const fk of Object.keys(subs)) {
    const s = subs[fk];
    for (const kl of Object.keys(s.themen)) {
      s.themen[kl].forEach((th, i) => {
        themen++;
        const tag = sk + "/" + fk + "/" + kl + "/" + i;
        check(tag, typeof th.t === "string" && th.t.length > 0, "Thema ohne Titel");
        check(tag, Array.isArray(th.f), "Merkblatt f[] fehlt");
        const set = E.buildTasks(th, { subjectKey: fk, grade: Number(kl) });
        check(tag, Array.isArray(set) && set.length > 0, "keine Aufgaben erzeugt");
        set.forEach((task, ti) => {
          tasks++;
          types[task.k] = (types[task.k] || 0) + 1;
          const a = E.checkAnswer(task, correctResponse(task));
          if (!(a && a.ok)) problems.push(tag + "#" + ti + " (" + task.k + "): eigene Lösung nicht als richtig erkannt");
        });
      });
    }
  }
}

console.log("Schularten:", ORDER.length, "| Fächer:", faecher, "| Themen:", themen);
console.log("Aufgaben:", tasks, "| Typen:", JSON.stringify(types));
console.log("Probleme:", problems.length);
problems.slice(0, 20).forEach((p) => console.log("  -", p));
process.exit(problems.length ? 1 : 0);
