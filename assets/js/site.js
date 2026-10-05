/* Renders the page from PROFILE (profile.js) and PROJECTS (projects.js).
   No framework: content lives in the data files, this file only draws it. */

(function () {
  // Escape text before putting it into HTML.
  function esc(value) {
    return String(value || "").replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function links(project) {
    let html = "";
    if (project.url) {
      html += '<a href="' + esc(project.url) + '" target="_blank" rel="noopener">Visit ↗</a>';
    }
    if (project.repo) {
      html += '<a href="' + esc(project.repo) + '" target="_blank" rel="noopener">Source ↗</a>';
    }
    if (!project.url && !project.repo) {
      html += '<span class="muted">Private — demo on request</span>';
    }
    return html;
  }

  function badges(project) {
    return (
      '<span class="badge badge-' + project.status + '">' + esc(STATUS_LABEL[project.status]) + "</span>" +
      '<span class="badge">' + esc(DIVISIONS[project.division]) + "</span>"
    );
  }

  function stackList(project) {
    return project.stack.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("");
  }

  // ---- Profile ----
  document.getElementById("role-location").textContent = PROFILE.role + " · " + PROFILE.location;

  const emailLink = document.getElementById("email-link");
  emailLink.href = "mailto:" + PROFILE.email;
  document.getElementById("email-text").textContent = PROFILE.email;

  const companyLink = document.getElementById("company-link");
  companyLink.href = PROFILE.company.url;
  companyLink.textContent = PROFILE.company.name;

  document.getElementById("socials").innerHTML =
    '<li><a href="' + esc(PROFILE.links.linkedin) + '" target="_blank" rel="noopener">LinkedIn</a></li>' +
    '<li><a href="' + esc(PROFILE.links.github) + '" target="_blank" rel="noopener">GitHub</a></li>' +
    '<li><a href="' + esc(PROFILE.links.x) + '" target="_blank" rel="noopener">X</a></li>' +
    '<li><a href="' + esc(PROFILE.company.url) + '" target="_blank" rel="noopener">ementech.co.ke</a></li>';

  const portrait = document.getElementById("portrait");
  if (PROFILE.headshot) {
    portrait.innerHTML = '<img src="' + esc(PROFILE.headshot) + '" alt="' + esc(PROFILE.name) + '" />';
  } else {
    portrait.innerHTML = '<img class="monogram" src="assets/img/monogram.svg" alt="MD monogram" />';
  }

  document.getElementById("year").textContent = new Date().getFullYear();

  const liveCount = PROJECTS.filter(function (p) { return p.status === "live"; }).length;
  document.getElementById("count-live").textContent = liveCount;

  // ---- Case studies ----
  const featured = PROJECTS.filter(function (p) { return p.featured; });
  document.getElementById("cases").innerHTML = featured.map(function (p) {
    return (
      '<article class="case" id="' + esc(p.id) + '">' +
        '<div class="case-meta">' + badges(p) + "</div>" +
        "<h3>" + esc(p.name) + "</h3>" +
        '<p class="case-summary">' + esc(p.summary) + "</p>" +
        '<dl class="case-story">' +
          "<div><dt>Problem</dt><dd>" + esc(p.story.problem) + "</dd></div>" +
          "<div><dt>Approach</dt><dd>" + esc(p.story.approach) + "</dd></div>" +
          "<div><dt>Result</dt><dd>" + esc(p.story.result) + "</dd></div>" +
        "</dl>" +
        '<ul class="stack">' + stackList(p) + "</ul>" +
        '<div class="case-links">' + links(p) + "</div>" +
      "</article>"
    );
  }).join("");

  // ---- Full index with division filter ----
  const indexEl = document.getElementById("index");

  function renderIndex(division) {
    // Case studies are already shown above, so the index lists everything else.
    const items = PROJECTS.filter(function (p) {
      if (p.featured) return false;
      return division === "all" || p.division === division;
    });
    indexEl.innerHTML = items.map(function (p) {
      return (
        '<article class="row">' +
          '<div class="row-main">' +
            "<h4>" + esc(p.name) + "</h4>" +
            "<p>" + esc(p.summary) + "</p>" +
          "</div>" +
          '<div class="row-side">' +
            '<div class="row-badges">' + badges(p) + "</div>" +
            '<div class="row-links">' + links(p) + "</div>" +
          "</div>" +
        "</article>"
      );
    }).join("");
  }

  const filters = document.getElementById("filters");
  filters.addEventListener("click", function (event) {
    const button = event.target.closest("button[data-filter]");
    if (!button) return;
    filters.querySelectorAll(".chip").forEach(function (chip) {
      chip.classList.toggle("is-active", chip === button);
    });
    renderIndex(button.dataset.filter);
  });

  renderIndex("all");

  // ---- Theme toggle (remembered per browser; the site works without storage) ----
  const root = document.documentElement;
  function readTheme() {
    try { return localStorage.getItem("theme"); } catch (e) { return null; }
  }
  function saveTheme(theme) {
    try { localStorage.setItem("theme", theme); } catch (e) { /* storage unavailable */ }
  }

  const savedTheme = readTheme();
  if (savedTheme) root.setAttribute("data-theme", savedTheme);

  document.getElementById("theme-toggle").addEventListener("click", function () {
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const current = root.getAttribute("data-theme") || (systemDark ? "dark" : "light");
    const next = current === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    saveTheme(next);
  });
})();
