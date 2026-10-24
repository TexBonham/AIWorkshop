const isNode = typeof module !== "undefined" && module.exports;
const H = isNode ? require("../harness.js") : Harness;
const api = isNode ? require("./app.js") : App;

function s(earned, possible) {
  return { earned: earned, possible: possible };
}

H.test("parseScores reads plain numbers as out of 100", function () {
  H.assertDeepEqual(api.parseScores("80, 90, 100"), [s(80, 100), s(90, 100), s(100, 100)]);
});

H.test("parseScores reads earned/possible pairs", function () {
  H.assertDeepEqual(api.parseScores("9/10 40/50, 95"), [s(9, 10), s(40, 50), s(95, 100)]);
});

H.test("parseScores reads scores copied from the syllabus tracker: '9 / 10, 40 / 50, 95 / 100' (ticket #41)", function () {
  H.assertDeepEqual(api.parseScores("9 / 10, 40 / 50, 95 / 100"), [s(9, 10), s(40, 50), s(95, 100)]);
});

H.test("parseScores accepts spaces and new lines, ignores blanks", function () {
  H.assertDeepEqual(api.parseScores(" 70\n85  100 ,, "), [s(70, 100), s(85, 100), s(100, 100)]);
});

H.test("parseScores skips things that are not scores", function () {
  H.assertDeepEqual(api.parseScores("90, abc, 8/0, 1/2/3, 80"), [s(90, 100), s(80, 100)]);
});

H.test("percent converts a score", function () {
  H.assertClose(api.percent(s(40, 50)), 80);
});

H.test("categoryAverage is the average of the percentages, not of the points", function () {
  H.assertClose(api.categoryAverage([s(9, 10), s(40, 50)], false), 85);
});

H.test("categoryAverage of three plain scores, no drop", function () {
  H.assertClose(api.categoryAverage([s(80, 100), s(90, 100), s(100, 100)], false), 90);
});

H.test("categoryAverage with drop lowest: 9/10, 40/50, 95/100 → 92.5", function () {
  H.assertClose(api.categoryAverage([s(9, 10), s(40, 50), s(95, 100)], true), 92.5);
});

H.test("categoryAverage with drop lowest on plain scores: 80, 90, 100 → 95", function () {
  H.assertClose(api.categoryAverage([s(80, 100), s(90, 100), s(100, 100)], true), 95);
});

H.test("categoryAverage with drop lowest and a tie drops only one score", function () {
  H.assertClose(api.categoryAverage([s(40, 50), s(8, 10), s(95, 100)], true), 87.5);
});

H.test("categoryAverage with drop lowest and a single score keeps it", function () {
  H.assertClose(api.categoryAverage([s(7, 10)], true), 70);
});

H.test("categoryAverage of no scores is null", function () {
  H.assertEqual(api.categoryAverage([], false), null);
});

H.test("weightedTotal combines categories by weight", function () {
  const total = api.weightedTotal([
    { weight: 40, average: 90 },
    { weight: 60, average: 80 }
  ]);
  H.assertClose(total, 84);
});

H.test("weightedTotal ignores categories with no scores yet", function () {
  const total = api.weightedTotal([
    { weight: 40, average: 90 },
    { weight: 60, average: null }
  ]);
  H.assertClose(total, 90);
});

H.test("weightedTotal with nothing graded is null", function () {
  H.assertEqual(api.weightedTotal([{ weight: 100, average: null }]), null);
});

H.test("letterGrade rounds up at .5, per the syllabus", function () {
  H.assertEqual(api.letterGrade(89.5), "A");
  H.assertEqual(api.letterGrade(89.49), "B");
  H.assertEqual(api.letterGrade(79.5), "B");
  H.assertEqual(api.letterGrade(69.5), "C");
  H.assertEqual(api.letterGrade(59.5), "D");
  H.assertEqual(api.letterGrade(59.49), "F");
});

H.test("letterGrade with no grade yet shows a dash", function () {
  H.assertEqual(api.letterGrade(null), "—");
});

H.test("formatPercent shows one decimal place", function () {
  H.assertEqual(api.formatPercent(87.5), "87.5%");
  H.assertEqual(api.formatPercent(92.5), "92.5%");
  H.assertEqual(api.formatPercent(null), "—");
});

H.test("summarize puts it all together", function () {
  const result = api.summarize([
    { name: "Homework", weight: 30, scores: "9 / 10, 40 / 50, 95 / 100", dropLowest: false },
    { name: "Exams", weight: 70, scores: "88", dropLowest: false }
  ]);
  H.assertClose(result.categories[0].average, 88.333333);
  H.assertClose(result.total, 88.1);
  H.assertEqual(result.letter, "B");
});

H.report(H.run());
