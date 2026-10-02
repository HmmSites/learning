# -*- coding: utf-8 -*-
"""build6.py – Gymnasium-Oberstufe (Q11/Q12) sowie Wirtschaftsschule,
Fachoberschule und Berufsoberschule."""


def oberstufe(school, key, name, icon, color, themen, klassen=(11, 12)):
    sub = S.setdefault(school, {}).get(key)
    if sub:
        for k in klassen:
            if k not in sub["klassen"]:
                sub["klassen"].append(k)
        sub["klassen"].sort()
        for k, v in themen.items():
            sub["themen"].setdefault(str(k), []).extend(v)
    else:
        add(school, key, name, icon, color, list(klassen), themen)


# =============================== GYMNASIUM Q11/Q12 ===============================
oberstufe("gymnasium", "mathematik", "Mathematik", "\U0001F4D0", "#12386b", {
 "11": [
  t("Analysis: Ableitungen", "Ableitungsregeln, Tangente, Steigung.", "Q11 Analysis",
    [["Ableitung", "Steigung der Tangente an einer Stelle"], ["Potenzregel", "(x^n)' = n·x^(n-1)"], ["Kettenregel", "innere mal äußere Ableitung"]]),
  t("Kurvendiskussion", "Extrema, Wendepunkte, Verhalten im Unendlichen.", "Q11 Analysis",
    [["Extremum", "Hoch- oder Tiefpunkt (f'(x) = 0)"], ["Wendepunkt", "Krümmungswechsel (f''(x) = 0)"]]),
  t("Analytische Geometrie: Vektoren", "Vektoren, Skalarprodukt, Geraden im Raum.", "Q11 Geometrie",
    [["Vektor", "Pfeil mit Richtung und Länge"], ["Skalarprodukt", "a·b = 0 bedeutet senkrecht"], ["Gerade", "Aufpunkt plus Richtungsvektor"]]),
 ],
 "12": [
  t("Analysis: Integralrechnung", "Stammfunktion, bestimmtes Integral, Flächen.", "Q12 Analysis",
    [["Stammfunktion", "Umkehrung der Ableitung"], ["Bestimmtes Integral", "Flächeninhalt unter dem Graphen"]]),
  t("Stochastik", "Wahrscheinlichkeitsverteilung, Binomialverteilung, Hypothesentest.", "Q12 Stochastik",
    [["Binomialverteilung", "feste Anzahl unabhängiger Versuche"], ["Erwartungswert", "mittlerer Wert μ = n·p"], ["Hypothesentest", "Prüfen einer Vermutung"]]),
  t("Analytische Geometrie: Ebenen", "Ebenengleichungen, Lagebeziehungen, Abstände.", "Q12 Geometrie",
    [["Ebene", "durch drei Punkte festgelegt"], ["Normalenvektor", "steht senkrecht auf der Ebene"]]),
 ],
})

oberstufe("gymnasium", "deutsch", "Deutsch", "\u270D\uFE0F", "#8a3324", {
 "11": [
  t("Literatur der Klassik und Romantik", "Epochenmerkmale, Werke, Analyse.", "Q11 Literatur",
    [["Klassik", "Ideal der Harmonie (Goethe, Schiller)"], ["Romantik", "Sehnsucht, Blaue Blume, Unendlichkeit"]]),
  t("Sprache und Sprachwandel", "Sprachursprung, Wandel, Sprachphilosophie.", "Q11 Sprache",
    [["Sprachwandel", "Sprache verändert sich über die Zeit"], ["Sprachvarietät", "Dialekt, Standardsprache, Jugendsprache"]]),
  t("Erschließung pragmatischer Texte", "Analyse von Sachtexten, Erörterung.", "Q11 Methoden",
    [["Sachtextanalyse", "Argumentationsstruktur untersuchen"], ["Erörterung", "These, Argument, Beispiel, Fazit"]]),
 ],
 "12": [
  t("Abitur-Lektüren", "Werkvergleich, Dramen- und Romananalyse.", "Q12 Literatur",
    [["Motiv", "wiederkehrender Grundgedanke im Werk"], ["Interpretation", "deutende Auslegung des Textes"]]),
  t("Materialgestütztes Schreiben", "informierend und argumentierend schreiben.", "Q12 Methoden",
    [["Materialgestütztes Schreiben", "eigener Text auf Basis vorgegebener Quellen"], ["Adressatenbezug", "auf die Leserschaft ausrichten"]]),
  t("Gedichtvergleich", "Mehrere Gedichte motivisch vergleichen.", "Q12 Literatur",
    [["Vergleich", "Gemeinsamkeiten und Unterschiede herausarbeiten"], ["Lyrisches Ich", "Sprecher im Gedicht"]]),
 ],
})

