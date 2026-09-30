/* subjects-foerderschule.js – Fächer und Themen (erzeugt aus build.py). */
window.SUBJECTS = window.SUBJECTS || {};
window.SUBJECTS["foerderschule"] = {
  "deutsch":{name:"Deutsch",icon:"✍️",color:"#8a3324",klassen:[1, 2, 3, 4, 5, 6, 7, 8, 9],themen:{
    "1":[{"t": "Sprache und Schrift", "d": "Laute hören, Buchstaben schreiben.", "l": "FS D1", "f": [["Laut", "hörbarer Sprachklang"], ["Buchstabe", "sichtbares Zeichen für einen Laut"]]}],
    "3":[{"t": "Lesen und Schreiben", "d": "Wörter erlesen, Sätze bilden.", "l": "FS D3", "f": [["Wort", "Folge von Buchstaben mit Sinn"], ["Satz", "Vollständiger Gedanke, beginnt groß"]]}],
    "5":[{"t": "Erzählen und Berichten", "d": "Erlebnisse und Sachverhalte mitteilen.", "l": "FS D5", "f": [["Erzählung", "lebendige Darstellung eines Erlebnisses"], ["Bericht", "sachliche Darstellung in Reihenfolge"]]}, {"t": "Wortarten", "d": "Nomen, Verb, Adjektiv unterscheiden.", "l": "FS D5", "f": [["Nomen", "Namenwort (Tisch)"], ["Verb", "Tunwort (gehen)"], ["Adjektiv", "Wiewort (schnell)"]]}],
    "7":[{"t": "Rechtschreiben", "d": "Regeln anwenden, Wörter richtig schreiben.", "l": "FS D7", "f": [["Großschreibung", "Nomen und Satzanfänge"], ["Satzzeichen", "Punkt, Komma, Fragezeichen"]]}],
    "9":[{"t": "Texte verstehen und verfassen", "d": "Sachtexte, Briefe, Bewerbung.", "l": "FS D9", "f": [["Sachtext", "informiert über Fakten"], ["Bewerbung", "schriftliche Anfrage um eine Stelle"]]}]
  }},
  "mathematik":{name:"Mathematik",icon:"📐",color:"#12386b",klassen:[1, 2, 3, 4, 5, 6, 7, 8, 9],themen:{
    "1":[{"t": "Zahlen und Zählen", "d": "Mengen, Zahlenraum bis 10.", "l": "FS M1", "f": [["Menge", "Anzahl von Dingen"], ["Zahl", "Zeichen für eine Anzahl"]]}],
    "3":[{"t": "Grundrechenarten", "d": "Addieren und subtrahieren.", "l": "FS M3", "f": [["Addition", "plus rechnen"], ["Subtraktion", "minus rechnen"]]}],
    "5":[{"t": "Zahlenraum und Größen", "d": "Natürliche Zahlen, Längen, Geld.", "l": "FS M5", "f": [["Natürliche Zahl", "1, 2, 3 ..."], ["Einheit", "cm, m, g, kg, EUR"]]}],
    "7":[{"t": "Prozent und Dreisatz", "d": "Alltagsrechnen mit Verhältnissen.", "l": "FS M7", "f": [["Prozent", "Anteil von 100"], ["Dreisatz", "von einem Wert auf einen anderen schließen"]]}],
    "9":[{"t": "Berufsrelevantes Rechnen", "d": "Fläche, Volumen, Zins, Tabellen.", "l": "FS M9", "f": [["Flächeninhalt", "Größe einer Fläche"], ["Zins", "Vergütung für geliehenes Geld"]]}]
  }},
  "sachunterricht":{name:"Sachunterricht / Natur und Technik",icon:"🔬",color:"#2f7d78",klassen:[1, 2, 3, 4, 5, 6, 7, 8, 9],themen:{
    "1":[{"t": "Ich und meine Umwelt", "d": "Sinne, Jahreszeiten, Tiere und Pflanzen.", "l": "FS S1", "f": [["Jahreszeit", "Frühling bis Winter"], ["Sinn", "sehen, hören, fühlen, riech, schmecken"]]}],
    "5":[{"t": "Natur und Technik", "d": "Stoffe, Energie, Lebewesen.", "l": "FS N5", "f": [["Stoff", "Material aus dem Dinge bestehen"], ["Energie", "nötig für Bewegung und Licht"]]}, {"t": "Mensch und Gesundheit", "d": "Körper, Ernährung, Vorsorge.", "l": "FS N5", "f": [["Ernährung", "ausgewogene Kost"], ["Vorsorge", "Untersuchung beim Arzt"]]}],
    "7":[{"t": "Lebensräume", "d": "Oekosysteme, Umwelt, Nachhaltigkeit.", "l": "FS N7", "f": [["Oekosystem", "Lebewesen und ihre Umwelt"], ["Nachhaltigkeit", "ressourcenschonend handeln"]]}],
    "9":[{"t": "Technik und Beruf", "d": "Technische Systeme, Berufsfelder.", "l": "FS N9", "f": [["Technisches System", "Bauteile wirken zusammen"], ["Berufsfeld", "Gruppe ähnlicher Berufe"]]}]
  }},
  "englisch":{name:"Englisch",icon:"🇬🇧",color:"#1f5fa8",klassen:[5, 6, 7, 8, 9],themen:{
    "5":[{"t": "Erste Schritte", "d": "Begrüßen, vorstellen, Alltagswortschatz.", "l": "FS E5", "f": [["Greeting", "hello, good morning"], ["Introduce", "sich vorstellen: My name is ..."]]}],
    "7":[{"t": "Alltag und Freizeit", "d": "Tätigkeiten, Zeitformen, einfache Texte.", "l": "FS E7", "f": [["Present Simple", "einfache Gegenwart"], ["Hobby", "Freizeitbeschäftigung"]]}],
    "9":[{"t": "Beruf und Bewerbung", "d": "Formulare, Gespräche, Bewerbung.", "l": "FS E9", "f": [["Application", "Bewerbung"], ["Interview", "Vorstellungsgespräch"]]}]
  }},
  "kunst":{name:"Kunst",icon:"🎨",color:"#c8442f",klassen:[1, 2, 3, 4, 5, 6, 7, 8, 9],themen:{
    "1":[{"t": "Malen und Gestalten", "d": "Farben, Formen, Materialien.", "l": "FS K1", "f": [["Grundfarbe", "rot, gelb, blau"], ["Material", "Papier, Wolle, Ton"]]}],
    "5":[{"t": "Bildnerisches Gestalten", "d": "Zeichnen, Malen, Drucken.", "l": "FS K5", "f": [["Komposition", "Anordnung im Bild"], ["Druck", "Bild durch Aufdrucken"]]}],
    "9":[{"t": "Gestalten und Präsentieren", "d": "Werkstücke planen und zeigen.", "l": "FS K9", "f": [["Präsentation", "Werk vorstellen"], ["Werkstück", "selbst hergestelltes Objekt"]]}]
  }},
  "musik":{name:"Musik",icon:"🎵",color:"#2f7d78",klassen:[1, 2, 3, 4, 5, 6, 7, 8, 9],themen:{
    "1":[{"t": "Singen und Rhythmus", "d": "Lieder, Klänge, Bewegung.", "l": "FS MU1", "f": [["Rhythmus", "regelmäßiger Puls"], ["Lied", "gesungenes Stück"]]}],
    "5":[{"t": "Musik erleben", "d": "Instrumente, Noten, Hörbeispiele.", "l": "FS MU5", "f": [["Instrument", "erzeugt Klänge"], ["Note", "Zeichen für einen Ton"]]}],
    "9":[{"t": "Musik und Medien", "d": "Musik in Alltag und Beruf.", "l": "FS MU9", "f": [["Musikproduktion", "Aufnahme und Bearbeitung"], ["Medien", "Radio, Internet, Film"]]}]
  }},
  "sport":{name:"Sport",icon:"⚽",color:"#3f7a52",klassen:[1, 2, 3, 4, 5, 6, 7, 8, 9],themen:{
    "1":[{"t": "Bewegung", "d": "Laufen, springen, balancieren.", "l": "FS S1", "f": [["Balancieren", "Gleichgewicht halten"], ["Springen", "abstoßen und landen"]]}],
    "5":[{"t": "Spiele und Mannschaft", "d": "Regeln, Fairness, Team.", "l": "FS SP5", "f": [["Regel", "Absprache im Spiel"], ["Team", "gemeinsam spielen"]]}],
    "9":[{"t": "Sport und Gesundheit", "d": "Training, Ausdauer, Erholung.", "l": "FS SP9", "f": [["Training", "regelmäßige Uebung"], ["Erholung", "Pause zur Regeneration"]]}]
  }},
  "religion":{name:"Religion / Ethik",icon:"✝️",color:"#7a5c99",klassen:[1, 2, 3, 4, 5, 6, 7, 8, 9],themen:{
    "1":[{"t": "Ich und die Gemeinschaft", "d": "Selbstwert, Regeln, Zusammenleben.", "l": "FS R1", "f": [["Gemeinschaft", "wir gehören zusammen"], ["Regel", "Absprache im Miteinander"]]}],
    "5":[{"t": "Werte und Verantwortung", "d": "Werte, Entscheidungen, Verantwortung.", "l": "FS R5", "f": [["Wert", "wichtige Grundhaltung"], ["Verantwortung", "für sein Handeln einstehen"]]}],
    "9":[{"t": "Weltreligionen und Ethik", "d": "Religionen, Fragen des Lebens.", "l": "FS R9", "f": [["Weltreligion", "Christentum, Judentum, Islam, Buddhismus"], ["Gewissen", "innere Stimme für richtig und falsch"]]}]
  }},
  "wirtschaft_arbeit":{name:"Wirtschaft und Arbeit",icon:"💼",color:"#1f6f4a",klassen:[7, 8, 9],themen:{
    "7":[{"t": "Arbeitswelt erkunden", "d": "Berufe, Betriebe, Praktikum.", "l": "FS WA7", "f": [["Beruf", "Tätigkeit mit Ausbildung"], ["Betrieb", "Ort, an dem gearbeitet wird"], ["Praktikum", "Schnuppern in einen Beruf"]]}],
    "8":[{"t": "Bewerbung und Vorstellungsgespräch", "d": "Bewerbungsunterlagen, Auftreten.", "l": "FS WA8", "f": [["Bewerbung", "Anschreiben und Lebenslauf"], ["Vorstellungsgespräch", "persönliches Kennenlernen"]]}],
    "9":[{"t": "Arbeitsrecht und Geld", "d": "Vertrag, Lohn, Versicherungen.", "l": "FS WA9", "f": [["Arbeitsvertrag", "regelt Rechte und Pflichten"], ["Lohn", "Bezahlung für Arbeit"], ["Versicherung", "Schutz bei Schaden"]]}]
  }}
};