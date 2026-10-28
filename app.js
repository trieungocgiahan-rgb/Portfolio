addEventListener("error",e=>{ console.warn("[site] caught:",e.message||e); });

/* ============================================================
   MEDIA · drop real image URLs here, keys match data-img
   A value is either a path, or an object when the photograph needs more:
     "nm-lead": {src:"img/nm-lead.jpg", alt:"what is in the picture",
                 pos:"50% 30%",   // focal point of the crop (x y)
                 fit:"contain"}   // show the whole image instead of cropping
   The frame keeps its ratio either way; the image is never stretched.
   ============================================================ */
const MEDIA = {
  "hero-door":{src:"img/hero-door.jpg",alt:"A workshop on a shelter floor: a girl leans in towards a boy holding up a crayon drawing while two younger children lie on the floor beside them.",pos:"50% 42%"},
  "rooms-hall":{src:"img/rooms-hall.jpg",alt:"Two people hug and smile in a shelter hall. Behind them, children work at small plastic tables beside a standing fan."},
  "rooms-hands":"", "sheet-2":"",
  "gather-2":{src:"img/gather-2.jpg",alt:"Beats of Hope, seen from the stage: a singer in a white T-shirt faces a packed crowd under pink and green lights, hands raised, people singing along.",pos:"45% 50%"},
  /* the exhibition's own works register themselves from ARCHIVE below */
  /* rooms: the photograph in each room's door (-lead), then its evidence plates */
  "nm-lead":{src:"img/nm-lead.jpg",alt:"From above: children’s hands reach toward a shared floor painting of crayon and clay panels.",pos:"50% 50%"},
  "nm-1":{src:"img/nm-1.jpg",alt:"Gia Han leans in to talk with a child at a small blue table, while two boys draw in the foreground beside a box of oil pastels.",pos:"50% 45%"},
  "nm-2":{src:"img/nm-2.jpg",alt:"Two care-home sessions: Gia Han shows a paper flower to an older man, then leans in to talk with an older woman.",pos:"50% 30%"},
  "nm-3":{src:"img/nm-3.jpg",alt:"Two children’s drawings held up side by side: a singer in pixel sunglasses and a grinning strongman with a gold chain.",pos:"52% 50%"},
  "nm-5":{src:"img/nm-5.jpg",alt:"Colors of Joy in Hanoi: a girl paints a small canvas at a long studio table covered in paint jars, with others painting beside her.",pos:"72% 55%"},
  "nm-6":{src:"img/nm-6.jpg",alt:"Colors of Joy in Hanoi: a facilitator leans over to paint alongside two young children at a table.",pos:"50% 62%"},
  "nm-4":{src:"img/nm-4.jpg",alt:"A classroom of children and volunteers making finger hearts and holding up the paper crafts they made.",pos:"50% 55%"},
  "gt-lead":{src:"img/gt-lead.jpg",alt:"Sol Sound, from behind the band: a bass player faces the crowd under stage lights, in sepia.",pos:"58% 50%"},
  "gt-1":{src:"img/gt-1.jpg",alt:"The Sol Sound team posing in front of a red tinsel curtain with the Sol Sound sign.",pos:"50% 45%"},
  "gt-2":{src:"img/gt-2.jpg",alt:"Sol Sound: a row of people clapping along, in sepia, their hands blurred with movement.",pos:"55% 50%"},
  "gt-4":{src:"img/gt-4.jpg",alt:"The Beats of Hope poster: A night full of music and smiles, with a group photo of the bands and the Little Smiles team.",fit:"contain"},
  "gt-5":{src:"img/gt-5.jpg",alt:"A student band on stage at Beats of Hope under pink light, holding guitars and a bouquet after its set.",pos:"56% 72%"},
  "td-lead":"",
  "cx-home":{src:"img/cx-home.jpg",alt:"Contextuary’s home page: Understand words. In context. For real. Beside it, an SAT passage with the word ubiquitous, its AI word card, a sample quiz and a mastery ring."},
  "cx-1":{src:"img/cx-1.jpg",alt:"Contextuary’s My Words library: each saved word with its Vietnamese meaning, an SAT-style example, a status and a topic tag, beside a weekly overview."},
  "cx-2":{src:"img/cx-2.jpg",alt:"A Contextuary fill-in-the-blank question, 2 of 20: During the debate, the candidate’s blank point resonated with undecided voters, with four answer choices."},
  "cx-3":{src:"img/cx-3.jpg",alt:"Contextuary’s Start practice panel: Practice or AI Challenge, quiz or flashcards, which words, how many, and six question types."},
  "cj-lead":{src:"img/cj-lead.jpg",alt:"Together’s home page: Our story, written together, beside a shared October calendar with coloured activity bars, a voice note and a completed workshop card."},
  "cj-1":{src:"img/cj-1.jpg",alt:"Together’s sample project: a month calendar with a kick-off workshop, a team meeting, a field survey and a launch event, and a workshop card below."},
  /* events: one photograph per gathering, filled as they arrive */
  "ev-tet":"", "ev-pitch":"", "ev-league":"", "ev-rocket":"", "ev-sciphony":"", "ev-identity":"", "ev-tours":"",
  /* research rooms: never participants; the work, the team, the tools */
  "rs-1":"", "rs-2":"", "tc-1":"", "tc-2":"", "bl-1":"", "bl-2":"",
  "ab-2":{src:"img/about-portrait.jpg",alt:"Gia Han in her school uniform, smiling and holding up a pink crayon; the project’s Vietnamese name, a crown and yellow scribbles are drawn over the photograph.",pos:"50% 38%"}
};
/* ============================================================
   EVENT LINKS · paste a URL and the event card links out to it.
   Empty ones point to the Gather page instead.
   ============================================================ */
const EVENT_LINKS = {
  "beats-of-hope":"",
  "sol-sound":"",
  "cerberus-league":"",
  "tet-oi":"",
  "colors-of-the-pitch":""
};
/* ============================================================
   FILMS · the screening room under the Exhibition wall.
   Paste each film's YouTube link (any form: youtu.be/…, watch?v=…,
   /shorts/…) with its title, year and one line. The video only loads
   when a viewer presses play. Entries without a link show as "coming".
   ============================================================ */
const FILMS = [
  {t:"Film 01", d:"", n:"", url:""},
  {t:"Film 02", d:"", n:"", url:""},
  {t:"Film 03", d:"", n:"", url:""}
];
const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const COARSE = window.matchMedia("(hover:none)").matches;
const $ = (s,c=document)=>c.querySelector(s);
const $$ = (s,c=document)=>[...c.querySelectorAll(s)];

/* ---------- no lonely words ----------
   The last line of a paragraph never holds only one or two words. The last
   three words are tied with non-breaking spaces (two for large type), so they
   travel together. A tie is skipped when the tied words would be too wide for
   the narrowest phone line, so nothing is ever forced to break mid-word.
   text-wrap:pretty does the same where the browser supports it; this keeps it
   true in every browser, iPad Safari included. */
const TIE_SEL="p, li, dd, figcaption, h1, h2, h3, h4, .bridge__text";
function tieLastWords(scope=document){
  const els=scope.matches&&scope.matches(TIE_SEL)?[scope]:$$(TIE_SEL,scope);
  els.forEach(el=>{
    if(el.dataset.tied||el.closest("button, .chapnav, svg")) return;
    const cs=getComputedStyle(el);
    if(/flex|grid/.test(cs.display)) return;
    /* only text that flows inline inside this element */
    const nodes=[]; const tw=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);
    let n; while((n=tw.nextNode())){
      let ok=true; for(let q=n.parentElement;q&&q!==el;q=q.parentElement){ if(getComputedStyle(q).display!=="inline"){ ok=false; break; } }
      if(ok) nodes.push(n);
    }
    const text=nodes.map(t=>t.data).join("");
    const words=text.trim().split(/\s+/);
    if(words.length<4) return;
    /* the tied words must fit comfortably on one line of this element */
    const size=parseFloat(cs.fontSize)||16, maxChars=Math.floor(Math.min(el.clientWidth||300,720)*.9/(size*.45)); /* a rough first guess; fitTie measures the real width after */
    let tie=3;
    while(tie>1 && words.slice(-tie).join(" ").length>maxChars) tie--;
    if(tie<2) return;
    el.dataset.tied="1";
    /* usual case: the last words sit in one text node, so wrap them in a span that
       never breaks (not even at a hyphen, as in "in-depth") */
    const last=nodes[nodes.length-1], m=last&&last.data.match(new RegExp("(\\S+(?:\\s+\\S+){"+(tie-1)+"})\\s*$"));
    if(m){
      const tail=last.splitText(m.index), span=document.createElement("span");
      span.className="tie"; tail.parentNode.insertBefore(span,tail); span.appendChild(tail);
      fitTie(span);
      return;
    }
    /* otherwise tie across inline elements with non-breaking spaces */
    let left=tie-1, seenWord=false;
    for(let i=nodes.length-1;i>=0&&left>0;i--){
      const d=nodes[i].data.split("");
      for(let j=d.length-1;j>=0&&left>0;j--){
        if(/\s/.test(d[j])){ if(seenWord){ let k=j; while(k>0&&/\s/.test(d[k-1])){ d[k]=""; k--; } d[k]="\u00A0"; j=k; left--; seenWord=false; } }
        else seenWord=true;
      }
      nodes[i].data=d.join("");
    }
  });
}

/* a tie wider than its line is let go again, so a word never has to break */
function fitTie(span){
  const box=span.parentElement.closest(TIE_SEL)||span.parentElement;
  if(span.getBoundingClientRect().width>box.clientWidth*.92){ span.replaceWith(...span.childNodes); }
}
let tieTimer=0;
addEventListener("resize",()=>{ clearTimeout(tieTimer); tieTimer=setTimeout(()=>$$(".tie").forEach(fitTie),150); },{passive:true});

const media=key=>{ const m=MEDIA[key]; return !m ? null : typeof m==="string" ? {src:m} : m; };
function paintMedia(scope=document){
  $$("[data-img]",scope).forEach(el=>{
    const m=media(el.dataset.img);
    if(!m || !m.src || el.classList.contains("has-img")) return;
    const img=document.createElement("img");
    img.className="fig__img"; img.src=m.src; img.alt=m.alt||""; img.decoding="async";
    if(el.closest("#hero")) img.fetchPriority="high"; else img.loading="lazy";
    if(m.pos) el.style.setProperty("--pos",m.pos);
    if(m.fit) el.style.setProperty("--fit",m.fit);
    el.prepend(img); el.classList.add("has-img");
  });
}
paintMedia();
tieLastWords(document.body);
/* an event link appears only once its URL is filled in */
function wireEvents(scope=document){
  scope.querySelectorAll("[data-event]").forEach(a=>{
    const url=EVENT_LINKS[a.dataset.event];
    if(!url) return;
    a.href=url; a.target="_blank"; a.rel="noopener";
    const row=a.closest("[data-event-row]");
    if(row) row.hidden=false;
  });
}