oberstufe("gymnasium", "englisch", "Englisch", "\U0001F1EC\U0001F1E7", "#1f5fa8", {
 "11": [
  t("Global Issues", "Globalisierung, Klima, soziale Gerechtigkeit.", "Q11 Topics",
    [["Globalisation", "worldwide links of trade and culture"], ["Sustainability", "using resources responsibly"]]),
  t("Media and Society", "Medien, Fake News, Meinungsbildung.", "Q11 Topics",
    [["Media literacy", "kritischer Umgang mit Medien"], ["Bias", "einseitige Darstellung"]]),
  t("Dystopian Fiction", "Gattungsmerkmale und Analyse.", "Q11 Literature",
    [["Dystopia", "fiktive negative Zukunftswelt"], ["Narrator", "Erzählinstanz im Text"]]),
 ],
 "12": [
  t("Literature and Analysis", "Novels, short stories, drama.", "Q12 Literature",
    [["Characterisation", "Darstellung einer Figur"], ["Conflict", "zentraler Konflikt der Handlung"]]),
  t("Essay Writing", "argumentative und analytische Aufsätze.", "Q12 Skills",
    [["Thesis statement", "Kernaussage des Aufsatzes"], ["Cohesion", "Verbindung der Absätze"]]),
  t("Mediation", "Sprachmittlung zwischen Deutsch und Englisch.", "Q12 Skills",
    [["Mediation", "Inhalt in die andere Sprache übertragen"], ["Register", "passende Sprachebene wählen"]]),
 ],
})

oberstufe("gymnasium", "physik", "Physik", "\U0001F9F2", "#6b5b95", {
 "11": [
  t("Elektrodynamik und Induktion", "Magnetfeld, Induktion, Wechselstrom.", "Q11 Physik",
    [["Induktion", "Spannung durch Aenderung des Magnetfelds"], ["Lorentzkraft", "Kraft auf bewegte Ladung"]]),
  t("Schwingungen und Wellen", "Harmonische Schwingung, Interferenz.", "Q11 Physik",
    [["Schwingung", "periodische Bewegung um eine Ruhelage"], ["Interferenz", "Ueberlagerung von Wellen"]]),
 ],
 "12": [
  t("Wärmelehre und Thermodynamik", "Temperatur, Wärme, Hauptsätze.", "Q12 Physik",
    [["Wärme", "übertragene Energie aufgrund von Temperaturunterschied"], ["Entropie", "Maß für Unordnung"]]),
  t("Quantenphysik und Atomphysik", "Photon, Welle-Teilchen-Dualismus.", "Q12 Physik",
    [["Photon", "Lichtquant"], ["Dualismus", "Licht ist Welle und Teilchen"]]),
 ],
})

oberstufe("gymnasium", "biologie", "Biologie", "\U0001F9EC", "#2f7d78", {
 "11": [t("Zellbiologie und Stoffwechsel", "Enzyme, Photosynthese, Zellatmung.", "Q11 Biologie",
    [["Enzym", "Biokatalysator"], ["Photosynthese", "Lichtenergie zu Glucose"], ["Zellatmung", "Glucose zu Energie"]]),
   t("Neurobiologie", "Nervenzelle, Reizleitung, Synapse.", "Q11 Biologie",
    [["Aktionspotential", "elektrisches Signal der Nervenzelle"], ["Synapse", "Kontaktstelle zwischen Nervenzellen"]])],
 "12": [t("Genetik und Gentechnik", "DNA, Proteinbiosynthese, Mutationen.", "Q12 Biologie",
    [["DNA", "Träger der Erbinformation"], ["Mutation", "Aenderung der Erbinformation"]]),
   t("Evolution", "Evolutionstheorien, Stammbaumanalyse.", "Q12 Biologie",
    [["Selektion", "Auswahl der besser Angepassten"], ["Stammbaum", "abstammungsgeschichtliche Verwandtschaft"]])],
})

oberstufe("gymnasium", "chemie", "Chemie", "\u2697\uFE0F", "#b5651d", {
 "11": [t("Organische Chemie", "Kohlenwasserstoffe, funktionelle Gruppen.", "Q11 Chemie",
    [["Kohlenwasserstoff", "Verbindung aus C und H"], ["Funktionelle Gruppe", "reaktiver Bestandteil eines Moleküls"]]),
   t("Reaktionskinetik und Gleichgewicht", "Geschwindigkeit, Massenwirkungsgesetz.", "Q11 Chemie",
    [["Katalysator", "senkt die Aktivierungsenergie"], ["Gleichgewicht", "Hin- und Rückreaktion gleich schnell"]])],
 "12": [t("Sauren und Basen", "Protolyse, pH-Wert, Puffer.", "Q12 Chemie",
    [["pH-Wert", "Maß für die Protonenkonzentration"], ["Puffer", "hält den pH-Wert stabil"]]),
   t("Redox und Elektrochemie", "Elektronenübergang, Galvanische Zelle.", "Q12 Chemie",
    [["Redoxreaktion", "Elektronenübergang"], ["Galvanische Zelle", "wandelt chemische in elektrische Energie"]])],
})

