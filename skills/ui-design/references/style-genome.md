# UI Style Genome

Use this skill to turn product requirements into a deliberate, implementation-ready visual system instead of defaulting to generic AI-generated SaaS styling.

The core rule is:

> Never choose a single style label and improvise the rest. Build a style genome across independent design dimensions, score compatibility, introduce controlled contrast, then implement consistently.

## Primary outcomes

Produce one or more `StyleGenome` directions containing:

1. product/brand interpretation;
2. primary and secondary visual archetypes;
3. layout grammar and composition rules;
4. typography system;
5. color strategy;
6. material/surface, shape, border, and elevation rules;
7. imagery and iconography language;
8. navigation and component language;
9. motion/interaction language;
10. signature element(s);
11. explicit anti-patterns / things to avoid;
12. implementation tokens and component guidance;
13. rationale, compatibility score, distinctiveness score, accessibility risks, and implementation complexity.

Companion references in this skill:

- `motion-patterns.md` — motion/micro-interaction vocabulary (60fps.design taxonomy).
- `logo-symbols.md` — logo and symbol vocabulary (Logobook taxonomy).
- `component-patterns.md` — canonical component names, aliases, and indexed design systems (The Component Gallery).
- `shadcn-components.md` — shadcn/ui component inventory.
- `implementation-shadcn.md` — the three-phase build workflow (components → HTML preview → layout).
- `composition-grammar.md` — the five orthogonal axes (layout grammar × motif × expression budget × density × seed), the 10 layout grammars, grammar × motif compatibility, and seed variation.
- `expressive-ui.md` — motif grammar and expression levels L0–L4 for stylized / game-like UI; legibility core and accessibility rules.
- `motif-library.md` — motif contracts (world material, mark, angle set, palette lock, selection metaphor, transition verb).
- `expressive-recipes.md` — CSS/SVG snippets for motifs and known pitfalls.
- `motion-dynamics.md` — the seven motion axes, energy presets, spring → `linear()`, and interaction patterns.

## Operating modes

Choose one of these modes from the user's request. If unspecified, use **Hybrid**.

### 1. User-directed

Use when the user has explicit preferences such as “editorial, warm, not too rounded, serif headlines.”

- Preserve explicit user preferences as hard constraints unless they conflict with accessibility or requested function.
- Fill missing dimensions with compatible choices.
- Offer alternatives only for dimensions the user has not locked.

### 2. Agent-directed

Use when the user gives product goals but no visual direction.

- Infer candidate art directions from product type, audience, brand traits, content density, trust requirements, platform, and implementation constraints.
- Generate multiple distinct directions before choosing one.
- Do not ask aesthetic questions if reasonable options can be generated and compared first.

### 3. Hybrid

Default mode.

- Treat explicit user preferences as anchors.
- Let the agent choose the remaining dimensions.
- Return several candidate directions with meaningful differences, not color-swapped variants.

## Normalize the project brief

Before visual selection, derive this internal brief:

```json
{
  "product_type": "saas | dashboard | ecommerce | marketplace | portfolio | editorial | documentation | consumer-app | finance | devtool | game | landing-page | other",
  "page_scope": "site | page | flow | component",
  "audience": ["..."],
  "brand_traits": ["trustworthy", "playful", "technical", "premium"],
  "content_density": "low | medium | high | very-high",
  "interaction_complexity": "low | medium | high",
  "trust_requirement": "low | medium | high",
  "desired_distinctiveness": 70,
  "platform": "responsive-web",
  "constraints": ["WCAG-AA", "fast-implementation"],
  "preferred": ["editorial", "serif", "warm-neutral"],
  "avoid": ["purple-gradient", "excessive-cards"],
  "existing_brand": {
    "colors": [],
    "fonts": [],
    "assets": []
  }
}
```

Do not force users to provide every field. Infer missing values from the task.

## Decide how many directions to generate

Default to **6 candidates** when choosing a new art direction:

- 2 × Safe — high product fit and high compatibility;
- 2 × Distinctive — high fit plus one controlled contradiction/signature;
- 2 × Experimental — still usable, but with stronger composition or stylistic contrast.

For small component work, 3 candidates are enough.

Never make candidates differ only by palette, corner radius, or hero copy.

## Candidate generation procedure

For each candidate:

### Step 1 — Choose a primary archetype

Pick one archetype that explains roughly 60–80% of the direction.

