# VAULT-TEC TERMINAL

En retro Fallout/Pip-Boy-inspirerad terminal som fungerar som personlig projektlauncher.

## Kommandon

| Kommando       | Beskrivning                                    |
|----------------|------------------------------------------------|
| `help`         | Visa alla tillgängliga kommandon               |
| `dir`          | Lista alla projekt/program                     |
| `open <namn>`  | Öppna ett projekt — namn eller nummer (1-15)   |
| `cat <namn>`   | Visa detaljer om ett projekt                   |
| `cls`          | Rensa terminalskärmen                          |
| `ver`          | Visa systemversion                             |
| `date`         | Visa dagens datum                              |
| `time`         | Visa aktuell tid                               |
| `color`        | Byt färgtema (grön → amber → vit)              |
| `echo <text>`  | Skriv ut text i terminalen                     |
| `about`        | Om terminalen                                  |
| `reboot`       | Starta om terminalen                           |

## Tangentbordsgenvägar

| Tangent        | Funktion                                       |
|----------------|------------------------------------------------|
| `Enter`        | Kör kommandot                                  |
| `↑` / `↓`     | Bläddra i kommandohistorik                     |
| `Tab`          | Autokomplettera kommando eller projektnamn     |
| `Ctrl+L`       | Rensa skärmen (samma som `cls`)                |

## Kontrollknappar (under skärmen)

- **SCAN** — Slå av/på scanline-effekten
- **COLOR** — Byt färgtema (grön / amber / vit)
- **AUDIO** — Slå av/på ljudeffekter (tangentklick och pip)
- **PWR** — Strömindikeringslampa

## Exempel

```
C:\> dir              — Lista alla projekt
C:\> open banken      — Öppna bankappen
C:\> open 3           — Öppna projekt nr 3
C:\> cat kartan       — Visa info om Kartan
C:\> color            — Byt till nästa färgtema
```

## Teknik

- Vanilla HTML, CSS & JavaScript (inga byggverktyg behövs)
- Google Fonts: Share Tech Mono
- Web Audio API för retro-ljud
- CSS CRT-effekter: scanlines, phosphor glow, vignette, flicker
- Responsiv — fungerar på mobil

## Kör lokalt

Öppna `index.html` i en webbläsare, eller kör en lokal server:

```bash
npx serve .
```
