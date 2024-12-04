# Introduktion till API:er, Fetch och JSON

<details open >
  <summary>Innehåll</summary>

- [Vad är JSON?](#vad-är-json)

  - [Konvertera mellan JSON och JavaScript](#konvertera-mellan-json-och-javascript)

- [Vad är ett API?](#vad-är-ett-api)

  - [Definition](#definition)
  - [Vardagsexempel](#vardagsexempel)
  - [Hur funkar ett API](#hur-funkar-ett-api)
  - [Typer av API:er](#typer-av-apier)
  - [Hur API:er används i frontend](#hur-apier-används-i-frontend)

- [Fetch API](#fetch-api)

  - [Nedbrytning av Fetch](#nedbrytning-av-fetch)
  - [Syntax](#syntax)
  - [Vanliga options](#vanliga-options)
  - [Responseobjektet](#responseobjektet)

- [Kodexempel](#kodexempel)
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

[Tillbaks till toppen](#introduktion-till-apier-fetch-och-json)

### Konvertera mellan JSON och JavaScript

Eftersom JS och JSON är så närbesläktat med varandra så förstår JS JSON per default. Alltså, om en JS-applikation tar emot JSON data så kan den direkt _(implict)_ konvertera det till giltig javascript. Dock så kan inte andra språk det utan vi måste konvertera där emellan. Så om data ska skicka iväg från en JS-applikation så måste det göras om till JSON först. Detta görs med två befintliga metoder.

`JSON.stringify( data ) => string`

Denna metoden koverterar JS-data till giltig JSON, alltså till en lång sträng.

`JSON.parse( string ) => JS`

Denna metoden koverterar JSON tillbaks till giltig JavaScript.

[Tillbaks till toppen](#introduktion-till-apier-fetch-och-json)

## Vad är ett API?

### Definition

Ett API är som en brygga mellan olika program som gör att de kan prata med varandra. Ett API döljer komplexiteten i hur ett system eller flera system fungerar och erbjuder istället en tydligt "manual" / "kommunikationsvägar" för hur andra system kan interagera med det.

[Tillbaks till toppen](#introduktion-till-apier-fetch-och-json)

### Vardagsexempel

- **Flygapp**: När du söker efter ett flyg så kommer appen att hämta data från mängde av olikga flyg- och resebolag för att försöka matcha mot din sökning. Och då är det de olika bolagens API:er som flygappen skickar förfrågningar till.

- **Väderapp**: Din väderapp hämtar information om temperatur och väderförhållande från olika API:er, som i sin tur hämtar data från sensorer och databaser.

[Tillbaks till toppen](#introduktion-till-apier-fetch-och-json)

### Hur funkar ett API

1. Tar emot en begäran eller förfrågan efter data _( request )_ från en klient.
2. Tolkar och skickar vidare requestet till rätt resurser.
3. Returnera ett svar, _( response )_ oftast i form av JSON till klienten. Sen kan klienten göra vad den vill med den här data som den får tillbaka.

[Tillbaks till toppen](#introduktion-till-apier-fetch-och-json)

### Typer av API:er

1. **REST API, Representational State Trasfer**

   - Den vanligast typen
   - Bygger på HTTP-protokollet och använder sig utav standardmetoderna GET _(hämta data från servern)_, POST _(skapa ny data på servern)_, PUT _(uppdatera data på servern)_ och DELETE _(ta bort data från servern)_.

   - **Exempel**
     - `GET /users`: Hämtar en lista av användare
     - `POST /users`: Lägg till en ny användare

2. **GraphQL**

   - Alternativ till REST där klienten specificerar exakt vilken data som behövs.
   - Exempel: Klienten fråga efter användarnamn och e-post för en specifik användare, istället för att få all data.

3. **SOAP (Simple Object Access Protocol)**

   - Ett äldra API-format som använder sig av XML.
   - Mer komplext än REST och används ofast i äldra system.

4. **Lokala API:er**

   - API:er som används för kommunikation mellan program , till exempel lokalt på datorn, till exempel mellan frontend och backend i en utvecklingsmiljö. Men även mellan till exempel Word och filsystemet på datorn.

5. **Öppna och privata API:er**

   - **Öppna API:er**: kräver oftast ingen autentisering, till exemepl väderappar eller andra program som man använder dagligen.
   - **Stängda API:er**: Kräver autentisering och kan används inom organisationer. Men även publika API:er som vill begränsa användningen på olika sätt.

[Tillbaks till toppen](#introduktion-till-apier-fetch-och-json)

### Hur API:er används i frontend

1. Kommunikation mellan frontend och backend

När en användare klickar på en knapp eller laddar en sida, så skommer fronend skicka ett request till backend via ett API. Backend i sin tur bearbetar requestet ochs skickar tillbaks ett response som frontend kan visa för sina användare.

2. Vanliga användsningsområden

   - Hämta data för att visa en lista av någon form av data.

   - Skicka data, kanske data som har skrivits in i ett formulär som ska skickas till en backend för validering eller liknande.

   - Uppdatera data, man kan vill uppdatera sin profilbild eller email på ett konto i någon applikation.

   - Ta bort data från applikationen, det requestet skickas till backend som i sin tur kanske validerar och säkerthetsställer att du får göra det eller inte.

[Tillbaks till toppen](#introduktion-till-apier-fetch-och-json)

## Fetch API

Fetch är ett modern verktyg som är gjort för att kunna göra hämtnignar av _( oftast extern )_ data som tar lite tid. JS är singeltrådigt, vilket betyder att den bara kan göra en sak åt gången hela tiden, och gör vi då en hämtning som tar tre sekunder så kommer vår applikation att frysa och använderna kommer inte kunna göra något.

Det här vill vi motverka givetvis, och då har vi fetch. Fetch kan inleda hämtningar utan att låsa applikationen, och när sen väl hämtningen är komplett så kan fetch putta in den hämtningen i flödet igen och vår applikation kan göra något med data som kommer tillbaka.

Så summerat, fetch är till för att göra nätverksförfrågningar över HTTP och är en modern lösning som ett alternativ till det äldre XMLHttpRequest. Ni kan läsa mer specifikt om det här: [XMLHttpRequest - JavaScript.info](https://javascript.info/xmlhttprequest)

[Tillbaks till toppen](#introduktion-till-apier-fetch-och-json)

### Nedbrytning av Fetch

- **Returnerar ett Promise**: Vi skickar ett request om någon data och vi får ett löfte tillbaka om att data kommer att komma så småningom, oftast inom 100-tals millisekunder, men vi är välkomna att göra andra saker under tiden. När sen data väl är hämtat och redo så kommer vi får tillgång till ett Response-objekt som kommer att innehålla information om vår hämtning, om den fick igenom, failade och så vidare. Även data får vi tillgång till om det finns sådan.

- **Promise-baserad asynkroniskt mönster**: Fetch ger oss tillgång till metoder som vi kan använda när vår data är klar eller ett error har skett. De kommer i from av `.then()` och `.catch()`. En av dessa kommer alltid att anropas, antingen att saker och ting gick vägen eller att det inte gjorde det. Dessa metoder tar emot en callback-funktion som argument som vi definierar, alltså vi som avgör vad som ska hända.

- **Simplifierad syntax**: syntaxen är enklare och lättare an använda än den äldre metoden XLHttpRequest.

- **Flexibilitet med ett options-objekt**: fetch tar emot flera parameterar , bland annat URL som vi vill skicka förfrågan till men även ett valfritt options-objekt som vi kan använda för att konfigurera vårt request innan det skickas iväg.

- **Response-objektet**: Detta objekt är det som returneras av fetch och innehåller all infromation som vi behöver, bland annat statusen på hämtningen och förhoppningsvis data som vi efterfrågade.

- **async/await-kompabilitet**: fetch fungerar med async/await per default och erbjuder en alternativ syntax till de två metodern .then och .catch.

För att sammanfatta, fetch är ett dynamiskt och mångsidigt verktyg som gör det enkelt och effektivt att göra HTTP-hämtningar i JS. Att det är löftest-baserat _(promise-based)_ gör att vår kod förenklas och det blir mer effektivt att skriva asynkronisk kod.

[Tillbaks till toppen](#introduktion-till-apier-fetch-och-json)

### Syntax

- Med .then()

  ```js
  fetch(url, options?)
    .then((res) => res.json())
    .then((data) => { console.log(data) })
    .catch((error) => { console.log(error)});
  ```

  Ett klassiskt användningsexempel av en fetch. `fetch()` returnerar ett response om det går igenom. Detta repsonse fångas upp av den första `.then()` som i sin tur returnerar själva data som ligger inbäddad i response-objektet. Denna data tar den andra `.then()` hand om och loggar ut. Skulle ett fel ske någonstans i processen så kommer detta fel att fångas upp i `catch()` där vi sen kan utföra någon form av logik för att hantera det.

- med async/await

```js
async function fetchSomething() {
  try {
    const response = await fetch(url, options?);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
```

"url" är själva adressen till den datan du efterfrågar medan "options" innehåller inställningar för requestet såsom headers, metod och body bland annat.

"fetch" retunerar e "promise" som alltid kommer att resultera i ett "response" oavsett om hämtning är giltig eller inte. Det är bara om själva "response" är ogiltig som vi hamnar i "catch"-delen.

[Tillbaks till toppen](#introduktion-till-apier-fetch-och-json)

### Vanliga options

När du gör en **fetch-förfrågan** kan du skicka med ett "options"-objekt som låter dig konfigurera förfrågan. Detta används för att till exempel ange vilken HTTP-metod som ska användas (GET, POST, PUT, DELETE) eller om du behöver skicka data.

Här är de vanligaste alternativen som nybörjare bör känna till:

1. **`method`**: Specificerar vilken HTTP-metod som används.

   - Exempel: `GET`, `POST`, `PUT`, `DELETE`.
   - Standardvärdet är `GET`.

   ```js
   const options = {
     method: "POST",
   };
   ```

2. **`headers`**: Låter dig skicka extra information, såsom vilken typ av data du skickar (t.ex. JSON).

   - Vanligt att specificera `Content-Type` när du skickar JSON-data.

   ```js
   const options = {
     headers: {
       "Content-Type": "application/json",
     },
   };
   ```

3. **`body`**: Innehåller data som du skickar till servern. Vanligtvis JSON-strängar.

   - Används endast med metoder som skickar data (som `POST` och `PUT`).

   ```js
   const options = {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify({
       name: "John Doe",
       email: "john.doe@example.com",
     }),
   };
   ```

Exempel på en förfrågan med `options`:

```js
fetch("https://jsonplaceholder.typicode.com/posts", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    title: "Ny titel",
    body: "Detta är ett exempel.",
    userId: 1,
  }),
})
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((error) => console.error(error));
```

[Tillbaks till toppen](#introduktion-till-apier-fetch-och-json)

### Responseobjektet

När du gör en **fetch-förfrågan** får du tillbaka ett **response-objekt**. Detta objekt innehåller information om svaret från servern och låter dig hantera både lyckade svar och fel.

Vanliga egenskaper och metoder för response-objektet:

1. **`status`**: HTTP-statuskoden som indikerar om förfrågan lyckades.

   - `200–299`: Förfrågan lyckades.
   - `400–499`: Klientfel (t.ex. felaktig URL).
   - `500–599`: Serverfel.

   ```js
   fetch(url).then((response) => {
     if (response.status === 200) {
       console.log("Lyckades!");
     } else {
       console.error("Något gick fel!");
     }
   });
   ```

2. **`ok`**: En boolean som är `true` om statuskoden är mellan `200–299`, annars `false`.

   ```js
   fetch(url).then((response) => {
     if (response.ok) {
       console.log("Request lyckades!");
     } else {
       console.error("Fel inträffade:", response.status);
     }
   });
   ```

3. **Metoder för att läsa data**:

   - **`response.json()`**: Om svaret innehåller JSON-data.
   - **`response.text()`**: Om svaret är vanlig text.
   - **`response.blob()`**: Om svaret är en fil (t.ex. en bild).

   Exempel:

   ```js
   fetch(url)
     .then((response) => response.json()) // Konverterar svaret till JSON
     .then((data) => console.log(data)) // Gör något med datan
     .catch((error) => console.error(error)); // Hanterar fel
   ```

4. **HTTP-header**: Om du vill läsa metadata om svaret.
   - Exempel: Kolla vilken typ av innehåll som servern skickade.
   ```js
   fetch(url).then((response) => {
     console.log(response.headers.get("Content-Type"));
   });
   ```

[Tillbaks till toppen](#introduktion-till-apier-fetch-och-json)

## Kodexempel

Kodexempelet kan ni hitta i de övriga filerna. Det finns en `index.js`, `utilities.js`, `index.html` och `index.css`. Dessa filer tillsammans utgör exemplet som hämtar data från ett API som heter [JSONPlaceholder](https://jsonplaceholder.typicode.com/). Detta API används jättemycket av utvecklare i testsyfte där man snabbt behöver åtkomst till lite extern data.

Exemplet hämtar användare från detta API:et och skriver ut de i DOM:en samt lite extra funktionlitet.
