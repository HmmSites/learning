# -*- coding: utf-8 -*-
"""build5.py – ergänzt Grundschule, Förderschule, Wirtschaftsschule,
Fachoberschule, Berufsoberschule sowie die Gymnasium-Oberstufe (Q11/Q12)."""


def upsert(school, key, name, icon, color, klassen, themen):
    """Fügt ein Fach hinzu oder erweitert ein vorhandenes (Klassen + Themen)."""
    sub = S.setdefault(school, {}).get(key)
    if sub:
        for k in klassen:
            if k not in sub["klassen"]:
                sub["klassen"].append(k)
        sub["klassen"].sort()
        for k, v in themen.items():
            sub["themen"].setdefault(str(k), []).extend(v)
    else:
        add(school, key, name, icon, color, klassen, themen)


# =============================== GRUNDSCHULE 1-4 ===============================
upsert("grundschule", "deutsch", "Deutsch", "\u270D\uFE0F", "#8a3324", [1, 2, 3, 4], {
 "1": [
  t("Buchstaben und Laute", "Anlaut, Buchstabe-Laut-Zuordnung, Silben.", "D1 1",
    [["Anlaut", "erster Laut eines Wortes (Baum -> B)"], ["Silbe", "Sprechstück eines Wortes (Blu-me)"], ["Vokal", "Selbstlaut a, e, i, o, u"]]),
  t("Erstes Lesen und Schreiben", "Wörter erlesen, lautgetreu schreiben.", "D1 2",
    [["Lauttreue", "schreiben, wie man spricht"], ["Leserichtung", "von links nach rechts, Zeile für Zeile"]]),
  t("Sprechen und Zuhören", "Erzählen, zuhören, ausreden lassen.", "D1 3",
    [["Erzählen", "von Erlebnissen berichten"], ["Zuhören", "dem anderen aufmerksam folgen"]]),
 ],
 "2": [
  t("Wortarten entdecken", "Nomen, Verben, Adjektive erkennen.", "D2 1",
    [["Nomen", "Namenwort (Hund, Schule)"], ["Verb", "Tunwort (laufen, singen)"], ["Adjektiv", "Wiewort (klein, laut)"]]),
  t("Richtig schreiben", "Großschreibung von Nomen, Satzzeichen.", "D2 2",
    [["Punkt", "am Ende eines Aussagesatzes"], ["Fragezeichen", "am Ende einer Frage"]]),
  t("Lesen und Verstehen", "Sinnerfassend lesen, Fragen zum Text.", "D2 3",
    [["Ueberschrift", "kündigt das Thema an"], ["Schlüsselwort", "trägt den Inhalt"]]),
 ],
 "3": [
  t("Satzglieder", "Subjekt und Prädikat bestimmen.", "D3 1",
    [["Subjekt", "Wer oder was? (Der Hund bellt.)"], ["Prädikat", "Was tut das Subjekt? (bellt)"]]),
  t("Erzählen und Schreiben", "Geschichten aufbauen, Bildergeschichte.", "D3 2",
    [["Einleitung", "führt in die Situation ein"], ["Höhepunkt", "spannendster Moment"], ["Schluss", "beendet die Geschichte"]]),
  t("Wortschatz erweitern", "Wortfelder und Wortfamilien.", "D3 3",
    [["Wortfeld", "Wörter mit ähnlicher Bedeutung (gehen, laufen)"], ["Wortfamilie", "gleicher Wortstamm (fahren, Fahrer)"]]),
 ],
 "4": [
  t("Zeitformen", "Präsens und Präteritum unterscheiden.", "D4 1",
    [["Präsens", "Gegenwart (ich gehe)"], ["Präteritum", "Vergangenheit (ich ging)"]]),
  t("Rechtschreibung", "Dehnung, Schärfung, s-Laute.", "D4 2",
    [["Dehnung", "langer Vokal (Bahn)"], ["Schärfung", "kurzer Vokal, doppelter Konsonant (Sonne)"]]),
  t("Texte verfassen", "Berichten, beschreiben, Briefe schreiben.", "D4 3",
    [["Bericht", "sachlich, beantwortet W-Fragen"], ["Brief", "Anrede, Text, Gruß, Unterschrift"]]),
 ],
})

