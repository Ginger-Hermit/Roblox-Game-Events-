"""Posts new Roblox game events to Discord. Run daily by .github/workflows/events.yml.
Reads events/settings.json, remembers posted events in events/seen.json.
First run only records existing events, so old ones never post."""
import json, os, re, sys, urllib.request
from datetime import datetime, timezone

HERE = os.path.dirname(os.path.abspath(__file__))
UA = {"User-Agent": "game-events-bot/1.0", "Content-Type": "application/json"}

def get(url):
    with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=30) as r:
        return json.load(r)

def picture(e):
    """The event's own picture from Roblox, or None if there isn't one."""
    ids = [t.get("mediaId") for t in sorted(e.get("thumbnails") or [], key=lambda t: t.get("rank", 0)) if t.get("mediaId")]
    if not ids: return None
    try:
        d = get(f"https://thumbnails.roblox.com/v1/assets?assetIds={ids[0]}&returnPolicy=PlaceHolder&size=768x432&format=Png").get("data") or []
        return d[0].get("imageUrl") if d and d[0].get("state") == "Completed" else None
    except Exception:
        return None

def icon(uni):
    try: return get(f"https://thumbnails.roblox.com/v1/games/icons?universeIds={uni}&size=150x150&format=Png")["data"][0]["imageUrl"]
    except Exception: return None

def interested(eid):
    try: return get(f"https://apis.roblox.com/virtual-events/v1/virtual-events/{eid}/rsvps/counters")["counters"]["going"]
    except Exception: return None

def ts(s, f):
    return f"<t:{int(datetime.fromisoformat(s).timestamp())}:{f}>" if s else "not recorded"

def details(e, game, going, now):
    """Event text, then a tidy bullet list."""
    t = e.get("eventTime") or {}
    cats = [c.get("category") for c in e.get("eventCategories") or [] if c.get("category")]
    lines = [f"- **Starts:** {ts(t.get('startUtc'), 'f')}", f"- **Ends:** {ts(t.get('endUtc'), 'f')}"]
    if t.get("startUtc") and datetime.fromisoformat(t["startUtc"]) > now: lines.append(f"- **Starts in:** {ts(t['startUtc'], 'R')}")
    if cats: lines.append("- **Type:** " + ", ".join(re.sub(r"(?<!^)([A-Z])", r" \1", c).capitalize() for c in cats))
    if going is not None: lines.append(f"- **Interested:** {going:,} players")
    lines.append(f"- [Play now](https://www.roblox.com/games/{game})")
    text = (e.get("displayDescription") or "")[:400]
    return (text + "\n\n" if text else "") + "\n".join(lines)

def when(s):
    return datetime.fromisoformat(s).strftime("%a %d %b, %H:%M UTC") if s else "not recorded"

def main():
    cfg = json.load(open(os.path.join(HERE, "settings.json")))
    seen_path = os.path.join(HERE, "seen.json")
    seen = json.load(open(seen_path))
    first_run = not seen
    uni = get(f"https://apis.roblox.com/universes/v1/places/{cfg['game']}/universe")["universeId"]
    events = get(f"https://apis.roblox.com/virtual-events/v1/universes/{uni}/virtual-events?limit=25").get("data", [])
    now = datetime.now(timezone.utc)
    site = os.path.join(HERE, "..", "site", "events.json")
    rows = [{"id": str(e.get("id")), "title": e.get("displayTitle") or e.get("title") or "Event",
             "start": (e.get("eventTime") or {}).get("startUtc"), "end": (e.get("eventTime") or {}).get("endUtc")} for e in events]
    json.dump({"game": cfg["game"], "game_name": cfg["game_name"], "events": rows}, open(site, "w"), indent=1)
    hook = os.environ.get("DISCORD_WEBHOOK", "")
    if not first_run and not hook.startswith("https://discord.com/api/webhooks/"):
        sys.exit("No Discord link saved. Add the DISCORD_WEBHOOK secret.")
    posted = 0
    logo = icon(uni) if not first_run else None
    for e in events:
        eid = str(e.get("id"))
        if eid in seen:
            continue
        seen.append(eid)
        end = (e.get("eventTime") or {}).get("endUtc")
        if first_run or (end and datetime.fromisoformat(end) < now) or posted >= cfg["max_posts_a_day"]:
            continue
        card = {"title": e.get("displayTitle") or e.get("title") or "New event",
                "description": details(e, cfg["game"], interested(eid), now),
                "color": int(cfg["colour"].lstrip("#"), 16),
                "url": f"https://www.roblox.com/events/{eid}",
                "author": {"name": f"New {cfg['game_name']} event"}}
        if logo: card["thumbnail"] = {"url": logo}
        pic = picture(e)
        if pic: card["image"] = {"url": pic}
        body = json.dumps({"embeds": [card], "allowed_mentions": {"parse": []}}).encode()
        urllib.request.urlopen(urllib.request.Request(hook, body, UA), timeout=30)
        posted += 1
        print("posted:", card["title"])
    json.dump(seen[-500:], open(seen_path, "w"))
    print("first run: saved", len(seen), "old events, posted none" if first_run else f"new posts: {posted}")

main()
