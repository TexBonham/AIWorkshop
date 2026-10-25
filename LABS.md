# Workshop Labs

Step-by-step instructions for every hands-on part of the workshop. You need a browser, a free Claude account at [claude.ai](https://claude.ai), a plain-text editor, and this repo unzipped on your laptop. Nothing to install.

> Haven't set up yet? Do [SETUP.md](SETUP.md) first. Want a one-page summary? See the [cheat sheet](https://texbonham.github.io/AIWorkshop/cheatsheet.html).

**Words you'll see**

| Word | Meaning |
|---|---|
| **prompt** | The message you send to the assistant |
| **context** | Everything the assistant can see in this chat: your brief, the code you pasted, earlier messages. It knows nothing else about your project. |
| **Project** | A folder in claude.ai that holds chats plus shared **instructions** every chat in it starts with |
| **artifact** | The side panel where Claude shows a whole file (like a web page). It has a **Download** button. |
| **assumption** | Something the assistant decided on its own because you didn't say. Wrong assumptions are where wrong code comes from. |
| **acceptance check** | One line you can test by clicking, e.g. "Searching *jazz* shows the Jazz Night event." Your list of them is the spec. |

**Prompt skeletons** are in [`labs/prompts.md`](labs/prompts.md), numbered **#0 to #8**. Every step that sends a message names one. Copy it, fill in the blanks, send.

**Message budgets:** Lab 1 ≤ 3, Lab 2 ≤ 4, Lab 3 ≤ 3, so **10 in total**, measured in a dry run on a fresh free account. The free limit is on work, not a fixed count: long chats, big pastes and page builds cost more. It runs on a rolling 5-hour window, so starting a new chat does not reset it. There is no usage meter on a free account, and you may get no warning at all: when the limit hits, the reply just stops. Count your own messages.

Contents: [Lab 0](#lab-0-set-up-follow-along) · [Lab 1](#lab-1-the-bug-that-isnt-where-it-looks) · [Lab 2](#lab-2-the-complaint) · [Lab 3](#lab-3-build-from-a-brief)

---

## Lab 0: Set up (follow along)

**Goal:** the repo on your laptop, one Claude Project with the workshop brief in it. **0 messages.**

1. **Get the files.** On the repo page, click the green **Code** button → **Download ZIP**. Unzip it (Windows: right-click → **Extract All**; macOS: double-click the ZIP).
2. **Check a lab runs.** In the unzipped folder, double-click `labs/lab1-bug/index.html`. A grade calculator opens in your browser.
3. **Open Claude.** Go to [claude.ai](https://claude.ai) and sign in.
4. **Create one Project** named `AI Workshop` (Projects, in the left sidebar).
5. **Paste skeleton #0** (the project brief from `labs/prompts.md`) into the Project's **instructions**. Save.
6. **The rule for today:** every lab starts as a **new chat inside that Project**. The brief comes with it automatically.

**No Projects in your sidebar?** That's fine. Paste skeleton #0 at the top of the first message of every lab's chat instead. It costs no extra messages.

**What you just learned:** context first (habit 1). The brief sets the rules for every chat: plan first, smallest change, only `app.js`, never claim "fixed", and if it runs anything itself, say exactly what it ran and what it did not test.

| Problem | Fix |
|---|---|
| `index.html` opens in Notepad / a text editor | Right-click → **Open with** → your browser. |
| Can't find the files after unzipping | You may be looking inside the ZIP, not the unzipped folder. Extract first, then open the new folder. |
| Can't sign in to claude.ai | Raise your hand. Phone verification can take a minute; do it in [SETUP.md](SETUP.md) next time. |
| No **Projects** option | Use the fallback above. |

---

## Lab 1: The bug that isn't where it looks

**Goal:** fix a wrong homework average by giving the assistant the symptom and the real test output, not "fix the bug". **12 min · 3 messages.**

The ticket (also in [`labs/lab1-bug/README.md`](labs/lab1-bug/README.md)):

> **#41 · Homework average comes out as 50.7%**
>
> I copied my homework scores straight from the syllabus tracker sheet: **9 / 10, 40 / 50, 95 / 100**. The app shows the Homework average as **50.7%**, and my overall grade shows a C. By hand those are 90%, 80% and 95%, which average to **88.3%**, and that should make the overall a B.
>
> Quizzes and the midterm look right, so it's just Homework.

| File | Edit it? |
|---|:-:|
| `labs/lab1-bug/index.html` (the app) | no |
| `labs/lab1-bug/app.js` (the logic) | **yes, only this** |
| `labs/lab1-bug/tests.html` (green/red tests; refresh after saving `app.js`) | no |

1. **Start a new chat** in your `AI Workshop` Project.
2. **Reproduce it yourself.** Open `index.html`. The Homework row is already filled in with the ticket's scores. Does Homework show 50.7%? Then open `tests.html` and **copy the red lines** (as text).
3. **Message 1 of 3 — use skeleton #1.** Fill in what you did, what you saw (50.7%), what you expected (88.3%, and why), and paste the red test lines. Open `app.js` in your editor, select all, copy, and paste it in too. The skeleton says **don't write code yet**.
4. **Message 2 of 3 — use skeleton #3.** Read its reply first: is every assumption and plan step about the Homework average? Anything else is a refactor you didn't ask for. Correct any wrong assumption, answer its questions, approve the steps you agree with, and ask for only the changed lines. **Its reply had no assumptions, plan or questions at all?** Use skeleton #2 for Message 2 instead; your approval then becomes Message 3, and you have no fix round left, so read its plan carefully.
5. **Apply the change.** Edit `app.js` in your editor, **save**, then **refresh** `tests.html`. If it offers the whole file as a download instead of changed lines, that's fine to use, but open it and compare first: only the function you approved should differ.
6. **All green?** You're done. **Anything red?** **Message 3 of 3 — use skeleton #4**: paste exactly the red lines. Apply, save, refresh.
7. **Finish:** point at the line you changed and say, in one sentence, why it was wrong.

**What you just learned:** symptom, not diagnosis (habit 2); paste the real output (habit 3); verify before you believe (habit 6): "fixed" means nothing until your tests say so. "Fix the bug" sends the assistant to the ugliest code, not the broken code.

| Problem | Fix |
|---|---|
| Tests still red after refresh | Did you **save** `app.js`? Are you editing the `app.js` in `labs/lab1-bug/`, not a copy somewhere else? |
| Claude says "fixed" but tests are red | Don't argue. Paste the red lines back with skeleton #4. |
| A **different** test went red after the fix | Good catch: that's real evidence. Paste it with skeleton #4. |
| Claude rewrote code you didn't ask about | Say "Only change what's needed for this bug. Undo the rest." and point at skeleton #0's rules. |
| Notepad saved `app.js.txt` | **Save As** → *Save as type:* **All files** → name `app.js`. |
| Page is blank or every test is red | You probably pasted over too much. Undo in your editor (`Ctrl+Z` / `Cmd+Z`) and apply only the changed lines. |
| It offered the whole `app.js` as a download | Fine to use. Open it next to your copy and compare: only the function you approved should be different. Anything else changed? Don't use it; ask for only the changed lines. |

---

## Lab 2: The complaint

**Goal:** decide what "correct" search means, write it down as examples, and get exactly that built. **15 min · 4 messages.**

The complaint (also in [`labs/lab2-complaint/README.md`](labs/lab2-complaint/README.md)):

> **From a student, via the feedback form**
>
> The search on the events page is broken. I typed **art** and got *Startup Weekend* and *Cartography Club*. Neither of those has anything to do with art. The actual *Art Society Open Studio* was in the list, but so was a bunch of junk.

Every test currently passes. The code does what it was written to do; it just wasn't written to do what people expect.

1. **Start a new chat** in your Project. Open `labs/lab2-complaint/index.html` and try the search yourself.
2. **Before opening Claude, write your spec:** 5 searches and what each should show. Use paper or a text file. Cover at least: a word that appears inside other words, a two-word search, and different capital letters.

   | # | I type | I expect to see | I expect NOT to see |
   |---|---|---|---|
   | 1 | `art` | | |
   | 2 | | | |
   | 3 | | | |
   | 4 | | | |
   | 5 | | | |

3. **Message 1 of 4 — use skeleton #5.** Paste the complaint word for word, your 5 examples, and `app.js`. Ask which examples the current code gets wrong, and what cases you haven't decided. No code yet. **Fill in all five examples before you send. Anything left as `<...>` goes to the assistant as-is.**
4. **Message 2 of 4 — use skeleton #3, with your decisions.** Read its reply carefully: the assumptions and questions are where the real decisions are. Answer every question, correct the assumptions that don't match your examples, approve the plan, ask for only the changed lines.
5. **Apply and test.** Edit `app.js`, save, refresh `tests.html` (still all green?), then try your 5 examples in `index.html`. If it offers the whole file as a download instead of changed lines, that's fine to use, but open it and compare first: only the function you approved should differ.
6. **The instructor reveals the acceptance checklist** on the projector (about 7 minutes into the lab). Run every query on it in `index.html`. Note which ones fail.
7. **Message 3 of 4 — use skeleton #8** (fix round), **only if something fails**: list only the checks that fail and what actually happens. Apply, save, test.
8. **Message 4 of 4:** ask "Write 2 tests for the new search behaviour in the same style as tests.js." Paste them into `tests.js`, save, refresh `tests.html`. They should be green.

**What you just learned:** a complaint isn't a requirement; examples are the spec. Plan before code, with assumptions (habit 4). Keep the change small (habit 5). You decide what correct means, not the assistant (habit 7).

| Problem | Fix |
|---|---|
| Claude went straight to code | Don't apply it. Use Message 2 with skeleton #2 ("Before you change anything, list every assumption…") and put your decisions in the same message. |
| I sent the template with the blanks still in it | Send the examples in your next message; it will still use them. That message counts. |
| Its plan rewrites the whole file | Use skeleton #3: approve only the steps about search. "Do not change sorting, filtering or URL state." |
| Not sure which fix is right | Skeleton #6: ask for the strongest case against its approach and one alternative. |
| Old tests went red | Your change broke something that worked. Paste the red lines with skeleton #4. |
| `tests.html` breaks after pasting new tests | You pasted outside the list of tests. Undo, and paste them next to the existing tests, in the same format. |
| Search changes don't show up | Save `app.js`, then refresh `index.html` too, not just `tests.html`. |
| It offered the whole `app.js` as a download | Fine to use. Open it next to your copy and compare: only the search function you approved should be different. Anything else changed? Don't use it; ask for only the changed lines. |

---

## Lab 3: Build from a brief

**Goal:** turn a vague client brief into a spec, get the page built in **one** build, test it in your own browser, and fix only what fails. **18 min · 3 messages.**

Pick **one** brief. The other is your take-home. (Count your messages first: if you have sent 7 or more today, pick B.)

| Brief | Pick it if | File |
|---|---|---|
| **A. Class schedule builder** (standard) | You want the more practical, logic-heavy build | [`labs/lab3-build/brief-schedule.md`](labs/lab3-build/brief-schedule.md) |
| **B. Game of Life** (lighter) | You're low on messages, or want the more visual result | [`labs/lab3-build/brief-life.md`](labs/lab3-build/brief-life.md) |

1. **Read your brief.** Open the file in your editor (or on GitHub).
2. **Answer "What the brief does not say"** at the bottom of your brief, on paper or in a text file. One line per question. These answers are your decisions; the assistant shouldn't make them for you.
3. **Write 8 to 12 acceptance checks**: one-line statements you can test by clicking. Example: "Adding a class Mon 9:00 to 10:00 and another Mon 9:30 to 10:30 highlights both and lists the pair."
4. **Start a new chat** in your Project.
5. **Message 1 of 3 — use skeleton #7.** Paste the brief and your checks. It lists assumptions and a plan; it does **not** build yet.
6. **Message 2 of 3 — use skeleton #3.** Correct every assumption that doesn't match your answers from step 2, answer its questions, then approve: "Build it now, in one go." This is your **one** build.
7. **Get the file.** The build arrives as an artifact. Click its **Download** button (or copy all its code into a new file ending in `.html`, e.g. `schedule.html`). Double-click the file to open it in your browser.
8. **Tick your list.** Go through every acceptance check in your browser, not inside Claude. Mark pass or fail. It may say it tested its own build. Good, but its tests check its reading of the brief; your list checks yours.
9. **One fix round.** **Message 3 of 3 — use skeleton #8**: list only the failing checks and what actually happens. Download again, re-test.
10. **Self-check:** at the end, the instructor shows a checklist for each brief. How many did your own list cover?

**What you just learned:** brief → spec → acceptance checks → one build → test locally → fix only what fails. A whole-page build is the most expensive message you'll send (habit 9), so settle the spec first (habit 4) and keep fix rounds narrow (habit 5).

| Problem | Fix |
|---|---|
| Artifact won't download | Copy the code into a new file ending in `.html` and open that. |
| Reply stopped mid-sentence | You may have hit the limit. The artifact it already produced is usually still there: download it and test it. |
| Saved file opens as text, not a page | The name must end in `.html`, not `.html.txt`. Windows Notepad: **Save as type: All files**. |
| TextEdit saved rich text | **Format → Make Plain Text**, then save again as `.html`. |
| Claude built straight away at message 1 | Fine, but read its choices against your step-2 answers before testing. Your checks still decide. |
| A fix broke something that worked | Skeleton #8 again, naming both the new failure and "don't change anything that already works". |
| Out of messages | A new chat won't help: the limit is per account, over a rolling 5-hour window. Pair with a neighbour, or finish the take-home later. |
