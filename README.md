# Spa Villa — independent redesign concept

> **Unofficial.** This is an independent, speculative design concept. It is not the official Spa Villa website and has not been commissioned, reviewed or endorsed by Spa Villa. Official site: https://www.spavillanagpur.com/

Two-page static prototype:

- `index.html` — brand homepage: treatment index, Antaara signature spread, treatments for two, first-visit guide, branch selector, callback form (prototype only).
- `treatments.html` — full menu with filter, sort and side-by-side compare.

## Run locally
No build step. From this folder: `python3 -m http.server 8080` → http://localhost:8080

## Deploy (Cloudflare Pages)
Framework preset: *None*. Build command: *(empty)*. Output directory: `/`. `_headers` sets `X-Robots-Tag: noindex`, a strict CSP and asset caching; every page also carries `<meta name="robots" content="noindex, nofollow">` and `robots.txt` disallows all. All paths are relative, so it works on `*.pages.dev` or a sub-path.

## Data and privacy
The callback form validates input and shows a local confirmation. It does not send, store or log anything. No analytics, cookies, third-party scripts or API keys.

## Assets
- Fonts: Newsreader and Hanken Grotesk (SIL OFL 1.1), self-hosted — licences in `assets/fonts/`.
- No Spa Villa photographs or logo are included. Image positions are marked as plates awaiting authorised photography; the wordmark is plain type, not the brand logo.

## Docs
`docs/` — creative direction, verification questions, QA report and an introductory email draft.
