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
- Keep every interaction: knock entrance, drifting motes canvas, story map
  of doors, crayon tray toggle, Contextuary word demo, draggable strips,
  archive object viewer, chapter-coloured navigation.
- Main page stays lean: per chapter one short line, one visual, one way in.
  Detail belongs in the deep spaces (ROOMS in app.js).
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

Chapter accents: 01 pink, 02 coral, 03 teal, 04 violet, 05 blue,
06 orange on navy, 07 teal, 08 pink. Around 85% of the language is shared;
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
