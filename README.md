# Introduktion till API:er, Fetch och JSON

<details open >
  <sumary>Table of content</sumary>

</details>

## Vad är JSON?

- **JSON står för JavaScript Object Notation** och är lättläst format för att representera data.

- **Struktur**: JSON består av nyckel-värde-par och är väldigt likt JavaScript men används för att skicka data mellan olika system.

```json
{
  "name": "John Doe",
  "age": 30,
  "email": "john.doe@hotmail.com",
  "skills": ["JS", "HTML", "CSS"]
}
```

**Varför JSON?**

- Lätt att läsa
- Plattformoberoende: JSON fungerar oavsett vilket programmeringsspråk som används.
- Nästan alla moderna API:er använder JSON för att skicka och ta emot data.

### Konvertera mellan JSON och JavaScript

Eftersom JS och JSON är så närbesläktat med varandra så förstår JS JSON per default. Alltså, om en JS-applikation tar emot JSON data så kan den direkt _(implict)_ konvertera det till giltig javascript. Dock så kan inte andra språk det utan vi måste konvertera där emellan. Så om data ska skicka iväg från en JS-applikation så måste det göras om till JSON först. Detta görs med två befintliga metoder.

`JSON.stringify( data ) => string`

Denna metoden koverterar JS-data till giltig JSON, alltså till en lång sträng.

`JSON.parse( string ) => JS`

Denna metoden koverterar JSON tillbaks till giltig JavaScript. 


## Vad är ett API?

### Definition
Ett API är som en brygga mellan olika program som gör att de kan prata med varandra.  Ett API döljer komplexiteten i hur ett system eller flera system fungerar och erbjuder istället en tydligt "manual" / "kommunikationsvägar" för hur andra system kan interagera med det.

### Vardagsexempel
- **Flygapp**: När du söker efter ett flyg så kommer appen att hämta data från mängde av olikga flyg- och resebolag för att försöka matcha mot din sökning. Och då är det de olika bolagens API:er som flygappen skickar förfrågningar till. 

- **Väderapp**: Din väderapp hämtar information om temperatur och väderförhållande från olika API:er, som i sin tur hämtar data från sensorer och databaser. 

### Hur funkar ett API ( kortvarianten )
1. Tar emot en begäran eller förfrågan efter data _( request )_ från en klient.
2. Tolkar och skickar vidare requestet till rätt resurser. 
3. Returnera ett svar, _( response )_ oftast i form av JSON till klienten. Sen kan klienten göra vad den vill med den här data som den får tillbaka. 

### Typer av API:er




### Hur API:er används i frontend

## Fetch API

### Breakdown of fetch

### Syntax of fetch

### Common options

### Response Object
