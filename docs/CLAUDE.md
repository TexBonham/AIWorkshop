# docs/ — slides and cheat sheet (GitHub Pages root)

Served from `/docs` on `main` at https://texbonham.github.io/AIWorkshop/. No build step, no frameworks, no network: everything works from `file://`. Edit the files directly.

## Files

| File | Role |
|---|---|
| `index.html` | The deck. Every slide is a `<section class="slide">` inside `<main class="deck">`, in agenda order. Ends with the HUD `<nav class="hud">` and one script. |
| `css/slides.css` | Copied from GithubWorkshop. Tokens on `:root` (light) + dark overrides (`prefers-color-scheme` guarded by `:root:not([data-theme="light"])`, and `:root[data-theme="dark"]`). Layout, slide variants, cards, ticket/chat, notes, HUD, overview grid, print. Diagram/conflict/poll styles removed. |
| `js/slides.js` | Navigation, hash sync, notes/overview/fullscreen, clock, HUD, swipe. One IIFE. GithubWorkshop's `config.js`, repo-link and poll/QR code removed. |
| `cheatsheet.html` | Standalone one-page (letter) cheat sheet with inline styles: 9 habits, skeletons #0–#8, "I'm stuck". Linked from the HUD and the wrap-up slides. |

## Slide markup conventions

| Thing | Markup |
|---|---|
| Section start | First slide of a section carries `data-section="N · Title"` (HUD label for it and every later slide) and `data-at="mm:ss"` (planned start, shown next to the clock). Usually a `.divider`; Lab 1/2/3 sections start on their `.lab` slide instead. |
| Timed slide | Any slide may carry `data-at` alone (Lab 0 at 2:00, checklist reveal at 37:00, usage meter at 48:30, Lab 3 self-check at 65:00) |
| Lab slide | `class="slide lab"`, `.kicker` "Hands-on · Lab N · X min · ≤M messages", ticket in `<div class="ticket">` (verbatim from the lab README), short `<ol>`, `.labfoot` linking the `LABS.md` anchor |
| Demo transcript | `<div class="chat">` with `.you` / `.ai` bubbles, each starting `<span class="who">` |
| Habit number / skeleton ref | `<span class="habit">N</span>` · `<span class="skel">#K</span>` |
| Speaker notes | exactly one `<aside class="notes"><ul><li>[mm:ss] …</li></ul></aside>` per slide |
| Two columns | `<div class="cols">` (`.three` for three); cards `<div class="card">` (`.good` / `.bad` accent) |
| Tables | `<div class="table-wrap"><table class="simple">` |

**Never put an acceptance checklist in the deck.** The deck is public; checklists live in `instructor/checklists/` and are shown on the projector.

## LABS.md anchors used here

`#lab-0-set-up-follow-along` · `#lab-1-the-bug-that-isnt-where-it-looks` · `#lab-2-the-complaint` · `#lab-3-build-from-a-brief` (links are absolute `https://github.com/TexBonham/AIWorkshop/blob/main/LABS.md#…`). Renaming a LABS.md heading breaks them.

## Add / reorder a slide

1. Copy an existing `<section class="slide">…</section>` block (including its `<aside class="notes">`).
2. Paste it where it belongs; order in the file = order in the deck. Slide numbers (URL hash) are positional, so they shift. `SETUP.md` Part B cites slides 3, 6 and 7 by number.
3. New section? Add a `<!-- ===== Section N: Title ===== -->` marker and give its first slide `data-section`/`data-at`, then update the index below.
4. Check: `node --check docs/js/slides.js`, count `<section class="slide` = count `<aside class="notes">`, open `index.html` in a browser.

## Keyboard / input

| Input | Action |
|---|---|
| `→` `Space` `PageDown` / swipe left / click right half | next |
| `←` `PageUp` / swipe right / click left half | previous |
| `Home` / `End` | first / last |
| `N` | toggle speaker notes panel |
| `F` | fullscreen |
| `O` (or `Esc` to leave) | overview grid; click a slide to jump |
| `T` | reset the elapsed clock |
| URL `#N` | slide N (1-based); kept in sync, survives reload |

Clicks on links, buttons, form fields, `pre`, notes and the HUD don't navigate; neither does a click while text is selected.

## index.html section index (line numbers)

| Line | Marker | Slides |
|---:|---|---:|
| 14 | Section 0: Welcome (title, agenda, budget, Lab 0) | 4 |
| 100 | Section 1: How to work with an AI assistant (divider, 2 demo slides, 6 habit slides) | 9 |
| 266 | Section 2: Lab 1 | 1 |
| 294 | Section 3: Debrief Lab 1 (questions, complaint → spec) | 2 |
| 330 | Section 4: Lab 2 (lab, checklist reveal) | 2 |
| 370 | Section 5: Debrief Lab 2 (questions, brief → build, usage meter) | 3 |
| 419 | Section 6: Lab 3 (pick a brief, steps, self-check) | 3 |
| 470 | Section 7: Wrap-up (habits recap, take-home, beyond the browser, thanks) | 4 |

Total 28 slides. Read a section with `Read(docs/index.html, offset=<line>, limit=80)`.
