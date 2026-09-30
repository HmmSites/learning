# LehrplanTrainer – Lernseite zum LehrplanPLUS Bayern

Statische Webseite (kein Build-Schritt nötig, reines HTML/CSS/JS) mit Übungen zu
allen Fächern und Themen des bayerischen **LehrplanPLUS** für
**Realschule, Gymnasium und Mittelschule, Klasse 5–10**.

## Starten

```bash
python3 -m http.server 12000
# dann http://localhost:12000/ öffnen
```

## Struktur

```
index.html                     Grundgerüst, lädt CSS/JS/Daten
css/style.css                  Design-System (Schulheft-/Notizbuch-Ästhetik)
js/engine.js                   Aufgaben-Engine: Aufgabensatz bauen + Antworten prüfen
js/app.js                      Auswahl, Routing (Hash-Router), Ansichten, Fortschritt
data/schools.js                Schularten-Stammdaten
data/subjects-realschule.js    Fächer + Themen der Realschule
data/subjects-gymnasium.js     Fächer + Themen des Gymnasiums
data/subjects-mittelschule.js  Fächer + Themen der Mittelschule
data/curriculum.js             baut window.CURRICULUM aus den obigen Dateien
test/validate.mjs              Prüft Daten + Engine (node test/validate.mjs)
build/                         Generator-Skripte (Python), erzeugen data/*.js
.github/workflows/pages.yml    Deploy auf GitHub Pages
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
Wahr/Falsch- und Zuordnungsaufgaben; in Mathematik kommen Rechen-Generatoren dazu.

## Daten regenerieren

```bash
cd build
cat build.py build2.py build3.py build4.py > _build_all.py
python3 _build_all.py     # schreibt ../data/schools.js + subjects-*.js + curriculum.js
rm _build_all.py
```

Die Themen/Fächer-Struktur folgt der offiziellen Gliederung von
<https://www.lehrplanplus.bayern.de> (Staatsinstitut für Schulqualität und
Bildungsforschung, ISB). Die Aufgaben sind eigene Übungen.

## Konventionen

- Deutsch mit echten Umlauten (ä, ö, ü, ß) in allen Inhalten.
- Kein Framework, kein Bundler; ES5-taugliches JS für breite Browser-Unterstützung.
- Fortschritt nur lokal im Browser (`localStorage`, Schlüssel `lpt-progress-v1`).