/* chapter colour, used by nav, rail and the ambient layer */
const CHAPTERS={
  hero:{hex:"#EE4187",dark:true,palette:["#EE4187","#F2872F","#2B4DE0","#F7EFE2"]},
  dusk:{hex:"#EE4187",dark:true,palette:["#EE4187","#F2872F","#F7EFE2"]},
  "ch-me":{hex:"#EE4187",palette:["#EE4187","#F2872F","#0F918B"]},
  "ch-notice":{hex:"#EF6A45",palette:["#EF6A45","#EE4187","#F2872F"]},
  "ch-study":{hex:"#6A4BD6",palette:["#6A4BD6","#0F918B","#EE4187"]},
  "ch-make":{hex:"#2B4DE0",palette:["#2B4DE0","#6A4BD6","#0F918B"]},
  "ch-gather":{hex:"#F2872F",dark:true,palette:["#F2872F","#EE4187","#F7EFE2"]},
  "ch-draw":{hex:"#EE4187",palette:["#EE4187","#F2872F","#6A4BD6"]},
  "ch-close":{hex:"#0F918B",palette:["#0F918B","#2B4DE0","#EE4187"]},
  "ch-more":{hex:"#EE4187",palette:["#EE4187","#F2872F","#2B4DE0"]},
  footer:{hex:"#EE4187",dark:true,palette:["#EE4187","#F2872F","#F7EFE2"]}
};
let CURRENT="hero";

/* ---------- threshold ---------- */
(function(){
  const th=$("#threshold"), btn=$("#knockBtn"), mast=$("#masthead"), t=$("#local-time");
  if(t){ try{ t.textContent=new Intl.DateTimeFormat("en-GB",{hour:"2-digit",minute:"2-digit",timeZone:"Asia/Ho_Chi_Minh"}).format(new Date()); }catch(e){} }
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
    window.scrollTo(0,0); history.replaceState(null,"","#hero");
  }
  if(sessionStorage.getItem("entered") || location.hash.startsWith("#/")){ th.hidden=true; mast.hidden=false; document.body.classList.add("has-entered"); }
  else{ document.body.classList.add("is-locked"); setTimeout(()=>btn.focus(),300); }
  /* one knock is enough: the door lights up, then opens */
  btn?.addEventListener("click",()=>{
    btn.classList.add("is-knocking","k3"); btn.disabled=true;
    setTimeout(enter,REDUCED?0:320);
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
  $$('.navlink, .dots a, .bridge, a.btn[href^="#ch-"], a.brand[href^="#"]').forEach(a=>{
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
    btn.setAttribute("aria-expanded",String(v)); $(".doorbell__label",btn).textContent=v?"Close":"Rooms";
    if(v) setTimeout(()=>$(".doors__list a",doors)?.focus(),340);
  };
  btn.addEventListener("click",()=>open(!doors.classList.contains("is-open")));
  $$("[data-close-doors]").forEach(e=>e.addEventListener("click",()=>open(false)));
  $$(".doors__list a").forEach(a=>a.addEventListener("click",()=>open(false)));
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
    door.style.transform=`translate3d(${x*14}px,${y*10}px,0) rotateY(${x*-5}deg)`;
  });
  hero.addEventListener("pointerleave",()=>{ door.style.transform=""; });
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
    delete note.dataset.tied;
    note.textContent=on
      ? "One shared world, one shared tray. Children negotiate colours, narrate for each other, and keep going after the facilitator steps back."
      : "Children work in parallel. Materials stay where they were placed. Most talk goes to the facilitator.";
    tieLastWords(note);
    $$(".tray__switch button").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.mode===mode)));
  }
  $$(".tray__switch button").forEach(b=>b.addEventListener("click",()=>set(b.dataset.mode)));
  set("free");
  /* the stage takes its height from the layout, so re-lay the crayons whenever it changes size */
  const relayout=()=>{ const active=$('.tray__switch button[aria-pressed="true"]'); if(active) layout(active.dataset.mode); };
  if(window.ResizeObserver) new ResizeObserver(relayout).observe(stage); else addEventListener("resize",relayout);
})();

/* ---------- drag-to-scroll for horizontal artefacts ---------- */
function dragScroll(el){
  if(!el) return;
  let down=false,x=0,left=0,moved=false;
  el.addEventListener("pointerdown",e=>{ if(e.pointerType==="mouse"){ down=true;moved=false;x=e.clientX;left=el.scrollLeft;el.classList.add("is-dragging"); } });
  addEventListener("pointerup",()=>{ down=false; el.classList.remove("is-dragging"); });
  addEventListener("pointermove",e=>{ if(down){ if(Math.abs(e.clientX-x)>5) moved=true; el.scrollLeft=left-(e.clientX-x); } });
  el.addEventListener("click",e=>{ if(moved){ e.preventDefault(); e.stopPropagation(); moved=false; } },true);
  el.addEventListener("dragstart",e=>e.preventDefault());
  const nudge=new IntersectionObserver(es=>{
    es.forEach(e=>{ if(e.isIntersecting && !REDUCED){
      el.scrollTo({left:40,behavior:"smooth"});
      setTimeout(()=>el.scrollTo({left:0,behavior:"smooth"}),600);
      nudge.unobserve(e.target);
    }});
  },{threshold:.4});
  nudge.observe(el);
}

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
const fig=(o)=>`<figure class="fig${o.screen?" fig--screen":""}" data-uncover><div class="fig__plate" data-img="${o.k||''}" data-slot="${o.slot||''}" style="--ratio:${o.ratio||'4/5'}${o.pos?`;--pos:${o.pos}`:""}"><div class="fig__ghost">${o.ghost||'Replace with photograph'}</div></div>${o.cap?`<figcaption>${o.cap}</figcaption>`:""}</figure>`;

/* an interface seen whole, in a browser window: never cropped, never squeezed */
const screenFrame=o=>{ const [w,h]=o.ratio.split("/").map(Number); return `<figure class="browser" style="--ar:${(w/h).toFixed(3)}">
  <div class="browser__bar" aria-hidden="true"><i></i><i></i><i></i><span>${o.url||""}</span></div>
  <div class="fig__plate browser__plate" data-img="${o.k}" style="--ratio:${o.ratio}"><div class="fig__ghost">${o.ghost||""}</div></div>
  ${o.cap?`<figcaption>${o.cap}</figcaption>`:""}
</figure>`; };

/* the top of every room: navy like the entrance, the photograph seen through a door */
const hero=o=>`<header class="room-hero">
  <div class="room-hero__text">
    ${o.logo?`<img class="room-hero__logo" src="${o.logo}" alt="${o.logoAlt||""}" width="480" height="480">`:""}
    ${o.wordmark?`<img class="room-hero__wordmark" src="${o.wordmark}" alt="" height="64">`:""}
    <p class="room__kicker">${o.kicker}</p>
    <h2 id="roomTitle"${o.wordmark?' class="vh"':""}>${o.title}</h2>
    ${o.sub?`<p class="room-hero__sub">${o.sub}</p>`:""}
    ${o.lede?`<p class="room-hero__lede">${o.lede}</p>`:""}
    ${o.facts?`<p class="stats">${o.facts.map(f=>`<span><b>${f.b}</b> ${f.s}</span>`).join("")}</p>`:""}
    ${o.meta?`<p class="mono mono--sentence room-hero__meta">${o.meta}</p>`:""}
  </div>
  <div class="room-hero__door${o.k||o.art||o.marks?"":" is-empty"}"${o.k?"":` aria-hidden="true"`}>
    <div class="room-hero__open fig__plate${o.screen?" fig--screen":""}" data-img="${o.k||""}" data-slot="">${o.marks?`<div class="room-hero__marks${o.marks.length===1?" room-hero__marks--one":""}">${o.marks.map(m=>`<img src="${m}" alt="" width="300" height="300">`).join("")}</div>`:o.art?`<svg class="room-hero__art" viewBox="0 0 120 150">${o.art}</svg>`:`<div class="fig__ghost">${o.ghost||""}</div>`}</div>
  </div>
</header>`;

