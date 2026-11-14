<div align="center">

# Update history

**Newest first. Each update says what it does and what to look for.**

[![Live](https://img.shields.io/badge/live-roblox--game--events.pages.dev-2ea44f)](https://roblox-game-events.pages.dev)
![Tags](https://img.shields.io/badge/tags-New%20%C2%B7%20Changed-blue)

</div>

## Help link to guide

14 Nov 2026 (01:21 UTC) · ![Changed](https://img.shields.io/badge/-Changed-blue)

Need help opens the setup guide

> [!NOTE]
> **What you'll see:** Home page

- Help link goes to the guide

## Clearer risks

14 Nov 2026 (01:19 UTC) · ![Changed](https://img.shields.io/badge/-Changed-blue) · [code](https://github.com/Ginger-Hermit/Roblox-Game-Events-/commit/9061ba7)

Shorter risks plus links to the rules

> [!NOTE]
> **What you'll see:** Risks page

- Simpler risks, links to Roblox and Discord terms

## Clearer buttons

14 Nov 2026 (01:07 UTC) · ![Changed](https://img.shields.io/badge/-Changed-blue) · [code](https://github.com/Ginger-Hermit/Roblox-Game-Events-/commit/ff1cb35)

Send a test and Stop

> [!NOTE]
> **What you'll see:** Home page

- Clearer button names

## Simpler home page

14 Nov 2026 (01:03 UTC) · ![Changed](https://img.shields.io/badge/-Changed-blue) · [code](https://github.com/Ginger-Hermit/Roblox-Game-Events-/commit/49a6577)

Fewer boxes, plain steps and one Start button

> [!NOTE]
> **What you'll see:** Home page

- Cleaner, easier setup for new people

## No Updated banner

14 Nov 2026 (00:54 UTC) · ![Changed](https://img.shields.io/badge/-Changed-blue) · [code](https://github.com/Ginger-Hermit/Roblox-Game-Events-/commit/3545c7d)

The Updated banner is gone

> [!NOTE]
> **What you'll see:** Nothing, it no longer shows

- Removed the Updated banner (New version ready stays)

## New heading

14 Nov 2026 (00:53 UTC) · ![Changed](https://img.shields.io/badge/-Changed-blue) · [code](https://github.com/Ginger-Hermit/Roblox-Game-Events-/commit/f71e9f3)

Clearer heading on Home

> [!NOTE]
> **What you'll see:** Top of Home

- Heading now says Event alerts (Discord webhooks)

## TDLR box

14 Nov 2026 (00:52 UTC) · ![New](https://img.shields.io/badge/-New-2ea44f) · [code](https://github.com/Ginger-Hermit/Roblox-Game-Events-/commit/a883791)

A short TDLR box at the top

> [!TIP]
> **What you'll see:** Top of Home, under the title

- Replaced the intro line with a TDLR box

## Quiet updates

14 Nov 2026 (00:48 UTC) · ![Changed](https://img.shields.io/badge/-Changed-blue) · [code](https://github.com/Ginger-Hermit/Roblox-Game-Events-/commit/946de87)

Small fixes no longer show an Updated banner

> [!NOTE]
> **What you'll see:** Nothing, the banner only shows for real changes

- Added a quiet option for invisible changes

## Safer key check

14 Nov 2026 (00:09 UTC) · ![Changed](https://img.shields.io/badge/-Changed-blue) · [code](https://github.com/Ginger-Hermit/Roblox-Game-Events-/commit/d16b382)

Tighter security

> [!NOTE]
> **What you'll see:** Nothing changes on the page

- Safer daily-run key check and tighter job permissions

## Tidy up

13 Nov 2026 (11:58 UTC) · ![Changed](https://img.shields.io/badge/-Changed-blue) · [code](https://github.com/Ginger-Hermit/Roblox-Game-Events-/commit/8a36904)

Removed unused code

> [!NOTE]
> **What you'll see:** Nothing changes on the page

- Removed an unused helper and unused styles

## Spam limit

13 Nov 2026 (10:16 UTC) · ![Changed](https://img.shields.io/badge/-Changed-blue) · [code](https://github.com/Ginger-Hermit/Roblox-Game-Events-/commit/2dd2cac)

Max 5 Turn ons per visitor a day, and odd game numbers are refused.

> [!NOTE]
> **What you'll see:** Only shows after 5 tries in a day.

- functions/api/turn-on.js: per-visitor limit, game number check

## Safety fixes

13 Nov 2026 (10:12 UTC) · ![Changed](https://img.shields.io/badge/-Changed-blue) · [code](https://github.com/Ginger-Hermit/Roblox-Game-Events-/commit/63eab5f)

Older follows aren't wrongly deleted; the daily run needs its key.

> [!NOTE]
> **What you'll see:** Nothing changes on the page.

- functions/api/run.js: grandfather 30-day clock, require RUN_KEY

## Webhooks always encrypted

13 Nov 2026 (10:11 UTC) · ![Changed](https://img.shields.io/badge/-Changed-blue) · [code](https://github.com/Ginger-Hermit/Roblox-Game-Events-/commit/2999e4f)

Turn on is blocked if the encryption key is missing, so webhooks are never saved unencrypted.

> [!NOTE]
> **What you'll see:** Nothing changes while the key is set.

- functions/api/turn-on.js: require HOOK_KEY

## 30-day note

13 Nov 2026 (10:08 UTC) · ![Changed](https://img.shields.io/badge/-Changed-blue) · [code](https://github.com/Ginger-Hermit/Roblox-Game-Events-/commit/ae17c39)

The page says it turns off after 30 days with no posts.

> [!NOTE]
> **What you'll see:** Under the Turn on button.

- site/index.html: 30-day note

## Auto-delete quiet webhooks

13 Nov 2026 (10:08 UTC) · ![Changed](https://img.shields.io/badge/-Changed-blue) · [code](https://github.com/Ginger-Hermit/Roblox-Game-Events-/commit/3fba908)

A webhook with no posts for 30 days is deleted by itself.

> [!NOTE]
> **What you'll see:** Nothing changes on the page.

- functions/api/run.js: delete subs idle 30 days

## Safety page wording

13 Nov 2026 (08:53 UTC) · ![Changed](https://img.shields.io/badge/-Changed-blue) · [code](https://github.com/Ginger-Hermit/Roblox-Game-Events-/commit/98f51d1)

Safety page no longer names the host.

> [!NOTE]
> **What you'll see:** Stay safe

- Removed host name from safety page

## Safer Turn off

13 Nov 2026 (04:17 UTC) · ![Changed](https://img.shields.io/badge/-Changed-blue) · [code](https://github.com/Ginger-Hermit/Roblox-Game-Events-/commit/202d2f1)

Only the person with the full webhook can turn off or repost alerts.

> [!NOTE]
> **What you'll see:** Nothing looks different.

- Turn off and Post again now check the whole webhook.

## Old bot off

13 Nov 2026 (04:04 UTC) · ![Changed](https://img.shields.io/badge/-Changed-blue) · [code](https://github.com/Ginger-Hermit/Roblox-Game-Events-/commit/e554920)

Only the website posts now, so no double posts

> [!NOTE]
> **What you'll see:** Discord, one post per event

- Removed the old GitHub bot that also posted Gym League

## Guide updated

13 Nov 2026 (03:52 UTC) · ![Changed](https://img.shields.io/badge/-Changed-blue) · [code](https://github.com/Ginger-Hermit/Roblox-Game-Events-/commit/fea3558)

The GitHub guide now matches the website setup

> [!NOTE]
> **What you'll see:** GitHub tab, The guide

- README rewritten for Turn on, Turn off and Post again

## What's new line

13 Nov 2026 (03:50 UTC) · ![New](https://img.shields.io/badge/-New-2ea44f) · [code](https://github.com/Ginger-Hermit/Roblox-Game-Events-/commit/ad048f8)

After an update, the top of the page says what changed

> [!TIP]
> **What you'll see:** Top of Home after an update

- Shows a one-line What's new after the page updates

## Post again button

13 Nov 2026 (03:48 UTC) · ![New](https://img.shields.io/badge/-New-2ea44f) · [code](https://github.com/Ginger-Hermit/Roblox-Game-Events-/commit/fae7000)

Repost the game's current events any time

> [!TIP]
> **What you'll see:** Step 4, Post again

- New Post again button reposts up to 3 current events (once per 10 minutes)

## Current events on turn on

13 Nov 2026 (03:48 UTC) · ![Changed](https://img.shields.io/badge/-Changed-blue) · [code](https://github.com/Ginger-Hermit/Roblox-Game-Events-/commit/c022467)

Turn on now posts the game's current events too

> [!NOTE]
> **What you'll see:** Turn on a game with an event running

- Turn on posts up to 3 current events with full stats

## Locked daily run

13 Nov 2026 (03:38 UTC) · ![Changed](https://img.shields.io/badge/-Changed-blue) · [code](https://github.com/Ginger-Hermit/Roblox-Game-Events-/commit/e53013a)

Only GitHub can start the daily run

> [!NOTE]
> **What you'll see:** Nothing on screen

- Daily run needs the RUN_KEY secret

## No repeat posts

13 Nov 2026 (03:38 UTC) · ![Changed](https://img.shields.io/badge/-Changed-blue) · [code](https://github.com/Ginger-Hermit/Roblox-Game-Events-/commit/6920777)

Tapping Turn on again no longer reposts

> [!NOTE]
> **What you'll see:** Home, Turn on

- Turn on says Already on instead of posting again

## Scrambled webhooks

13 Nov 2026 (03:37 UTC) · ![Changed](https://img.shields.io/badge/-Changed-blue) · [code](https://github.com/Ginger-Hermit/Roblox-Game-Events-/commit/8d3db4e)

Webhooks are scrambled in storage

> [!NOTE]
> **What you'll see:** Nothing on screen

- Webhooks saved by Turn on are now scrambled once HOOK_KEY is set

## Discord-style preview

13 Nov 2026 (03:34 UTC) · ![Changed](https://img.shields.io/badge/-Changed-blue) · [code](https://github.com/Ginger-Hermit/Roblox-Game-Events-/commit/3c5073d)

Preview now looks like a real Discord post

> [!NOTE]
> **What you'll see:** Home, What it posts

- Restyled the preview to look like Discord

## Colour themes

13 Nov 2026 (03:34 UTC) · ![New](https://img.shields.io/badge/-New-2ea44f) · [code](https://github.com/Ginger-Hermit/Roblox-Game-Events-/commit/728e060)

Pick a colour for buttons and links

> [!TIP]
> **What you'll see:** Settings, Colour

- Added Navy, Purple, Teal, Forest, Sunset and Rose colours

## Up-to-date wording

13 Nov 2026 (03:33 UTC) · ![Changed](https://img.shields.io/badge/-Changed-blue) · [code](https://github.com/Ginger-Hermit/Roblox-Game-Events-/commit/0b27bda)

Removed old GitHub secret steps

> [!NOTE]
> **What you'll see:** Home step 3, Stay safe

- Updated old wording to match Turn on

## Risks link

13 Nov 2026 (03:33 UTC) · ![Changed](https://img.shields.io/badge/-Changed-blue) · [code](https://github.com/Ginger-Hermit/Roblox-Game-Events-/commit/63b3821)

Risks are linked right under Turn on

> [!NOTE]
> **What you'll see:** Home, under Turn on

- Added a Read the real risks link under Turn on

## Real risks

13 Nov 2026 (03:32 UTC) · ![New](https://img.shields.io/badge/-New-2ea44f) · [code](https://github.com/Ginger-Hermit/Roblox-Game-Events-/commit/726f3b6)

Plain list of the actual risks of using it

> [!TIP]
> **What you'll see:** Footer, Risks

- Added a Real risks section to the safety page

## Tidier posts

13 Nov 2026 (03:32 UTC) · ![Changed](https://img.shields.io/badge/-Changed-blue) · [code](https://github.com/Ginger-Hermit/Roblox-Game-Events-/commit/2cf7989)

Posts now list start, end, countdown, type, interested players and a Play link, with the game icon

> [!NOTE]
> **What you'll see:** Home, What it posts

- Bullet list in Discord posts, plus a preview on the page

## Full disclaimer back

13 Nov 2026 (03:22 UTC) · ![Changed](https://img.shields.io/badge/-Changed-blue) · [code](https://github.com/Ginger-Hermit/Roblox-Game-Events-/commit/9743c75)

Restored the full professional disclaimer.

> [!NOTE]
> **What you'll see:** Legal link at the bottom.

- Full disclaimer restored

## Shorter disclaimer

13 Nov 2026 (03:22 UTC) · ![Changed](https://img.shields.io/badge/-Changed-blue) · [code](https://github.com/Ginger-Hermit/Roblox-Game-Events-/commit/a83c605)

Disclaimer cut to short lines.

> [!NOTE]
> **What you'll see:** Legal link at the bottom.

- One short line per point

## Proper disclaimer

13 Nov 2026 (03:21 UTC) · ![Changed](https://img.shields.io/badge/-Changed-blue) · [code](https://github.com/Ginger-Hermit/Roblox-Game-Events-/commit/04bc15a)

The Legal section is now a proper disclaimer.

> [!NOTE]
> **What you'll see:** Legal link at the bottom of any page.

- As-is, own risk, no liability, not affiliated with Roblox or Discord

## Turn on button

13 Nov 2026 (03:21 UTC) · ![New](https://img.shields.io/badge/-New-2ea44f) · [code](https://github.com/Ginger-Hermit/Roblox-Game-Events-/commit/81fe5af)

Anyone can switch on daily event posts with one tap, no GitHub needed.

> [!TIP]
> **What you'll see:** Step 4 on Home: Turn on and Turn off.

- Turn on / Turn off buttons replace the GitHub steps
- Small Cloudflare helper does the daily check for everyone
- Privacy page explains what the helper keeps

## Saved channels

13 Nov 2026 (03:18 UTC) · ![New](https://img.shields.io/badge/-New-2ea44f) · [code](https://github.com/Ginger-Hermit/Roblox-Game-Events-/commit/b2113d6)

Webhooks are saved as their own list, so one channel can be used for many games.

> [!TIP]
> **What you'll see:** Your channels, under the Discord webhook box.

- Your channels: collapsible list of saved webhooks, tap to fill, x to forget
- Forget all clears channels too

## Remember your games

13 Nov 2026 (03:17 UTC) · ![New](https://img.shields.io/badge/-New-2ea44f) · [code](https://github.com/Ginger-Hermit/Roblox-Game-Events-/commit/96018cf)

Save games and webhooks on your phone and pick them from a list.

> [!TIP]
> **What you'll see:** Turn on Remember on Home; saved games show under Your games.

- Your games: collapsible list of saved cards, tap to fill, x to forget
- Remember on this phone switch, with an optional name
- Settings: Forget all; Privacy updated

## Post button

13 Nov 2026 (03:13 UTC) · ![New](https://img.shields.io/badge/-New-2ea44f) · [code](https://github.com/Ginger-Hermit/Roblox-Game-Events-/commit/53492f3)

Post a card for your game to Discord straight from the page.

> [!TIP]
> **What you'll see:** Post button next to Test on Home.

- Post button sends 'Now following' with the game name and link
- Daily event posts now show the event's picture

## Stay safe, Privacy and Legal

13 Nov 2026 (02:36 UTC) · ![New](https://img.shields.io/badge/-New-2ea44f) · [code](https://github.com/Ginger-Hermit/Roblox-Game-Events-/commit/93f0732)

Safety, privacy and legal info, like Fishing Cat Data.

> [!TIP]
> **What you'll see:** Links at the bottom of every page.

- Stay safe, Privacy and Legal page
- Footer links on every page
- Site goes live straight from main again

## First numbered version

13 Nov 2026 (16:00 UTC) · ![New](https://img.shields.io/badge/-New-2ea44f) · [code](https://github.com/Ginger-Hermit/Roblox-Game-Events-/commit/1731e37)

The site now has a version number, and tells you when a newer one is ready.

> [!TIP]
> **What you'll see:** a "New version ready. Refresh now" bar at the top after an update.

- Version number and update banner
- Goes live only after the tests pass
- Security headers and a weekly live-site check
- Guide copied to the GitHub wiki automatically

## Home, tabs and settings

13 Nov 2026 (15:00 UTC) · ![New](https://img.shields.io/badge/-New-2ea44f)

A new look matching Fishing Cat Data, with setup on the home page.

> [!TIP]
> **What you'll see:** Home, GitHub and Settings tabs; enter a game and a webhook on Home.

- Setup on Home: game link, Discord webhook with Test, how it auto posts
- Webhook how-to for new people
- Settings: theme, text size, Copy bug report
- GitHub tab with the guide, code and update history

## Discord posts link to the event

13 Nov 2026 (14:00 UTC) · ![Changed](https://img.shields.io/badge/-Changed-blue)

Tapping a Discord post opens that event's own Roblox page.

> [!NOTE]
> **What you'll see:** the post title links to roblox.com/events/...

- Post link goes to the event, not the game page

## First release

13 Nov 2026 (12:00 UTC) · ![New](https://img.shields.io/badge/-New-2ea44f)

The bot checks a Roblox game once a day and posts new events to Discord.

> [!TIP]
> **What you'll see:** up to 3 posts a day; old events never repost.

- Daily check and Discord posts
