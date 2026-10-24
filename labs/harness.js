(function (root) {
  const tests = [];

  function test(name, fn) {
    tests.push({ name: name, fn: fn });
  }

  function fail(message) {
    throw new Error(message);
  }

  function show(value) {
    if (typeof value === "string") {
      return JSON.stringify(value);
    }
    if (Array.isArray(value) || (value !== null && typeof value === "object")) {
      return JSON.stringify(value);
    }
    return String(value);
  }

  function assertEqual(actual, expected, label) {
    if (actual !== expected) {
      fail((label ? label + ": " : "") + "expected " + show(expected) + " but got " + show(actual));
    }
  }

  function assertClose(actual, expected, label) {
    if (typeof actual !== "number" || Math.abs(actual - expected) > 1e-6) {
      fail((label ? label + ": " : "") + "expected " + show(expected) + " but got " + show(actual));
    }
  }

  function assertDeepEqual(actual, expected, label) {
    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
      fail((label ? label + ": " : "") + "expected " + show(expected) + " but got " + show(actual));
    }
  }

  function run() {
    const results = [];
    for (const t of tests) {
      try {
        t.fn();
        results.push({ name: t.name, pass: true, message: "" });
      } catch (err) {
        results.push({ name: t.name, pass: false, message: err && err.message ? err.message : String(err) });
      }
    }
    return results;
  }

  function report(results) {
    const failed = results.filter(function (r) { return !r.pass; });
    if (typeof document !== "undefined") {
      const list = document.getElementById("results");
      const summary = document.getElementById("summary");
      for (const r of results) {
        const li = document.createElement("li");
        li.className = r.pass ? "pass" : "fail";
        const name = document.createElement("strong");
        name.textContent = (r.pass ? "PASS  " : "FAIL  ") + r.name;
        li.appendChild(name);
        if (!r.pass) {
          const msg = document.createElement("pre");
          msg.textContent = r.message;
          li.appendChild(msg);
        }
        list.appendChild(li);
      }
      summary.textContent = failed.length === 0
        ? "All " + results.length + " tests pass."
        : failed.length + " of " + results.length + " tests fail.";
      summary.className = failed.length === 0 ? "pass" : "fail";
      return;
    }
    for (const r of results) {
      if (r.pass) {
        console.log("PASS  " + r.name);
      } else {
        console.log("FAIL  " + r.name);
        console.log("      " + r.message);
      }
    }
    console.log(failed.length === 0
      ? "All " + results.length + " tests pass."
      : failed.length + " of " + results.length + " tests fail.");
    if (typeof process !== "undefined") {
      process.exitCode = failed.length === 0 ? 0 : 1;
    }
  }

  const Harness = { test: test, assertEqual: assertEqual, assertClose: assertClose, assertDeepEqual: assertDeepEqual, run: run, report: report };
  root.Harness = Harness;
  if (typeof module !== "undefined" && module.exports) {
    module.exports = Harness;
  }
})(typeof window !== "undefined" ? window : globalThis);
