import { HOOK, json, universe, events, post, card, icon, POSTS_A_DAY, body } from "./_lib.js";
// Post again: re-sends the game's current events to this channel. Saves nothing.
export async function onRequestPost({ request, env }) {
  if (!env.SUBS) return json({ msg: "Not set up yet. Try again later." }, 503);
  const { game, name, hook } = await body(request);
  if (!game || !HOOK.test(hook || "")) return json({ msg: "Add a game link and a webhook first." }, 400);
  if (!Number.isSafeInteger(game) || game < 1) return json({ msg: "That game link doesn't look right." }, 400);
  const ip = "again:" + (request.headers.get("CF-Connecting-IP") || "x"), tries = Number(await env.SUBS.get(ip) || 0);
  if (tries >= 5) return json({ msg: "Too many tries today. Try again tomorrow." }, 429);
  await env.SUBS.put(ip, String(tries + 1), { expirationTtl: 86400 });
  let uni, list;
  try { uni = await universe(game); list = await events(uni); }
  catch (e) { return json({ msg: "Couldn't find that game on Roblox." }, 400); }
  const now = Date.now(), live = list.filter(e => !(e.eventTime?.endUtc && Date.parse(e.eventTime.endUtc) < now)).slice(0, POSTS_A_DAY);
  if (!live.length) return json({ msg: "No events on right now." });
  const logo = await icon(uni);
  for (const e of live) { const r = await post(hook, await card(e, { game, name, uni }, logo));
    if (!r.ok) return json({ msg: "Discord said no (" + r.status + "). Make a new webhook and try again." }, 400); }
  return json({ msg: "Posted " + live.length + " event" + (live.length > 1 ? "s" : "") + " again." });
}
