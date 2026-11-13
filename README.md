# Roblox Game Events

Posts new events from any Roblox game to your Discord channel, once a day. Free, runs on GitHub. No Roblox login, no account needed.

## Set up (5 minutes, works on a phone browser)
**Easy way:** use the [setup helper](https://ginger-hermit.github.io/Roblox-Game-Events-/) for steps 2 and 3.

1. Tap **Use this template** → **Create a new repository**.
2. In your copy, open `events/settings.json`, tap the pencil, and change:
   - `game`: the number in the game's link (`roblox.com/games/`**`17450551531`**`/Gym-League`)
   - `game_name`: the game's name
   Then tap **Commit changes**.
3. In Discord: channel settings → **Integrations** → **Webhooks** → **New Webhook** → **Copy Webhook URL**.
4. In your copy on GitHub: **Settings** → **Secrets and variables** → **Actions** → **New repository secret**.
   Name: `DISCORD_WEBHOOK`. Secret: paste the link. Tap **Add secret**.
5. **Actions** tab → **Game events** → **Run workflow**. The first run only remembers existing events (no posts). After that, new events post daily at 17:07 UTC.

## Good to know
- No spam: each event posts once, at most 3 a day, upcoming only.
- Keep your Discord link secret. Anyone with it can post in your channel.
- Uses Roblox's public events list. If Roblox changes it, the robot stops (Actions shows a red cross).
- Settings: `colour` is the card's side colour, `max_posts_a_day` is the cap.
