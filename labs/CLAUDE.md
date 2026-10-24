# labs/ — contract

One folder per lab. Attendees edit **only `app.js`**. Everything runs from `file://` with no network, no build, no libraries.

## Files per coded lab (`lab1-bug`, `lab2-complaint`)

| File | Role | Notes |
|---|---|---|
| `README.md` | the ticket / complaint, files table, "done when", budget | text must match the lab slide and `LABS.md` |
| `index.html` | the app UI; `<script src="app.js">` then an inline script that only calls `App.*` | no logic here |
| `app.js` | all logic as top-level functions; ends with `const App = {...}` + guarded `module.exports` | top-level `const App` is a global lexical binding, so browser scripts see `App`; Node gets it via `require` |
| `tests.js` | `const H = isNode ? require("../harness.js") : Harness; const api = isNode ? require("./app.js") : App;` then `H.test(...)`; ends with `H.report(H.run())` | never redeclare `App` or `Harness` (would clash with the globals) |
| `tests.html` | loads `../harness.js`, `app.js`, `tests.js`; needs `#summary` and `#results` elements | refresh after saving `app.js` |

`harness.js` (shared): `test(name, fn)`, `assertEqual`, `assertClose` (1e-6), `assertDeepEqual` (JSON), `run()` → results, `report(results)` → DOM when `document` exists, else console + `process.exitCode`.

Run under Node from the lab folder: `node tests.js`. Verify the whole matrix: `python scripts/verify_labs.py`.

## Lab 1 and Lab 2 design notes

Anything that names the bug, the owner's intent, the decoys or the traps is in `instructor/lab-designs.md` (gitignored). This repo is public; keep answers out of every committed file, including this one and `PLAN.md`.

## Lab 3 (`lab3-build`)

No code. `README.md` (how the lab runs) + `brief-schedule.md` (A, standard) + `brief-life.md` (B, lighter). Each brief ends with the "what the brief does not say" questions. Acceptance checklists are written at Gate 3 into `instructor/checklists/lab3-*.md`.

## `prompts.md`

Skeletons numbered 0–8. `LABS.md`, the slides and the cheat sheet reference them by number; renumbering means updating all three.
