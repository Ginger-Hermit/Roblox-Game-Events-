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
  $("pvGame").textContent = g ? g.name : "your game";
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
async function turn(what) {
  const g = readGame(), hook = $("hook").value.trim();
  if (!g || !HOOK.test(hook)) return say("onMsg", "Add a game link and a webhook first.", false);
  say("onMsg", what === "on" ? "Turning on..." : "Turning off...", true);
  try {
    const r = await fetch("api/turn-" + what, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ game: g.id, name: g.name, hook }) });
    const d = await r.json(); say("onMsg", d.msg || "Something went wrong.", r.ok);
    if (r.ok && what === "on") remember();
  } catch (e) { say("onMsg", "Couldn't reach the helper. Try again later.", false); }
}
$("on").addEventListener("click", () => turn("on"));
$("off").addEventListener("click", () => turn("off"));

// Saved games: kept on this phone only (localStorage), only when Remember is on.
const load = () => { try { return JSON.parse(localStorage.getItem("saved") || "[]"); } catch (e) { return []; } };
const store = list => { try { localStorage.setItem("saved", JSON.stringify(list)); } catch (e) {} };
const loadH = () => { try { return JSON.parse(localStorage.getItem("hooks") || "[]"); } catch (e) { return []; } };
const storeH = list => { try { localStorage.setItem("hooks", JSON.stringify(list)); } catch (e) {} };
function drawHooks() {
  const list = loadH(), hv = $("hv");
  $("hooksBox").hidden = !list.length; $("hooksN").textContent = list.length; hv.textContent = "";
  list.forEach((s, i) => {
    const a = document.createElement("a"), b = document.createElement("b"), x = document.createElement("button");
    a.href = "#"; a.className = "ch"; b.textContent = s.label; x.textContent = "\u00d7"; x.className = "x"; x.title = "Forget";
    a.onclick = e => { e.preventDefault(); $("hook").value = s.hook; $("label").value = s.label === "Discord" ? "" : s.label;
      for (const o of hv.children) o.classList.toggle("on", o === a); };
    x.onclick = e => { e.preventDefault(); e.stopPropagation(); const l = loadH(); l.splice(i, 1); storeH(l); drawHooks(); };
    a.append(b, x); hv.append(a);
  });
}
function draw() {
  drawHooks();
  const list = load(), sv = $("sv");
  $("savedBox").hidden = !list.length; $("savedN").textContent = list.length; sv.textContent = "";
  list.forEach((s, i) => {
    const a = document.createElement("a"), b = document.createElement("b"), sp = document.createElement("span"), x = document.createElement("button");
    a.href = "#"; b.textContent = s.name; sp.textContent = s.label || "Discord"; x.textContent = "\u00d7"; x.className = "x"; x.title = "Forget";
    a.onclick = e => { e.preventDefault(); $("game").value = s.link; $("hook").value = s.hook; $("label").value = s.label || "";
      $("remember").checked = true; $("nameRow").hidden = false; $("game").dispatchEvent(new Event("input"));
      for (const o of sv.children) o.classList.toggle("on", o === a); };
    x.onclick = e => { e.preventDefault(); e.stopPropagation(); const l = load(); l.splice(i, 1); store(l); draw(); };
    a.append(b, sp, x); sv.append(a);
  });
  const add = document.createElement("a"); add.href = "#"; add.className = "add"; add.textContent = "+ Add a game";
  add.onclick = e => { e.preventDefault(); for (const id of ["game", "hook", "label"]) $(id).value = ""; $("remember").checked = false; $("nameRow").hidden = true; say("gameMsg", "", true); };
  sv.append(add);
}
function remember() {
  if (!$("remember").checked) return;
  const g = readGame(), hook = $("hook").value.trim();
  if (!g || !HOOK.test(hook)) return say("hookMsg", "Add a game and a webhook to remember them.", false);
  const l = load().filter(s => !(s.id === g.id && s.hook === hook));
  l.unshift({ id: g.id, name: g.name, link: $("game").value.trim(), hook, label: $("label").value.trim().slice(0, 30) });
  store(l.slice(0, 20));
  const label = $("label").value.trim().slice(0, 30), h = loadH().filter(s => s.hook !== hook);
  h.unshift({ hook, label: label || "Discord" }); storeH(h.slice(0, 20)); draw();
}
$("remember").addEventListener("change", () => { $("nameRow").hidden = !$("remember").checked; remember(); });
$("label").addEventListener("change", remember);
$("test").addEventListener("click", remember); $("post").addEventListener("click", remember);
draw();