const B={
  hero,
  kicker:t=>typeof t==="string"?`<p class="room__kicker">${t}</p>`:`<p class="room__kicker" id="room-${t.id}">${t.t}</p>`,
  title:t=>`<h2 id="roomTitle">${t}</h2>`,
  /* a second project inside the same room */
  subtitle:t=>`<h2 class="room__sub">${t}</h2>`,
  lede:t=>`<p class="blk blk--lede">${t}</p>`,
  para:t=>`<p class="blk blk--para">${t}</p>`,
  quote:t=>`<p class="blk blk--quote">${t}</p>`,
  note:t=>`<p class="blk note">${t}</p>`,
  fig:o=>`<div class="blk">${fig(o)}</div>`,
  lead:o=>`<div class="blk blk--lead">${fig(o)}</div>`,
  strip:a=>`<div class="blk blk--strip" data-n="${a.length}">${a.map(fig).join("")}</div>`,
  figs:a=>`<div class="blk blk--figs" data-n="${a.length}">${a.map(fig).join("")}</div>`,
  steps:a=>`<ol class="blk blk--steps">${a.map(s=>`<li><div><b>${s.b}</b><p>${s.p}</p>${s.event?`<p class="aside-link" data-event-row hidden><a data-event="${s.event}" href="#">Event page ↗</a></p>`:""}</div></li>`).join("")}</ol>`,
  numbers:a=>`<div class="blk numbers">${a.map(n=>`<div><b>${n.b}</b><span>${n.s}</span></div>`).join("")}</div>`,
  pairs:a=>`<div class="blk blk--pairs" data-n="${a.length}">${a.map(p=>`<div><h4>${p.h}</h4><p>${p.p}</p></div>`).join("")}</div>`,
  rows:a=>`<div class="blk">${a.map(r=>`<div class="cv-row"><p class="mono">${r.t}</p><div><h4>${r.h}</h4><p>${r.p}</p></div></div>`).join("")}</div>`,
  contact:a=>`<div class="blk">${a.map(c=>`<a class="contact-line" href="${c.href}"${c.replace?` data-replace="${c.replace}"`:""}><span>${c.label}</span><span>${c.value}</span></a>`).join("")}</div>`,
  /* the honours in their three groups; each story opens in place */
  awards:()=>`<div class="blk awards">
    <div class="awards__bar"><p class="mono mono--sentence">Each honour has a short story behind it.</p><button class="awards__all" type="button" aria-pressed="false">Open every story</button></div>
    ${AWARD_GROUPS.map(g=>{ const list=AWARDS.filter(a=>a.g===g.id); return `<section class="awards__group" style="--dc:${g.dc}">
      <h3 class="awards__label"><span>${g.label}</span><i aria-hidden="true"></i><span>${list.length}</span></h3>
      ${list.map(a=>`<details class="award">
        <summary><span class="award__year">${a.t}</span><svg class="award__mark" viewBox="0 0 24 24" aria-hidden="true">${AWARD_MARKS[a.m]}</svg><span class="award__head"><b>${a.h}</b><span>${a.p}</span></span><span class="award__toggle"><span>Behind the award</span></span></summary>
        <p class="award__story">${a.s}</p>
      </details>`).join("")}
    </section>`; }).join("")}
  </div>`,
  about:()=>aboutHTML(),
  /* a product, introduced on one line: its mark, its name, my role, and the way to the real thing */
  product:o=>`<section class="product" id="room-${o.id}">
    <header class="product__head">
      <img class="product__logo" src="${o.logo}" alt="${o.logoAlt||""}" width="300" height="300">
      <div class="product__id"><p class="room__kicker">${o.kicker}</p><h3 class="product__name">${o.name}</h3></div>
      <a class="btn btn--ink product__visit" href="${o.href}" target="_blank" rel="noopener">${o.label} ↗</a>
    </header>
    <p class="product__lede">${o.lede}</p>
    ${o.facts?`<div class="product__facts">${o.facts.map(f=>`<p><b>${f.b}</b><span>${f.s}</span></p>`).join("")}</div>`:""}
    ${o.shot?screenFrame(o.shot):""}
  </section>`,
  /* screens side by side, each as wide as its own proportions so their heights match */
  screens:a=>`<div class="blk browsers">${a.map(screenFrame).join("")}</div>`,
  /* a pain point drawn as work: every step it used to take, crossed out, then what is left */
  flow:o=>`<div class="blk flow">
    <div class="flow__col flow__col--before"><p class="flow__label">${o.before.label}</p><ol>${o.before.steps.map(x=>`<li><s>${x}</s></li>`).join("")}</ol></div>
    <div class="flow__arrow" aria-hidden="true">→</div>
    <div class="flow__col flow__col--after"><p class="flow__label">${o.after.label}</p><ol>${o.after.steps.map(x=>`<li>${x}</li>`).join("")}</ol></div>
  </div>`,
  /* the pain points, one card each: a word, then what it felt like */
  pains:a=>`<ol class="blk pains">${a.map(x=>`<li><b>${x.h}</b><p>${x.p}</p></li>`).join("")}</ol>`,
  /* what people wrote back, as the messages they were */
  voices:o=>`<div class="blk voices"><p class="room__kicker">${o.kicker}</p><ul>${o.items.map(x=>`<li><p class="voices__msg">${x.q}</p><p class="voices__who">${x.who}</p></li>`).join("")}</ul>${o.note?`<p class="voices__note">${o.note}</p>`:""}</div>`,
  /* one screen across the wide column: the product, answering the pain point above it */
  shot:o=>`<div class="blk shotwide">${o.kicker?`<p class="room__kicker">${o.kicker}</p>`:""}${screenFrame(o)}</div>`,
  /* the way into each sub-room: one card per piece of work, so none is missed */
  studies:a=>`<ol class="blk studies">${a.map(x=>`<li style="--dc:${x.c}"><a href="${x.href}">
    <span class="studies__num">${x.num}</span>
    <span class="studies__kind">${x.kind}</span>
    ${x.logo?`<img class="studies__logo" src="${x.logo}" alt="${x.name}" height="40">`:`<span class="studies__name">${x.name}</span>`}
    <span class="studies__role">${x.role}</span>
    <span class="studies__q">${x.q}</span>
    <span class="studies__facts">${x.facts.map(f=>`<span><b>${f.b}</b> ${f.s}</span>`).join("")}</span>
    <span class="studies__go">${x.go} →</span></a></li>`).join("")}</ol>`,
  /* paired bars on one 0 to max scale, every value labelled, a table for screen readers */
  bars:o=>`<figure class="blk bars">
    <figcaption class="bars__title">${o.title}</figcaption>
    <ul class="bars__legend">${o.series.map(x=>`<li style="--dc:${x.c}"><i></i>${x.n}</li>`).join("")}</ul>
    ${o.groups.map(g=>`<div class="bars__group"><p class="bars__label">${g.label}</p>${g.v.map((v,i)=>`<div class="bars__row" style="--dc:${o.series[i].c};--len:${(v/o.max).toFixed(3)}" title="${g.label}, ${o.series[i].n}: ${v.toFixed(o.dp||0)} out of ${o.max}"><span class="bars__name">${o.series[i].n}</span><span class="bars__track"><i></i></span><b>${v.toFixed(o.dp||0)}</b></div>`).join("")}</div>`).join("")}
    <p class="bars__note">${o.note}</p>
    <div class="vh"><table><caption>${o.title}</caption><tr><th>Measure</th>${o.series.map(x=>`<th>${x.n}</th>`).join("")}</tr>${o.groups.map(g=>`<tr><th>${g.label}</th>${g.v.map(v=>`<td>${v.toFixed(o.dp||0)} / ${o.max}</td>`).join("")}</tr>`).join("")}</table></div>
  </figure>`,
  /* the crossover, drawn as a schematic: which way the effect runs, not plotted values */
  crossover:o=>`<figure class="blk cross">
    <figcaption class="bars__title">${o.title}</figcaption>
    <ul class="bars__legend"><li style="--dc:var(--blue)"><i></i>AI dialogue</li><li style="--dc:var(--pink)"><i></i>Art-making</li></ul>
    <p class="cross__y">↑ mood improved more</p>
    <svg viewBox="0 0 520 220" role="img" aria-label="${o.alt}">
      <path d="M20 200H510M20 200V10" stroke="currentColor" stroke-opacity=".3" fill="none"/>
      <path d="M50 50L480 170" stroke="#2B4DE0" stroke-width="2.4" fill="none" stroke-linecap="round"/>
      <path d="M50 170L480 46" stroke="#EE4187" stroke-width="2.4" fill="none" stroke-linecap="round"/>
      <circle cx="50" cy="50" r="6" fill="#2B4DE0" stroke="#fff" stroke-width="2"/><circle cx="480" cy="170" r="6" fill="#2B4DE0" stroke="#fff" stroke-width="2"/>
      <circle cx="50" cy="170" r="6" fill="#EE4187" stroke="#fff" stroke-width="2"/><circle cx="480" cy="46" r="6" fill="#EE4187" stroke="#fff" stroke-width="2"/>
    </svg>
    <p class="cross__x"><span>little prior art experience</span><span>a lot →</span></p>
    <p class="bars__note">${o.note}</p>
  </figure>`,
  /* gatherings grouped by the reason behind them: the reason on the left, two events on the right */
  gatherings:a=>`<div class="blk gatherings">${a.map(t=>`<section class="gtheme" style="--dc:${t.c}">
    <div class="gtheme__why"><p class="gtheme__num">${t.num}</p><h3>${t.h}</h3><p>${t.why}</p></div>
    <div class="gtheme__events">${t.events.map(e=>`<article class="gevent">
      <div class="fig__plate" data-img="${e.k}" data-slot="" style="--ratio:4/3"><div class="fig__ghost">${e.ghost}</div></div>
      <p class="gevent__meta">${e.meta}</p>
      <h4 class="gevent__name">${e.name}</h4>
      <p class="gevent__what">${e.p}</p>
      <p class="gevent__fact">${e.fact}</p>
      ${e.event?`<p class="aside-link" data-event-row hidden><a data-event="${e.event}" href="#">Event page ↗</a></p>`:""}
    </article>`).join("")}</div>
  </section>`).join("")}</div>`,
  /* each part of the work on one row: what I did, then what it taught me */
  tasks:a=>`<ol class="blk tasks">${a.map(x=>`<li><div class="tasks__did"><b>${x.h}</b><p>${x.did}</p></div><p class="tasks__learned"><span>What it taught me</span>${x.learned}</p></li>`).join("")}</ol>`,
  /* a way out to the real organisation, in a new tab */
  visit:o=>`<p class="blk room__visit"><a class="btn btn--ink" href="${o.href}" target="_blank" rel="noopener">${o.label} ↗</a></p>`,
  /* words beside one screen */
  beside:o=>`<div class="blk beside${o.flip?" beside--flip":""}"><div class="beside__text">${o.blocks.map(([t,a])=>B[t](a)).join("")}</div>${screenFrame(o.shot)}</div>`,
  links:a=>`<div class="room__more">${a.map(l=>`<a href="${l.href}">${l.label} →</a>`).join("")}</div>`
};

/* ---------- About · her own words, drawn around with a little art ----------
   The one room built from a mockup rather than blocks: a sketch hero, the
   story beside her portrait, a pink band for the line that holds it together,
   and a close that hands on to the work and the CV. */
