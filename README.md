# munene1212.github.io

Client-facing portfolio for **Munene Denis, Founder & CTO of [Emen](https://ementech.co.ke)**.
Live at <https://munene1212.github.io>.

Static HTML, CSS and plain JavaScript. No build step, no framework, no tracking.

## Edit content, not markup

| To change… | Edit |
| --- | --- |
| Name, role, email, social links, headshot | `assets/data/profile.js` |
| Case studies and the project index | `assets/data/projects.js` |
| Page sections (services, process) | `index.html` |
| Look and feel (colour tokens, light/dark) | `assets/css/site.css` |

A project with `featured: true` and a `story` becomes a case study; everything else
appears under *More work*. Leave `repo` out for private work and the page shows
"Private — demo on request".

`projects.js` is public. Never put credentials, server addresses or internal notes in it —
those belong in the private `vault` repository.

## Run locally

```bash
python3 -m http.server 8000      # then open http://localhost:8000
# or
docker compose up                # http://localhost:8080
```

## Layout

```
index.html
assets/
  css/site.css        design tokens + layout (light and dark)
  js/site.js          renders the data files into the page
  data/profile.js     identity and contact (single source)
  data/projects.js    public project catalogue
  img/monogram.svg    MD mark (also the favicon)
```
