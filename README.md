# Malika & Sourav — Bride-side Wedding Invitation (Version 58)

## Based on approved groom-side V57

The visuals, cover, music, timing of the countdown (13 Dec 2026, 8:00 p.m. IST), date reveal, confetti, and interactions are unchanged. The names are shown in bride-first order. The bride's role and parents are listed before the groom's in Meet the Couple. Events are Mehandi, Haldi and The Wedding, with precise provided Google Maps URL(s).

## IMPORTANT: preserve your exact latest groom-side photographs

This complete archive is a standalone site. It contains the SAME THREE COUPLE PHOTOGRAPHS you previously uploaded here, using locally accessible colour-graded photo versions. However, the original V57 source ZIP only had SVG photo placeholders; the six FINAL desktop/mobile crops in your current GitHub `development-alt-date-reveal` branch were added later and could not be directly retrieved here. **For exact pixel-for-pixel matching with your final groom-side gallery, use the small overlay ZIP on a copy of your latest groom-side GitHub files, or copy your six published photo files and their `photos` mapping in config.js to this new site.**

Keep the new bride-side site in a SEPARATE GitHub repository and Netlify project. Do not modify the groom production website.

## Recommended overlay workflow (preserves exact photos)

1. Download a ZIP of your latest groom branch `development-alt-date-reveal` via GitHub Code > Download ZIP. Unzip it.
2. Extract `malika-sourav-bride-v58-OVERLAY.zip` and copy `index.html`, `script.js`, `bride-side-override.js`, `bride-side.css` (and optional README) into the extracted groom site root. Replace the first two. Do NOT replace `config.js`, `site.css`, or `assets/`. The small `bride-side.css` file only prevents clipping of long venue names near the desktop breakpoint.
3. The new index.html now loads scripts in this order: `config.js`, then `bride-side-override.js`, then `script.js`. This is intentional: bride event settings override the groom events while all photo paths and music are untouched.
4. Upload that resulting folder's CONTENTS to the new separate GitHub repo and link the new repository to a new Netlify project.

## Calendar note

The start times reflect the bride-side invitation precisely. An end time was not provided. Google Calendar needs a start/end pair for prefilled event links; the website uses an editable **one-hour placeholder** in each event link. The invitation itself only displays the start time followed by "onwards". No reminders are set.

## Event details

- **Mehandi**, Fri 11 Dec 2026 6 PM onwards, Own Residence, Mahananda Pally, Malda. Calendar only; no Maps action.
- **Haldi**, Sun 13 Dec 2026 11 AM onwards, Mahananda Pally, Malda. Calendar + supplied Maps link.
- **The Wedding**, Sun 13 Dec 2026 7 PM onwards, Sukanta Smriti Sangha Club, Mahananda Pally. Calendar + supplied Maps link.

**Countdown target deliberately stays 8 PM on 13 Dec 2026**, one hour later than the bride-side event start time, per your request.

## Hosting

Site is static. In Netlify: Build command leave blank, Publish directory `.` (repository root), production branch `main`.
