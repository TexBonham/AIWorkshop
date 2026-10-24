const isNode = typeof module !== "undefined" && module.exports;
const H = isNode ? require("../harness.js") : Harness;
const api = isNode ? require("./app.js") : App;

const TODAY = "2026-11-02";

function titles(events) {
  return events.map(function (e) { return e.title; });
}

function state(overrides) {
  return Object.assign({}, api.DEFAULT_STATE, overrides);
}

H.test("empty search shows every event", function () {
  H.assertEqual(api.search(api.EVENTS, state({}), TODAY).length, api.EVENTS.length);
});

H.test("search ignores case", function () {
  const found = api.search(api.EVENTS, state({ query: "OPEN STUDIO" }), TODAY);
  H.assertDeepEqual(titles(found), ["Art Society Open Studio"]);
});

H.test("search ignores surrounding spaces", function () {
  const found = api.search(api.EVENTS, state({ query: "  pottery  " }), TODAY);
  H.assertDeepEqual(titles(found), ["Pottery Night"]);
});

H.test("search finds a word you have only started typing: 'prog' → Programming Club", function () {
  const found = api.search(api.EVENTS, state({ query: "prog" }), TODAY);
  H.assertDeepEqual(titles(found), ["Programming Club: Intro to Git"]);
});

H.test("tag filter keeps only events with that tag", function () {
  const found = api.search(api.EVENTS, state({ tag: "clubs", sort: "title" }), TODAY);
  H.assertDeepEqual(titles(found), [
    "Art Society Open Studio",
    "Cartography Club Meetup",
    "Chess Club Blitz Tournament",
    "Programming Club: Intro to Git"
  ]);
});

H.test("upcoming only hides events before today", function () {
  const found = api.search(api.EVENTS, state({ upcomingOnly: true }), TODAY);
  H.assertEqual(found.length, api.EVENTS.length - 2);
  H.assertEqual(found.some(function (e) { return e.title === "Department Open House"; }), false);
});

H.test("sort by date puts earlier events first, then by time", function () {
  const sorted = api.sortEvents(api.EVENTS, "date");
  H.assertEqual(sorted[0].title, "Department Open House");
  H.assertEqual(sorted[1].title, "Farmers Market on the Quad");
  const nov4 = sorted.filter(function (e) { return e.date === "2026-11-04"; });
  H.assertDeepEqual(titles(nov4), ["Cartography Club Meetup", "Chess Club Blitz Tournament"]);
});

H.test("sort by title is alphabetical", function () {
  const sorted = api.sortEvents(api.EVENTS, "title");
  H.assertEqual(sorted[0].title, "Art Society Open Studio");
  H.assertEqual(sorted[sorted.length - 1].title, "Study Abroad Info Session");
});

H.test("groupByDay groups consecutive events with the same date", function () {
  const groups = api.groupByDay(api.sortEvents(api.EVENTS, "date"));
  H.assertEqual(groups.length, 13);
  H.assertEqual(groups[2].date, "2026-11-03");
  H.assertEqual(groups[3].events.length, 2);
});

H.test("availableTags lists each tag once, alphabetically", function () {
  const tags = api.availableTags(api.EVENTS);
  H.assertEqual(tags[0], "academics");
  H.assertEqual(tags.indexOf("clubs"), tags.lastIndexOf("clubs"));
  H.assertDeepEqual(tags.slice().sort(), tags);
});

H.test("formatDate and formatTime are human friendly", function () {
  H.assertEqual(api.formatDate("2026-11-03"), "Tue Nov 3");
  H.assertEqual(api.formatTime("18:30"), "6:30 PM");
  H.assertEqual(api.formatTime("00:15"), "12:15 AM");
  H.assertEqual(api.formatTime("12:00"), "12:00 PM");
});

H.test("highlight wraps the matched text in <mark>", function () {
  H.assertEqual(api.highlight("Pottery Night", "night"), "Pottery <mark>Night</mark>");
  H.assertEqual(api.highlight("A <b> tag", ""), "A &lt;b&gt; tag");
});

H.test("URL state round-trips through the hash", function () {
  const s = state({ query: "chess club", tag: "clubs", upcomingOnly: true, sort: "title" });
  const hash = api.writeState(s);
  H.assertEqual(hash, "#q=chess%20club&tag=clubs&upcoming=1&sort=title");
  H.assertDeepEqual(api.readState(hash), s);
});

H.test("readState ignores junk and falls back to defaults", function () {
  H.assertDeepEqual(api.readState("#nonsense&sort=bogus"), api.DEFAULT_STATE);
  H.assertDeepEqual(api.readState(""), api.DEFAULT_STATE);
});

H.report(H.run());
