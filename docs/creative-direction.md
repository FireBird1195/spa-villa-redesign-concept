# Creative direction — "the villa drawing set"

**Insight.** The live site is a Boost 360 template with a preview banner, Lorem Ipsum offers, a "Hair Color" booking pop-up, an empty booking widget and two different phone numbers. The menu itself is good — eight treatments with clear prices — but a guest cannot tell what a treatment involves, which branch offers it, or how to book. The business also says its director is an architect. That gave the visual idea without needing to state it as a claim.

**Language.** The site reads like a calm architect's drawing set: limewash paper (#F4EFE7), tamarind ink (#2A221D), hairline rules, numbered sheets and annotations, an illustrative plan of a room for two in the hero, clay (#9B4A31) for emphasis and sage (#56614F) for the enquiry band. Newsreader (an editorial serif with optical sizes) carries headings and prices; Hanken Grotesk carries labels and body. No black-and-gold, gradients, glass, stock photos or generated imagery.

**Why it suits Spa Villa.** It is warm and domestic rather than hotel-generic, it gives the brand something ownable (the plan/sheet motif) and its structure follows the guest's real decisions: time and company → treatment → branch → contact.

## What is built
| Page | Sections / interactions |
|---|---|
| Home | Concept notice; hero with 3 facts and illustrative plan; menu index by occasion (links pre-filter page 2); Antaara spread with inclusions; two treatments for two; 4-step first visit; ARIA tab branch selector with Maps link; enquiry band — tel, WhatsApp, email, callback form (validation, prefill from any "Ask about this" link, non-transmitting confirmation); footer disclaimer |
| Treatments | 8 treatments with price, duration, inclusions; filter (5 groups, hash-aware); sort (menu/price/duration); compare up to 3 in a modal table; "before you book" notes; per-treatment enquiry prefill |

## Improvement over the current site
- Removes template noise (preview banner, placeholder text, irrelevant pop-up, dead booking widget).
- Prices and durations visible together and comparable; Couple Spa's missing duration is shown honestly.
- Grouped by occasion rather than platform categories.
- One phone number, consistently; branches presented as a choice rather than a buried line.
- A first-visit guide answers the questions first-time guests actually have.
- Mobile-first: sticky filters, full-width actions, 44px targets.

## Future (paid engagement)
Authorised photography in the plates; real logo; branch-level hours and availability; a real enquiry/booking integration; gift vouchers if offered; a CMS driven by the treatment data structure (`data-*` attributes already model price, duration and category).
