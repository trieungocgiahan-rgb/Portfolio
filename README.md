# Knock, knock — personal site

Static site. No build step, no dependencies, no framework.

```
index.html    markup: hero, chapters 01–08, footer, deep-space shells
styles.css    design tokens + all styling
app.js        MEDIA map, interactions, router for the deep spaces
img/          photographs
```

## Run it locally

```bash
python3 -m http.server 5173     # then open http://localhost:5173
```

Opening index.html by double-clicking also works, but a local server
is closer to how it will behave when deployed.

## Add a photograph

1. Drop the file in `img/`
2. Open `app.js`, find the `MEDIA` object at the very top
3. Point the matching key at the file, e.g. `"nm-lead": "img/nm-lead.jpg"`,
   or give it alt text and a crop focus:
   `"nm-lead": {src:"img/nm-lead.jpg", alt:"…", pos:"50% 30%"}`
   (`fit:"contain"` shows the whole image instead of cropping)

Empty keys render a labelled placeholder that says what belongs there,
so the layout never breaks while slots are still empty. Each frame keeps
its own ratio; the photograph is cropped to it, never stretched. Artworks
and interface screenshots are shown whole.

Slots: hero-door, rooms-hall, rooms-hands, sheet-2, gather-2,
art-1…6 (exhibition), nm-lead + nm-1…3, gt-lead + gt-1…3, td-lead,
cx-lead + cx-1…3, cj-lead, ab-2.

## Edit the deep-space pages

Everything behind a "Read the … story" link or the Doors menu is data, not
markup. In `app.js`, the `ROOMS` object holds one entry per room: Nét Mơ,
Events, Research & Internships, Tech Projects, About, CV, Awards (the
Exhibition is built from `ARCHIVE`; the honours live once in `AWARDS`).
Each room starts with a `hero` block (kicker, title, lede, facts, and `k`,
the photograph shown in its door), then a list of blocks: kicker,
subtitle, lede, para, quote, steps, numbers, pairs, rows, contact, fig,
lead, figs, strip, links. A kicker written as `{t:"…", id:"internships"}`
can be linked to directly as `#/work/research/internships`.

## Link an event

The events are listed in the Events room. Open `app.js`,
find `EVENT_LINKS` near the top and paste each URL:
`"beats-of-hope": "https://…"`. An "Event page ↗" link appears under that
event only once its URL is filled in.

## Still to replace

- `hello@example.com` (search for `data-replace="email"`)
- `https://example.com/virtual-gallery` (`data-replace="gallery-url"`)
- CV link

## Deploy

```bash
npx vercel          # or: drag the folder onto vercel.com
```
GitHub Pages works too: push the folder, enable Pages on the main branch.
