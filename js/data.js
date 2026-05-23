/*
 * Data for the Irish Corvid Identifier.
 * All eight corvid species recorded in Ireland, plus hybridisation
 * data for the Hooded x Carrion Crow complex and a set of common
 * misidentification scenarios reported in the Cork region.
 *
 * Each species carries filterable tags (plumage / beak / behaviour) that
 * the identifier UI uses, and the `art` config that drives the inline SVG
 * field-guide illustration in birds-svg.js.
 */

const FILTERS = {
  plumage: {
    label: "Plumage colour",
    options: [
      { id: "all-black",      label: "All black" },
      { id: "black-and-grey", label: "Black & grey" },
      { id: "black-and-white",label: "Black & white" },
      { id: "black-with-red", label: "Black with red bill/legs" },
      { id: "brown-colourful",label: "Brown / colourful" }
    ]
  },
  beak: {
    label: "Beak shape",
    options: [
      { id: "massive",        label: "Massive & deep (Raven-like)" },
      { id: "heavy-straight", label: "Heavy & straight" },
      { id: "pointed-conical",label: "Long, pointed, pale-based" },
      { id: "short-stout",    label: "Short & stout" },
      { id: "slender-curved", label: "Slender & down-curved" }
    ]
  },
  behaviour: {
    label: "Behaviour & habitat",
    options: [
      { id: "colonial",   label: "Colonial / large flocks" },
      { id: "pairs",      label: "Pairs & family groups" },
      { id: "coastal",    label: "Coastal cliffs & shore" },
      { id: "woodland",   label: "Woodland" },
      { id: "urban",      label: "Towns & gardens" },
      { id: "acrobatic",  label: "Acrobatic flight" },
      { id: "ground",     label: "Ground forager" },
      { id: "scavenger",  label: "Scavenger / omnivore" },
      { id: "caches",     label: "Caches / hides food" },
      { id: "shy",        label: "Shy & secretive" }
    ]
  }
};

