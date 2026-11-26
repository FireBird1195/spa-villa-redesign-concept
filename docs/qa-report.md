# QA report — Nov 26, 2026 (local, Chromium via Playwright, python http.server)

| Check | Result | Evidence |
|---|---|---|
| Layout at 375×812, 768×1024, 1440×900, both pages | PASS — no horizontal overflow (scrollWidth − innerWidth = 0) | `qa/screens/*.png` (not committed) |
| Console errors, page errors, 4xx/5xx assets | PASS — none at all 6 page/viewport combinations | Playwright listeners |
| Internal links and anchors | PASS — all 16 internal targets exist | grep + manual mapping |
| External links (official site, Facebook, Maps, wa.me) | Partly checked — the official site was fetched; the Facebook URL is the one the site publishes; Maps and wa.me were not opened | — |
| Filter (hash-aware), sort, compare (max 3, modal) | PASS | `#for-two` shows 2 items; price sort ascending is correct; 4th checkbox disabled; table has 4 columns |
| Form: empty / invalid phone / valid / prefill | PASS | Errors shown; confirmation clearly says nothing was sent; `?treatment=Couple spa` preselects |
| **Bug found and fixed:** a validation message disappeared on blur, the layout shifted and the submit click was lost | FIXED — errors now clear on input | Retested |
| Mobile nav toggle, Esc to close; branch tabs with arrow keys | PASS | — |
| axe-core (WCAG 2 A/AA + best practice) at 375 and 1440 | PASS after fixes (contrast on the "pending" label, landmark for the concept bar, wordmark accessible name). One remaining report only appears mid-fade (reveal animation) | — |
| prefers-reduced-motion | Implemented (CSS disables transitions/reveal); not emulated in a test | NOT_RUN |
| noindex | PASS — meta robots on both pages, `X-Robots-Tag` in `_headers`, robots.txt Disallow | — |
| Weight | ~384 KB total incl. fonts; no images; 1 JS file (~6 KB) | — |
| Lighthouse, real devices, Safari/Firefox, deployed URL, CSP on Cloudflare | NOT_RUN | Needs deployment approval / devices |

**Limitations:** no authentic photography (plates are placeholders); the second branch has incomplete data by design; no independent QA agent run (single-session build, so the builder self-tested). Content accuracy is covered in `verification.md`.