upsert("grundschule", "mathematik", "Mathematik", "\U0001F4D0", "#12386b", [1, 2, 3, 4], {
 "1": [
  t("Zahlen bis 20", "Zählen, vergleichen, ordnen.", "M1 1",
    [["Zahlenreihe", "1, 2, 3 ... in der richtigen Reihenfolge"], ["Vergleichen", "größer, kleiner, gleich"]]),
  t("Rechnen bis 20", "Addieren und subtrahieren im Zahlenraum 20.", "M1 2",
    [["Addition", "Plus-Rechnen (3 + 5)"], ["Subtraktion", "Minus-Rechnen (8 - 3)"]]),
  t("Formen und Muster", "Geometrische Formen, Muster fortsetzen.", "M1 3",
    [["Kreis", "runde Form ohne Ecken"], ["Dreieck", "drei Ecken und drei Seiten"]]),
 ],
 "2": [
  t("Zahlen bis 100", "Zehner und Einer, Zahlenstrahl.", "M2 1",
    [["Zehner", "10er-Bündel (30 = 3 Zehner)"], ["Einer", "Rest bis zur nächsten Zehnerzahl"]]),
  t("Einmaleins", "Kernaufgaben des kleinen Einmaleins.", "M2 2",
    [["Multiplikation", "Mal-Rechnen (4 · 3)"], ["Division", "Geteilt-Rechnen (12 : 3)"]]),
  t("Größen", "Längen (m, cm), Zeit, Geld.", "M2 3",
    [["Meter", "1 m = 100 cm"], ["Euro", "1 EUR = 100 Cent"]]),
 ],
 "3": [
  t("Zahlen bis 1000", "Hunderter, Zehner, Einer.", "M3 1",
    [["Hunderter", "100er-Bündel"], ["Stellenwert", "Wert einer Ziffer nach ihrer Stelle"]]),
  t("Schriftliches Rechnen", "Addieren und subtrahieren schriftlich.", "M3 2",
    [["Schriftliche Addition", "stellenweise von rechts nach links addieren"], ["Uebertrag", "wenn eine Stelle größer als 9 wird"]]),
  t("Geometrie", "Umfang und Flächeninhalt von Rechtecken.", "M3 3",
    [["Umfang", "Länge des Randes"], ["Flächeninhalt", "Größe der Fläche (cm²)"]]),
 ],
 "4": [
  t("Schriftliche Multiplikation und Division", "Mehrstellige Zahlen schriftlich rechnen.", "M4 1",
    [["Schriftliche Multiplikation", "stellenweise multiplizieren"], ["Schriftliche Division", "schrittweise teilen"]]),
  t("Größen umrechnen", "Längen, Gewichte, Zeit, Geld.", "M4 2",
    [["Kilometer", "1 km = 1000 m"], ["Kilogramm", "1 kg = 1000 g"]]),
  t("Daten und Wahrscheinlichkeit", "Schaubilder lesen, einfache Wahrscheinlichkeiten.", "M4 3",
    [["Säulendiagramm", "stellt Häufigkeiten dar"], ["Wahrscheinlichkeit", "wie sicher ein Ereignis eintritt"]]),
 ],
})

