// Shared bits for the Turn on / Turn off / daily run functions. Storage: the SUBS KV binding.
export const HOOK = /^https:\/\/(?:ptb\.|canary\.)?discord(?:app)?\.com\/api\/webhooks\/(\d+)\/([\w-]+)$/;
export const MAX_SUBS = 300, MAX_PER_HOOK = 5, PER_RUN = 6, POSTS_A_DAY = 3;
const UA = { "User-Agent": "roblox-game-events/1.0" };
export const json = (d, status = 200) => new Response(JSON.stringify(d), { status, headers: { "Content-Type": "application/json" } });
export const keyFor = (hook, game) => "sub:" + HOOK.exec(hook)[1] + ":" + game;
export async function get(url) { const r = await fetch(url, { headers: UA }); if (!r.ok) throw new Error(url + " " + r.status); return r.json(); }
export async function universe(game) { return (await get(`https://apis.roblox.com/universes/v1/places/${game}/universe`)).universeId; }
export async function events(uni) { return (await get(`https://apis.roblox.com/virtual-events/v1/universes/${uni}/virtual-events?limit=25`)).data || []; }
export async function post(hook, card) {
  return fetch(hook, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ embeds: [card], allowed_mentions: { parse: [] } }) });
}
export async function picture(e) {
  const id = (e.thumbnails || []).sort((a, b) => (a.rank || 0) - (b.rank || 0)).map(t => t.mediaId).find(Boolean);
  if (!id) return null;
  try { const d = (await get(`https://thumbnails.roblox.com/v1/assets?assetIds=${id}&returnPolicy=PlaceHolder&size=768x432&format=Png`)).data || [];
    return d[0] && d[0].state === "Completed" ? d[0].imageUrl : null; } catch (x) { return null; }
}
export async function body(request) {
  try { const b = await request.json(); return { game: Number(b.game), name: String(b.name || "Roblox game").slice(0, 60), hook: String(b.hook || "").trim() }; }
  catch (e) { return {}; }
}
export async function icon(uni) {
  try { return (await get(`https://thumbnails.roblox.com/v1/games/icons?universeIds=${uni}&size=150x150&format=Png`)).data[0].imageUrl; } catch (x) { return null; }
}
async function interested(id) {
  try { return (await get(`https://apis.roblox.com/virtual-events/v1/virtual-events/${id}/rsvps/counters`)).counters.going; } catch (x) { return null; }
}
const ts = (s, f) => s ? `<t:${Math.floor(Date.parse(s) / 1000)}:${f}>` : "not recorded";
// The Discord card for one new event: text, then a tidy bullet list.
export async function card(e, s, logo) {
  const t = e.eventTime || {}, going = await interested(e.id);
  const cats = (e.eventCategories || []).map(c => c.category).filter(Boolean);
  const l = ["- **Starts:** " + ts(t.startUtc, "f"), "- **Ends:** " + ts(t.endUtc, "f")];
  if (t.startUtc && Date.parse(t.startUtc) > Date.now()) l.push("- **Starts in:** " + ts(t.startUtc, "R"));
  if (cats.length) l.push("- **Type:** " + cats.map(c => { const w = c.replace(/(?!^)([A-Z])/g, " $1").toLowerCase(); return w[0].toUpperCase() + w.slice(1); }).join(", "));
  if (going != null) l.push("- **Interested:** " + going.toLocaleString("en-US") + " players");
  l.push(`- [Play now](https://www.roblox.com/games/${s.game})`);
  const text = (e.displayDescription || "").slice(0, 400);
  const c = { title: e.displayTitle || e.title || "New event", description: (text ? text + "\n\n" : "") + l.join("\n"),
    url: "https://www.roblox.com/events/" + e.id, color: 0xF28C28, author: { name: "New " + s.name + " event" } };
  if (logo) c.thumbnail = { url: logo };
  const pic = await picture(e); if (pic) c.image = { url: pic };
  return c;
}
// Webhooks are scrambled (AES-GCM) in storage when the HOOK_KEY secret is set in Cloudflare.
async function aes(env) {
  const raw = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(env.HOOK_KEY));
  return crypto.subtle.importKey("raw", raw, "AES-GCM", false, ["encrypt", "decrypt"]);
}
export async function lock(hook, env) {
  if (!env.HOOK_KEY || hook.startsWith("enc:")) return hook;
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ct = new Uint8Array(await crypto.subtle.encrypt({ name: "AES-GCM", iv }, await aes(env), new TextEncoder().encode(hook)));
  return "enc:" + btoa(String.fromCharCode(...iv, ...ct));
}
export async function unlock(hook, env) {
  if (!hook.startsWith("enc:")) return hook;
  const b = Uint8Array.from(atob(hook.slice(4)), c => c.charCodeAt(0));
  return new TextDecoder().decode(await crypto.subtle.decrypt({ name: "AES-GCM", iv: b.slice(0, 12) }, await aes(env), b.slice(12)));
}
// True only if the full webhook (secret part too) matches the saved one.
export async function owns(s, hook, env) {
  try { return HOOK.exec(await unlock(s.hook, env))[2] === HOOK.exec(hook)[2]; } catch (e) { return false; }
}
