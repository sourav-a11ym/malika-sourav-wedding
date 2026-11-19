# Malika & Sourav — Bride-side Wedding Invitation (Version 62)

## Based on approved groom-side V57

The visuals, cover, music, date reveal, confetti, and interactions are unchanged. The countdown is now 13 Dec 2026, 7:00 p.m. IST. The names are shown in bride-first order. The bride's role and parents are listed before the groom's in Meet the Couple. Events are Mehandi, Haldi, The Wedding and Reception, with precise provided Google Maps URL(s).

## IMPORTANT: preserve your exact latest groom-side photographs

This complete archive is a standalone site. It contains the SAME THREE COUPLE PHOTOGRAPHS you previously uploaded here, using locally accessible colour-graded photo versions. However, the original V57 source ZIP only had SVG photo placeholders; the six FINAL desktop/mobile crops in your current GitHub `development-alt-date-reveal` branch were added later and could not be directly retrieved here. **For exact pixel-for-pixel matching with your final groom-side gallery, use the small overlay ZIP on a copy of your latest groom-side GitHub files, or copy your six published photo files and their `photos` mapping in config.js to this new site.**

Keep the new bride-side site in a SEPARATE GitHub repository and Netlify project. Do not modify the groom production website.

## Recommended overlay workflow (preserves exact photos)

1. Download a ZIP of your latest groom branch `development-alt-date-reveal` via GitHub Code > Download ZIP. Unzip it.
2. For an existing V60 bride-side site, extract `malika-sourav-bride-v61-update-only.zip` and replace just `bride-side-override.js` in your website root. Do not replace `config.js`, `site.css`, `script.js`, `bride-side.css`, or `assets/`. The bride-side CSS keeps the venue lines inside each card and aligns the map pins with the first line.
3. The new index.html now loads scripts in this order: `config.js`, then `bride-side-override.js`, then `script.js`. This is intentional: bride event settings override the groom events while all photo paths and music are untouched.
4. Upload that resulting folder's CONTENTS to the new separate GitHub repo and link the new repository to a new Netlify project.

## Calendar note

Google Calendar links now include the specified event start/end times in **Asia/Kolkata (IST)**: Mehandi 11 Dec 2026 6:00–10:00 PM; Haldi 13 Dec 2026 11:00 AM–2:00 PM; Wedding 13 Dec 2026 7:00–11:00 PM. Event cards continue to display the starting time followed by "onwards". No reminders are set.

## Event details

- **Mehandi**, Fri 11 Dec 2026 6 PM onwards, Own Residence, Mahananda Pally, Malda. Calendar only; no Maps action.
- **Haldi**, Sun 13 Dec 2026 11 AM onwards, Own Residence, Mahananda Pally, Malda. Calendar only; no View Directions button.
- **The Wedding**, Sun 13 Dec 2026 7 PM onwards, Sukanta Smriti Sangha Club, Mahananda Pally, Malda. Calendar + supplied Maps link.

**Countdown target: 7 PM on 13 Dec 2026**, matching the bride-side wedding start time.

## Hosting

Site is static. In Netlify: Build command leave blank, Publish directory `.` (repository root), production branch `main`.

## Version 59 changes

- Countdown: Sunday, **13 December 2026 at 7:00 p.m. IST** (in both `config.js` and the bride-side override, so the overlay works with an unchanged groom-side config).
- Celebration card venues: two explicit display lines on each card, with responsive bride-side styling to contain the address inside the box; the full address is retained for calendar and Google Maps actions.
- Mehandi description: “An evening of henna, music, dance and cherished moments as our celebrations begin.”
- Haldi description: “Join us for a sunlit celebration of turmeric, laughter, love, and blessings.”
- Wedding description: “Join us as we exchange our vows and start our new journey together forever.”
- No changes to gallery images, background music, animations, or existing event links.

## Version 60 alignment fix

- The gold location-pin icon in all three Celebration event cards now aligns vertically with the **first** of the two venue-address lines (rather than being vertically centered across both lines).
- Only `bride-side.css` changed from v59. Replace that file in your repository for a minimal update, or use the full v60 ZIP.
- Venue wording, line breaks, countdown, event messages, photos, maps/calendar links, and site functionality remain unchanged.

## Version 61 changes

- Removed the **View Directions** action from the Haldi card. Mehandi remains calendar-only and Wedding retains its maps action.
- Updated Google Calendar event durations: **Mehandi** (11 Dec) 6:00–10:00 PM; **Haldi** (13 Dec) 11:00 AM–2:00 PM; **The Wedding** (13 Dec) 7:00–11:00 PM, all IST.
- Updated calendar descriptions to reflect confirmed end times instead of the previous editable one-hour placeholders.
- No changes to the visible time labels, countdown, event dates, venue lines, icon alignment, photographs, music, or animations.

## Version 62 changes

- Added the **Reception** card: Tuesday, 15 December 2026, 7:00 p.m. onwards, **Rajeswari Palace, Rupnarayanpur**. Message: “Celebrate a beautiful new beginning with us.”
- **View Directions** opens the supplied Google Maps URL: https://maps.app.goo.gl/6Ux3ahxtAAGDNo6D8
- **Add to Calendar** opens Google Calendar prefilled for **15 December 2026, 7:00–11:00 p.m. IST** (`ctz=Asia/Kolkata`).
- Desktop layouts wider than 900px: **two cards per row**, with Mehandi + Haldi on row one, Wedding + Reception on row two. 900px and narrower: **one column**, vertically stacked.
- Existing Mehandi, Haldi, Wedding, countdown, map-pin alignment, photographs, music, and animations are unchanged.

### Updating an existing V61 bride-side repository

Download the `malika-sourav-bride-v62-update-only.zip` and replace `bride-side-override.js`, `bride-side.css`, and `index.html` on your GitHub `development` branch. Do **not** replace `config.js`, `script.js`, `site.css`, or `assets/`. Once tested, merge the changes into your live production branch.