upsert("grundschule", "hsu", "Heimat- und Sachunterricht", "\U0001F30D", "#3f7a52", [1, 2, 3, 4], {
 "1": [
  t("Ich und meine Klasse", "Zusammenleben, Regeln, Gefühle.", "HSU1 1",
    [["Regel", "Absprache für das Zusammenleben"], ["Gefühl", "Wut, Freude, Angst erkennen"]]),
  t("Natur im Jahreslauf", "Jahreszeiten, Wetter, Pflanzen.", "HSU1 2",
    [["Jahreszeiten", "Frühling, Sommer, Herbst, Winter"], ["Wetter", "Sonne, Regen, Wind, Schnee"]]),
 ],
 "2": [
  t("Mein Heimatort", "Orientierung, Wege, Einrichtungen.", "HSU2 1",
    [["Plan", "verkleinerte Darstellung von oben"], ["Einrichtung", "Schule, Rathaus, Arzt"]]),
  t("Tiere und Pflanzen", "Lebensraum, Nahrung, Schutz.", "HSU2 2",
    [["Lebensraum", "Wörter: Wald, Wiese, Teich"], ["Nahrungskette", "wer frisst wen"]]),
 ],
 "3": [
  t("Körper und Gesundheit", "Sinne, Ernährung, Bewegung.", "HSU3 1",
    [["Sinne", "Sehen, Hören, Riechen, Schmecken, Fühlen"], ["Ernährung", "ausgewogen und vielfältig"]]),
  t("Wasser, Luft, Strom", "Naturphänomene und Technik im Alltag.", "HSU3 2",
    [["Aggregatzustand", "fest, flüssig, gasförmig"], ["Stromkreis", "Batterie, Lampe, Leiter"]]),
 ],
 "4": [
  t("Bayern und Deutschland", "Bundesland, Karte, Landeshauptstadt.", "HSU4 1",
    [["Bundesland", "Bayern ist ein Bundesland"], ["Landeshauptstadt", "München"]]),
  t("Zusammenleben in der Gesellschaft", "Familie, Berufe, Regeln, Demokratie.", "HSU4 2",
    [["Beruf", "Arbeit der Erwachsenen"], ["Wahl", "gemeinsam entscheiden"]]),
 ],
})

upsert("grundschule", "englisch", "Englisch", "\U0001F1EC\U0001F1E7", "#1f5fa8", [3, 4], {
 "3": [
  t("First Steps", "Begrüßen, vorstellen, Zahlen und Farben.", "E3 1",
    [["Hello", "Begrüßung: Hallo"], ["Colours", "red, blue, green, yellow"], ["Numbers", "one, two, three ..."]]),
  t("Family and Friends", "Familie, Tiere, Schaulsachen.", "E3 2",
    [["Family", "mother, father, sister, brother"], ["Pets", "dog, cat, fish"]]),
 ],
 "4": [
  t("My Day", "Tagesablauf, Uhrzeit, einfache Sätze.", "E4 1",
    [["In the morning", "am Morgen"], ["At school", "in der Schule"]]),
  t("Simple Present", "einfache Gegenwartsformen.", "E4 2",
    [["Do you ...?", "Frage im Simple Present"], ["He plays", "3. Person Singular mit -s"]]),
 ],
})

upsert("grundschule", "kunst", "Kunst", "\U0001F3A8", "#c8442f", [1, 2, 3, 4], {
 "1": [t("Malen und Zeichnen", "Farben mischen, Flächen gestalten.", "K1 1",
    [["Grundfarben", "rot, gelb, blau"], ["Mischfarbe", "aus zwei Grundfarben entsteht eine neue"]]),
   t("Basteln und Gestalten", "Schneiden, kleben, formen.", "K1 2",
    [["Schere", "sicheres Schneiden"], ["Knete", "Formen aus Knetmasse"]])],
 "2": [t("Farbenlehre", "Warm und kalt, hell und dunkel.", "K2 1",
    [["Warmton", "rot, orange, gelb"], ["Kaltton", "blau, grün, violett"]]),
   t("Bildbetrachtung", "Bilder beschreiben und deuten.", "K2 2",
    [["Vordergrund", "was vorne im Bild ist"], ["Hintergrund", "was hinten im Bild ist"]])],
 "3": [t("Drucken und Bauen", "Stempeldruck, stabile Bauwerke.", "K3 1",
    [["Druckstock", "Stempelvorlage aus Moosgummi oder Kartoffel"], ["Stabilität", "breite Basis trägt besser"]]),
   t("Zeichnen nach Natur", "Naturstudien, Proportionen.", "K3 2",
    [["Proportion", "richtiges Verhältnis der Teile"], ["Skizze", "schnelle Vorzeichnung"]])],
 "4": [t("Plastisches Gestalten", "Raum, Relief, Objekt.", "K4 1",
    [["Plastik", "dreidimensionales Werk"], ["Relief", "erhabenes Bild auf einer Fläche"]]),
   t("Kunstgeschichte", "Werke und Künstler kennenlernen.", "K4 2",
    [["Epoche", "Zeitabschnitt der Kunst"], ["Künstler", "schafft Kunstwerke"]])],
})

