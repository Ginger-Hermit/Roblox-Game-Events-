// Daily check, called by .github/workflows/events.yml in parts: POST /api/run?cursor=... until done is true.
import { PER_RUN, POSTS_A_DAY, json, universe, events, post, card, icon, lock, unlock } from "./_lib.js";
export async function onRequestPost({ request, env }) {
  if (!env.SUBS) return json({ msg: "Not set up" }, 503);
  if (env.RUN_KEY && request.headers.get("X-Run-Key") !== env.RUN_KEY) return json({ msg: "Not allowed" }, 403);
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
      const hook = await unlock(s.hook, env); s.hook = await lock(hook, env);
      const now = Date.now(); let n = 0, logo;
      for (const e of await events(s.uni)) {
        const id = String(e.id); if (s.seen.includes(id)) continue;
        s.seen.push(id);
        const t = e.eventTime || {};
        if ((t.endUtc && Date.parse(t.endUtc) < now) || n >= POSTS_A_DAY) continue;
        if (logo === undefined) logo = await icon(s.uni);
        const c = await card(e, s, logo);
        const r = await post(hook, c);
        if (r.status === 404 || r.status === 401) { await env.SUBS.delete(k.name); removed++; s.gone = true; break; }
        n++; posted++; s.last = new Date().toISOString();
      }
      // Auto-delete: nothing posted for 30 days (counts from turn on / post again).
      const quiet = Math.max(...[s.last, s.on, s.again].map(d => Date.parse(d || 0) || 0));
      if (!s.gone && now - quiet > 30 * 864e5) { await env.SUBS.delete(k.name); removed++; s.gone = true; }
      if (!s.gone) { s.seen = s.seen.slice(-200); await env.SUBS.put(k.name, JSON.stringify(s)); }
    } catch (e) { /* skip this one today */ }
  }
  return json({ done: page.list_complete, cursor: page.list_complete ? null : page.cursor, checked: page.keys.length, posted, removed });
}
