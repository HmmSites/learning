/* subjects-berufsoberschule.js – Fächer und Themen (erzeugt aus build.py). */
window.SUBJECTS = window.SUBJECTS || {};
window.SUBJECTS["berufsoberschule"] = {
  "deutsch":{name:"Deutsch",icon:"✍️",color:"#8a3324",klassen:[12, 13],themen:{
    "12":[{"t": "Texte analysieren und erörtern", "d": "Sachtexte, Literatur, Argumentation.", "l": "BOS D12", "f": [["Analyse", "Untersuchung von Aufbau und Sprache"], ["Erörterung", "These, Argument, Beispiel, Fazit"]]}],
    "13":[{"t": "Abiturvorbereitung Deutsch", "d": "Textvergleich, Sprachbetrachtung.", "l": "BOS D13", "f": [["Textvergleich", "Gemeinsamkeiten und Unterschiede"], ["Sprachbetrachtung", "Wirkung von Sprache"]]}]
  }},
  "mathematik":{name:"Mathematik",icon:"📐",color:"#12386b",klassen:[12, 13],themen:{
    "12":[{"t": "Analysis", "d": "Funktionen, Ableitung, Extremwerte.", "l": "BOS M12", "f": [["Ableitung", "Steigung der Tangente"], ["Extremwert", "Hoch- oder Tiefpunkt"]]}],
    "13":[{"t": "Integral, Stochastik, Geometrie", "d": "Integralrechnung, Wahrscheinlichkeit, Vektoren.", "l": "BOS M13", "f": [["Integral", "Flächeninhalt unter dem Graphen"], ["Binomialverteilung", "feste Anzahl unabhängiger Versuche"], ["Vektor", "Pfeil mit Richtung und Länge"]]}]
  }},
  "englisch":{name:"Englisch",icon:"🇬🇧",color:"#1f5fa8",klassen:[12, 13],themen:{
    "12":[{"t": "Comprehension and Writing", "d": "Reading, listening, writing.", "l": "BOS E12", "f": [["Comprehension", "Text verstehen"], ["Writing", "eigene Texte verfassen"]]}],
    "13":[{"t": "Abiturvorbereitung Englisch", "d": "Essay, mediation, analysis.", "l": "BOS E13", "f": [["Essay", "argumentativer Aufsatz"], ["Mediation", "Sprachmittlung"]]}]
  }},
  "bwr":{name:"Betriebswirtschaftslehre mit Rechnungswesen",icon:"💼",color:"#8a5a2b",klassen:[12, 13],themen:{
    "12":[{"t": "Betriebswirtschaft", "d": "Leistungsprozess, Marketing, Rechnungswesen.", "l": "BOS BWR12", "f": [["Marketing", "Ausrichtung auf den Markt"], ["Buchführung", "systematisches Aufzeichnen"]]}],
    "13":[{"t": "Controlling und Jahresabschluss", "d": "Kennzahlen, Bilanz, Analyse.", "l": "BOS BWR13", "f": [["Bilanz", "Vermögen und Kapital"], ["Kennzahl", "messbarer Wert zur Bewertung"]]}]
  }},
  "vwl":{name:"Volkswirtschaftslehre",icon:"📈",color:"#2f7d78",klassen:[12, 13],themen:{
    "12":[{"t": "Mikro- und Makroökonomie", "d": "Markt, Preis, Wirtschaftskreislauf.", "l": "BOS VWL12", "f": [["Mikroökonomie", "Verhalten einzelner Haushalte und Firmen"], ["Makroökonomie", "gesamtwirtschaftliche Größen"]]}],
    "13":[{"t": "Wirtschaftspolitik", "d": "Konjunktur, Geld, Arbeitsmarkt.", "l": "BOS VWL13", "f": [["Konjunkturpolitik", "Steuerung der Wirtschaft"], ["Inflation", "anhaltender Preisanstieg"]]}]
  }},
  "physik":{name:"Physik (Technik)",icon:"🧲",color:"#6b5b95",klassen:[12, 13],themen:{
    "12":[{"t": "Mechanik und Elektrizität", "d": "Kraft, Energie, elektrische Felder.", "l": "BOS PH12", "f": [["Energie", "Fähigkeit Arbeit zu verrichten"], ["Elektrisches Feld", "Kraftwirkung auf Ladungen"]]}],
    "13":[{"t": "Schwingungen und moderne Physik", "d": "Wellen, Quanten, Atomphysik.", "l": "BOS PH13", "f": [["Welle", "Ausbreitung einer Schwingung"], ["Photon", "Lichtquant"]]}]
  }},
  "informatik":{name:"Informatik",icon:"💻",color:"#1f5fa8",klassen:[12, 13],themen:{
    "12":[{"t": "Programmierung und Algorithmen", "d": "Algorithmen, Datenstrukturen, Entwicklung.", "l": "BOS INF12", "f": [["Algorithmus", "eindeutige Handlungsvorschrift"], ["Datenstruktur", "geordnete Sammlung von Daten"]]}],
    "13":[{"t": "Datenbanken und Netze", "d": "SQL, Netzwerke, IT-Sicherheit.", "l": "BOS INF13", "f": [["SQL", "Sprache für Datenbankabfragen"], ["IT-Sicherheit", "Schutz von Daten und Systemen"]]}]
  }},
  "sozialkunde":{name:"Sozialkunde / Politik",icon:"🏛",color:"#6b5b95",klassen:[12, 13],themen:{
    "12":[{"t": "Demokratie und Recht", "d": "Verfassung, Grundrechte, Rechtsordnung.", "l": "BOS SZ12", "f": [["Grundrechte", "verbriefte Rechte des Bürgers"], ["Rechtsstaat", "Staat handelt nach Gesetzen"]]}],
    "13":[{"t": "Gesellschaft und Weltpolitik", "d": "Sozialstaat, Globalisierung, Konflikte.", "l": "BOS SZ13", "f": [["Sozialstaat", "Staat sichert soziale Gerechtigkeit"], ["Globalisierung", "weltweite Verflechtung"]]}]
  }},
  "religion":{name:"Religion / Ethik",icon:"✝️",color:"#7a5c99",klassen:[12, 13],themen:{
    "12":[{"t": "Ethik und Verantwortung", "d": "Werte, Entscheidungen, Verantwortung.", "l": "BOS R12", "f": [["Wert", "wichtige Grundhaltung"], ["Verantwortung", "für sein Handeln einstehen"]]}],
    "13":[{"t": "Angewandte Ethik", "d": "Berufsethik, Bioethik, Gesellschaft.", "l": "BOS R13", "f": [["Berufsethik", "ethische Fragen im Beruf"], ["Bioethik", "ethische Fragen in Biologie und Medizin"]]}]
  }},
  "sport":{name:"Sport",icon:"⚽",color:"#3f7a52",klassen:[12, 13],themen:{
    "12":[{"t": "Training und Gesundheit", "d": "Trainingslehre, Fitness, Prävention.", "l": "BOS S12", "f": [["Trainingslehre", "Planung von Training"], ["Prävention", "Vorbeugung von Verletzungen"]]}],
    "13":[{"t": "Sport und Gesellschaft", "d": "Sport in Medien, Wirtschaft, Ethik.", "l": "BOS S13", "f": [["Fairplay", "ehrliches Verhalten im Sport"], ["Doping", "verbotene Leistungssteigerung"]]}]
  }}
};