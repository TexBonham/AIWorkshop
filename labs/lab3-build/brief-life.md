# Brief B: Game of Life

> **From:** The computing club
> **Subject:** demo page for the club fair table
>
> Hey, we have a table at the club fair and want something that looks alive on the laptop screen. Could you make us a Conway's Game of Life page?
>
> People walking by should be able to click on the grid to turn cells on and off (dragging to paint would be great), then hit play and watch it go. We'd want play and pause, a step button for one generation at a time, a way to clear everything, and a speed control because the default is always either too fast or too slow. A counter showing the generation number would be nice so people can see it tick.
>
> A few preset patterns would help since most people won't know what to draw: a glider, a blinker, and that big pulsing one (pulsar?). Also a "random" button that fills the grid with noise.
>
> No server, no accounts, just a page we can open on the laptop. Make it look nice enough for a table display.

## What the brief does not say (you decide, then tell Claude)

Write down your answer to each before you start. These are your spec.

- How big is the grid? Does it resize with the window?
- What happens at the edges: do patterns wrap around, or die at the border?
- Does "clear" reset the generation counter? Does "random"?
- Where do presets appear: centered, or at a fixed spot? Do they replace the grid or add to it?
- Can you draw while it is playing?
- What is the speed range, and what is the default?
- What does a dead cell look like, and a live one?

Then write your acceptance checks: 8 to 12 one-line statements you can test by clicking, like "Placing the blinker preset and pressing step three times returns it to its starting shape."

## The rules (so you can check Claude's version)

Each generation, every cell looks at its 8 neighbours:

- A live cell with 2 or 3 live neighbours stays alive. Otherwise it dies.
- A dead cell with exactly 3 live neighbours becomes alive.