const spark=(c)=>`<svg class="spark ${c}" viewBox="0 0 40 40" aria-hidden="true"><path d="M20 4v32M5 19l30 2M9 9l22 22M31 8L9 31"/></svg>`;
function aboutHTML(){
  return `<header class="about-hero">
    <svg class="about-hero__swirl" viewBox="0 0 1200 200" preserveAspectRatio="xMinYMax meet" aria-hidden="true"><path pathLength="1" d="M-20 6c64 0 66 110 128 150 56 36 142 30 144-4 2-28-46-32-58-6-12 28 36 48 96 42 170-16 330-86 560-120"/></svg>
    <svg class="about-hero__dots" viewBox="0 0 200 200" aria-hidden="true"><path d="M150 10c-60 10-90 60-80 120M40 190c20-30 30-60 20-90"/></svg>
    ${spark("spark--a")}${spark("spark--b")}${spark("spark--c")}
    <div class="about-hero__text">
      <p class="about__kicker">The instinct I keep returning to</p>
      <h2 id="roomTitle">To make things that bring people together.</h2>
      <p class="about-hero__sub">I have always been driven by a single, powerful instinct.</p>
    </div>
    <figure class="about-sketch" aria-label="A drawing on a shared page: three figures holding hands, a heart and a sun, with crayons reaching in from every side.">
      <svg viewBox="0 0 300 260" aria-hidden="true">
        <rect x="26" y="22" width="248" height="216" rx="4" fill="#F9D5E2" transform="translate(8 8)"/>
        <rect x="26" y="22" width="248" height="216" rx="4" fill="#FFFDF8" stroke="#141C33" stroke-width="1.6"/>
        <path d="M78 74l142-10 10 124-140 10z" fill="#fff" stroke="#141C33" stroke-width="1.2" stroke-linejoin="round"/>
        <g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
          <path d="M134 162c-8-8-20-2-16 8 4 9 16 14 16 14s12-5 16-14c4-10-8-16-16-8z" stroke="#EE4187"/>
          <circle cx="196" cy="98" r="9" stroke="#F2872F"/><path d="M196 82v-5M196 119v-5M180 98h-5M217 98h-5M184 86l-3-3M211 113l-3-3M208 86l3-3M184 110l-3 3" stroke="#F2872F"/>
          <g stroke="#0F918B"><circle cx="112" cy="104" r="6"/><path d="M112 110v18M112 128l-6 12M112 128l6 12"/></g>
          <g stroke="#2B4DE0"><circle cx="140" cy="100" r="6"/><path d="M140 106v18M140 124l-6 12M140 124l6 12"/></g>
          <g stroke="#6A4BD6"><circle cx="168" cy="104" r="6"/><path d="M168 110v18M168 128l-6 12M168 128l6 12"/></g>
          <path d="M100 118l12-2 28-2 28 2 12 2" stroke="#141C33" stroke-width="1.4"/>
          <path d="M96 176c10-8 18 6 28-2M178 170c8 6 18-4 26 4" stroke="#EE4187" stroke-width="1.4"/>
        </g>
        <g stroke="#141C33" stroke-width="1.1" stroke-linejoin="round">
          <g transform="rotate(38 66 58)"><rect x="40" y="53" width="44" height="10" rx="2" fill="#EE4187"/><path d="M84 53l12 5-12 5z" fill="#FBD3E1"/></g>
          <g transform="rotate(142 236 58)"><rect x="210" y="53" width="44" height="10" rx="2" fill="#F2872F"/><path d="M254 53l12 5-12 5z" fill="#FDE3CC"/></g>
          <g transform="rotate(-36 66 206)"><rect x="40" y="201" width="44" height="10" rx="2" fill="#0F918B"/><path d="M84 201l12 5-12 5z" fill="#CDEDEA"/></g>
          <g transform="rotate(-146 240 206)"><rect x="214" y="201" width="44" height="10" rx="2" fill="#2B4DE0"/><path d="M258 201l12 5-12 5z" fill="#D5DDFB"/></g>
        </g>
      </svg>
    </figure>
  </header>

  <section class="about-body">
    <div class="about-body__text">
      <h3 class="about__lead">When I was a kid, my world revolved around two things—drawing, and making friends.</h3>
      <p>There was an undeniable magic in watching a world that existed only in my head suddenly take shape on a blank page. But the real spark? That happened the moment someone else leaned over my shoulder to look. Suddenly, the drawing wasn’t just mine anymore. They’d spot details I’d completely missed, tell me what it reminded them of, or start dreaming up what might live just past the edges of the paper.</p>
      <p>That feeling is exactly why I still love creating today.</p>
    </div>
    <figure class="about-photo">
      <div class="fig__plate" data-img="ab-2" data-slot="" style="--ratio:4/5"><div class="fig__ghost">Your photo</div></div>
    </figure>
  </section>

  <blockquote class="about-band">
    <svg class="about-band__burst" viewBox="0 0 40 40" aria-hidden="true"><path d="M14 8l10 8M8 20h16M14 32l10-8"/></svg>
    <p>An unfinished idea gives people a safe place to meet.</p>
    <svg class="about-band__burst about-band__burst--r" viewBox="0 0 40 40" aria-hidden="true"><path d="M14 8l10 8M8 20h16M14 32l10-8"/></svg>
  </blockquote>

  <section class="about-body about-body--after">
    <div class="about-body__text">
      <p>It gives us something to point at, question, laugh about, and build on together. Creating does not magically erase the distance between us, but it makes that very first step feel a lot easier.</p>
      <p>As I grew older, I started to see how many people have something wonderful to share but just do not know how to start. Sometimes, all it takes to help them is a very small change. It could be asking a different question, giving them something real to hold, or just inviting them in without expecting the perfect words right away.</p>
      <p>I care so deeply about those small starts. I truly believe our world gets so much better when people feel like what they notice, imagine, and make actually matters.</p>
    </div>
    <svg class="about-note" viewBox="0 0 170 190" aria-hidden="true">
      <path d="M34 34l92-14 16 88-84 14z" fill="#FDE3EC" transform="translate(6 6)"/>
      <path d="M34 34l92-14 16 88-84 14z" fill="#fff" stroke="#141C33" stroke-width="1.6" stroke-linejoin="round"/>
      <path d="M142 108l-24-8 8 22" fill="#fff" stroke="#141C33" stroke-width="1.6" stroke-linejoin="round"/>
      <path class="about-note__string" pathLength="1" d="M58 122c-8 22-36 22-34 4 2-16 26-10 22 10-4 18-20 30-12 50" fill="none" stroke="#EE4187" stroke-width="1.8" stroke-linecap="round"/>
    </svg>
    ${spark("spark--d")}
  </section>

  <section class="about-close">
    ${spark("spark--e")}
    <p class="about-close__lead">At the end of the day,</p>
    <p class="about-close__line">the things I love most are the ones that come alive the moment <span class="about-close__mark">another person joins in.</span></p>
    <img class="about-close__sign" src="img/signature.png" alt="Gia Han’s signature" width="900" height="432" loading="lazy">
    <div class="about-close__cta">
      <a class="btn btn--ink" href="#/exhibition">See my drawings →</a>
      <a class="about-close__cv" href="#/cv">Open my CV →</a>
    </div>
    <a class="about-practice" href="#/work/net-mo">
      <img class="about-practice__logo" src="img/dream-strokes-logo.jpg" alt="" width="480" height="480" loading="lazy">
      <span class="about-practice__kicker">Where I put this into practice</span>
      <span class="about-practice__name">Dream Strokes</span>
      <span class="about-practice__what">Art workshops for children in shelters, where one shared tray of crayons changed the room.</span>
      <span class="about-practice__go">Step inside →</span>
    </a>
    <a class="contact-line about-close__mail" href="mailto:trieungocgiahan@gmail.com"><span>Email</span><span>trieungocgiahan@gmail.com</span></a>
  </section>`;
}

/* the verified honours, stated once, shown in Awards and in the CV.
   t year · h name · p the result · g group · m its mark · s the story behind it, in Gia Han's words */
const AWARD_GROUPS=[
  {id:"ideas",label:"Ideas & research",dc:"var(--violet)"},
  {id:"making",label:"Science & making",dc:"var(--blue)"},
  {id:"team",label:"Team & school",dc:"var(--orange)"}
];
const AWARDS=[
  {t:"2026",g:"ideas",m:"mind",h:"International Psychology Olympiad",p:"Silver Award · 1st in Asia · Top 15 Global",
    s:"Psychology interested me before I knew it could become a competition. Preparing for the Olympiad made me move beyond explanations that merely sounded reasonable. I had to compare possibilities, return to evidence and notice where my first interpretation was incomplete. The award mattered because it showed me how much more there was to learn about a subject I already wanted to pursue."},
  {t:"2026",g:"ideas",m:"pen",h:"RAIS Essay Competition",p:"Top 2 of about 450",
    s:"I entered with an essay about AI and the future of human thinking in education. The difficult part was resisting an easy argument for or against technology. I kept revising whenever a paragraph made either humans or AI sound too simple. The final essay asked a question I am still carrying into my work. When does a tool extend our thinking, and when does it begin thinking in our place?"},
  {t:"2026",g:"ideas",m:"bulb",h:"HCMC Youth Innovation",p:"Top 10 of 200",
    s:"I entered because I wanted to know whether an idea that made sense to our own team would still make sense to people meeting it for the first time. Preparing for the competition forced me to explain the problem clearly, show who the product was for and separate the features we liked from the ones users actually needed. Reaching the Top 10 felt less like approval of a finished product and more like evidence that the problem was worth continuing to work on."},
  {t:"2025",g:"making",m:"cards",h:"Ho Chi Minh City Youth Creativity Contest",p:"Second Prize · Emotion Card Deck",
    s:"I wanted to make something children could hold when talking about feelings became difficult. A lesson or long explanation would have asked them to find the right words first, which was often the hardest part. The card deck used colours, images and situations to give children somewhere simpler to begin. Turning that idea into a real product meant thinking about every choice from the child’s side, not only whether the psychology behind it was correct."},
  {t:"2025",g:"making",m:"cell",h:"Ho Chi Minh City Regional Academic Excellence Contest",p:"Third Prize, Biology · one of 3 students selected from 45",
    s:"I was one of three students selected from 45 to represent my school in the city competition. Preparing meant learning beyond what appeared in our regular lessons and becoming more precise about processes I had previously understood only in broad outlines. Biology was one of the first subjects that made me want to look beneath what I could see and ask what had to be happening underneath."},
  {t:"2023",g:"making",m:"rocket",h:"Vietnam Water Rocket Competition",p:"National Silver Medal · Team Lead",
    s:"I joined because I loved Physics and wanted to find out what I could do with it outside a classroom. The competition asked for more than launching a rocket. Our team moved between calculations, construction, coding and problems that only appeared once we began testing. I did not know all of those things when we started. That was part of why I wanted to go. Winning National Silver gave me the confidence to keep entering unfamiliar kinds of work before I felt completely ready."},
  {t:"2025",g:"team",m:"ball",h:"Ho Chi Minh City Youth Basketball Tournament",p:"Bronze Medal",
    s:"Basketball tested a part of me that no written competition could. I could prepare on my own, but I could not control how a match unfolded or do another player’s job for her. I had to read what was happening, recover quickly from mistakes and remain useful to the team even when I was not the person scoring. That is why this medal belongs beside the academic ones."},
  {t:"2025",g:"team",m:"star",h:"Most Well-Rounded Student",p:"Grade 11 · Trung Vuong High School",
    s:"This award meant more to me because it did not recognise one exam or one project. That year, I ranked first among 844 students while serving as class president and working on projects outside school. I often worried that exploring too many things would make me look unfocused. The award made me see that those parts of my life did not have to compete with one another."}
];
/* a small line drawing for each honour, in its group's colour */
const AWARD_MARKS={
  mind:'<path d="M9 21v-3.2A7 7 0 1 1 18.6 11l1.4 3.2h-1.8V17a1.5 1.5 0 0 1-1.5 1.5H15V21"/><circle cx="12.5" cy="9.5" r="1.6"/>',
  pen:'<path d="M4 20l1.2-4.8L15.6 4.8a2 2 0 0 1 2.8 0l.8.8a2 2 0 0 1 0 2.8L8.8 18.8z"/><path d="M13.8 6.6l3.6 3.6M4 20h8"/>',
  bulb:'<path d="M9 17.5h6M10 21h4M12 3a6 6 0 0 0-3.6 10.8c.7.6 1.1 1.4 1.1 2.2V17.5h5V16c0-.8.4-1.6 1.1-2.2A6 6 0 0 0 12 3z"/>',
  cards:'<rect x="3.5" y="6" width="10" height="14" rx="1.5" transform="rotate(-8 8.5 13)"/><rect x="10.5" y="4" width="10" height="14" rx="1.5" transform="rotate(8 15.5 11)"/><circle cx="15.5" cy="11" r="1.6"/>',
  cell:'<ellipse cx="12" cy="12" rx="9" ry="7.5"/><circle cx="13.5" cy="11" r="2.6"/><circle cx="7.5" cy="13.5" r=".9"/><circle cx="9" cy="8.5" r=".7"/><circle cx="16.5" cy="15.5" r=".8"/>',
  rocket:'<path d="M12 2.5c3.2 3 4.3 7.3 3.2 11.5H8.8C7.7 9.8 8.8 5.5 12 2.5z"/><path d="M8.8 12l-2.6 4.5h3.2M15.2 12l2.6 4.5h-3.2M12 17v4.5"/><circle cx="12" cy="8.5" r="1.4"/>',
  ball:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3v18M5.6 5.6c3.4 3.4 3.4 9.4 0 12.8M18.4 5.6c-3.4 3.4-3.4 9.4 0 12.8"/>',
  star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>'
};

/* Each room tells one story, in this order: a hero (what it is, one number
   line, a photograph through a door), what I noticed, what I changed, what it
   led to. Lists and archives stay out; the CV holds the dated record. */