const SPECIES = [
  {
    id: "hooded-crow",
    name: "Hooded Crow",
    sci: "Corvus cornix",
    irish: "Caróg liath",
    local: "Grey crow, Scald crow",
    length: "48–52 cm",
    wingspan: "84–100 cm",
    status: "Resident · abundant & widespread throughout Cork and all Ireland",
    plumage: ["black-and-grey"],
    beak: ["heavy-straight"],
    behaviour: ["pairs", "coastal", "urban", "ground", "scavenger"],
    art: { body: "#9aa1a8", head: "#1d1f24", wing: "#1d1f24", tail: "#1d1f24", bill: "#16181c", legs: "#16181c", eye: "#0a0a0a" },
    blurb: "Ireland's signature crow: a clean ash-grey body sharply offset by a black head, bib, wings and tail. Where you would see an all-black Carrion Crow in most of Britain, in Ireland you see the Hooded Crow.",
    keyFeatures: [
      "Pale ash-grey mantle, back, breast and belly",
      "Black 'hood' (head & throat bib), wings, tail and thighs",
      "Heavy black bill with a slightly arched culmen",
      "Clean, sharply-defined border between grey and black"
    ],
    voice: "A hard, flat 'kraa-kraa-kraa', usually delivered in threes — drier and harsher than a Rook.",
    behaviourNotes: "Seen singly or in pairs far more than in flocks. A relentless omnivore and scavenger: works the strand-line, drops shellfish and crabs onto rocks, raids nests and bins, and follows the tide.",
    confusion: ["carrion-crow", "rook"]
  },
  {
    id: "carrion-crow",
    name: "Carrion Crow",
    sci: "Corvus corone",
    irish: "Caróg dhubh",
    local: "Black crow",
    length: "45–50 cm",
    wingspan: "84–100 cm",
    status: "Scarce in Ireland · mainly the east coast, rare in Cork — most 'black crows' here are Rooks",
    plumage: ["all-black"],
    beak: ["heavy-straight"],
    behaviour: ["pairs", "urban", "ground", "scavenger"],
    art: { body: "#1d1f24", head: "#1d1f24", wing: "#15171b", tail: "#15171b", bill: "#0e0f12", legs: "#0e0f12", eye: "#000", gloss: true },
    blurb: "The all-black counterpart of the Hooded Crow — the two were treated as one species until 2002. Genuinely scarce in the south-west; a confident Cork record needs care, as Rooks are the default 'black crow' here.",
    keyFeatures: [
      "Entirely glossy black, including bill and legs",
      "Feathered bristles fully cover the base of the bill (no bare face)",
      "Flatter crown and a stouter, blunter bill than a Rook",
      "Tighter body feathering — lacks the Rook's baggy 'trousers'"
    ],
    voice: "A rolling, angrier 'kraa' very like the Hooded Crow's — the two are vocally near-identical.",
    behaviourNotes: "In pairs or family parties rather than the big colonies of Rooks. Wary, omnivorous and quick to exploit roadkill, tideline and refuse.",
    confusion: ["rook", "hooded-crow", "raven"]
  },
  {
    id: "rook",
    name: "Rook",
    sci: "Corvus frugilegus",
    irish: "Rúcach",
    local: "Préachán",
    length: "44–46 cm",
    wingspan: "81–99 cm",
    status: "Resident · extremely common, often the default 'black crow' across Cork farmland and towns",
    plumage: ["all-black"],
    beak: ["pointed-conical"],
    behaviour: ["colonial", "urban", "ground", "scavenger"],
    art: { body: "#20222a", head: "#20222a", wing: "#181a20", tail: "#181a20", bill: "#2b2d33", legs: "#101116", eye: "#000", bareFace: "#cdbfae", trousers: true, billType: "pointed-conical", gloss: true },
    blurb: "The most numerous large black corvid in Cork. Adults wear a striking bare, whitish-grey face at the base of a long, dagger-like bill — the single most useful feature for separating them from Carrion Crows.",
    keyFeatures: [
      "Bare greyish-white skin around the base of the bill (adults)",
      "Long, pointed, pale-based bill",
      "Peaked, steep forehead giving a 'high-browed' look",
      "Loose, shaggy thigh feathers — baggy 'trousers'",
      "Glossy plumage with a purple-blue sheen"
    ],
    voice: "A nasal, gravelly 'caaw', endlessly repeated from the rookery; more grating and varied than a Crow.",
    behaviourNotes: "Highly colonial — nests in noisy treetop rookeries and feeds in flocks, often mixed with Jackdaws. Probes pasture and stubble for grubs and grain.",
    confusion: ["carrion-crow", "jackdaw", "raven"]
  },
  {
    id: "jackdaw",
    name: "Western Jackdaw",
    sci: "Coloeus monedula",
    irish: "Cág",
    local: "Jackie",
    length: "34–39 cm",
    wingspan: "67–74 cm",
    status: "Resident · abundant in towns, farmland and cliffs throughout Cork",
    plumage: ["black-and-grey"],
    beak: ["short-stout"],
    behaviour: ["colonial", "coastal", "urban", "ground", "caches"],
    art: { body: "#222530", head: "#15171c", wing: "#181a20", tail: "#181a20", bill: "#0e0f12", legs: "#0e0f12", eye: "#dfe4e6", eyePupil: "#111", nape: "#8a9099" },
    blurb: "A small, dapper, fast-walking corvid with a silvery-grey shawl over the nape and a pale, almost ghostly eye. The compact size and jaunty gait give it away even in a crowded Rook flock.",
    keyFeatures: [
      "Noticeably small and compact for a crow",
      "Pale silvery-grey nape and neck-sides against a black face",
      "Striking pale, near-white iris",
      "Short, neat bill and a quick, bouncing walk"
    ],
    voice: "A bright, clipped 'chyak!' or 'kya', often given in chorus from rooftops and cliffs.",
    behaviourNotes: "Intensely social and monogamous; nests colonially in chimneys, ruins, holes in trees and sea cliffs. Frequently feeds and flies with Rooks.",
    confusion: ["chough", "rook"]
  },
  {
    id: "raven",
    name: "Common Raven",
    sci: "Corvus corax",
    irish: "Fiach dubh",
    local: "Raven",
    length: "60–67 cm",
    wingspan: "120–150 cm",
    status: "Resident · widespread on Cork's coasts, cliffs and uplands; increasing inland",
    plumage: ["all-black"],
    beak: ["massive"],
    behaviour: ["pairs", "coastal", "acrobatic", "scavenger", "caches"],
    art: { body: "#1b1d22", head: "#1b1d22", wing: "#131419", tail: "#131419", bill: "#0c0d10", legs: "#0c0d10", eye: "#000", billType: "massive", tailType: "wedge", hackles: true, gloss: true, scale: 1.12 },
    blurb: "The giant of the family — buzzard-sized, with a massive bill, shaggy throat hackles and a diagnostic wedge-shaped tail in flight. Listen for the deep, far-carrying 'cronk'.",
    keyFeatures: [
      "Much larger than any other corvid — wingspan up to 1.5 m",
      "Huge, deep bill and shaggy 'beard' of throat hackles",
      "Diamond / wedge-shaped tail in flight (Crows show a square tail)",
      "Long, fingered wings; rolls, tumbles and soars"
    ],
    voice: "A deep, resonant 'cronk-cronk' or 'prruk', utterly unlike the higher caw of Crows and Rooks.",
    behaviourNotes: "Pairs hold large territories year-round and display with synchronised rolls and tumbles. Powerful scavenger of carrion on hills and shore; caches surplus food.",
    confusion: ["carrion-crow", "rook"]
  },
  {
    id: "chough",
    name: "Red-billed Chough",
    sci: "Pyrrhocorax pyrrhocorax",
    irish: "Cág cosdearg",
    local: "Sea crow",
    length: "39–40 cm",
    wingspan: "73–90 cm",
    status: "Resident specialist · Cork's coastal cliffs (Old Head of Kinsale, Seven Heads, Mizen, Sheep's Head, Beara)",
    plumage: ["all-black", "black-with-red"],
    beak: ["slender-curved"],
    behaviour: ["coastal", "acrobatic", "ground", "caches"],
    art: { body: "#1a1c22", head: "#1a1c22", wing: "#121318", tail: "#121318", bill: "#d23a2a", legs: "#d23a2a", eye: "#000", billType: "slender-curved", gloss: true },
    blurb: "Glossy blue-black with a long, curved scarlet bill and matching red legs — Ireland's most charismatic corvid and a true Cork coastal speciality. Its buoyant, fingered-wing flight is unmistakable along the cliffs.",
    keyFeatures: [
      "Long, slender, down-curved bright-red bill",
      "Bright red legs",
      "Glossy blue-black plumage",
      "Broad wings with deeply 'fingered' primaries; very acrobatic"
    ],
    voice: "An explosive, ringing 'chee-ow' — onomatopoeic of the name 'chough' — quite different from a Jackdaw's 'chyak'.",
    behaviourNotes: "Tied to short coastal grassland and cliffs where it probes for soil invertebrates with that curved bill. Masterful flier in updraughts; gathers in small social flocks outside the breeding season.",
    confusion: ["jackdaw", "carrion-crow"]
  },
  {
    id: "magpie",
    name: "Eurasian Magpie",
    sci: "Pica pica",
    irish: "Snag breac",
    local: "Magpie",
    length: "44–46 cm (½ is tail)",
    wingspan: "52–60 cm",
    status: "Resident · common in Cork city, suburbs and farmland hedgerows",
    plumage: ["black-and-white"],
    beak: ["heavy-straight"],
    behaviour: ["pairs", "urban", "ground", "scavenger", "caches"],
    art: { body: "#16181c", head: "#16181c", wing: "#16181c", tail: "#1b2230", bill: "#0e0f12", legs: "#0e0f12", eye: "#000", belly: "#f3f3f0", wingPatch: "#f3f3f0", tailType: "long", iridescent: true },
    blurb: "Unmistakable pied corvid with a long, sweeping iridescent tail. Bold and conspicuous, it is one of the easiest Cork corvids to name on sight — though short-tailed juveniles trip people up.",
    keyFeatures: [
      "Black-and-white pied plumage",
      "Very long, graduated tail glossed green-purple",
      "White belly and large white shoulder ('scapular') patches",
      "Big white wing flashes in bouncing, direct flight"
    ],
    voice: "A loud, rattling, machine-gun 'chacka-chacka-chack'.",
    behaviourNotes: "Often in pairs or loose family groups; bold around gardens and roadsides. Omnivorous and an opportunist nest-robber; builds a large domed stick nest.",
    confusion: ["jay"]
  },
  {
    id: "jay",
    name: "Eurasian Jay",
    sci: "Garrulus glandarius",
    irish: "Scréachóg",
    local: "Wood jay",
    length: "32–35 cm",
    wingspan: "52–58 cm",
    status: "Resident · woodlands and wooded demesnes around Cork; the Irish race G. g. hibernicus",
    plumage: ["brown-colourful"],
    beak: ["short-stout"],
    behaviour: ["woodland", "shy", "caches", "ground"],
    art: { body: "#c39a72", head: "#cda884", wing: "#161616", tail: "#15171b", bill: "#222", legs: "#b58a63", eye: "#9fb6d6", eyePupil:"#111", bluePanel: true, rump: "#f3f3f0", moustache: true, crownStreaks: true },
    blurb: "A shy, pinkish-brown woodland corvid that flashes a brilliant chequered blue wing-panel and a bold white rump as it flies away. More often heard — a harsh tearing screech — than seen well.",
    keyFeatures: [
      "Warm pinkish-brown body",
      "Chequered black-white-and-blue panel on the wing",
      "Black moustache stripe and finely streaked crown",
      "Bold white rump against a black tail; white wing-patch in flight"
    ],
    voice: "A harsh, tearing 'skraaaak' screech; also a surprisingly accurate mimic, including of Buzzards.",
    behaviourNotes: "Secretive in cover, especially in oak woods. Famous acorn-cacher — buries thousands each autumn and so plants oak woodland. Usually seen as a single bird bounding between trees.",
    confusion: ["magpie"]
  }
];

