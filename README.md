# Le Tour de North Carolina — Bar Exam Edition

A Zwift-style indoor-ride quiz game built as a gift for **James** — California-barred,
North-Carolina-living, structured-finance lawyer, 2016 NC Ironman champion — as he studies
for the North Carolina bar.

Each of the four stages is a **workout**: soft-pedal the flats (warm-up recall), empty the
tank on the **sprints** (timed, green-jersey points), and survive the **mountain climbs**
where the marquee NC-vs-CA differences live and the road literally tilts up as the questions
get harder. Three jerseys, 50 questions, every answer cited to a real statute or rule.

## What's in here

| File | Purpose |
|------|---------|
| `index.html` | The page (structure + styling). Open this to play. |
| `game.js` | The ride engine — animated cyclist, parallax terrain, gradient, scoring, jerseys. |
| `questions.js` | The 50-question bank. Every item cited to NC and CA primary sources. |

No build step, no dependencies, no server needed — it's plain HTML/CSS/JS.
(It pulls one web font from Google Fonts; it still works offline, just with a fallback font.)

## Play it locally

Double-click `index.html`, or from this folder run:

```bash
# either just open it…
open index.html
# …or serve it (any of these works)
python3 -m http.server 8000      # then visit http://localhost:8000
npx serve .
```

## Deploy to GitHub Pages (to share with James)

1. Create a new GitHub repo (e.g. `tour-de-north-carolina`) and push these three files plus this README:

   ```bash
   cd /Users/peterrepetti/bar_exam
   git init
   git add index.html game.js questions.js README.md
   git commit -m "Le Tour de North Carolina — bar exam edition"
   git branch -M main
   git remote add origin https://github.com/<your-username>/tour-de-north-carolina.git
   git push -u origin main
   ```

2. On GitHub: **Settings → Pages → Build and deployment**.
   Set **Source = Deploy from a branch**, **Branch = `main`**, **Folder = `/ (root)`**, then **Save**.

3. Wait ~1 minute. Your link will be:

   ```
   https://<your-username>.github.io/tour-de-north-carolina/
   ```

   Text that to James. It works on his phone, his laptop, and — fittingly — the iPad propped
   on his bike trainer.

### Alternative: Cloudflare Pages
Connect the same repo at **dash.cloudflare.com → Workers & Pages → Create → Pages → Connect to Git**.
Leave the build command empty and the output directory as `/`. It deploys the static files as-is.

## A note on accuracy

This is a study aid and a gift — **not legal advice**, and no substitute for bar prep.
Every legal point was verified against primary sources:

- North Carolina General Statutes — [ncleg.gov](https://www.ncleg.gov)
- California codes — [leginfo.legislature.ca.gov](https://leginfo.legislature.ca.gov)
- North Carolina State Bar Rules of Professional Conduct — [ncbar.gov](https://www.ncbar.gov)
- State Bar of California Rules of Professional Conduct — [calbar.ca.gov](https://www.calbar.ca.gov)

Each answer shows its NC and CA citation so the quiz doubles as a study tool and so anything
can be checked against the source. Law changes — confirm before relying on any item.

## Editing / adding questions

All content lives in `questions.js` as a plain array. Each question:

```js
{
  terrain: "flat" | "rolling" | "sprint" | "climb" | "hc",  // controls the workout & difficulty
  diff: 1,                          // 1 easy … 3 hard
  q: "…the question…",
  options: ["…", "…", "…", "…"],    // exactly 4; shuffled at runtime
  correct: "…must equal one option exactly…",
  explain: "…plain-English why…",
  nc: "N.C. Gen. Stat. § …",        // shown to the player
  ca: "Cal. … Code § …"
}
```

`terrain` sets the ride: `flat`/`rolling` are easier ground, `sprint` is a timed green-points
dash, and `climb`/`hc` are the hard differences that steepen the road and award KOM points.
