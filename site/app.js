const f=s=>new Date(s).toLocaleString([], {weekday:"short",day:"numeric",month:"short",hour:"numeric",minute:"2-digit"});
fetch("events.json",{cache:"no-store"}).then(r=>r.json()).then(d=>{
  document.getElementById("name").textContent=d.game_name+" events";document.title=d.game_name+" Events";
  document.getElementById("game").href=`https://www.roblox.com/games/${d.game}#!/about`;
  const now=Date.now(),list=document.getElementById("list");list.textContent="";
  const ev=[...d.events].sort((a,b)=>(b.start||"").localeCompare(a.start||""));
  if(!ev.length){list.innerHTML='<p class="sub">No events yet.</p>';return}
  for(const e of ev){
    const s=e.start&&Date.parse(e.start),en=e.end&&Date.parse(e.end),a=document.createElement("a");
    a.className="ev";a.href="https://www.roblox.com/events/"+encodeURIComponent(e.id);
    const div=document.createElement("div"),b=document.createElement("b"),sp=document.createElement("span");
    b.textContent=e.title;
    if(s&&s<=now&&(!en||en>now)){const t=document.createElement("span");t.className="now";t.textContent="On now";sp.append(t,en?"ends "+f(e.end):"")}
    else if(s&&s>now)sp.textContent="Starts "+f(e.start);
    else sp.textContent=en?"Ended "+f(e.end):"Time not recorded";
    div.append(b,sp);a.append(div);list.append(a);
  }
}).catch(()=>{document.getElementById("list").innerHTML='<p class="sub">Couldn\'t load events.</p>'});
