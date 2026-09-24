addEventListener("error",e=>{ console.warn("[site] caught:",e.message||e); });

/* ============================================================
   MEDIA · drop real image URLs here, keys match data-img
   ============================================================ */
const MEDIA = {
  "hero-door":"img/hero-door.jpg",
  "rooms-hall":"img/rooms-hall.jpg",
  "rooms-hands":"",
  "sheet-1":"", "sheet-2":"", "sheet-3":"", "sheet-4":"", "sheet-5":"", "sheet-6":"", "sheet-7":"",
  "cj-ui":"", "gather-1":"", "gather-2":"", "gather-3":"", "gather-4":"",
  "art-1":"", "art-2":"", "art-3":"", "art-4":"", "art-5":"", "art-6":"",
  /* deep-space photography: lead images and evidence plates */
  "nm-lead":"", "nm-1":"", "nm-2":"", "nm-3":"", "nm-4":"", "nm-5":"",
  "cx-lead":"", "cx-1":"", "cx-2":"", "cx-3":"", "cx-4":"",
  "cj-lead":"", "cj-1":"", "cj-2":"",
  "td-lead":"", "td-1":"", "td-2":"", "td-3":"",
  "gt-lead":"", "gt-1":"", "gt-2":"", "gt-3":"", "gt-4":"",
  "ab-1":"", "ab-2":"", "ab-3":""
};
const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const COARSE = window.matchMedia("(hover:none)").matches;
const $ = (s,c=document)=>c.querySelector(s);
const $$ = (s,c=document)=>[...c.querySelectorAll(s)];

function paintMedia(scope=document){
  $$("[data-img]",scope).forEach(el=>{
    const src = MEDIA[el.dataset.img];
    if(src){ el.style.backgroundImage=`url("${src}")`; el.classList.add("has-img"); }
  });
}
paintMedia();

/* chapter colour, used by nav, rail and the ambient layer */
const CHAPTERS={
  hero:{hex:"#EE4187",dark:true,palette:["#EE4187","#F2872F","#2B4DE0","#F7EFE2"]},
  "ch-notice":{hex:"#EE4187",palette:["#EE4187","#F2872F"]},
  "ch-rooms":{hex:"#EF6A45",palette:["#EF6A45","#EE4187","#F2872F"]},
  "ch-participate":{hex:"#0F918B",palette:["#0F918B","#2B4DE0"]},
  "ch-question":{hex:"#6A4BD6",palette:["#6A4BD6","#0F918B","#EE4187"]},
  "ch-build":{hex:"#2B4DE0",palette:["#2B4DE0","#6A4BD6"]},
  "ch-gather":{hex:"#F2872F",dark:true,palette:["#F2872F","#EE4187","#F7EFE2"]},
  "ch-pattern":{hex:"#0F918B",palette:["#0F918B","#2B4DE0","#EE4187"]},
  "ch-open":{hex:"#EE4187",palette:["#EE4187","#F2872F","#2B4DE0"]},
  footer:{hex:"#EE4187",dark:true,palette:["#EE4187","#F2872F","#F7EFE2"]}
};
let CURRENT="hero";

/* ---------- threshold ---------- */
(function(){
  const th=$("#threshold"), btn=$("#knockBtn"), dots=$$(".knock__count i"), mast=$("#masthead"), t=$("#local-time");
  if(t){ try{ t.textContent=new Intl.DateTimeFormat("en-GB",{hour:"2-digit",minute:"2-digit",timeZone:"Asia/Ho_Chi_Minh"}).format(new Date()); }catch(e){} }
  let n=0;
  function enter(){
    document.body.classList.remove("is-locked");
    mast.hidden=false;
    if(REDUCED){ th.hidden=true; }
    else{
      document.body.classList.add("has-entered");
      th.classList.add("is-dimming");
      setTimeout(()=>{ th.classList.remove("is-dimming"); th.classList.add("is-opening"); },560);
      setTimeout(()=>{ th.hidden=true; th.classList.remove("is-opening"); },1900);
    }
    sessionStorage.setItem("entered","1");
    $$("#hero [data-part],#hero [data-mask]").forEach(e=>e.classList.add("in"));
  }
  if(sessionStorage.getItem("entered") || location.hash.startsWith("#/")){ th.hidden=true; mast.hidden=false; document.body.classList.add("has-entered"); }
  else{ document.body.classList.add("is-locked"); setTimeout(()=>btn.focus(),300); }
  btn?.addEventListener("click",()=>{
    n=Math.min(n+1,3); dots[n-1] && dots[n-1].classList.add("on");
    btn.classList.remove("is-knocking"); void btn.offsetWidth; btn.classList.add("is-knocking","k"+n);
    if(n>=3){ btn.querySelector(".knock__hint").textContent="Come in"; setTimeout(enter,320); }
  });
})();

/* ---------- reveals ---------- */
const io=new IntersectionObserver((entries)=>{
  entries.forEach(en=>{
    if(!en.isIntersecting) return;
    const el=en.target;
    el.classList.add("in");
    if(el.hasAttribute("data-stagger")) [...el.children].forEach((c,i)=>{ c.style.transitionDelay=(i*70)+"ms"; });
    io.unobserve(el);
  });
},{rootMargin:"0px 0px -10% 0px",threshold:.15});
$$("[data-part],[data-mask],[data-uncover],[data-stagger],.mark,#chartbox").forEach(el=>io.observe(el));