oberstufe("gymnasium", "geschichte", "Geschichte", "\U0001F3FA", "#8a5a2b", {
 "11": [t("Nationalsozialismus und Zweiter Weltkrieg", "Machtergreifung, Holocaust, Widerstand.", "Q11 Geschichte",
    [["Machtergreifung", "1933 Errichtung der NS-Diktatur"], ["Holocaust", "Völkermord an den Juden"], ["Widerstand", "Auflehnung gegen das Regime"]]),
   t("Deutschland nach 1945", "Besatzung, Teilung, Grundgesetz.", "Q11 Geschichte",
    [["Grundgesetz", "Verfassung der Bundesrepublik 1949"], ["Teilung", "BRD und DDR"]]),
   t("Kalter Krieg", "Ost-West-Konflikt, Blockbildung.", "Q11 Geschichte",
    [["Kalter Krieg", "Spannung zwischen USA und UdSSR ohne direkten Krieg"], ["Blockbildung", "NATO und Warschauer Pakt"]])],
 "12": [t("Deutsche Einheit und Europa", "Wende 1989, Wiedervereinigung, EU.", "Q12 Geschichte",
    [["Wende", "1989 Ende der DDR"], ["Wiedervereinigung", "3. Oktober 1990"], ["Europäische Union", "Staatenbund in Europa"]]),
   t("Weltordnung im 21. Jahrhundert", "Globalisierung, Konflikte, Menschenrechte.", "Q12 Geschichte",
    [["Globalisierung", "weltweite Verflechtung"], ["Menschenrechte", "universelle Grundrechte"]])],
})

oberstufe("gymnasium", "erdkunde", "Geographie", "\U0001F30D", "#3f7a52", {
 "11": [t("Stadtgeographie und Raumplanung", "Stadtstruktur, Urbanisierung.", "Q11 Geo",
    [["Urbanisierung", "Zunahme der Stadtbevölkerung"], ["City", "Innenstadt mit hoher Nutzungsdichte"]]),
   t("Wirtschaftsräume", "Standortfaktoren, Strukturwandel.", "Q11 Geo",
    [["Standortfaktor", "Bedingung für einen Betrieb"], ["Strukturwandel", "Wandel von Wirtschaftssektoren"]])],
 "12": [t("Geopolitische Konflikte und Ressourcen", "Rohstoffe, Konflikte, Nachhaltigkeit.", "Q12 Geo",
    [["Geopolitik", "Politik beeinflusst durch Geographie"], ["Ressource", "nutzbarer Rohstoff"], ["Nachhaltigkeit", "ressourcenschonendes Handeln"]])],
})

oberstufe("gymnasium", "wirtschaft", "Wirtschaft und Recht", "\U0001F4B6", "#8a5a2b", {
 "11": [t("Wirtschaftsordnung und Markt", "Soziale Marktwirtschaft, Preisbildung.", "Q11 Wirtschaft",
    [["Soziale Marktwirtschaft", "Markt plus sozialer Ausgleich"], ["Preisbildung", "Angebot und Nachfrage"]]),
   t("Betrieb und Rechnungswesen", "Kosten, Gewinn, Bilanz.", "Q11 Wirtschaft",
    [["Bilanz", "Gegenüberstellung von Vermögen und Kapital"], ["Gewinn", "Erlös minus Kosten"]])],
 "12": [t("Wirtschaftspolitik", "Konjunktur, Geldpolitik, Arbeitsmarkt.", "Q12 Wirtschaft",
    [["Konjunktur", "Wellenbewegung der Wirtschaft"], ["Geldpolitik", "Steuerung der Geldmenge"]]),
   t("Recht", "Verträge, Haftung, Arbeitsrecht.", "Q12 Wirtschaft",
    [["Vertrag", "Uebereinkunft zweier Parteien"], ["Haftung", "Verantwortung für Schaden"]])],
})

