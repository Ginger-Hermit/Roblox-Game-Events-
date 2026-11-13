const root=document.documentElement;
for(const [id,key] of [["theme","theme"],["size","size"]]){
  const box=document.getElementById(id),cur=root.dataset[key]||"";
  for(const b of box.children){b.classList.toggle("on",b.dataset.v===cur);
    b.onclick=()=>{const v=b.dataset.v;if(v)root.dataset[key]=v;else delete root.dataset[key];
      try{v?localStorage.setItem(key,v):localStorage.removeItem(key)}catch(e){}
      for(const o of box.children)o.classList.toggle("on",o===b)}}
}
document.getElementById("copybug").onclick=async()=>{
  const msg=document.getElementById("bugmsg");let ev="not recorded";
  try{const d=await (await fetch("events.json",{cache:"no-store"})).json();ev=d.game_name+", "+d.events.length+" events"}catch(e){ev="couldn't load"}
  const txt=["Roblox Game Events bug report","Time: "+new Date().toISOString(),"Page: "+location.href,"Browser: "+navigator.userAgent,
    "Screen: "+innerWidth+"x"+innerHeight,"Theme: "+(root.dataset.theme||"auto")+", text: "+(root.dataset.size||"normal"),"Events: "+ev,"What went wrong: "].join("\n");
  try{await navigator.clipboard.writeText(txt);msg.textContent="Copied. Paste it with a short note."}catch(e){msg.textContent="Couldn't copy. Take a screenshot instead."}
};
