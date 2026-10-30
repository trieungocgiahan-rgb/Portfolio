# Working on this site

## What it is
A personal site for Trieu Ngoc Gia Han (Suki), Grade 12, Ho Chi Minh City,
applying to US universities. It is an editorial narrative, not a résumé.
Eight chapters carry one thesis: she notices what changes when people start
sharing a room, then tests it through community work, research and building.

## Hard rules
- No framework, no build step, no dependencies. Plain HTML, CSS, JS.
- Never reintroduce résumé structure (hero → about → skills → project grid).
- Keep the door motif: the entrance (Knock, knock. and one "Come in"
  button, which also opens by itself after 1.6 s or on any key, wheel or
  touch, so no reader has to work to get in), Doors panel, deep spaces as rooms.
- Doors has four destinations: Work (Dream Strokes, Events, Research &
  Experience, Tech Projects), Exhibition, Awards, About. The CV is not in
  Doors; About tells the longer story and ends on a CTA to it. Routes are
  /work/net-mo, /work/events, /work/research, /work/tech, /exhibition,
  /awards, /about, /cv. Research is a hub with three sub-rooms, one per
  piece of work, so none is skimmed past: /work/research/ai-art,
  /work/research/teencare, /work/research/brain-life. Research rooms never
  show participants; their doors hold line drawings and their evidence is
  charts (bars, crossover). The two experience rooms (startup roles) wear their company's
  own look: TeenCare a soft sunrise in its yellow and orange with slate
  ink, Brain-Life white with its electric blue (#0041E7) and a dot grid;
  each company's wordmark stands in for the room title and its icon sits
  in the door. TeenCare tells her remote R&D work as a story: how she
  came in as a tester and proposed telling surveys as stories (fairy tales), the weekly loop (interview, clean, analyse, name pain points,
  design and test, with line drawings), the persona Meo, the pain points,
  where people went quiet and two of the five narrative formats, the
  product un-wrap (its cover beside the user journey, her mockup of the
  book, the five-step recipe mapped to schema therapy), Fluffy Cloud (the Facebook page she started to reach
  teenagers and raise awareness), the interface she designed (a survey
  screen rebuilt in HTML, formmock, and the palette), testing. Dream Strokes is the flagship and tells the
  whole ecosystem in eight numbered chapters, each with its own layout so
  the page never reads as one long scroll: 01 Why Dream Strokes exists (one right
  answer at her public school, the contrast of identical and free dots,
  why she started it, our hope, the boy in the corner), 02 Sessions (lesson plans, the Magic Mirror, Colors
  of Joy), 03 OPEN (a switcher: Sol Sound, Colors of the Pitch, Once Upon
  the Inside), 04 Art that keeps going (website, virtual exhibition, the
  money loop), 05 Partners and sponsors (Bao Sang and Phuong Thao
  Nguyen, then a table of who backs us and how), 06 The team (the Vietnam map: where it started and where
  members are), 07 What we make (Feel-it!, curriculum,
  calendar, comic), 08 How it adds up (a logic model: what goes in, what we do, who
  it reaches, what changes), then Follow the journey
  (netmoproject.page and the Facebook page, NETMO_FACEBOOK). Each
  chapter opens with skill tags (pills) for the skills it shows.
  Events (three chapters: Why, Beats of Hope, Eight more) and Tech (two
  chapters: Contextuary, Together!) use the same chapter map and bar.
  Exhibition is a real gallery: a floor plan of three rooms (GALLERY_ROOMS:
  Chemistry, What grows inside, My city), each opening with a wall text
  in her voice, picture lights, museum labels, an oak floor; her statement
  and painting notes stay word for word.
  Awards is told as a story: the years on one line with a small medal
  per honour, then one chapter per group (AWARD_GROUPS), each honour a
  drawn medal (ribbon in the group colour, its mark engraved) beside the
  short facts, her own story one tap away, the sides taking turns.
  Events is one story about why she makes gatherings,
  told in four threads (Create together, Cheer for the same thing, Make room to belong,
  Start what isn't there): the threads first, then Beats of Hope as the
  flagship that holds all four, then the other gatherings from her CV, two
  per thread, each card with a photo slot (ev-* in MEDIA) and a tag where
  it was a first at her school. Old routes resolve through ROOM_ALIASES;
  /room/anchor scrolls to a kicker with that id. Rooms open in place.
  Every work room (Dream Strokes, Events, AI & Art, TeenCare, Brain-Life,
  Tech) opens with an At a glance box (glance: role, team, when, results,
  links) for a quick reader. Dream Strokes shows its eight parts as a ring
  around the project (chapters with ring).
- Every room starts with a hero block with its own light, set by
  data-room on #room: one dark hero (Events night stage) and light ones
  (Dream Strokes a pink-sky-butter ombre, Awards champagne gold, Tech shades of blue
  with a dot grid, Research shades of violet on graph paper, Exhibition
  paint washes, About blush, CV ruled paper). Light rooms (Dream Strokes,
  Events, Tech, Research, Exhibition, Awards) carry their colour through the whole
  page as an ombre that shifts per chapter, with frosted-glass cards. Only
  Dream Strokes mixes several pastels; every other room's ombre stays in
  shades of its own one colour (Events amber, Tech blue until a product
  chapter, which takes on its own app: Contextuary violet #5020D0, Together!
  cream and coral #D2502F; Research violet,
  Exhibition warm gallery white, Awards gold), so the rooms never look alike; the lead
  photograph is always seen through an arched door and then tells one short story: what
  was noticed, what changed, what it led to. About is the one exception,
  built from her mockup (aboutHTML in app.js): a sketch hero with line-only
  art (sparkles, one pink swirl), the story beside her portrait box (ab-2),
  a pink band for its key line, then "See my drawings", "Open my CV" and a
  Dream Strokes card: where she puts this into practice.
  Tech is the other: its door holds the two app icons (marks), never a
  cropped screenshot; each product opens on a product block (logo, name,
  role, Visit link) and its screens sit in browser frames (.browser), shown
  whole at their own proportions.
  No long lists or archives;
  the CV holds the dated record, AWARDS holds the honours once.
- Keep every interaction: the entrance, drifting motes canvas, the story
  thread and the closing dots, crayon tray toggle, crossover chart,
  draggable exhibition wall, archive object viewer, the
  screening room under the wall (FILMS in app.js, click-to-play embeds),
  chapter-coloured navigation.
- Two navigations, two jobs, never mixed. The top bar is "The story":
  only the six numbered parts of the homepage, named for what each holds
  (01 Dream Strokes, 02 Research, 03 Together!, 04 Events, 05 Art, 06 Still curious),
  each lit in its own colour; it never links to a room. The Rooms button
  (solid, with a door icon) opens the Doors panel, the only place that
  lists the pages behind the story.
- The homepage is one continuous story in the owner's own words (see
  BRIEF.md): hero, 00 Who I am (who she is, "Read more about me" into
  About, then on to Dream Strokes), 01 Notice, 02 Study, 03 Make, 04 Gather, 05 Draw,
  06 The question, More work, footer. The hero and the ID card ask the one
  question: what makes it easier for people to take part? Parts 01–05 each
  carry a way-in line (.wayin). 01 Dream Strokes carries three tags
  (Creative, Expressive, Connection) and two paragraphs: one story of why
  making and expressing matter and how it brings people together (different
  drawings from one prompt, the shared tray; told warmly, no school contrast), then why she started it and one line
  hinting at what grew around that table, with no list: the ecosystem is
  left for the room to show (the curriculum Cloud’s Story: Drawing Worries,
  Colouring Hope; sessions; the team; OPEN; Feel-it!; art that pays for
  the next session). The Magic
  Mirror is one session, never the curriculum. Then
  02 Expressive (a format that fits the person), 03 Connection (seeing what
  everyone else did), 04 Gathering (one person moving closer to the stage),
  05 Creative (a blank page, just for me); 06 gathers them and keeps the
  open questions. Each part: title, story, one visual,
  one "Inside ·" line saying what the detail page holds, one way in, then a
  bridge (a.bridge): one serif sentence that hands on to the next part, and
  never claims an order or a cause that is not true (she approved the current
  copy in October 2026). Each part stays short: one small story, then one line that hints at what the room holds, never a list of its contents. Story prose is set at --t-lead and the Inside line and fact line at --t-ui, so nothing on the homepage reads as fine print. Numbers live in the prose; do not add stat rows. Do
  not add sections; detail belongs in the rooms (ROOMS in app.js).
- Small text (mono labels, captions) must reach 4.5:1 against what is painted
  behind it: labels in a room's colour use color-mix(accent 76%, ink), grey
  text uses --ink-45 at .66 or darker; on phones --t-meta and --t-caption grow
  a step. Check with a contrast pass before publishing.
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

Story accents: 01 Notice coral, 02 Study violet, 03 Make blue, 04 Gather
orange on navy, 05 Draw pink, 06 The question teal, More work pink. Around 85% of the language is shared;
the accent appears only in numbers, rules, dots, nav state and small labels.

## Conventions
- styles.css has one block per component, in page order, with that
  component's breakpoint changes written beside it. Change the component's
  own block. Never append an override layer ("FIXES") at the end, never add
  a second definition of a component, avoid !important.
- A room's section heading is a ["kicker", …] block: it renders an h3
  (.room__head) whose text before the first " · " is the title and the
  rest is mono metadata. Keep the title short; put dates and places after.
- Layout lives in CSS classes, not inline styles. Inline style is only for
  data: --ratio, --len, --dl, --dc.
- Prefer grid and flex. Absolute positioning only for decorative layers.
- In a story part the sticky visual lives inside .story__grid; anything
  after the grid (the Dream Strokes tray, the bridge) sits outside it, so the
  visual can never slide over it while scrolling.
- Fix overflow at the element that is too wide. body{overflow-x:clip} is a
  last guard, not a fix. Words never break mid-word; only URLs may.
- No lonely words: the last line of a paragraph never holds only one or
  two words. tieLastWords() in app.js ties the last three words (it runs on
  the homepage, on every room render, and wherever JS changes text; call it
  after setting new text). If a tie still leaves a short last line, the
  column is too narrow: widen the content, do not shrink the type. Big
  display headings may end on two words when text-wrap:balance splits them.
- Image roles: hero, evidence (numbered plate), artifact (object seen whole),
  screen (interface seen whole), contact sheet (square crops), gallery
  (framed artwork, seen whole), deep-space lead and strip. Photographs are
  <img> elements inside a frame: the frame owns the ratio (--ratio), the
  image is never stretched (--fit cover or contain, --pos focal point).
- Copy is specific and plain. No personal-brand language.
- One voice everywhere: first person, plain, short, like telling a friend.
  No aphorisms or "not X, but Y" slogans, no repeated lines across rooms
  (each idea is said once, where it belongs), no captions that claim more
  than the photograph shows. Her own texts (About, award stories, the
  Exhibition statement) stay word for word.
- Editing rules for every page. Each paragraph must add something new about
  her or the work; if it only repeats that she cares about people, likes
  creating or wants to connect, cut it or replace it with a real detail.
  Never force an anecdote into a page to make it sound "human".
  1. One centre, different facets. Connecting people stays the core, but
     each page shows its own side: Dream Strokes, creative opportunity
     anyone can reach; TeenCare, inviting people to explore themselves;
     Together!, letting members see each other's work.
  2. Facts over meaning. Cut "I deeply believe", "What it taught me",
     "That is why…" when the paragraph before already makes it clear. Spend
     the space on what she noticed, what she chose and why.
  3. No forced journey. Keep cause and effect only where it is true; work
     that came from an interest, a need or a chance is told that way.
  4. Her role is always clear: what she did, what the team did, who she
     worked with. Not every sentence has to start with "I".
  5. No claims wider than what was seen. Avoid "every", "nobody",
     "students think…"; name the group, the setting and the result. Keep
     apart what she hopes, what she observed and what was tested.
  6. Each kind of content has its own way of telling: projects, decisions
     and what happened; research, the question, the findings and their
     limits; art, feeling or the choice made in the work; awards, short
     facts, with her story one tap away.
- Her name on the site is Gia Han (Trieu Ngoc Gia Han in full). The site
  never says how it was built.
- English only. Every visible word on the site is English. The project is
  called Dream Strokes; other Vietnamese names are written without
  diacritics, as on her CV (Trung Vuong, Gia Han, Bao Sang Art Therapy
  Center, Hey Tet!).
- Facts are checked against her CV: where the site and the CV disagree on a
  name, role, date or number, the CV wins. The CV is a check, not a source
  of new content: do not copy the whole CV onto the site. Her phone number
  stays off the public site.
