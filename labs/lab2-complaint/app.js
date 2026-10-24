// Campus events page logic. Loaded by index.html (the page) and tests.html (the tests).

const EVENTS = [
  { id: "e01", title: "Art Society Open Studio", tags: ["art", "clubs"], date: "2026-11-03", time: "18:00", location: "Fine Arts 112" },
  { id: "e02", title: "Startup Weekend", tags: ["business", "hackathon"], date: "2026-11-06", time: "17:30", location: "Innovation Hub" },
  { id: "e03", title: "Cartography Club Meetup", tags: ["clubs", "geography"], date: "2026-11-04", time: "16:00", location: "Geo 210" },
  { id: "e04", title: "Programming Club: Intro to Git", tags: ["clubs", "computing"], date: "2026-11-05", time: "18:30", location: "CS 140" },
  { id: "e05", title: "Pottery Night", tags: ["art", "crafts"], date: "2026-11-07", time: "19:00", location: "Ceramics Studio" },
  { id: "e06", title: "Career Fair", tags: ["careers"], date: "2026-11-10", time: "10:00", location: "Student Union Ballroom" },
  { id: "e07", title: "Oscars Watch Party", tags: ["film", "social"], date: "2026-11-08", time: "20:00", location: "Residence Lounge" },
  { id: "e08", title: "Chess Club Blitz Tournament", tags: ["clubs", "games"], date: "2026-11-04", time: "19:00", location: "Library Commons" },
  { id: "e09", title: "Intramural Soccer Finals", tags: ["sports"], date: "2026-11-09", time: "15:00", location: "North Field" },
  { id: "e10", title: "Guest Lecture: Martian Geology", tags: ["science", "lecture"], date: "2026-11-05", time: "12:00", location: "Science 301" },
  { id: "e11", title: "Study Abroad Info Session", tags: ["academics"], date: "2026-11-11", time: "13:00", location: "Global Center" },
  { id: "e12", title: "Hackathon Kickoff", tags: ["hackathon", "computing"], date: "2026-11-13", time: "18:00", location: "Innovation Hub" },
  { id: "e13", title: "Jazz Ensemble Concert", tags: ["music", "arts"], date: "2026-11-12", time: "19:30", location: "Recital Hall" },
  { id: "e14", title: "Farmers Market on the Quad", tags: ["food", "social"], date: "2026-10-30", time: "11:00", location: "Main Quad" },
  { id: "e15", title: "Department Open House", tags: ["academics"], date: "2026-10-29", time: "15:00", location: "Engineering Atrium" }
];

const DEFAULT_STATE = { query: "", tag: "", upcomingOnly: false, sort: "date" };

function normalizeQuery(query) {
  return String(query || "").trim().toLowerCase();
}

function matchesQuery(event, query) {
  const needle = normalizeQuery(query);
  if (needle === "") {
    return true;
  }
  return event.title.toLowerCase().includes(needle);
}

function matchesTag(event, tag) {
  if (!tag) {
    return true;
  }
  return event.tags.includes(tag);
}

function isUpcoming(event, today) {
  return event.date >= today;
}

function filterEvents(events, state, today) {
  const result = [];
  for (const event of events) {
    if (!matchesQuery(event, state.query)) {
      continue;
    }
    if (!matchesTag(event, state.tag)) {
      continue;
    }
    if (state.upcomingOnly && !isUpcoming(event, today)) {
      continue;
    }
    result.push(event);
  }
  return result;
}

function compareByDate(a, b) {
  if (a.date !== b.date) {
    return a.date < b.date ? -1 : 1;
  }
  if (a.time !== b.time) {
    return a.time < b.time ? -1 : 1;
  }
  return compareByTitle(a, b);
}

function compareByTitle(a, b) {
  const left = a.title.toLowerCase();
  const right = b.title.toLowerCase();
  if (left === right) {
    return 0;
  }
  if (left < right) {
    return -1;
  }
  return 1;
}

function sortEvents(events, sortBy) {
  const copy = events.slice();
  if (sortBy === "title") {
    copy.sort(compareByTitle);
  } else {
    copy.sort(compareByDate);
  }
  return copy;
}

function groupByDay(events) {
  const groups = [];
  let current = null;
  for (const event of events) {
    if (current === null || current.date !== event.date) {
      current = { date: event.date, events: [] };
      groups.push(current);
    }
    current.events.push(event);
  }
  return groups;
}

function availableTags(events) {
  const seen = {};
  for (const event of events) {
    for (const tag of event.tags) {
      seen[tag] = true;
    }
  }
  return Object.keys(seen).sort();
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function formatDate(isoDate) {
  const parts = isoDate.split("-");
  const d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
  return DAYS[d.getDay()] + " " + MONTHS[d.getMonth()] + " " + d.getDate();
}

function formatTime(hhmm) {
  const parts = hhmm.split(":");
  let hours = Number(parts[0]);
  const minutes = parts[1];
  let suffix = "AM";
  if (hours >= 12) {
    suffix = "PM";
  }
  if (hours === 0) {
    hours = 12;
  } else if (hours > 12) {
    hours -= 12;
  }
  return hours + ":" + minutes + " " + suffix;
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function highlight(title, query) {
  const needle = normalizeQuery(query);
  if (needle === "") {
    return escapeHtml(title);
  }
  const lower = title.toLowerCase();
  let out = "";
  let from = 0;
  let at = lower.indexOf(needle, from);
  while (at !== -1) {
    out += escapeHtml(title.slice(from, at));
    out += "<mark>" + escapeHtml(title.slice(at, at + needle.length)) + "</mark>";
    from = at + needle.length;
    at = lower.indexOf(needle, from);
  }
  out += escapeHtml(title.slice(from));
  return out;
}

function readState(hash) {
  const state = Object.assign({}, DEFAULT_STATE);
  const text = String(hash || "").replace(/^#/, "");
  if (text === "") {
    return state;
  }
  for (const pair of text.split("&")) {
    const eq = pair.indexOf("=");
    if (eq === -1) {
      continue;
    }
    const key = decodeURIComponent(pair.slice(0, eq));
    const value = decodeURIComponent(pair.slice(eq + 1));
    if (key === "q") {
      state.query = value;
    } else if (key === "tag") {
      state.tag = value;
    } else if (key === "upcoming") {
      state.upcomingOnly = value === "1";
    } else if (key === "sort") {
      if (value === "title" || value === "date") {
        state.sort = value;
      }
    }
  }
  return state;
}

function writeState(state) {
  const parts = [];
  if (state.query) {
    parts.push("q=" + encodeURIComponent(state.query));
  }
  if (state.tag) {
    parts.push("tag=" + encodeURIComponent(state.tag));
  }
  if (state.upcomingOnly) {
    parts.push("upcoming=1");
  }
  if (state.sort && state.sort !== DEFAULT_STATE.sort) {
    parts.push("sort=" + state.sort);
  }
  if (parts.length === 0) {
    return "";
  }
  return "#" + parts.join("&");
}

function search(events, state, today) {
  const filtered = filterEvents(events, state, today);
  return sortEvents(filtered, state.sort);
}

const App = {
  EVENTS: EVENTS,
  DEFAULT_STATE: DEFAULT_STATE,
  matchesQuery: matchesQuery,
  matchesTag: matchesTag,
  isUpcoming: isUpcoming,
  filterEvents: filterEvents,
  sortEvents: sortEvents,
  groupByDay: groupByDay,
  availableTags: availableTags,
  formatDate: formatDate,
  formatTime: formatTime,
  highlight: highlight,
  readState: readState,
  writeState: writeState,
  search: search
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = App;
}