Examples: `scientific-editorial`, `quiet-luxury`, `neo-brutalist`, `japanese-minimal`, `retro-terminal`, `consumer-soft-digital`.

### Step 2 — Choose an optional secondary archetype

The secondary archetype should contribute a specific property, not create vague style soup.

Good:

- `editorial + technical` → publication hierarchy with technical metadata.
- `quiet-luxury + digital-retro` → refined composition with restrained mono instrumentation.
- `swiss + handcrafted` → disciplined grid plus hand-drawn illustrations.

Bad:

- `brutalist + glassmorphism + clay + cyberpunk + scrapbook`.

Use at most 2 major archetypes and 1 minor accent influence.

### Step 3 — Select the design dimensions

Select all dimensions listed below. For the motion dimension use `motion-patterns.md`; for brand mark and iconography use `logo-symbols.md`; for component language use `component-patterns.md`.

At minimum choose:

- layout grammar (pick from the 10 grammars in `composition-grammar.md` by content shape: sequence / catalog / narrative / network);
- composition;
- density;
- heading/body/metadata typography;
- type scale and alignment;
- color strategy + temperature + contrast;
- surface/material;
- shape/radius;
- borders;
- elevation;
- imagery;
- iconography;
- navigation;
- component language;
- texture;
- motion;
- interaction model;
- signature element;
- expression (motif + per-region expression budget, see below).

Do not leave visual decisions to “modern defaults.”

#### The expression dimension

Every candidate also declares how stylized it is and where:

- **motif** — the world material the stylization comes from. Prefer a material from the product's own domain (address plates for a rental tool, graded slabs for a card collection, technical drawings for an engineering studio) over a borrowed pop-culture style. Contracts live in `motif-library.md`; method in `expressive-ui.md`.
- **expression budget** — an L0–L3 level per page region (nav, hero, body, proof, list, cta, foot); L4 is reserved for event moments (completion, results). At least 3 regions stay at L0–L1 and at most 2 regions reach L3. Trust-critical regions (forms, payments, data tables, verification) stay at L0–L1.
- **seed source** — the stable identifier (slug, card id, address) that picks values inside the motif's rules, so repeated entities vary without breaking the system.

"Minimal" products still declare this: a motif at L0 everywhere is a valid, deliberate choice. Leaving it undeclared is not.

Candidates must differ in layout grammar or motif, not only in budget or palette.

### Step 4 — Check pairwise compatibility

Score major pairs as:

- `+2` strongly reinforcing;
- `+1` compatible;
- `0` neutral;
- `-1` tension that needs a reason;
- `-2` incoherent unless it is the deliberate signature.

Allow low-compatibility choices only as controlled contradictions.

### Step 5 — Add controlled contrast

For Distinctive and Experimental candidates, add 1–2 signature elements that are surprising but interpretable.

Examples:

- luxury + monospaced metadata;
- Swiss grid + hand-drawn botanical art;
- terminal UI + warm analog photography;
- brutalist components + delicate editorial captions;
- Japanese minimal + oversized numeric section markers.

A controlled contradiction must:

1. be localized to a clear layer;
2. support brand story or product semantics;
3. not damage usability;
4. not multiply into unrelated novelty everywhere.

### Step 6 — Run the cliché detector

Check the candidate against the cliché signals listed below.

If a candidate contains too many generic-AI signals, reroll the art direction rather than merely changing the accent color.

Default reroll threshold: cliché score `>= 5`.

#### Cliché signals (1 point each)

Layout / composition
- centered hero with a short headline, one paragraph, and two pill buttons;
- three equal feature cards in a row, each with an outline icon in a tinted rounded square;
- every section is a full-width band with centered text;
- logo cloud immediately under the hero;
- identical card grid used for features, testimonials, pricing, and blog.

Color / surface
- purple→blue (or indigo→violet) gradient as the primary brand device;
- dark navy background with a single neon accent and glowing blobs;
- glassmorphism applied to elements that do not overlap anything;
- gradient text on the headline;
- shadow on every surface regardless of depth meaning.

Shape / type
- one geometric sans (Inter/Geist look-alike) for everything, no metadata or display voice;
- uniform large border-radius on cards, buttons, inputs, images, and avatars alike;
- pill-shaped nav container floating over the hero;
- emoji or generic outline icons used as the only visual texture.

Motion / imagery
- fade-up-on-scroll applied uniformly to every section;
- abstract 3D blobs, isometric illustrations, or generic AI-generated imagery;
- dashboard screenshot floating at a 3D angle with a glow behind it;
- animated gradient mesh background.

