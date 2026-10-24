# Brief A: Class schedule builder

> **From:** Academic advising office
> **Subject:** small tool for registration week
>
> Hi! During registration week students keep coming in with a list of courses they want, and we draw a weekly grid on paper to see what collides. Could you make us a little web page that does that?
>
> Students would type in each course (the course name, which days it meets, and the start and end time; the room would be nice too), and the page would show a week view like a planner, with each class as a block in its slot. If two classes collide it should be obvious, highlighted or something, and ideally there's a list somewhere saying exactly which ones collide so we can read it out.
>
> They'd need to be able to remove a course if they change their mind. And if they accidentally close the tab it would be great if their courses were still there when they come back.
>
> It doesn't need accounts or saving to a server or anything, just something that runs in the browser that we can open on the office laptop.
>
> Thanks!

## What the brief does not say (you decide, then tell Claude)

Write down your answer to each before you start. These are your spec.

- Which days appear on the grid? Weekends?
- What hours does the grid cover?
- Are two classes that end and start at the exact same minute a conflict?
- Does a class that overlaps by one minute count?
- How are times entered: `9:00 AM`, `09:00`, `0900`? What happens on bad input?
- Can the same course be entered twice? Is that a conflict?
- Can a course meet on different days at different times?
- What does "obvious" look like for a conflict?
- What exactly does the conflict list say?

Then write your acceptance checks: 8 to 12 one-line statements you can test by clicking, like "Adding a class Mon 9:00 to 10:00 and another Mon 9:30 to 10:30 highlights both and lists the pair."
