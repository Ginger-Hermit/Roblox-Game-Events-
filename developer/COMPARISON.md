# How Roblox Game Events compares

Researched 13 Nov 2026 (three web searches). Facts about other tools come from their own pages or forum posts; anything we couldn't check says **Not recorded**.

## In plain words
- **What it does:** puts a Roblox game's events in your Discord.
- **Others:** most only work for games you made. One bot, Noti, also works for any game.
- **Why pick ours:** nothing to install. Paste a link, tap one button, done. Works on a phone.
- **Why pick Noti:** it also posts game updates and can ping people.

## Short answer
Roblox Game Events is **not the only tool** that posts any game's events to Discord. **Noti** (noti.bot) says it does the same. Every other tool found only works for games or groups **you own**, or needs **code inside the game**.

What makes ours different from Noti: no bot to install, no Discord permissions to grant, and it works from a phone in two minutes with just a webhook.

## Side by side
| | Roblox Game Events | Noti | Roblox webhooks | Series Webhooks | DiscoLink | Quark |
|---|---|---|---|---|---|---|
| Any public game | ✓ | ✓ (says so) | ✗ Own only | ✗ Own group | ✗ Own only | ✗ Own only |
| Posts game events | ✓ | ✓ | ✗ | ✗ | Not recorded | Not recorded |
| Also posts game updates | ✗ | ✓ | ✗ | ✗ | ✗ | Not recorded |
| Pings a role | ✗ | ✓ | ✗ | Not recorded | Not recorded | Not recorded |
| No code | ✓ | ✓ | ✓ | ✓ | ✗ | ✓ |
| No bot to add to your server | ✓ (webhook only) | ✗ | ✓ | ✗ | ✓ | ✗ |
| No Roblox login | ✓ | Not recorded | ✗ | ✗ | ✗ | ✗ |
| Free | ✓ | Says free; not checked | ✓ | Not recorded | Not recorded | Not recorded |

## For the technical crowd
How Roblox Game Events works (from the code in this repo):

- **Hosting:** Cloudflare Pages. Static site in `site/`, serverless endpoints in `functions/api/` (`turn-on`, `turn-off`, `turn-again`, `run`).
- **Storage:** Cloudflare KV (binding `SUBS`). One record per follow: game, webhook, posted event IDs.
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
| | Ours | Noti | Roblox webhooks | Bots (Quark, Series) | In-game scripts (DiscoLink) |
|---|---|---|---|---|---|
| Runs where | Cloudflare edge + GitHub cron | Hosted bot | Roblox | Hosted bot | Inside the game server (`HttpService`) |
| Discord link | Incoming webhook | Bot account | Incoming webhook | Bot account | Incoming webhook (often via proxy) |
| Roblox access | Public web APIs | Not recorded | Open Cloud, owner only | Open Cloud / group API, owner | Game's own code |
| Needs game ownership | No | No | Yes | Yes | Yes |
| Check speed | Once a day | Not recorded | Push (instant) | Not recorded | Instant |

Trade-off: once-a-day polling is cheap and needs no permissions, but an event announced and started on the same day may post late.

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

## Where we're weaker
- No game update posts, no role ping (Noti has both).
- 3 posts a day, 5 games per channel.
- Depends on Roblox's public events list staying the same.

## Ideas this suggests (not approved)
- Optional role ping.
- Optional "game updated" post.