Copy-shaped tells
- badge above the headline reading "Introducing …" / "New";
- headline of the form "The [adjective] way to [verb] your [noun]".

Stylized / expressive UI (see `expressive-ui.md`)
- random rotation everywhere instead of a fixed angle set;
- ransom-note / collage lettering on every heading;
- glitch or scanlines applied everywhere;
- every region at L3, no quiet zones;
- the motif shows up only as color — mark, selection, and transition are defaults;
- every transition is a generic fade unrelated to the motif's transition verb.

#### Reroll rules

- Score `>= 5` → reroll the art direction, not just the palette.
- Score `3–4` → keep the direction but replace the offending layer (usually imagery or component language).
- Any single cliché that IS the deliberate signature is allowed, but must be named in `signature.elements` with a reason.
- Rerolling means changing layout grammar, typographic voice, or component language — changing the accent hue does not reduce the score.

### Step 7 — Check usability and accessibility

Style must not override function.

Always verify:

- body text contrast;
- focus visibility;
- touch target size;
- reduced-motion behavior;
- semantic hierarchy;
- responsive reflow;
- table/form readability for dense products;
- glass/transparency legibility;
- no essential meaning encoded only by color.

If aesthetics and accessibility conflict, preserve the intent with a safer implementation.

## Scoring model

Score each candidate 0–100 using this weighting:

```text
Product fit             25
Brand fit               20
Content/layout fit      15
Pairwise coherence      15
Distinctiveness         10
Accessibility           10
Implementation fit       5
--------------------------------
Base                    100

Subtract:
Generic AI cliché       0–20
Uncontrolled conflict   0–20
Functional mismatch     0–30
```

Do not select the top numerical score blindly. Keep meaningful diversity in the shortlist.

## Selection strategy

When the user has not chosen a direction:

1. Generate candidate directions.
2. Present them as art directions with a one-line visual thesis.
3. Explain why each fits the project.
4. Show meaningful tradeoffs: trust, expressiveness, density, implementation cost, novelty.
5. Recommend one default, but preserve alternatives.

If the user says “pick for me,” choose the candidate with the best balance of fit + distinctiveness, not necessarily the safest.

## Required candidate summary format

Use this compact form during selection:

```text
Direction: Scientific Field Notes
Mode: Distinctive
Primary: Scientific Editorial
Secondary: Technical / Instrumentation
Visual thesis: A research publication that behaves like a modern software product.
Layout: asymmetric 12-col / left dominant / airy
Type: grotesk display + readable serif body + mono metadata
Color: warm ivory / ink / cobalt accent
Surface: flat paper + subtle grain
Components: rows, figures, bordered sections; minimal cards
Motion: restrained mask reveal + number transitions
Signature: oversized figure numbers and specimen-style labels
Avoid: generic gradient hero, pill nav, rounded icon tiles
Fit: 91/100 | Distinctiveness: 78/100 | Complexity: medium
```

## Required final StyleGenome

Once a direction is chosen, output an implementation contract, preferably as JSON/YAML plus concise explanation.

Use this structure:

```yaml
design:
  concept:
    name: "Scientific Field Notes"
    primary_archetype: scientific-editorial
    secondary_archetype: technical-instrumentation
    thesis: "A research publication that behaves like a modern software product."

  layout:
    grammar: asymmetric-12-column
    content_shape: narrative
    composition: left-dominant
    density: airy
    max_content_width: 1440
    section_rhythm: editorial
    overlap: minimal
    responsive: transform-not-collapse

  expression:
    motif: draft                 # see motif-library.md
    angle_set: [0, 90]
    transition_verb: draw
    legibility_core: [body, forms, numbers]
    budget: { nav: L1, hero: L3, body: L1, proof: L1, list: L1, cta: L2, foot: L0 }
    seed_source: post.slug

  typography:
    heading_family: neo-grotesk
    body_family: readable-serif
    metadata_family: monospace
    scale: dramatic
    heading_tracking: tight
    body_line_height: generous
    alignment: left

  color:
    strategy: monochrome-accent
    temperature: warm
    contrast: high
    background: "warm ivory"
    foreground: "near black"
    accent: "cobalt"

  shape:
    geometry: rectangular
    radius: minimal

  surface:
    material: flat-paper
    texture: subtle-grain

  border:
    language: hairline
    contrast: low-medium

  elevation:
    mode: flat

  imagery:
    primary: technical-photography
    treatment: monochrome
    secondary: diagrams

  iconography:
    style: geometric-outline
    containers: none

  navigation:
    pattern: editorial-top-nav
    behavior: sticky-minimal

  components:
    primary_language: rows-and-sections
    cards: exceptional-only
    buttons: rectangular
    forms: border-led

  motion:
    intensity: restrained
    entrance: mask-reveal
    hover: typographic-shift
    reduced_motion: required

  interaction:
    model: document-plus-tool

  signature:
    elements:
      - oversized-section-numerals
      - specimen-label-metadata

  avoid:
    - generic-purple-blue-gradient
    - centered-everything
    - three-equal-feature-cards
    - excessive-rounded-cards
    - decorative-glass-everywhere

  accessibility:
    target: WCAG-AA

  implementation:
    css_tokens: true
    design_token_prefix: ui
    complexity: medium
```