oberstufe("gymnasium", "informatik", "Informatik", "\U0001F4BB", "#1f5fa8", {
 "11": [t("Objekte und Algorithmen", "Objekte, Listen, Bäume, Sortierverfahren.", "Q11 Informatik",
    [["Objekt", "Daten und Methoden zusammen"], ["Algorithmus", "eindeutige Handlungsvorschrift"], ["Sortieren", "Ordnen von Daten"]]),
   t("Datenbanken", "Tabellen, Schlüssel, SQL-Abfragen.", "Q11 Informatik",
    [["Primärschlüssel", "eindeutige Kennung eines Datensatzes"], ["SQL", "Sprache für Datenbankabfragen"]])],
 "12": [t("Modellierung und Graphen", "Graphen, kürzeste Wege, Automaten.", "Q12 Informatik",
    [["Graph", "Knoten und Kanten"], ["Endlicher Automat", "Modell für Zustände und Übergänge"]]),
   t("Netzwerke und Sicherheit", "Protokolle, Verschlüsselung.", "Q12 Informatik",
    [["Protokoll", "Regelwerk für den Datenaustausch"], ["Verschlüsselung", "Schutz von Daten durch Umwandlung"]])],
})

# =============================== wirtschaftsschule 6-10 ===============================
upsert("wirtschaftsschule", "deutsch", "Deutsch", "\u270D\uFE0F", "#8a3324", [6, 7, 8, 9, 10], {
 "6": [t("Erzählen und Berichten", "Erlebnisse und Sachverhalte darstellen.", "WS D6",
    [["Erzählung", "lebendige Darstellung"], ["Bericht", "sachlich in Reihenfolge"]])],
 "7": [t("Inhaltsangabe und Argumentieren", "Textinhalt erfassen, Meinung begründen.", "WS D7",
    [["Inhaltsangabe", "kurze Zusammenfassung im Präsens"], ["Argument", "Begründung einer Meinung"]])],
 "8": [t("Bewerbung und Geschäftsbrief", "Formelle Briefe und Bewerbung.", "WS D8",
    [["Geschäftsbrief", "formeller Brief nach DIN 5008"], ["Bewerbung", "Anschreiben und Lebenslauf"]])],
 "9": [t("Erörtern und Analysieren", "Sachtexte und Erörterung.", "WS D9",
    [["Erörterung", "These, Argument, Beispiel, Fazit"], ["Sachtextanalyse", "Argumentationsstruktur prüfen"]])],
 "10": [t("Abschlussprüfung Deutsch", "Textarbeit, freies Schreiben, Sprachrichtigkeit.", "WS D10",
    [["Textarbeit", "Text verstehen und bearbeiten"], ["Sprachrichtigkeit", "Grammatik und Rechtschreibung"]])],
})

upsert("wirtschaftsschule", "mathematik", "Mathematik", "\U0001F4D0", "#12386b", [6, 7, 8, 9, 10], {
 "6": [t("Grundrechenarten und Brüche", "Rechnen mit Brüchen und Dezimalzahlen.", "WS M6",
    [["Bruch", "Teil eines Ganzen (1/2)"], ["Dezimalbruch", "Schreibweise mit Komma (0,5)"]])],
 "7": [t("Prozent- und Zinsrechnung", "Prozente, Zinsen, Rabatt.", "WS M7",
    [["Prozent", "Anteil von Hundert"], ["Zins", "Vergütung für Kapital"]])],
 "8": [t("Gleichungen und Funktionen", "Terme, lineare Gleichungen und Funktionen.", "WS M8",
    [["Term", "Rechenausdruck mit Variablen"], ["Lineare Funktion", "Graph ist eine Gerade"]])],
 "9": [t("Geometrie und Körper", "Flächen, Volumen, Pythagoras.", "WS M9",
    [["Volumen", "Rauminhalt eines Körpers"], ["Satz des Pythagoras", "a² + b² = c²"]]),
   t("Daten und Zufall", "Statistik und Wahrscheinlichkeit.", "WS M9",
    [["Mittelwert", "Durchschnitt der Werte"], ["Wahrscheinlichkeit", "Chance eines Ereignisses"]])],
 "10": [t("Abschlussprüfung Mathematik", "Funktionen, Geometrie, Stochastik, Sachaufgaben.", "WS M10",
    [["Funktion", "Zuordnung von x zu y"], ["Sachaufgabe", "Aufgabe aus dem Alltag"]])],
})

upsert("wirtschaftsschule", "englisch", "Englisch", "\U0001F1EC\U0001F1E7", "#1f5fa8", [6, 7, 8, 9, 10], {
 "6": [t("Everyday English", "Alltag, Schule, Familie, Zeitformen.", "WS E6",
    [["Simple Present", "einfache Gegenwart"], ["Vocabulary", "Wortschatz zu Alltagsthemen"]])],
 "7": [t("Past and Future", "Vergangenheit und Zukunft ausdrücken.", "WS E7",
    [["Simple Past", "einfache Vergangenheit"], ["Will-future", "Zukunft mit will"]])],
 "8": [t("Business Basics", "Geschäftskommunikation, E-Mails, Telefon.", "WS E8",
    [["Business e-mail", "formelle E-Mail"], ["Small talk", "lockeres Gespräch"]])],
 "9": [t("Grammar and Communication", "Passiv, If-Sätze, Diskussion.", "WS E9",
    [["Passive", "The letter was written."], ["If-clause", "Bedingungssatz"]])],
 "10": [t("Abschlussprüfung Englisch", "Reading, Listening, Writing, Use of English.", "WS E10",
    [["Reading comprehension", "Text verstehen"], ["Text production", "eigenen Text schreiben"]])],
})

