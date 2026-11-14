#!/usr/bin/env python3
"""Does all the paperwork for a site change, in one command. Run from the repo folder, BEFORE committing:

  python3 tools/release.py --title "Short title" --tag Changed --meaning "One plain sentence." \
      --see "Where to look." --change "First thing" --change "Second thing"

Bumps the version (site/version.txt, BUILD in site/update.js, STATUS.md), adds the CHANGELOG entry,
replaces the patch notes, fills in the code link of the previous entry, and runs the tests.
"""
import argparse, json, datetime, re, subprocess, sys

ap = argparse.ArgumentParser()
ap.add_argument("--title", required=True); ap.add_argument("--tag", default="Changed", choices=["New", "Changed"])
ap.add_argument("--quiet", action="store_true", help="no Updated banner on the page");ap.add_argument("--meaning", required=True); ap.add_argument("--see", required=True)
ap.add_argument("--change", action="append", required=True)
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

def log(c):
    k = c.index("\n## "); end = c.index("\n", c.index("\n\n", k + 1) + 2)
    if head and "[code]" not in c[k:end]: c = c[:end] + f" · [code]({REPO}{head})" + c[end:]
    block = "\n## %s\n\n%s (%s UTC) · ![%s](https://img.shields.io/badge/-%s-%s)\n\n%s\n\n> [!%s]\n> **What you'll see:** %s\n\n%s\n" % (
        a.title, shown, now.strftime("%H:%M"), a.tag, a.tag, "2ea44f" if a.tag == "New" else "blue", a.meaning, "TIP" if a.tag == "New" else "NOTE", a.see, "\n".join("- " + i for i in a.change))
    d0 = c.find("<details open>")
    if d0 >= 0 and "<b>%s</b>" % shown not in c[d0:k]:      # new day: fold the last one, open a new tab
        c = c[:d0] + "<details>" + c[d0 + len("<details open>"):]
        k = d0 - 1
        block = "\n<details open>\n<summary><b>%s</b> · today</summary>\n%s\n</details>\n" % (shown, block)
    return c[:k] + block + c[k:]
rw("CHANGELOG.md", log)
rw("STATUS.md", lambda s: re.sub(r"Last updated: [^.]*\.", f"Last updated: {shown}.", re.sub(r"Page version [\w.-]+", "Page version " + new, s, count=1), count=1))
print("Version", old, "->", new)
sys.exit(subprocess.run([sys.executable, "-I", "tests/test_site.py"]).returncode)
