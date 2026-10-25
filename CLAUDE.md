# AIWorkshop — maintainer reference

72-minute, in-person, hands-on workshop for undergraduates on **directing an AI coding assistant properly**. Attendees use a **free Claude account in a browser**; any OS, any browser, any plain-text editor; **zero installs**. Three mini-labs designed so "fix it"/"build it" fails and the workflow succeeds. Design rationale and assumptions: `PLAN.md`.

## Key constants

| Constant | Value |
|---|---|
| Repo | `TexBonham/AIWorkshop` (public, default branch `main`) |
| Length / format | 72 min, in person, laptops required, attendees work solo |
| AI tool | claude.ai free plan in the browser (no Claude Code, no API keys) |
| Runtime | Plain HTML + JS; `index.html` = app, `tests.html` = green/red tests; attendees edit **only `app.js`** |
| Lab lengths / message budgets | Lab 1: 12 min / ≤3 · Lab 2: 15 min / ≤4 · Lab 3: 18 min / ≤3 — **10 total; free limit hit on msg 11 in the 2026-10-24 dry run** |
| Lab 3 briefs | A `brief-schedule.md` (standard) · B `brief-life.md` (lighter); unpicked one = take-home |
| Slides | `docs/` on GitHub Pages (GithubWorkshop framework; poll/QR/config removed) |
| Maintainer toolchain | Node ≥ 18 (`node --test`-free; plain scripts) + Python 3 stdlib for `scripts/verify_labs.py` |
| Answer keys | `instructor/` — **gitignored, never committed** |

## Lab folder contract (detail in `labs/CLAUDE.md`)

| File | Role | Attendee edits? |
|---|---|:-:|
| `README.md` | the ticket / complaint / brief | no |
| `index.html` | UI; loads `app.js` | no |
| `app.js` | all logic; functions on `window`, guarded `module.exports` for Node | **yes, only this** |
| `tests.html` + `tests.js` | visible tests, green/red in browser; same `tests.js` runs under Node | no |

Lab-design tests (Gate 2): **naive prompt fails** ("fix the bug" / "make it work" on `app.js` alone does not pass in one shot) and **workflow succeeds** within the message budget.

## Where to find X

| Task | Files, in order |
|---|---|
| Change a lab's code or tests | `labs/labN-*/app.js` → `tests.js` → `instructor/solutions/labN/app.js` → `python scripts/verify_labs.py` |
| Change a ticket / complaint / brief | `labs/labN-*/README.md` (Lab 3: `brief-*.md`) → same text on the lab slide in `docs/index.html` → `LABS.md` |
| Prompt skeletons attendees copy | `labs/prompts.md` (numbered 0–8; LABS.md and slides reference them by number) |
| Slides / cheat sheet | `docs/index.html`, `docs/css/`, `docs/js/`, `docs/cheatsheet.html` (index in `docs/CLAUDE.md`) |
| Attendee setup / instructor checklist | `SETUP.md` |
| Step-by-step labs | `LABS.md` |
| Acceptance checklists (Lab 2 reveal, Lab 3) | `instructor/checklists/` — Lab 2 drafted + executable (`lab2.acceptance.js`); Lab 3 drafts, rewrite at Gate 3 |
| What the bug / owner's intent / traps are | `instructor/lab-designs.md` — **never in a committed file; the repo is public** |
| Dry-run measurements | `instructor/dry-run-log.md` |

## Agenda (slides follow this)

Lab slots are deliberately longer than the dry run suggests (28 min of labs with no student thinking time); keep 12 / 15 / 18.

| Min | Section | Format |
|---:|---|---|
| 0–3 | Welcome, budget warning, open the ZIP | slides |
| 3–14 | Two ways "just ask" fails (demo) → the 9 habits | slides + demo |
| 14–26 | Lab 1: the bug that isn't where it looks | hands-on |
| 26–30 | Debrief → complaint-to-spec | slides |
| 30–45 | Lab 2: the complaint (acceptance checklist revealed ~min 37) | hands-on |
| 45–49 | Debrief → building from a brief | slides |
| 49–67 | Lab 3: build from a brief (A or B) | hands-on |
| 67–72 | Recap, take-home, beyond the browser | slides |

