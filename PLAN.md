# AI Workshop — plan (v1, 2026-10-24)

Status: **signed off 2026-10-24 (Gate 1)**; labs and materials built the same day; Gate 3 dry run done the same day (see `instructor/dry-run-log.md`, gitignored). Adjust freely; the dry run (Gate 3) will rewrite the budgets and acceptance checklists.

## 1. One-paragraph summary

A 72-minute, hands-on, in-person workshop for undergraduates on **directing an AI coding assistant properly**: give it context, state symptoms not diagnoses, make it plan and list assumptions before it codes, work in steps you can check, verify before believing, and keep the decisions yourself. Attendees use a **free Claude account in a browser**, any OS, any browser, any text editor. Three mini-labs, each designed so that "fix it" / "build it" fails and the workflow succeeds. Slides follow the GithubWorkshop deck framework; nothing else from that workshop carries over (no shared repo, no CI check, no Git prerequisite, no closing poll).

## 2. Key constants

| Constant | Value |
|---|---|
| Length | 72 minutes, in person, laptops required |
| Audience | Undergraduates, mixed experience, not assumed to have attended the Git workshop |
| AI tool | Free Claude account (claude.ai) in the browser; no Claude Code, no API keys |
| Runtime | Plain HTML + JavaScript; double-click `index.html` (the app) and `tests.html` (green/red tests); **zero installs** |
| Editor | Any plain-text editor (Notepad / TextEdit plain-text mode); VS Code optional |
| Distribution | Public repo `TexBonham/AIWorkshop`; attendees **Download ZIP** (clone optional) |
| Slides | `docs/` on GitHub Pages, same framework as GithubWorkshop (poll/QR removed) |
| Labs | 3 mini-labs: bug (12 min), complaint (15 min), build (18 min) |
| Message budget | **10 total (3 / 4 / 3)**. Measured 2026-10-24 on a fresh free account: all four labs took 9 messages; the limit hit on the 11th. |
| Closing | Recap + take-home (the Lab 3 brief they didn't pick). No poll. |

## 3. Agenda

| Min | Section | Format |
|---:|---|---|
| 0–3 | Welcome: what you'll leave with, the budget warning, open the ZIP | slides |
| 3–14 | **How to work with an AI assistant**: the two ways "just ask" fails (instructor demo), then the workflow habits | slides + demo |
| 14–26 | **Lab 1: The bug that isn't where it looks** | hands-on |
| 26–30 | Debrief Lab 1 → slides: from a complaint to a spec | slides |
| 30–45 | **Lab 2: The complaint** | hands-on |
| 45–49 | Debrief Lab 2 → slides: building from a brief, the artifact loop | slides |
| 49–67 | **Lab 3: Build from a brief** (pick one of two) | hands-on |
| 67–72 | Wrap-up: recap, take-home, what exists beyond the browser | slides |

Debriefs are short and concrete: "who got it in one message? what did you paste?" Timing cues live in the speaker notes, as before.

## 4. The workflow habits (slide spine)

Drawn from the maintainer's own practice (plan sign-off with assumptions, checklist discipline, argue the case against, verify before asserting, never trust a claimed fix), translated for a browser chat:

| # | Habit | Browser-chat form |
|---|---|---|
| 1 | Context first | Start every chat with a short **project brief** (what the code is, what "done" means, what not to touch). In a Project, this lives in the project instructions. |
| 2 | Symptom, not diagnosis | Say what you saw and expected; don't guess the cause for it. |
| 3 | Reproduce, then paste the real output | Failing test text or exact wrong output beats a description. Text, not screenshots. |
| 4 | Plan before code, with assumptions | "List your assumptions and a plan. Don't write code yet." Correct the assumptions, then approve. |
| 5 | One intention per request | Size the step to what you can still check: a line in a small file, a tested feature in a big one. Forbid changes you didn't ask for. |
| 6 | Verify before you believe | "Fixed" is a claim, not evidence. Tests or a checklist decide, at the cheapest honest checkpoint: every edit in the labs, the end of a stage on a big project. |
| 7 | Read the diff, own the decision | You are the reviewer. Ask it to argue against its own choice when it matters. |
| 8 | Fresh chat when context rots | Long chats drift and cost more. New lab = new chat. |
| 9 | Budget your messages | Each wasted "still broken" is a message you don't get back. Each lab has a spend plan. |

## 5. Lab designs

Common shape for every lab folder: `index.html` (UI), `app.js` (logic — **the only file attendees edit**), `tests.html` + `tests.js` (visible tests, green/red in the browser), plus a short `README.md` that is the "ticket" (symptom, complaint, or brief). `app.js` exposes pure functions on `window` and guards `module.exports` so the maintainer can run the same tests headlessly in Node (attendees never need Node).

Every lab has two **lab-design tests** that must pass before the dry run (Gate 2):

- **Naive fails:** pasting `app.js` with "fix the bug" / "make it work" / "build this" does not produce a passing result in one shot.
- **Workflow succeeds:** following the LABS.md steps passes within the lab's message budget.

### Lab 1 — The bug that isn't where it looks (12 min, ≤ 3 messages)

| Property | Design |
|---|---|
| Teaches | Habits 1–3, 6: context, symptom, real output, verify |
| App | **Grade calculator**: weighted categories, scores as plain numbers or `earned/possible`, optional drop-lowest, letter grade |
| Design rule | The code is internally consistent; the bug is a convention that is only wrong against the syllabus in the ticket. Reading the code alone cannot tell you which convention was intended. A few correct-but-odd-looking blocks are pinned by visible tests so "cleaning them up" goes red. |
| Ticket | `labs/lab1-bug/README.md` |
| Spend plan | 1 brief+symptom+failing test output → 1 approve (skip the plan request if the first reply already gave one) → ≤ 1 fix round |
| Done when | `tests.html` all green; attendee can say which line changed and why |

Specifics (which line, the decoys, the traps) are in `instructor/lab-designs.md`, not here: this file is public.

### Lab 2 — The complaint (15 min, ≤ 4 messages)

| Property | Design |
|---|---|
| Teaches | Habits 4, 5, 7: spec from a complaint, assumptions, plan approval, scope control |
| App | **Campus event finder**: ~250 lines; list, search box, tag filter, sort, URL state. **All current tests pass.** |
| Complaint | `labs/lab2-complaint/README.md` |
| Design rule | The complaint is honestly ambiguous between several reasonable search behaviours; only one matches what the events office meant, and the obvious fix breaks a visible test. The dataset is seeded so each wrong reading shows up in the results. |
| Flow | Read complaint → write a spec as 5 example queries with expected results → ask Claude for assumptions + plan, no code → correct, approve → implement → run tests → **acceptance checklist shown by the instructor** after ~7 min → fix gaps → add a test for the new behaviour |
| Spend plan | 1 complaint+examples → 1 decisions+approve → ≤ 1 fix after the checklist → 1 add tests |
| Done when | Visible tests green + acceptance checklist queries all return the expected results |

The owner's intent and the acceptance checklist are in `instructor/checklists/lab2.md` (gitignored).

### Lab 3 — Build from a brief (18 min, ≤ 3 messages), two briefs

| Property | Design |
|---|---|
| Teaches | Habits 1, 4, 5, 9 end to end: brief → spec → assumptions → plan → one build → checklist → ≤ 2 fixes |
| Output | A single-file HTML artifact built inside Claude; attendee downloads/copies it and opens it locally |
| Spend plan | 1 spec+assumptions request → 1 approve + **build in one go** → ≤ 1 fix round |
| Done when | Acceptance checklist (written at Gate 3) passes in the attendee's own browser |

**Brief A (standard pick): Class schedule builder.** Framed as an advisor's email. Add courses (name, days, start, end, optional location), weekly grid, conflicts highlighted and listed, remove a course, survives reload. Deliberately unspecified: back-to-back classes, 12h vs 24h input, Saturday classes, partial overlaps, the same course entered twice, grid hours.

**Brief B (lighter pick): Game of Life.** Framed as a club's request for a demo page. Grid, play/pause/step/clear, speed control, click to toggle, click-drag to paint, generation counter, three presets (glider, blinker, pulsar), random fill. Deliberately unspecified: edge behavior (wrap vs fixed), grid size, what "clear" does to the counter, preset placement.

Framing on the slide: A is the standard pick; B is suggested if you are low on budget or want the more visual result. The one you don't pick is your take-home.

## 6. Repo layout

```
README.md            front door: what this is, start-here table, agenda
SETUP.md             Part A attendee pre-work (Claude account, editor, ZIP); Part B instructor checklist
LABS.md              Lab 0 (open the ZIP, first chat, project brief) + Labs 1–3, each: goal, steps, spend plan, "what you just learned", Problem/Fix table
PLAN.md              this file (retire or archive once built)
CLAUDE.md            maintainer reference: constants, jump table, cost log (+ per-dir CLAUDE.md in docs/, labs/, scripts/)
docs/                slides (index.html, css/, js/), cheatsheet.html — GithubWorkshop framework, poll/QR/config stripped
labs/
  lab1-bug/          index.html  app.js  tests.html  tests.js  README.md (ticket)
  lab2-complaint/    index.html  app.js  tests.html  tests.js  README.md (complaint)
  lab3-build/        README.md (how the lab runs)  brief-schedule.md  brief-life.md
  prompts.md         copy-paste prompt skeletons: project brief, "plan first", "assumptions", "argue against"
instructor/          GITIGNORED: solutions/, acceptance checklists, dry-run log, demo transcript screenshots
scripts/             verify_labs.py — maintainer only: broken app.js fails tests, solution passes (Node)
```

## 7. Setup

**Attendee (before the day, ~15 min):** create a free Claude account at claude.ai (phone verification likely); confirm you can start a chat; have a plain-text editor; download the repo ZIP and open `labs/lab1-bug/index.html` to see the app. Bring a laptop; a phone is not enough.

**Instructor:** GitHub Pages on; print cheat sheet; prepare the "bad prompt" demo on a paid account with screenshot fallback; run the Gate 3 dry run; pairing plan for anyone who runs out of budget; rehearse timing.

## 8. Gates

| Gate | What must be true |
|---|---|
| G1 Plan sign-off | This document approved (with amendments) |
| G2 Labs built | All three labs exist; both lab-design tests pass per lab on the instructor's account; `verify_labs.py` green |
| G3 Fresh-account dry run | All labs run on a **brand-new free account at a weekday afternoon hour**; message counts recorded; Lab 2 and Lab 3 acceptance checklists written from what was achievable; Projects + artifact download confirmed on free |
| G4 Materials final | Slides, LABS, SETUP, cheat sheet complete; full timed rehearsal; cost log updated |

## 9. Assumptions (everything inferred or defaulted — correct any that are wrong)

1. Title is a placeholder; working title "Coding with AI: Direct, Verify, Ship".
2. 72 minutes, in person, one session, attendees bring laptops.
3. Every attendee has their **own** free Claude account created before the day.
4. Free accounts have Projects (up to 5) and can download artifacts as HTML. Verified from Anthropic pages for Projects/artifacts generally; **download on free confirmed at G3**.
5. The free message budget covers ~17–20 messages of lab size in one window; **measured at G3**. Budgets above are targets, not facts.
6. Runtime is HTML/JS with logic in `app.js`; attendees don't need to know JavaScript; no Node, no installs for attendees.
7. All Lab 1 and Lab 2 tests are visible in `tests.html`; no hidden tests. "Hidden" lives only in the acceptance checklists.
8. Lab 2's acceptance checklist is revealed mid-lab after the spec step; Lab 3's checklists are written after G3.
9. The instructor demo runs on the instructor's paid account, with screenshots as fallback.
10. Slide framework is reused from GithubWorkshop; Pages hosted at `TexBonham/AIWorkshop`; repo public.
11. No collaborator invites, no CI check for attendees, no shared-repo workflow; the only script is maintainer-side verification.
12. The Lab 1 and Lab 2 apps (grade calculator, event finder) were finalized at build time (2026-10-24); the design properties in §5 are the contract.
13. Attendees work solo; pairing is only the out-of-budget fallback.
14. Attendees start each lab in a **new chat** inside one Project whose instructions hold the workshop project brief (teaches habit 1 and 8). If Projects prove unavailable on free at G3, fall back to pasting the brief at the top of each chat.
15. Lab 3 is built as an artifact inside Claude, not by editing local files.
16. No closing poll; the take-home brief is the closing call to action.
17. Code style in labs follows the maintainer's conventions (braces on all control flow, no `var`, no ternaries) so the solutions read cleanly on a slide.
18. Nothing is committed without maintainer review; `instructor/` is gitignored from the first commit.

## 10. Open questions (not blocking)

- Should Lab 1's ticket be delivered as a GitHub-issue-style page in `README.md`, or spoken on a slide only? (Default: both.)
- Does the cheat sheet become a one-page "prompt skeletons + habits" card? (Default: yes, replaces the Git command card.)
- Do we want a mid-workshop "check your usage" step so people see the meter before Lab 3? (Default: yes, 30 seconds before Lab 3.)