/* ---------- counters ---------- */
const countIO=new IntersectionObserver(es=>{
  es.forEach(e=>{
    if(!e.isIntersecting) return;
    const el=e.target, end=parseFloat(el.dataset.count), suffix=el.dataset.suffix||"";
    countIO.unobserve(el);
    if(REDUCED) return;
    let start=null;
    const tick=ts=>{
      start=start||ts; const p=Math.min((ts-start)/1100,1);
      el.firstChild.textContent=Math.round(end*(1-Math.pow(1-p,3))).toLocaleString("en-US")+suffix;
      if(p<1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
},{threshold:.6});
$$("[data-count]").forEach(el=>countIO.observe(el));

/* ---------- navigation: where am I, and jump ---------- */
(function(){
  const secs=[...$$("#story section"),$("#footer")].filter(Boolean), links=$$(".navlink"), prog=$("#navProg"), mroom=$("#mastheadRoom");
  let ticking=false;
  function update(){
    ticking=false;
    const h=document.documentElement.scrollHeight-window.innerHeight;
    prog.style.width=(Math.max(0,Math.min(1,window.scrollY/(h||1)))*100)+"%";
    let cur=secs[0];
    for(const s of secs){ if(s.getBoundingClientRect().top<=window.innerHeight*0.4) cur=s; }
    if(!cur || cur.id===CURRENT) return;
    CURRENT=cur.id;
    const meta=CHAPTERS[cur.id]||CHAPTERS.hero;
    mroom.textContent=cur.dataset.short||"Notice";
    document.body.classList.toggle("is-dark",!!meta.dark);
    document.documentElement.style.setProperty("--nav-accent",meta.hex);
    const target=cur.dataset.nav;
    links.forEach(a=>a.classList.toggle("is-current",a.dataset.target===target));
    const on=links.find(a=>a.classList.contains("is-current"));
    if(on && on.parentElement.parentElement.scrollWidth>on.parentElement.parentElement.clientWidth){
      on.scrollIntoView({inline:"center",block:"nearest",behavior:REDUCED?"auto":"smooth"});
    }
    if(window.MOTES) window.MOTES.recolor(meta.palette);
  }
  addEventListener("scroll",()=>{ if(!ticking){ requestAnimationFrame(update); ticking=true; } },{passive:true});
  addEventListener("resize",update); update();
})();

/* ---------- nav links jump straight to the chapter ---------- */
(function(){
  function goTo(id,push){
    const el=document.getElementById(id); if(!el) return;
    const nav=$("#masthead");
    const off=(nav&&!nav.hidden?nav.offsetHeight:0)+10;
    const y=el.getBoundingClientRect().top+window.scrollY-off;
    window.scrollTo({top:Math.max(0,y),behavior:REDUCED?"auto":"smooth"});
    if(push) history.replaceState(null,"","#"+id);
  }
  $$('.navlink, a.btn[href^="#ch-"], a.brand[href^="#"]').forEach(a=>{
    a.addEventListener("click",e=>{
      const id=(a.getAttribute("href")||"").replace("#","");
      if(!id||!document.getElementById(id)) return;
      e.preventDefault();
      const room=$("#room");
      if(room&&room.classList.contains("is-open")){
        history.replaceState("",document.title,location.pathname+location.search);
        $("#roomClose").click();
        setTimeout(()=>goTo(id,true),260);
      } else goTo(id,true);
      if(a.classList.contains("navlink")){
        $$(".navlink").forEach(n=>n.classList.toggle("is-current",n===a));
      }
    });
  });
})();

/* ---------- doors panel ---------- */
(function(){
  const doors=$("#doors"), btn=$("#doorsBtn");
  const open=v=>{
    doors.classList.toggle("is-open",v); doors.setAttribute("aria-hidden",String(!v));
    btn.setAttribute("aria-expanded",String(v)); btn.textContent=v?"Close":"Doors";
    if(v) setTimeout(()=>$(".door-link",doors)?.focus(),340);
  };
  btn.addEventListener("click",()=>open(!doors.classList.contains("is-open")));
  $("#heroDoors")?.addEventListener("click",()=>open(true));
  $$("[data-close-doors]").forEach(e=>e.addEventListener("click",()=>open(false)));
  $$(".door-link").forEach(a=>a.addEventListener("click",()=>open(false)));
  addEventListener("keydown",e=>{ if(e.key==="Escape"&&doors.classList.contains("is-open")) open(false); });
})();

$("#footerTop")?.addEventListener("click",()=>window.scrollTo({top:0,behavior:REDUCED?"auto":"smooth"}));

/* ---------- hero: light and door follow the pointer, gently ---------- */
(function(){
  const hero=$("#hero"), door=$("#doorframe");
  if(!hero||!door||REDUCED||COARSE) return;
  hero.addEventListener("pointermove",e=>{
    const r=hero.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
    door.style.transform=`rotate(-1.2deg) translate3d(${x*14}px,${y*10}px,0) rotateY(${x*-5}deg)`;
  });
  hero.addEventListener("pointerleave",()=>{ door.style.transform="rotate(-1.2deg)"; });
})();

/* ---------- the tray ---------- */
(function(){
  const stage=$("#trayStage"); if(!stage) return;
  const outline=$("#trayOutline"), val=$("#engageVal"), bar=$("#engageBar"), note=$("#trayNote");
  const colors=["#EE4187","#F2872F","#0F918B","#2B4DE0","#C9A227","#7A3E9D"];
  const crayons=[];
  for(let i=0;i<18;i++){
    const c=document.createElement("i");
    c.className="crayon"; c.style.background=colors[i%6];
    stage.appendChild(c); crayons.push(c);
  }
  function layout(mode){
    const w=stage.clientWidth,h=stage.clientHeight;
    crayons.forEach((c,i)=>{
      if(mode==="free"){
        const cell=Math.floor(i/3), col=cell%3, row=Math.floor(cell/3), k=i%3;
        c.style.left=((w/3)*col+w*0.045)+"px";
        c.style.top=((h/2)*row+h*0.14+k*11)+"px";
        c.style.width=(w/3*0.5)+"px"; c.style.transform="rotate(0deg)";
      }else{
        const cx=w/2, cy=h/2, ang=(i/18)*Math.PI*2, r=Math.min(w,h)*0.26;
        c.style.left=(cx+Math.cos(ang)*r-w*0.07)+"px";
        c.style.top=(cy+Math.sin(ang)*r*0.62)+"px";
        c.style.width=(w*0.14)+"px";
        c.style.transform=`rotate(${(ang*180/Math.PI)+90}deg)`;
      }
    });
    if(mode==="free") outline.classList.remove("on");
    else{
      outline.classList.add("on");
      outline.style.left=(w*0.29)+"px"; outline.style.top=(h*0.2)+"px";
      outline.style.width=(w*0.42)+"px"; outline.style.height=(h*0.6)+"px";
    }
  }
  function set(mode){
    layout(mode);
    const on=mode==="story";
    val.textContent=on?"85%":"60%"; bar.style.width=on?"85%":"60%";
    note.textContent=on
      ? "One shared world, one shared tray. Children negotiate colours, narrate for each other, and keep going after the facilitator steps back."
      : "Children work in parallel. Materials stay where they were placed. Most talk goes to the facilitator.";
    $$(".tray__switch button").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.mode===mode)));
  }
  $$(".tray__switch button").forEach(b=>b.addEventListener("click",()=>set(b.dataset.mode)));
  set("free");
  addEventListener("resize",()=>{
    const active=$('.tray__switch button[aria-pressed="true"]');
    if(active) set(active.dataset.mode);
  });
})();

/* ---------- contextuary demo ---------- */
(function(){
  const DATA={
    ephemeral:{pos:"adjective",vi:"phù du, chóng tàn",inContext:"Support that existed but did not last. Nothing here is about being delicate.",root:"Greek ephēmeros: lasting a day.",trap:"Students read it as fragile. It is about duration, not strength."},
    ostensible:{pos:"adjective",vi:"bề ngoài, danh nghĩa",inContext:"The stated reason for the support, and the sentence implies it was never the real one.",root:"Latin ostendere: to show.",trap:"Not a synonym for obvious. It means claimed rather than actual."},
    temporize:{pos:"verb",vi:"trì hoãn, câu giờ",inContext:"The chair stalls to avoid deciding in front of a room that has already decided.",root:"Latin tempus: time.",trap:"Not the same as compromise. Nothing is conceded, only delayed."}
  };
  const gloss=$("#gloss"); if(!gloss) return;
  $$(".wordbtn").forEach(b=>b.addEventListener("click",()=>{
    $$(".wordbtn").forEach(o=>o.setAttribute("aria-expanded","false"));
    b.setAttribute("aria-expanded","true");
    const w=b.dataset.word,d=DATA[w];
    gloss.innerHTML=`<p><span class="gloss__word">${w}</span><span class="gloss__pos">${d.pos}</span></p>
      <p class="gloss__vi">${d.vi}</p>
      <dl><dt>In this sentence</dt><dd>${d.inContext}</dd>
      <dt>Where it comes from</dt><dd>${d.root}</dd>
      <dt>Common misread</dt><dd>${d.trap}</dd></dl>`;
  }));
})();

/* ---------- questions carried into other rooms ---------- */
$$(".carried__toggle").forEach(btn=>{
  btn.addEventListener("click",()=>{
    const card=btn.closest(".carried__card");
    const open=!card.classList.contains("is-open");
    card.classList.toggle("is-open",open);
    btn.setAttribute("aria-expanded",String(open));
    btn.firstChild.textContent=open?"Close ":"What it changed ";
  });
});

/* ---------- drag-to-scroll for horizontal artefacts ---------- */
function dragScroll(el){
  if(!el) return;
  let down=false,x=0,left=0;
  el.addEventListener("pointerdown",e=>{ if(e.pointerType==="mouse"){ down=true;x=e.clientX;left=el.scrollLeft;el.classList.add("is-dragging"); } });
  addEventListener("pointerup",()=>{ down=false; el.classList.remove("is-dragging"); });
  addEventListener("pointermove",e=>{ if(down){ el.scrollLeft=left-(e.clientX-x); } });
  const nudge=new IntersectionObserver(es=>{
    es.forEach(e=>{ if(e.isIntersecting && !REDUCED){
      el.scrollTo({left:40,behavior:"smooth"});
      setTimeout(()=>el.scrollTo({left:0,behavior:"smooth"}),600);
      nudge.unobserve(e.target);
    }});
  },{threshold:.4});
  nudge.observe(el);
}
dragScroll($("#drift")); dragScroll($("#seasonStrip"));

/* ---------- pattern: rooms and questions ---------- */
(function(){
  const list=$$("#swapList li"), qs=$$("#swapQ span"); if(!list.length) return;
  let i=-1, timer=null;
  const show=n=>{ i=n; list.forEach(l=>l.classList.toggle("on",+l.dataset.i===n)); qs.forEach(q=>q.classList.toggle("on",+q.dataset.i===n)); };
  const io2=new IntersectionObserver(es=>{
    es.forEach(e=>{
      if(e.isIntersecting){ show(0); if(!REDUCED){ clearInterval(timer); timer=setInterval(()=>show((i+1)%list.length),2600); } }
      else clearInterval(timer);
    });
  },{threshold:.35});
  io2.observe($("#swap"));
  list.forEach(l=>{
    l.addEventListener("mouseenter",()=>{ clearInterval(timer); show(+l.dataset.i); });
    l.addEventListener("click",()=>{ clearInterval(timer); show(+l.dataset.i); });
  });
})();

/* ============================================================
   AMBIENT LAYER · stars, dots, rings, small leaf marks
   Sparse, slow, depth-sorted, recoloured per chapter.
   ============================================================ */
window.MOTES=(function(){
  const cv=$("#motes"); if(!cv) return {recolor(){}};
  if(REDUCED){ cv.style.display="none"; return {recolor(){}}; }
  const ctx=cv.getContext("2d");
  let w=0,h=0,dpr=1,motes=[],raf=null,pointer={x:-999,y:-999},scrollV=0,lastY=window.scrollY;
  const COUNT=()=> (window.innerWidth<720?7:16);
  const KINDS=["star","dot","ring","leaf"];
  function size(){
    dpr=Math.min(devicePixelRatio||1,2);
    w=cv.clientWidth; h=cv.clientHeight;
    cv.width=w*dpr; cv.height=h*dpr; ctx.setTransform(dpr,0,0,dpr,0,0);
  }
  function make(pal){
    return {
      x:Math.random()*w, y:Math.random()*h,
      z:.35+Math.random()*.9,
      r:3+Math.random()*7,
      kind:KINDS[(Math.random()*KINDS.length)|0],
      c:pal[(Math.random()*pal.length)|0],
      a:0, target:.08+Math.random()*.22,
      vx:(Math.random()-.5)*.12, vy:-(.05+Math.random()*.14),
      rot:Math.random()*Math.PI, vr:(Math.random()-.5)*.006,
      tw:Math.random()*Math.PI*2
    };
  }
  let palette=CHAPTERS.hero.palette;
  function seed(){ motes=Array.from({length:COUNT()},()=>make(palette)); }
  function recolor(pal){
    palette=pal||palette;
    motes.forEach(m=>{ if(Math.random()<.6){ m.a=Math.max(0,m.a); m.c=palette[(Math.random()*palette.length)|0]; } });
  }
  function shape(m){
    ctx.save(); ctx.translate(m.x,m.y); ctx.rotate(m.rot);
    ctx.globalAlpha=Math.max(0,Math.min(1,m.a));
    ctx.fillStyle=m.c; ctx.strokeStyle=m.c; ctx.lineWidth=1;
    const r=m.r*m.z;
    if(m.kind==="star"){
      ctx.beginPath();
      for(let i=0;i<4;i++){
        const a=i*Math.PI/2;
        ctx.quadraticCurveTo(Math.cos(a+.4)*r*.3,Math.sin(a+.4)*r*.3,Math.cos(a+Math.PI/2)*r,Math.sin(a+Math.PI/2)*r);
      }
      ctx.closePath(); ctx.fill();
    }else if(m.kind==="dot"){
      ctx.beginPath(); ctx.arc(0,0,r*.32,0,Math.PI*2); ctx.fill();
    }else if(m.kind==="ring"){
      ctx.beginPath(); ctx.arc(0,0,r*.55,0,Math.PI*2); ctx.stroke();
    }else{
      ctx.beginPath();
      ctx.moveTo(-r*.6,0);
      ctx.quadraticCurveTo(0,-r*.7,r*.6,0);
      ctx.quadraticCurveTo(0,r*.7,-r*.6,0);
      ctx.closePath(); ctx.stroke();
    }
    ctx.restore();
  }
  function frame(){
    ctx.clearRect(0,0,w,h);
    scrollV*=.9;
    motes.forEach(m=>{
      m.tw+=.012;
      m.a+=((m.target*(0.6+0.4*Math.sin(m.tw)))-m.a)*.02;
      m.x+=m.vx*m.z; m.y+=(m.vy-scrollV*.02)*m.z; m.rot+=m.vr;
      const dx=m.x-pointer.x, dy=m.y-pointer.y, d2=dx*dx+dy*dy;
      if(d2<12000 && d2>1){ const f=(1-d2/12000); m.x+=dx*0.004*f; m.y+=dy*0.004*f; }
      if(m.y<-30){ m.y=h+20; m.x=Math.random()*w; m.c=palette[(Math.random()*palette.length)|0]; }
      if(m.y>h+40){ m.y=-20; }
      if(m.x<-30) m.x=w+20; if(m.x>w+30) m.x=-20;
      shape(m);
    });
    raf=requestAnimationFrame(frame);
  }
  addEventListener("resize",()=>{ size(); seed(); },{passive:true});
  addEventListener("pointermove",e=>{ pointer.x=e.clientX; pointer.y=e.clientY; },{passive:true});
  addEventListener("scroll",()=>{ scrollV+=(window.scrollY-lastY); lastY=window.scrollY; },{passive:true});
  document.addEventListener("visibilitychange",()=>{
    if(document.hidden){ cancelAnimationFrame(raf); raf=null; }
    else if(!raf) raf=requestAnimationFrame(frame);
  });
  size(); seed(); raf=requestAnimationFrame(frame);
  return {recolor};
})();

/* ============================================================
   ROOMS OFF THE CORRIDOR
   Content lives here as data. Each room chooses its own blocks,
   so no two project pages share a template.
   ============================================================ */
const fig=(o)=>`<figure class="fig" data-uncover><div class="fig__plate" data-img="${o.k||''}" data-slot="${o.slot||''}" style="--ratio:${o.ratio||'4/5'}"><div class="fig__ghost">${o.ghost||'Replace with photograph'}</div></div>${o.cap?`<figcaption>${o.cap}</figcaption>`:""}</figure>`;

const B={
  kicker:t=>`<p class="room__kicker">${t}</p>`,
  title:t=>`<h2 id="roomTitle">${t}</h2>`,
  lede:t=>`<p class="blk blk--lede">${t}</p>`,
  para:t=>`<p class="blk blk--para">${t}</p>`,
  quote:t=>`<p class="blk blk--quote">${t}</p>`,
  note:t=>`<p class="blk note">${t}</p>`,
  fig:o=>`<div class="blk">${fig(o)}</div>`,
  lead:o=>`<div class="blk blk--lead">${fig(o)}</div>`,
  strip:a=>`<div class="blk blk--strip">${a.map(fig).join("")}</div>`,
  figs:a=>`<div class="blk blk--figs">${a.map(fig).join("")}</div>`,
  steps:a=>`<ol class="blk blk--steps">${a.map(s=>`<li><div><b>${s.b}</b><p>${s.p}</p></div></li>`).join("")}</ol>`,
  numbers:a=>`<div class="blk numbers">${a.map(n=>`<div><b>${n.b}</b><span>${n.s}</span></div>`).join("")}</div>`,
  pairs:a=>`<div class="blk blk--pairs">${a.map(p=>`<div><h4>${p.h}</h4><p>${p.p}</p></div>`).join("")}</div>`,
  rows:a=>`<div class="blk">${a.map(r=>`<div class="cv-row"><p class="mono">${r.t}</p><div><h4>${r.h}</h4><p>${r.p}</p></div>`).join("")}</div>`,
  links:a=>`<div class="room__more">${a.map(l=>`<a href="${l.href}">${l.label} →</a>`).join("")}</div>`
};

const ROOMS={
"/work/net-mo":{accent:"var(--pink)",where:"Work · Nét Mơ",blocks:[
  ["kicker","Work · 2024 to now · Founder and Director"],
  ["title","Nét Mơ"],
  ["lead",{k:"nm-lead",slot:"Plate 01",ratio:"16/9",ghost:"Lead photograph · a session in progress, wide crop",cap:"<b>Season 2, Đồng Nai.</b> Fifteen minutes in."}],
  ["para","A boy spent the first session drawing in the bottom right corner of his page. Not shyly. Efficiently, as if the rest of the paper belonged to somebody else. In the third session we ran out of small sheets and put one large one across four tables. He drew across the middle without asking."],
  ["quote","The material was never the problem. The ownership of the surface was."],
  ["para","Nét Mơ (Traces of Dreams) is an arts-based social-emotional learning programme for children in care homes and for elderly residents at care facilities. It runs on two branches: Shelters, which delivers the curriculum, and OPEN Community, which builds the public rooms that fund and surround it. It is legally sponsored by Bảo Sang."],
  ["kicker","The system behind the sessions"],
  ["steps",[
    {b:"Curriculum, not activities",p:"Four sessions in a fixed dramatic order, grounded in narrative therapy, hope theory and trauma-informed care. Season 2 ran as Chuyện Của Mây: Vẽ nỗi lo, tô hi vọng."},
    {b:"Facilitators are trained, not recruited",p:"Volunteer coordinator training documents, internal regulations, and a briefing structure so a first-time volunteer knows what to do when a child stops drawing."},
    {b:"Story world over free drawing",p:"Immersive framing sustained about 85% engagement against 60% for open free-drawing formats. It also gives children a character to speak through when speaking as themselves is too much."},
    {b:"Handover is a product",p:"I built the team an activity journal app: three permission roles, media upload, calendar view, and a task board coloured by department, so a season can be inherited rather than re-explained."},
    {b:"The work leaves the shelter",p:"Once Upon The Inside, co-produced with The APRIL Collective at May Artspace, showed children's work beside pieces by elderly participants and autistic artists."}
  ]],
  ["numbers",[
    {b:"200+",s:"children reached"},{b:"6",s:"shelters, HCMC and Đồng Nai"},
    {b:"2",s:"elderly care facilities"},{b:"25",s:"team members, 5 departments"},
    {b:"80%",s:"showed improved emotional expression or confidence"},{b:"75M VND",s:"raised; 80% direct to shelter children"}
  ]],
  ["figs",[
    {k:"nm-1",slot:"Plate 02",ratio:"3/4",ghost:"child and facilitator",cap:"Facilitator training pays for itself in the first ten minutes."},
    {k:"nm-2",slot:"Plate 03",ratio:"3/4",ghost:"elderly participant painting",cap:"Intergenerational sessions: two groups used to being cared for, making something for each other."},
    {k:"nm-3",slot:"Plate 04",ratio:"3/4",ghost:"monster drawings on the floor",cap:"Externalised worries. The monster is easier to describe than the fear."}
  ]],
  ["strip",[
    {k:"nm-4",slot:"05",ratio:"1/1",ghost:"volunteer briefing"},
    {k:"nm-5",slot:"06",ratio:"1/1",ghost:"the room after everyone left"},
    {k:"sheet-1",slot:"07",ratio:"1/1",ghost:"exhibition wall, May Artspace"},
    {k:"sheet-6",slot:"08",ratio:"1/1",ghost:"wall text, handwritten"}
  ]],
  ["kicker","What went wrong first"],
  ["pairs",[
    {h:"Season 1 mistake",p:"I planned sessions around outputs. A finished drawing per child, per hour. Children who worked slowly learned they were behind, which is the opposite of the point."},
    {h:"The fix",p:"Sessions now end on a shared object rather than individual results, and facilitators are told explicitly that an unfinished page is a fine outcome."},
    {h:"Still unsolved",p:"Handover between seasons. The activity journal app helps, but a volunteer's judgement in the room is still the part I cannot write down."}
  ]],
  ["kicker","What I started wondering afterwards"],
  ["para","If the format changes engagement this reliably, the effect is not about art. It is about what the room permits. That question is what pushed me into reading psychology properly, and eventually into running a study instead of trusting my own field notes."],
  ["links",[{href:"#/research/two-doors",label:"The study it led to"},{href:"#/exhibition",label:"Exhibition"},{href:"#/cv",label:"CV"}]]
]},

"/work/contextuary":{accent:"var(--blue)",where:"Work · Contextuary",blocks:[
  ["kicker","Work · Jan 2026 to now · Design and build"],
  ["title","Contextuary"],
  ["lede","A word. <b>Ephemeral.</b> You learned it on Tuesday. On Friday it appears in a sentence about a coalition and you do not recognise it."],
  ["para","Memorising a definition gives you a word with no room around it. Recognition in a test passage needs the opposite: the word inside a sentence that gave it a job. So Contextuary never shows a word alone. You paste a passage or a single word, and it explains that word as it behaves right there, in English and in Vietnamese, then keeps the sentence."],
  ["steps",[
    {b:"Paste anything",p:"A passage, a paragraph from a practice test, or one word you got wrong."},
    {b:"Read it in place",p:"Meaning in context, part of speech, Vietnamese gloss, and the misreading students usually make."},
    {b:"It goes to your library",p:"Saved with the sentence it came from, not stripped down to a flashcard."},
    {b:"Daily Picks",p:"A scrolling bar of new words at the top of My Words, drawn from a 1000-word SAT list, loading more as you scroll so you pick rather than accept."},
    {b:"Practice two ways",p:"A standard quiz over words you choose, plus an AI mode that writes fresh sentences, and a flashcard mode with audio."}
  ]],
  ["numbers",[{b:"400+",s:"student users"},{b:"~70%",s:"returning weekly in peak SAT season"},{b:"1,000",s:"word list, seeded by hand"}]],
  ["lead",{k:"cx-lead",slot:"UI 00",ratio:"16/9",ghost:"Lead screenshot · the app open on a passage",cap:"<b>Contextuary.</b> The sentence never leaves the screen."}],
  ["figs",[
    {k:"cx-1",slot:"UI 01",ratio:"3/4",ghost:"My Words with the Daily Picks bar",cap:"Daily Picks sits on top of My Words as a bar, not a separate page, because a separate page is a chore."},
    {k:"cx-2",slot:"UI 02",ratio:"3/4",ghost:"context reading view",cap:"The reading view: meaning in place, Vietnamese gloss, common misread."},
    {k:"cx-3",slot:"UI 03",ratio:"3/4",ghost:"quiz or flashcard mode",cap:"Practice, scoped to the words you chose."}
  ]],
  ["strip",[
    {k:"cx-4",slot:"09",ratio:"4/3",ghost:"stats and streaks"},
    {slot:"10",ratio:"4/3",ghost:"word library, saved sentences"},
    {slot:"11",ratio:"4/3",ghost:"a student using it, phone in hand"}
  ]],
  ["kicker","Cut, and better for it"],
  ["pairs",[
    {h:"Spaced repetition",p:"Built the logic, removed it. It scheduled words nobody cared about that day and made opening the app feel like a debt."},
    {h:"Topic filters",p:"Nobody used them. Students think in tests, not categories."},
    {h:"A separate Today page",p:"One more tap to reach the thing they came for. Daily Picks moved to the top of My Words instead."}
  ]],
  ["kicker","What building it taught me"],
  ["para","Every feature I cut made the app better used: the topic filter, spaced repetition, the separate Today page. What people wanted was not more system. It was permission to choose today's words themselves and see the sentence again. Stack: Lovable and Supabase, deployed on Vercel."],
  ["links",[{href:"#/work/colorful-journey",label:"The Colorful Journey"},{href:"#/cv",label:"CV"}]]
]},

"/work/colorful-journey":{accent:"var(--blue)",where:"Work · The Colorful Journey",blocks:[
  ["kicker","Work · Co-founder, UX and UI"],
  ["title","The Colorful Journey"],
  ["lede","A group makes something together, then scatters. Six months later nobody can find it. The thing existed; the memory of it had nowhere to live."],
  ["para","The Colorful Journey is a project-memory archive: a place where a team, a class or a community can deposit the artefacts of something they built and come back to it as a whole rather than as scattered folders belonging to whoever happened to hold the camera."],
  ["pairs",[
    {h:"Design problem",p:"Archives are organised for retrieval. Memory is organised by who was there and what it felt like. The interface had to hold both."},
    {h:"Decision",p:"Entries are grouped by moment, not by file type, and every item keeps its contributor. Ownership stays visible while the collection becomes shared."},
    {h:"Where it connects",p:"The same instinct as the Nét Mơ activity journal: a group cannot inherit its own history unless somebody designs the handover."}
  ]],
  ["lead",{k:"cj-lead",slot:"UI 01",ratio:"16/9",ghost:"Lead screenshot · the archive, opened on one project",cap:"<b>Archive view.</b> Entries grouped by moment, not by file type."}],
  ["figs",[
    {k:"cj-1",slot:"UI 02",ratio:"4/3",ghost:"contributor view",cap:"Every item keeps its contributor, so ownership stays visible while the collection becomes shared."},
    {k:"cj-2",slot:"UI 03",ratio:"4/3",ghost:"timeline or moment view",cap:"A group can re-enter its own history without asking who had the camera."}
  ]],
  ["links",[{href:"#/work/contextuary",label:"Contextuary"},{href:"#/work/net-mo",label:"Nét Mơ"}]]
]},

"/research/two-doors":{accent:"var(--teal)",where:"Research · Two Doors",blocks:[
  ["kicker","Research · Nov 2025 to Feb 2026 · Lead author"],
  ["title","Two Doors Into the Same Room"],
  ["lede","Does expressive art-making or AI-guided reflective dialogue help a person express what they feel, and does the answer depend on who is walking in?"],
  ["pairs",[
    {h:"Condition A · Art",p:"A 45 minute expressive art-making session with materials and no requirement to explain the result out loud."},
    {h:"Condition B · AI",p:"A 45 minute guided reflective dialogue. Every participant used the same model version, checked at the start of the session, so the room was identical."}
  ]],
  ["steps",[
    {b:"Participants",p:"N = 68, recruited across schools and community groups, with art familiarity recorded before assignment."},
    {b:"Measures",p:"Pre and post mood, expressed emotional detail, and written reflection. Survey instruments built in Typeform and Google Forms."},
    {b:"Analysis",p:"SPSS. Interaction tested between condition and prior art familiarity rather than condition alone."},
    {b:"Supervision",p:"Advised by Nguyễn Phương Thảo, Bảo Sang Psychology Space. Co-authored with Trần Hoàng Anh Thư; prepared for submission to the National High School Journal of Science."}
  ]],
  ["lead",{k:"td-lead",slot:"Plate 01",ratio:"16/9",ghost:"Lead photograph · a session in progress, materials on the table",cap:"<b>Condition A.</b> Forty-five minutes, materials, no requirement to explain."}],
  ["strip",[
    {k:"td-1",slot:"02",ratio:"3/4",ghost:"handwritten coding notes"},
    {k:"td-2",slot:"03",ratio:"3/4",ghost:"survey instrument screenshot"},
    {k:"td-3",slot:"04",ratio:"3/4",ghost:"SPSS output"}
  ]],
  ["kicker","Findings"],
  ["para","The headline is not that one door is better. It is that the doors swap places. Participants with little prior art experience gained more from dialogue, where the structure is provided for them. Participants already fluent with materials gained more from making, where structure would only get in the way. Averaging the two conditions would have hidden the entire result."],
  ["quote","Seven participants finished the AI condition in a worse mood than they started."],
  ["para","They are in the paper, with the reflections they wrote. Reporting only the participants a method helped would make the study useless to anyone deciding whether to put it in front of a real teenager. The most common thread in those seven: being asked a good question at a moment when they had no way to leave the conversation."],
  ["kicker","What I am not claiming"],
  ["pairs",[
    {h:"Duration",p:"One session. Nothing here says anything about what either door does over a term."},
    {h:"Self-report",p:"Mood and expressed detail are reported by the person. Useful, and not the same as measured."},
    {h:"One model, one moment",p:"A single model version at a single point in time. The AI condition will not be the same room next year."}
  ]],
  ["kicker","Next questions"],
  ["para","Whether the crossover holds when the art condition is social rather than solitary. Whether the seven can be predicted in advance rather than counted afterwards. And whether an interface can be designed to hand structure to the people who need it and get out of the way of the people who do not."],
  ["links",[{href:"#/work/net-mo",label:"Where the question came from"},{href:"#/cv",label:"CV"}]]
]},


"/work/gather":{accent:"var(--orange)",where:"Work · Gathering people",blocks:[
  ["kicker","Work · 2024 to 2026 · Organiser"],
  ["title","Rooms with the lights turned up"],
  ["lede","Five rooms built for other people to fill. Same design questions as a workshop, only louder and with a budget."],
  ["steps",[
    {b:"Beats of Hope · charity concert, 2025",p:"Ten high school bands, 310+ tickets distributed across HCMC schools. I ran stage flow, artist coordination, and negotiated venue sponsorship in person. Around 25M VND net went to Little Smiles for a year of workshop materials across three partner hospitals."},
    {b:"Sol Sound · Nét Mơ OPEN",p:"The community branch's first night, 400+ attendees. Proof that the audience for children's art can be people the children never meet."},
    {b:"Cerberus Football League · 2024 to 2025",p:"Co-founded a multi-season amateur league: 15 teams, 200+ student-athletes, 600+ cumulative spectators. Scheduling, pitch procurement, brackets, budget, referees, safety protocol, and the account that made people show up."},
    {b:"Colors of the Pitch · two editions",p:"Football as the excuse, fundraising as the outcome, mixed teams as the actual design decision."},
    {b:"Tết ơi! · 2025 to 2026",p:"A school-wide music event for 2,400+ students, built with professional artists and school clubs."}
  ]],
  ["kicker","What an event taught me that a workshop could not"],
  ["pairs",[
    {h:"The first two minutes decide everything",p:"If nobody is given something to do immediately, the room stays an audience for the rest of the night."},
    {h:"Mixed teams beat balanced teams",p:"At Colors of the Pitch, sorting players across schools rather than by school changed who spoke to whom, and it kept changing after the final whistle."},
    {h:"Money is a design constraint, not a footnote",p:"Sponsorship terms shaped the room: where people entered, what was on the walls, how long they stayed."}
  ]],
  ["numbers",[
    {b:"400+",s:"at Sol Sound"},{b:"310+",s:"tickets, Beats of Hope"},
    {b:"200+",s:"athletes in the league"},{b:"2,400+",s:"students at Tết ơi!"},
    {b:"25M VND",s:"to Little Smiles"}
  ]],
  ["lead",{k:"gt-lead",slot:"Plate 01",ratio:"16/9",ghost:"Lead photograph · the room full, from the stage",cap:"<b>Beats of Hope.</b> The two minutes before the first band."}],
  ["figs",[
    {k:"gt-1",slot:"Plate 02",ratio:"3/4",ghost:"Sol Sound, crowd from the side",cap:"Sol Sound, from the side of the stage."},
    {k:"gt-2",slot:"Plate 03",ratio:"3/4",ghost:"backstage, artist coordination",cap:"Backstage. Most of the design work happens here."},
    {k:"gt-3",slot:"Plate 04",ratio:"3/4",ghost:"Colors of the Pitch, mixed teams",cap:"Mixed teams, deliberately."}
  ]],
  ["strip",[
    {k:"gt-4",slot:"05",ratio:"4/3",ghost:"ticket stubs and set list"},
    {k:"gather-3",slot:"06",ratio:"4/3",ghost:"league bracket sheet"},
    {k:"gather-4",slot:"07",ratio:"4/3",ghost:"Tết ơi! stage, 2,400 students"}
  ]],
  ["links",[{href:"#/work/net-mo",label:"Nét Mơ"},{href:"#/exhibition",label:"Exhibition"},{href:"#/cv",label:"CV"}]]
]},

"/about":{accent:"var(--pink)",where:"About",blocks:[
  ["kicker","About"],
  ["title","Triệu Ngọc Gia Hân"],
  ["lede","Grade 12 at Trưng Vương High School, Ho Chi Minh City. I work in Vietnamese and English, and I have been drawing since I was five, which is probably where the noticing started."],
  ["para","Drawing is slow looking. You cannot draw a room without registering where the light falls and who is sitting where. Somewhere between an observational sketch and a shelter workshop, I stopped being interested in the drawing and started being interested in the room."],
  ["pairs",[
    {h:"Making",p:"Digital painting, observational drawing, photography. A pink, orange and teal palette I keep returning to. Mostly self-taught."},
    {h:"Reading",p:"Psychology and cognitive science. Coursera Foundations of Neuroscience and Introduction to Psychology, applied directly to session design."},
    {h:"Building",p:"Interfaces, when a question needs to keep running after I stop watching it."},
    {h:"Gathering",p:"Concerts, tournaments, exhibitions. Rooms with the volume up."}
  ]],
  ["strip",[
    {k:"ab-1",slot:"01",ratio:"3/4",ghost:"a sketchbook spread"},
    {k:"ab-2",slot:"02",ratio:"3/4",ghost:"working at the desk"},
    {k:"ab-3",slot:"03",ratio:"3/4",ghost:"in a room, mid-session"}
  ]],
  ["note","Also: Head of Academic Affairs of a school psychology club, R&D at a youth mental-fitness startup, an EEG and brain-mapping internship, eleven consecutive years as class president, and a national silver in a water rocket competition, which is a longer story."],
  ["links",[{href:"#/cv",label:"The dated version"},{href:"#/exhibition",label:"Exhibition"}]]
]},

"/cv":{accent:"var(--blue)",where:"CV",blocks:[
  ["kicker","Curriculum vitae · updated 2026"],
  ["title","The facts, dated"],
  ["kicker","Founded and led"],
  ["rows",[
    {t:"2024 – now",h:"Nét Mơ (Traces of Dreams) · Founder and Director",p:"Arts-based SEL programme for children in shelters and elderly residents in care facilities. 25-member team across R&D, Tech, Events and PR. 200+ children, 6 shelters, 2 care facilities, ~75M VND raised. Legal sponsorship by Bảo Sang."},
    {t:"2026",h:"Once Upon The Inside · Co-producer",p:"Mixed-media exhibition with The APRIL Collective at May Artspace. 300+ visitors."},
    {t:"2025",h:"Beats of Hope · Organiser",p:"Charity concert, 10 school bands, 310+ tickets, ~25M VND net to Little Smiles for a year of hospital workshop materials."},
    {t:"2024 – 2025",h:"Cerberus Football League · Co-founder",p:"15 teams, 200+ student-athletes, 600+ cumulative spectators. Scheduling, budget, referees, safety protocol."}
  ]],
  ["kicker","Research"],
  ["rows",[
    {t:"2025 – 2026",h:"Two Doors Into the Same Room · Lead author",p:"Mixed-methods study, N = 68, expressive art-making versus AI-guided reflective dialogue. Crossover interaction by art familiarity. SPSS. Prepared for NHSJS. Advised by Nguyễn Phương Thảo."},
    {t:"2026",h:"Brainlife · Research intern",p:"EEG and brain-mapping training, data cleaning, student survey work."},
    {t:"2025",h:"Coursera",p:"Foundations of Neuroscience; Introduction to Psychology."}
  ]],
  ["kicker","Built"],
  ["rows",[
    {t:"2026 – now",h:"Contextuary",p:"SAT vocabulary in context. Lovable and Supabase, deployed on Vercel. 400+ users, ~70% weekly return."},
    {t:"2025 – now",h:"The Colorful Journey · Co-founder, UX and UI",p:"Project-memory archive platform."},
    {t:"2025",h:"Nét Mơ activity journal",p:"Three-role permission system, media upload, calendar, deadline board."}
  ]],
  ["kicker","Selected honours"],
  ["rows",[
    {t:"2026",h:"International Psychology Olympiad",p:"Highest Distinction, Regional Top 1. Annual Final: Advanced Thinking 165/200, Integrated Objective 180/200."},
    {t:"2025",h:"RAISE AI national competition",p:"Silver, 2nd of 450+. Essay: To Think or to Prompt: The Future of Human Intellect in Education."},
    {t:"2025",h:"HCMC Youth & Children Creativity Contest",p:"Second Prize, emotion card deck."},
    {t:"2025",h:"Trưng Vương High School",p:"Most Well-Rounded Student, Grade 11."},
    {t:"2023",h:"Vietnam Water Rocket Competition",p:"National silver, team lead, top scorer Southern Region."}
  ]],
  ["links",[{href:"#/about",label:"About"},{href:"#/work/net-mo",label:"Nét Mơ"},{href:"#/research/two-doors",label:"Research"}]]
]}
};

/* ---------- exhibition · a small hang, then the full gallery ---------- */
const ARCHIVE=[
  {t:"Open door",p:"Watercolour",d:"2025",n:"The first page of my art portfolio. A door left open, flowers on the outside of it.",ratio:"3/4",span:3,hang:0},
  {t:"Two souls, sparking",p:"Acrylic on canvas",d:"2025",n:"Two dancing figures among firing neurons. Pastel pink, teal and gold, with sculpted flower accents built up off the surface.",ratio:"1/1",span:5,hang:38},
  {t:"District 1, in ink",p:"Ink on paper",d:"2024",n:"Architecture study, drawn standing up, which is why the balconies lean.",ratio:"2/3",span:2,hang:12},
  {t:"Portrait",p:"Coloured pencil",d:"2024",n:"A child who sat still for eleven minutes, a personal record for both of us.",ratio:"3/4",span:3,hang:64},
  {t:"Eye canvas",p:"Mixed media",d:"2025",n:"Part of a series about looking at looking.",ratio:"4/5",span:4,hang:0},
  {t:"Lilies",p:"Acrylic",d:"2024",n:"Painted the week before an exhibition deadline, which shows.",ratio:"3/4",span:3,hang:26}
];
function exhibitionHTML(){
  return `${B.kicker("Exhibition · a small hang")}${B.title("Six works on one wall")}
  ${B.lede("Painting is where the noticing started. Take a piece off the wall to look at it properly, then walk through to the rest.")}
  <div class="gallery" id="gallery">
    <span class="gallery__rail" aria-hidden="true"></span>
    <span class="gallery__spot" id="gallerySpot" aria-hidden="true"></span>
    <span class="gallery__floor" aria-hidden="true"></span>
    <div class="gallery__wall">${ARCHIVE.map((a,i)=>`
      <button class="work" data-obj="${i}" type="button" style="grid-column:span ${a.span};margin-top:${a.hang}px"
        aria-label="${a.t}, ${a.p}, ${a.d}. Open to inspect.">
        <span class="work__frame">
          <span class="work__plate" data-img="art-${i+1}" style="--ratio:${a.ratio}"><span class="fig__ghost">${a.t}</span></span>
        </span>
        <span class="work__label">
          <b>${a.t}</b>
          <span>${a.p} · ${a.d}</span>
          <span class="work__peek">Inspect</span>
        </span>
      </button>`).join("")}</div>
    <div class="gallery__cta">
      <p class="mono" style="text-transform:none;letter-spacing:.04em">Six of them. The rest of the collection, including the Nét Mơ children's work, hangs in the virtual gallery.</p>
      <a class="btn btn--ink" href="https://example.com/virtual-gallery" data-replace="gallery-url" target="_blank" rel="noopener">Enter the full exhibition →</a>
    </div>
  </div>
  ${B.links([{href:"#/about",label:"About the practice"},{href:"#/work/net-mo",label:"Nét Mơ"},{href:"#/cv",label:"CV"}])}`;
}

/* ---------- router ---------- */
(function(){
  const room=$("#room"), inner=$("#roomInner"), closeBtn=$("#roomClose");
  let lastY=0, lastFocus=null;
  const where=$("#roomWhere");
  function render(route){
    if(route==="/exhibition"||route==="/archive"){
      inner.innerHTML=exhibitionHTML();
      room.style.setProperty("--accent","var(--orange)");
      where.textContent="Exhibition";
      bindArchive();
    }
    else{
      const r=ROOMS[route]; if(!r){ try{ location.hash=""; }catch(err){} return; }
      room.style.setProperty("--accent",r.accent);
      where.textContent=r.where||"Deeper";
      inner.innerHTML=r.blocks.map(([type,arg])=>B[type](arg)).join("");
    }
    paintMedia(inner);
    $$("[data-uncover],[data-part],[data-mask]",inner).forEach(el=>io.observe(el));
    room.scrollTop=0;
  }
  function open(route){
    lastY=window.scrollY; lastFocus=document.activeElement;
    render(route);
    room.classList.add("is-open"); document.body.classList.add("is-locked");
    room.setAttribute("aria-hidden","false"); room.focus();
  }
  function close(){
    room.classList.remove("is-open"); room.setAttribute("aria-hidden","true");
    document.body.classList.remove("is-locked");
    window.scrollTo(0,lastY);
    lastFocus && lastFocus.focus && lastFocus.focus();
  }
  function route(){
    const h=location.hash;
    if(h.startsWith("#/")) open(h.slice(1));
    else if(room.classList.contains("is-open")) close();
  }
  window.openRoom=open;
  window.roomIsOpen=()=>room.classList.contains("is-open");
  addEventListener("hashchange",route);
  closeBtn.addEventListener("click",()=>{
    try{ history.pushState("",document.title,location.pathname+location.search); }catch(err){}
    close();
  });
  addEventListener("keydown",e=>{ if(e.key==="Escape" && room.classList.contains("is-open")) closeBtn.click(); });
  route();
})();

/* ---------- deep-space links ----------
   A story-behind-this link opens in its own tab so the main scroll keeps
   its place. If the browser blocks that (sandboxed previews do), the same
   room opens in place instead, so a click always leads somewhere.
------------------------------------------------------------------ */
document.addEventListener("click",e=>{
  const a=e.target.closest ? e.target.closest('a[href^="#/"]') : null;
  if(!a || a.dataset.inline==="1") return;
  const route=a.getAttribute("href").slice(1);
  e.preventDefault();
  /* already inside a deeper room: move sideways, do not spawn tabs */
  if(window.roomIsOpen && window.roomIsOpen()){
    if(window.openRoom) window.openRoom(route);
    try{ history.replaceState(null,"","#"+route); }catch(err){}
    return;
  }
  let win=null;
  try{ win=window.open(location.href.split("#")[0]+"#"+route,"_blank","noopener"); }catch(err){}
  if(win){ try{ win.opener=null; }catch(err){} return; }
  if(window.openRoom){
    window.openRoom(route);
    try{ history.replaceState(null,"","#"+route); }catch(err){}
  }
},true);

/* ---------- archive object view ---------- */
function bindArchive(){
  const ov=$("#object"), plate=$("#objectPlate");
  let idx=0;
  function show(i){
    idx=(i+ARCHIVE.length)%ARCHIVE.length;
    const a=ARCHIVE[idx];
    plate.style.setProperty("--ratio",a.ratio);
    const src=MEDIA["art-"+(idx+1)];
    plate.style.backgroundImage=src?`url("${src}")`:"none";
    plate.innerHTML=src?"":`<span class="mono">${a.t}</span>`;
    $("#objTitle").textContent=a.t;
    $("#objNote").textContent=a.n;
    $("#objMeta").textContent=`${a.p} · ${a.d} · ${String(idx+1).padStart(2,"0")} of ${ARCHIVE.length}`;
  }
  function open(i){ show(i); ov.classList.add("is-open"); }
  function close(){ ov.classList.remove("is-open"); }
  const works=$$("[data-obj]");
  works.forEach(b=>b.addEventListener("click",()=>open(+b.dataset.obj)));
  /* hang the works one after another, as if the room is being lit */
  works.forEach((b,i)=>{
    if(REDUCED){ b.classList.add("hung"); return; }
    setTimeout(()=>b.classList.add("hung"),120+i*55);
  });
  /* the light follows you along the wall */
  const gal=$("#gallery"), spot=$("#gallerySpot");
  if(gal&&spot&&!REDUCED&&!COARSE){
    gal.addEventListener("pointermove",e=>{
      const r=gal.getBoundingClientRect();
      spot.style.left=(e.clientX-r.left)+"px";
      spot.style.top=(e.clientY-r.top)+"px";
    });
  }
  $("#objPrev").onclick=()=>show(idx-1);
  $("#objNext").onclick=()=>show(idx+1);
  $("#objClose").onclick=close;
  ov.onclick=e=>{ if(e.target===ov) close(); };
  addEventListener("keydown",e=>{
    if(!ov.classList.contains("is-open")) return;
    if(e.key==="Escape") close();
    if(e.key==="ArrowRight") show(idx+1);
    if(e.key==="ArrowLeft") show(idx-1);
  });
}