## The 9 habits (slide spine; keep numbering stable — LABS.md and cheat sheet reference it)

1 Context first · 2 Symptom, not diagnosis · 3 Reproduce, paste real output · 4 Plan + assumptions before code · 5 One intention per request · 6 Verify before you believe · 7 Read the diff, own the decision · 8 Fresh chat when context rots · 9 Budget your messages

## Code conventions

- Curly braces on all control flow; no `var`; no ternary `?:`.
- Comments only where the WHY is non-obvious. Lab `app.js` files contain **no hint comments**; bugs must look like honest mistakes.
- Lab code: ES2015+, no libraries, no build step, works from `file://`.
- Scripts: Python 3 stdlib only.

## Gates

| Gate | State |
|---|---|
| G1 Plan sign-off | ✅ 2026-10-24 |
| G2 Labs built, design tests pass, `verify_labs.py` green | ✅ 2026-10-24 — proxy design tests: naive fails (Lab 1 v3, Lab 2), workflow succeeds (Lab 1 in 2 msgs, Lab 2 in 3 msgs); details `instructor/dry-run-log.md` |
| G3 Fresh free-account dry run → budgets + acceptance checklists | ✅ 2026-10-24 — all 4 labs in 9 msgs / ~28 min / 0 fix rounds; limit hit on msg 11; budgets set to 3/4/3; see `instructor/dry-run-log.md` |
| G4 Materials final, timed rehearsal | pending |

## Session Cost Log

| Date | Task | Mode | Tokens (est.) | Notes |
|------|------|------|:-------------:|-------|
| 2026-10-24 | Read GithubWorkshop for structure; planning rounds; PLAN.md | inline | ~45K | Includes two web searches on free-plan limits |
| 2026-10-24 | Scaffolding, prompts.md, Lab 3 briefs, Lab 1 + Lab 2 code/tests/keys, verify_labs.py, instructor drafts | inline | ~60K | Lab 1 bug redesigned twice after proxy runs found it |
| 2026-10-24 | Slides (28), LABS, SETUP, README, cheat sheet, docs/CLAUDE.md | general-purpose (opus) | 126K | Largest output set; reused GithubWorkshop framework |
| 2026-10-24 | Docs follow-ups ×2: Lab 1 ticket text (v2, then v3), Gate 3 tags | general-purpose (opus, resumed) | ~11K | Resume, not respawn; would have been one pass had the proxy test run before the docs dispatch |
| 2026-10-24 | Naive-prompt proxy runs (Lab 1 ×3, Lab 2 ×1) | general-purpose (sonnet) | 4 × ~41K | Cheap design tests; Lab 1 v1 and v2 failed the "naive fails" test |
| 2026-10-24 | Workflow proxy runs (Lab 1: 2 turns, Lab 2: 3 turns), me as the student | general-purpose (sonnet, resumed per turn) | 45K + 52K | Validated skeletons and budgets; led to the "skip #2 if already answered" LABS.md note |
| 2026-10-24 | Habits 5/6 rewording; LABS skip-#2 note; dry-run log | inline | ~12K | |
| 2026-10-24 | Gate 3 dry run (instructor drove the free account; I logged, checked outputs under Node/jsdom, wrote two page harnesses) | inline | ~40K | Reading two generated pages (~1100 lines) dominated |
| 2026-10-24 | Apply dry-run findings to deck, LABS, SETUP, cheat sheet (budgets 3/4/3, habit 6, no-meter slide, download notes) | general-purpose (opus, resumed) | ~39K | Fourth resume of the docs agent; still cheaper than a fresh spawn |
