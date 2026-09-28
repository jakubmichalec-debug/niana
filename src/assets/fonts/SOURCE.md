# Font files

Self-hosted subsets pulled from Google Fonts' own CDN (fonts.gstatic.com),
not redistributed from anywhere else. All four families are licensed
under the SIL Open Font License, which permits this.

| File | Family | Weight | Subset |
|---|---|---|---|
| `jost-latin.woff2` | Jost | 200–700 (variable) | latin |
| `jost-latin-ext.woff2` | Jost | 200–700 (variable) | latin-ext (Slovak diacritics) |
| `windsong-latin.woff2` | WindSong | 400 | latin |
| `lateef-extralight-latin.woff2` | Lateef | 200 (ExtraLight) | latin |
| `lalezar-regular-latin.woff2` | Lalezar | 400 | latin |
| `lalezar-regular-latin-ext.woff2` | Lalezar | 400 | latin-ext (Slovak diacritics) |

Only what the site actually uses is kept — no italic Jost (unused), no
WindSong 500 or its non-latin subsets (the mark is plain capital N/A),
no Lateef latin-ext (the hero marquee it's used for is English-only,
plain ASCII, by design — see translations.js). Lalezar (headings) DOES
need latin-ext despite starting out as an all-English design: headings
render Slovak copy once the language switch is set to SK, e.g. "Ručne
robené tašky" — the missing latin-ext subset was caught as some
letters (č, š, ý, …) silently falling back to a different font mid-word.
If future copy needs a subset not covered here (e.g. Cyrillic),
re-fetch `https://fonts.googleapis.com/css2?family=Jost:wght@…` with a
modern browser User-Agent (curl's default UA gets served WOFF1/no
variable range) to get the matching `.woff2` URLs, then add both the
file and its `@font-face` block to `src/styles/tokens/fonts.css`.
