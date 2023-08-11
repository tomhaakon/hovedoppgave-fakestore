Hovedoppgaven:

# Note: Dersom ikke API og database er laget, så simuler dette via “dummy data”.

Noe som betyr at jeg vil at du i data (script), skal lage egne array med object i seg.

# Note 2: Kan hende at senere, dette prosjektet vil bli oppdatert. Da med mulig flere funksjoner eller fungerende Axios.

# Note 3.

Ha med README.md fil
Ha definert en bra brukervennlig color theme.
Tegn opp og skisser siden, før start.
Planlegg den.
Tenk struktur på prosjekt, mappe navn, fil navn ++

- Jeg vil at du skal:

1. Lage ett nytt vue prosjekt.
2. Legg Bruk Tailwind + daisyUI
3. Rensk prosjektet fra default.

- Tenk da "helloWorld.vue", template som ble gitt ++.

4. Jeg vil at du skal sette opp 4 sider.

- Hjemmeside
- Produktside
- min side
- Om oss side

5. Globalt så vil jeg har:

- En navbar (som da også får en sidebar når man kommer til mobilvisning).
  - Den skal ha en logo, og link til de 4 sidene.
  - Logoen skal kunne trykkes på, og lede til fremsiden.

6. Jeg vil ha en fin footer, Du kan style den slik du vil, med custom innhold.
7. Produktsiden, så vil jeg at du skal hente ned data, via axios.

- Så du må legge til axios i prosjektet.

8. Jeg vil at du skal vise frem disse produktene som kort på siden.

- Da 3 eller 4 i bredden.
- 1 på mobilvisning.

# Data kan bli simulert i script, dersom man ikke api er gitt.

9. Jeg vil ha en dialog komponent, som du da må lage, og legge til på denne siden.
10. Den skal da inneholde alt av produkt info, til det kortet du trykker på.

- Tenk da på refs og props.

11. Du skal ha mulighet til å trykke kjøp på produktet.

- Skal da via Axios, sende en POST query, hvor du lagrer at du har kjøpt dette produktet.

# Simuler dette med en toast, dersom ikke api er gitt

12. Etterpå, så skal dette produktet ligge på min side.

- Tenk da, sortering på din bruker id, i GET query.
- Denne kan simuleres dersom api ikke er gitt. (da via script, med eksempel kjøp)

13. På min side, så skal den ha 2 forskjellige visninger.

- Du skal ha en visning, der du ikke har kjøpt noen ting.
- Og en hvor du da viser alle produktene som du da har kjøpt.
  - Disse produktene skal da ligge i en tabell.

14. Denne tabellen skal du kunne.

- Sortere
- Søke
- Slette produkt fra.

15. Både ved kjøp og sletting av produkt, så skal du lage en mulighet for kunden til å bekrefte dette.

Bonus:

- Kunne vise Hvor mange av ett produkt man har kjøpt i tabellen.
- Tips: Push til ett array.

16. På om oss siden, så må du få vist på en fin måte.

- Hva er det denne siden er om.
- Og eventuelt kanskje ha litt info om bedriften.

# Hvordan du setter denne opp, er helt opp til deg.

17. Hjemmesiden, så vil jeg at du skal vise frem de 3 nyeste produktene til firmaet.

- Disse skal da være vist som kort, med samme mulighet for kjøp som på produktsiden.
  - Gjenbruk da dialog komponenten som du brukte der.

18. Alt dette skal tilpasses andre skjermstørrelser.

- Tenk da på breakpoints.
- Hovedfokus på desktop og mobil.

# På min side, så kan du gå for en annen måte en tabell (på mobil visning).

    - Dette er da helt opp til deg.

19. Tabell på desktop, så skal du kunne klikke på ett av de produktene som du har kjøpt.

- Åpne en dialog med informasjon om dette produktet.
- Du skal også kunne klikke på bildet i denne dialogen, slik at man kan få dette i et større "vindu".
  - Dette skal da også være en ny dialog, hvor du da må sende bildet ned som props.

20. Husk å pushe dette prosjektet til gitlab.

- Hvor du da dokumenterer det som blir gjort via:
  - Commit meldinger
  - Kommentarer
  - Beskrivende funksjonsnavn

21. Du skal også lage en netlify konto, hvor du da hoster denne siden live.

- Kan velge å ta siden ned etter avsluttet prosjekt visning.

22. Tenk på måter prosjektet kan feile, og hva du kan gjøre for å gi en bedre bruker opplevelse.
    Eksempel: 404 side, dersom man forsøker å besøke en link som ikke eksisterer.
    500 errors…
    Vis disse frem i en dialog.

23. Før presentasjon, så vil jeg at du skal rydde og cleane opp i koden.
    Tenk da:
    Console.logs skal fjernes
    Det skal være kommentert
    Logiske variabel og funksjons navn
    Ideelt 2 whitespaces (4 går om man velger det).
    En README.md fil.
    Rett formatering av kode.
    Fjern utkommentert kode.

24. Bonus: Legg på ekstra funksjonalitet. Lag dette prosjektet til noe personlig.