upsert("grundschule", "musik", "Musik", "\U0001F3B5", "#2f7d78", [1, 2, 3, 4], {
 "1": [t("Singen und Sprechen", "Lieder, Reime, Rhythmus.", "MU1 1",
    [["Rhythmus", "Gleichmäßiger Puls in der Musik"], ["Lied", "gesungenes Musikstück"]]),
   t("Instrumente kennenlernen", "Orff-Instrumente, Klang.", "MU1 2",
    [["Klangkörper", "Instrument zum Anschlagen"], ["Trommel", "Rhythmusinstrument"]])],
 "2": [t("Noten und Zeichen", "Notenlinien, Violinschlüssel.", "MU2 1",
    [["Notenschlüssel", "Zeichen am Beginn der Notenzeile"], ["Notenzeile", "fünf Linien für Noten"]]),
   t("Musizieren", "zusammen spielen, aufeinander hören.", "MU2 2",
    [["Ensemble", "mehrere spielen zusammen"], ["Takt", "gleichmäßige Einteilung der Musik"]])],
 "3": [t("Stimme und Gehör", "Stimme bilden, Tonhöhen unterscheiden.", "MU3 1",
    [["Tonhöhe", "hoch oder tief"], ["Interval", "Abstand zwischen zwei Tönens"]]),
   t("Musik und Bewegung", "Tänze, Klanggeschichten.", "MU3 2",
    [["Tanz", "Bewegung zur Musik"], ["Klanggeschichte", "Musik erzählt eine Geschichte"]])],
 "4": [t("Musik anderer Kulturen", "Instrumente, Lieder, Hörbeispiele.", "MU4 1",
    [["Kultur", "Musik verschiedener Länder"], ["Instrumentenkunde", "Bau und Klang von Instrumenten"]]),
   t("Komponieren", "eigene Rhythmen und Melodien.", "MU4 2",
    [["Melodie", "Abfolge von Tönen"], ["Improvisation", "frei erfinden ohne Vorlage"]])],
})

upsert("grundschule", "sport", "Sport", "\u26BD", "#3f7a52", [1, 2, 3, 4], {
 "1": [t("Bewegen und Spielen", "Laufen, hüpfen, klettern, balancieren.", "S1 1",
    [["Balancieren", "gleichgewicht halten"], ["Hüpfen", "mit beiden Füßen abspringen"]]),
   t("Spiele mit Regeln", "einfache Lauf- und Fangspiele.", "S1 2",
    [["Regel", "Absprache im Spiel"], ["Fairness", "ehrlich spielen"]])],
 "2": [t("Bewegungsformen", "Turnen, Gymnastik, Rollen.", "S2 1",
    [["Rolle", "vorwärts abrollen"], ["Gymnastik", "Uebungen mit dem Körper"]]),
   t("Ball und Koordination", "Werfen, fangen, prellen.", "S2 2",
    [["Werfen", "Ziel und Wurfweite"], ["Fangen", "mit beiden Händen sicher greifen"]])],
 "3": [t("Leichtathletik", "Laufen, Springen, Werfen.", "S3 1",
    [["Sprint", "kurze Strecke schnell laufen"], ["Weitsprung", "möglichst weit springen"]]),
   t("Mannschaftsspiele", "zusammen spielen, Taktik.", "S3 2",
    [["Mannschaft", "Team aus mehreren Spielern"], ["Taktik", "abgesprochenes Verhalten"]])],
 "4": [t("Schwimmen und Sicherheit", "Wassergewöhnung, Schwimmen, Regeln.", "S4 1",
    [["Seepferdchen", "Frühschwimmer-Abzeichen"], ["Baderegel", "nie allein ins Wasser"]]),
   t("Sport und Gesundheit", "Aufwärmen, Ausdauer, Erholung.", "S4 2",
    [["Aufwärmen", "Körper auf Belastung vorbereiten"], ["Ausdauer", "länger belastbar sein"]])],
})

