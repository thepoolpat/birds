/*
 * birds-svg.js
 * A small parametric SVG generator that draws a stylised perched corvid
 * (facing left) from an `art` config. The aim is clear, comparable
 * field-guide colour blocks rather than photographic realism — body,
 * head, wing, tail, bill and legs are independent regions so e.g. a grey
 * body with a black hood (Hooded Crow) reads instantly.
 */

function buildBirdSVG(cfg, opts) {
  cfg = cfg || {};
  opts = opts || {};
  const c = Object.assign(
    {
      body: "#1d1f24",
      head: null,
      wing: null,
      tail: null,
      bill: "#16181c",
      legs: "#16181c",
      eye: "#000",
      eyePupil: null,
      nape: null,
      belly: null,
      wingPatch: null,
      rump: null,
      bluePanel: false,
      moustache: false,
      crownStreaks: false,
      hackles: false,
      trousers: false,
      bareFace: null,
      gloss: false,
      iridescent: false,
      billType: "heavy-straight",
      tailType: "normal",
      scale: 1
    },
    cfg
  );
  c.head = c.head || c.body;
  c.wing = c.wing || c.body;
  c.tail = c.tail || c.wing;

  const mottle = typeof opts.mottle === "number" ? opts.mottle : 0;
  const parts = [];

  // soft ground shadow
  parts.push(
    `<ellipse cx="150" cy="188" rx="86" ry="9" fill="#000" opacity="0.10"/>`
  );

  // perch branch
  parts.push(
    `<rect x="26" y="176" width="214" height="9" rx="4.5" fill="#6b4f3a"/>` +
      `<rect x="26" y="176" width="214" height="3" rx="1.5" fill="#000" opacity="0.18"/>`
  );

  // tail (drawn first, behind body)
  parts.push(`<path d="${tailPath(c.tailType)}" fill="${c.tail}"/>`);
  if (c.iridescent) {
    parts.push(
      `<path d="${tailPath(c.tailType)}" fill="url(#irid)" opacity="0.6"/>`
    );
  }

  // legs
  parts.push(legs(c.legs));

  // body
  parts.push(`<ellipse cx="150" cy="100" rx="58" ry="42" fill="${c.body}"/>`);
  if (c.gloss) {
    parts.push(
      `<ellipse cx="135" cy="84" rx="40" ry="22" fill="#fff" opacity="0.07"/>`
    );
  }

  // belly / underparts patch (magpie)
  if (c.belly) {
    parts.push(
      `<path d="M104 102 Q112 146 156 140 Q156 108 124 100 Q108 98 104 102 Z" fill="${c.belly}"/>`
    );
  }

  // hybrid mottling over the (grey) body
  if (mottle > 0) parts.push(mottling(mottle));

  // wing (folded, over the body)
  parts.push(
    `<path d="M118 80 Q176 70 200 100 Q192 132 150 138 Q120 124 118 80 Z" fill="${c.wing}"/>`
  );
  if (c.gloss) {
    parts.push(
      `<path d="M118 80 Q176 70 200 100 Q192 132 150 138 Q120 124 118 80 Z" fill="url(#irid)" opacity="0.5"/>`
    );
  }

  // white scapular / wing patch (magpie)
  if (c.wingPatch) {
    parts.push(`<ellipse cx="150" cy="98" rx="26" ry="15" fill="${c.wingPatch}"/>`);
  }

  // blue chequered wing panel (jay)
  if (c.bluePanel) {
    parts.push(
      `<g>` +
        `<rect x="158" y="92" width="30" height="22" rx="3" fill="#3f7fd6"/>` +
        `<rect x="158" y="92" width="30" height="22" rx="3" fill="none" stroke="#11151c" stroke-width="1.4"/>` +
        `<line x1="165" y1="92" x2="165" y2="114" stroke="#11151c" stroke-width="2"/>` +
        `<line x1="172" y1="92" x2="172" y2="114" stroke="#fff" stroke-width="1.4" opacity="0.85"/>` +
        `<line x1="179" y1="92" x2="179" y2="114" stroke="#11151c" stroke-width="2"/>` +
        `<rect x="148" y="96" width="12" height="20" rx="2" fill="#f3f3f0"/>` +
        `</g>`
    );
  }

  // white rump (jay) at base of tail
  if (c.rump) {
    parts.push(`<ellipse cx="196" cy="104" rx="13" ry="12" fill="${c.rump}"/>`);
  }

  // shaggy thigh 'trousers' (rook)
  if (c.trousers) {
    parts.push(
      `<path d="M120 128 q-6 12 2 20 q6 -6 8 -2 q2 8 8 4 q2 8 9 3 q6 6 10 0 q3 6 8 1 l-4 -22 z" fill="${c.body}"/>`
    );
  }

  // throat hackles (raven)
  if (c.hackles) {
    parts.push(
      `<path d="M70 84 l-3 12 l7 -5 l-2 12 l8 -7 l0 11 l8 -8 l3 9 l5 -8 q-18 4 -34 -8 z" fill="${c.body}"/>`
    );
  }

  // neck join (keeps head and body visually connected)
  parts.push(
    `<path d="M96 64 Q150 70 150 100 Q120 96 84 84 Z" fill="${c.body}"/>`
  );

  // grey nape / shawl behind the head (jackdaw)
  if (c.nape) {
    parts.push(`<ellipse cx="104" cy="68" rx="24" ry="24" fill="${c.nape}"/>`);
  }

  // head
  parts.push(`<circle cx="85" cy="60" r="30" fill="${c.head}"/>`);
  if (c.gloss) {
    parts.push(`<ellipse cx="78" cy="50" rx="16" ry="10" fill="#fff" opacity="0.08"/>`);
  }

  // bare face patch at base of bill (rook)
  if (c.bareFace) {
    parts.push(
      `<path d="M58 56 Q74 50 78 58 Q74 70 60 68 Q54 62 58 56 Z" fill="${c.bareFace}"/>`
    );
  }

  // crown streaks (jay)
  if (c.crownStreaks) {
    for (let i = 0; i < 6; i++) {
      const x = 70 + i * 5;
      parts.push(
        `<line x1="${x}" y1="38" x2="${x + 1}" y2="48" stroke="#3a2a1c" stroke-width="1.6" opacity="0.8"/>`
      );
    }
  }

  // moustache stripe (jay)
  if (c.moustache) {
    parts.push(
      `<path d="M58 64 Q70 74 80 82" stroke="#15171b" stroke-width="6" fill="none" stroke-linecap="round"/>`
    );
  }

  // bill
  parts.push(billShape(c.billType, c.bill));

  // eye
  parts.push(`<circle cx="74" cy="55" r="5.4" fill="${c.eye}"/>`);
  if (c.eyePupil) {
    parts.push(`<circle cx="74" cy="55" r="2.4" fill="${c.eyePupil}"/>`);
  } else {
    parts.push(`<circle cx="72.4" cy="53.2" r="1.5" fill="#fff" opacity="0.85"/>`);
  }

  const defs =
    `<defs>` +
    `<linearGradient id="irid" x1="0" y1="0" x2="1" y2="1">` +
    `<stop offset="0%" stop-color="#3a2f6e"/>` +
    `<stop offset="50%" stop-color="#2f6e63"/>` +
    `<stop offset="100%" stop-color="#6e2f5a"/>` +
    `</linearGradient>` +
    `</defs>`;

  const g =
    `<g transform="translate(150 110) scale(${c.scale}) translate(-150 -110)">` +
    parts.join("") +
    `</g>`;

  return (
    `<svg viewBox="0 0 300 200" role="img" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">` +
    defs +
    g +
    `</svg>`
  );
}

