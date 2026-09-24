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
- Keep every interaction: knock entrance, drifting motes canvas, crayon tray
  toggle, Contextuary word demo, draggable strips, archive object viewer,
  chapter-coloured navigation.
- Respect prefers-reduced-motion everywhere.
- No horizontal scrolling at any width. Tablet (768–1024px) is a first-class
  composition, not a squeezed desktop.

## Design system (defined at the end of styles.css)
Type roles: --t-display (hero only), --t-index, --t-title, --t-idea (serif
questions), --t-lead, --t-body, --t-meta, --t-caption.
Space scale: --sp-1 … --sp-6.
Layout: --content 1200px, --gutter clamp(24px,5vw,72px).

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
- New styling goes in the last block of styles.css, which is authoritative.
- Prefer grid and flex. Absolute positioning only for decorative layers.
- Image roles: hero, evidence (numbered plate), artifact (small, rotated),
  gallery (framed artwork).
- Copy is specific and plain. No personal-brand language.
