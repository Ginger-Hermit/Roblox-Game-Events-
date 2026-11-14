# Rules for Claude: Roblox Game Events

> [!IMPORTANT]
> Read this and the status at the start of every chat. Never ask Ginger for a handoff. Ginger's personal rules (short and blunt, mockup first, bug report first) apply too; not repeated here.

A failed Check opens an issue called "Check failed". Only look when Ginger says, or one open issue by that name exists. Fix it, then close it.

@STATUS.md

## Map
- Site: `site/` (Home = setup, GitHub, Settings), one stylesheet `site/home.css`.
- Helper: `functions/api/` (Cloudflare Pages Functions, KV `SUBS`): turn-on, turn-off, run (daily, called by `.github/workflows/events.yml`).
- Live: roblox-game-events.pages.dev. Pushing to `main` goes live straight away; a red cross on Check = something broke.

## Every change to the site
1. `git pull`. grep the exact spot, read only those lines. All edits in one script.
2. Add `--quiet` to release.py when nothing visible changes (no Updated banner). Run `python3 tools/release.py --title ... --tag New|Changed --meaning ... --see ... --change ...` once. It does version, CHANGELOG, patch note, STATUS and tests. Never by hand.
3. Commit, push. Don't wait for tests.

## Rules
- No inline styles or scripts (blocked by security rules).
- Look matches Fishing Cat Data: one card, tabs, coloured side bars. No emojis. Check light, dark, big text.
- Casual words, short buttons, no jargon on screen.
- Never ask for keys or webhooks in chat. Nothing is saved on the page.
- One script, one check, one push per request. Change only what's asked.

## Saving tokens
- Don't print whole files or long logs; grep, then read only those lines.
- Don't re-read or re-test your own work. No sub-agents for small jobs.
- Rules/docs-only edits: skip release.py, just commit and push.
- Wording or colour jobs: a cheaper model is fine; say so.
- Long chat? Say start a new one.
