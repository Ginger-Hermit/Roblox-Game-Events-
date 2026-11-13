// Patch note: Only the website posts now, so no double posts
// Update check: compares this page's BUILD with version.txt on the same site (nothing about you is sent).
const BUILD = "1.0.22";
const NOTE = "Only the website posts now, so no double posts";
(() => {
  let last = null; try { last = localStorage.getItem("seenver"); localStorage.setItem("seenver", BUILD); } catch (e) { return; }
  if (last && last !== BUILD) { const nv = document.getElementById("newver"); nv.textContent = "Updated: " + NOTE + "."; nv.hidden = false; }
})();
(async () => {
  try {
    const r = await fetch("version.txt?t=" + Date.now(), { cache: "no-store" });
    const v = (await r.text()).trim();
    if (r.ok && /^[\w.-]{1,40}$/.test(v) && v !== BUILD) {
      const nv = document.getElementById("newver");
      nv.innerHTML = 'New version ready. <a href="#" id="reloadnow">Refresh now</a>';
      nv.hidden = false;
      document.getElementById("reloadnow").onclick = e => { e.preventDefault(); location.reload(); };
    }
  } catch (e) {}
})();
