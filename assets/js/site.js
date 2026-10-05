/* Draws the site from the data files:
     PROFILE  (profile.js)  identity and contact — every page
     PROJECTS (projects.js) case studies and project index — home page
     CAREER   (career.js)   story, experience, education, skills — about + résumé

   Each section only renders if its container exists on the current page,
   so one script serves index.html, about.html and resume.html. */

(function () {
  // ---------- helpers ----------

  // Escape text before putting it into HTML.
  function esc(value) {
    return String(value || "").replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function byId(id) {
    return document.getElementById(id);
  }

  function setHtml(id, html) {
    const el = byId(id);
    if (el) el.innerHTML = html;
    return el;
  }

  function setText(id, text) {
    const el = byId(id);
    if (el) el.textContent = text;
  }

  function externalLink(href, label) {
    return '<a href="' + esc(href) + '" target="_blank" rel="noopener">' + esc(label) + "</a>";
  }

  // ---------- shared: profile, contact, footer ----------

  setText("role-location", PROFILE.role + " · " + PROFILE.location);
  setText("email-text", PROFILE.email);
  setText("year", new Date().getFullYear());

  document.querySelectorAll("[data-email]").forEach(function (el) {
    el.href = "mailto:" + PROFILE.email;
  });

  const companyLink = byId("company-link");
  if (companyLink) {
    companyLink.href = PROFILE.company.url;
    companyLink.textContent = PROFILE.company.name;
  }

  setHtml("socials",
    "<li>" + externalLink(PROFILE.links.linkedin, "LinkedIn") + "</li>" +
    "<li>" + externalLink(PROFILE.links.github, "GitHub") + "</li>" +
    "<li>" + externalLink(PROFILE.links.x, "X") + "</li>" +
    "<li>" + externalLink(PROFILE.company.url, "ementech.co.ke") + "</li>"
  );

  const portrait = byId("portrait");
  if (portrait) {
    if (PROFILE.headshot) {
      portrait.innerHTML = '<img src="' + esc(PROFILE.headshot) + '" alt="' + esc(PROFILE.name) + '" />';
    } else {
      portrait.innerHTML = '<img class="monogram" src="assets/img/monogram.svg" alt="MD monogram" />';
    }
  }

  // ---------- home: projects ----------

  if (typeof PROJECTS !== "undefined") {
    renderProjects();
  }

  function projectLinks(project) {
    let html = "";
    if (project.url) html += externalLink(project.url, "Visit ↗");
    if (project.repo) html += externalLink(project.repo, "Source ↗");
    if (!project.url && !project.repo) html += '<span class="muted">Private — demo on request</span>';
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

  // Main screenshot plus small thumbnails that swap it.
  function gallery(project) {
    if (!project.images || !project.images.length) return "";
    const first = project.images[0];
    let html =
      '<figure class="shot">' +
        '<img src="' + esc(first.src) + '" alt="' + esc(first.alt) + '" loading="lazy" width="1200" height="600" />' +
      "</figure>";
    if (project.images.length > 1) {
      html += '<div class="thumbs">';
      project.images.forEach(function (img, i) {
        html +=
          '<button type="button" class="thumb' + (i === 0 ? " is-active" : "") + '" ' +
          'data-src="' + esc(img.src) + '" data-alt="' + esc(img.alt) + '" aria-label="Show: ' + esc(img.alt) + '">' +
            '<img src="' + esc(img.src) + '" alt="" loading="lazy" />' +
          "</button>";
      });
      html += "</div>";
    }
    return html;
  }

  function renderProjects() {
    const liveCount = PROJECTS.filter(function (p) { return p.status === "live"; }).length;
    setText("count-live", liveCount);

    const featured = PROJECTS.filter(function (p) { return p.featured; });
    const cases = setHtml("cases", featured.map(function (p) {
      return (
        '<article class="case" id="' + esc(p.id) + '">' +
          gallery(p) +
          '<div class="case-body">' +
            '<div class="case-meta">' + badges(p) + "</div>" +
            "<h3>" + esc(p.name) + "</h3>" +
            (p.metric ? '<p class="metric">' + esc(p.metric) + "</p>" : "") +
            '<p class="case-summary">' + esc(p.summary) + "</p>" +
            '<dl class="case-story">' +
              "<div><dt>Problem</dt><dd>" + esc(p.story.problem) + "</dd></div>" +
              "<div><dt>Approach</dt><dd>" + esc(p.story.approach) + "</dd></div>" +
              "<div><dt>Result</dt><dd>" + esc(p.story.result) + "</dd></div>" +
            "</dl>" +
            '<ul class="stack">' + stackList(p) + "</ul>" +
            '<div class="case-links">' + projectLinks(p) + "</div>" +
          "</div>" +
        "</article>"
      );
    }).join(""));

    // Thumbnail clicks swap the main screenshot of that case.
    if (cases) {
      cases.addEventListener("click", function (event) {
        const thumb = event.target.closest(".thumb");
        if (!thumb) return;
        const card = thumb.closest(".case");
        const main = card.querySelector(".shot img");
        main.src = thumb.dataset.src;
        main.alt = thumb.dataset.alt;
        card.querySelectorAll(".thumb").forEach(function (t) {
          t.classList.toggle("is-active", t === thumb);
        });
      });
    }

    // Index of everything that is not a case study, filterable by division.
    function renderIndex(division) {
      const items = PROJECTS.filter(function (p) {
        if (p.featured) return false;
        return division === "all" || p.division === division;
      });
      setHtml("index", items.map(function (p) {
        const thumb = p.images && p.images.length
          ? '<img class="row-thumb" src="' + esc(p.images[0].src) + '" alt="" loading="lazy" />'
          : '<div class="row-thumb row-thumb-empty" aria-hidden="true">' + esc(p.name.charAt(0)) + "</div>";
        return (
          '<article class="row">' +
            thumb +
            '<div class="row-main">' +
              "<h4>" + esc(p.name) + "</h4>" +
              "<p>" + esc(p.summary) + "</p>" +
            "</div>" +
            '<div class="row-side">' +
              '<div class="row-badges">' + badges(p) + "</div>" +
              '<div class="row-links">' + projectLinks(p) + "</div>" +
            "</div>" +
          "</article>"
        );
      }).join(""));
    }

    const filters = byId("filters");
    if (filters) {
      filters.addEventListener("click", function (event) {
        const button = event.target.closest("button[data-filter]");
        if (!button) return;
        filters.querySelectorAll(".chip").forEach(function (chip) {
          chip.classList.toggle("is-active", chip === button);
        });
        renderIndex(button.dataset.filter);
      });
      renderIndex("all");
    }
  }

  // ---------- about + résumé: career ----------

  if (typeof CAREER !== "undefined") {
    renderCareer();
  }

  function renderCareer() {
    setText("legal-name", CAREER.company.legalName);
    setText("founded", CAREER.company.founded);

    setHtml("story", CAREER.story.map(function (s, i) {
      return (
        '<li><span class="step-no">0' + (i + 1) + "</span>" +
        "<h3>" + esc(s.title) + "</h3><p>" + esc(s.text) + "</p></li>"
      );
    }).join(""));

    setHtml("timeline", CAREER.timeline.map(function (t) {
      return (
        "<li><span class=\"tl-year\">" + esc(t.year) + "</span>" +
        "<div><h3>" + esc(t.title) + "</h3><p>" + esc(t.text) + "</p></div></li>"
      );
    }).join(""));

    setHtml("experience", CAREER.experience.map(function (e) {
      return (
        '<article class="cv-item">' +
          '<header><h3>' + esc(e.role) + " · " + esc(e.org) + '</h3><span class="cv-period">' + esc(e.period) + "</span></header>" +
          "<ul>" + e.points.map(function (pt) { return "<li>" + esc(pt) + "</li>"; }).join("") + "</ul>" +
        "</article>"
      );
    }).join(""));

    setHtml("education", CAREER.education.map(function (e) {
      return (
        '<article class="cv-item">' +
          "<header><h3>" + esc(e.title) + '</h3><span class="cv-period">' + esc(e.period) + "</span></header>" +
          '<p class="cv-org">' + esc(e.org) + "</p>" +
          (e.note ? '<p class="cv-note">' + esc(e.note) + "</p>" : "") +
        "</article>"
      );
    }).join(""));

    setHtml("skills", CAREER.skills.map(function (g) {
      return (
        '<div class="skill-group"><h3>' + esc(g.group) + "</h3>" +
        '<ul class="stack">' + g.items.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ul></div>"
      );
    }).join(""));

    setHtml("values", CAREER.values.map(function (v) {
      return '<li><h3>' + esc(v.title) + "</h3><p>" + esc(v.text) + "</p></li>";
    }).join(""));

    setText("languages", CAREER.languages.join(" · "));

    // Résumé: selected projects come from the same catalogue as the home page.
    if (typeof PROJECTS !== "undefined") {
      setHtml("cv-projects", PROJECTS.filter(function (p) { return p.featured; }).map(function (p) {
        const where = p.url ? p.url.replace("https://", "") : (p.repo ? p.repo.replace("https://", "") : "");
        return (
          '<article class="cv-item">' +
            "<header><h3>" + esc(p.name) + '</h3><span class="cv-period">' + esc(STATUS_LABEL[p.status]) + "</span></header>" +
            "<p>" + esc(p.summary) + (p.metric ? " " + esc(p.metric) + "." : "") + "</p>" +
            '<p class="cv-note">' + esc(p.stack.join(" · ")) + (where ? " — " + esc(where) : "") + "</p>" +
          "</article>"
        );
      }).join(""));
    }
  }

  // ---------- contact form: composes an email, sends nothing itself ----------

  const form = byId("contact-form");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const name = form.elements.name.value.trim();
      const topic = form.elements.topic.value;
      const message = form.elements.message.value.trim();
      const subject = topic + (name ? " — " + name : "");
      window.location.href =
        "mailto:" + PROFILE.email +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(message);
    });
  }

  // ---------- print button on the résumé ----------

  const printButton = byId("print-cv");
  if (printButton) {
    printButton.addEventListener("click", function () { window.print(); });
  }

  // ---------- theme toggle (remembered per browser; works without storage) ----------

  const root = document.documentElement;

  function readTheme() {
    try { return localStorage.getItem("theme"); } catch (e) { return null; }
  }

  function saveTheme(theme) {
    try { localStorage.setItem("theme", theme); } catch (e) { /* storage unavailable */ }
  }

  const savedTheme = readTheme();
  if (savedTheme) root.setAttribute("data-theme", savedTheme);

  const toggle = byId("theme-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const current = root.getAttribute("data-theme") || (systemDark ? "dark" : "light");
      const next = current === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      saveTheme(next);
    });
  }
})();
