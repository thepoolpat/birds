/*
 * app.js — Irish Corvid Identifier
 * Wires the data to the UI: live filtering, species cards, a detail modal,
 * the Hooded x Carrion hybrid spectrum, and the Cork misID gallery.
 */
(function () {
  "use strict";

  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
  const speciesById = Object.fromEntries(SPECIES.map((s) => [s.id, s]));

  // active filters: { plumage:Set, beak:Set, behaviour:Set }
  const active = { plumage: new Set(), beak: new Set(), behaviour: new Set() };

  /* ---------------------------------------------------------------- */
  /*  Filter controls                                                  */
  /* ---------------------------------------------------------------- */
  function renderFilters() {
    const wrap = $("#filter-groups");
    wrap.innerHTML = "";
    Object.entries(FILTERS).forEach(([key, group]) => {
      const fieldset = document.createElement("fieldset");
      fieldset.className = "filter-group";
      const legend = document.createElement("legend");
      legend.textContent = group.label;
      fieldset.appendChild(legend);

      group.options.forEach((opt) => {
        const id = `f-${key}-${opt.id}`;
        const label = document.createElement("label");
        label.className = "chip";
        label.htmlFor = id;

        const input = document.createElement("input");
        input.type = "checkbox";
        input.id = id;
        input.value = opt.id;
        input.addEventListener("change", () => {
          input.checked ? active[key].add(opt.id) : active[key].delete(opt.id);
          render();
        });

        const span = document.createElement("span");
        span.textContent = opt.label;

        label.appendChild(input);
        label.appendChild(span);
        fieldset.appendChild(label);
      });
      wrap.appendChild(fieldset);
    });
  }

  function matches(sp) {
    return Object.keys(active).every((key) => {
      const sel = active[key];
      if (sel.size === 0) return true;
      // a species matches a category if it has ANY of the selected tags
      return [...sel].some((tag) => sp[key].includes(tag));
    });
  }

  function activeCount() {
    return active.plumage.size + active.beak.size + active.behaviour.size;
  }

  /* ---------------------------------------------------------------- */
  /*  Results grid                                                     */
  /* ---------------------------------------------------------------- */
  function render() {
    const grid = $("#results");
    const results = SPECIES.filter(matches);

    // count + clear button
    $("#result-count").textContent =
      results.length + (results.length === 1 ? " species" : " species");
    $("#clear-filters").hidden = activeCount() === 0;

    grid.innerHTML = "";
    if (results.length === 0) {
      const empty = document.createElement("p");
      empty.className = "empty";
      empty.textContent =
        "No Irish corvid matches every filter. Try removing a constraint — real birds rarely tick every box at once.";
      grid.appendChild(empty);
      return;
    }

    results.forEach((sp) => grid.appendChild(speciesCard(sp)));
  }

  function speciesCard(sp) {
    const card = document.createElement("button");
    card.className = "card";
    card.type = "button";
    card.setAttribute("aria-label", `Open details for ${sp.name}`);
    card.addEventListener("click", () => openDetail(sp.id));

    const art = document.createElement("div");
    art.className = "card-art";
    art.innerHTML = buildBirdSVG(sp.art);

    const body = document.createElement("div");
    body.className = "card-body";
    body.innerHTML =
      `<h3>${sp.name}</h3>` +
      `<p class="sci">${sp.sci}</p>` +
      `<p class="irish">Irish: <em>${sp.irish}</em></p>` +
      `<p class="quick">${shortStatus(sp.status)}</p>` +
      `<span class="more">Identification details →</span>`;

    card.appendChild(art);
    card.appendChild(body);
    return card;
  }

  function shortStatus(status) {
    return status.split("·")[0].trim();
  }

  function clearFilters() {
    Object.values(active).forEach((s) => s.clear());
    $$("#filter-groups input[type=checkbox]").forEach((i) => (i.checked = false));
    render();
  }

  /* ---------------------------------------------------------------- */
  /*  Detail modal                                                     */
  /* ---------------------------------------------------------------- */
  function openDetail(id) {
    const sp = speciesById[id];
    const modal = $("#detail");
    const tagNames = (key) =>
      sp[key]
        .map((t) => {
          const o = FILTERS[key].options.find((x) => x.id === t);
          return o ? o.label : t;
        })
        .join(", ");

    const confusion = (sp.confusion || [])
      .map(
        (cid) =>
          `<button class="link-chip" data-goto="${cid}">${speciesById[cid].name}</button>`
      )
      .join("");

    $("#detail-content").innerHTML =
      `<div class="detail-hero">` +
      `<div class="detail-art">${buildBirdSVG(sp.art)}</div>` +
      `<div class="detail-head">` +
      `<h2>${sp.name}</h2>` +
      `<p class="sci">${sp.sci}</p>` +
      `<p class="irish">Irish: <strong>${sp.irish}</strong> · Locally: ${sp.local}</p>` +
      `<p class="status-line">${sp.status}</p>` +
      `<dl class="biometrics">` +
      `<div><dt>Length</dt><dd>${sp.length}</dd></div>` +
      `<div><dt>Wingspan</dt><dd>${sp.wingspan}</dd></div>` +
      `</dl>` +
      `</div>` +
      `</div>` +
      `<p class="lead">${sp.blurb}</p>` +
      `<div class="detail-cols">` +
      `<section><h4>Key features</h4><ul class="ticks">${sp.keyFeatures
        .map((f) => `<li>${f}</li>`)
        .join("")}</ul></section>` +
      `<section><h4>Voice</h4><p>${sp.voice}</p>` +
      `<h4>Behaviour &amp; habitat</h4><p>${sp.behaviourNotes}</p></section>` +
      `</div>` +
      `<div class="tag-row">` +
      `<span class="tag-label">Plumage</span> ${tagNames("plumage")}<br>` +
      `<span class="tag-label">Beak</span> ${tagNames("beak")}<br>` +
      `<span class="tag-label">Behaviour</span> ${tagNames("behaviour")}` +
      `</div>` +
      (confusion
        ? `<div class="confusion"><strong>Often confused with:</strong> ${confusion}</div>`
        : "");

    // wire "confused with" jumps
    $$("#detail-content [data-goto]").forEach((b) =>
      b.addEventListener("click", () => openDetail(b.dataset.goto))
    );

    modal.hidden = false;
    document.body.classList.add("modal-open");
    $("#detail-close").focus();
  }

  function closeDetail() {
    $("#detail").hidden = true;
    document.body.classList.remove("modal-open");
  }

  /* ---------------------------------------------------------------- */
  /*  Hooded x Carrion hybrid section                                  */
  /* ---------------------------------------------------------------- */
  function renderHybrid() {
    $("#hybrid-intro").innerHTML = HYBRID.intro
      .map((p) => `<p>${p}</p>`)
      .join("");

    // hybrid spectrum
    const spec = $("#hybrid-spectrum");
    spec.innerHTML = "";
    HYBRID.spectrum.forEach((step) => {
      const cell = document.createElement("figure");
      cell.className = "spectrum-step";
      cell.innerHTML =
        `<div class="spectrum-art">${buildBirdSVG(SPECIES[0].art, {
          mottle: step.mottle
        })}</div>` +
        `<figcaption><strong>${step.label}</strong>` +
        `<span>${step.indicators}</span></figcaption>`;
      spec.appendChild(cell);
    });

    // range overlap
    $("#hybrid-range").innerHTML = HYBRID.rangeOverlap
      .map(
        (r) =>
          `<li><span class="zone">${r.zone}</span><span class="zone-note">${r.note}</span></li>`
      )
      .join("");

    // tells: hybrid vs confusable
    $("#hybrid-tells tbody").innerHTML = HYBRID.tells
      .map(
        (t) =>
          `<tr><th scope="row">${t.feature}</th><td>${t.hybrid}</td><td>${t.confusable}</td></tr>`
      )
      .join("");
  }

  /* ---------------------------------------------------------------- */
  /*  Troubleshooting gallery                                          */
  /* ---------------------------------------------------------------- */
  function renderScenarios() {
    const wrap = $("#scenario-grid");
    wrap.innerHTML = "";
    SCENARIOS.forEach((sc) => {
      const pair = sc.species
        .map((sid) => {
          const sp = speciesById[sid];
          return (
            `<figure class="vs-bird">` +
            `<div class="vs-art">${buildBirdSVG(sp.art)}</div>` +
            `<figcaption>${sp.name}</figcaption>` +
            `</figure>`
          );
        })
        .join(`<div class="vs-divider">vs</div>`);

      const card = document.createElement("article");
      card.className = "scenario";
      card.innerHTML =
        `<header><span class="freq">${sc.frequency}</span><h3>${sc.title}</h3></header>` +
        `<div class="vs">${pair}</div>` +
        `<p class="reported"><strong>What gets reported:</strong> ${sc.reported}</p>` +
        `<h4>How to resolve it</h4>` +
        `<ul class="ticks">${sc.resolve.map((r) => `<li>${r}</li>`).join("")}</ul>` +
        `<p class="verdict">${sc.verdict}</p>`;
      wrap.appendChild(card);
    });
  }

  /* ---------------------------------------------------------------- */
  /*  Init                                                             */
  /* ---------------------------------------------------------------- */
  function init() {
    renderFilters();
    render();
    renderHybrid();
    renderScenarios();

    $("#clear-filters").addEventListener("click", clearFilters);
    $("#detail-close").addEventListener("click", closeDetail);
    $("#detail").addEventListener("click", (e) => {
      if (e.target.id === "detail" || e.target.classList.contains("modal-backdrop"))
        closeDetail();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !$("#detail").hidden) closeDetail();
    });

    // smooth in-page nav
    $$(".nav a").forEach((a) =>
      a.addEventListener("click", (e) => {
        const target = $(a.getAttribute("href"));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      })
    );
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
