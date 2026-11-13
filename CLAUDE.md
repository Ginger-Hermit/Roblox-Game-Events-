# Rules for Claude: Roblox Game Events

> [!IMPORTANT]
> Read this and the status at the start of every chat. Never ask Ginger for a handoff.
Also at the start: check the latest GitHub Actions results on `main` (Check, Live site). Mention a problem in one line; say nothing if all is fine.

@STATUS.md

Site: `site/` (Home = setup, GitHub, Settings). Helper: `functions/api/` (Cloudflare Pages Functions, KV binding `SUBS`): turn-on, turn-off, run (daily, called by events.yml). Bot: `events/check.py`, run daily by `.github/workflows/events.yml`. Live: roblox-game-events.pages.dev.
> [!WARNING]
> Pushing to `main` goes live straight away (Cloudflare publishes `main`). Check still runs: red cross = something broke.

## Every change to the site
1. `git pull` first. grep the exact spot, read only those lines. All edits in one script.
2. Run `python3 tools/release.py --title ... --tag New|Changed --meaning ... --see ... --change ...` once. It does the version, CHANGELOG, patch note, STATUS and runs the tests. Never by hand.
3. Commit, push. Don't wait for tests: Ginger sees a red cross.

## Rules
- Pages use one stylesheet (`site/home.css`), no inline styles or scripts (blocked by the security rules).
- Look matches Fishing Cat Data: one card, tabs, coloured side bars. No emojis. Check light, dark and big text.
- Casual words, short buttons, no jargon on screen.
- Never ask for keys or webhooks in chat. Nothing is saved on the page.
- One script, one check, one push per request. Change only what's asked.

## Working with Ginger
Short and blunt. Answer first. Big new feature: mockup first. "Ugly" = redo the look. Long chat? Say start a new one.
