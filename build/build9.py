# -*- coding: utf-8 -*-
"""build9.py – Ausgabe: schreibt data/schools.js, data/subjects-<schulart>.js
und den Assembler data/curriculum.js."""

def esc(s):
    return json.dumps(s, ensure_ascii=False)


DATA = os.path.join(os.path.dirname(__file__), "..", "data")


def write(name, text):
    with open(os.path.join(DATA, name), "w", encoding="utf-8") as f:
        f.write(text)
    return len(text)


school_keys = list(SCHOOLS.keys())

meta = ["/* schools.js – Schularten-Stammdaten (erzeugt aus build.py). */",
        "window.SCHOOLS = {"]
for si, sk in enumerate(school_keys):
    sc = SCHOOLS[sk]
    meta.append("  %s:{name:%s, short:%s, deco:%s, color:%s, info:%s, klassen:%s, subjects:%s}%s" % (
        esc(sk), esc(sc["name"]), esc(sc["short"]), esc(sc["deco"]), esc(sc["color"]),
        esc(sc["info"]), json.dumps(sc["klassen"]), json.dumps(list(S.get(sk, {}).keys())),
        "" if si == len(school_keys) - 1 else ","))
meta.append("};")
meta.append("window.SCHOOL_ORDER = %s;" % json.dumps(school_keys))
n_meta = write("schools.js", "\n".join(meta))

subject_lens = {}
for sk in school_keys:
    lines = ["/* subjects-%s.js – Fächer und Themen (erzeugt aus build.py). */" % sk,
             "window.SUBJECTS = window.SUBJECTS || {};",
             "window.SUBJECTS[%s] = {" % esc(sk)]
    subj = S.get(sk, {})
    skeys = list(subj.keys())
    for ki, key in enumerate(skeys):
        sub = subj[key]
        lines.append("  %s:{name:%s,icon:%s,color:%s,klassen:%s,themen:{" % (
            esc(key), esc(sub["name"]), esc(sub["icon"]), esc(sub["color"]),
            json.dumps(sub["klassen"])))
        tkeys = list(sub["themen"].keys())
        for ti, tk in enumerate(tkeys):
            lines.append("    %s:%s%s" % (
                esc(str(tk)), json.dumps(sub["themen"][tk], ensure_ascii=False),
                "" if ti == len(tkeys) - 1 else ","))
        lines.append("  }}%s" % ("" if ki == len(skeys) - 1 else ","))
    lines.append("};")
    subject_lens[sk] = write("subjects-%s.js" % sk, "\n".join(lines))

asm = ["/* curriculum.js – baut window.CURRICULUM aus schools.js + subjects-*.js. */",
       "(function () {",
       "  var S = window.SCHOOLS || {}, SU = window.SUBJECTS || {}, out = {};",
       "  Object.keys(S).forEach(function (k) {",
       "    out[k] = {",
       "      name: S[k].name, short: S[k].short, deco: S[k].deco, color: S[k].color,",
       "      info: S[k].info, klassen: S[k].klassen, subjects: SU[k] || {}",
       "    };",
       "  });",
       "  window.CURRICULUM = out;",
       "})();"]
n_asm = write("curriculum.js", "\n".join(asm))

tot_themen = 0; tot_f = 0; tot_q = 0
for sk, subs in S.items():
    for k, s in subs.items():
        for kl, ts in s["themen"].items():
            tot_themen += len(ts)
            for x in ts:
                tot_f += len(x.get("f", []))
                tot_q += len(x.get("q", []))
print("Schularten:", len(S), "| Fächer:", sum(len(v) for v in S.values()),
      "| Themen:", tot_themen, "| Merkblatt-Einträge:", tot_f, "| explizite Aufgaben:", tot_q)
for sk in school_keys:
    print("  subjects-%s.js:" % sk, subject_lens[sk], "Zeichen")
print("curriculum.js (Assembler):", n_asm, "Zeichen")
