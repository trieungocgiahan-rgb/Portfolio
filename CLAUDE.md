# Working on this site

## What it is
A personal site for Triệu Ngọc Gia Hân (Suki), Grade 12, Ho Chi Minh City,
applying to US universities. It is an editorial narrative, not a résumé.
Eight chapters carry one thesis: she notices what changes when people start
sharing a room, then tests it through community work, research and building.

## Hard rules
- No framework, no build step, no dependencies. Plain HTML, CSS, JS.
- Never reintroduce résumé structure (hero → about → skills → project grid).
- Keep the door motif: knock entrance, Doors panel, deep spaces as rooms.
- Doors has four destinations: Work (Nét Mơ, Events, Research &
  Internships, Tech Projects), Exhibition, Awards, About. Routes are
  /work/net-mo, /work/events, /work/research, /work/tech, /exhibition,
  /awards, /about, /cv. Old routes resolve through ROOM_ALIASES;
  /room/anchor scrolls to a kicker with that id. Rooms open in place.
- Every room starts with a hero block (navy, the room's accent, its lead
  photograph through an arched door) and then tells one short story: what
  was noticed, what changed, what it led to. No long lists or archives;
  the CV holds the dated record, AWARDS holds the honours once.
- Keep every interaction: knock entrance, drifting motes canvas, the story
  in four steps, crayon tray toggle, Contextuary word demo, crossover chart,
  Pattern, draggable exhibition wall, archive object viewer,
  chapter-coloured navigation.
- The main page is an overview for a 60–90 second read (see BRIEF.md): one
  lead project per chapter, one short line, one visual, one stats line, one
  way in. Each number appears once. Everything else belongs in the deep
  spaces (ROOMS in app.js). Do not add sections to the main scroll.
- Respect prefers-reduced-motion everywhere.
- No horizontal scrolling at any width. Tablet (768–1024px) is a first-class
  composition, not a squeezed desktop.

## Design system (tokens at the top of styles.css, one :root)
Type roles: --t-display (hero only), --t-index, --t-title, --t-idea (serif
questions), --t-lead, --t-body, --t-ui, --t-meta, --t-caption.
Space scale: --sp-1 … --sp-6.
Layout: --content 1200px, --gutter clamp(24px,5vw,72px), --col-start (where
the content column starts inside any full-width box).
Breakpoints: phone ≤699, portrait tablet 700–900 (single-column compositions
≤900), landscape tablet 901–1024, laptop 1025–1440, small phone ≤560.

Visual grammar, kept strict:
- dot = location or state
- thin line = structure or transition
- mono = metadata and evidence
- serif = ideas and questions
- pill = tag or navigation only

Chapter accents: 01 Hello pink, 02 Notice coral, 03 Study violet, 04 Build
blue, 05 Gather orange on navy, 06 Pattern teal, 07 Open pink. Around 85% of the language is shared;
the accent appears only in numbers, rules, dots, nav state and small labels.

## Conventions
- styles.css has one block per component, in page order, with that
  component's breakpoint changes written beside it. Change the component's
  own block. Never append an override layer ("FIXES") at the end, never add
  a second definition of a component, avoid !important.
- Layout lives in CSS classes, not inline styles. Inline style is only for
  data: --ratio, --len, --dl, --dc.
- Prefer grid and flex. Absolute positioning only for decorative layers.
- Fix overflow at the element that is too wide. body{overflow-x:clip} is a
  last guard, not a fix. Words never break mid-word; only URLs may.
- Image roles: hero, evidence (numbered plate), artifact (object seen whole),
  screen (interface seen whole), contact sheet (square crops), gallery
  (framed artwork, seen whole), deep-space lead and strip. Photographs are
  <img> elements inside a frame: the frame owns the ratio (--ratio), the
  image is never stretched (--fit cover or contain, --pos focal point).
- Copy is specific and plain. No personal-brand language.