upsert("grundschule", "religion", "Religion / Ethik", "\u271D\uFE0F", "#7a5c99", [1, 2, 3, 4], {
 "1": [t("Ich bin einzigartig", "Selbstwert, Gemeinschaft, Gefühle.", "R1 1",
    [["Einzigartigkeit", "jeder Mensch ist besonders"], ["Gemeinschaft", "wir gehören zusammen"]])],
 "2": [t("Feste und Bräuche", "Feste im Jahr und ihre Bedeutung.", "R2 1",
    [["Fest", "besonderer Tag im Jahr"], ["Brauch", "gewohnte Handlung zu einem Fest"]])],
 "3": [t("Geschichten und Werte", "religiöse Geschichten, Werte leben.", "R3 1",
    [["Wert", "wichtige Grundhaltung wie Hilfsbereitschaft"], ["Nächstenliebe", "anderen helfen"]])],
 "4": [t("Weltreligionen", "Christentum, Judentum, Islam kennenlernen.", "R4 1",
    [["Christentum", "glaubt an Jesus Christus"], ["Judentum", "glaubt an einen Gott, Tora"], ["Islam", "glaubt an Allah, Koran"]])],
})

upsert("grundschule", "werken", "Werken und Gestalten", "\U0001F527", "#6b5b95", [3, 4], {
 "3": [t("Werkstoffe", "Papier, Holz, Ton bearbeiten.", "WG3 1",
    [["Werkstoff", "Material zum Bearbeiten"], ["Werkzeug", "Hilfsmittel wie Säge oder Schere"]]),
   t("Technik im Alltag", "einfache Mechanismen verstehen.", "WG3 2",
    [["Hebel", "verstärkt eine Kraft"], ["Getriebe", "überträgt Bewegung"]])],
 "4": [t("Planen und Herstellen", "Werkstück planen, bauen, bewerten.", "WG4 1",
    [["Werkzeichnung", "Plan für ein Werkstück"], ["Arbeitsschritt", "Reihenfolge der Arbeit"]]),
   t("Sicherheit", "sichere Arbeit mit Werkzeugen.", "WG4 2",
    [["Schutzbrille", "schützt die Augen"], ["Schnittverletzung", "Verletzung durch scharfe Kanten"]])],
})

# =============================== FOERDERSCHULE 1-9 ===============================
upsert("foerderschule", "deutsch", "Deutsch", "\u270D\uFE0F", "#8a3324", [1, 2, 3, 4, 5, 6, 7, 8, 9], {
 "1": [t("Sprache und Schrift", "Laute hören, Buchstaben schreiben.", "FS D1",
    [["Laut", "hörbarer Sprachklang"], ["Buchstabe", "sichtbares Zeichen für einen Laut"]])],
 "3": [t("Lesen und Schreiben", "Wörter erlesen, Sätze bilden.", "FS D3",
    [["Wort", "Folge von Buchstaben mit Sinn"], ["Satz", "Vollständiger Gedanke, beginnt groß"]])],
 "5": [t("Erzählen und Berichten", "Erlebnisse und Sachverhalte mitteilen.", "FS D5",
    [["Erzählung", "lebendige Darstellung eines Erlebnisses"], ["Bericht", "sachliche Darstellung in Reihenfolge"]]),
   t("Wortarten", "Nomen, Verb, Adjektiv unterscheiden.", "FS D5",
    [["Nomen", "Namenwort (Tisch)"], ["Verb", "Tunwort (gehen)"], ["Adjektiv", "Wiewort (schnell)"]])],
 "7": [t("Rechtschreiben", "Regeln anwenden, Wörter richtig schreiben.", "FS D7",
    [["Großschreibung", "Nomen und Satzanfänge"], ["Satzzeichen", "Punkt, Komma, Fragezeichen"]])],
 "9": [t("Texte verstehen und verfassen", "Sachtexte, Briefe, Bewerbung.", "FS D9",
    [["Sachtext", "informiert über Fakten"], ["Bewerbung", "schriftliche Anfrage um eine Stelle"]])],
})

