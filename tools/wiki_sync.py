# Patch note: builds the wiki pages from the repo docs. Run by .github/workflows/wiki.yml with the wiki folder as the argument.
import os, re, sys
W = sys.argv[1]
REPO = "https://github.com/Ginger-Hermit/Roblox-Game-Events-/blob/main/"
LINKS = {"README.md": "Home", "STATUS.md": "Status", "CHANGELOG.md": "Changelog", "CLAUDE.md": "AI-rules", "LIVE_CHECK_LOG.md": "Live-checks"}
def fix(t):
    def f(m):
        u = m.group(1)
        if re.match(r"(https?:|#|mailto:)", u) or not re.search(r"[./]", u): return m.group(0)
        return "](" + (LINKS.get(u) or REPO + u) + ")"
    return re.sub(r"\]\(([^)]+)\)", f, t)
def put(name, text): open(f"{W}/{name}.md", "w").write(fix(text).rstrip("\n") + "\n")
for src, name in LINKS.items():
    if not os.path.exists(src): continue
    t = open(src).read()
    if src == "CLAUDE.md": t = "# Rules for the AI\n\nThe rules the AI follows on every change.\n" + t.split("\n", 1)[1].replace("@STATUS.md\n", "")
    put(name, t)
