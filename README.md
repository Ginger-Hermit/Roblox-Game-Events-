<div align="center">

# Roblox Game Events

**Any Roblox game's events, posted to your Discord.**

[![Live](https://img.shields.io/badge/live-roblox--game--events.pages.dev-2ea44f)](https://roblox-game-events.pages.dev)
![Free](https://img.shields.io/badge/price-free-blue)
![No login](https://img.shields.io/badge/login-none-purple)
![Works on phone](https://img.shields.io/badge/phone-yes-orange)

[**Open the site**](https://roblox-game-events.pages.dev) · [Stay safe](https://roblox-game-events.pages.dev/safety.html) · [How it compares](developer/COMPARISON.md)

<img src="images/home.png" alt="The Roblox Game Events home page" width="300">

</div>

## Set up
> [!TIP]
> **2 minutes, works on a phone**
> 1. In Discord: channel settings → **Integrations** → **Webhooks** → **New Webhook** → **Copy Webhook URL**.
> 2. Open [roblox-game-events.pages.dev](https://roblox-game-events.pages.dev).
> 3. Paste the game link and the webhook.
> 4. Tap **Turn on**. It posts "Now following" plus the events running now.

## Buttons
| Button | What it does |
|---|---|
| **Turn on** | Follows the game. New events post once a day. |
| **Turn off** | Stops posts and deletes the game and webhook from the helper. |
| **Post again** | Reposts the current events (once every 10 minutes). |

## How it works
```mermaid
flowchart LR
  A[Game link + webhook] --> B[Helper saves it]
  B --> C[Daily check of Roblox's public events]
  C --> D{New event?}
  D -- yes --> E[Post to your Discord]
  D -- no --> F[Nothing posted]
```

## Good to know
> [!NOTE]
> - **No spam:** each event posts once, at most 3 a day.
> - **Limit:** one channel can follow up to 5 games.
> - **Depends on Roblox:** uses its public events list. If Roblox changes it, posts stop.

> [!WARNING]
> - **Keep your webhook secret.** Anyone with it can post in your channel.
> - **Turn on saves your game and webhook** on the helper so it can post. [Read the risks](https://roblox-game-events.pages.dev/safety.html#risk).
