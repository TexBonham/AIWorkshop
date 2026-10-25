# Setup

- **Part A** is for **attendees**. Please do it **before** the workshop (about 15 minutes).
- **Part B** is the **instructor** checklist.

---

## Part A: Attendee pre-workshop checklist

Tick each box as you go. Nothing to install, and no coding experience with AI tools needed.

### 1. A free Claude account

- [ ] **Create a free account** at <https://claude.ai>. You'll probably need to verify a phone number. **Do this a few days ahead**, not on the morning of the workshop.
- [ ] **Send one test message**, e.g. "Hello". If you get a reply, your account works.
- [ ] **Look for Projects** in the left sidebar. If you see it, great. If you don't, that's fine: the labs have a fallback.

Please don't use up your messages the morning of the workshop. The labs need about 10 messages. Free usage runs on a rolling 5-hour window, there is no usage meter, and starting a new chat does not reset it.

### 2. A plain-text editor

You'll edit one JavaScript file per lab. Any editor that saves **plain text** works.

| Your computer | Use | Watch out for |
|---|---|---|
| Windows | **Notepad** is fine (VS Code optional) | When saving, keep the name `app.js`, not `app.js.txt` |
| macOS | **TextEdit**, after **Format → Make Plain Text**, or VS Code | TextEdit defaults to rich text; switch to plain text first |
| Linux | Anything you like | |

### 3. The workshop files

- [ ] **Download the ZIP.** Go to <https://github.com/TexBonham/AIWorkshop>, click the green **Code** button → **Download ZIP**. (Know Git? Cloning works too; it's optional.)
- [ ] **Unzip it** somewhere easy to find, like your Desktop. Windows: right-click → **Extract All**. macOS: double-click.
- [ ] **Open the first lab.** In the unzipped folder, double-click `labs/lab1-bug/index.html`. You should see a **grade calculator** in your browser. Don't fix anything yet.

### 4. On the day

- [ ] **Bring a charged laptop.** A phone is not enough: you'll be switching between a browser, an editor, and the lab pages.
- [ ] Be signed in to claude.ai before you sit down.

**Stuck?** Come 10 minutes early and we'll sort it out together.

---

## Part B: Instructor checklist

### About a week before

- [ ] **Turn on GitHub Pages.** Settings → **Pages** → Source: **Deploy from a branch** → Branch: `main`, folder: `/docs` → **Save**. After a minute the slides are live at <https://texbonham.github.io/AIWorkshop/>.
- [ ] **Send attendees to Part A**, stressing the phone verification and "do it days ahead".
- [ ] **Prepare the demo** ("two ways just-ask fails", slides 6 and 7) on your paid account: the tip-splitter "fix the bug" and "add X" requests. Save screenshots of both transcripts in `instructor/demo/` as the fallback.
- [x] **Run the fresh-account dry run (Gate 3).** Done 2026-10-24 (weekday afternoon, fresh free account). Results in `instructor/dry-run-log.md`: Projects and artifact download work on free; no usage meter.
- [ ] **Write the acceptance checklists** from what the dry run achieved: `instructor/checklists/lab2.md`, `lab3-schedule.md`, `lab3-life.md`. These are shown on the projector only; they are not in the public deck.
- [ ] **Budgets are 3/4/3 from the dry run**; re-measure if Anthropic changes the free tier (slide 3, the lab slides, LABS.md, the cheat sheet).

### A few days before

- [ ] **Print the [cheat sheet](https://texbonham.github.io/AIWorkshop/cheatsheet.html)** (one page, one per attendee).
- [ ] **Pairing plan.** Decide how you'll pair anyone who runs out of messages (one laptop drives, the other writes the acceptance checks). Tell your helpers.
- [ ] **Timed rehearsal** of the whole deck with the speaker notes open. Each section's planned start time shows next to the clock.

### On the day

| Key | Does |
|---|---|
| **F** | fullscreen |
| **N** | speaker notes (timing cues are in the notes) |
| **T** | reset the elapsed clock when you start |
| **O** | overview grid, click to jump |

- Have `instructor/checklists/lab2.md` open in a second window for minute 37, and the Lab 3 checklists ready for minute 65.
- Have `instructor/demo/` open in case the live demo misbehaves.
