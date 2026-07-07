# TCK Homepage — Page Requirements Document

| Field | Value |
|---|---|
| **Page** | Main Page — Tetrahedron Version |
| **Version** | 1.0 |
| **Status** | Draft |
| **Last Updated** | 2026-06-26 |
| **Author** | John Kim |

---

## 1. Overview

### 1.1 Purpose

A landing page that introduces John Kim's identity as a Third Culture Kid (TCK) shaped by three cultural influences: West, East, and Middle East. This homepage acts as an introduction to the overall portfolio and directs users toward the three subpages. It should remain minimal, symbolic, and visually sophisticated rather than exploring any individual culture in depth.

### 1.2 Core Message

> Three worlds. One identity.

### 1.3 Design Philosophy

- Sophisticated, minimal, symbolic, and concept-driven.
- Museum exhibit quality.
- The tetrahedron is the primary storytelling element — let it communicate.
- Avoid: excessive text, cartoon-style graphics, overly bright colors, heavy visual clutter.

---

## 2. Goals

### 2.1 Primary Goals

- Communicate the TCK identity concept through a single, powerful visual metaphor (the tetrahedron).
- Direct users toward the three subpages through intuitive face interaction.
- Set a sophisticated visual tone for the entire portfolio.

### 2.2 Out of Scope

- Deep narrative content (reserved for subpages).
- Mobile layout (desktop-first).

---

## 3. Technical Requirements

### 3.1 Core Technologies

| Technology | Role |
|---|---|
| HTML5 | Page structure |
| CSS3 | Styling and layout |
| JavaScript | Interaction logic |

### 3.2 Animation & 3D Libraries

| Library | Role | Status |
|---|---|---|
| GSAP | Page animations and transitions | Required |
| GSAP ScrollTrigger | Scroll-driven animation | Required |
| Three.js | 3D tetrahedron rendering | Preferred |
| React Three Fiber | 3D tetrahedron (if using React) | Alternative |

> The tetrahedron must be rendered as a true 3D object, not a flat illustration.

---

## 4. Visual Design

### 4.1 Background

Deep navy — dark, immersive, minimal distraction.

| Tone | Hex |
|---|---|
| Darkest | `#020816` |
| Mid | `#061226` |
| Lightest | `#0B1830` |

Optional ambient elements:
- Very subtle particle effects
- Light atmospheric glow
- Soft vignette around screen edges

> Avoid gradients that overpower the tetrahedron.

### 4.2 Face Color Reference

| Face | Color Name | Hex Range |
|---|---|---|
| West (Violin) | Deep wine red | `#6A1B2A` – `#8A2E43` |
| Middle East (Flask) | Warm golden yellow | `#B88722` – `#D8A530` |
| East (Rowing) | Sky blue | `#4A90E2` – `#6CB2FF` |
| Identity | Dark navy (background blend) | Matches `#020816`–`#0B1830` |

> Maintain saturation consistency across all three colored faces.

### 4.3 Typography

- Editorial and premium feel.
- Generous negative space preserved throughout.
- "TCK" is the dominant typographic element.

---

## 5. Page Architecture

```
[Single-page landing — no scroll required]

Left Column: Typography block
Right Column: Interactive 3D Tetrahedron (primary visual focus)
```

---

## 6. Layout Specifications

### 6.1 Split Layout

| Side | Content |
|---|---|
| Left | Typographic hierarchy block |
| Right | Interactive 3D tetrahedron |

### 6.2 Left Side — Text Block

```
TCK

THIRD CULTURE KID

→ Three Worlds, One Identity


DISCOVER
→
```

| Element | Role |
|---|---|
| "TCK" | Dominant visual typographic element |
| "Third Culture Kid" | Subtitle, directly beneath TCK |
| "Three Worlds, One Identity" | Main tagline |
| "Discover →" | Subtle CTA directing attention toward the tetrahedron |

Design requirements:
- Typography should feel editorial and premium.
- Preserve large amounts of negative space.

---

## 7. Interactive Tetrahedron Specifications

### 7.1 Symbolism

```
West  +  East  +  Middle East  =  John Kim
```

- Each face represents one cultural influence.
- The apex (top vertex) represents John Kim's integrated identity — the point where all three influences converge.

### 7.2 Behavior States

| State | Behavior |
|---|---|
| Default (page load) | Slow, continuous rotation on vertical axis — smooth and elegant |
| Mouse movement | Tetrahedron subtly tilts toward cursor — responsive but restrained |
| Face hover | Face slightly brightens, icon gains emphasis, surface glow increases slightly |
| Face click | Navigate to corresponding subpage |
| User drag | Manual rotation |

> Interaction should feel refined and professional. Avoid dramatic animation.

### 7.3 Face Specifications

#### Face 1 — West

| Property | Value |
|---|---|
| Symbol | Realistic violin icon or simplified violin silhouette |
| Background Color | Deep wine red (`#6A1B2A` – `#8A2E43`) |
| Meaning | Western identity, music, violin |
| Link Target | Violin Subpage |

#### Face 2 — Middle East

| Property | Value |
|---|---|
| Symbol | Laboratory flask filled with purple liquid — clean scientific aesthetic |
| Background Color | Warm golden yellow (`#B88722` – `#D8A530`) |
| Meaning | Science, chemistry, Middle Eastern chapter |
| Link Target | Alchemy Subpage |

#### Face 3 — East

| Property | Value |
|---|---|
| Symbol | Eight-person rowing shell — black boat, St. Andrew's School blade design, simplified but recognizable |
| Background Color | Sky blue (`#4A90E2` – `#6CB2FF`) |
| Meaning | Eastern identity, crew, discipline, teamwork |
| Link Target | Rowing Subpage |

#### Face 4 — Identity

| Property | Value |
|---|---|
| Symbol | None — or very faint "TCK" engraving / small glowing center point (optional) |
| Background Color | Dark navy (blends into background) |
| Meaning | The integrated self — the identity created by the convergence of the other three influences |

> Do not add a fourth cultural symbol. This face represents synthesis, not a new culture.

### 7.4 Apex Symbolism

| Property | Requirement |
|---|---|
| Visual treatment | Slight glow, brighter edge lighting |
| Intensity | Subtle — draws attention without overwhelming |
| Conceptual meaning | The single point where all three cultural influences meet and become one person |

---

## 8. Global UX & Animation Principles

- All transitions should feel sophisticated and unhurried.
- The tetrahedron is the primary storytelling element — typography must not compete with it.
- Preserve generous negative space throughout the layout.
- Interaction should be immediately legible but never flashy.

---

## 9. Open Questions

| # | Question | Owner | Status |
|---|---|---|---|
| 1 | Which Three.js version and implementation pattern should be used? | Developer | Pending |
| 2 | Should face clicks navigate to a new URL or use an in-page SPA transition? | John Kim | Pending |
| 3 | Should "Discover →" animate toward the tetrahedron or simply highlight it? | John Kim | Pending |
| 4 | Wireframe reference: confirm this version (Tetrahedron) is the active mainpage vs. Tuning Forks version. | John Kim | Pending |

---

## 10. Revision History

| Version | Date | Changes | Author |
|---|---|---|---|
| 1.0 | 2026-06-26 | Initial draft | John Kim |