/* ------------------------------------------------------------------ */
/*  Hooded Crow x Carrion Crow hybrid complex                          */
/* ------------------------------------------------------------------ */

const HYBRID = {
  intro: [
    "The Hooded Crow (Corvus cornix) and the Carrion Crow (Corvus corone) were long treated as a single species and were only formally split in 2002. They remain so closely related that they interbreed freely wherever their ranges meet, producing fertile hybrids.",
    "Across Europe the two replace one another along a narrow, stable contact zone (running, for example, through Scotland and along the Elbe in Germany). In Ireland the Hooded Crow holds almost the entire island; the Carrion Crow is a scarce colonist concentrated on the east coast, so hybrids are genuinely uncommon and are most likely in the east — not in Cork.",
    "Because Cork is deep inside pure Hooded Crow range, a 'hybrid-looking' bird here is far more often a stained, oiled, moulting or aberrant Hooded Crow than a true hybrid. Treat any apparent hybrid in the south-west with caution."
  ],
  rangeOverlap: [
    { zone: "East coast of Ireland (Dublin–Wexford)", note: "Small but established Carrion Crow population; the realistic place to look for genuine hybrids in Ireland." },
    { zone: "Midlands & south", note: "Overwhelmingly pure Hooded Crow; occasional wandering Carrion Crows possible but hybrids very rare." },
    { zone: "Cork & the south-west", note: "Effectively pure Hooded Crow country. Apparent 'hybrids' should first be checked for staining, oiling and moult." }
  ],
  /* spectrum from pure Hooded (left) to pure Carrion (right) */
  spectrum: [
    {
      id: "pure-hooded",
      label: "Pure Hooded Crow",
      mottle: 0,
      indicators: "Clean ash-grey body and breast; sharply defined black hood, wings and tail. The grey is even and unbroken."
    },
    {
      id: "light-hybrid",
      label: "Light hybrid",
      mottle: 0.3,
      indicators: "Grey is faintly dusky or 'dirty'; a slight dark wash creeping onto the breast and mantle, but the pattern is still mostly Hooded."
    },
    {
      id: "intermediate",
      label: "Intermediate hybrid",
      mottle: 0.6,
      indicators: "Heavy, irregular black mottling across the grey areas; the breast band looks broken and blotchy. Neither cleanly grey nor fully black."
    },
    {
      id: "dark-hybrid",
      label: "Dark hybrid",
      mottle: 0.85,
      indicators: "Mostly blackish with only patchy grey remnants on the flanks, belly or nape. Easy to dismiss as a Carrion Crow at a glance."
    },
    {
      id: "pure-carrion",
      label: "Pure Carrion Crow",
      mottle: 1,
      indicators: "Entirely glossy black with no grey at all. Confirm with feathered bill-base and structure to rule out a Rook."
    }
  ],
  tells: [
    { feature: "Symmetry", hybrid: "Dark markings are roughly symmetrical and follow feather tracts — they are part of the plumage.", confusable: "Staining or oil sits in random patches and is often asymmetric, glossy or matted." },
    { feature: "Edges", hybrid: "Grey/black border is blurred and mottled with intermediate feathering.", confusable: "A pure Hooded Crow shows a crisp, clean grey/black border even when dirty." },
    { feature: "Context", hybrid: "Most plausible in eastern Ireland near Carrion Crows.", confusable: "In Cork, default to a discoloured Hooded Crow until proven otherwise." },
    { feature: "Consistency", hybrid: "The pattern is stable from day to day and survives a wash in the rain.", confusable: "Mud and oil change or wash off; check the same bird again." }
  ]
};