upsert("wirtschaftsschule", "bsk", "Betriebswirtschaftliche Steuerung und Kontrolle", "\U0001F4BC", "#8a5a2b", [8, 9, 10], {
 "8": [t("Betrieb und Markt", "Betriebsarten, Markt, Preisbildung.", "WS BSK8",
    [["Betrieb", "Ort der Leistungserstellung"], ["Markt", "Zusammentreffen von Angebot und Nachfrage"], ["Preisbildung", "durch Angebot und Nachfrage"]])],
 "9": [t("Rechnungswesen", "Buchführung, Bilanz, Kosten.", "WS BSK9",
    [["Buchführung", "systematisches Aufzeichnen der Geschäfte"], ["Bilanz", "Vermögen und Kapital"], ["Kosten", "Wert der verbrauchten Güter"]])],
 "10": [t("Controlling und Management", "Kennzahlen, Planung, Entscheidung.", "WS BSK10",
    [["Controlling", "Steuerung und Kontrolle des Betriebs"], ["Kennzahl", "messbarer Wert zur Bewertung"], ["Break-even", "Punkt ohne Gewinn und Verlust"]])],
})

upsert("wirtschaftsschule", "rechnungswesen", "Rechnungswesen", "\U0001F4D2", "#1f6f4a", [9, 10], {
 "9": [t("Grundlagen der Buchführung", "Konten, Buchungssatz, Journal.", "WS RW9",
    [["Konto", "Gegenüberstellung von Soll und Haben"], ["Buchungssatz", "Soll an Haben"], ["Journal", "chronologisches Grundbuch"]])],
 "10": [t("Jahresabschluss", "Bilanz, Gewinn- und Verlustrechnung.", "WS RW10",
    [["Abschluss", "Konten saldieren und abschließen"], ["GuV", "Gegenüberstellung von Erträgen und Aufwand"]])],
})

upsert("wirtschaftsschule", "wi", "Wirtschaftsinformatik", "\U0001F4BB", "#1f5fa8", [9, 10], {
 "9": [t("Tabellenkalkulation", "Formeln, Funktionen, Diagramme.", "WS WI9",
    [["Formel", "Berechnung in einer Tabellenzelle"], ["Funktion", "vordefinierte Berechnung wie SUMME"]])],
 "10": [t("Datenbanken und Netzwerke", "Datenbanken, Internet, Datenschutz.", "WS WI10",
    [["Datenbank", "systematische Datensammlung"], ["Datenschutz", "Schutz personenbezogener Daten"]])],
})

upsert("wirtschaftsschule", "vwl", "Volkswirtschaftliche Grundlagen", "\U0001F4C8", "#2f7d78", [10], {
 "10": [t("Wirtschaft und Staat", "Wirtschaftskreislauf, Sozialprodukt, Konjunktur.", "WS VWL10",
    [["Wirtschaftskreislauf", "Kreislauf von Geld und Gütern"], ["Bruttoinlandsprodukt", "Wert aller Güter und Dienste"], ["Konjunktur", "Wellenbewegung der Wirtschaft"]])],
})

upsert("wirtschaftsschule", "sport", "Sport", "\u26BD", "#3f7a52", [6, 7, 8, 9, 10], {
 "6": [t("Bewegung und Spiel", "Grundformen, Mannschaftsspiele.", "WS S6",
    [["Mannschaftsspiel", "gemeinsam spielen"], ["Aufwärmen", "Körper vorbereiten"]])],
 "10": [t("Sport und Gesundheit", "Training, Ausdauer, Erholung.", "WS S10",
    [["Ausdauer", "länger belastbar sein"], ["Regeneration", "Erholung nach Belastung"]])],
})

upsert("wirtschaftsschule", "religion", "Religion / Ethik", "\u271D\uFE0F", "#7a5c99", [6, 7, 8, 9, 10], {
 "6": [t("Werte und Zusammenleben", "Werte, Regeln, Verantwortung.", "WS R6",
    [["Wert", "wichtige Grundhaltung"], ["Verantwortung", "für sein Handeln einstehen"]])],
 "10": [t("Ethik und Gesellschaft", "Ethische Fragen, Menschenbilder.", "WS R10",
    [["Ethik", "Lehre vom richtigen Handeln"], ["Menschenwürde", "unverletzlicher Wert jedes Menschen"]])],
})

