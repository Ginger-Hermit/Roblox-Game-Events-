// Patch note: Security hardening behind the scenes.
// Update check: compares this page's BUILD with version.txt on the same site (nothing about you is sent).
const BUILD = "1.0.42";
const NOTE = "Security hardening behind the scenes.";
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
