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
  "ev-tet":{src:"img/ev-tet.jpg",alt:"Hey Tet!: a packed schoolyard of students in uniform crowding toward the stage, phones up, under the yellow arches of the school.",pos:"50% 60%"},
  "ev-sciphony":{src:"img/ev-sciphony.jpg",alt:"The SciPhony team, in purple shirts, gathered in front of the festival backdrop under the school’s yellow archway.",pos:"50% 50%"},
  "ev-tours":{src:"img/ev-tours.jpg",alt:"Two visitors on a sketch tour hold up their drawings of the city on a bridge at night, the Ho Chi Minh City skyline lit behind them.",pos:"50% 60%"},
  "ev-solsound":{src:"img/ev-solsound.jpg",alt:"The Sol Sound stage before the show: drums, guitars and keyboards under a big red screen reading Sol Sound.",pos:"50% 62%"},
  "ev-pitch":{src:"img/ev-pitch.jpg",alt:"Colors of the Pitch: players in red jerseys huddle together on the pitch, hands raised.",pos:"50% 60%"},
  "ev-league":{src:"img/ev-league.jpg",alt:"Trung Vuong Football League: players sit in a circle on the turf, their boots meeting in the middle.",pos:"50% 45%"},
  "ev-identity":{src:"img/ev-identity.jpg",alt:"Colors of Identity: a volunteer stacks decorated cans into a tower at one of the stations.",pos:"60% 50%"},
  "ev-rocket":{src:"img/ev-rocket.jpg",alt:"The open edition of the water rocket contest: three students from another school pump up their bottle rocket on the launch pad.",pos:"55% 50%"},
  "once-upon":{src:"img/once-upon.jpg",alt:"Once Upon the Inside: visitors walk a lit gallery lined with colourful paintings; a child reads the programme.",pos:"50% 55%"},
  /* Dream Strokes OPEN: the ways in, Sol Sound, and the team */
  "op-cards":{src:"img/op-cards.jpg",alt:"The Feel-it! emotion card box beside a fan of rainbow-coloured cards: Joy, Worried and Angry, 24 emotions for ages 5 to 10.",pos:"50% 42%"},
  "op-cardsheet":{src:"img/op-cardsheet.jpg",alt:"The Feel-it! card system on one sheet: the front and back of a card, the 24-card emotion family, five ways to play, the packaging and the design system.",fit:"contain"},
  "op-calendar":{src:"img/op-calendar.jpg",alt:"The cover of the Dream Strokes 2026 calendar: a girl with a paintbrush rides a pink horse across a pastel sky.",pos:"62% 50%"},
  "op-comic":{src:"img/op-comic.jpg",alt:"A panel from Cloud’s Story: a girl with sky-blue hair throws open both arms among stars and purple clouds.",pos:"50% 28%"},
  "ss-band":{src:"img/ss-band.jpg",alt:"Sol Sound in black and white: a singer with a guitar at the microphone, the rest of the band behind.",pos:"45% 50%"},
  "ss-bandages":{src:"img/ss-bandages.jpg",alt:"The Bandages on stage at Sol Sound, their name on the big screen, the audience in rows in front.",pos:"52% 60%"},
  "ss-logo":{src:"img/ss-logo.jpg",alt:"The Sol Sound Show poster art: glowing hand-drawn letters, and a girl in a red coat hugging a heart on the D."},
  "ds-team-1":{src:"img/ds-team-1.jpg",alt:"Eight members of the Dream Strokes team on a football pitch, making heart shapes with their hands.",pos:"62% 55%"},
  "ds-team-2":{src:"img/ds-team-2.jpg",alt:"The Dream Strokes team together in a sunny alley under yellow flowers.",pos:"42% 60%"},
  "ds-team-3":{src:"img/ds-team-3.jpg",alt:"The Dream Strokes team in a school hall, everyone making a heart with their hands.",pos:"50% 55%"},
  "ds-mirror-1":{src:"img/ds-mirror-1.webp",alt:"A child’s self-portrait from The Magic Mirror: a girl with black hair and a gold crown, in a pink mirror frame.",fit:"contain"},
  "ds-mirror-2":{src:"img/ds-mirror-2.webp",alt:"A child’s self-portrait from The Magic Mirror: a boy spinning a basketball on one finger on a court, in a blue mirror frame.",fit:"contain"},
  "ds-advisor":{src:"img/ds-advisor.jpg",alt:"A video call with Phuong Thao Nguyen, our advisor; I am in the small window in the corner.",pos:"60% 45%"},
  /* research rooms: never participants; the work, the team, the tools */
  "rs-1":{src:"img/rs-1.jpg",alt:"Inkling’s home page: AI draws the first line. You decide the rest. Beside it, a drawing where a dotted AI line turns into the user’s own strokes, a hill and a sun.",pos:"30% 40%"},
  "rs-2":{src:"img/rs-2.jpg",alt:"Gia Han, holding a microphone, presents in front of a screen showing a warning sign.",pos:"55% 40%"},
  "tc-mockup":{src:"img/tc-mockup.jpg",alt:"The un-wrap mockup sheet: the book, the five-course journey from The Reservation to Your Signature Dish, four spreads from inside the book, and what is included: a question envelope, ingredient stickers and recipe cards."},
  "tc-cloud":{src:"img/tc-cloud.jpg",alt:"Fluffy Cloud: a soft blue cloud with one eye open, one winking, and orange swirls on its cheeks, in a sunny sky.",pos:"40% 50%"},
  "tc-arch-1":{src:"img/tc-arch-1.jpg",alt:"A parcel tied with string on a table, with a brain, a heart and a cloud rising from it."},
  "tc-arch-2":{src:"img/tc-arch-2.jpg",alt:"Hands open the parcel; a small child, two adult figures and a shield glow above it."},
  "tc-arch-3":{src:"img/tc-arch-3.jpg",alt:"A hand picks from shelves of labelled jars of ingredients."},
  "tc-arch-4":{src:"img/tc-arch-4.jpg",alt:"A chef stirs a glowing pot on the stove, adding spices."},
  "tc-arch-5":{src:"img/tc-arch-5.jpg",alt:"A warm bowl of stew, steaming, on a plate."},

  "bl-1":{src:"img/bl-1.jpg",alt:"At a Brain-Life booth, two team members fit an EEG headband on a visitor beside a model mountain.",pos:"50% 35%"},
  "bl-2":{src:"img/bl-2.jpg",alt:"The Brain-Life team in the office, in front of the logo wall, giving thumbs up.",pos:"50% 50%"},
  "bl-3":{src:"img/bl-3.jpg",alt:"A Brain-Life booth table: a laptop with the logo, an EEG headband, the app on a phone, notebooks and a Just Breathe tote.",pos:"50% 50%"},
  "bl-4":{src:"img/bl-4.jpg",alt:"A Brain-Life team meeting in the office, notebooks open, by the blue wall.",pos:"50% 50%"},
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
/* Dream Strokes on Facebook (the page is called Net Mo Project). Empty hides the button. */
const NETMO_FACEBOOK = "https://www.facebook.com/netmowprj";
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
  else{
    document.body.classList.add("is-locked"); setTimeout(()=>btn.focus(),300);
    /* the door opens by itself after a moment, so no one has to work to get in;
       a knock, a key or a scroll opens it sooner */
    const auto=setTimeout(knock,REDUCED?0:1600);
    ["keydown","wheel","touchstart"].forEach(ev=>addEventListener(ev,knock,{once:true,passive:true}));
    function knock(){ clearTimeout(auto); if(btn.disabled) return; btn.classList.add("is-knocking","k3"); btn.disabled=true; setTimeout(enter,REDUCED?0:320); }
    btn?.addEventListener("click",knock);
  }
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
    /* only a wall nobody has moved yet gets the hint, so a chosen room is never undone */
    es.forEach(e=>{ if(e.isIntersecting && !REDUCED && el.scrollLeft<4){
      el.scrollTo({left:40,behavior:"smooth"});
      setTimeout(()=>{ if(Math.abs(el.scrollLeft-40)<8) el.scrollTo({left:0,behavior:"smooth"}); },600);
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

/* line drawings for things on a shelf that have no photograph */
const SHELF_MARKS={
  plans:'<path d="M12 6h18l7 7v29H12z"/><path d="M30 6v7h7"/><path d="M17 20h14M17 26h14M17 32h9"/>'
};
/* Vietnam's outline (Natural Earth, 1:50m), projected for the team map: x = (lon − 102) × 40 × cos 16°, y = (23.6 − lat) × 40 */
const VN_OUTLINE="M79.4,528.4L80.1,530.4L79.8,535.0L78.3,539.6L78.8,541.6L77.6,542.8L75.1,534.3L71.8,530.6L71.1,529.2L73.0,529.3L76.4,526.9L78.0,526.9L79.4,528.4ZM229.7,83.7L227.8,84.0L223.4,84.1L219.4,87.8L216.7,89.3L212.5,90.6L208.0,92.6L206.7,96.2L206.6,98.9L205.9,101.8L198.6,106.1L196.5,105.6L195.1,104.0L193.0,104.4L191.5,105.1L189.8,105.0L187.9,106.0L185.4,105.7L183.0,104.4L181.7,104.0L180.1,104.0L179.8,105.6L182.2,111.8L182.8,114.6L175.0,122.9L175.8,128.3L173.7,132.4L169.0,135.8L160.2,144.3L156.2,144.5L153.2,146.4L146.6,160.5L146.6,165.3L145.5,168.8L145.8,172.2L142.9,178.9L139.9,181.7L139.3,185.3L143.5,192.8L144.0,194.1L146.4,198.2L147.6,201.0L149.5,203.9L156.3,211.3L159.4,213.6L163.0,215.2L169.6,221.9L173.0,226.1L171.5,229.1L172.2,235.2L167.5,233.4L168.0,234.1L173.7,237.5L182.1,249.3L189.4,255.1L196.9,261.8L199.2,268.1L205.9,272.3L213.4,278.3L213.0,279.7L215.1,281.3L220.1,284.5L223.1,287.9L224.3,291.1L226.2,291.6L228.3,290.8L230.3,290.5L231.8,290.8L234.1,294.3L237.2,297.5L238.7,300.4L240.0,300.0L241.0,300.4L241.2,302.8L241.7,304.4L245.9,309.1L247.9,313.5L252.9,320.6L256.6,324.7L259.3,326.9L262.3,328.9L265.2,336.8L266.8,343.9L270.0,351.9L272.4,355.4L272.5,361.9L274.4,368.6L276.5,373.2L277.1,377.8L277.8,380.1L278.6,381.9L280.8,389.7L280.2,393.4L278.7,389.8L278.8,400.4L280.2,406.0L279.6,412.8L281.1,415.2L283.6,423.0L285.5,425.8L285.3,435.2L286.3,440.0L283.8,437.2L282.1,433.9L279.7,435.6L277.6,438.2L280.9,448.4L277.1,447.4L277.4,461.1L279.0,464.3L279.1,465.8L278.7,467.7L277.6,465.6L277.4,463.6L276.8,464.0L276.8,465.1L275.6,467.5L275.2,470.5L276.6,473.1L276.8,475.0L275.8,477.4L274.2,480.0L270.7,480.3L269.9,485.3L268.6,490.5L262.3,491.4L257.6,496.0L251.9,497.8L246.8,502.4L241.1,506.6L237.5,507.2L234.4,508.1L230.8,515.2L224.7,516.0L214.0,521.8L210.3,524.6L207.0,525.7L202.3,528.1L201.3,527.2L199.7,525.1L195.6,524.1L193.6,521.7L193.0,518.8L192.5,517.6L191.6,519.3L190.9,526.4L190.2,528.0L188.5,528.7L185.1,526.7L181.8,522.6L177.1,525.4L178.5,525.8L180.7,525.5L182.3,526.2L183.7,529.0L183.6,530.4L182.9,532.2L178.5,532.4L172.7,531.8L171.6,532.1L177.0,534.7L181.8,536.3L184.0,538.0L184.0,539.3L181.3,541.6L179.1,544.3L179.1,546.1L179.1,548.0L176.7,549.6L175.2,549.3L171.1,546.4L159.0,535.1L160.9,538.3L173.3,551.2L175.5,555.4L175.8,558.4L174.5,559.9L172.4,561.6L168.3,561.8L161.6,557.0L150.9,545.5L147.3,544.0L158.1,557.1L159.9,560.2L161.7,563.9L161.2,566.1L160.3,568.1L134.6,580.3L130.8,585.5L127.7,592.0L122.7,595.5L119.7,598.8L111.2,600.7L106.5,600.1L111.4,594.1L108.4,591.9L108.2,576.6L109.4,559.8L111.6,551.3L114.9,549.3L118.9,548.0L119.0,546.2L118.6,544.2L116.4,541.3L114.0,540.0L110.5,539.4L107.7,535.9L105.6,536.0L102.4,537.2L100.5,535.7L99.7,533.3L96.7,530.4L93.3,527.6L94.9,527.1L96.7,525.5L98.6,523.4L103.4,523.1L108.3,523.2L109.6,522.6L111.6,520.4L114.7,517.5L117.1,515.9L117.7,514.6L116.7,511.6L116.2,508.5L117.1,507.5L121.5,508.1L126.3,509.5L127.4,510.2L130.2,506.4L131.0,505.9L132.8,505.9L137.5,505.2L142.2,504.2L144.4,504.4L146.5,507.0L148.2,509.5L149.0,509.7L151.4,508.6L153.4,509.9L157.6,512.1L160.1,512.2L158.9,507.1L160.3,503.5L160.0,502.5L157.6,500.9L149.6,494.2L148.3,492.2L148.5,489.1L148.2,484.5L147.5,481.6L147.6,479.9L148.1,478.6L149.6,478.1L151.0,477.9L152.1,476.7L154.0,473.7L157.8,473.9L163.0,475.7L166.9,476.7L169.2,476.5L169.7,476.1L169.6,474.5L169.9,467.5L169.7,466.1L173.0,465.4L178.1,465.2L180.7,464.8L183.2,461.9L189.6,460.9L194.2,457.0L198.4,452.9L200.4,451.8L203.0,451.1L204.9,451.2L207.4,453.6L209.4,452.2L211.7,449.4L212.9,446.7L213.6,442.4L213.2,435.8L211.9,430.6L210.8,426.7L210.5,422.8L213.2,415.0L215.5,406.5L215.1,403.1L212.6,397.8L210.0,391.4L207.2,384.3L206.2,383.2L205.4,381.2L205.0,378.9L206.1,371.7L206.3,369.3L209.5,366.0L211.2,362.2L212.8,358.0L212.2,355.8L212.0,351.3L212.4,349.1L211.7,347.4L210.7,344.8L211.3,343.1L213.6,341.7L214.9,339.3L216.6,336.4L217.4,333.8L216.2,331.6L213.9,328.3L209.9,325.4L205.3,321.6L203.0,319.3L201.2,316.9L199.5,314.1L198.6,311.9L199.5,310.5L206.1,307.1L207.3,305.9L208.0,304.1L207.5,302.3L205.7,301.3L203.7,300.6L200.6,298.5L194.9,292.8L192.3,291.5L189.6,289.9L188.1,288.1L186.5,283.4L185.8,282.9L184.2,284.4L182.2,285.9L180.6,285.6L179.0,284.3L178.3,282.5L176.6,280.0L174.8,278.0L174.3,271.2L174.0,268.9L173.1,265.8L171.7,264.7L170.2,263.9L166.6,258.3L164.2,255.3L154.0,247.4L152.8,246.1L150.1,242.9L145.3,238.2L141.9,234.5L139.5,230.6L138.3,227.3L138.0,224.7L135.3,220.9L133.0,217.8L130.7,216.8L128.2,216.4L125.9,214.6L121.6,210.5L119.8,207.8L118.7,206.0L118.7,204.2L119.7,201.1L120.9,199.3L121.0,198.0L119.8,196.8L115.1,194.9L104.5,191.9L100.5,189.6L96.8,186.6L94.0,184.6L81.1,176.2L77.1,174.8L73.8,173.3L72.7,171.8L72.9,170.4L74.3,169.4L78.0,167.2L79.3,164.7L78.9,161.4L77.4,158.1L78.1,157.0L79.3,156.9L81.8,156.8L86.9,156.6L97.9,159.6L99.5,159.3L105.5,153.8L107.7,150.6L108.2,147.8L109.4,146.1L112.6,143.3L112.6,140.7L111.1,137.2L109.5,135.9L108.1,135.3L103.8,135.8L102.9,135.0L102.4,132.4L102.1,130.9L100.7,129.0L96.0,127.5L92.0,127.0L91.0,126.3L92.6,124.6L95.3,122.8L97.4,121.8L99.0,120.0L99.3,118.1L97.3,116.5L94.6,114.7L90.3,111.2L84.4,107.4L80.8,106.2L78.9,106.4L72.4,109.5L68.8,111.6L65.9,115.3L62.9,116.1L59.8,114.5L56.3,112.8L46.6,110.4L42.5,108.3L34.0,95.9L32.7,93.4L33.5,90.5L34.1,86.4L35.0,83.7L36.5,81.2L36.9,79.0L36.5,76.7L35.3,75.5L33.7,75.1L32.5,74.6L31.4,71.7L30.7,72.1L29.6,75.6L28.4,76.9L26.7,77.5L25.5,77.0L24.6,75.5L24.3,73.1L23.4,69.9L22.4,67.8L18.7,65.7L17.0,62.9L11.6,56.9L7.0,52.6L4.9,48.8L6.8,47.4L9.1,45.4L11.6,42.2L14.4,38.1L15.6,35.7L16.5,34.7L18.1,34.0L19.9,34.4L23.0,36.0L27.7,38.1L31.9,40.5L33.6,43.0L36.0,45.4L37.8,46.1L38.7,45.9L41.4,44.1L43.7,42.3L43.7,40.3L45.9,38.5L48.7,35.5L50.0,33.4L51.0,33.2L52.1,33.8L56.6,40.1L57.4,40.5L58.7,39.5L60.4,34.6L62.3,32.7L63.0,33.2L73.6,42.5L74.7,42.4L75.8,42.0L76.5,40.6L77.4,37.3L79.0,33.9L82.4,32.0L85.1,31.6L86.1,33.3L88.4,35.5L91.2,35.8L97.2,31.8L99.1,31.2L101.2,31.3L103.3,31.1L105.4,29.6L107.5,27.6L108.2,23.6L108.7,20.0L110.2,18.5L111.9,17.6L115.2,16.2L122.6,12.8L124.5,11.1L125.9,10.2L128.8,11.7L132.3,14.6L134.4,16.8L135.8,19.1L136.4,21.1L141.9,22.8L145.4,25.2L147.8,27.1L150.1,27.0L152.4,26.5L153.8,25.0L156.4,25.0L159.5,25.2L160.9,25.8L163.4,29.2L164.5,29.7L166.8,29.5L171.1,28.2L174.6,27.7L177.8,29.0L183.8,32.8L182.1,35.6L180.8,38.5L178.1,40.6L176.2,41.1L175.0,43.9L174.4,48.2L175.1,50.3L176.6,51.0L178.3,52.5L179.0,54.3L179.2,58.5L179.1,63.3L179.3,64.8L180.6,64.6L181.9,64.0L184.3,64.7L187.4,65.9L189.4,67.2L191.1,67.0L192.5,68.3L193.0,70.6L194.6,72.2L199.1,75.3L202.7,75.6L205.8,79.6L208.9,78.3L210.4,80.1L216.9,79.4L221.4,77.8L223.1,78.2L227.2,81.6L229.7,83.7ZM177.5,596.7L176.5,596.8L175.6,596.0L179.1,593.3L178.8,595.1L178.9,596.0L177.5,596.7ZM198.7,528.1L195.5,530.5L195.2,528.5L198.1,527.2L199.0,526.2L199.7,526.2L198.7,528.1ZM187.1,111.4L186.6,112.1L184.7,110.3L183.4,109.4L184.4,106.9L186.7,109.7L187.1,111.4ZM215.4,95.3L209.9,100.3L207.8,100.3L209.7,94.6L210.6,93.2L213.9,95.2L215.4,95.3ZM212.3,106.9L210.2,108.0L207.6,107.9L210.7,105.9L212.2,103.5L213.4,102.6L213.4,104.8L212.3,106.9ZM193.5,114.1L191.9,114.3L188.8,111.0L190.5,109.3L193.9,110.5L194.7,111.3L194.7,112.0L193.9,113.6L193.5,114.1Z";
const vnXY=(lon,lat)=>[+((lon-102)*40*Math.cos(16*Math.PI/180)).toFixed(1),+((23.6-lat)*40).toFixed(1)];
/* line drawings for the steps of a working week (48 × 48, stroke only) */
const LINE_ICONS={
  call:'<rect x="6" y="9" width="36" height="24" rx="2"/><path d="M2 39h44"/><circle cx="24" cy="18" r="4"/><path d="M16 29c1.5-4 4.5-6 8-6s6.5 2 8 6"/>',
  filter:'<path d="M7 9h34L28 25v12l-8 4V25z"/><path d="M12 4h2M22 3h2M33 5h2"/>',
  cluster:'<rect x="5" y="6" width="11" height="11" rx="1"/><rect x="18" y="9" width="11" height="11" rx="1"/><rect x="9" y="27" width="11" height="11" rx="1"/><rect x="31" y="26" width="11" height="11" rx="1"/><path d="M24 31h5" stroke-dasharray="2 3"/>',
  flag:'<path d="M12 44V6"/><path d="M12 8h24l-5 7 5 7H12"/>',
  screen:'<rect x="5" y="7" width="38" height="30" rx="2"/><path d="M5 14h38"/><rect x="10" y="19" width="12" height="13"/><path d="M27 20h11M27 25h11M27 30h7"/>'
};
/* a persona's face: a cat, drawn in a few lines */
const PERSONA_FACE='<path d="M14 26 12 10l12 9h16l12-9-2 16"/><path d="M14 26c-2 14 6 26 18 26s20-12 18-26"/><circle cx="25" cy="34" r="2"/><circle cx="39" cy="34" r="2"/><path d="M30 41h4l-2 2z"/><path d="M8 38l10 1M8 44l10-2M56 38l-10 1M56 44l-10-2"/>';
/* one gathering or way in: a photo, what kind of thing it is, its name, what it was, one number */
const gcard=e=>`<article class="gevent">
  <div class="fig__plate" data-img="${e.k}" data-slot="" style="--ratio:4/3"><div class="fig__ghost">${e.ghost}</div></div>
  ${e.first?`<p class="gevent__first">${e.first}</p>`:""}
  <p class="gevent__meta">${e.meta}</p>
  <h4 class="gevent__name">${e.name}</h4>
  <p class="gevent__what">${e.p}</p>
  ${e.fact?`<p class="gevent__fact">${e.fact}</p>`:""}
  ${e.event?`<p class="aside-link" data-event-row hidden><a data-event="${e.event}" href="#">Event page ↗</a></p>`:""}
</article>`;

const B={
  hero,
  /* a section heading: the title, then whatever follows the first " · " as metadata */
  kicker:t=>{ const o=typeof t==="string"?{t}:t, [h,...m]=o.t.split(" · ");
    return `<h3 class="room__head"${o.id?` id="room-${o.id}"`:""}><span class="room__head-t">${h}</span>${m.length?`<span class="room__head-meta">${m.join(" · ")}</span>`:""}</h3>`; },
  title:t=>`<h2 id="roomTitle">${t}</h2>`,
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
  /* the honours as a story: the years on one line, then one chapter per group, and in each
     a drawn medal beside what it was, her story about it one tap away */
  awards:()=>{
    const years=[...new Set(AWARDS.map(a=>a.t))].sort(), gc=id=>AWARD_GROUPS.find(g=>g.id===id).dc;
    const medal=(a,big)=>`<svg class="medal${big?" medal--big":""}" viewBox="0 0 120 150" aria-hidden="true" style="--dc:${gc(a.g)}">
      <path class="medal__ribbon" d="M38 4h18l12 58H50zM82 4H64L52 62h18z"/>
      <circle class="medal__disc" cx="60" cy="100" r="40"/><circle class="medal__ring" cx="60" cy="100" r="31"/>
      <g class="medal__mark" transform="translate(42 82) scale(1.5)">${AWARD_MARKS[a.m]}</g></svg>`;
    return `<section class="blk ayears" aria-label="The honours by year">
      <p class="ayears__k">The road here · ${years[0]} to ${years[years.length-1]}</p>
      <ol>${years.map(y=>`<li style="--n:${AWARDS.filter(a=>a.t===y).length}"><p class="ayears__y">${y}</p><ul>${AWARDS.filter(a=>a.t===y).map(a=>`<li style="--dc:${gc(a.g)}"><a href="#/awards/${a.g}" data-jump="room-${a.g}">${medal(a)}<span>${a.short}</span></a></li>`).join("")}</ul></li>`).join("")}</ol>
    </section>
    ${B.chapters({route:"/awards",items:AWARD_GROUPS.map((g,i)=>({n:String(i+1).padStart(2,"0"),id:g.id,t:g.label,s:g.label.split(" & ")[0],p:g.p}))})}
    ${AWARD_GROUPS.map((g,i)=>{ const list=AWARDS.filter(a=>a.g===g.id); return `${B.chapter({n:String(i+1).padStart(2,"0"),id:g.id,t:g.label,p:g.p})}
      <div class="blk alist" style="--dc:${g.dc}">${list.map(a=>`<article class="aitem">
        <div class="aitem__medal">${a.k?`<div class="aitem__photo">${fig({k:a.k,ratio:"1/1",ghost:a.short})}</div>`:""}${medal(a,true)}<p class="aitem__year">${a.t}</p></div>
        <div class="aitem__text"><p class="aitem__p">${a.p}</p><h4>${a.h}</h4>${a.cap?`<p class="aitem__cap">${a.cap}</p>`:""}<details class="aitem__more"><summary>The story behind it</summary><p class="aitem__s">${a.s}</p></details></div>
      </article>`).join("")}</div>`; }).join("")}`;
  },
  about:()=>aboutHTML(),
  /* a product, introduced on one line: its mark, its name, my role, and the way to the real thing */
  product:o=>`<section class="product"${o.id?` id="room-${o.id}"`:""}>
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
    <div class="gtheme__events">${t.events.map(gcard).join("")}</div>
  </section>`).join("")}</div>`,
  /* ---- a long room told in chapters (Dream Strokes) ---- */
  /* every chapter on one map, then a slim bar that stays and marks where you are */
  chapters:o=>`<nav class="chmap${o.ring?" chmap--ring":""}" aria-label="The parts of this page">${o.ring?`<svg class="chmap__orbit" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><ellipse cx="50" cy="50" rx="34" ry="33"/>${o.items.map((_,i)=>{ const a=(i/o.items.length)*2*Math.PI-Math.PI/2; return `<line x1="50" y1="50" x2="${(50+34*Math.cos(a)).toFixed(1)}" y2="${(50+33*Math.sin(a)).toFixed(1)}"/>`; }).join("")}</svg><div class="chmap__core"><img src="${o.ring.logo}" alt="" width="300" height="300"><b>${o.ring.name}</b></div>`:""}<ol data-n="${o.items.length}">${o.items.map(c=>`<li><a href="#${o.route}/${c.id}" data-jump="room-${c.id}"><span class="chmap__n">${c.n}</span><b>${c.t}</b><span class="chmap__p">${c.p}</span></a></li>`).join("")}</ol></nav>
  <nav class="chbar" aria-label="Chapters"><div class="chbar__in"><ol>${o.items.map(c=>`<li><a href="#${o.route}/${c.id}" data-jump="room-${c.id}" title="${c.t}"><i aria-hidden="true"></i><span class="chbar__n">${c.n}</span><span class="chbar__t">${c.s}</span></a></li>`).join("")}</ol><p class="chbar__now" aria-hidden="true"></p></div></nav>`,
  /* a chapter's opening: its number large, its title, one line on what it holds */
  chapter:o=>`<header class="chap" id="room-${o.id}"><p class="chap__n">${o.n}</p><h3 class="chap__t">${o.t}</h3>${o.p?`<p class="chap__p">${o.p}</p>`:""}${o.skills?`<ul class="chap__skills" aria-label="Skills in this part">${o.skills.map(x=>`<li>${x}</li>`).join("")}</ul>`:""}</header>`,
  /* two ways of being in a room, side by side: the same dot in rows, then dots each their own (dot = state) */
  contrast:o=>{ const same=[...Array(20)].map((_,i)=>`<circle cx="${18+(i%5)*24}" cy="${21+Math.floor(i/5)*24}" r="7"/>`).join(""),
    hues=["#EF6A45","#EE4187","#2B4DE0","#0F918B","#F2B33D","#6A4BD6"],
    free=[...Array(20)].map((_,i)=>{ const a=i*2.399, r=8+((i*37)%46); return `<circle cx="${(66+Math.cos(a)*r).toFixed(1)}" cy="${(57+Math.sin(a)*r*.88).toFixed(1)}" r="${3.5+((i*5)%9)}" fill="${hues[i%6]}"/>`; }).join("");
    return `<div class="blk contrast">${[[o.a,same,"is-same"],[o.b,free,"is-free"]].map(([x,dots,c])=>`<figure class="contrast__side ${c}"><svg viewBox="0 0 132 114" aria-hidden="true">${dots}</svg><figcaption><span>${x.k}</span>${x.t}</figcaption></figure>`).join("")}</div>`; },
  /* what a project is for, in two lines worth stopping at */
  statements:a=>`<div class="blk statements">${a.map(x=>`<div><p class="statements__k">${x.k}</p><p class="statements__t">${x.t}</p></div>`).join("")}</div>`,
  /* two columns that each hold ordinary blocks: words on one side, pictures on the other */
  split:o=>`<div class="blk split${o.mid?" split--mid":""}"><div class="split__a">${o.a.map(([t,x])=>B[t](x)).join("")}</div><div class="split__b">${o.b.map(([t,x])=>B[t](x)).join("")}</div></div>`,
  /* one moment worth stopping at: a dark band, words beside artwork seen whole */
  feature:o=>`<section class="blk feature" id="room-${o.id}"><div class="feature__text"><p class="feature__k">${o.k}</p><h4>${o.h}</h4>${o.p.map(x=>`<p class="feature__p">${x}</p>`).join("")}</div><div class="feature__art">${o.figs.map(fig).join("")}</div></section>`,
  /* several things, one at a time: the list to choose from beside the one chosen */
  switcher:o=>`<div class="blk switcher">
    <div class="switcher__tabs" role="tablist" aria-label="${o.label}">${o.items.map((x,i)=>`<button type="button" role="tab" id="sw-${x.id}" aria-controls="swp-${x.id}" aria-selected="${i===0}"${i?' tabindex="-1"':""}><span class="switcher__meta">${x.meta}</span><span class="switcher__name">${x.name}</span><span class="switcher__fact">${x.fact}</span></button>`).join("")}</div>
    ${o.items.map((x,i)=>`<div class="switcher__panel" role="tabpanel" id="swp-${x.id}" aria-labelledby="sw-${x.id}"${i?" hidden":""}>
      ${fig({k:x.k,ratio:"3/2",ghost:x.ghost})}
      <p class="switcher__p">${x.p}</p>
      ${x.more?`<div class="switcher__more">${x.more.map(m=>fig({...m,ratio:"4/3"})).join("")}</div>`:""}
    </div>`).join("")}
  </div>`,
  /* a cycle: each step hands on to the next, and a thin line carries the last back to the first */
  loop:o=>`<div class="blk loop"><ol data-n="${o.items.length}">${o.items.map((x,i)=>`<li>${x.icon?`<svg class="loop__icon" viewBox="0 0 48 48" aria-hidden="true">${LINE_ICONS[x.icon]}</svg>`:""}<span class="loop__n">${String(i+1).padStart(2,"0")}</span><b>${x.h}</b><p>${x.p}</p></li>`).join("")}</ol><p class="loop__back"><span>↺ ${o.back}</span></p></div>`,
  /* a research persona as a profile card: who, their story, then goals and needs side by side */
  persona:o=>`<article class="blk persona">
    <header class="persona__id"><div class="persona__face" aria-hidden="true"><svg viewBox="0 0 64 64">${PERSONA_FACE}</svg></div><div><p class="persona__k">${o.k}</p><h4>${o.name}</h4><p class="persona__meta">${o.meta}</p></div></header>
    <p class="persona__story">${o.story}</p>
    <div class="persona__cols">${o.cols.map(c=>`<section><p class="persona__h">${c.h}</p><ul>${c.items.map(i=>`<li>${i}</li>`).join("")}</ul></section>`).join("")}</div>
    <ul class="persona__likes" aria-label="What helps">${o.likes.map(l=>`<li>${l}</li>`).join("")}</ul>
  </article>`,
  /* how someone moves through a product: stops on a rail, a dot for each (dot = location) */
  journey:a=>`<ol class="blk journey">${a.map(x=>`<li><p class="journey__k">${x.k}</p><b>${x.h}</b><p class="journey__p">${x.p}</p></li>`).join("")}</ol>`,
  /* a method told as steps of a recipe: the picture, the kitchen word, what it stands for */
  recipe:a=>`<ol class="blk recipe">${a.map((x,i)=>`<li>${fig({k:x.k,ratio:"358/452",ghost:x.ghost})}<div><p class="recipe__n">${String(i+1).padStart(2,"0")}</p><h4>${x.h}</h4><p class="recipe__eq">= ${x.eq}</p><p class="recipe__p">${x.p}</p></div></li>`).join("")}</ol>`,
  /* an object cut out of its ground, standing in space: it tilts toward the pointer and casts a soft shadow */
  object3d:o=>`<figure class="blk object3d"><div class="object3d__stage"><img class="object3d__img" src="${o.src}" width="${o.w}" height="${o.h}" alt="${o.alt}" loading="lazy" decoding="async"></div><figcaption>${o.cap}</figcaption></figure>`,
  /* one screen of an interface, rebuilt in HTML from its design (its words in English) */
  formmock:o=>`<figure class="blk formmock"><div class="browser__bar" aria-hidden="true"><i></i><i></i><i></i><span>${o.url}</span></div>
    <div class="formmock__screen"><svg class="formmock__art" viewBox="0 0 200 170" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><linearGradient id="fmSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#66B1DB"/><stop offset="1" stop-color="#ABEDFF"/></linearGradient></defs>
      <rect width="200" height="170" fill="url(#fmSky)"/><circle cx="160" cy="34" r="16" fill="#FFFCDF"/><path d="M0 120c40-18 80-22 120-12s60 4 80-4v66H0z" fill="#E1FFE3"/><path d="M0 132c50-10 110-6 200-22v60H0z" fill="#3EAE94" opacity=".55"/>
      <path d="M10 150 190 112" stroke="#305165" stroke-width="2"/><g transform="rotate(-12 100 120)"><rect x="40" y="96" width="120" height="30" rx="6" fill="#E8FCFF" stroke="#305165" stroke-width="2"/><path d="M40 112h120" stroke="#3EAE94" stroke-width="5"/>${[52,72,92,112,132].map(x=>`<rect x="${x}" y="100" width="12" height="9" rx="1.5" fill="#66B1DB"/>`).join("")}<path d="M88 96l8-14h10l8 14" fill="none" stroke="#305165" stroke-width="2"/></g></svg>
      <div class="formmock__body"><p class="formmock__t">${o.title}</p><p class="formmock__s">${o.sub}</p><span class="formmock__btn">${o.button}</span><p class="formmock__m">${o.meta}</p></div></div>
    <figcaption>${o.cap}</figcaption></figure>`,
  /* an interface's colours and type, as swatches */
  palette:o=>`<div class="blk palette"><p class="palette__k">${o.k}</p><ul>${o.colors.map(c=>`<li><i style="--dc:${c}"></i><span>${c}</span></li>`).join("")}</ul><p class="palette__type"><span>${o.typeK}</span>${o.font}</p></div>`,
  /* the room in one look, for a quick reader: my role, the team, when, what came of it, where to check */
  glance:o=>`<section class="blk glance" aria-label="At a glance"><p class="glance__k">At a glance</p>
    <dl class="glance__facts"><div><dt>My role</dt><dd>${o.role}</dd></div><div><dt>Team</dt><dd>${o.team}</dd></div><div><dt>When</dt><dd>${o.when}</dd></div></dl>
    <ul class="glance__results">${o.results.map(r=>`<li>${r}</li>`).join("")}</ul>
    ${(o.links||[]).filter(l=>l.href).length?`<p class="glance__links">${o.links.filter(l=>l.href).map(l=>`<a href="${l.href}" target="_blank" rel="noopener">${l.label} ↗</a>`).join("")}</p>`:""}
  </section>`,
  /* several questions whose lines meet in one answer (line = connection, dot = where they meet) */
  converge:o=>`<div class="blk converge"><ul>${o.items.map(x=>`<li style="--dc:${x.c}"><p class="converge__k">${x.k}</p><p class="converge__t">${x.t}</p></li>`).join("")}</ul>
    ${o.answer?`<svg class="converge__lines" viewBox="0 0 300 60" preserveAspectRatio="none" aria-hidden="true"><path d="M50 0C50 34 150 26 150 60M150 0V60M250 0C250 34 150 26 150 60"/></svg>
    <p class="converge__a"><i aria-hidden="true"></i>${o.answer}</p>`:""}</div>`,
  /* who we work with: what they are to us in mono, their name in serif */
  partners:a=>`<div class="blk partners">${a.map(x=>`<div><p class="partners__k">${x.k}</p><h4>${x.h}</h4>${x.p?`<p class="partners__p">${x.p}</p>`:""}</div>`).join("")}</div>`,
  /* one group in photographs: a large one, two beneath it */
  mosaic:a=>`<div class="blk mosaic">${a.map(fig).join("")}</div>`,
  /* the things we make: one held up large, the others listed beside it */
  shelf:o=>`<div class="blk shelf">
    <article class="shelf__main">${fig({k:o.main.k,ratio:o.main.ratio,ghost:o.main.ghost})}<div><p class="shelf__k">${o.main.meta}</p><h4>${o.main.name}</h4><p class="shelf__p">${o.main.p}</p><p class="shelf__badge">${o.main.badge}</p></div></article>
    <ul class="shelf__rest">${o.rest.map(x=>`<li>${x.k?fig({k:x.k,ratio:"1/1",ghost:x.ghost}):`<div class="shelf__mark" aria-hidden="true"><svg viewBox="0 0 48 48">${SHELF_MARKS[x.mark]}</svg></div>`}<div><p class="shelf__k">${x.meta}</p><h4>${x.name}</h4><p class="shelf__p">${x.p}</p></div></li>`).join("")}</ul>
  </div>`,
  /* the whole project as a chain, on a dark band: what goes in, what we do, who it reaches, what changes */
  impact:o=>`<section class="blk impact"><p class="impact__k">${o.k}</p>
    <ol class="impact__model">${o.cols.map(c=>`<li><p class="impact__h">${c.h}</p>${c.items.map(n=>`<div><b>${n.b}</b><span>${n.s}</span></div>`).join("")}</li>`).join("")}</ol>
    <div class="impact__end">${fig(o.fig)}<p class="impact__p">${o.p}</p></div></section>`,
  /* who backs the project and how: one row each, a dot under every kind of help */
  backers:o=>`<div class="blk backers"><table><caption class="vh">${o.caption}</caption>
    <thead><tr><th scope="col">${o.first}</th>${o.cols.map(c=>`<th scope="col">${c}</th>`).join("")}</tr></thead>
    <tbody>${o.rows.map(r=>`<tr><th scope="row"><b>${r.h}</b><span>${r.p}</span></th>${o.cols.map(c=>`<td>${r.on.includes(c)?`<i aria-hidden="true"></i><span class="vh">Yes</span>`:""}</td>`).join("")}</tr>`).join("")}</tbody>
  </table></div>`,
  /* where the team is: Vietnam from its outline, a dot per place, a line from where it started to each */
  vnmap:o=>{ const pl=o.places.map(p=>({...p,xy:vnXY(p.lon,p.lat)})), st=pl.find(p=>p.start).xy;
    return `<figure class="blk vnmap" data-draw>
    <svg class="vnmap__svg" viewBox="0 0 500 615" role="img" aria-labelledby="vnmapT"><title id="vnmapT">${o.title}</title>
      <defs><linearGradient id="vnLand" x1="0" y1="0" x2=".35" y2="1"><stop offset="0" stop-color="#F7C9DA"/><stop offset=".5" stop-color="#D3E3F8"/><stop offset="1" stop-color="#FBE6B6"/></linearGradient></defs>
      <path class="vnmap__land" d="${VN_OUTLINE}"/>
      ${o.isles.map(i=>{ const [x,y]=vnXY(i.lon,i.lat); return `<g class="vnmap__isles">${[[0,0],[9,-5],[-8,6],[5,9],[-11,-4],[14,4]].map(([dx,dy])=>`<circle cx="${x+dx}" cy="${y+dy}" r="1.7"/>`).join("")}<text x="${x}" y="${y+28}" text-anchor="middle">${i.name}</text></g>`; }).join("")}
      ${pl.filter(p=>!p.start).map((p,i)=>`<path class="vnmap__arc" style="--dl:${i*160}ms" d="M${st[0]},${st[1]} Q${((st[0]+p.xy[0])/2+.7*Math.hypot(p.xy[0]-st[0],p.xy[1]-st[1])).toFixed(1)},${((st[1]+p.xy[1])/2).toFixed(1)} ${p.xy[0]},${p.xy[1]}"/>`).join("")}
      ${pl.map((p,i)=>`<g class="vnmap__place${p.start?" is-start":""}" style="--dl:${i*160}ms"><circle cx="${p.xy[0]}" cy="${p.xy[1]}" r="${p.start?7:5}"/><text x="${p.xy[0]+p.l[0]}" y="${p.xy[1]+p.l[1]}" text-anchor="${p.l[0]<0?"end":"start"}">${p.name}</text></g>`).join("")}
    </svg>
    <figcaption class="vnmap__key">${o.key.map(k=>`<p><span>${k.k}</span>${k.t}</p>`).join("")}</figcaption>
  </figure>`; },
  /* where to keep following a project after this page */
  follow:o=>`<section class="blk follow"><img class="follow__logo" src="${o.logo}" alt="" width="300" height="300"><div><h4>${o.h}</h4><p class="follow__p">${o.p}</p><p class="follow__links">${o.links.filter(l=>l.href).map(l=>`<a class="btn btn--ink" href="${l.href}" target="_blank" rel="noopener">${l.label} ↗</a>`).join("")}</p></div></section>`,
  /* each part of the work on one row: what I did, then what it taught me */
  tasks:a=>`<ol class="blk tasks">${a.map(x=>`<li><div class="tasks__did"><b>${x.h}</b><p>${x.did}</p></div>${x.res?`<p class="tasks__learned"><span>What came of it</span>${x.res}</p>`:""}</li>`).join("")}</ol>`,
  /* a way on to another room on this site */
  go:o=>`<p class="blk room__visit"><a class="btn btn--ink" href="${o.href}">${o.label} →</a></p>`,
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
    <svg class="about-hero__swirl" viewBox="0 0 1200 160" preserveAspectRatio="xMinYMax slice" aria-hidden="true"><path pathLength="1" d="M-10 52C70 52 92 118 150 132C206 145 246 124 236 104C226 84 190 92 194 116C199 145 262 150 330 142C560 116 880 60 1210 34"/></svg>
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
  {id:"ideas",label:"Ideas & research",dc:"var(--violet)",p:"Psychology, and an essay about how we think."},
  {id:"making",label:"Science & making",dc:"var(--blue)",p:"A maths olympiad, a card deck, a biology contest and a water rocket."},
  {id:"team",label:"Team & school",dc:"#D2601C",p:"A basketball court, and a year at my school."}
];
const AWARDS=[
  {t:"2026",g:"ideas",m:"mind",h:"International Psychology Olympiad",short:"Psychology Olympiad",p:"Silver Award · 1st in Asia · Top 15 Global",
    s:"Psychology interested me before I knew it could become a competition. Preparing for the Olympiad made me move beyond explanations that merely sounded reasonable. I had to compare possibilities, return to evidence and notice where my first interpretation was incomplete. The award mattered because it showed me how much more there was to learn about a subject I already wanted to pursue."},
  {t:"2026",g:"ideas",m:"pen",h:"RAIS Essay Competition",short:"RAIS Essay",p:"Top 2 of about 450",
    s:"I entered with an essay about AI and the future of human thinking in education. The difficult part was resisting an easy argument for or against technology. I kept revising whenever a paragraph made either humans or AI sound too simple. The final essay asked a question I am still carrying into my work. When does a tool extend our thinking, and when does it begin thinking in our place?"},
  {t:"2026",g:"making",m:"math",h:"International Math Olympiad Competition South East Asia (IMOCSEA)",short:"IMOCSEA",p:"Gold Medal · Top 3 in Vietnam · represented Vietnam in the international round",
    s:"I placed in the top 3 in Vietnam, which earned me a place on the team representing Vietnam in the international round, where I won a Gold Medal."},
  {t:"2025",g:"making",m:"cards",k:"op-cards",cap:"The Feel-it! emotion cards.",h:"Ho Chi Minh City Youth Creativity Contest",short:"Creativity Contest",p:"Second Prize · Emotion Card Deck",
    s:"I wanted to make something children could hold when talking about feelings became difficult. A lesson or long explanation would have asked them to find the right words first, which was often the hardest part. The card deck used colours, images and situations to give children somewhere simpler to begin. Turning that idea into a real product meant thinking about every choice from the child’s side, not only whether the psychology behind it was correct."},
  {t:"2025",g:"making",m:"cell",h:"Ho Chi Minh City Regional Academic Excellence Contest",short:"Biology",p:"Third Prize, Biology · one of 3 students selected from 45",
    s:"I was one of three students selected from 45 to represent my school in the city competition. Preparing meant learning beyond what appeared in our regular lessons and becoming more precise about processes I had previously understood only in broad outlines. Biology was one of the first subjects that made me want to look beneath what I could see and ask what had to be happening underneath."},
  {t:"2023",g:"making",m:"rocket",h:"Vietnam Water Rocket Competition",short:"Water Rocket",p:"National Silver Medal · Team Lead",
    s:"I joined because I loved Physics and wanted to find out what I could do with it outside a classroom. The competition asked for more than launching a rocket. Our team moved between calculations, construction, coding and problems that only appeared once we began testing. I did not know all of those things when we started. That was part of why I wanted to go. Winning National Silver gave me the confidence to keep entering unfamiliar kinds of work before I felt completely ready."},
  {t:"2025",g:"team",m:"ball",h:"Ho Chi Minh City Youth Basketball Tournament",short:"Basketball",p:"Bronze Medal",
    s:"Basketball tested a part of me that no written competition could. I could prepare on my own, but I could not control how a match unfolded or do another player’s job for her. I had to read what was happening, recover quickly from mistakes and remain useful to the team even when I was not the person scoring. That is why this medal belongs beside the academic ones."},
  {t:"2025",g:"team",m:"star",h:"Most Well-Rounded Student",short:"Well-Rounded",p:"Grade 11 · Trung Vuong High School",
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
  math:'<path d="M17 4H7l6 8-6 8h10"/><path d="M19 15v5M16.5 17.5h5"/>',
  star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>'
};

/* Each room tells one story, in this order: a hero (what it is, one number
   line, a photograph through a door), what I noticed, what I changed, what it
   led to. Lists and archives stay out; the CV holds the dated record. */
const ROOMS={
"/work/net-mo":{accent:"var(--coral)",where:"Work · Dream Strokes",blocks:[
  ["hero",{kicker:"Work · Apr 2025 to now · Founder and Project Director",title:"Dream Strokes",
    logo:"img/dream-strokes-logo.jpg",logoAlt:"The Dream Strokes logo: a hand-drawn child with star eyes and a paintbrush, under the project’s name in dripping paint.",
    lede:"An arts-based emotional-learning programme I founded for children in shelters and older adults in care homes. It started at one workshop table and grew into an ecosystem: planned sessions, public events, things we make, partners and sponsors, and a team of 25 across Vietnam.",
    k:"nm-lead",ghost:"a session in progress"}],
  ["glance",{role:"Founder and Project Director",team:"25 members in 4 departments, across 6 cities and provinces",when:"Apr 2025 to now",
    results:["50 workshops for ~200 children in 6 shelters and 22 older adults in 2 care homes","1,700+ people at three OPEN events","~VND 75M in net proceeds, reinvested in the project","Second Prize, Ho Chi Minh City Youth Creativity Contest, for the Feel-it! cards"],
    links:[{href:"https://netmoproject.page",label:"netmoproject.page"},{href:NETMO_FACEBOOK,label:"Facebook page"}]}],
  ["kicker","The ecosystem · eight parts around one project"],
  ["para","Dream Strokes grew in several directions at once, so here they are on one ring. Each part opens its chapter below."],
  ["chapters",{route:"/work/net-mo",ring:{logo:"img/dream-strokes-logo.jpg",name:"Dream Strokes"},items:[
    {n:"01",id:"why",t:"Why Dream Strokes exists",s:"Why",p:"One right answer at school, and why I started it."},
    {n:"02",id:"sessions",t:"Sessions built with care",s:"Sessions",p:"Our lesson plans, the Magic Mirror, and a curriculum for Hanoi."},
    {n:"03",id:"open",t:"Dream Strokes OPEN",s:"OPEN",p:"A concert, a football cup and an exhibition, open to anyone."},
    {n:"04",id:"art",t:"Art that keeps going",s:"Their art",p:"A website, a virtual exhibition, and money back into sessions."},
    {n:"05",id:"partners",t:"Partners and sponsors",s:"Partners",p:"The professionals who guide us, and the sponsors who back us."},
    {n:"06",id:"team",t:"The team",s:"Team",p:"25 people in six cities and provinces, and how we stay connected."},
    {n:"07",id:"make",t:"What we make",s:"What we make",p:"Emotion cards, lesson plans, a calendar and a comic."},
    {n:"08",id:"impact",t:"How it adds up",s:"Impact",p:"What goes in, what we do, who it reaches, and what changes."}
  ]}],

  ["chapter",{n:"01",id:"why",t:"Why Dream Strokes exists",skills:["Observation","Problem framing"]}],
  ["split",{mid:true,a:[
      ["para","At my public school, most questions had one right answer, and we were expected to reach it the same way. We practised solving problems, memorising answers and getting things right. An answer that looked different was usually marked wrong."],
      ["para","In my experience, at school and among friends, people who expressed themselves differently were more often criticised than encouraged. And there were few places where anyone could simply come and make something with others, especially without paying for a class."]],
    b:[["contrast",{a:{k:"At school",t:"One right answer, reached the same way."},b:{k:"At a Dream Strokes table",t:"Children answer the same prompt with very different drawings."}}]]}],
  ["para","I think making art belongs in everyday life, whether or not you can pay for it. So in April 2025 I started Dream Strokes with art sessions for children in shelters in Ho Chi Minh City, and later added care homes for older adults. Each session brings the materials, a story to draw into and facilitators, so taking part needs no skill and no equipment of your own."],
  ["statements",[
    {k:"Our hope",t:"To make self-expression and emotional learning accessible to everyone, one creative experience at a time."},
    {k:"Who it is for",t:"Children in shelters, older adults in care homes, and anyone who comes to an OPEN event."}
  ]],
  ["split",{mid:true,a:[["fig",{k:"nm-1",slot:"Plate 01",ratio:"4/5",ghost:"child and facilitator",cap:"At the table with a child, mid-drawing."}]],
    b:[["kicker","What I noticed first"],
      ["para","A boy spent the first session drawing in the bottom right corner of his page. Not shyly. Efficiently, as if the rest of the paper belonged to somebody else. In the third session we ran out of small sheets and put one large one across four tables. He drew across the middle without asking."]]}],

  ["chapter",{n:"02",id:"sessions",t:"Sessions built with care",p:"Every activity is planned on paper, tested, and changed until it works.",skills:["Curriculum design","Applied psychology","Measuring change"]}],
  ["split",{mid:true,a:[["kicker","What our lesson plans changed"],
      ["steps",[
        {b:"Story worlds instead of free drawing",p:"Active participation rose from 60% to an average of 85%, and the children who had said least changed most. My guess is that a character gave them someone to speak through."},
        {b:"One shared piece at the end",p:"Sessions now end on something the whole table made together. Facilitators know an unfinished page is a good outcome."}
      ]]],
    b:[["figs",[
      {k:"nm-3",slot:"Plate 02",ratio:"3/4",ghost:"drawings held up",cap:"Characters to speak through, held up for everyone to see."},
      {k:"nm-2",slot:"Plate 03",ratio:"3/4",ghost:"older participant",cap:"A care home session with older adults."}
    ]]]}],
  ["feature",{id:"magic-mirror",k:"One lesson, up close",h:"The Magic Mirror",
    p:["Each child gets a mirror frame on paper and draws the person they see in it.","One girl drew herself in a crown. One boy drew himself spinning a basketball on a court. It is a simple way to ask a child how they see themselves, without asking them to explain."],
    figs:[
      {k:"ds-mirror-1",ratio:"1088/1200",ghost:"a portrait in a pink mirror frame",cap:"In a crown."},
      {k:"ds-mirror-2",ratio:"1200/968",ghost:"a portrait in a blue mirror frame",cap:"On the court."}
    ]}],
  ["split",{mid:true,a:[["kicker",{t:"Colors of Joy · Hanoi · with Bao Sang Art Therapy Center · Aug to Oct 2025",id:"colors-of-joy"}],
      ["para","In Hanoi I turned our activities into a curriculum, wrote the session plans and facilitator guides, and revised each session with licensed art therapists."],
      ["numbers",[{b:"4",s:"sessions"},{b:"24",s:"children, ages 6–12"},{b:"23",s:"could name their emotions by the end"}]]],
    b:[["figs",[
      {k:"nm-5",slot:"Plate 04",ratio:"1/1",ghost:"painting at the studio",cap:"Painting together at the studio."},
      {k:"nm-6",slot:"Plate 05",ratio:"1/1",ghost:"a facilitator with two children",cap:"A facilitator painting alongside two children."}
    ]]]}],

  ["chapter",{n:"03",id:"open",t:"Dream Strokes OPEN",p:"For anyone, anywhere.",skills:["Event production","Community building"]}],
  ["para","OPEN is our branch for people outside the partner shelters. Every OPEN event is meant to need no art skill and no invitation. You can play, cheer, listen or paint. Choose one to see it."],
  ["switcher",{label:"Dream Strokes OPEN programmes",items:[
    {id:"sol-sound",k:"ss-band",ghost:"Sol Sound, the band",meta:"Music",name:"Sol Sound",fact:"400+ tickets",
      p:"A December to Remember: a winter night of young bands, The Bandages among them. Anyone could buy a ticket, and the money went back into Dream Strokes.",
      more:[{k:"ss-logo",ghost:"the poster",cap:"The poster art."},{k:"ss-bandages",ghost:"The Bandages",cap:"The Bandages on stage."}]},
    {id:"pitch",k:"ev-pitch",ghost:"Colors of the Pitch",meta:"Football",name:"Colors of the Pitch",fact:"10 teams · 1,000+ spectators",
      p:"Two football tournaments, where you could play on a team or come and cheer from the stands."},
    {id:"once-upon",k:"once-upon",ghost:"the exhibition",meta:"Painting",name:"Once Upon the Inside",fact:"300+ visitors",
      p:"A youth painting exhibition I co-produced with The APRIL Collective at May Artspace."}
  ]}],
  ["para","More than 1,700 people came to these three events. The Sol Sound ticket money went back into the workshops."],
  ["go",{href:"#/work/events",label:"See these events"}],

  ["chapter",{n:"04",id:"art",t:"Art that keeps going",p:"What happens to a drawing after the session ends.",skills:["Systems thinking","Sustainable funding"]}],
  ["para","A drawing used to end its life in a folder. I wanted the work to be seen, and to help pay for the next session, so we gave it somewhere to go."],
  ["loop",{items:[
    {h:"They make it",p:"Children and older adults draw and paint in our sessions."},
    {h:"We show it",p:"Their work goes on our website and into a virtual exhibition anyone can visit."},
    {h:"It earns",p:"Their work raises money for the project."},
    {h:"It pays for more",p:"That money funds sessions for children, care homes and our regular art classes."}
  ],back:"and the next session begins"}],
  ["visit",{href:"https://netmoproject.page",label:"Visit our website"}],

  ["chapter",{n:"05",id:"partners",t:"Partners and sponsors",p:"Professionals who guide the work, and sponsors who came with us.",skills:["Partnerships","Sponsorship"]}],
  ["split",{mid:true,a:[["fig",{k:"ds-advisor",ratio:"3/2",ghost:"a call with our advisor",cap:"A call with Phuong Thao Nguyen, our advisor."}]],
    b:[["partners",[
      {k:"Professional guidance and legal sponsor",h:"Bao Sang Art Therapy Center",p:"Licensed art therapists who guide how we work with children and stand behind the project legally."},
      {k:"Our advisor",h:"Phuong Thao Nguyen",p:"Founder of Bao Sang Art Therapy Center, M.A. in Psychology and licensed art therapist. I talk new sessions through with her before we run them."}
    ]]]}],
  ["kicker","Who backs us, and how"],
  ["para","I looked for help matched to what each part needed: a therapist’s review for the sessions, materials for the tables, and a stage, a pitch and a gallery for OPEN."],
  ["backers",{caption:"Partners and sponsors of Dream Strokes, and the kind of help each gives",first:"Partner or sponsor",cols:["Guidance","Legal","Cash","In kind","Space"],rows:[
    {h:"Bao Sang Art Therapy Center",p:"Professional guidance, legal sponsor",on:["Guidance","Legal"]},
    {h:"Fing3rprint Education",p:"In-kind sponsor and art advisor",on:["Guidance","In kind"]},
    {h:"Meta Art Club",p:"Cash and in-kind sponsor",on:["Cash","In kind"]},
    {h:"Hien Events",p:"The stage for our events",on:["In kind"]},
    {h:"May Artspace",p:"The gallery for Once Upon the Inside",on:["Space"]},
    {h:"C19, District 7",p:"The pitch for Colors of the Pitch",on:["Space"]}
  ]}],

  ["chapter",{n:"06",id:"team",t:"The team",p:"25 people in four departments, in six cities and provinces.",skills:["Team building","Operations","Scaling"]}],
  ["para","Dream Strokes started in Ho Chi Minh City. To reach more places than I could run myself, I built a team of 25 that now has members in six cities and provinces, from Dong Nai to Hanoi."],
  ["vnmap",{title:"A map of Vietnam: Dream Strokes started in Ho Chi Minh City and has members in Dong Nai, Hanoi, Hai Phong, Nghe An and Quang Binh.",
    places:[
      {name:"Ho Chi Minh City",lon:106.66,lat:10.78,start:true,l:[14,24]},
      {name:"Dong Nai",lon:106.82,lat:10.95,l:[14,-8]},
      {name:"Quang Binh",lon:106.6,lat:17.47,l:[13,5]},
      {name:"Nghe An",lon:105.68,lat:18.67,l:[-13,5]},
      {name:"Hai Phong",lon:106.68,lat:20.86,l:[13,7]},
      {name:"Hanoi",lon:105.85,lat:21.03,l:[-13,3]}
    ],
    isles:[{name:"Hoang Sa",lon:111.9,lat:16.5},{name:"Truong Sa",lon:113.4,lat:9.9}],
    key:[
      {k:"Where it started",t:"Ho Chi Minh City: our shelters, care homes and OPEN events."},
      {k:"Members in",t:"Dong Nai, Hanoi, Hai Phong, Nghe An and Quang Binh."},
      {k:"Workshops away from home",t:"Hanoi, with Colors of Joy."},
      {k:"Next",t:"More places soon."}
    ]}],
  ["split",{a:[
      ["para","I split the team into four departments so each member owns one part, wherever they live. Here is what each one does."],
      ["pairs",[
        {h:"R&D",p:"Designs the sessions and writes the lesson plans."},
        {h:"Tech",p:"Builds the website and the tools we run on."},
        {h:"Events",p:"Runs OPEN: the concerts, matches and exhibitions."},
        {h:"PR",p:"Tells people what we do and brings new people in."}
      ]],
      ["para","A team spread across cities and roles drifts apart easily. I first built an activity journal with roles, photos, a calendar and a task board, so each season could start where the last one ended. Today we share one journal on <a href=\"#/work/tech/together\">Together!</a>, the app I co-founded."]],
    b:[["mosaic",[
      {k:"ds-team-3",ratio:"3/2",ghost:"the team in a hall",cap:"Hearts for the camera."},
      {k:"ds-team-1",ratio:"3/2",ghost:"the team on the pitch",cap:"Part of the team, on the pitch."},
      {k:"ds-team-2",ratio:"3/2",ghost:"the team in an alley",cap:"Out together, November 2025."}
    ]]]}],

  ["chapter",{n:"07",id:"make",t:"What we make",p:"Things that carry the idea beyond our sessions.",skills:["Product design","Visual storytelling"]}],
  ["shelf",{main:{k:"op-cards",ratio:"1/1",ghost:"the Feel-it! box",meta:"Emotion cards · ages 5 to 10",name:"Feel-it!",
      p:"24 emotion characters and five games, so a child can name a feeling by pointing at it.",badge:"Second Prize · Ho Chi Minh City Youth Creativity Contest 2025"},
    rest:[
      {mark:"plans",meta:"Lesson plans",name:"Our curriculum",p:"Session plans and facilitator guides for every activity, from the Magic Mirror to the Hanoi programme."},
      {k:"op-calendar",ghost:"the 2026 calendar",meta:"Calendar",name:"The 2026 calendar",p:"Drawn by our team and sold to pay for the next season of workshops."},
      {k:"op-comic",ghost:"a page of the comic",meta:"Comic series",name:"Cloud’s Story",p:"Drawing Worries, Colouring Hope: the workshop idea told as a story anyone can read."}
    ]}],
  ["lead",{k:"op-cardsheet",slot:"Plate 06",ratio:"3/2",ghost:"the Feel-it! card system",cap:"The Feel-it! card system: 24 emotions in families, five ways to play, and the box it comes in."}],

  ["chapter",{n:"08",id:"impact",t:"How it adds up",p:"What goes in, what we do, who it reaches, and what changes.",skills:["Impact measurement","Fundraising"]}],
  ["impact",{k:"Since April 2025",cols:[
      {h:"What goes in",items:[{b:"25",s:"members in 6 cities and provinces"},{b:"6",s:"partners and sponsors"}]},
      {h:"What we do",items:[{b:"50",s:"workshops"},{b:"3",s:"OPEN programmes"},{b:"4",s:"things we make"}]},
      {h:"Who it reaches",items:[{b:"~200",s:"children in 6 shelters"},{b:"22",s:"older adults in 2 care homes"},{b:"1,700+",s:"people at OPEN events"}]},
      {h:"What changes",items:[{b:"60→85%",s:"active participation"},{b:"23 of 24",s:"children in Hanoi naming their emotions"},{b:"~VND 75M",s:"net proceeds, reinvested"}]}
    ],p:"The money pays for materials, sessions and the next season.",
    fig:{k:"nm-4",ratio:"3/2",ghost:"the end of a session",cap:"The end of a session: everyone holding up what they made."}}],
  ["follow",{logo:"img/dream-strokes-logo.jpg",h:"Follow the journey",p:"Dream Strokes is still growing. New sessions, events and artwork go up on our website and our Facebook page.",
    links:[{href:"https://netmoproject.page",label:"netmoproject.page"},{href:NETMO_FACEBOOK,label:"Follow on Facebook"}]}],

  ["kicker","Where it led"],
  ["para","Dream Strokes also made me curious about how the form of an activity changes what people express. I later studied a related question, with young adults: art-making against an AI dialogue."],
  ["links",[{href:"#/work/research",label:"The study it led to"},{href:"#/work/events",label:"Events"},{href:"#/exhibition",label:"Exhibition"}]]
]},

"/work/events":{accent:"#C9561A",where:"Work · Events",blocks:[
  ["hero",{kicker:"Gatherings and events · 2024 to 2026",title:"Rooms with the lights turned up",
    lede:"Concerts, football tournaments, a science festival, a rocket contest and sketch walks I organised between 2024 and 2026. Three of them were firsts at my school.",
    k:"gather-2",ghost:"Beats of Hope, from the stage"}],
  ["glance",{role:"Producer, organiser or operations lead, depending on the event",team:"From a 7-member crew to a 36-student committee",when:"2024 to 2026",
    results:["Beats of Hope: 10+ student bands, 310+ tickets, ~VND 25M raised","Hey Tet!: 2,400+ attendees, my school’s first fully student-run music event","3 events that were firsts at my school"]}],
  ["kicker","The story · in three parts"],
  ["chapters",{route:"/work/events",items:[
    {n:"01",id:"why",t:"Four kinds of gathering",s:"Four kinds",p:"What each event asked of the people who came."},
    {n:"02",id:"little-smile",t:"Beats of Hope",s:"The flagship",p:"Ten bands, one stage, and a night for children in hospital."},
    {n:"03",id:"more",t:"Eight more gatherings",s:"More",p:"Music, football, a fair, a festival and a rocket launch."}
  ]}],

  ["chapter",{n:"01",id:"why",t:"Four kinds of gathering",skills:["Community building","Problem framing"]}],
  ["para","I started these events for different reasons: a cause I was working on, a club I belonged to, a sport I play, or something my school did not have yet. Looking back, each one asked something different of the people who came."],
  ["pains",[
    {h:"Create together",p:"Something to make, not only something to watch."},
    {h:"Cheer for the same thing",p:"A team or a goal that everyone in the stands can get behind."},
    {h:"Make room to belong",p:"Small stations and crew jobs, for people who would rather not be on stage."},
    {h:"Start what isn’t there",p:"Events my school had not run before."}
  ]],

  ["chapter",{n:"02",id:"little-smile",t:"Beats of Hope",p:"The flagship · a benefit concert · 2025",skills:["Event production","Sponsorship","Fundraising"]}],
  ["split",{mid:true,a:[
  ["lede","More than ten student bands on one stage, raising money for play sessions with children in hospital."],
  ["para","At the Little Smiles Project I was Creative Director, designing play and storytelling sessions for children in three hospitals with a team spread across South Korea, France, Taiwan and Vietnam. I wanted students in my own city to take part in that work too."],
  ["para","So I produced Beats of Hope. More than ten student bands from different schools played one shared show, and we spread 310+ tickets across the city’s schools. I ran the stage and the artists and negotiated the venue sponsorship in person. The night raised about VND 25 million for play and storytelling sessions, donated to two hospitals in France."]],
  b:[["figs",[
    {k:"gt-4",slot:"Poster",ratio:"1/1",ghost:"the Beats of Hope poster",cap:"The poster, made with the Little Smiles team."},
    {k:"gt-5",slot:"Plate 02",ratio:"1/1",ghost:"a band after its set",cap:"One of the bands, after its set."}
  ]]]}],
  ["numbers",[
    {b:"10+",s:"student bands from different schools"},
    {b:"310+",s:"tickets across city schools"},
    {b:"~VND 25M",s:"raised, donated to two hospitals in France"}
  ]],

  ["chapter",{n:"03",id:"more",t:"Eight more gatherings",p:"Grouped by what each one asked of the people who came.",skills:["Leadership","Operations","Starting new things"]}],
  ["gatherings",[
    {num:"01",c:"var(--pink)",h:"Create together",why:"Music and sketching give everyone the same task at the same time, so no one has to speak first.",
      events:[
        {k:"ev-solsound",ghost:"Sol Sound, the stage",meta:"Dream Strokes · music concert",name:"Sol Sound",p:"Part of Dream Strokes OPEN, which I lead as project director. The full story of the night is in the Dream Strokes room.",fact:"400+ tickets",event:"sol-sound"},
        {k:"ev-tours",ghost:"a sketch tour in the city",meta:"Founder and Program Organizer · summers 2025 and 2026",name:"Photography & Sketch Tours",p:"Walks through Ho Chi Minh City where locals and international visitors photograph and sketch the same streets side by side, from landmarks to hidden spots our members love.",fact:"70+ participants"}
      ]},
    {num:"02",c:"var(--orange)",h:"Cheer for the same thing",why:"Football is a way to express yourself too, on the pitch and in the stands. Cheering for the same team gives strangers something in common.",
      events:[
        {k:"ev-pitch",ghost:"Colors of the Pitch, a team huddle",meta:"Dream Strokes · football tournaments",name:"Colors of the Pitch",p:"Part of Dream Strokes OPEN, open to players and spectators from outside the project. The tournaments are told in full in the Dream Strokes room.",fact:"10 teams · 1,000+ spectators",event:"colors-of-the-pitch"},
        {k:"ev-league",ghost:"Trung Vuong Football League",meta:"Operations Lead · Aug 2024 to Feb 2025",name:"Trung Vuong Football League",p:"I co-led a 7-member team through two seasons that brought players from eight schools onto one pitch, and managed budgeting, equipment and match operations.",fact:"15 teams · 8 schools",event:"cerberus-league"}
      ]},
    {num:"03",c:"var(--teal)",h:"Make room to belong",why:"A station, a prompt or a job on the crew lets someone take part without standing on a stage.",
      events:[
        {k:"ev-identity",ghost:"a Colors of Identity station",first:"First of its kind at my school",meta:"Eunoia Psychology Club · Head of Academic Affairs",name:"Colors of Identity",p:"I got school approval and directed 25 volunteers for a self-discovery programme of five stations, one small activity at a time.",fact:"600 registrants"},
        {k:"ev-tet",ghost:"Hey Tet!, the school stage",first:"The school’s first fully student-run",meta:"Program Vice Organizer · Dec 2025 to Feb 2026",name:"Hey Tet!",p:"I reorganised and trained the programme team in a 36-student committee and directed full-day programming for the school’s Lunar New Year music event, run entirely by students.",fact:"2,400+ attendees",event:"tet-oi"}
      ]},
    {num:"04",c:"var(--blue)",h:"Start what isn’t there",why:"Science events, where groups build, test or investigate something together.",
      events:[
        {k:"ev-rocket",ghost:"a water rocket launch",first:"A first at Trung Vuong",meta:"Initiator · Physics Club",name:"Water Rocket Design Contest",p:"I launched the school’s first water-rocket design challenge and wrote its proposal and technical guide. It became an annual programme and later opened to teams from other schools, as in this photograph.",fact:"80+ participants · ~12 teams in the first edition"},
        {k:"ev-sciphony",ghost:"a SciPhony booth",meta:"Academic Design Lead · Physics Club",name:"SciPhony Science Festival",p:"I led the academic design: a human-body investigation that needed physics, chemistry and biology at every booth.",fact:"5 booths"}
      ]}
  ]],
  ["links",[{href:"#/work/net-mo",label:"Dream Strokes"},{href:"#/work/research",label:"Research & Experience"}]]
]},

"/work/research":{accent:"var(--violet)",where:"Work · Research & Experience",blocks:[
  ["hero",{kicker:"Work · Research & Experience · 2025 to now",title:"Research &amp; Experience",
    lede:"One study I designed and ran, and two hands-on roles at startups building tools for how young people feel, learn and pay attention.",
    facts:[{b:"68",s:"study participants"},{b:"100+",s:"interviews with teenagers"},{b:"40+",s:"papers reviewed"}],
    art:'<path d="M14 132h94M14 132V20" opacity=".45"/><path d="M24 46l80 70" stroke="#2B4DE0" stroke-width="3"/><path d="M24 116l80-74" stroke="#EE4187" stroke-width="3"/><circle cx="64" cy="81" r="4.5" fill="currentColor" stroke="none"/>'}],
  ["studies",[
    {num:"01",c:"var(--violet)",href:"#/work/research/ai-art",kind:"Study · First author",name:"AI &amp; Art",role:"Oct 2025 to now · under review at NHSJS",
      q:"Does art-making or an AI-guided dialogue make it easier to express what you feel, and for whom?",
      facts:[{b:"68",s:"young adults"},{b:"136",s:"sessions"},{b:"p < .001",s:"crossover"}],go:"Open the study"},
    {num:"02",c:"#C2610A",href:"#/work/research/teencare",kind:"Experience · Research Associate, R&D",name:"TeenCare",logo:"img/teencare-wordmark.png",role:"May to Dec 2025 · Jun 2026 to now",
      q:"How do you help a teenager step into psychology and connect it to their own life?",
      facts:[{b:"100+",s:"interviews"},{b:"5",s:"narrative survey formats"}],go:"Open TeenCare"},
    {num:"03",c:"#0041E7",href:"#/work/research/brain-life",kind:"Experience · R&D Intern",name:"Brain-Life",logo:"img/brainlife-wordmark.png",role:"Aug 2026 to now",
      q:"Where do global research on attention and local behaviour part ways?",
      facts:[{b:"40+",s:"papers"},{b:"20",s:"products"},{b:"25",s:"interviews"}],go:"Open Brain-Life"}
  ]],
  ["kicker","Three questions"],
  ["para","They began in different places: a study I designed myself, and two roles at startups. Each one sets what people report about themselves beside something else: a second format, a story to step into, or a brain signal."],
  ["converge",{items:[
    {k:"AI & Art",c:"var(--violet)",t:"Which way into a feeling works, and for whom?"},
    {k:"TeenCare",c:"#C2610A",t:"Would a story or a scenario help teenagers connect psychology to their own lives?"},
    {k:"Brain-Life",c:"#0041E7",t:"What do you do when the brain’s signal and a student’s own words disagree?"}
  ]}],
  ["links",[{href:"#/work/net-mo",label:"Where the question came from"},{href:"#/work/tech",label:"Tech Projects"}]]
]},

"/work/research/ai-art":{accent:"var(--violet)",where:"Research · AI & Art",blocks:[
  ["hero",{kicker:"Study · First author · Oct 2025 to now",title:"AI &amp; Art",
    lede:"Does hands-on art-making or an AI-guided reflective dialogue make it easier to express what you feel, and does the answer depend on who is walking in?",
    art:'<path d="M14 132h94" opacity=".45"/><path d="M26 132V58M40 132V84" stroke-width="9" stroke-linecap="butt"/><path d="M26 132V58" stroke="#2B4DE0" stroke-width="9" stroke-linecap="butt"/><path d="M40 132V84" stroke="#EE4187" stroke-width="9" stroke-linecap="butt"/><path d="M78 132V85" stroke="#2B4DE0" stroke-width="9" stroke-linecap="butt"/><path d="M92 132V60" stroke="#EE4187" stroke-width="9" stroke-linecap="butt"/>'}],
  ["glance",{role:"First author: I designed, ran and analysed the study",team:"Advised by Phuong Thao Nguyen, M.A. in Psychology",when:"Oct 2025 to now",
    results:["68 young adults, 136 sessions, 8 post-session measures","Which format lifted mood more flipped with prior art experience (p < .001)","Under review at the National High School Journal of Science"]}],
  ["kicker","The question"],
  ["para","Dream Strokes made me curious about how the form of an activity changes what people are able to express. The study does not test the workshops themselves; it asks a related question with young adults. AI chat tools had just offered a new way in, a conversation available at any hour, so I put it next to the oldest way I knew: making something with your hands."],
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
    {h:"Easier to start with AI",p:"Participants rated starting easier in the AI dialogue: 7.91 against 5.57."},
    {h:"More ownership with art",p:"They rated the result as more their own after art-making: 7.40 against 5.38."},
    {h:"Prior experience mattered",p:"Prior art experience flipped which format lifted mood more. An average would have hidden it."}
  ]],
  ["kicker","What I built from it"],
  ["para","In this study, the AI dialogue made the first step easier and art-making made the result feel more like people’s own. So I built Inkling, a drawing journal where the AI draws the first line and you decide the rest."],
  ["figs",[
    {k:"rs-1",slot:"Plate 01",ratio:"10/7",ghost:"Inkling, the drawing journal",cap:"Inkling: the AI draws the first line, the person decides the rest."},
    {k:"rs-2",slot:"Plate 02",ratio:"10/7",ghost:"presenting the study",cap:"Presenting the study."}
  ]],
  ["kicker","Where it went"],
  ["steps",[
    {b:"Under review",p:"Submitted to the National High School Journal of Science; I am first author."},
    {b:"City-level competition",p:"Selected as one of 3 school teams to enter the city’s science research competition."},
    {b:"Presented",p:"Presented the study to faculty from the University of Social Sciences and Humanities, Ho Chi Minh City."}
  ]],
  ["kicker","What the study can’t tell me yet"],
  ["para","All 68 participants were young adults, and each tried each format once. I don’t know yet whether the same pattern holds for children, or over many sessions."],
  ["links",[{href:"#/work/research",label:"All research"},{href:"#/work/research/teencare",label:"Next · TeenCare"}]]
]},

"/work/research/teencare":{accent:"#C2610A",where:"Research · TeenCare",blocks:[
  ["hero",{kicker:"Experience · Part-time Research Associate, R&D · remote · May to Dec 2025, Jun 2026 to now",title:"TeenCare",
    wordmark:"img/teencare-wordmark.png",
    lede:"A youth mental-fitness startup building story-based tools that help teenagers notice and express what they feel. I came in as a tester, then joined its R&D team, where I work remotely. Its first product, un-wrap, launches in December 2026.",
    marks:["img/teencare-mark.png"]}],
  ["glance",{role:"Part-time Research Associate, R&D, working remotely",team:"TeenCare’s R&D and design team",when:"May to Dec 2025, Jun 2026 to now",
    results:["100+ semi-structured interviews with teenagers","5 narrative survey formats co-designed, after I proposed using stories and scenarios","un-wrap, built on one of them, launches in December 2026"],
    links:[{href:"https://teencare.co/vn",label:"teencare.co"}]}],
  ["kicker","How I came in · as a tester"],
  ["para","At my public school, psychological support was hard to find, and mental health rarely came up in class, so TeenCare’s vision caught my attention. I first took part as a tester. At that point the material focused on explaining psychological theory, and there was little to help me step in and connect it to my own life. The interview felt like it was there to collect information and move on, and its questions about my inner life were hard to answer with nothing to hold on to."],
  ["para","Afterwards I kept thinking about the fairy tales I was told as a child. Inside a story you become someone else, and feelings you can’t name about yourself come out through the character. When I joined the R&D team, I proposed using stories and scenarios, so a teenager could step into a complete story and meet the psychology from inside it."],
  ["flow",{before:{label:"When I took part as a tester",steps:["Psychological theory, explained","Direct questions about my inner life","Little to connect it to my own experience"]},
    after:{label:"What I proposed",steps:["Stories and scenarios to step into, like a fairy tale","Gradual prompts and branching choices","The psychology met through a character first"]}}],

  ["kicker","How I worked · remote, every week"],
  ["para","I work with the R&D team from home. Every week runs the same loop, and every loop has to end in something the designers can use."],
  ["loop",{items:[
    {icon:"call",h:"Interview",p:"Semi-structured video calls with teenagers, more than 100 so far."},
    {icon:"filter",h:"Clean the data",p:"Filter the responses and transcripts so only usable answers go forward."},
    {icon:"cluster",h:"Analyse",p:"Code the answers and group them on an affinity map until themes repeat."},
    {icon:"flag",h:"Name the pain points",p:"Write up the week’s pain points for the team, in teenagers’ own words."},
    {icon:"screen",h:"Design and test",p:"Turn them into flows, wireframes and screens, then test with users."}
  ],back:"and a new round begins"}],

  ["kicker","Who we were designing for"],
  ["para","From the interviews we built personas. This is one of them: a composite of many teenagers, not one real person."],
  ["persona",{k:"Persona",name:"Meo",meta:"16 · Hanoi · high school student",
    story:"Meo feels different from friends but can’t say how. Meo wants to be understood, but every time Meo starts to open up, the fear of being called “weird” wins. With nowhere safe to say what Meo needs, Meo goes quiet and copies everyone else, and feels more lost for it.",
    cols:[
      {h:"Goals",items:["Understand my own feelings, needs and patterns","Be accepted as different, without pretending to be “normal”","Find a community where sharing feels safe","Say what I need to friends, teachers and family"]},
      {h:"Needs",items:["A safe space to practise self-awareness","A simple, visual way to “unwrap” the mind","Clear words for feelings and boundaries","Step-by-step “recipes” that don’t overwhelm","Someone alongside who says it’s okay"]}
    ],
    likes:["Learns through pictures and metaphors","Likes short, applied psychology","Wants tools for every day"]}],

  ["kicker","The pain points that kept coming back"],
  ["pains",[
    {h:"No words for it",p:"Teenagers couldn’t name what they felt, or why they reacted the way they did."},
    {h:"Afraid of “weird”",p:"They held back questions and experiments for fear of being judged."},
    {h:"Blending in",p:"They copied everyone else, and their real needs got pushed down."},
    {h:"No safe place",p:"Without one, there was no healthy way to explore who they are."}
  ]],

  ["kicker","Five stories to step into"],
  ["para","With the team I co-designed five narrative survey formats. Two of them:"],
  ["pairs",[
    {h:"Format · The time train",p:"You get a ticket for a train through time and explore your future workplace, one stop at a time."},
    {h:"Format · The zombie kitchen",p:"You cross into a zombie world and become its best chef. You survive three days by cooking, and every choice branches."}
  ]],

  ["kicker","From a story to a product · un-wrap, the self-discovery restaurant"],
  ["split",{mid:true,a:[["object3d",{src:"img/tc-book.webp",w:774,h:1164,alt:"The un-wrap book standing at an angle: on its cover, a plate of food on a checked tablecloth and a note reading A little recipe for the person you’re becoming.",cap:"un-wrap, from my mockup."}]],
    b:[["para","The chef narrative became the base of TeenCare’s first product, un-wrap, a “self-discovery restaurant” launching in December 2026. With the design team, I worked on its flows, wireframes, interface design and automated pattern summaries, built from the interview insights."],
      ["journey",[
        {k:"Way in",h:"The Spring Roll Survey Maker",p:"A web tool for building surveys as stories, like the time train."},
        {k:"Where they gather",h:"Fluffy Cloud",p:"The Facebook page I started to reach teenagers and talk about mental health."},
        {k:"Where they work through it",h:"The Soul Recipe Book",p:"An interactive e-book that walks through a feeling like a recipe."}
      ]]]}],
  ["kicker","The book · my mockup"],
  ["para","I made the mockup of the book itself. It is a hands-on experience set in a restaurant where you are both the guest and the chef. Over five courses you check in with yourself, open up past experiences, sort your inner ingredients, try new ways of responding, and finish with a dish that feels like you. There are stickers, cut-outs and space to write, and you take your own recipe home."],
  ["lead",{k:"tc-mockup",slot:"Plate 01",ratio:"3/2",ghost:"the un-wrap mockup",cap:"The un-wrap mockup: the book, the five-course journey, spreads from inside, and what comes with it. <a href=\"img/tc-mockup.jpg\" target=\"_blank\" rel=\"noopener\">Open it full size ↗</a>"}],
  ["kicker","How a recipe works"],
  ["para","The team built the five courses on schema therapy. Each step of cooking maps onto one of its steps, so a teenager can follow a feeling the way they would follow a recipe."],
  ["recipe",[
    {k:"tc-arch-1",ghost:"a wrapped parcel",h:"The soul package",eq:"early schemas",p:"Core beliefs from needs that weren’t met, early experiences and self-protective parts: the raw ingredients."},
    {k:"tc-arch-2",ghost:"unwrapping the parcel",h:"Unwrapping",eq:"awareness",p:"Name the schema, notice the triggers, and tell the hurt child from the harsh parent and the protector."},
    {k:"tc-arch-3",ghost:"jars of ingredients",h:"Sorting the ingredients",eq:"schema modes",p:"“Bitter” is the punitive parent, “too salty” the critical voice, “missing” the unmet needs, “unripe” the vulnerable child."},
    {k:"tc-arch-4",ghost:"a chef at the stove",h:"Cooking",eq:"reprocessing and healing",p:"The chef, the healthy adult, adjusts the seasoning, which means the beliefs, and cooks painful memories through safely."},
    {k:"tc-arch-5",ghost:"the finished dish",h:"The dish",eq:"a balanced self",p:"Steadier feelings, clear boundaries, and needs met in the right way."}
  ]],

  ["kicker","Reaching teenagers where they are · Fluffy Cloud"],
  ["split",{mid:true,a:[["fig",{k:"tc-cloud",ratio:"2/1",ghost:"Fluffy Cloud",cap:"Fluffy Cloud, the page’s narrator."}]],
    b:[["para","A survey needs the right people to answer it, so I started a Facebook page of my own, Fluffy Cloud. Its narrator is a cloud, “full-time cloud, part-time shapeshifter”, looking for itself on a strange train."],
      ["para","I wrote posts there to raise awareness of mental health and shared them in many groups and pages. That helped our surveys reach more of the teenagers we were designing for."]]}],

  ["kicker","Designing the interface"],
  ["split",{mid:true,a:[["formmock",{url:"spring roll survey maker",title:"Get your ticket for the time train",sub:"Come and find the place you might work one day.",button:"Enter the waiting room",meta:"Takes 7+ minutes",cap:"The first screen of a survey, rebuilt here in English."}]],
    b:[["para","I designed the interface of the project’s web form, the Spring Roll Survey Maker: a soft palette chosen to feel safe, one friendly typeface, and a picture on every first screen, so a survey feels like the start of a story."],
      ["palette",{k:"Its palette",colors:["#305165","#3EAE94","#66B1DB","#ABEDFF","#E8FCFF","#E1FFE3","#F6F9FF","#E5EDFF","#FFFCDF","#FFF2F8","#FFBDDC","#FF97B1"],typeK:"Typeface",font:"Cabin"}]]}],

  ["kicker","Testing with real users"],
  ["para","I took part in user testing and in the V1 revisions that fixed its usability issues."],
  ["links",[{href:"#/work/research",label:"All research"},{href:"#/work/research/brain-life",label:"Next · Brain-Life"}]]
]},

"/work/research/brain-life":{accent:"#0041E7",where:"Research · Brain-Life",blocks:[
  ["hero",{kicker:"Experience · Research & Development Intern · Aug 2026 to now",title:"Brain-Life",
    wordmark:"img/brainlife-wordmark.png",
    lede:"A neurotechnology startup developing evidence-based tools to improve attention, learning and cognitive well-being.",
    marks:["img/brainlife-mark.png"]}],
  ["glance",{role:"Research and Development Intern",team:"Brain-Life’s R&D team",when:"Aug 2026 to now",
    results:["40+ papers reviewed and 20 products benchmarked","25 contextual interviews, 3 patterns where research and local behaviour diverged","EEG recordings and student surveys analysed in Python"],
    links:[{href:"https://brainlife.ai",label:"brainlife.ai"}]}],
  ["kicker","Why I joined"],
  ["para","I had been reading about attention and the nervous system on my own, and wanted to see how that research becomes products people use. Brain-Life builds them, so I joined as an R&D intern."],
  ["figs",[
    {k:"bl-2",slot:"Plate 01",ratio:"4/3",ghost:"the team",cap:"The Brain-Life team."},
    {k:"bl-4",slot:"Plate 02",ratio:"4/3",ghost:"a team meeting",cap:"A working session with the R&D team."}
  ]],
  ["kicker","What I did"],
  ["tasks",[
    {h:"Reading the evidence",did:"I reviewed more than 40 peer-reviewed papers on attention, learning and cognitive well-being.",
},
    {h:"Looking at what exists",did:"I benchmarked 20 international neurotechnology and wellness products against that evidence.",
},
    {h:"Asking the people here",did:"I tested the evidence against 25 contextual interviews with Vietnamese users.",
      res:"3 behavioural patterns where global research and local behaviour diverged, and the early product hypotheses I wrote from them."},
    {h:"Signal and self-report",did:"I process EEG recordings in Python and analyse student surveys side by side, looking for the gaps between neural signals and what students report about their own attention.",
      res:"The gaps went into the next product iterations."}
  ]],
  ["figs",[
    {k:"bl-1",slot:"Plate 03",ratio:"3/4",ghost:"an EEG demonstration",cap:"Fitting an EEG headband at a Brain-Life booth."},
    {k:"bl-3",slot:"Plate 04",ratio:"3/4",ghost:"the product on the table",cap:"The headband, the app and the tools that come out of the research."}
  ]],
  ["links",[{href:"#/work/research",label:"All research"},{href:"#/work/research/ai-art",label:"First · AI & Art"}]]
]},

"/work/tech":{accent:"var(--blue)",where:"Work · Tech Projects",blocks:[
  ["hero",{kicker:"Work · Tech Projects · 2025 to now",title:"Contextuary and Together!",
    lede:"Two products I designed in Figma and built with a front end in React. One helps a student meet a hard word inside its sentence. The other gives a scattered team one place to keep its days.",
    marks:["img/contextuary-logo.png","img/together-logo.png"]}],
  ["glance",{role:"Contextuary: founder and product designer. Together!: co-founder and UI/UX designer",team:"Contextuary: a team of 4. Together!: built with members of the Dream Strokes team",when:"2025 to now",
    results:["Contextuary: ~2,200 visitors and 500+ registered users","Together!: 1,550+ visitors and 20+ projects besides Dream Strokes"],
    links:[{href:"https://contextuary.app",label:"contextuary.app"},{href:"https://toghether.contextuary.app",label:"Together!"}]}],
  ["kicker","Two products · two problems I lived with"],
  ["chapters",{route:"/work/tech",items:[
    {n:"01",id:"contextuary",t:"Contextuary",s:"Contextuary",p:"Keeping a new word took six jobs. Now it takes one."},
    {n:"02",id:"together",t:"Together!",s:"Together!",p:"A shared journal now used by Dream Strokes and 20+ other projects."}
  ]}],

  ["chapter",{n:"01",id:"contextuary",t:"Contextuary",p:"Vocabulary in context, for students preparing for the SAT",skills:["Product design","User research","React"]}],
  ["product",{logo:"img/contextuary-logo.png",logoAlt:"The Contextuary logo",
    kicker:"Founder and Product Designer · Jan 2025 to now · team of 4",name:"Contextuary",
    href:"https://contextuary.app",label:"Visit Contextuary",
    lede:"While I was studying vocabulary, I noticed how much work it took just to keep one new word, and how little of that work helped anyone remember it. It was easy to give up at that point.",
}],
  ["kicker","The pain point"],
  ["para","Saving one word meant a chain of small jobs. Each one added cognitive load, and none of them taught anything about the word itself."],
  ["flow",{before:{label:"Before · to keep one word",steps:["Look the word up","Translate it into Vietnamese","Find a real example sentence","Copy it all into a notebook","Make your own flashcards","Remember to come back and test yourself"]},
    after:{label:"With Contextuary",steps:["Add the word once","Get its Vietnamese meaning, SAT-style examples and a memory hint","Practise with quizzes, flashcards and AI challenges built from your own list"]}}],
  ["shot",{kicker:"The product",k:"cx-home",ratio:"1600/989",url:"contextuary.app",ghost:"the home page"}],
  ["kicker","The idea"],
  ["para","A definition on its own rarely helped me recognise a word in a test passage. What helped was seeing it inside a sentence that gave it a job. So Contextuary never shows a word alone. It explains each word as it behaves in a real SAT-style sentence, in English and in Vietnamese, then keeps the sentence."],
  ["screens",[
    {k:"cx-1",ratio:"1290/907",url:"contextuary.app/words",ghost:"My Words",cap:"My Words: every saved word with its Vietnamese meaning, an SAT-style example, its status and a topic tag."},
    {k:"cx-2",ratio:"1600/920",url:"contextuary.app/practice",ghost:"a quiz question",cap:"Practice: a fill-in-the-blank question built from the words you saved."}
  ]],
  ["beside",{flip:true,blocks:[
    ["kicker","Listening, then cutting"],
    ["pairs",[
      {h:"Spaced repetition",p:"I built the logic, then removed it. It scheduled reviews of words users didn’t need that day, and opening the app started to feel like a chore."},
      {h:"Topic filters",p:"Few users opened them, so I took them out."},
      {h:"A separate Today page",p:"One more tap to reach the thing they came for. Daily Picks moved to the top of My Words instead."}
    ]]],
    shot:{k:"cx-3",ratio:"1138/1200",url:"contextuary.app/practice",ghost:"Start practice",cap:"What stayed: quiz or flashcards, an AI Challenge, and six question types."}}],
  ["voices",{kicker:"What users wrote",note:"Messages from users, translated from Vietnamese.",items:[
    {q:"Since Contextuary came along, learning vocabulary has become so much easier.",who:"A Contextuary user"},
    {q:"The founder keeps listening and improving it. I love it.",who:"A Contextuary user"}
  ]}],

  ["chapter",{n:"02",id:"together",t:"Together!",p:"A shared journal for teams who work apart",skills:["Information architecture","UI/UX design","Figma"]}],
  ["product",{logo:"img/together-logo.png",logoAlt:"The Together! logo",
    kicker:"Co-Founder and UI/UX Designer · Dec 2025 to now",name:"Together!",
    href:"https://toghether.contextuary.app",label:"Visit Together!",
    lede:"Dream Strokes runs on many people, in many places, each doing a different job. I watched how easily that kind of team drifts apart.",
}],
  ["kicker","The pain points"],
  ["pains",[
    {h:"Out of sight",p:"Members worked in different places and on different jobs, so most of them never saw what the others did."},
    {h:"Forgotten",p:"A good session lived in one group chat for a day, then sank. A season later, nobody could find it."},
    {h:"Not belonging",p:"Members who never saw the team’s work found it harder to feel part of it."}
  ]],
  ["shot",{kicker:"The product",k:"cj-lead",ratio:"1600/916",url:"together · home",ghost:"the home page"}],
  ["beside",{blocks:[
    ["kicker","What we built"],
    ["para","One shared journal for the whole team. Every workshop, meeting and match goes on a common calendar, with its photos and voice notes, and everyone can react and comment, whichever branch or role they are in. We built it for Dream Strokes first; other teams now create their own projects on it."],
    ["pairs",[
      {h:"Decision",p:"Entries are grouped by moment, not by file type, and every item keeps its contributor. Ownership stays visible while the collection becomes shared."},
      {h:"My part",p:"I conceived the product idea and built its information architecture and user flows, then designed the interface in Figma and coded the front end in React. Members of the Dream Strokes team built it with me."}
    ]]],
    shot:{k:"cj-1",ratio:"1600/997",url:"together · sample project",ghost:"a sample project",cap:"A sample project: every activity has a type, a colour and a day, and opens into its photos, voice notes and reactions."}}],
  ["voices",{kicker:"What the team wrote",note:"Messages from Dream Strokes members, translated from Vietnamese.",items:[
    {q:"I had no idea the design team worked this hard.",who:"A Dream Strokes member"},
    {q:"The class was so sweet. Reading everyone’s journal feels like being there.",who:"A Dream Strokes member"}
  ]}],
  ["links",[{href:"#/work/research",label:"Research & Experience"},{href:"#/work/net-mo",label:"Dream Strokes"}]]
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
    {t:"Dec 2025 – now",h:"Together! · Co-Founder and UI/UX Designer",p:"Shared project timeline, built with members of the Dream Strokes team. Used by Dream Strokes and 20+ other projects. 1,550+ visitors, 450+ returning."},
    {t:"2025",h:"Dream Strokes activity journal",p:"Three-role permission system, media upload, calendar, deadline board."}
  ]],
  ["kicker","Selected honours"],
  ["rows",[...AWARDS].sort((a,b)=>b.t-a.t)],
  ["links",[{href:"#/about",label:"About"},{href:"#/awards",label:"Awards"},{href:"#/work/research",label:"Research & Experience"}]]
]},

"/awards":{accent:"#A9760B",where:"Awards",blocks:[
  ["hero",{kicker:"Awards · 2023 to 2026",title:"Awards",
    lede:"I like that these awards do not fit neatly into one category. They came from psychology, writing, maths, design, science, engineering and sport.",
    facts:[{b:String(AWARDS.length),s:"selected honours"},{b:"3",s:"fields"},{b:"1st",s:"in Asia, Psychology Olympiad"}],
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
/* the exhibition hangs in three rooms; each opens with a short wall text */
const GALLERY_ROOMS=[
  {n:"01",t:"Chemistry",p:"Three works about what happens between people: a small signal, then a dance, then a whole room lit up.",ids:["chemistry","restless-light","kaleidoscope"]},
  {n:"02",t:"What grows inside",p:"What I carry where no one sees it: light from a star, strength out of deep red, something quiet still growing.",ids:["stardust","red-season","bloom-anyway"]},
  {n:"03",t:"My city",p:"Ink sketches of Ho Chi Minh City, drawn standing still in places I usually rush past.",ids:["ba-son-view","post-office"]}
];
const roomOf=id=>GALLERY_ROOMS.find(r=>r.ids.includes(id));
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
  <nav class="gallery__plan" aria-label="Rooms of the exhibition">
    <p class="gallery__plan-k">The exhibition · ${ARCHIVE.length} works in ${GALLERY_ROOMS.length} rooms</p>
    <ol>${GALLERY_ROOMS.map(r=>`<li><button type="button" data-gallery-room="${r.n}"><span>Room ${r.n}</span>${r.t}<i>${r.ids.length} works</i></button></li>`).join("")}</ol>
  </nav>
  <div class="gallery" id="gallery">
    <span class="gallery__spot" id="gallerySpot" aria-hidden="true"></span>
    <div class="gallery__wall">${GALLERY_ROOMS.map(r=>`
      <section class="walltext" id="gallery-room-${r.n}" aria-label="Room ${r.n}, ${r.t}">
        <p class="walltext__n">Room ${r.n}</p>
        <h3 class="walltext__t">${r.t}</h3>
        <p class="walltext__p">${r.p}</p>
      </section>${r.ids.map(id=>{ const i=ARCHIVE.findIndex(x=>x.id===id), a=ARCHIVE[i]; return `
      <button class="work${a.support==="paper"?" work--paper":""}" data-obj="${i}" type="button" style="--ratio:${a.ratio};--ar:${a.ratio.split("/")[0]/a.ratio.split("/")[1]};--size:${a.size}"
        aria-label="${a.t}, ${label(a)}. Open to inspect.">
        <span class="work__lamp" aria-hidden="true"></span>
        <span class="work__frame">
          <span class="work__plate" data-img="art-${a.id}" style="--ratio:${a.ratio}"><span class="fig__ghost">${a.t}</span></span>
        </span>
        <span class="work__label">
          <b>${a.t}</b>
          <span>${label(a).replace(/ × /g,"\u00a0×\u00a0")}</span>
          <span class="work__peek">Inspect</span>
        </span>
      </button>`; }).join("")}`).join("")}</div>
    <span class="gallery__floor" aria-hidden="true"></span>
  </div>
  <div class="gallery__after">
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
  /* rooms told in chapters: links glide to their chapter instead of re-opening the room */
  const chapGap=()=>$(".room__top").offsetHeight+(($(".chbar",inner)||{}).offsetHeight||0)+16;
  inner.addEventListener("click",e=>{
    const a=e.target.closest("[data-jump]"); if(!a) return;
    const t=document.getElementById(a.dataset.jump); if(!t) return;
    e.preventDefault();
    room.scrollTo({top:t.offsetTop-chapGap(),behavior:REDUCED?"auto":"smooth"});
  });
  /* the chapter bar lights the chapter you are reading */
  let chapRaf=0;
  function markChapter(){
    chapRaf=0;
    const bar=$(".chbar",inner); if(!bar){ delete room.dataset.chap; return; }
    const y=room.scrollTop+chapGap()+room.clientHeight*.25;
    let cur=null; $$(".chap",inner).forEach(c=>{ if(c.offsetTop<=y) cur=c.id; });
    $$("a",bar).forEach(l=>{
      const on=l.dataset.jump===cur; l.classList.toggle("is-on",on);
      on?l.setAttribute("aria-current","location"):l.removeAttribute("aria-current");
      if(on) $(".chbar__now",bar).textContent=l.title;
    });
    if(!cur) $(".chbar__now",bar).textContent="";
    if(room.dataset.chap!==(cur||"")) room.dataset.chap=cur||"";
  }
  room.addEventListener("scroll",()=>{ if(!chapRaf) chapRaf=requestAnimationFrame(markChapter); },{passive:true});
  /* objects in space lean toward the pointer (not under reduced motion, not on touch) */
  if(!REDUCED && window.matchMedia("(hover:hover)").matches){
    inner.addEventListener("pointermove",e=>{
      const st=e.target.closest(".object3d__stage"); if(!st) return;
      const r=st.getBoundingClientRect(), x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
      st.style.setProperty("--rx",(-y*10).toFixed(2)+"deg"); st.style.setProperty("--ry",(x*18-14).toFixed(2)+"deg");
    });
    inner.addEventListener("pointerout",e=>{ const st=e.target.closest(".object3d__stage"); if(st&&!st.contains(e.relatedTarget)){ st.style.removeProperty("--rx"); st.style.removeProperty("--ry"); } });
  }
  /* switchers: one tab open at a time, arrow keys move between them */
  function pickTab(tab){
    const box=tab.closest(".switcher");
    $$("[role=tab]",box).forEach(t=>{ const on=t===tab; t.setAttribute("aria-selected",String(on)); t.tabIndex=on?0:-1; document.getElementById(t.getAttribute("aria-controls")).hidden=!on; });
  }
  inner.addEventListener("click",e=>{ const t=e.target.closest(".switcher [role=tab]"); if(t) pickTab(t); });
  inner.addEventListener("keydown",e=>{
    const t=e.target.closest(".switcher [role=tab]"); if(!t||!/^Arrow(Left|Right|Up|Down)$/.test(e.key)) return;
    e.preventDefault();
    const tabs=$$("[role=tab]",t.parentElement), n=tabs[(tabs.indexOf(t)+(/Right|Down/.test(e.key)?1:tabs.length-1))%tabs.length];
    pickTab(n); n.focus();
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
      room.style.setProperty("--room-top",$(".room__top").offsetHeight+"px");
      tieLastWords(inner);
      paintMedia(inner); wireEvents(inner);
      $$("[data-uncover],[data-part],[data-mask],[data-draw]",inner).forEach(el=>io.observe(el));
      room.scrollTop=0; markChapter();
      const target=anchor&&document.getElementById("room-"+anchor);
      if(target) requestAnimationFrame(()=>{ room.scrollTop=target.offsetTop-chapGap(); });
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
    { const r=roomOf(a.id); $("#objCount").textContent=`${r?`Room ${r.n} · ${r.t} · `:""}${String(idx+1).padStart(2,"0")} of ${ARCHIVE.length}`; }
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
  const wall=$(".gallery__wall");
  dragScroll(wall);
  /* the floor plan: each room's button walks the wall to its wall text, and lights the room you are in */
  const plan=$$("[data-gallery-room]");
  plan.forEach(btn=>btn.addEventListener("click",()=>{
    const t=document.getElementById("gallery-room-"+btn.dataset.galleryRoom); if(!t||!wall) return;
    wall.scrollTo({left:t.offsetLeft-parseFloat(getComputedStyle(wall).paddingLeft),behavior:REDUCED?"auto":"smooth"});
  }));
  function markRoom(){
    if(!wall) return;
    const x=wall.scrollLeft+wall.clientWidth*.35; let cur=plan[0]&&plan[0].dataset.galleryRoom;
    $$(".walltext",wall).forEach(w=>{ if(w.offsetLeft<=x) cur=w.id.replace("gallery-room-",""); });
    plan.forEach(b=>{ const on=b.dataset.galleryRoom===cur; b.classList.toggle("is-on",on); on?b.setAttribute("aria-current","location"):b.removeAttribute("aria-current"); });
  }
  let roomRaf=0;
  if(wall){ wall.addEventListener("scroll",()=>{ if(!roomRaf) roomRaf=requestAnimationFrame(()=>{ roomRaf=0; markRoom(); }); },{passive:true}); markRoom(); }
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