# =============================== FACHOBERSCHULE 11-12 ===============================
upsert("fachoberschule", "deutsch", "Deutsch", "\u270D\uFE0F", "#8a3324", [11, 12], {
 "11": [t("Sachtexte und Erörterung", "Analyse, Argumentation, Kommentar.", "FOS D11",
    [["Sachtextanalyse", "Argumentationsstruktur untersuchen"], ["Kommentar", "meinungsbetonter Text"]])],
 "12": [t("Literatur und Sprache", "Literaturanalyse, Medien, Sprachgebrauch.", "FOS D12",
    [["Literaturanalyse", "Inhalt, Form und Sprache deuten"], ["Sprachkritik", "Sprachgebrauch reflektieren"]])],
})

upsert("fachoberschule", "mathematik", "Mathematik", "\U0001F4D0", "#12386b", [11, 12], {
 "11": [t("Funktionen und Analysis", "Lineare, quadratische, ganzrationale Funktionen.", "FOS M11",
    [["Ganzrationale Funktion", "Polynomfunktion"], ["Ableitung", "Steigung der Tangente"]]),
   t("Geometrie", "Trigonometrie, analytische Geometrie.", "FOS M11",
    [["Sinus", "Gegenkathete durch Hypotenuse"], ["Vektor", "Pfeil mit Richtung und Länge"]])],
 "12": [t("Stochastik und Analysis", "Wahrscheinlichkeit, Integral, Exponentialfunktion.", "FOS M12",
    [["Binomialverteilung", "feste Anzahl unabhängiger Versuche"], ["Exponentialfunktion", "f(x) = a·b^x"], ["Integral", "Flächeninhalt unter dem Graphen"]])],
})

upsert("fachoberschule", "englisch", "Englisch", "\U0001F1EC\U0001F1E7", "#1f5fa8", [11, 12], {
 "11": [t("Topics and Skills", "Global issues, reading, writing.", "FOS E11",
    [["Reading comprehension", "Text verstehen"], ["Writing", "eigene Texte verfassen"]])],
 "12": [t("Business and Culture", "Business English, culture, mediation.", "FOS E12",
    [["Business English", "Englisch im Beruf"], ["Mediation", "Sprachmittlung"]])],
})

upsert("fachoberschule", "bwr", "Betriebswirtschaftslehre und Rechnungswesen", "\U0001F4BC", "#8a5a2b", [11, 12], {
 "11": [t("Betrieb und Rechnungswesen", "Betriebsprozesse, Buchführung.", "FOS BWR11",
    [["Betriebsprozess", "Ablauf der Leistungserstellung"], ["Buchführung", "systematisches Aufzeichnen"]])],
 "12": [t("Kostenrechnung und Controlling", "Kosten, Kennzahlen, Entscheidungen.", "FOS BWR12",
    [["Kostenrechnung", "Erfassen und Verteilen von Kosten"], ["Deckungsbeitrag", "Erlös minus variable Kosten"]])],
})

upsert("fachoberschule", "sozialkunde", "Sozialkunde / Politik", "\U0001F3DB", "#6b5b95", [11, 12], {
 "11": [t("Demokratie und Gesellschaft", "Verfassung, Wahlen, Mitbestimmung.", "FOS SZ11",
    [["Demokratie", "Herrschaft des Volkes"], ["Grundrechte", "verbriefte Rechte des Bürgers"]])],
 "12": [t("Politik und Wirtschaft", "Sozialstaat, Globalisierung, Konflikte.", "FOS SZ12",
    [["Sozialstaat", "Staat sichert soziale Gerechtigkeit"], ["Globalisierung", "weltweite Verflechtung"]])],
})

upsert("fachoberschule", "physik", "Physik (Technik)", "\U0001F9F2", "#6b5b95", [11, 12], {
 "11": [t("Mechanik und Elektrizität", "Kraft, Energie, Stromkreise.", "FOS PH11",
    [["Kraft", "Ursache für Aenderung der Bewegung"], ["Ohmsches Gesetz", "U = R · I"]])],
 "12": [t("Elektronik und Systeme", "Halbleiter, Schaltungen, Messen.", "FOS PH12",
    [["Halbleiter", "Leitfähigkeit zwischen Leiter und Isolator"], ["Sensor", "wandelt Größe in Signal"]])],
})

upsert("fachoberschule", "informatik", "Informatik", "\U0001F4BB", "#1f5fa8", [11, 12], {
 "11": [t("Programmierung", "Algorithmen, Datenstrukturen, Programme.", "FOS INF11",
    [["Algorithmus", "eindeutige Handlungsvorschrift"], ["Datenstruktur", "geordnete Sammlung von Daten"]])],
 "12": [t("Datenbanken und Netze", "SQL, Netzwerke, Sicherheit.", "FOS INF12",
    [["SQL", "Sprache für Datenbankabfragen"], ["Firewall", "schützt Netzwerke vor Zugriffen"]])],
})

