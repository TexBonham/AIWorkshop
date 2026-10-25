# Prompt skeletons

Copy, fill in the blanks, paste. Every lab in [LABS.md](../LABS.md) tells you which one to use and when. The words in **bold** are the parts that do the work.

## 0. Project brief (paste once, at the top of a Project's instructions or the first message of a chat)

```
You are helping me with a small web app written in plain JavaScript. The logic
is in app.js; index.html is the UI and tests.html runs tests in the browser.

Rules for this chat:
- Before changing code, list your assumptions and a short plan. Wait for my OK.
- Make the smallest change that fixes the problem. Do not refactor, rename, or
  "clean up" anything I did not ask about.
- Only change app.js unless I say otherwise.
- When you give me code, show the exact lines that changed and why.
- Never say something is fixed; tell me what to run to check.
- If you run anything yourself, tell me exactly what you ran and what you did
  not test.
```

## 1. Report a bug

```
Here is app.js (pasted below). 

What I did: <steps>
What I saw: <exact wrong output>
What I expected: <exact right output, and why — e.g. "the syllabus says...">
Failing test output, copied from tests.html:
<paste>

**Do not write code yet.** Tell me what you think is wrong, what you'd need to
confirm it, and the smallest change you'd make.
```

## 2. Ask for assumptions and a plan

```
Before you change anything: **list every assumption** you are making about how
this should behave, and give me a **numbered plan** of the changes. Keep each
change as small as possible. Wait for my approval.
```

## 3. Approve (and correct)

```
Assumption 2 is wrong: <correction>. Everything else is right.
Go ahead with steps 1–3 only. Show me only the changed lines.
```

## 4. Report back after testing

```
I applied the change and ran tests.html. Result:
<paste the red lines, or "all green">
```

## 5. Turn a complaint into a spec

```
A user complained: "<complaint, word for word>"

Here is what I think the correct behaviour is, as examples:
- Input: <...>  → Expected: <...>
- Input: <...>  → Expected: <...>
- Input: <...>  → Expected: <...>

**Which of these does the current code get wrong, and why?** Are there cases my
examples don't cover that you'd need me to decide? Don't write code yet.
```

## 6. Argue against it

```
Before I accept this: give me the **strongest case against** this approach, and
one alternative. Then tell me which you'd pick and why. No code.
```

## 7. Build from a brief

```
I want you to build a single-file web page (HTML + CSS + JS in one file, no
libraries, no server). Here is the brief: 

<paste brief>

Here is my spec, written as acceptance checks:
- <check 1>
- <check 2>
...

**Do not build yet.** List your assumptions about anything the brief leaves
open, and a short plan. I'll correct the assumptions, then you build it in one
go.
```

## 8. Fix round (after testing a build)

```
I opened the file and checked it against my list. These fail:
- <check>: <what actually happens>
- <check>: <what actually happens>

Fix **only** these. Don't change anything that already works. Show me what you
changed.
```
