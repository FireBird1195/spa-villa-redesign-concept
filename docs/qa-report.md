# QA report, iteration 2 (Nov 26, 2026)

Environment: local static server, Chromium (Playwright), axe-core 4.

| Check | Result |
|---|---|
| Layout at 375, 768 and 1440 px, both pages: horizontal overflow | PASS (0 px) after fixing the lattice ornament overflow (was 96 px) |
| Console and page errors, failed requests, broken images | PASS: none |
| axe (WCAG 2 A/AA + best practice) at 375 and 1440 | PASS after darkening the marigold label colour (was 4.3:1 on stone) |
| Treatment finder: `?who=two` gives 2 results; 30 min + two gives the empty state; the URL updates | PASS |
| Sort by price, high to low | PASS (5500 … 1799) |
| Compare: the 4th box is disabled at 3; the modal renders a table | PASS |
| "Plan this visit" opens the planner with the treatment preselected | PASS |
| Planner: switching branch syncs tabs and map, and the WhatsApp link targets that branch's number; a past date is rejected; message text is correct | PASS |
| Branch tabs: switching back syncs the planner | PASS |
| Walk-through: next button, counter, keyboard arrows | PASS (buttons and counter tested; arrow keys implemented, not automated) |
| Mobile nav opens and Esc closes | PASS |
| Viewport review of hero, walk-through, branches, planner, footer and treatments | Done. Fixed: duplicate photo in the menu, mobile menu thumbnail alignment, walk-through dead space on mobile, faint line on the logo |
| noindex meta, `X-Robots-Tag`, robots.txt | Present |
| Weight | Hero WebP ~130–260 KB per breakpoint. Total photos ~1.9 MB across all sizes and formats (a page loads one size). JS ~9 KB, no dependencies |
| Reduced motion | Implemented in CSS and JS; not emulated in tests (NOT_RUN) |
| Lighthouse, Safari/iOS, real devices, deployed URL, `_headers` on Cloudflare | NOT_RUN |
| Independent QA agent | NOT_RUN: built and tested in one session |

Known limitations: the photos are browser captures of web-sized originals, so some (320 px gallery images) are only usable small. Chhatrapati Square address and hours need confirmation (shown with a "To confirm" tag).
