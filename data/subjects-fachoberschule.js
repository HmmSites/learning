/* subjects-fachoberschule.js – Fächer und Themen (erzeugt aus build.py). */
window.SUBJECTS = window.SUBJECTS || {};
window.SUBJECTS["fachoberschule"] = {
  "deutsch":{name:"Deutsch",icon:"✍️",color:"#8a3324",klassen:[11, 12],themen:{
    "11":[{"t": "Sachtexte und Erörterung", "d": "Analyse, Argumentation, Kommentar.", "l": "FOS D11", "f": [["Sachtextanalyse", "Argumentationsstruktur untersuchen"], ["Kommentar", "meinungsbetonter Text"]]}],
    "12":[{"t": "Literatur und Sprache", "d": "Literaturanalyse, Medien, Sprachgebrauch.", "l": "FOS D12", "f": [["Literaturanalyse", "Inhalt, Form und Sprache deuten"], ["Sprachkritik", "Sprachgebrauch reflektieren"]]}]
  }},
  "mathematik":{name:"Mathematik",icon:"📐",color:"#12386b",klassen:[11, 12],themen:{
    "11":[{"t": "Funktionen und Analysis", "d": "Lineare, quadratische, ganzrationale Funktionen.", "l": "FOS M11", "f": [["Ganzrationale Funktion", "Polynomfunktion"], ["Ableitung", "Steigung der Tangente"]]}, {"t": "Geometrie", "d": "Trigonometrie, analytische Geometrie.", "l": "FOS M11", "f": [["Sinus", "Gegenkathete durch Hypotenuse"], ["Vektor", "Pfeil mit Richtung und Länge"]]}],
    "12":[{"t": "Stochastik und Analysis", "d": "Wahrscheinlichkeit, Integral, Exponentialfunktion.", "l": "FOS M12", "f": [["Binomialverteilung", "feste Anzahl unabhängiger Versuche"], ["Exponentialfunktion", "f(x) = a·b^x"], ["Integral", "Flächeninhalt unter dem Graphen"]]}]
  }},
  "englisch":{name:"Englisch",icon:"🇬🇧",color:"#1f5fa8",klassen:[11, 12],themen:{
    "11":[{"t": "Topics and Skills", "d": "Global issues, reading, writing.", "l": "FOS E11", "f": [["Reading comprehension", "Text verstehen"], ["Writing", "eigene Texte verfassen"]]}],
    "12":[{"t": "Business and Culture", "d": "Business English, culture, mediation.", "l": "FOS E12", "f": [["Business English", "Englisch im Beruf"], ["Mediation", "Sprachmittlung"]]}]
  }},
  "bwr":{name:"Betriebswirtschaftslehre und Rechnungswesen",icon:"💼",color:"#8a5a2b",klassen:[11, 12],themen:{
    "11":[{"t": "Betrieb und Rechnungswesen", "d": "Betriebsprozesse, Buchführung.", "l": "FOS BWR11", "f": [["Betriebsprozess", "Ablauf der Leistungserstellung"], ["Buchführung", "systematisches Aufzeichnen"]]}],
    "12":[{"t": "Kostenrechnung und Controlling", "d": "Kosten, Kennzahlen, Entscheidungen.", "l": "FOS BWR12", "f": [["Kostenrechnung", "Erfassen und Verteilen von Kosten"], ["Deckungsbeitrag", "Erlös minus variable Kosten"]]}]
  }},
  "sozialkunde":{name:"Sozialkunde / Politik",icon:"🏛",color:"#6b5b95",klassen:[11, 12],themen:{
    "11":[{"t": "Demokratie und Gesellschaft", "d": "Verfassung, Wahlen, Mitbestimmung.", "l": "FOS SZ11", "f": [["Demokratie", "Herrschaft des Volkes"], ["Grundrechte", "verbriefte Rechte des Bürgers"]]}],
    "12":[{"t": "Politik und Wirtschaft", "d": "Sozialstaat, Globalisierung, Konflikte.", "l": "FOS SZ12", "f": [["Sozialstaat", "Staat sichert soziale Gerechtigkeit"], ["Globalisierung", "weltweite Verflechtung"]]}]
  }},
  "physik":{name:"Physik (Technik)",icon:"🧲",color:"#6b5b95",klassen:[11, 12],themen:{
    "11":[{"t": "Mechanik und Elektrizität", "d": "Kraft, Energie, Stromkreise.", "l": "FOS PH11", "f": [["Kraft", "Ursache für Aenderung der Bewegung"], ["Ohmsches Gesetz", "U = R · I"]]}],
    "12":[{"t": "Elektronik und Systeme", "d": "Halbleiter, Schaltungen, Messen.", "l": "FOS PH12", "f": [["Halbleiter", "Leitfähigkeit zwischen Leiter und Isolator"], ["Sensor", "wandelt Größe in Signal"]]}]
  }},
  "informatik":{name:"Informatik",icon:"💻",color:"#1f5fa8",klassen:[11, 12],themen:{
    "11":[{"t": "Programmierung", "d": "Algorithmen, Datenstrukturen, Programme.", "l": "FOS INF11", "f": [["Algorithmus", "eindeutige Handlungsvorschrift"], ["Datenstruktur", "geordnete Sammlung von Daten"]]}],
    "12":[{"t": "Datenbanken und Netze", "d": "SQL, Netzwerke, Sicherheit.", "l": "FOS INF12", "f": [["SQL", "Sprache für Datenbankabfragen"], ["Firewall", "schützt Netzwerke vor Zugriffen"]]}]
  }},
  "gesundheit":{name:"Gesundheit und Pflege",icon:"🏥",color:"#c8442f",klassen:[11, 12],themen:{
    "11":[{"t": "Gesundheit und Prävention", "d": "Körper, Ernährung, Prävention.", "l": "FOS G11", "f": [["Prävention", "Vorbeugung von Krankheiten"], ["Hygiene", "Maßnahmen für Sauberkeit"]]}],
    "12":[{"t": "Pflege und Betreuung", "d": "Pflegeprozess, Kommunikation, Ethik.", "l": "FOS G12", "f": [["Pflegeprozess", "planvolles Handeln in der Pflege"], ["Empathie", "Einfühlungsvermögen"]]}]
  }},
  "sozialwesen":{name:"Sozialwesen",icon:"🤝",color:"#2f7d78",klassen:[11, 12],themen:{
    "11":[{"t": "Soziale Arbeit", "d": "Handlungsfelder, Methoden, Recht.", "l": "FOS SOZ11", "f": [["Soziale Arbeit", "Unterstützung von Menschen in Notlagen"], ["Handlungsfeld", "Arbeitsbereich der sozialen Arbeit"]]}],
    "12":[{"t": "Pädagogik und Beratung", "d": "Entwicklung, Erziehung, Beratung.", "l": "FOS SOZ12", "f": [["Erziehung", "Begleitung der Entwicklung"], ["Beratung", "Hilfe zur eigenen Entscheidung"]]}]
  }},
  "religion":{name:"Religion / Ethik",icon:"✝️",color:"#7a5c99",klassen:[11, 12],themen:{
    "11":[{"t": "Ethik und Menschenbild", "d": "Grundfragen, Werte, Verantwortung.", "l": "FOS R11", "f": [["Menschenbild", "Vorstellung vom Wesen des Menschen"], ["Gewissen", "innere Stimme für richtig und falsch"]]}],
    "12":[{"t": "Ethik in Beruf und Gesellschaft", "d": "Angewandte Ethik, Konflikte.", "l": "FOS R12", "f": [["Angewandte Ethik", "Ethik in konkreten Bereichen"], ["Konflikt", "Gegensatz von Interessen"]]}]
  }},
  "sport":{name:"Sport",icon:"⚽",color:"#3f7a52",klassen:[11, 12],themen:{
    "11":[{"t": "Sport und Training", "d": "Trainingslehre, Fitness, Spiele.", "l": "FOS S11", "f": [["Trainingslehre", "Planung von Training"], ["Fitness", "körperliche Leistungsfähigkeit"]]}],
    "12":[{"t": "Sport und Gesellschaft", "d": "Sport in Medien, Wirtschaft, Ethik.", "l": "FOS S12", "f": [["Doping", "verbotene Leistungssteigerung"], ["Fairplay", "ehrliches Verhalten im Sport"]]}]
  }}
};