# Wie man Github Copilot Chat verwendet

## Was ist Copilot Chat

Copilot (<https://github.com/features/copilot/>) ist eine KI-Codierhilfe, die von Github bereitgestellt wird und während des Codierungsprozesses KI-gestützte Codierungsvorschläge bietet. In vielen Fällen reichen Kommentare oder Funktionsnamen aus, und Copilot kann den vollständigen Code instanziieren.

Weitere Informationen finden Sie unter [Wie man Github Copilot und Shortcuts verwendet](/de/vscode/copilot-usage-and-shortcut.html).

Copilot Chat steht im Zusammenhang mit Copilot. Es teilt das Abonnement mit Copilot, ist aber nicht dasselbe. Copilot Chat ist ein Chatbot, der in VSCode verwendet werden kann. Sie können mit Copilot Chat chatten und Copilot gibt Ihnen Codevorschläge basierend auf Ihrem Chat-Inhalt. Sie können zum Beispiel technische Fragen an Copilot Chat stellen oder Copilot Chat bitten, Ihnen beim Schreiben von Code zu helfen.

Was Copilot Chat von Copilot unterscheidet, ist, dass Copilot Chat ein Chatbot ist. Das bedeutet, dass Sie ihn nicht mit Code auffordern müssen. Sie können einfach mit ihm chatten und er gibt Ihnen die Antwort oder Codevorschläge.

## Plugin installieren

Um Copilot Chat zu verwenden, müssen Sie ein Plugin installieren. Suchen Sie im Plugin-Menü von VSCode nach `Copilot Chat`, der Name des Plugins lautet `Github Copilot Chat`. Die entsprechende Plugin-Marktplatz-Adresse lautet <https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat>. Installieren Sie es.

![Screenshot der Installation](/attachments/vscode/copilot-chat-usage/01.png)

## Verwendung

Klicken Sie auf das `Chat`-Menü in der linken Seitenleiste von VSCode, um das Chat-Fenster zu öffnen, und dann können Sie mit Copilot Chat chatten.

Sie können Copilot Chat Fragen zur Programmierung stellen, z.B. `Was ist der Operator in JavaScript, um ein Bit XOR durchzuführen?`, es wird antworten `In JavaScript wird der bitweise XOR-Operator durch das Zirkumflexsymbol (^) dargestellt`, und Ihnen ein Codebeispiel und dessen Erklärung geben. Es ist sehr nützlich, wenn Sie nach Programmierkenntnissen suchen.

![Screenshot des Chat-Fensters](/attachments/vscode/copilot-chat-usage/02.png)

### Code schreiben

Neben Programmierkenntnissen können Sie Copilot Chat auch bitten, Ihnen beim Schreiben von Code zu helfen, z. B. `Schreiben Sie eine Funktion, um die Summe von zwei Zahlen in JavaScript zu berechnen`. Es wird Ihnen ein Codebeispiel für die gewünschte Funktion geben:

```
Klar, hier ist eine einfache JavaScript-Funktion, die die Summe von zwei Zahlen berechnet:

function sum(a, b) {
    return a + b;
}

Sie können diese Funktion verwenden, indem Sie sie mit zwei Zahlen als Argumente aufrufen, z. B. sum(5, 3). Dies würde 8 zurückgeben.
```

Wenn Sie mit der Maus über das Codebeispiel fahren, sehen Sie mehrere Aktionsbuttons. Sie können den Code kopieren oder an der aktuellen Cursorposition des Editors einfügen. Sie können den Code auch in einer neuen Datei speichern oder den Code im Terminal ausführen (wenn es sich um einen ausführbaren Shell-Befehl handelt).

![Screenshot des Codebeispiels](/attachments/vscode/copilot-chat-usage/03.png)

Der nützlichste Button ist der `Einfügen`-Button. Sie können den neu erstellten Code in eine vorhandene Datei einfügen oder diesen Button verwenden, um einen ausgewählten Codeabschnitt zu ersetzen. Darauf werden wir später im Detail eingehen.

Wenn Sie mit dem Codebeispiel nicht zufrieden sind, können Sie erneut mit Copilot Chat sprechen, z. B. `Bitte überprüfen Sie den Datentyp der Eingabe. Wenn einer von ihnen keine Zahl ist, geben Sie 0 zurück`. Copilot Chat wird Ihnen ein neues Codebeispiel geben:

```
Hier ist eine überarbeitete Version der Funktion, die die Eingabedatentypen überprüft:

function sum(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        return 0;
    }
    return a + b;
}
```

In dieser Version überprüft die Funktion, ob entweder a oder b keine Zahl ist. Wenn entweder keine Zahl ist, gibt die Funktion 0 zurück. Andernfalls gibt sie die Summe von a und b zurück.

### Code ändern

Wenn Sie einen Code haben, den Sie ändern möchten, können Sie den Code auswählen und dann im linken Seitenbereich von VSCode auf das `Chat`-Menü klicken, um das Chat-Fenster zu öffnen. Dort können Sie mit Copilot Chat chatten. Der ausgewählte Code wird als Kontext an Copilot Chat gesendet, und Copilot Chat gibt Ihnen Codevorschläge basierend auf dem Kontext und dem, was Sie sagen.

Zum Beispiel haben wir einen Code mit einem Fehler:

```javascript
function sumArr(arr) {
    let sum = 0;
    for (let i in arr) {
        sum += i;
    }
    return sum;
}
```

Diese Funktion nimmt ein Array von Zahlen als Eingabe entgegen und gibt die Summe der Zahlen im Array zurück. Aber es gibt einen Fehler im Code, er liest den Schlüssel des Arrays anstelle des Werts, daher gibt er die Summe des Array-Index anstelle der Summe des Array-Werts zurück.

Wir möchten den Fehler beheben, also wählen wir den Code aus, öffnen das Chat-Fenster und sagen dann `Bitte beheben Sie den Fehler`. Copilot Chat gibt uns ein Codebeispiel, das den Fehler behebt:

```
function sumArr(arr) {
    let sum = 0;
    for (let i of arr) {
        sum += i;
    }
    return sum;
}
```

Im ursprünglichen Code wurde die for...in-Schleife verwendet, die über die aufzählbaren Eigenschaften eines Objekts iteriert, in diesem Fall die Indizes des Arrays. Um den Fehler zu beheben, sollte stattdessen die for...of-Schleife verwendet werden, die über die Werte eines iterierbaren Objekts iteriert, in diesem Fall die Elemente des Arrays.
```

Wie Sie sehen können, hat Copilot Chat den Fehler für uns behoben und gibt uns auch eine Erklärung des Codes.

Darüber hinaus können Sie das Gleiche auf eine einfachere Weise tun, indem Sie den Code auswählen und dann `/fix` eingeben oder auf `/fix the problems in my code` klicken. Copilot Chat wird den Code genauso wie zuvor korrigieren.

### Code konvertieren

Manchmal müssen Sie eine Liste von Werten in ein Array, eine Map oder etwas anderes konvertieren. Zum Beispiel kopieren wir eine Map mit Schlüssel-Wert-Paaren aus einer Excel-Tabelle:

```
name    age
John    20
Mary    21
Rose    22
Robert  18
Jane    19
```

Sie können den Text auswählen und dann das Chatfenster öffnen. Dann können Sie sagen `Konvertiere den Text in ein Array (JSON), das Element des Arrays ist ein weiteres Array, das Name und Alter enthält, zum Beispiel: [['John', 20]], gib einfach das Ergebnis aus, keine Notwendigkeit, Code oder Erklärungen zu geben`. Copilot Chat gibt Ihnen ein Codebeispiel, das den Text in ein Array konvertiert:

```
Hier ist der konvertierte Text in ein Array:

[
    ["John", 20],
    ["Mary", 21],
    ["Rose", 22],
    ["Robert", 18],
    ["Jane", 19]
]
```

Beachten Sie, dass Sie Ihre Anfragen so detailliert wie möglich beschreiben sollten, damit Copilot Chat Ihre Anfrage versteht und Ihnen das richtige Ergebnis liefert. Wenn Sie zum Beispiel die Ausgabe nicht benötigen, gibt Ihnen Copilot Chat das Codebeispiel, das den Text in ein Array konvertiert, was nicht das ist, was Sie möchten.

Natürlich können Sie Copilot Chat auch bitten, den Text in andere Datenstrukturen wie eine Map oder eine Liste von Objekten zu konvertieren, usw.

## Fazit

Wir können Copilot Chat für viele Dinge verwenden, wie zum Beispiel:

- Text in Datenstruktur umwandeln
- Typen für Code hinzufügen
- Ein Stück Code in eine andere Programmiersprache umwandeln
- Ihre i18n-Datei in eine andere Sprache übersetzen
- Fehlerbehandlung für Code hinzufügen
- Kleine Fehler beheben
- Den Code refaktorisieren, um ihn lesbarer zu machen
- ...

Die einzige Grenze ist Ihre Vorstellungskraft und Ihre Geduld. Manchmal versteht Copilot Chat Ihre Anfrage möglicherweise nicht oder liefert Ihnen ein falsches Ergebnis, aber Sie können Ihre Anfrage weiter verbessern, bis Sie das richtige Ergebnis erhalten. Nach etwas Übung werden Sie feststellen, dass Copilot Chat ein sehr nützliches Werkzeug ist.