function tailPath(type) {
  switch (type) {
    case "wedge": // raven
      return "M196 90 L256 116 L240 152 L196 118 Z";
    case "long": // magpie
      return "M198 96 L262 154 L256 176 L246 170 L196 120 Z";
    default: // square / rounded
      return "M196 90 L248 110 L248 134 L196 118 Z";
  }
}

function billShape(type, fill) {
  switch (type) {
    case "massive": // raven
      return (
        `<path d="M58 47 L58 75 L6 62 Q30 50 58 47 Z" fill="${fill}"/>` +
        `<line x1="14" y1="61" x2="56" y2="61" stroke="#000" stroke-width="1.2" opacity="0.4"/>`
      );
    case "pointed-conical": // rook
      return (
        `<path d="M58 53 L57 69 L12 62 Q34 56 58 53 Z" fill="${fill}"/>` +
        `<line x1="16" y1="61.5" x2="56" y2="61.5" stroke="#000" stroke-width="1" opacity="0.4"/>`
      );
    case "short-stout": // jackdaw / jay
      return (
        `<path d="M58 54 L57 68 L28 61 Q42 56 58 54 Z" fill="${fill}"/>` +
        `<line x1="31" y1="61" x2="56" y2="61" stroke="#000" stroke-width="1" opacity="0.35"/>`
      );
    case "slender-curved": // chough
      return (
        `<path d="M58 55 Q34 55 14 73 Q22 64 34 63 Q48 62 58 64 Z" fill="${fill}"/>`
      );
    default: // heavy-straight
      return (
        `<path d="M58 52 L57 70 L18 61 Q36 54 58 52 Z" fill="${fill}"/>` +
        `<line x1="22" y1="61" x2="56" y2="61" stroke="#000" stroke-width="1.1" opacity="0.4"/>`
      );
  }
}

function legs(fill) {
  return (
    `<g stroke="${fill}" stroke-width="4" stroke-linecap="round" fill="none">` +
    `<path d="M138 138 L134 176"/>` +
    `<path d="M162 138 L166 176"/>` +
    `</g>` +
    `<g stroke="${fill}" stroke-width="2.6" stroke-linecap="round">` +
    `<line x1="134" y1="176" x2="126" y2="178"/>` +
    `<line x1="134" y1="176" x2="142" y2="178"/>` +
    `<line x1="166" y1="176" x2="158" y2="178"/>` +
    `<line x1="166" y1="176" x2="174" y2="178"/>` +
    `</g>`
  );
}

// pseudo-random but deterministic dark blotches over the grey body for hybrids
function mottling(level) {
  const blobs = [
    [128, 92, 12, 7],
    [150, 84, 14, 8],
    [138, 110, 11, 7],
    [165, 100, 13, 9],
    [120, 104, 9, 6],
    [156, 118, 12, 7],
    [134, 78, 10, 6],
    [172, 110, 9, 6]
  ];
  const n = Math.max(1, Math.round(blobs.length * level));
  let out = `<g fill="#1b1d22" opacity="${(0.45 + 0.5 * level).toFixed(2)}">`;
  for (let i = 0; i < n; i++) {
    const b = blobs[i];
    out += `<ellipse cx="${b[0]}" cy="${b[1]}" rx="${b[2]}" ry="${b[3]}"/>`;
  }
  // a broken breast band wash at higher levels
  if (level >= 0.55) {
    out += `<path d="M104 104 Q130 124 168 116 Q150 136 120 132 Q108 122 104 104 Z" opacity="${(0.5 * level).toFixed(2)}"/>`;
  }
  out += `</g>`;
  return out;
}

window.buildBirdSVG = buildBirdSVG;