const ROOMS={
"/work/net-mo":{accent:"var(--coral)",where:"Work · Dream Strokes",blocks:[
  ["hero",{kicker:"Work · Apr 2025 to now · Founder and Project Director",title:"Dream Strokes",
    logo:"img/dream-strokes-logo.jpg",logoAlt:"The Dream Strokes logo: a hand-drawn child with star eyes and a paintbrush, under the project’s name in dripping paint.",
    lede:"An arts-based emotional-learning programme for children in shelters and older adults in care homes, professionally guided and legally sponsored by Bao Sang Art Therapy Center.",
    facts:[{b:"50",s:"workshops"},{b:"6",s:"shelters"},{b:"2",s:"care homes"}],
    k:"nm-lead",ghost:"a session in progress"}],
  ["kicker","What I noticed first"],
  ["para","A boy spent the first session drawing in the bottom right corner of his page. Not shyly. Efficiently, as if the rest of the paper belonged to somebody else. In the third session we ran out of small sheets and put one large one across four tables. He drew across the middle without asking."],
  ["quote","The material was never the problem. The ownership of the surface was."],
  ["kicker","What I changed"],
  ["steps",[
    {b:"Story world over free drawing",p:"Story worlds raised active participation from 60% to an average of 85%, with the clearest gains among quiet children. It also gives children a character to speak through when speaking as themselves is too much."},
    {b:"A shared object, not a finished page",p:"Sessions now end on a shared object rather than individual results, and facilitators are told explicitly that an unfinished page is a fine outcome."},
    {b:"Handover is a product",p:"I built the team an activity journal app: three permission roles, media upload, calendar view, and a task board coloured by department, so a season can be inherited rather than re-explained."}
  ]],
  ["numbers",[
    {b:"80%",s:"showed improved emotional expression or confidence"},
    {b:"~75M VND",s:"net proceeds, reinvested in materials and programmes"},
    {b:"~200",s:"children, with a team of 25"}
  ]],
  ["figs",[
    {k:"nm-1",slot:"Plate 02",ratio:"3/4",ghost:"child and facilitator",cap:"Facilitator training pays for itself in the first ten minutes."},
    {k:"nm-2",slot:"Plate 03",ratio:"3/4",ghost:"older participant",cap:"In care homes: two groups used to being cared for, making something for each other."},
    {k:"nm-3",slot:"Plate 04",ratio:"3/4",ghost:"drawings held up",cap:"Characters to speak through, held up for the room."}
  ]],
  ["lead",{k:"nm-4",slot:"Plate 05",ratio:"3/2",ghost:"the end of a session",cap:"The end of a session: everyone holding up what they made."}],
  ["kicker",{t:"Colors of Joy Workshop · Hanoi · with Bao Sang Art Therapy Center · Aug to Oct 2025",id:"colors-of-joy"}],
  ["para","As curriculum designer for an art-based emotional-learning programme for children in Hanoi, I selected and rewrote Dream Strokes activities into a 4-session curriculum for 24 children aged 6 to 12, writing session plans and facilitator guides and revising each session with licensed art therapists. By the final session, 23 of the 24 children could name their emotions through drawing."],
  ["figs",[
    {k:"nm-5",slot:"Plate 06",ratio:"1/1",ghost:"painting at the studio",cap:"Colors of Joy, Hanoi: painting together at the studio."},
    {k:"nm-6",slot:"Plate 07",ratio:"1/1",ghost:"a facilitator with two children",cap:"A facilitator painting alongside two children."}
  ]],
  ["kicker","Where it led"],
  ["para","If the format changes engagement this reliably, the effect is not about art. It is about what the room permits. That question is what pushed me into reading psychology properly, and eventually into running a study instead of trusting my own field notes."],
  ["links",[{href:"#/work/research",label:"The study it led to"},{href:"#/work/events",label:"Events"},{href:"#/exhibition",label:"Exhibition"}]]
]},

"/work/events":{accent:"var(--orange)",where:"Work · Events",blocks:[
  ["hero",{kicker:"Gatherings and events · 2024 to 2026",title:"Rooms with the lights turned up",
    lede:"A workshop has ten children at a table. An event has hundreds of strangers. I kept asking the same question at a larger scale: how do people who do not know each other begin together?",
    facts:[{b:"9",s:"gatherings"},{b:"2,400+",s:"at the largest"},{b:"VND 25M",s:"raised at Beats of Hope"}],
    k:"gather-2",ghost:"Beats of Hope, from the stage"}],

  ["kicker",{t:"The flagship · benefit concert · 2025",id:"little-smile"}],
  ["subtitle","Beats of Hope"],
  ["lede","A night of music for children in hospital, produced with the Little Smiles Project."],
  ["kicker","Why it mattered to me"],
  ["para","As Creative Director at the Little Smiles Project, I led a 4-person creative team in South Korea, France, Taiwan and Vietnam, designing 8 adaptive play and storytelling sessions for about 100 children across 3 hospitals. Those sessions needed funding, and I wanted students in my own city to be part of them, not only to hear about them. A concert could do both."],
  ["figs",[
    {k:"gt-4",slot:"Poster",ratio:"1/1",ghost:"the Beats of Hope poster",cap:"The poster, made with the Little Smiles team."},
    {k:"gt-5",slot:"Plate 02",ratio:"1/1",ghost:"a band after its set",cap:"One of the bands, after its set."}
  ]],
  ["kicker","What I did, and what each part taught me"],
  ["tasks",[
    {h:"Bringing the bands together",did:"I produced the night with more than ten student bands from different schools, and ran the stage flow and artist coordination.",
      learned:"If nobody is given something to do in the first two minutes, the room stays an audience for the rest of the night."},
    {h:"Filling the room",did:"We distributed 310+ tickets across Ho Chi Minh City schools, and I negotiated the venue sponsorship in person.",
      learned:"Money is a design constraint, not a footnote. The terms shaped where people entered and how long they stayed."},
    {h:"Watching the first move",did:"On the night, I watched for the moment the concert began to belong to the people inside it: when one person moved closer to the stage, and others followed.",
      learned:"A room changes when one person goes first. My job is to make that first step easy."}
  ]],
  ["numbers",[
    {b:"10+",s:"student bands"},
    {b:"310+",s:"tickets across city schools"},
    {b:"~VND 25M",s:"raised, donated to two hospitals in France"}
  ]],

  ["kicker","The same question, in other rooms"],
  ["para","After Beats of Hope I kept using the same first move in very different gatherings. They fall into four kinds, each for a reason."],
  ["gatherings",[
    {num:"01",c:"var(--pink)",h:"Music that turns strangers into a crowd",why:"A song gives everyone the same thing to do at the same moment. Nobody has to speak first.",
      events:[
        {k:"gt-lead",ghost:"Sol Sound, the stage",meta:"Dream Strokes · music concert",name:"Sol Sound",p:"A concert from Dream Strokes’ public programme, widening who could take part beyond our partner shelters.",fact:"400+ tickets",event:"sol-sound"},
        {k:"ev-tet",ghost:"Hey Tet!, the school stage",meta:"Program Vice Organizer · Dec 2025 to Feb 2026",name:"Hey Tet!",p:"I reorganised and trained the programme team in a 36-student committee and directed full-day programming for the school’s first fully student-run Lunar New Year music event.",fact:"2,400+ attendees",event:"tet-oi"}
      ]},
    {num:"02",c:"var(--orange)",h:"Games that mix the teams",why:"Sorting players across schools, rather than by school, changed who spoke to whom, and it kept changing after the final whistle.",
      events:[
        {k:"ev-pitch",ghost:"Colors of the Pitch, mixed teams",meta:"Dream Strokes · football tournaments",name:"Colors of the Pitch",p:"Two tournaments where football was the excuse, fundraising the outcome, and mixed teams the real design decision.",fact:"10 teams · 1,000+ spectators",event:"colors-of-the-pitch"},
        {k:"ev-league",ghost:"Trung Vuong Football League",meta:"Operations Lead · Aug 2024 to Feb 2025",name:"Trung Vuong Football League",p:"I co-led a 7-member team through two seasons and managed budgeting, equipment and match operations.",fact:"15 teams · 8 schools",event:"cerberus-league"}
      ]},
    {num:"03",c:"var(--blue)",h:"Science you can hold",why:"People join faster when there is something to build or test with their own hands, not only something to listen to.",
      events:[
        {k:"ev-rocket",ghost:"a water rocket launch",meta:"Initiator · Physics Club",name:"Water Rocket Design Contest",p:"I launched Trung Vuong’s first water-rocket design challenge and wrote its proposal and technical guide. It became an annual school programme.",fact:"80+ participants · ~12 teams"},
        {k:"ev-sciphony",ghost:"a SciPhony booth",meta:"Academic Design Lead · Physics Club",name:"SciPhony Science Festival",p:"I led the academic design of an interdisciplinary festival: a human-body investigation that needed physics, chemistry and biology at every booth.",fact:"5 booths"}
      ]},
    {num:"04",c:"var(--teal)",h:"Quiet ways to open up",why:"Not everyone opens up on a stage. A prompt, a station or a walk lets people begin at their own pace.",
      events:[
        {k:"ev-identity",ghost:"a Colors of Identity station",meta:"Eunoia Psychology Club · Head of Academic Affairs",name:"Colors of Identity",p:"I secured school approval and directed 25 volunteers for a self-discovery programme of five stations, the first of its kind at our school.",fact:"600 registrants"},
        {k:"ev-tours",ghost:"a sketch tour in the city",meta:"Founder and Program Organizer · summers 2025 and 2026",name:"Photography & Sketch Tours",p:"Photography and sketch walks through Ho Chi Minh City that bring locals and art lovers together with international visitors, at landmarks and at hidden spots our members love.",fact:"70+ participants"}
      ]}
  ]],
  ["kicker","What ties them together"],
  ["para","A concert, a league, a rocket launch and a sketch walk look nothing alike. Each one still began the same way: give people something to do together in the first few minutes, and make it easy for one person to go first."],
  ["links",[{href:"#/work/net-mo",label:"Dream Strokes"},{href:"#/work/research",label:"Research & Internships"}]]
]},

"/work/research":{accent:"var(--violet)",where:"Work · Research & Internships",blocks:[
  ["hero",{kicker:"Work · Research & Internships · 2025 to now",title:"Research &amp; Internships",
    lede:"One study I designed and ran, and two research internships at startups building tools for how young people feel, learn and pay attention. Each one has its own page.",
    facts:[{b:"68",s:"study participants"},{b:"100+",s:"interviews with teenagers"},{b:"40+",s:"papers reviewed"}],
    art:'<path d="M14 132h94M14 132V20" opacity=".45"/><path d="M24 46l80 70" stroke="#2B4DE0" stroke-width="3"/><path d="M24 116l80-74" stroke="#EE4187" stroke-width="3"/><circle cx="64" cy="81" r="4.5" fill="currentColor" stroke="none"/>'}],
  ["studies",[
    {num:"01",c:"var(--violet)",href:"#/work/research/ai-art",kind:"Study · First author",name:"AI &amp; Art",role:"Oct 2025 to now · under review at NHSJS",
      q:"Does art-making or an AI-guided dialogue make it easier to express what you feel, and for whom?",
      facts:[{b:"68",s:"young adults"},{b:"136",s:"sessions"},{b:"p < .001",s:"crossover"}],go:"Open the study"},
    {num:"02",c:"#C2610A",href:"#/work/research/teencare",kind:"Internship · Research Associate, R&D",name:"TeenCare",logo:"img/teencare-wordmark.png",role:"May to Dec 2025 · Jun 2026 to now",
      q:"What do teenagers actually say when someone asks properly?",
      facts:[{b:"100+",s:"interviews"},{b:"5",s:"narrative survey formats"}],go:"Open TeenCare"},
    {num:"03",c:"#0041E7",href:"#/work/research/brain-life",kind:"Internship · R&D Intern",name:"Brain-Life",logo:"img/brainlife-wordmark.png",role:"Aug 2026 to now",
      q:"Where do global research on attention and local behaviour part ways?",
      facts:[{b:"40+",s:"papers"},{b:"20",s:"products"},{b:"25",s:"interviews"}],go:"Open Brain-Life"}
  ]],
  ["kicker","How they connect"],
  ["para","The study asked which way into a feeling works, and for whom. TeenCare asked what teenagers say when the question is built gently enough. Brain-Life asks what attention looks like when the brain’s signal and a student’s own report disagree. Each time, the answer depended on the person, not only on the tool."],
  ["links",[{href:"#/work/net-mo",label:"Where the question came from"},{href:"#/work/tech",label:"Tech Projects"}]]
]},

"/work/research/ai-art":{accent:"var(--violet)",where:"Research · AI & Art",blocks:[
  ["hero",{kicker:"Study · First author · Oct 2025 to now",title:"AI &amp; Art",
    lede:"Does hands-on art-making or an AI-guided reflective dialogue make it easier to express what you feel, and does the answer depend on who is walking in?",
    facts:[{b:"68",s:"young adults"},{b:"136",s:"sessions, two each"},{b:"8",s:"post-session measures"}],
    meta:"Under review at the National High School Journal of Science · advised by Phuong Thao Nguyen, M.A. in Psychology and licensed art therapist",
    art:'<path d="M14 132h94" opacity=".45"/><path d="M26 132V58M40 132V84" stroke-width="9" stroke-linecap="butt"/><path d="M26 132V58" stroke="#2B4DE0" stroke-width="9" stroke-linecap="butt"/><path d="M40 132V84" stroke="#EE4187" stroke-width="9" stroke-linecap="butt"/><path d="M78 132V85" stroke="#2B4DE0" stroke-width="9" stroke-linecap="butt"/><path d="M92 132V60" stroke="#EE4187" stroke-width="9" stroke-linecap="butt"/>'}],
  ["kicker","The question"],
  ["para","In Dream Strokes, a small change in format changed how much children expressed. Field notes could show me what I thought I was seeing. I wanted to know whether the pattern would hold when I tested it, and AI tools had just offered a new way in: a patient conversation."],
  ["kicker","The design"],
  ["pairs",[
    {h:"Door A · Art",p:"An expressive art-making session with materials and no requirement to explain the result out loud."},
    {h:"Door B · AI",p:"A guided reflective dialogue. I wrote the AI’s role prompt, the safety protocol and the consent procedure, with my advisor’s review."}
  ]],
  ["steps",[
    {b:"Everyone walked through both doors",p:"A counterbalanced within-subjects study: 68 young adults each completed both sessions, in alternating order, 136 sessions in all."},
    {b:"Eight questions after every session",p:"I built 8 post-session measures and analysed them in Python with paired t-tests, effect sizes and moderation."},
    {b:"Every reflection read",p:"I coded all 136 written reflections thematically, so the numbers could be checked against what people said."}
  ]],
  ["kicker","What came back"],
  ["bars",{title:"Two doors, two strengths · mean ratings out of 10",max:10,dp:2,
    series:[{n:"AI dialogue",c:"#2B4DE0"},{n:"Art-making",c:"#EE4187"}],
    groups:[{label:"How easy it was to start",v:[7.91,5.57]},{label:"How much the result felt like my own",v:[5.38,7.40]}],
    note:"68 participants, both conditions each. Higher is more."}],
  ["crossover",{title:"Which door improved mood more depended on prior art experience",
    alt:"Schematic of a crossover: with little prior art experience, AI dialogue improved mood more; with a lot, art-making did.",
    note:"Schematic of the interaction (p < .001): it shows the direction of the effect, not plotted values."}],
  ["pains",[
    {h:"AI opens the door",p:"Starting was easier with AI: 7.91 against 5.57 out of 10. A first question lowers the cost of the first sentence."},
    {h:"Art makes it yours",p:"Ownership was stronger after art-making: 7.40 against 5.38. What you make with your hands stays yours."},
    {h:"It depends who walks in",p:"Prior art experience reversed which format improved mood more. Averaging the two conditions would have hidden the result."}
  ]],
  ["kicker","What I built from it"],
  ["para","If AI is better at the first step and art is better at what follows, the answer is not to choose one. So I built Inkling, a drawing journal where the AI offers a first line and the person takes over: a proposed hybrid of the two doors."],
  ["figs",[
    {k:"rs-1",slot:"Plate 01",ratio:"4/3",ghost:"Inkling, the drawing journal",cap:"Inkling: the AI offers a first line, the person takes over."},
    {k:"rs-2",slot:"Plate 02",ratio:"4/3",ghost:"presenting the study",cap:"Presenting the study to university faculty."}
  ]],
  ["kicker","Where it went"],
  ["steps",[
    {b:"Under review",p:"Submitted to the National High School Journal of Science; I am first author."},
    {b:"City-level competition",p:"Selected as one of 3 school teams to enter the city’s science research competition."},
    {b:"Presented",p:"Presented the study to faculty from the University of Social Sciences and Humanities, Ho Chi Minh City."}
  ]],
  ["kicker","What it taught me"],
  ["para","Before this study I trusted what I saw in a room. Now I test it, I look for who an effect works for rather than whether it works on average, and I build from the answer instead of stopping at it."],
  ["links",[{href:"#/work/research",label:"All research"},{href:"#/work/research/teencare",label:"Next · TeenCare"}]]
]},

"/work/research/teencare":{accent:"#C2610A",where:"Research · TeenCare",blocks:[
  ["hero",{kicker:"Internship · Part-time Research Associate, R&D · May to Dec 2025, Jun 2026 to now",title:"TeenCare",
    wordmark:"img/teencare-wordmark.png",
    lede:"A youth mental-fitness startup building story-based tools that help teenagers notice and express what they feel.",
    facts:[{b:"100+",s:"semi-structured interviews"},{b:"5",s:"narrative survey formats"},{b:"1",s:"core product built on one of them"}],
    marks:["img/teencare-mark.png"]}],
  ["visit",{href:"https://teencare.co/vn",label:"Visit TeenCare"}],
  ["kicker","Why I joined"],
  ["para","In Vietnamese public schools, students get very little psychological support, and awareness of mental health is still low. I believe mental health matters as much as physical health. It is only easier to ignore because no one can see it. TeenCare was building tools to help teenagers notice and say what they feel, and I wanted to work on that problem rather than only notice it."],
  ["quote","Mental health is as important as physical health. It is only easier to overlook, because it is invisible."],
  ["figs",[
    {k:"tc-1",slot:"Plate 01",ratio:"4/3",ghost:"the team at work",cap:"Working with the R&D team."},
    {k:"tc-2",slot:"Plate 02",ratio:"4/3",ghost:"a wireframe or the e-book",cap:"From interview insight to the product."}
  ]],
  ["kicker","What I did, and what each part taught me"],
  ["tasks",[
    {h:"Listening at scale",did:"I conducted and analysed more than 100 semi-structured interviews with teenagers, using thematic coding and affinity mapping to find the barriers that kept coming back.",
      learned:"How to hear a pattern across a hundred voices without flattening any single one of them."},
    {h:"Finding where people go quiet",did:"In a pilot interview, the questions turned abruptly from easy to personal, and that was exactly where disclosure became difficult. I co-designed 5 narrative survey formats with gradual reflective prompts and branching choices.",
      learned:"When someone stops talking, the shape of the question is usually the problem, not the person."},
    {h:"Turning insight into a product",did:"One of those formats, the chef narrative, became the basis of TeenCare’s core product. I helped carry the insights into an interactive e-book and a form-building web product: flows, wireframes, interface design and automated pattern summaries.",
      learned:"Research matters most once it changes what actually gets built."},
    {h:"Testing with real users",did:"I took part in user testing and the V1 revisions that fixed its usability issues.",
      learned:"A tool for wellbeing has to be easy to use before it can help anyone."}
  ]],
  ["flow",{before:{label:"The pilot interview",steps:["A few easy questions","Then, suddenly, personal ones","Disclosure became difficult"]},
    after:{label:"What I co-designed",steps:["5 narrative survey formats","Gradual reflective prompts and branching choices","A story to speak through: the chef narrative"]}}],
  ["kicker","What I took away"],
  ["para","TeenCare showed me what it takes to make an invisible problem visible: listen widely, notice where people go quiet, and change the question before asking for more. It is what I watch for in a Dream Strokes session, at the scale of a product."],
  ["links",[{href:"#/work/research",label:"All research"},{href:"#/work/research/brain-life",label:"Next · Brain-Life"}]]
]},

"/work/research/brain-life":{accent:"#0041E7",where:"Research · Brain-Life",blocks:[
  ["hero",{kicker:"Internship · Research & Development Intern · Aug 2026 to now",title:"Brain-Life",
    wordmark:"img/brainlife-wordmark.png",
    lede:"A neurotechnology startup developing evidence-based tools to improve attention, learning and cognitive well-being.",
    facts:[{b:"3",s:"patterns where research and local behaviour diverged"},{b:"EEG",s:"recordings processed in Python"}],
    marks:["img/brainlife-mark.png"]}],
  ["visit",{href:"https://brainlife.ai",label:"Visit Brain-Life"}],
  ["kicker","Why I joined"],
  ["para","I care about neuroscience because so much of how we feel, learn and pay attention starts in the nervous system. Looking after the brain is part of being healthy, not something separate from it. I wanted to see how that science becomes something people actually use, so I looked for a professional setting where I could work on it, and joined Brain-Life as an R&D intern."],
  ["figs",[
    {k:"bl-1",slot:"Plate 01",ratio:"4/3",ghost:"an EEG session or the workspace",cap:"Where the recordings come from."},
    {k:"bl-2",slot:"Plate 02",ratio:"4/3",ghost:"the team at work",cap:"Working with the R&D team."}
  ]],
  ["kicker","What I did, and what each part taught me"],
  ["tasks",[
    {h:"Reading the evidence",did:"I reviewed more than 40 peer-reviewed papers on attention, learning and cognitive well-being.",
      learned:"To ask what a study actually shows, and for whom, before trusting its headline."},
    {h:"Looking at what exists",did:"I benchmarked 20 international neurotechnology and wellness products against that evidence.",
      learned:"How the same science can turn into very different products."},
    {h:"Asking the people here",did:"I tested the evidence against 25 contextual interviews with Vietnamese users, and found 3 behavioural patterns where global research and local behaviour diverged. From them I wrote early product hypotheses.",
      learned:"Evidence from elsewhere does not automatically fit here. The people in front of you have to be part of the evidence."},
    {h:"Signal and self-report",did:"I process EEG recordings in Python and analyse student surveys side by side, looking for the gaps between neural signals and what students report about their own attention. Those gaps informed product iterations.",
      learned:"Neither the signal nor a person’s own account is the whole picture. The useful part is where they disagree."}
  ]],
  ["numbers",[
    {b:"40+",s:"peer-reviewed papers reviewed"},
    {b:"20",s:"neurotechnology and wellness products benchmarked"},
    {b:"25",s:"contextual interviews with Vietnamese users"},
    {b:"3",s:"patterns where research and local behaviour diverged"}
  ]],
  ["kicker","What I took away"],
  ["para","Brain-Life gave me my first professional view of neuroscience, from papers to products to the people meant to use them. It also returned me to the question from AI &amp; Art: a tool only works when it responds to the person using it."],
  ["links",[{href:"#/work/research",label:"All research"},{href:"#/work/research/ai-art",label:"First · AI & Art"}]]
]},

"/work/tech":{accent:"var(--blue)",where:"Work · Tech Projects",blocks:[
  ["hero",{kicker:"Work · Tech Projects · 2025 to now",title:"Contextuary and Together!",
    lede:"Two products I designed in Figma and built with a front end in React. One helps a student meet a hard word inside its sentence. The other gives a scattered team one place to keep its days.",
    marks:["img/contextuary-logo.png","img/together-logo.png"]}],

  ["product",{id:"contextuary",logo:"img/contextuary-logo.png",logoAlt:"The Contextuary logo",
    kicker:"Founder and Product Designer · Jan 2025 to now · team of 4",name:"Contextuary",
    href:"https://contextuary.app",label:"Visit Contextuary",
    lede:"While I was studying vocabulary, I noticed how much work it took just to keep one new word, and how little of that work helped anyone remember it. That was where students gave up.",
    facts:[{b:"~2,200",s:"visitors"},{b:"500+",s:"registered users"}]}],
  ["kicker","The pain point"],
  ["para","Saving a single word meant a chain of small jobs, each one extra cognitive load that taught nothing about the word itself. By the third or fourth word, most students stopped."],
  ["flow",{before:{label:"Before · to keep one word",steps:["Look the word up","Translate it into Vietnamese","Find a real example sentence","Copy it all into a notebook","Make your own flashcards","Remember to come back and test yourself"]},
    after:{label:"With Contextuary",steps:["Add the word once","Get its Vietnamese meaning, SAT-style examples and a memory hint","Practise with quizzes, flashcards and AI challenges built from your own list"]}}],
  ["shot",{kicker:"The product",k:"cx-home",ratio:"1600/989",url:"contextuary.app",ghost:"the home page"}],
  ["kicker","The idea"],
  ["para","Memorising a definition gives you a word with no room around it. Recognition in a test passage needs the opposite: the word inside a sentence that gave it a job. So Contextuary never shows a word alone. It explains each word as it behaves in a real SAT-style sentence, in English and in Vietnamese, then keeps the sentence."],
  ["screens",[
    {k:"cx-1",ratio:"1290/907",url:"contextuary.app/words",ghost:"My Words",cap:"My Words: every saved word with its Vietnamese meaning, an SAT-style example, its status and a topic tag."},
    {k:"cx-2",ratio:"1600/920",url:"contextuary.app/practice",ghost:"a quiz question",cap:"Practice: a fill-in-the-blank question built from the words you saved."}
  ]],
  ["beside",{flip:true,blocks:[
    ["kicker","Listening, then cutting"],
    ["pairs",[
      {h:"Spaced repetition",p:"Built the logic, removed it. It scheduled words nobody cared about that day and made opening the app feel like a debt."},
      {h:"Topic filters",p:"Nobody used them. Students think in tests, not categories."},
      {h:"A separate Today page",p:"One more tap to reach the thing they came for. Daily Picks moved to the top of My Words instead."}
    ]]],
    shot:{k:"cx-3",ratio:"1138/1200",url:"contextuary.app/practice",ghost:"Start practice",cap:"What stayed: quiz or flashcards, an AI Challenge, and six question types."}}],
  ["voices",{kicker:"What users wrote",note:"Messages from users, translated from Vietnamese.",items:[
    {q:"Since Contextuary came along, learning vocabulary has become so much easier.",who:"A Contextuary user"},
    {q:"The founder keeps listening and improving it. I love it.",who:"A Contextuary user"}
  ]}],

  ["product",{id:"together",logo:"img/together-logo.png",logoAlt:"The Together! logo",
    kicker:"Co-Founder and UI/UX Designer · Dec 2025 to now",name:"Together!",
    href:"https://toghether.contextuary.app",label:"Visit Together!",
    lede:"Dream Strokes runs on many people, in many places, each doing a different job. I watched how easily that kind of team drifts apart.",
    facts:[{b:"1,550+",s:"visitors"},{b:"450+",s:"returning to the platform"}]}],
  ["kicker","The pain points"],
  ["pains",[
    {h:"Out of sight",p:"Members worked in different places and on different jobs, so most of them never saw what the others did."},
    {h:"Forgotten",p:"A good session lived in one group chat for a day, then sank. A season later, nobody could find it."},
    {h:"Not belonging",p:"When you cannot see the team’s work, it is easy to feel you are not really part of it, and the whole group slowly loses its connection."}
  ]],
  ["shot",{kicker:"The product",k:"cj-lead",ratio:"1600/916",url:"together · home",ghost:"the home page"}],
  ["beside",{blocks:[
    ["kicker","What we built"],
    ["para","One shared journal for the whole team. Every workshop, meeting and match goes on a common calendar, with its photos and voice notes, and everyone can react and comment, whichever branch or role they are in."],
    ["pairs",[
      {h:"Decision",p:"Entries are grouped by moment, not by file type, and every item keeps its contributor. Ownership stays visible while the collection becomes shared."},
      {h:"My part",p:"I conceived the product idea and built its information architecture and user flows, then designed the interface in Figma and coded the front end in React."}
    ]]],
    shot:{k:"cj-1",ratio:"1600/997",url:"together · sample project",ghost:"a sample project",cap:"A sample project: every activity has a type, a colour and a day, and opens into its photos, voice notes and reactions."}}],
  ["voices",{kicker:"What the team wrote",note:"Messages from Dream Strokes members, translated from Vietnamese.",items:[
    {q:"The activities are so adorable.",who:"A Dream Strokes member"},
    {q:"I had no idea the design team worked this hard.",who:"A Dream Strokes member"},
    {q:"Today’s football match was a great one.",who:"A Dream Strokes member"},
    {q:"The class was so sweet. Reading everyone’s journal feels like being there.",who:"A Dream Strokes member"}
  ]}],
  ["links",[{href:"#/work/research",label:"Research & Internships"},{href:"#/work/net-mo",label:"Dream Strokes"}]]
]},

"/about":{accent:"var(--pink)",where:"About",blocks:[["about"]]},

"/cv":{accent:"var(--blue)",where:"CV",blocks:[
  ["hero",{kicker:"Curriculum vitae · updated 2026",title:"The facts, dated"}],
  ["kicker","Founded and led"],
  ["rows",[
    {t:"Apr 2025 – now",h:"Dream Strokes · Founder and Project Director",p:"Arts-based emotional-learning programme for children in shelters and older adults in care homes. 25-member team across R&D, Tech, Events and PR. 50 workshops, ~200 children, 6 shelters, 2 care homes, ~75M VND in net proceeds. Professionally guided and legally sponsored by Bao Sang Art Therapy Center."},
    {t:"2026",h:"Once Upon the Inside · Co-producer",p:"Youth painting exhibition with The APRIL Collective at May Artspace. 300+ visitors."},
    {t:"2025",h:"Beats of Hope · Producer, Little Smiles Project",p:"Benefit concert, 10+ student bands, 310+ tickets, ~25M VND raised for hospital play and storytelling sessions, donated to two hospitals in France."},
    {t:"Aug 2024 – Feb 2025",h:"Trung Vuong Football League · Operations Lead",p:"2 seasons, 15 teams from 8 schools, 200+ student-athletes, 600+ cumulative spectators. Scheduling, budget, referees, safety protocol."}
  ]],
  ["kicker","Research"],
  ["rows",[
    {t:"Oct 2025 – now",h:"AI &amp; Art · First author",p:"Within-subjects study, N = 68, 136 sessions, expressive art-making versus AI-guided reflective dialogue. Crossover interaction by art familiarity. Python. Under review at NHSJS. Advised by Phuong Thao Nguyen."},
    {t:"Aug 2026 – now",h:"Brain-Life · Research & Development Intern",p:"EEG recordings processed in Python, student survey analysis."},
    {t:"2025",h:"Coursera",p:"Foundations of Neuroscience; Introduction to Psychology."}
  ]],
  ["kicker","Built"],
  ["rows",[
    {t:"Jan 2025 – now",h:"Contextuary · Founder and Product Designer",p:"SAT vocabulary in context. Designed in Figma, front end in React. ~2,200 visitors, 500+ registered users, ~70% weekly return."},
    {t:"Dec 2025 – now",h:"Together! · Co-Founder and UI/UX Designer",p:"Shared project timeline for a five-person team. 1,550+ visitors, 450+ returning."},
    {t:"2025",h:"Dream Strokes activity journal",p:"Three-role permission system, media upload, calendar, deadline board."}
  ]],
  ["kicker","Selected honours"],
  ["rows",[...AWARDS].sort((a,b)=>b.t-a.t)],
  ["links",[{href:"#/about",label:"About"},{href:"#/awards",label:"Awards"},{href:"#/work/research",label:"Research & Internships"}]]
]},

"/awards":{accent:"var(--teal)",where:"Awards",blocks:[
  ["hero",{kicker:"Awards · 2023 to 2026",title:"Awards",
    lede:"I like that these awards do not fit neatly into one category. They came from psychology, writing, design, science, engineering and sport.",
    facts:[{b:"8",s:"selected honours"}],
    /* a medal drawn in the door, where other rooms show a photograph */
    art:'<path d="M42 4l14 58M78 4L64 62" stroke-width="9" opacity=".55"/><path d="M42 4l14 58M78 4L64 62"/><circle cx="60" cy="98" r="34"/><circle cx="60" cy="98" r="25" opacity=".6"/><path d="M60 82l4.7 9.6 10.6 1.5-7.7 7.5 1.8 10.5-9.4-5-9.4 5 1.8-10.5-7.7-7.5 10.6-1.5z"/>'}],
  ["awards"],
  ["links",[{href:"#/about",label:"About"},{href:"#/cv",label:"CV"}]]
]}
};

