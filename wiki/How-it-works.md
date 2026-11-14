<div align="center">

# How it works

![Learn](https://img.shields.io/badge/section-Learn-blue)

</div>

1. **Start** saves the game and webhook on the helper (a small Cloudflare service). The webhook is stored locked (encrypted). Events the game already has are noted.
2. **Once a day** (17:07 UTC) a GitHub job asks the helper to check every followed game.
3. The helper reads the game's public event list from Roblox.
4. Any event it hasn't seen before, and that hasn't ended, gets posted. Max 3 a day per game.
5. If Discord says the webhook is gone, the helper deletes that game and webhook by itself.

```mermaid
flowchart TD
  A[Start: game + webhook] --> B[Helper saves it, webhook locked]
  B --> C[Daily check, 17:07 UTC]
  C --> D{New event, not ended?}
  D -- yes --> E[Post to Discord, max 3 a day]
  D -- no --> F[Nothing posted]
  E --> G{Webhook gone?}
  G -- yes --> H[Helper deletes it]
  I[Stop] --> H
```

No Roblox login is used. Only Roblox's public events list.

---

<div align="center">

[← The post](The-post) · [Home](Home) · [Limits →](Limits)

</div>
