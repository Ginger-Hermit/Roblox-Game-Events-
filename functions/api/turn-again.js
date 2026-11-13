import { HOOK, json, keyFor, events, post, card, icon, POSTS_A_DAY, body } from "./_lib.js";
export async function onRequestPost({ request, env }) {
  if (!env.SUBS) return json({ msg: "Not set up yet." }, 503);
  const { game, name, hook } = await body(request);
  if (!game || !HOOK.test(hook || "")) return json({ msg: "Add the game link and webhook you turned on." }, 400);
  const key = keyFor(hook, game), s = JSON.parse(await env.SUBS.get(key) || "null");
  if (!s) return json({ msg: "Turn it on first." }, 404);
  if (s.again && Date.now() - Date.parse(s.again) < 600000) return json({ msg: "Wait 10 minutes before posting again." }, 429);
  s.again = new Date().toISOString(); await env.SUBS.put(key, JSON.stringify(s));
  const now = Date.now(), live = (await events(s.uni)).filter(e => !(e.eventTime?.endUtc && Date.parse(e.eventTime.endUtc) < now)).slice(0, POSTS_A_DAY);
  if (!live.length) return json({ msg: "No events running right now." });
  const logo = await icon(s.uni);
  for (const e of live) await post(hook, await card(e, { game, name: s.name || name }, logo));
  return json({ msg: "Posted " + live.length + " event" + (live.length > 1 ? "s" : "") + ". Check your channel." });
}
