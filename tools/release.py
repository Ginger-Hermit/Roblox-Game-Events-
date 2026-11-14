#!/usr/bin/env python3
"""Does all the paperwork for a site change, in one command. Run from the repo folder, BEFORE committing:

  python3 tools/release.py --title "Short title" --tag Changed --meaning "One plain sentence." \
      --see "Where to look." --change "First thing" --change "Second thing"

Bumps the version (site/version.txt, BUILD in site/update.js, STATUS.md), adds the CHANGELOG entry,
replaces the patch notes, fills in the code link of the previous entry, and runs the tests.
"""
import argparse, json, datetime, re, subprocess, sys

ap = argparse.ArgumentParser()
ap.add_argument("--title", required=True); ap.add_argument("--tag", default="Changed", choices=["New", "Changed", "Fixed", "Removed"])
ap.add_argument("--quiet", action="store_true", help="no Updated banner on the page");ap.add_argument("--meaning", required=True); ap.add_argument("--see", required=True)
ap.add_argument("--change", action="append")
a = ap.parse_args()
REPO = "https://github.com/Ginger-Hermit/Roblox-Game-Events-/commit/"

def rw(path, fn):
    s = open(path, encoding="utf-8").read(); t = fn(s)
    if t == s: sys.exit("release.py: nothing changed in " + path)
    open(path, "w", encoding="utf-8").write(t)

now = datetime.datetime.now(datetime.timezone.utc)
old = open("site/version.txt").read().strip()
day = max(now.strftime("%Y-%m-%d"), "2026-11-13")
shown = datetime.date.fromisoformat(day).strftime("%d %b %Y").lstrip("0")
x, y, z = old.split(".")
new = f"{x}.{y}.{int(z) + 1}"
head = subprocess.run(["git", "log", "--format=%h", "-1"], capture_output=True, text=True).stdout.strip()

open("site/version.txt", "w").write(new + "\n")
rw("site/update.js", lambda s: re.sub(r'^const NOTE = .*', lambda m: "const NOTE = " + json.dumps("" if a.quiet else a.meaning) + ";", s, count=1, flags=re.M))
rw("site/update.js", lambda s: re.sub(r'^// Patch note: .*', "// Patch note: " + a.meaning, s.replace(f'const BUILD = "{old}";', f'const BUILD = "{new}";'), count=1))
rw("site/index.html", lambda s: re.sub(r'<!-- Patch note: .*? -->', "<!-- Patch note: %s -->" % a.meaning.replace("--", "-"), s, count=1))

def log(c):  # Keep a Changelog: one "## [version] - date" heading per version; .github/workflows/release.yml makes the tag and Release
    k = c.index("\n## "); kind = {"New": "![Added](https://img.shields.io/badge/Added-2ea44f?style=flat-square)", "Changed": "![Changed](https://img.shields.io/badge/Changed-0969da?style=flat-square)", "Fixed": "![Fixed](https://img.shields.io/badge/Fixed-d4a72c?style=flat-square)", "Removed": "![Removed](https://img.shields.io/badge/Removed-cf222e?style=flat-square)"}[a.tag]
    return c[:k] + "\n## [%s] - %s · [code](%s/compare/v%s...v%s)\n\n### %s\n\n- **%s** · %s\n" % (new, day, REPO.rsplit("/commit/", 1)[0], old, new, kind, a.title, a.meaning) + c[k:]
rw("CHANGELOG.md", log)
rw("STATUS.md", lambda s: re.sub(r"Last updated: [^.]*\.", f"Last updated: {shown}.", re.sub(r"Page version [\w.-]+", "Page version " + new, s, count=1), count=1))
print("Version", old, "->", new)
sys.exit(subprocess.run([sys.executable, "-I", "tests/test_site.py"]).returncode)
