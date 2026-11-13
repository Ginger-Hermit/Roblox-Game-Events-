import { HOOK, json, keyFor, body, owns } from "./_lib.js";
export async function onRequestPost({ request, env }) {
  if (!env.SUBS) return json({ msg: "Not set up yet." }, 503);
  const { game, hook } = await body(request);
  if (!game || !HOOK.test(hook || "")) return json({ msg: "Add the game link and webhook you turned on." }, 400);
  const key = keyFor(hook, game);
  const s = JSON.parse(await env.SUBS.get(key) || "null");
  if (!s || !(await owns(s, hook, env))) return json({ msg: "That game wasn't on for this webhook." }, 404);
  await env.SUBS.delete(key);
  return json({ msg: "Off. No more posts for this game." });
}
