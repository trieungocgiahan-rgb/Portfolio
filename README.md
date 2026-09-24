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
3. Point the matching key at the file, e.g. `"nm-lead": "img/nm-lead.jpg"`

Empty keys render a labelled placeholder that says what belongs there,
so the layout never breaks while slots are still empty.

Slots: hero-door, rooms-hall, rooms-hands, sheet-1…7, cj-ui, gather-1…4,
art-1…6 (exhibition), nm-lead + nm-1…5, cx-lead + cx-1…4, cj-lead + cj-1…2,
td-lead + td-1…3, gt-lead + gt-1…4, ab-1…3.

## Edit the deep-space pages

Everything behind a "Story behind this" link is data, not markup.
In `app.js`, the `ROOMS` object holds one entry per page. Each page is a
list of blocks: kicker, title, lede, para, quote, steps, numbers, pairs,
lead, figs, strip, links. Add or reorder blocks and the page rebuilds.

## Still to replace

- `hello@example.com` (search for `data-replace="email"`)
- `https://example.com/virtual-gallery` (`data-replace="gallery-url"`)
- CV link

## Deploy

```bash
npx vercel          # or: drag the folder onto vercel.com
```
GitHub Pages works too: push the folder, enable Pages on the main branch.
