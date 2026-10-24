# Coding with AI: Direct, Verify, Ship

[![Slides](https://img.shields.io/badge/slides-GitHub%20Pages-2f6fde)](https://texbonham.github.io/AIWorkshop/)

Welcome! This repository holds everything for a 72-minute, hands-on workshop for undergraduates on **directing an AI coding assistant properly**: give it context, describe symptoms instead of guessing causes, make it plan and list its assumptions before it codes, change one thing at a time, verify every claim, and keep the decisions yourself. You'll use a **free Claude account in your browser** and any plain-text editor. Nothing to install. Three short labs are built so that "just fix it" fails and the workflow works.

## Start here

| | |
|---|---|
| **1. [SETUP.md](SETUP.md)** | **Do this before the workshop!** Free Claude account, a plain-text editor, download the ZIP. About 15 minutes. |
| **2. [Slides](https://texbonham.github.io/AIWorkshop/)** | The presentation. Use the arrow keys, or swipe on a phone. |
| **3. [LABS.md](LABS.md)** | Step-by-step instructions for every lab, with the message budget on every step. |
| **4. [Cheat sheet](https://texbonham.github.io/AIWorkshop/cheatsheet.html)** | One printable page: the 9 habits, the prompt skeletons, and "I'm stuck" fixes. |

## Agenda

| Minutes | Topic | Format |
|---:|---|---|
| 0–3 | Welcome, the message budget, open the ZIP | slides |
| 3–14 | How to work with an AI assistant: two ways "just ask" fails, then the 9 habits | slides + demo |
| 14–26 | **Lab 1:** the bug that isn't where it looks | hands-on |
| 26–30 | Debrief, then: from a complaint to a spec | slides |
| 30–45 | **Lab 2:** the complaint | hands-on |
| 45–49 | Debrief, then: building from a brief | slides |
| 49–67 | **Lab 3:** build from a brief (pick one of two) | hands-on |
| 67–72 | Recap, take-home, what exists beyond the browser | slides |

## What's in this repo

| Path | What it is |
|---|---|
| [`labs/lab1-bug/`](labs/lab1-bug/) | Lab 1: a grade calculator with a bug report |
| [`labs/lab2-complaint/`](labs/lab2-complaint/) | Lab 2: a campus events page and a user's complaint |
| [`labs/lab3-build/`](labs/lab3-build/) | Lab 3: two client briefs; you build one, the other is your take-home |
| [`labs/prompts.md`](labs/prompts.md) | Copy-paste prompt skeletons, numbered #0 to #8 |
| [`docs/`](docs/) | The slides and cheat sheet, published with GitHub Pages |
| [`LABS.md`](LABS.md), [`SETUP.md`](SETUP.md) | Lab guide and setup checklist |
| [`scripts/`](scripts/) | Maintainer-only checks for the labs; attendees never need them |

Each code lab has the same shape: `index.html` is the app (double-click it), `app.js` is the logic and **the only file you edit**, `tests.html` shows the tests green or red (refresh it after you save), and `README.md` is the ticket.

## The code is broken on purpose

The labs contain bugs and gaps **on purpose**. Please don't open issues about them; fixing them is the workshop. For anything else (a typo in the slides, a confusing step), please [open an issue](https://github.com/TexBonham/AIWorkshop/issues/new).
