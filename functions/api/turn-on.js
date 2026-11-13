import { HOOK, MAX_SUBS, MAX_PER_HOOK, json, keyFor, get, universe, events, post, card, icon, POSTS_A_DAY, body, lock } from "./_lib.js";
export async function onRequestPost({ request, env }) {
  if (!env.SUBS || !env.HOOK_KEY) return json({ msg: "Not set up yet. Try again later." }, 503);
  const { game, name, hook } = await body(request);
  if (!game || !HOOK.test(hook || "")) return json({ msg: "Add a game link and a webhook first." }, 400);
  try { await get(hook); } catch (e) { return json({ msg: "That webhook doesn't work. Make a new one and try again." }, 400); }
  const id = HOOK.exec(hook)[1], key = keyFor(hook, game);
  const mine = await env.SUBS.list({ prefix: "sub:" + id + ":" });
  const all = await env.SUBS.list({ prefix: "sub:" });
  if (mine.keys.some(k => k.name === key)) return json({ msg: "Already on for this channel." });
  {
    if (mine.keys.length >= MAX_PER_HOOK) return json({ msg: `One channel can follow up to ${MAX_PER_HOOK} games.` }, 400);
    if (all.keys.length >= MAX_SUBS || !all.list_complete) return json({ msg: "It's full right now. Try again later." }, 503);
  }
  let uni, seen, list;
  try { uni = await universe(game); list = await events(uni); seen = list.map(e => String(e.id)); }
  catch (e) { return json({ msg: "Couldn't find that game on Roblox." }, 400); }
  await env.SUBS.put(key, JSON.stringify({ game, name, hook: await lock(hook, env), uni, seen, on: new Date().toISOString() }));
  await post(hook, { title: "Now following: " + name, url: `https://www.roblox.com/games/${game}`, color: 0xF28C28,
    author: { name: "Roblox Game Events" }, description: "New events will post here once a day." });
  const now = Date.now(), live = list.filter(e => !(e.eventTime?.endUtc && Date.parse(e.eventTime.endUtc) < now)).slice(0, POSTS_A_DAY);
  if (live.length) { const logo = await icon(uni); for (const e of live) await post(hook, await card(e, { game, name }, logo)); }
  return json({ msg: "On. New " + name + " events will post here once a day." });
}
