# Security guard: red cross if any of these safety rules is undone.
import pathlib, sys
R = pathlib.Path(__file__).resolve().parent.parent
f = lambda p: (R / p).read_text()
checks = {
    "Turn on needs HOOK_KEY": "!env.HOOK_KEY" in f("functions/api/turn-on.js"),
    "Daily run needs RUN_KEY": "!env.RUN_KEY ||" in f("functions/api/run.js"),
    "Webhooks encrypted (AES-GCM)": "AES-GCM" in f("functions/api/_lib.js"),
    "Posts can't ping anyone": "allowed_mentions: { parse: [] }" in f("functions/api/_lib.js"),
    "Strict page safety rules": all(x in f("site/_headers") for x in
        ["default-src 'none'", "script-src 'self'", "frame-ancestors 'none'", "nosniff"]),
    "No inline scripts": all("<script>" not in p.read_text() for p in (R / "site").glob("*.html")),
}
bad = [k for k, ok in checks.items() if not ok]
for k in bad: print("FAIL:", k)
sys.exit(1 if bad else print("security ok"))
