// Daily check, called by .github/workflows/events.yml in parts: POST /api/run?cursor=... until done is true.
import { PER_RUN, POSTS_A_DAY, json, universe, events, post, picture } from "./_lib.js";
const when = s => s ? new Date(s).toUTCString().replace(":00 GMT", " UTC") : "not recorded";
export async function onRequestPost({ request, env }) {
  if (!env.SUBS) return json({ msg: "Not set up" }, 503);
  const cursor = new URL(request.url).searchParams.get("cursor") || undefined;
  if (!cursor) {   // a new round may start at most every 6 hours
    const last = Number(await env.SUBS.get("lastrun") || 0);
    if (Date.now() - last < 6 * 3600e3) return json({ done: true, msg: "Ran recently" });
    await env.SUBS.put("lastrun", String(Date.now()));
  }
  const page = await env.SUBS.list({ prefix: "sub:", limit: PER_RUN, cursor });
  let posted = 0, removed = 0;
  for (const k of page.keys) {
    const s = JSON.parse(await env.SUBS.get(k.name) || "null"); if (!s) continue;
    try {
      s.uni = s.uni || await universe(s.game);
      const now = Date.now(); let n = 0;
      for (const e of await events(s.uni)) {
        const id = String(e.id); if (s.seen.includes(id)) continue;
        s.seen.push(id);
        const t = e.eventTime || {};
        if ((t.endUtc && Date.parse(t.endUtc) < now) || n >= POSTS_A_DAY) continue;
        const card = { title: e.displayTitle || e.title || "New event", description: (e.displayDescription || "").slice(0, 500),
          url: "https://www.roblox.com/events/" + id, color: 0xF28C28, author: { name: "New " + s.name + " event" },
          fields: [{ name: "Starts", value: when(t.startUtc), inline: true }, { name: "Ends", value: when(t.endUtc), inline: true }] };
        const pic = await picture(e); if (pic) card.image = { url: pic };
        const r = await post(s.hook, card);
        if (r.status === 404 || r.status === 401) { await env.SUBS.delete(k.name); removed++; s.gone = true; break; }
        n++; posted++;
      }
      if (!s.gone) { s.seen = s.seen.slice(-200); await env.SUBS.put(k.name, JSON.stringify(s)); }
    } catch (e) { /* skip this one today */ }
  }
  return json({ done: page.list_complete, cursor: page.list_complete ? null : page.cursor, checked: page.keys.length, posted, removed });
}
