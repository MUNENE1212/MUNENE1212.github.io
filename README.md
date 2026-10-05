# munene1212.github.io

Client-facing portfolio for **Munene Denis, Founder & CTO of [Emen](https://ementech.co.ke)**.
Live at <https://munene1212.github.io>.

Static HTML, CSS and plain JavaScript. No build step, no framework, no tracking.

## Edit content, not markup

| To change… | Edit |
| --- | --- |
| Name, role, email, social links, headshot | `assets/data/profile.js` |
| Case studies, screenshots and the project index | `assets/data/projects.js` |
| Story, timeline, experience, education, skills | `assets/data/career.js` (About + Résumé) |
| Page sections (services, process) | `index.html` |
| Look and feel (colour tokens, light/dark) | `assets/css/site.css` |

A project with `featured: true` and a `story` becomes a case study; everything else
appears under *More work*. Leave `repo` out for private work and the page shows
"Private — demo on request".

`projects.js` is public. Never put credentials, server addresses or internal notes in it —
those belong in the private `vault` repository.

## Pages

- `index.html` — services, case studies, more work, process, contact form (opens the visitor's email app)
- `about.html` — story, milestones, skills, education, principles
- `resume.html` — printable résumé; *Print / save as PDF* produces a 2-page A4 CV from the same data

Content merged from the earlier multi-page portfolio (`plp-final-web-project`) in October 2026.

Screenshots live in `assets/img/work/` as ~1200px WebP. Never use screenshots that show
real customers' names, messages or data.

## Run locally

```bash
python3 -m http.server 8000      # then open http://localhost:8000
# or
docker compose up                # http://localhost:8080
```

## Layout

```
index.html  about.html  resume.html
assets/
  css/site.css        design tokens + layout (light and dark)
  js/site.js          renders the data files into the page
  data/profile.js     identity and contact (single source)
  data/projects.js    public project catalogue
  data/career.js      story, experience, education, skills
  img/work/           product screenshots (WebP)
  img/monogram.svg    MD mark (also the favicon)
```
