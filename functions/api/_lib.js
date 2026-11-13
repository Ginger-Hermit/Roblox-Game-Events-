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