upsert("fachoberschule", "gesundheit", "Gesundheit und Pflege", "\U0001F3E5", "#c8442f", [11, 12], {
 "11": [t("Gesundheit und Prävention", "Körper, Ernährung, Prävention.", "FOS G11",
    [["Prävention", "Vorbeugung von Krankheiten"], ["Hygiene", "Maßnahmen für Sauberkeit"]])],
 "12": [t("Pflege und Betreuung", "Pflegeprozess, Kommunikation, Ethik.", "FOS G12",
    [["Pflegeprozess", "planvolles Handeln in der Pflege"], ["Empathie", "Einfühlungsvermögen"]])],
})

upsert("fachoberschule", "sozialwesen", "Sozialwesen", "\U0001F91D", "#2f7d78", [11, 12], {
 "11": [t("Soziale Arbeit", "Handlungsfelder, Methoden, Recht.", "FOS SOZ11",
    [["Soziale Arbeit", "Unterstützung von Menschen in Notlagen"], ["Handlungsfeld", "Arbeitsbereich der sozialen Arbeit"]])],
 "12": [t("Pädagogik und Beratung", "Entwicklung, Erziehung, Beratung.", "FOS SOZ12",
    [["Erziehung", "Begleitung der Entwicklung"], ["Beratung", "Hilfe zur eigenen Entscheidung"]])],
})

upsert("fachoberschule", "religion", "Religion / Ethik", "\u271D\uFE0F", "#7a5c99", [11, 12], {
 "11": [t("Ethik und Menschenbild", "Grundfragen, Werte, Verantwortung.", "FOS R11",
    [["Menschenbild", "Vorstellung vom Wesen des Menschen"], ["Gewissen", "innere Stimme für richtig und falsch"]])],
 "12": [t("Ethik in Beruf und Gesellschaft", "Angewandte Ethik, Konflikte.", "FOS R12",
    [["Angewandte Ethik", "Ethik in konkreten Bereichen"], ["Konflikt", "Gegensatz von Interessen"]])],
})

upsert("fachoberschule", "sport", "Sport", "\u26BD", "#3f7a52", [11, 12], {
 "11": [t("Sport und Training", "Trainingslehre, Fitness, Spiele.", "FOS S11",
    [["Trainingslehre", "Planung von Training"], ["Fitness", "körperliche Leistungsfähigkeit"]])],
 "12": [t("Sport und Gesellschaft", "Sport in Medien, Wirtschaft, Ethik.", "FOS S12",
    [["Doping", "verbotene Leistungssteigerung"], ["Fairplay", "ehrliches Verhalten im Sport"]])],
})

# =============================== BERUFSOBERSCHULE 12-13 ===============================
upsert("berufsoberschule", "deutsch", "Deutsch", "\u270D\uFE0F", "#8a3324", [12, 13], {
 "12": [t("Texte analysieren und erörtern", "Sachtexte, Literatur, Argumentation.", "BOS D12",
    [["Analyse", "Untersuchung von Aufbau und Sprache"], ["Erörterung", "These, Argument, Beispiel, Fazit"]])],
 "13": [t("Abiturvorbereitung Deutsch", "Textvergleich, Sprachbetrachtung.", "BOS D13",
    [["Textvergleich", "Gemeinsamkeiten und Unterschiede"], ["Sprachbetrachtung", "Wirkung von Sprache"]])],
})

upsert("berufsoberschule", "mathematik", "Mathematik", "\U0001F4D0", "#12386b", [12, 13], {
 "12": [t("Analysis", "Funktionen, Ableitung, Extremwerte.", "BOS M12",
    [["Ableitung", "Steigung der Tangente"], ["Extremwert", "Hoch- oder Tiefpunkt"]])],
 "13": [t("Integral, Stochastik, Geometrie", "Integralrechnung, Wahrscheinlichkeit, Vektoren.", "BOS M13",
    [["Integral", "Flächeninhalt unter dem Graphen"], ["Binomialverteilung", "feste Anzahl unabhängiger Versuche"], ["Vektor", "Pfeil mit Richtung und Länge"]])],
})

upsert("berufsoberschule", "englisch", "Englisch", "\U0001F1EC\U0001F1E7", "#1f5fa8", [12, 13], {
 "12": [t("Comprehension and Writing", "Reading, listening, writing.", "BOS E12",
    [["Comprehension", "Text verstehen"], ["Writing", "eigene Texte verfassen"]])],
 "13": [t("Abiturvorbereitung Englisch", "Essay, mediation, analysis.", "BOS E13",
    [["Essay", "argumentativer Aufsatz"], ["Mediation", "Sprachmittlung"]])],
})

