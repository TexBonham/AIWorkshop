"""Maintainer check for the coded labs. Python 3 stdlib + Node.

Runs each lab's tests.js under Node against the shipped (broken) app.js and against the
answer key in instructor/solutions/<lab>/app.js, and the Lab 2 acceptance check against both.

    python scripts/verify_labs.py            # all labs
    python scripts/verify_labs.py lab1       # one lab

Expected matrix (anything else is a failure):

    lab   | shipped app.js        | answer key
    ------+-----------------------+------------
    lab1  | tests FAIL            | tests PASS
    lab2  | tests PASS            | tests PASS
          | acceptance FAIL       | acceptance PASS
"""

import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
LABS = ROOT / "labs"
SOLUTIONS = ROOT / "instructor" / "solutions"
CHECKLISTS = ROOT / "instructor" / "checklists"

LAB_DIRS = {
    "lab1": LABS / "lab1-bug",
    "lab2": LABS / "lab2-complaint",
}

EXPECTED = {
    ("lab1", "tests", "shipped"): False,
    ("lab1", "tests", "solution"): True,
    ("lab2", "tests", "shipped"): True,
    ("lab2", "tests", "solution"): True,
    ("lab2", "acceptance", "shipped"): False,
    ("lab2", "acceptance", "solution"): True,
}


def node(args, cwd):
    result = subprocess.run(["node"] + args, cwd=str(cwd), capture_output=True, text=True, timeout=60)
    return result.returncode == 0, (result.stdout + result.stderr).strip()


def run_tests(lab_dir, app_js):
    with tempfile.TemporaryDirectory() as tmp:
        tmp_labs = Path(tmp) / "labs"
        tmp_lab = tmp_labs / lab_dir.name
        tmp_lab.mkdir(parents=True)
        shutil.copy(LABS / "harness.js", tmp_labs / "harness.js")
        for name in ("tests.js",):
            shutil.copy(lab_dir / name, tmp_lab / name)
        shutil.copy(app_js, tmp_lab / "app.js")
        return node(["tests.js"], tmp_lab)


def run_acceptance(lab, app_js):
    script = CHECKLISTS / (lab + ".acceptance.js")
    if not script.exists():
        return None, "no acceptance script"
    return node([str(script), str(app_js)], ROOT)


def check(lab):
    lab_dir = LAB_DIRS[lab]
    variants = {
        "shipped": lab_dir / "app.js",
        "solution": SOLUTIONS / lab / "app.js",
    }
    problems = []
    for variant, app_js in variants.items():
        if not app_js.exists():
            problems.append(f"{lab} {variant}: missing {app_js}")
            continue
        for kind in ("tests", "acceptance"):
            key = (lab, kind, variant)
            if key not in EXPECTED:
                continue
            if kind == "tests":
                passed, output = run_tests(lab_dir, app_js)
            else:
                passed, output = run_acceptance(lab, app_js)
            if passed is None:
                problems.append(f"{lab} {kind} {variant}: {output}")
                continue
            want = EXPECTED[key]
            summary = output.splitlines()[-1] if output else "(no output)"
            if passed == want:
                verdict = "ok"
            else:
                verdict = "UNEXPECTED"
                problems.append(f"{lab} {kind} {variant}: expected {'pass' if want else 'fail'}, got {'pass' if passed else 'fail'}\n{output}")
            label = "pass" if passed else "fail"
            print(f"  {lab:5} {kind:10} {variant:9} {label:4}  {verdict:10} {summary}")
    return problems


def main(argv):
    wanted = argv[1:] or list(LAB_DIRS)
    all_problems = []
    for lab in wanted:
        if lab not in LAB_DIRS:
            print(f"unknown lab {lab!r}; choose from {', '.join(LAB_DIRS)}")
            return 2
        print(lab)
        all_problems.extend(check(lab))
    if all_problems:
        print("\nPROBLEMS")
        for p in all_problems:
            print("- " + p)
        return 1
    print("\nAll labs match the expected matrix.")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
