# UI/UX and copy audit, iteration 2.1 (Nov 26, 2026)

| # | Finding | Severity | Fix |
|---|---|---|---|
| 1 | Mobile: once the visitor scrolls past the hero, there's no quick way to call. Calling is the main conversion for a local spa | High | Added a sticky bottom bar on phones and tablets, with one call button per branch. It appears after the hero |
| 2 | The concept notice wraps to 2–3 lines on phones and pushes the hero down | Medium | Shorter notice on narrow screens |
| 3 | The hero says "Marigold at the door", but the dark overlay hid the marigold urli | Medium | The overlay is now directional (dark behind the text, clear on the right), so the reception and urli show |
| 4 | Proof paragraph repeated the heading ("Recognised by… Times") and overclaimed ("every towel", "sign at the door") | Medium | Rewritten to say only what the photos show |
| 5 | "Choose by occasion, not by jargon" sounds slightly condescending | Low | Now "Start with the time you have." |
| 6 | "from ₹5,400 as listed" is unclear | Low | Now "for two" |
| 7 | "Walk through before you book" is a little stiff | Low | Now "Step inside the villa", with a supporting line |
| 8 | Planner heading too long ("Put your booking request into one message") | Low | Now "Book in one message." The intro explains the call alternative |
| 9 | Footer had no opening hours | Low | Hours added per branch |
| 10 | Facts grid left an orphan item on small phones | Low | Kept at 3 columns |
| 11 | "We'll write the message" blurred who was speaking | Low | Neutral wording |
| 12 | No social preview image | Low | Added `og:image` and a Twitter card using the GitHub Pages URL |

Checked and kept: heading hierarchy, 44 px+ tap targets, focus states, alt text, contrast (axe clean), prices shown as published, "To confirm" tags on unverified data, and the absence of health claims.

Post-fix checks: no overflow at 375/768/1440, no console errors or broken images, axe clean, and all interaction tests pass.
