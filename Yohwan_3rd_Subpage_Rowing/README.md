# Regatta — Page Requirements Document

| Field | Value |
|---|---|
| **Page** | 3rd Subpage — Rowing |
| **Version** | 1.0 |
| **Status** | Draft |
| **Last Updated** | 2026-06-26 |
| **Author** | John Kim |

---

## 1. Overview

### 1.1 Purpose

A scroll-driven personal portfolio page styled as a 1500m rowing regatta. The visitor's scrolling drives an eight-person boat down a winding stream, passing life milestone stories and crossing the finish line. The experience is both a showcase of John's rowing history and a metaphor for personal growth.

### 1.2 Core Concept

The regatta is a metaphor for John's academic and personal journey.

| Element | Metaphor |
|---|---|
| The race course | John's life journey |
| Distance markers (1500m → 0m) | Timeline of experiences |
| Boat advancing | Progress driven by the user's curiosity (scroll) |
| Background shift (blue → red) | Exothermic chemistry reaction — connection to Science/Chemistry identity |
| Finish line | Achievement and completion |

### 1.3 Core Interaction

Scroll is the primary control. As the user scrolls:
- The boat advances down the 1500m course.
- Oars stroke in sync with scroll speed.
- Milestone story bubbles appear and fade at each distance marker.

---

## 2. Goals

### 2.1 Primary Goals

- Create a visually unique scroll experience that is clearly distinct from the other subpages.
- Convey personal milestones through a racing narrative.
- Reinforce the cross-disciplinary connection between rowing and chemistry.

### 2.2 Accessibility & Responsiveness

- Respects `prefers-reduced-motion` media query — reduce or disable animations for users who opt in.
- Layout is responsive for both mobile and desktop viewports.

### 2.3 Out of Scope

- Backend or server-side components.
- 3D rendering.

---

## 3. Technical Requirements

### 3.1 Core Technologies

| Technology | Role |
|---|---|
| HTML5 | Page structure |
| CSS3 | Styling, background color transitions |
| JavaScript | Scroll logic |

### 3.2 Animation Libraries

| Library | Plugin | Role |
|---|---|---|
| GSAP | ScrollTrigger | Scroll-driven animation of boat, oars, and story bubbles |
| GSAP | MotionPathPlugin | Boat movement along SVG motion path |

> Loaded via CDN. No build step required.

---

## 4. Visual Design

### 4.1 Atmosphere

| Position on Page | Color Tone | Meaning |
|---|---|---|
| Top (1500m) | Cool water blue | Calm starting point |
| Bottom (0m) | Deep red | Final sprint intensity — exothermic chemistry connection |

Background transitions gradually between these two tones throughout the entire scroll.

### 4.2 Course Layout

| Element | Description |
|---|---|
| Motion path | Winding SVG stream running vertically down the page |
| Distance markers | Every 300m in the left column: 1500m → 1200m → 900m → 600m → 300m → 0m |
| Lane wire | Appears at approximately 450m — a wire with swaying lane flags 1–6 |
| Finish line | At 0m — checkered banner |

---

## 5. Page Architecture

```
[Hero: About Me]
        │ scroll
        ▼
[1500m — Race Start]
        │ scroll
        ▼
[1200m — Milestone Bubble: 2023]
        │ scroll
        ▼
[900m — Milestone Bubble: 2024]
        │ scroll
        ▼
[600m — Milestone Bubble: 2025]
        │ scroll
        ▼
[450m — Lane Wire with Flags 1–6]
        │ scroll
        ▼
[300m — Milestone Bubble: 2026]
        │ scroll
        ▼
[0m — Finish Line]
```

---

## 6. Section Specifications

### 6.1 Hero — About Me

| Element | Description |
|---|---|
| Kicker | Italic *portfolio* label above the main title |
| Title | "John Kim" |
| Behavior | Fades out as the user begins scrolling into the race |

---

### 6.2 Distance Markers

- Displayed in the left column throughout the page.
- Values: 1500m → 1200m → 900m → 600m → 300m → 0m (every 300m).

---

### 6.3 The Boat

| Property | Description |
|---|---|
| Type | Eight-person shell (8 oars + coxswain) |
| Start position | At the dock (top of page) |
| Movement | Follows SVG motion path down the winding stream |
| Oar animation | Oars stroke back and forth, synchronized with scroll speed/direction |

---

### 6.4 Milestone Bubbles

Fade in at each 300m marker; fade out as the boat passes.

| Distance | Year | Story Content |
|---|---|---|
| 1200m | 2023 | *(To be provided by John Kim)* |
| 900m | 2024 | *(To be provided by John Kim)* |
| 600m | 2025 | *(To be provided by John Kim)* |
| 300m | 2026 | *(To be provided by John Kim)* |

---

### 6.5 Lane Wire

| Property | Description |
|---|---|
| Timing | Appears at approximately 450m to go |
| Visual | Wire stretching across the course with swaying lane flags numbered 1–6 |

---

### 6.6 Finish Line

| Property | Description |
|---|---|
| Timing | At 0m |
| Visual | Checkered banner that wiggles as the boat crosses |

---

### 6.7 Background Color Transition

| Property | Description |
|---|---|
| Behavior | Gradually shifts from cool water blue (top) to deep red (bottom) throughout the full scroll |
| Meaning | Exothermic chemistry burn of the final sprint — John's cross-disciplinary identity |

---

## 7. Global UX & Animation Principles

- Scroll is the only required control mechanism — no buttons or clicks needed to advance.
- All animations must be precisely synchronized with scroll position via ScrollTrigger.
- `prefers-reduced-motion` must be respected — reduce or disable animations for users who enable it.
- Layout must function on both mobile and desktop viewports.

---

## 8. How to Run

No build step needed.

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

Or simply open `index.html` directly in a browser.

---

## 9. Open Questions

| # | Question | Owner | Status |
|---|---|---|---|
| 1 | What are the milestone stories for 2023, 2024, 2025, and 2026? | John Kim | Pending |
| 2 | What is the specific boat design — colors, school blade markings? | John Kim | Pending |
| 3 | Should the hero section include additional content beyond the "John Kim" title? | John Kim | Pending |
| 4 | What exact cool blue and deep red hex values should be used for the background transition? | John Kim | Pending |

---

## 10. Revision History

| Version | Date | Changes | Author |
|---|---|---|---|
| 1.0 | 2026-06-26 | Initial draft | John Kim |