## Implementation rules for coding agents

After a StyleGenome is approved or inferred, treat it as a contract.

### Build tokens before components

Create or update semantic tokens for:

- color;
- typography;
- spacing;
- radius;
- border;
- shadow/elevation;
- motion durations/easings;
- content widths;
- grid values.

Prefer semantic names such as `--surface-page`, `--text-muted`, `--border-strong` over style-specific names such as `--gray-200` in component code.

### Build a few representative components first

Before implementing an entire page, verify the art direction with:

1. navigation/header;
2. hero/header section;
3. one primary content section;
4. one repeated component family;
5. one form/control if applicable.

If these collapse into generic cards, fix the component language before scaling out.

### Respect layout grammar

Do not convert every design into stacked centered containers on mobile and desktop.

Adapt the grammar responsively:

- asymmetric grid may become ordered but still left-biased;
- editorial columns may collapse to one column while retaining typographic hierarchy;
- dashboard density may reduce but should keep scanability;
- horizontal exploration needs a mobile-safe alternative.

### Cards are not the default primitive

Only use cards when a card represents meaningful grouping or elevation.

Prefer when appropriate:

- ruled sections;
- lists;
- tables;
- rows;
- panels;
- sheets;
- full-bleed blocks;
- tabs;
- split panes;
- canvas objects.

### Icons are not decoration tokens

Do not place every outline icon inside a tinted rounded square. Choose icon treatment from the genome.

### Motion must match the visual language

Examples:

- Swiss/technical → precise linear or restrained motion;
- playful → spring/elastic motion;
- editorial → mask/reveal, line/number transitions;
- retro terminal → discrete cursor/scan/step transitions;
- luxury → slow, low-amplitude transitions.

## Existing UI redesign workflow

When redesigning existing code:

1. inspect current information architecture and functional constraints;
2. identify current visual genome;
3. separate functional components from accidental styling;
4. propose 3–6 replacement genomes;
5. preserve behavior unless redesign scope includes UX changes;
6. refactor tokens and primitives first;
7. convert components systematically;
8. run cliché/coherence validation at the end.

Do not rewrite a working app simply to force a different framework.

## Component-level use

This skill may also be used for a single component.

In that case:

- inherit the host project's genome if known;
- change only dimensions relevant to the component;
- avoid inventing an isolated mini-style system;
- document any intentional local contrast.

## Research and references

If a user asks for a specific historical/cultural style, research enough to identify the actual design characteristics before implementation. Do not reduce cultural styles to stereotypes or superficial motifs.

For named contemporary products/brands, use them as references for properties, not as instructions to copy proprietary designs exactly. Extract principles such as density, grid, typography, motion, or navigation behavior.

## Verification checklist

Before finishing a design task, confirm:

- [ ] project brief was interpreted;
- [ ] at least one archetype was explicitly chosen;
- [ ] layout grammar is specified;
- [ ] typography is specified beyond “sans-serif”;
- [ ] material/radius/border/elevation are coherent;
- [ ] imagery and icons have a defined language;
- [ ] navigation/component patterns are specified;
- [ ] motion is specified or intentionally absent;
- [ ] at least one signature element exists for distinctive work;
- [ ] expression is declared: motif, per-region budget (≥ 3 quiet regions, ≤ 2 at L3), seed source;
- [ ] the legibility core (body, forms, numbers) is never rotated or stylized;
- [ ] cliché score is below threshold or consciously justified;
- [ ] accessibility constraints are preserved;
- [ ] implementation tokens match the genome;
- [ ] repeated UI does not silently revert to generic cards/pills.