upsert("foerderschule", "mathematik", "Mathematik", "\U0001F4D0", "#12386b", [1, 2, 3, 4, 5, 6, 7, 8, 9], {
 "1": [t("Zahlen und Zählen", "Mengen, Zahlenraum bis 10.", "FS M1",
    [["Menge", "Anzahl von Dingen"], ["Zahl", "Zeichen für eine Anzahl"]])],
 "3": [t("Grundrechenarten", "Addieren und subtrahieren.", "FS M3",
    [["Addition", "plus rechnen"], ["Subtraktion", "minus rechnen"]])],
 "5": [t("Zahlenraum und Größen", "Natürliche Zahlen, Längen, Geld.", "FS M5",
    [["Natürliche Zahl", "1, 2, 3 ..."], ["Einheit", "cm, m, g, kg, EUR"]])],
 "7": [t("Prozent und Dreisatz", "Alltagsrechnen mit Verhältnissen.", "FS M7",
    [["Prozent", "Anteil von 100"], ["Dreisatz", "von einem Wert auf einen anderen schließen"]])],
 "9": [t("Berufsrelevantes Rechnen", "Fläche, Volumen, Zins, Tabellen.", "FS M9",
    [["Flächeninhalt", "Größe einer Fläche"], ["Zins", "Vergütung für geliehenes Geld"]])],
})

upsert("foerderschule", "sachunterricht", "Sachunterricht / Natur und Technik", "\U0001F52C", "#2f7d78", [1, 2, 3, 4, 5, 6, 7, 8, 9], {
 "1": [t("Ich und meine Umwelt", "Sinne, Jahreszeiten, Tiere und Pflanzen.", "FS S1",
    [["Jahreszeit", "Frühling bis Winter"], ["Sinn", "sehen, hören, fühlen, riech, schmecken"]]),
   ],
 "5": [t("Natur und Technik", "Stoffe, Energie, Lebewesen.", "FS N5",
    [["Stoff", "Material aus dem Dinge bestehen"], ["Energie", "nötig für Bewegung und Licht"]]),
   t("Mensch und Gesundheit", "Körper, Ernährung, Vorsorge.", "FS N5",
    [["Ernährung", "ausgewogene Kost"], ["Vorsorge", "Untersuchung beim Arzt"]])],
 "7": [t("Lebensräume", "Oekosysteme, Umwelt, Nachhaltigkeit.", "FS N7",
    [["Oekosystem", "Lebewesen und ihre Umwelt"], ["Nachhaltigkeit", "ressourcenschonend handeln"]])],
 "9": [t("Technik und Beruf", "Technische Systeme, Berufsfelder.", "FS N9",
    [["Technisches System", "Bauteile wirken zusammen"], ["Berufsfeld", "Gruppe ähnlicher Berufe"]])],
})

upsert("foerderschule", "englisch", "Englisch", "\U0001F1EC\U0001F1E7", "#1f5fa8", [5, 6, 7, 8, 9], {
 "5": [t("Erste Schritte", "Begrüßen, vorstellen, Alltagswortschatz.", "FS E5",
    [["Greeting", "hello, good morning"], ["Introduce", "sich vorstellen: My name is ..."]])],
 "7": [t("Alltag und Freizeit", "Tätigkeiten, Zeitformen, einfache Texte.", "FS E7",
    [["Present Simple", "einfache Gegenwart"], ["Hobby", "Freizeitbeschäftigung"]])],
 "9": [t("Beruf und Bewerbung", "Formulare, Gespräche, Bewerbung.", "FS E9",
    [["Application", "Bewerbung"], ["Interview", "Vorstellungsgespräch"]])],
})

