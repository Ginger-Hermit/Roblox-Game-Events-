"""Quick checks run by GitHub on every push."""
import json, os, re, subprocess, sys, py_compile
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE = os.path.join(ROOT, "site")
bad = []
py_compile.compile(os.path.join(ROOT, "events", "check.py"), doraise=True)
d = json.load(open(os.path.join(SITE, "events.json")))
for k in ("game", "game_name", "events"):
    if k not in d: bad.append(f"events.json missing {k}")
for f in os.listdir(SITE):
    p = os.path.join(SITE, f)
    if f.endswith(".js"):
        r = subprocess.run(["node", "--check", p], capture_output=True, text=True)
        if r.returncode: bad.append(f"{f}: {r.stderr.strip()[:200]}")
    if f.endswith(".html"):
        s = open(p).read()
        if 'style="' in s: bad.append(f"{f}: inline style is blocked by the page's security rule")
        for ref in re.findall(r'(?:href|src)="([^"#:]+)"', s):
            if ref not in ("./", "#") and not os.path.exists(os.path.join(SITE, ref)):
                bad.append(f"{f}: broken link {ref}")
v = open(os.path.join(SITE, "version.txt")).read().strip()
if f'const BUILD = "{v}";' not in open(os.path.join(SITE, "update.js")).read(): bad.append("update.js BUILD does not match version.txt")
if "Page version " + v not in open(os.path.join(ROOT, "STATUS.md")).read(): bad.append("STATUS.md version does not match")
for e in bad: print("FAIL", e)
sys.exit(1 if bad else print("all good"))