/* old links keep working: each resolves to its new room, and an anchor inside it */
const ROOM_ALIASES={
  "/work/community":"/work/net-mo",
  "/work/community/events":"/work/events",
  "/work/gather":"/work/events",
  "/research/two-doors":"/work/research/ai-art",
  "/work/research/internships":"/work/research/teencare",
  "/work/contextuary":"/work/tech",
  "/work/colorful-journey":"/work/tech/together",
  "/work/together":"/work/tech/together"
};

/* ---------- exhibition · a small hang, then the full gallery ---------- */
/* each work: title, medium and year exactly as on its label, the artist
   statement, the cropped artwork (ratio = its own pixels, never altered),
   size = its height on the wall relative to the others, and support:"paper"
   for works on paper, which hang in a mat and a thin frame */
const ARCHIVE=[
  {id:"chemistry",t:"Chemistry",p:"Acrylic on canvas, 40 × 60 cm",d:"2026",ratio:"627/942",size:1.15,
   n:"When two people are drawn to each other, I picture it starting as a tiny signal between neurons. Then it turns into a dance. Here two souls move toward each other through the branches, like the chemistry in my head has found its rhythm.",
   alt:"Acrylic painting in pink, coral and turquoise: two pale figures reach toward each other among branching neurons, a faint heart behind them."},
  {id:"restless-light",t:"Restless Light",p:"Digital painting, 2000×1460",d:"2026",ratio:"666/498",size:1,
   n:"What begins as chemistry becomes choreography, until closeness seems to move through the body before the mind has found a name for it.",
   alt:"Digital painting: three glowing pink and violet figures with spiral hearts dance on a black ground, their limbs branching like neurons."},
  {id:"stardust",t:"Stardust",p:"Acrylic on watercolor paper, 21 × 29.7 cm",d:"2026",ratio:"581/736",size:.9,support:"paper",
   n:"Long before I existed, the calcium in my bones was burning in the heart of a star. I like to believe that light never faded, so I painted it glowing behind my ribs—right where my deepest feelings live.",
   alt:"Acrylic painting in blues, oranges and yellows: a ribcage outlined in turquoise with a bright star bursting behind it."},
  {id:"kaleidoscope",t:"Kaleidoscope",p:"Digital painting, 2000×1460",d:"2026",ratio:"629/503",size:1,
   n:"With every motion, color escapes its skin and fills the space around it. As layers fold and boundaries blur, the whole room comes alive—a kaleidoscope of shared light.",
   alt:"Digital painting: a crowd of blurred dancing figures, arms raised, dissolving into streaks of pink, violet, green and gold light."},
  {id:"red-season",t:"Red Season",p:"Acrylic on canvas, approx. 25 × 25 cm",d:"",ratio:"464/427",size:.8,
   n:"These lilies grew out of all that deep red, and no one sees what it took to get there. That's how strength feels to me, quiet and blooming from the inside.",
   alt:"Acrylic painting of two pink stargazer lilies with green leaves on a deep red ground."},
  {id:"bloom-anyway",t:"Bloom Anyway",p:"Acrylic on canvas, approx. 30 × 40 cm",d:"",ratio:"478/584",size:.95,
   n:"Eyes on me from every side, and just as much noise inside my head I smile anyway, while something quiet keeps growing, two buds still waiting to open.",
   alt:"Acrylic painting: a white lily on a blue stem rises through a dark red field of watching eyes, swirls and a small smiling face."},
  {id:"ba-son-view",t:"Ba Son's view",p:"Red ink on paper, 10.5 × 14.8 cm",d:"2025",ratio:"678/497",size:.78,support:"paper",
   n:"Standing on the bridge and watching the city light up in its ceaseless rush, I feel my sadness fade as I watch the metropolis grow ever grander through the passing hours.",
   alt:"Red ink sketch of the Ho Chi Minh City skyline seen across the river, a tree-lined embankment in front."},
  {id:"post-office",t:"My city Post Office",p:"Black ink on paper, 10.5 × 14.8 cm",d:"2025",ratio:"691/525",size:.78,support:"paper",
   n:"Redrawing the building I passed unnoticed every single day opened my eyes to its timeless beauty.",
   alt:"Black ink sketch of the Saigon Central Post Office facade with its clock and arched windows, lettered with its Vietnamese name."}
];
/* every work is shown whole: contain, never cropped */
ARCHIVE.forEach(a=>{ MEDIA["art-"+a.id]={src:`img/art-${a.id}.jpg`,alt:a.alt,fit:"contain"}; });
/* the room's door shows the first work as a photograph through a doorway (cropped, not squashed) */
MEDIA["exhibition-door"]={src:`img/art-${ARCHIVE[0].id}.jpg`,alt:"",pos:"50% 40%"};
const label=a=>a.d?`${a.p}, ${a.d}`:a.p;
function exhibitionHTML(){
  return `${hero({kicker:"Exhibition",title:"Inside / Outside",
    sub:"The space between what I see and what I carry.",
    lede:"Some of these pieces started with something tangible. Others started with something invisible. As I paint, the outside world and my internal world bleed together onto the same canvas.",
    meta:"Swipe along the wall to explore, or tap any painting to take a closer look.",
    k:"exhibition-door",ghost:"Chemistry"})}
  <div class="gallery" id="gallery">
    <span class="gallery__rail" aria-hidden="true"></span>
    <span class="gallery__spot" id="gallerySpot" aria-hidden="true"></span>
    <span class="gallery__floor" aria-hidden="true"></span>
    <div class="gallery__wall">${ARCHIVE.map((a,i)=>`
      <button class="work${a.support==="paper"?" work--paper":""}" data-obj="${i}" type="button" style="--ratio:${a.ratio};--ar:${a.ratio.split("/")[0]/a.ratio.split("/")[1]};--size:${a.size}"
        aria-label="${a.t}, ${label(a)}. Open to inspect.">
        <span class="work__frame">
          <span class="work__plate" data-img="art-${a.id}" style="--ratio:${a.ratio}"><span class="fig__ghost">${a.t}</span></span>
        </span>
        <span class="work__label">
          <b>${a.t}</b>
          <span>${label(a)}</span>
          <span class="work__peek">Inspect</span>
        </span>
      </button>`).join("")}</div>
    <p class="mono gallery__hint">Drag along the wall →</p>
    <div class="gallery__cta">
      <p class="mono mono--sentence">Eight of them. The rest of the collection hangs in the full portfolio.</p>
      <a class="btn btn--ink" href="https://canva.link/uouxvz39irst7qt" target="_blank" rel="noopener">See the full portfolio ↗</a>
    </div>
  </div>
  ${screeningHTML()}
  ${B.links([{href:"#/about",label:"About the practice"},{href:"#/work/net-mo",label:"Dream Strokes"},{href:"#/awards",label:"Awards"}])}`;
}

