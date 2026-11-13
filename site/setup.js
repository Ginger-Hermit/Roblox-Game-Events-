"use strict";
const $ = id => document.getElementById(id);
function say(id, text, ok) { const el = $(id); el.textContent = text; el.className = "msg " + (ok ? "ok" : "bad"); }
function readGame() {
  const m = $("game").value.match(/roblox\.com\/(?:[a-z-]+\/)?games\/(\d+)(?:\/([^/?#]+))?/i) || $("game").value.trim().match(/^(\d+)$/);
  if (!m) return null;
  const name = m[2] ? decodeURIComponent(m[2]).replace(/-/g, " ").slice(0, 60) : "Roblox game";
  return { id: Number(m[1]), name };
}
$("game").addEventListener("input", () => {
  const g = readGame();
  if (!$("game").value.trim()) return say("gameMsg", "", true);
  g ? say("gameMsg", "" + g.name + " · number " + g.id, true) : say("gameMsg", "That doesn't look like a Roblox game link.", false);
});
const HOOK = /^https:\/\/(?:ptb\.|canary\.)?discord(?:app)?\.com\/api\/webhooks\/\d+\/[\w-]+$/;
$("post").addEventListener("click", async () => {
  const g = readGame(), url = $("hook").value.trim();
  if (!g) return say("hookMsg", "Add the game link first.", false);
  if (!HOOK.test(url)) return say("hookMsg", "That isn't a Discord webhook link.", false);
  say("hookMsg", "Posting...", true);
  const card = { title: "Now following: " + g.name, url: "https://www.roblox.com/games/" + g.id,
    description: "New events will post here once a day.", color: 0xF28C28, author: { name: "Roblox Game Events" } };
  try {
    const r = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ embeds: [card], allowed_mentions: { parse: [] } }) });
    r.ok ? say("hookMsg", "Posted. Check your channel.", true) : say("hookMsg", "Discord said no (" + r.status + "). Make a new webhook and try again.", false);
  } catch (e) { say("hookMsg", "Couldn't reach Discord. Check your internet.", false); }
});
$("test").addEventListener("click", async () => {
  const url = $("hook").value.trim();
  if (!/^https:\/\/(?:ptb\.|canary\.)?discord(?:app)?\.com\/api\/webhooks\/\d+\/[\w-]+$/.test(url)) return say("hookMsg", "That isn't a Discord webhook link.", false);
  say("hookMsg", "Sending…", true);
  try {
    const r = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: "Test from Roblox Game Events. It works!", allowed_mentions: { parse: [] } }) });
    r.ok ? say("hookMsg", "Test post sent. Check your channel.", true) : say("hookMsg", "Discord said no (" + r.status + "). Make a new webhook and try again.", false);
  } catch (e) { say("hookMsg", "Couldn't reach Discord. Check your internet.", false); }
});
$("copy").addEventListener("click", async () => {
  const g = readGame();
  if (!g) return say("copyMsg", "Add the game link first.", false);
  const text = JSON.stringify({ game: g.id, game_name: g.name, colour: "#F28C28", max_posts_a_day: 3 }, null, 2) + "\n";
  try { await navigator.clipboard.writeText(text); say("copyMsg", "Copied. Paste it into settings.json.", true); }
  catch (e) { say("copyMsg", "Couldn't copy. Long-press to copy:\n" + text, false); }
});
