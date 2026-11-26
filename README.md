# Spa Villa — independent redesign concept (iteration 2)

> **Unofficial.** This is an independent, speculative design concept. It is not the official Spa Villa website and has not been commissioned, reviewed or endorsed by Spa Villa. Official site: https://www.spavillanagpur.com/

## Pages
- `index.html`: hero, the Times Business Awards recognition, a six-stop photo walk-through of the villa, the menu by occasion, the Antaara ritual, treatments for two, a first-visit guide, a branch selector with a schematic map, and a visit planner that writes a WhatsApp message.
- `treatments.html`: all eight treatments, with a time/who finder that you can link to (`?time=30`, `?who=two`), price sorting, side-by-side compare of up to three, and items Spa Villa mentions elsewhere.

## Run
No build step. `python3 -m http.server 8080` in this folder, then http://localhost:8080

## Deploy (Cloudflare Pages)
Preset *None*, no build command, output directory `/`. `_headers` sets `X-Robots-Tag: noindex`, a CSP and caching. Every page also carries meta `noindex`, and `robots.txt` disallows all crawlers.

## Assets and permission
`assets/photos/` and `assets/brand/` are **Spa Villa's own logo and photographs**, taken from spavillanagpur.com for this demonstration (see `docs/asset-provenance.md`). The project owner has confirmed permission to use these assets in this concept (Nov 26, 2026). Fonts are Newsreader, Hanken Grotesk and Marcellus (SIL OFL), self-hosted.

## Privacy
Nothing is sent or stored. The planner only builds text. The visitor chooses whether to open WhatsApp or call.