/* ------------------------------------------------------------------ */
/*  Troubleshooting gallery — Cork-region misidentifications           */
/* ------------------------------------------------------------------ */

const SCENARIOS = [
  {
    id: "rook-vs-carrion",
    title: "\"An all-black crow\" — Rook or Carrion Crow?",
    frequency: "The single most common Cork mix-up",
    species: ["rook", "carrion-crow"],
    reported: "Birdwatchers report a lone black crow and assume Carrion Crow. In Cork the overwhelming default is a Rook.",
    resolve: [
      "Look at the face: an adult Rook shows bare whitish skin at the bill base; a Carrion Crow's face is fully feathered.",
      "Check the head shape: Rook has a peaked, high forehead; Carrion Crow's crown is flatter and rounder.",
      "Note the 'trousers': Rooks have baggy, shaggy thigh feathers; Carrion Crows look tidy and trim.",
      "Beware juveniles: a young Rook still has a feathered face and looks Crow-like — use shape, gloss and company."
    ],
    verdict: "In Cork, assume Rook unless the bare face is clearly absent and structure fits Carrion Crow."
  },
  {
    id: "raven-vs-crow",
    title: "Big black bird overhead — Raven or Crow/Rook?",
    frequency: "Common on coasts and uplands",
    species: ["raven", "rook"],
    reported: "Distant size is hard to judge, so soaring Ravens get logged as 'crows' and big Rooks get over-called as Ravens.",
    resolve: [
      "Tail shape is decisive: Raven shows a wedge / diamond tail; crows and Rooks show a squared or rounded tail.",
      "Listen: a deep, resonant 'cronk' is a Raven; a higher 'caw' or 'kraa' is a crow or Rook.",
      "Watch the flight: Ravens soar, roll and tumble; they look heavy-headed with a long, protruding bill.",
      "Judge proportions, not absolute size: Raven wings are long and fingered with a more cross-shaped silhouette."
    ],
    verdict: "Wedge tail + deep cronk + rolling flight = Raven. A fanned square tail and busy wingbeats = crow or Rook."
  },
  {
    id: "chough-vs-jackdaw",
    title: "Crow on a sea cliff — Chough or Jackdaw?",
    frequency: "Frequent at Cork headlands",
    species: ["chough", "jackdaw"],
    reported: "At places like the Old Head of Kinsale or Mizen Head, acrobatic black corvids over the cliffs are often called the wrong one.",
    resolve: [
      "Bill and legs: a Chough has a long curved RED bill and red legs; a Jackdaw's bill is short and black.",
      "Head pattern: a Jackdaw shows a pale grey nape and pale eye; a Chough is uniformly glossy black with a dark eye.",
      "Call: a ringing 'chee-ow' is a Chough; a clipped 'chyak' is a Jackdaw.",
      "Flight & wings: Chough wings are broad with splayed 'fingers' and very buoyant; Jackdaw wings are shorter and more clipped."
    ],
    verdict: "Red bill and legs clinch the Chough. Pale nape, pale eye and a 'chyak' clinch the Jackdaw."
  },
  {
    id: "hooded-hybrid-vs-stained",
    title: "A 'dirty' Hooded Crow — true hybrid or just stained?",
    frequency: "A recurring false alarm in the south-west",
    species: ["hooded-crow", "carrion-crow"],
    reported: "A Hooded Crow with dark smudging on the grey gets reported as a Hooded x Carrion hybrid — but Cork is pure Hooded country.",
    resolve: [
      "Check symmetry: hybrid markings are roughly symmetrical and follow the feathers; mud and oil are random and patchy.",
      "Check the border: pure Hooded Crows keep a crisp grey/black edge even when grubby.",
      "Re-check after rain: staining washes off or shifts; true hybrid plumage does not.",
      "Weigh the location: genuine hybrids are realistic in eastern Ireland, not in Cork — default to a stained Hooded Crow."
    ],
    verdict: "In Cork, treat a 'hybrid-looking' crow as a discoloured Hooded Crow until symmetry and clean edges prove otherwise."
  },
  {
    id: "magpie-juvenile",
    title: "Short-tailed pied bird — odd Magpie?",
    frequency: "Late spring / early summer",
    species: ["magpie", "jay"],
    reported: "Just-fledged Magpies have stubby tails and confuse people expecting the long-tailed adult.",
    resolve: [
      "The black-and-white pied pattern with white belly and shoulders is still pure Magpie, tail or no tail.",
      "A Jay is pinkish-brown — not pied — with a blue wing flash and white rump; the two should not really overlap once seen well.",
      "Watch the family: short-tailed birds attended by full-tailed adults are obvious juvenile Magpies.",
      "Give it weeks: the tail grows quickly through the summer."
    ],
    verdict: "Pied with white shoulders = Magpie (a juvenile if the tail is short). Pinkish-brown with a blue wing-flash = Jay."
  },
  {
    id: "jay-flyaway",
    title: "A flash of white in the woods — what flew off?",
    frequency: "Typical brief woodland view",
    species: ["jay", "magpie"],
    reported: "In Cork woodlands a bird bounds away showing a white patch and is logged as a Magpie or 'something pale'.",
    resolve: [
      "A bold square white rump above a black tail, plus a screeching call, is a Jay.",
      "A Magpie shows white in the wings and belly and trails a very long tail — quite different in shape.",
      "Listen: a harsh tearing screech is the classic Jay give-away in cover.",
      "Note habitat: a single bird deep in oak/mixed woodland strongly favours Jay."
    ],
    verdict: "White rump + screech + woodland = Jay. Long tail + white wing-flashes in the open = Magpie."
  }
];