upsert("foerderschule", "kunst", "Kunst", "\U0001F3A8", "#c8442f", [1, 2, 3, 4, 5, 6, 7, 8, 9], {
 "1": [t("Malen und Gestalten", "Farben, Formen, Materialien.", "FS K1",
    [["Grundfarbe", "rot, gelb, blau"], ["Material", "Papier, Wolle, Ton"]])],
 "5": [t("Bildnerisches Gestalten", "Zeichnen, Malen, Drucken.", "FS K5",
    [["Komposition", "Anordnung im Bild"], ["Druck", "Bild durch Aufdrucken"]])],
 "9": [t("Gestalten und Präsentieren", "Werkstücke planen und zeigen.", "FS K9",
    [["Präsentation", "Werk vorstellen"], ["Werkstück", "selbst hergestelltes Objekt"]])],
})

upsert("foerderschule", "musik", "Musik", "\U0001F3B5", "#2f7d78", [1, 2, 3, 4, 5, 6, 7, 8, 9], {
 "1": [t("Singen und Rhythmus", "Lieder, Klänge, Bewegung.", "FS MU1",
    [["Rhythmus", "regelmäßiger Puls"], ["Lied", "gesungenes Stück"]])],
 "5": [t("Musik erleben", "Instrumente, Noten, Hörbeispiele.", "FS MU5",
    [["Instrument", "erzeugt Klänge"], ["Note", "Zeichen für einen Ton"]])],
 "9": [t("Musik und Medien", "Musik in Alltag und Beruf.", "FS MU9",
    [["Musikproduktion", "Aufnahme und Bearbeitung"], ["Medien", "Radio, Internet, Film"]])],
})

upsert("foerderschule", "sport", "Sport", "\u26BD", "#3f7a52", [1, 2, 3, 4, 5, 6, 7, 8, 9], {
 "1": [t("Bewegung", "Laufen, springen, balancieren.", "FS S1",
    [["Balancieren", "Gleichgewicht halten"], ["Springen", "abstoßen und landen"]])],
 "5": [t("Spiele und Mannschaft", "Regeln, Fairness, Team.", "FS SP5",
    [["Regel", "Absprache im Spiel"], ["Team", "gemeinsam spielen"]])],
 "9": [t("Sport und Gesundheit", "Training, Ausdauer, Erholung.", "FS SP9",
    [["Training", "regelmäßige Uebung"], ["Erholung", "Pause zur Regeneration"]])],
})

upsert("foerderschule", "religion", "Religion / Ethik", "\u271D\uFE0F", "#7a5c99", [1, 2, 3, 4, 5, 6, 7, 8, 9], {
 "1": [t("Ich und die Gemeinschaft", "Selbstwert, Regeln, Zusammenleben.", "FS R1",
    [["Gemeinschaft", "wir gehören zusammen"], ["Regel", "Absprache im Miteinander"]])],
 "5": [t("Werte und Verantwortung", "Werte, Entscheidungen, Verantwortung.", "FS R5",
    [["Wert", "wichtige Grundhaltung"], ["Verantwortung", "für sein Handeln einstehen"]])],
 "9": [t("Weltreligionen und Ethik", "Religionen, Fragen des Lebens.", "FS R9",
    [["Weltreligion", "Christentum, Judentum, Islam, Buddhismus"], ["Gewissen", "innere Stimme für richtig und falsch"]])],
})

upsert("foerderschule", "wirtschaft_arbeit", "Wirtschaft und Arbeit", "\U0001F4BC", "#1f6f4a", [7, 8, 9], {
 "7": [t("Arbeitswelt erkunden", "Berufe, Betriebe, Praktikum.", "FS WA7",
    [["Beruf", "Tätigkeit mit Ausbildung"], ["Betrieb", "Ort, an dem gearbeitet wird"], ["Praktikum", "Schnuppern in einen Beruf"]])],
 "8": [t("Bewerbung und Vorstellungsgespräch", "Bewerbungsunterlagen, Auftreten.", "FS WA8",
    [["Bewerbung", "Anschreiben und Lebenslauf"], ["Vorstellungsgespräch", "persönliches Kennenlernen"]])],
 "9": [t("Arbeitsrecht und Geld", "Vertrag, Lohn, Versicherungen.", "FS WA9",
    [["Arbeitsvertrag", "regelt Rechte und Pflichten"], ["Lohn", "Bezahlung für Arbeit"], ["Versicherung", "Schutz bei Schaden"]])],
})
