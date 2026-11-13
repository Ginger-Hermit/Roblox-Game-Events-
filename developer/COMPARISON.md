<div align="center">

# How Roblox Game Events compares

[![Live](https://img.shields.io/badge/live-roblox--game--events.pages.dev-2ea44f)](https://roblox-game-events.pages.dev)
![Researched](https://img.shields.io/badge/researched-13%20Nov%202026-lightgrey)

</div>

**Jump to:** [In plain words](#in-plain-words) · [Short answer](#short-answer) · [Side by side](#side-by-side) · [For the technical crowd](#for-the-technical-crowd) · [Security and safety](#security-and-safety) · [Each tool](#each-tool) · [Where we're weaker](#where-were-weaker) · [Ideas this suggests (not approved)](#ideas-this-suggests-not-approved)

Researched 13 Nov 2026 (three web searches). Facts about other tools come from their own pages or forum posts; anything we couldn't check says **Not recorded**.

## In plain words
> [!TIP]
> **What it does**
> - Puts a Roblox game's events in your Discord.
>
> **Others**
> - Most only work for games you made.
> - One bot, **Noti**, also works for any game.
>
> **Why pick ours**
> - Nothing to install.
> - Paste a link, tap one button. Works on a phone.
>
> **Why pick Noti**
> - Also posts game updates.
> - Can ping people.

## Short answer
> [!IMPORTANT]
> - Roblox Game Events is **not the only** tool for any game's events.
>   - **Noti** (noti.bot) says it does the same.
> - Every other tool found:
>   - only works for games or groups **you own**, or
>   - needs **code inside the game**.
> - Our edge over Noti:
>   - no bot to install
>   - no Discord permissions to grant
>   - two minutes on a phone, just a webhook

## Side by side
<details>
<summary><b>Roblox Game Events</b></summary>

| | |
|---|---|
| Any public game | ✓ |
| Posts game events | ✓ |
| Also posts game updates | ✗ |
| Pings a role | ✗ |
| No code | ✓ |
| No bot to add to your server | ✓ (webhook only) |
| No Roblox login | ✓ |
| Free | ✓ |

</details>

<details>
<summary><b>Noti</b></summary>

| | |
|---|---|
| Any public game | ✓ (says so) |
| Posts game events | ✓ |
| Also posts game updates | ✓ |
| Pings a role | ✓ |
| No code | ✓ |
| No bot to add to your server | ✗ |
| No Roblox login | Not recorded |
| Free | Says free; not checked |

</details>

<details>
<summary><b>Roblox webhooks</b></summary>

| | |
|---|---|
| Any public game | ✗ Own only |
| Posts game events | ✗ |
| Also posts game updates | ✗ |
| Pings a role | ✗ |
| No code | ✓ |
| No bot to add to your server | ✓ |
| No Roblox login | ✗ |
| Free | ✓ |

</details>

<details>
<summary><b>Series Webhooks</b></summary>

| | |
|---|---|
| Any public game | ✗ Own group |
| Posts game events | ✗ |
| Also posts game updates | ✗ |
| Pings a role | Not recorded |
| No code | ✓ |
| No bot to add to your server | ✗ |
| No Roblox login | ✗ |
| Free | Not recorded |

</details>

<details>
<summary><b>DiscoLink</b></summary>

| | |
|---|---|
| Any public game | ✗ Own only |
| Posts game events | Not recorded |
| Also posts game updates | ✗ |
| Pings a role | Not recorded |
| No code | ✗ |
| No bot to add to your server | ✓ |
| No Roblox login | ✗ |
| Free | Not recorded |

</details>

<details>
<summary><b>Quark</b></summary>

| | |
|---|---|
| Any public game | ✗ Own only |
| Posts game events | Not recorded |
| Also posts game updates | Not recorded |
| Pings a role | Not recorded |
| No code | ✓ |
| No bot to add to your server | ✗ |
| No Roblox login | ✗ |
| Free | Not recorded |

</details>

<sub>[Back to top](#how-roblox-game-events-compares)</sub>

## For the technical crowd
How Roblox Game Events works (from the code in this repo):

- **Hosting:** Static site in `site/`, serverless endpoints in `functions/api/` (`turn-on`, `turn-off`, `run`).
- **Storage:** A key-value store (binding `SUBS`). One record per follow: game, webhook, posted event IDs.
- **Webhook at rest:** encrypted with AES-GCM; key is SHA-256 of the `HOOK_KEY` secret. Never stored in plain text when the secret is set.
- **Schedule:** GitHub Actions (`.github/workflows/events.yml`) calls `/api/run` daily at 17:07 UTC (plus a weekly run Mondays 06:23 UTC), paging through follows with a `cursor`. Protected by an `X-Run-Key` header (`RUN_KEY` secret).
- **Data source:** Roblox's public, unauthenticated web APIs:
  - `apis.roblox.com/universes/v1/places/{placeId}/universe` (game link → universe)
  - `apis.roblox.com/virtual-events/v1/universes/{universeId}/virtual-events` (event list)
  - `apis.roblox.com/virtual-events/v1/virtual-events/{id}/rsvps/counters` (RSVP counts)
  - `thumbnails.roblox.com` (event pictures, game icon)
- **No Roblox account, no API key, no Open Cloud.** That's why it works for any public game, and also why it can break: these endpoints are undocumented and can change without notice.
- **De-duplication:** each event ID posts once; at most 3 posts a day per follow; 5 games per channel.
- **Discord side:** plain incoming webhook (`POST` JSON with embeds). No bot user, no OAuth, no gateway connection, no server permissions.

### Technical difference from the others
<details>
<summary><b>Ours</b></summary>

| | |
|---|---|
| Runs where | Serverless helper + GitHub cron |
| Discord link | Incoming webhook |
| Roblox access | Public web APIs |
| Needs game ownership | No |
| Check speed | Once a day |

</details>

<details>
<summary><b>Noti</b></summary>

| | |
|---|---|
| Runs where | Hosted bot |
| Discord link | Bot account |
| Roblox access | Not recorded |
| Needs game ownership | No |
| Check speed | Not recorded |

</details>

<details>
<summary><b>Roblox webhooks</b></summary>

| | |
|---|---|
| Runs where | Roblox |
| Discord link | Incoming webhook |
| Roblox access | Open Cloud, owner only |
| Needs game ownership | Yes |
| Check speed | Push (instant) |

</details>

<details>
<summary><b>Bots (Quark, Series)</b></summary>

| | |
|---|---|
| Runs where | Hosted bot |
| Discord link | Bot account |
| Roblox access | Open Cloud / group API, owner |
| Needs game ownership | Yes |
| Check speed | Not recorded |

</details>

<details>
<summary><b>In-game scripts (DiscoLink)</b></summary>

| | |
|---|---|
| Runs where | Inside the game server (`HttpService`) |
| Discord link | Incoming webhook (often via proxy) |
| Roblox access | Game's own code |
| Needs game ownership | Yes |
| Check speed | Instant |

</details>

Trade-off: once-a-day polling is cheap and needs no permissions, but an event announced and started on the same day may post late.

<sub>[Back to top](#how-roblox-game-events-compares)</sub>

## Security and safety
> [!NOTE]
> **Plain words**
> - Ours can't touch your Roblox or Discord account.
> - Worst case: someone spams **one** channel if your webhook leaks.
>   - Fix in a minute: delete the webhook in Discord.

### What each tool can reach
<details>
<summary><b>Ours</b></summary>

| | |
|---|---|
| Asks for a login or password | ✗ Never |
| Access to your Discord server | Post in **one** channel only |
| Can read your messages or members | ✗ |
| Access to your Roblox account | ✗ None |
| Account ban risk | None (never logs in) |
| What's stored about you | Game + webhook (encrypted); deleted on Turn off |
| Open source / checkable | ✓ This repo |

</details>

<details>
<summary><b>Noti</b></summary>

| | |
|---|---|
| Asks for a login or password | Discord sign-in to add bot |
| Access to your Discord server | Bot permissions you grant (can be wide) |
| Can read your messages or members | Depends on permissions; not recorded |
| Access to your Roblox account | Not recorded |
| Account ban risk | Low (official bot API) |
| What's stored about you | Not recorded |
| Open source / checkable | Not recorded |

</details>

<details>
<summary><b>Roblox webhooks</b></summary>

| | |
|---|---|
| Asks for a login or password | Roblox login (your account) |
| Access to your Discord server | Post in one channel |
| Can read your messages or members | ✗ |
| Access to your Roblox account | Yes (it's your dashboard) |
| Account ban risk | None |
| What's stored about you | On Roblox |
| Open source / checkable | ✗ |

</details>

<details>
<summary><b>Bots (Quark, Series)</b></summary>

| | |
|---|---|
| Asks for a login or password | Discord sign-in, often Roblox link |
| Access to your Discord server | Bot permissions you grant |
| Can read your messages or members | Depends on permissions |
| Access to your Roblox account | Often an API key or group link |
| Account ban risk | Low |
| What's stored about you | Not recorded |
| Open source / checkable | Not recorded |

</details>

<details>
<summary><b>In-game scripts (DiscoLink)</b></summary>

| | |
|---|---|
| Asks for a login or password | Roblox Studio |
| Access to your Discord server | Post in one channel |
| Can read your messages or members | ✗ |
| Access to your Roblox account | Your game's code |
| Account ban risk | None if used as Roblox allows |
| What's stored about you | In your game |
| Open source / checkable | Varies |

</details>

### Why a webhook is safer than a bot
A webhook can only **post** to the one channel it was made for. A bot is a member of your server and can do whatever you allowed when you added it (read channels, manage roles, etc.). If a bot's company is hacked, every server it's in is exposed. If our helper leaked, the worst case is spam in followed channels.

### Ours in detail
- Webhook encrypted at rest (AES-GCM, key from the `HOOK_KEY` secret), never shown back on the page.
- The daily run endpoint needs a secret header (`X-Run-Key`); outsiders can't trigger posts.
- At most 3 posts a day per game; old events never repost, so a bug can't flood a channel.
- Test and Post go straight from the browser to Discord; no other site is contacted.
- No ads, no tracking, no accounts. The host keeps normal visit logs.
- Reads only Roblox's **public** event data; never logs in, so no Roblox or Discord rules about automated logins are broken.

### Risks we can't remove
> [!WARNING]
> - **Webhook leak** (low)
>   - Anyone with it can post in that channel.
>   - Fix: delete it in Discord, make a new one.
> - **Fake copies** of the site
>   - Could steal webhooks. Only use `roblox-game-events.pages.dev`.
> - **Roblox changes its public data**
>   - Posts stop or go wrong. Nothing else is affected.
> - **Free hosting**
>   - If free hosting limits change, posts stop.
> - **Trust in the operator**
>   - The helper holds your webhook.
>   - Code is public here, but you can't see what's actually running.

Full user-facing version: <https://roblox-game-events.pages.dev/safety.html>

<sub>[Back to top](#how-roblox-game-events-compares)</sub>

## Each tool
**Roblox Game Events** — <https://roblox-game-events.pages.dev>
Paste a game link and a Discord webhook, tap Turn on. Reads Roblox's public events list. Each event posts once, at most 3 a day; up to 5 games per channel. Saves the game and webhook on the helper so it can post. If Roblox changes its public list, posts stop.

**Noti** — <https://noti.bot/roblox>
A Discord bot. Follows any public experience; you choose updates, events or both per game, and it can ping a role when an event starts. Our closest competitor. Couldn't open its site from here, so limits, pricing and how often it checks are not recorded.

**Roblox webhooks** (official) — <https://create.roblox.com/docs/cloud/webhooks/webhook-notifications>
Set up in the Creator Dashboard. Only for experiences you own (group games: group owner only). Sends account alerts such as data-deletion requests, not events.

**Experience Event APIs** (official) — <https://devforum.roblox.com/t/introducing-the-new-experience-event-apis/3754058>
Lets a game's own developer show an in-game RSVP prompt for events. Works inside Roblox only; nothing goes to Discord.

**Series Webhooks** — <https://devforum.roblox.com/t/series-webhooks-discord-webhooks-for-roblox-groups-and-experiences-member-counter-audit-admin-chat/4207675>
No-code dashboard for groups you run: member count, audit log, admin commands, chat. No events.

**DiscoLink** — <https://devforum.roblox.com/t/discolink-%E2%80%93-roblox-to-discord-webhook-integration/4046271>
A script you put inside your own game to send messages to Discord. Needs code.

**Quark** — <https://discordbotlist.com/bots/quark-2187/upvote>
Discord bot for developers. Watches experiences you connect: server and player activity, problems. Event posts not recorded.

**One-game bots** (e.g. a Prospecting bot) — <https://github.com/farizrifqi/prospecting-discord-bot>
Built for a single game. This one copies another Discord server using a "selfbot", which breaks Discord's rules. Not a fair comparison.

<sub>[Back to top](#how-roblox-game-events-compares)</sub>

## Where we're weaker
> [!CAUTION]
> - **Missing features** (Noti has both)
>   - No game update posts
>   - No role ping
> - **Limits**
>   - 3 posts a day per game
>   - 5 games per channel
> - **Depends on Roblox**
>   - Public events list must stay the same

<sub>[Back to top](#how-roblox-game-events-compares)</sub>

## Ideas this suggests (not approved)
- Optional role ping.
- Optional "game updated" post.

<sub>[Back to top](#how-roblox-game-events-compares)</sub>