/* ---------- screening room · films, below the paintings ---------- */
const youtubeId=url=>{ const m=String(url||"").match(/(?:youtu\.be\/|[?&]v=|\/shorts\/|\/embed\/|\/live\/)([\w-]{11})/); return m?m[1]:null; };
function screeningHTML(){
  return `<section class="screening" id="room-films" aria-label="Screening room">
    <div class="screening__head">
      <p class="room__kicker">Exhibition · screening room</p>
      <h2 class="room__sub">Films I made</h2>
    </div>
    <div class="screen" id="screen"></div>
    <ol class="program" id="program">${FILMS.map((f,i)=>`
      <li><button type="button" data-film="${i}"${youtubeId(f.url)?"":` data-soon`}>
        <span class="program__num">${String(i+1).padStart(2,"0")}</span>
        <span class="program__text"><b>${f.t}</b><span>${[f.d,f.n].filter(Boolean).join(" · ")||(youtubeId(f.url)?"":"Coming")}</span></span>
      </button></li>`).join("")}</ol>
  </section>`;
}
function bindScreening(){
  const screen=$("#screen"), items=$$("#program [data-film]"); if(!screen) return;
  function show(i,play){
    const f=FILMS[i], id=youtubeId(f.url);
    items.forEach(b=>b.setAttribute("aria-current",String(+b.dataset.film===i)));
    if(!id){ screen.innerHTML=`<p class="screen__ghost"><span class="mono">${f.t}</span><span class="mono">Coming to this screen</span></p>`; return; }
    if(play){
      screen.innerHTML=`<iframe src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0" title="${f.t}" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`;
      return;
    }
    /* a still and a play button until the viewer asks for the film */
    screen.innerHTML=`<button class="screen__play" type="button" aria-label="Play ${f.t}">
      <img src="https://i.ytimg.com/vi/${id}/hqdefault.jpg" alt="" loading="lazy" onerror="this.remove()">
      <span class="screen__btn" aria-hidden="true"></span></button>`;
    $(".screen__play",screen).addEventListener("click",()=>show(i,true));
  }
  items.forEach(b=>b.addEventListener("click",()=>show(+b.dataset.film,false)));
  const first=FILMS.findIndex(f=>youtubeId(f.url));
  show(first<0?0:first,false);
}

