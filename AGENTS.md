# SchülerTrainer by Hmm – Lernseite zum LehrplanPLUS Bayern

Statische Webseite (kein Build-Schritt nötig, reines HTML/CSS/JS) mit Übungen zu
allen Fächern und Themen des bayerischen **LehrplanPLUS** – für **alle acht
Schularten**: Grundschule, Mittelschule, Förderschule, Realschule, Gymnasium
(inkl. Oberstufe Q11/Q12), Wirtschaftsschule, Fachoberschule und
Berufsoberschule.

## Starten

```bash
python3 -m http.server 12000
# dann http://localhost:12000/ öffnen
```

## Struktur

```
index.html                          Grundgerüst, lädt CSS/JS/Daten
css/style.css                       Design-System (Schulheft-/Notizbuch-Ästhetik)
js/engine.js                        Aufgaben-Engine: Aufgabensatz bauen + Antworten prüfen
js/app.js                           Auswahl, Routing (Hash-Router), Ansichten, Fortschritt
data/schools.js                     Schularten-Stammdaten
data/subjects-<schulart>.js         Fächer + Themen je Schulart (8 Dateien)
data/curriculum.js                  baut window.CURRICULUM aus den obigen Dateien
test/validate.mjs                   Prüft Daten + Engine (node test/validate.mjs)
build/                              Generator-Skripte (Python), erzeugen data/*.js
.github/workflows/pages.yml         Deploy auf GitHub Pages
```

Alle Daten- und Skriptpfade sind relativ, damit die Seite unter einem
Unterpfad (z. B. `https://<user>.github.io/learning/`) läuft.

## Test

```bash
node test/validate.mjs
```

Baut für jedes Thema den Aufgabensatz, prüft die eigene Lösung gegen die
Antwortprüfung und meldet Fehler. Erwartet: `Probleme: 0`.

## Datenmodell (data/curriculum.js)

```
window.CURRICULUM[schule].subjects[fach].themen["klasse"] = [
  { t: Titel, d: Beschreibung, l: Lehrplan-Lernbereich,
    f: [[Begriff, Erklärung], …],      // Merkblatt + Quelle für Auto-Aufgaben
    q: [ … ] }                         // optionale explizite Aufgaben
]
```

Aufgabentypen (`k`): `mc` (Multiple Choice, `o`/`c`), `num` (Zahl, `a`/`tol`),
`gap` (Lückentext mit `[[1]]`-Platzhaltern, `a` als Liste von Alternativen mit `|`),
`tf` (Wahr/Falsch, `a` bool), `match` (`pairs`), `order` (`a` als Reihenfolge).

Aus den Merkblatt-Einträgen `f` erzeugt die Engine automatisch Multiple-Choice-,
Wahr/Falsch- und Zuordnungsaufgaben. In Mathematik kommen Rechen-Generatoren
dazu – aber nur, wenn ihre Stichwörter im Thema vorkommen (`GENERATOR_KEYWORDS`
in `js/engine.js`), damit keine fachfremden Aufgaben entstehen.

## Daten regenerieren

```bash
cd build
cat build.py build2.py build3.py build4.py build5.py build6.py build9.py > _build_all.py
python3 _build_all.py     # schreibt ../data/schools.js + subjects-*.js + curriculum.js
rm _build_all.py
```

- `build.py` – Schulen-Stammdaten (`SCHOOLS`), Realschule Teil 1
- `build2.py` / `build3.py` / `build4.py` – restliche Realschule / Gymnasium / Mittelschule
- `build5.py` – Grundschule und Förderschule (nutzt `upsert`, erweitert vorhandene Fächer)
- `build6.py` – Gymnasium-Oberstufe Q11/Q12, Wirtschaftsschule, Fachoberschule, Berufsoberschule
- `build9.py` – Ausgabe nach `data/`

Die Themen/Fächer-Struktur folgt der offiziellen Gliederung von
<https://www.lehrplanplus.bayern.de> (Staatsinstitut für Schulqualität und
Bildungsforschung, ISB). Die Aufgaben sind eigene Übungen. © Hmm.

## Konventionen

- Deutsch mit echten Umlauten (ä, ö, ü, ß) in allen Inhalten.
- Kein Framework, kein Bundler; ES5-taugliches JS für breite Browser-Unterstützung.
- Fortschritt nur lokal im Browser (`localStorage`, Schlüssel `lpt-progress-v1`).
- Die Auswahl (Schulart → Jahrgangsstufe → Fach) erscheint stufenweise und wird
  beim Öffnen eines Themas ausgeblendet („Auswahl ändern“ in der Kopfzeile).