upsert("berufsoberschule", "bwr", "Betriebswirtschaftslehre mit Rechnungswesen", "\U0001F4BC", "#8a5a2b", [12, 13], {
 "12": [t("Betriebswirtschaft", "Leistungsprozess, Marketing, Rechnungswesen.", "BOS BWR12",
    [["Marketing", "Ausrichtung auf den Markt"], ["Buchführung", "systematisches Aufzeichnen"]])],
 "13": [t("Controlling und Jahresabschluss", "Kennzahlen, Bilanz, Analyse.", "BOS BWR13",
    [["Bilanz", "Vermögen und Kapital"], ["Kennzahl", "messbarer Wert zur Bewertung"]])],
})

upsert("berufsoberschule", "vwl", "Volkswirtschaftslehre", "\U0001F4C8", "#2f7d78", [12, 13], {
 "12": [t("Mikro- und Makroökonomie", "Markt, Preis, Wirtschaftskreislauf.", "BOS VWL12",
    [["Mikroökonomie", "Verhalten einzelner Haushalte und Firmen"], ["Makroökonomie", "gesamtwirtschaftliche Größen"]])],
 "13": [t("Wirtschaftspolitik", "Konjunktur, Geld, Arbeitsmarkt.", "BOS VWL13",
    [["Konjunkturpolitik", "Steuerung der Wirtschaft"], ["Inflation", "anhaltender Preisanstieg"]])],
})

upsert("berufsoberschule", "physik", "Physik (Technik)", "\U0001F9F2", "#6b5b95", [12, 13], {
 "12": [t("Mechanik und Elektrizität", "Kraft, Energie, elektrische Felder.", "BOS PH12",
    [["Energie", "Fähigkeit Arbeit zu verrichten"], ["Elektrisches Feld", "Kraftwirkung auf Ladungen"]])],
 "13": [t("Schwingungen und moderne Physik", "Wellen, Quanten, Atomphysik.", "BOS PH13",
    [["Welle", "Ausbreitung einer Schwingung"], ["Photon", "Lichtquant"]])],
})

upsert("berufsoberschule", "informatik", "Informatik", "\U0001F4BB", "#1f5fa8", [12, 13], {
 "12": [t("Programmierung und Algorithmen", "Algorithmen, Datenstrukturen, Entwicklung.", "BOS INF12",
    [["Algorithmus", "eindeutige Handlungsvorschrift"], ["Datenstruktur", "geordnete Sammlung von Daten"]])],
 "13": [t("Datenbanken und Netze", "SQL, Netzwerke, IT-Sicherheit.", "BOS INF13",
    [["SQL", "Sprache für Datenbankabfragen"], ["IT-Sicherheit", "Schutz von Daten und Systemen"]])],
})

upsert("berufsoberschule", "sozialkunde", "Sozialkunde / Politik", "\U0001F3DB", "#6b5b95", [12, 13], {
 "12": [t("Demokratie und Recht", "Verfassung, Grundrechte, Rechtsordnung.", "BOS SZ12",
    [["Grundrechte", "verbriefte Rechte des Bürgers"], ["Rechtsstaat", "Staat handelt nach Gesetzen"]])],
 "13": [t("Gesellschaft und Weltpolitik", "Sozialstaat, Globalisierung, Konflikte.", "BOS SZ13",
    [["Sozialstaat", "Staat sichert soziale Gerechtigkeit"], ["Globalisierung", "weltweite Verflechtung"]])],
})

upsert("berufsoberschule", "religion", "Religion / Ethik", "\u271D\uFE0F", "#7a5c99", [12, 13], {
 "12": [t("Ethik und Verantwortung", "Werte, Entscheidungen, Verantwortung.", "BOS R12",
    [["Wert", "wichtige Grundhaltung"], ["Verantwortung", "für sein Handeln einstehen"]])],
 "13": [t("Angewandte Ethik", "Berufsethik, Bioethik, Gesellschaft.", "BOS R13",
    [["Berufsethik", "ethische Fragen im Beruf"], ["Bioethik", "ethische Fragen in Biologie und Medizin"]])],
})

upsert("berufsoberschule", "sport", "Sport", "\u26BD", "#3f7a52", [12, 13], {
 "12": [t("Training und Gesundheit", "Trainingslehre, Fitness, Prävention.", "BOS S12",
    [["Trainingslehre", "Planung von Training"], ["Prävention", "Vorbeugung von Verletzungen"]])],
 "13": [t("Sport und Gesellschaft", "Sport in Medien, Wirtschaft, Ethik.", "BOS S13",
    [["Fairplay", "ehrliches Verhalten im Sport"], ["Doping", "verbotene Leistungssteigerung"]])],
})
