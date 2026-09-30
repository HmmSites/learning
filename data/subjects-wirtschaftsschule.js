/* subjects-wirtschaftsschule.js – Fächer und Themen (erzeugt aus build.py). */
window.SUBJECTS = window.SUBJECTS || {};
window.SUBJECTS["wirtschaftsschule"] = {
  "deutsch":{name:"Deutsch",icon:"✍️",color:"#8a3324",klassen:[6, 7, 8, 9, 10],themen:{
    "6":[{"t": "Erzählen und Berichten", "d": "Erlebnisse und Sachverhalte darstellen.", "l": "WS D6", "f": [["Erzählung", "lebendige Darstellung"], ["Bericht", "sachlich in Reihenfolge"]]}],
    "7":[{"t": "Inhaltsangabe und Argumentieren", "d": "Textinhalt erfassen, Meinung begründen.", "l": "WS D7", "f": [["Inhaltsangabe", "kurze Zusammenfassung im Präsens"], ["Argument", "Begründung einer Meinung"]]}],
    "8":[{"t": "Bewerbung und Geschäftsbrief", "d": "Formelle Briefe und Bewerbung.", "l": "WS D8", "f": [["Geschäftsbrief", "formeller Brief nach DIN 5008"], ["Bewerbung", "Anschreiben und Lebenslauf"]]}],
    "9":[{"t": "Erörtern und Analysieren", "d": "Sachtexte und Erörterung.", "l": "WS D9", "f": [["Erörterung", "These, Argument, Beispiel, Fazit"], ["Sachtextanalyse", "Argumentationsstruktur prüfen"]]}],
    "10":[{"t": "Abschlussprüfung Deutsch", "d": "Textarbeit, freies Schreiben, Sprachrichtigkeit.", "l": "WS D10", "f": [["Textarbeit", "Text verstehen und bearbeiten"], ["Sprachrichtigkeit", "Grammatik und Rechtschreibung"]]}]
  }},
  "mathematik":{name:"Mathematik",icon:"📐",color:"#12386b",klassen:[6, 7, 8, 9, 10],themen:{
    "6":[{"t": "Grundrechenarten und Brüche", "d": "Rechnen mit Brüchen und Dezimalzahlen.", "l": "WS M6", "f": [["Bruch", "Teil eines Ganzen (1/2)"], ["Dezimalbruch", "Schreibweise mit Komma (0,5)"]]}],
    "7":[{"t": "Prozent- und Zinsrechnung", "d": "Prozente, Zinsen, Rabatt.", "l": "WS M7", "f": [["Prozent", "Anteil von Hundert"], ["Zins", "Vergütung für Kapital"]]}],
    "8":[{"t": "Gleichungen und Funktionen", "d": "Terme, lineare Gleichungen und Funktionen.", "l": "WS M8", "f": [["Term", "Rechenausdruck mit Variablen"], ["Lineare Funktion", "Graph ist eine Gerade"]]}],
    "9":[{"t": "Geometrie und Körper", "d": "Flächen, Volumen, Pythagoras.", "l": "WS M9", "f": [["Volumen", "Rauminhalt eines Körpers"], ["Satz des Pythagoras", "a² + b² = c²"]]}, {"t": "Daten und Zufall", "d": "Statistik und Wahrscheinlichkeit.", "l": "WS M9", "f": [["Mittelwert", "Durchschnitt der Werte"], ["Wahrscheinlichkeit", "Chance eines Ereignisses"]]}],
    "10":[{"t": "Abschlussprüfung Mathematik", "d": "Funktionen, Geometrie, Stochastik, Sachaufgaben.", "l": "WS M10", "f": [["Funktion", "Zuordnung von x zu y"], ["Sachaufgabe", "Aufgabe aus dem Alltag"]]}]
  }},
  "englisch":{name:"Englisch",icon:"🇬🇧",color:"#1f5fa8",klassen:[6, 7, 8, 9, 10],themen:{
    "6":[{"t": "Everyday English", "d": "Alltag, Schule, Familie, Zeitformen.", "l": "WS E6", "f": [["Simple Present", "einfache Gegenwart"], ["Vocabulary", "Wortschatz zu Alltagsthemen"]]}],
    "7":[{"t": "Past and Future", "d": "Vergangenheit und Zukunft ausdrücken.", "l": "WS E7", "f": [["Simple Past", "einfache Vergangenheit"], ["Will-future", "Zukunft mit will"]]}],
    "8":[{"t": "Business Basics", "d": "Geschäftskommunikation, E-Mails, Telefon.", "l": "WS E8", "f": [["Business e-mail", "formelle E-Mail"], ["Small talk", "lockeres Gespräch"]]}],
    "9":[{"t": "Grammar and Communication", "d": "Passiv, If-Sätze, Diskussion.", "l": "WS E9", "f": [["Passive", "The letter was written."], ["If-clause", "Bedingungssatz"]]}],
    "10":[{"t": "Abschlussprüfung Englisch", "d": "Reading, Listening, Writing, Use of English.", "l": "WS E10", "f": [["Reading comprehension", "Text verstehen"], ["Text production", "eigenen Text schreiben"]]}]
  }},
  "bsk":{name:"Betriebswirtschaftliche Steuerung und Kontrolle",icon:"💼",color:"#8a5a2b",klassen:[8, 9, 10],themen:{
    "8":[{"t": "Betrieb und Markt", "d": "Betriebsarten, Markt, Preisbildung.", "l": "WS BSK8", "f": [["Betrieb", "Ort der Leistungserstellung"], ["Markt", "Zusammentreffen von Angebot und Nachfrage"], ["Preisbildung", "durch Angebot und Nachfrage"]]}],
    "9":[{"t": "Rechnungswesen", "d": "Buchführung, Bilanz, Kosten.", "l": "WS BSK9", "f": [["Buchführung", "systematisches Aufzeichnen der Geschäfte"], ["Bilanz", "Vermögen und Kapital"], ["Kosten", "Wert der verbrauchten Güter"]]}],
    "10":[{"t": "Controlling und Management", "d": "Kennzahlen, Planung, Entscheidung.", "l": "WS BSK10", "f": [["Controlling", "Steuerung und Kontrolle des Betriebs"], ["Kennzahl", "messbarer Wert zur Bewertung"], ["Break-even", "Punkt ohne Gewinn und Verlust"]]}]
  }},
  "rechnungswesen":{name:"Rechnungswesen",icon:"📒",color:"#1f6f4a",klassen:[9, 10],themen:{
    "9":[{"t": "Grundlagen der Buchführung", "d": "Konten, Buchungssatz, Journal.", "l": "WS RW9", "f": [["Konto", "Gegenüberstellung von Soll und Haben"], ["Buchungssatz", "Soll an Haben"], ["Journal", "chronologisches Grundbuch"]]}],
    "10":[{"t": "Jahresabschluss", "d": "Bilanz, Gewinn- und Verlustrechnung.", "l": "WS RW10", "f": [["Abschluss", "Konten saldieren und abschließen"], ["GuV", "Gegenüberstellung von Erträgen und Aufwand"]]}]
  }},
  "wi":{name:"Wirtschaftsinformatik",icon:"💻",color:"#1f5fa8",klassen:[9, 10],themen:{
    "9":[{"t": "Tabellenkalkulation", "d": "Formeln, Funktionen, Diagramme.", "l": "WS WI9", "f": [["Formel", "Berechnung in einer Tabellenzelle"], ["Funktion", "vordefinierte Berechnung wie SUMME"]]}],
    "10":[{"t": "Datenbanken und Netzwerke", "d": "Datenbanken, Internet, Datenschutz.", "l": "WS WI10", "f": [["Datenbank", "systematische Datensammlung"], ["Datenschutz", "Schutz personenbezogener Daten"]]}]
  }},
  "vwl":{name:"Volkswirtschaftliche Grundlagen",icon:"📈",color:"#2f7d78",klassen:[10],themen:{
    "10":[{"t": "Wirtschaft und Staat", "d": "Wirtschaftskreislauf, Sozialprodukt, Konjunktur.", "l": "WS VWL10", "f": [["Wirtschaftskreislauf", "Kreislauf von Geld und Gütern"], ["Bruttoinlandsprodukt", "Wert aller Güter und Dienste"], ["Konjunktur", "Wellenbewegung der Wirtschaft"]]}]
  }},
  "sport":{name:"Sport",icon:"⚽",color:"#3f7a52",klassen:[6, 7, 8, 9, 10],themen:{
    "6":[{"t": "Bewegung und Spiel", "d": "Grundformen, Mannschaftsspiele.", "l": "WS S6", "f": [["Mannschaftsspiel", "gemeinsam spielen"], ["Aufwärmen", "Körper vorbereiten"]]}],
    "10":[{"t": "Sport und Gesundheit", "d": "Training, Ausdauer, Erholung.", "l": "WS S10", "f": [["Ausdauer", "länger belastbar sein"], ["Regeneration", "Erholung nach Belastung"]]}]
  }},
  "religion":{name:"Religion / Ethik",icon:"✝️",color:"#7a5c99",klassen:[6, 7, 8, 9, 10],themen:{
    "6":[{"t": "Werte und Zusammenleben", "d": "Werte, Regeln, Verantwortung.", "l": "WS R6", "f": [["Wert", "wichtige Grundhaltung"], ["Verantwortung", "für sein Handeln einstehen"]]}],
    "10":[{"t": "Ethik und Gesellschaft", "d": "Ethische Fragen, Menschenbilder.", "l": "WS R10", "f": [["Ethik", "Lehre vom richtigen Handeln"], ["Menschenwürde", "unverletzlicher Wert jedes Menschen"]]}]
  }}
};