/* ---------- router ---------- */
(function(){
  const room=$("#room"), inner=$("#roomInner"), closeBtn=$("#roomClose");
  let lastY=0, lastFocus=null;
  const where=$("#roomWhere");
  /* Awards: one button opens or closes every story at once */
  inner.addEventListener("click",e=>{
    const b=e.target.closest(".awards__all"); if(!b) return;
    const open=b.getAttribute("aria-pressed")!=="true";
    $$(".award",inner).forEach(d=>{ d.open=open; });
    b.setAttribute("aria-pressed",String(open)); b.textContent=open?"Close every story":"Open every story";
  });
  function render(route){
    if(route==="/exhibition"||route==="/archive"||route==="/exhibition/films"){
      inner.innerHTML=exhibitionHTML();
      tieLastWords(inner);
      room.dataset.room="exhibition";
      room.style.setProperty("--accent","var(--pink)");
      where.textContent="Exhibition";
      bindArchive(); bindScreening();
      if(route==="/exhibition/films") requestAnimationFrame(()=>{ room.scrollTop=$("#room-films").offsetTop-$(".room__top").offsetHeight-16; });
    }
    else{
      route=ROOM_ALIASES[route]||route;
      let anchor=null;
      if(!ROOMS[route]){ anchor=route.slice(route.lastIndexOf("/")+1); route=route.slice(0,route.lastIndexOf("/")); }
      const r=ROOMS[route]; if(!r){ try{ location.hash=""; }catch(err){} return; }
      room.style.setProperty("--accent",r.accent);
      room.dataset.room=route.split("/").pop();
      { const w=(r.where||"Deeper").split(" · "); where.innerHTML=(w.length>1?`<span class="room__where-pre">${w[0]} · </span>`:"")+w[w.length-1]; }
      inner.innerHTML=r.blocks.map(([type,arg])=>B[type](arg)).join("");
      tieLastWords(inner);
      paintMedia(inner); wireEvents(inner);
      $$("[data-uncover],[data-part],[data-mask]",inner).forEach(el=>io.observe(el));
      room.scrollTop=0;
      const target=anchor&&document.getElementById("room-"+anchor);
      if(target) requestAnimationFrame(()=>{ room.scrollTop=target.offsetTop-$(".room__top").offsetHeight-16; });
      return;
    }
    paintMedia(inner);
    $$("[data-uncover],[data-part],[data-mask]",inner).forEach(el=>io.observe(el));
    room.scrollTop=0;
  }
  function open(route){
    /* moving from one room to another keeps the place in the story and the focus to return to */
    if(!room.classList.contains("is-open")){ lastY=window.scrollY; lastFocus=document.activeElement; }
    render(route);
    room.classList.add("is-open"); document.body.classList.add("is-locked");
    room.setAttribute("aria-hidden","false"); room.focus();
  }
  function close(){
    /* a film left playing would keep sounding behind the story */
    const playing=$("#screen iframe"); if(playing) playing.remove();
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
  /* Escape closes the top layer only: an open artwork first, then the room */
  addEventListener("keydown",e=>{ if(e.key==="Escape" && room.classList.contains("is-open") && !$("#object").classList.contains("is-open")) closeBtn.click(); });
  route();
})();

/* ---------- deep-space links ----------
   A room opens in place, over the story. The link only changes the hash,
   so the router opens the room, Back closes it, and the scroll position
   underneath is kept for when the reader returns.
------------------------------------------------------------------ */

/* ---------- archive object view ---------- */
function bindArchive(){
  const ov=$("#object"), plate=$("#objectPlate");
  let idx=0;
  function show(i){
    idx=(i+ARCHIVE.length)%ARCHIVE.length;
    const a=ARCHIVE[idx];
    plate.style.setProperty("--ratio",a.ratio);
    const m=media("art-"+a.id);
    plate.innerHTML=m&&m.src?`<img src="${m.src}" alt="${(m.alt||`${a.t}, ${a.p}`).replace(/"/g,"&quot;")}">`:`<span class="mono">${a.t}</span>`;
    $("#objTitle").textContent=a.t;
    $("#objNote").textContent=a.n; delete $("#objNote").dataset.tied; tieLastWords($("#objNote"));
    $("#objMeta").textContent=label(a);
    $("#objCount").textContent=`${String(idx+1).padStart(2,"0")} of ${ARCHIVE.length}`;
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
  dragScroll($(".gallery__wall"));
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
