# String Pathway — Page Requirements Document

| Field | Value |
|---|---|
| **Page** | 1st Subpage — Violin |
| **Version** | 1.0 |
| **Status** | Draft |
| **Last Updated** | 2026-06-26 |
| **Author** | John Kim |

---

## 1. Overview

### 1.1 Purpose

String Pathway is an immersive, interactive storytelling experience that presents the violin as a visual metaphor for personal journey, cultural identity, and intellectual growth. Users navigate the experience by interacting directly with the violin's strings, each representing a distinct pathway of development.

### 1.2 Core Concept

The violin serves as the primary navigation interface. Each string — A, D, and G — leads to a unique thematic pathway:

| String | Theme |
|---|---|
| A String | Musical Journey Through Time |
| D String | Performance and Expression |
| G String | Resonance Across Disciplines |

### 1.3 Design Philosophy

- Present the violin as the central symbol of the narrative.
- Balance professionalism with individuality and artistic expression.
- Prioritize visual storytelling over large amounts of text.
- Every transition should reinforce the central theme of **resonance** — the idea that music, culture, memory, and science are interconnected through unseen relationships.

---

## 2. Goals

### 2.1 Primary Goals

- Create a seamless, emotionally engaging user experience through fluid animations and transitions.
- Encourage exploration through intuitive visual cues and interactive elements.
- Maintain visual consistency across all pathways while allowing each string to convey a unique story.
- Design each pathway as a distinct branch of a single narrative rather than as separate pages.

### 2.2 Out of Scope

- Backend or data persistence of any kind.
- Mobile-first layout (desktop-optimized first).

---

## 3. Technical Requirements

### 3.1 Core Technologies

| Technology | Role |
|---|---|
| HTML5 | Page structure |
| CSS3 | Styling and layout |
| SVG | Graphics (violin illustration) |

### 3.2 Animation & Interaction Libraries

| Library | Role | Status |
|---|---|---|
| GSAP (GreenSock) | All animations and transitions | Required |
| GSAP ScrollTrigger | Scroll-driven animation | If required |
| GSAP MotionPath Plugin | Path-based motion | If required |

---

## 4. Visual Design

### 4.1 Atmosphere

- Cinematic and immersive.
- Dark, stage-like aesthetic.
- Warm golden tones as accent.

### 4.2 Typography

- Minimal and elegant.
- Labels and UI text should not compete with the visual experience.

---

## 5. Page Architecture

```
[Section 1: Violin Navigation Hub]
              │
              ▼ (string click)
[Section 2: Resonance Transition ~1.5s]
              │
    ┌─────────┼──────────┐
    ▼         ▼          ▼
[Section 3] [Section 4] [Section 5]
 A String    D String    G String
 Musical     Performance Resonance
 Journey     & Expression Across
                         Disciplines
    │         │          │
    └─────────┴──────────┘
                 │
         [Return to Section 1]
```

---

## 6. Section Specifications

### 6.1 Section 1 — Violin Navigation Hub

**Purpose:** Serve as the primary navigation interface where users choose which pathway to explore.

#### Layout

| Element | Description |
|---|---|
| Violin illustration | Highly realistic, detailed 2D violin positioned diagonally across the viewport |
| Scale | ~125% of natural scale — zoomed-in composition focused on the strings |
| Bow | Positioned naturally across the strings between fingerboard and bridge |
| Overall | Instrument dominates the screen and immediately captures user attention |

#### Interactive Elements

**Strings:**

| String | Destination |
|---|---|
| A String | Section 3 |
| D String | Section 4 |
| G String | Section 5 |

String behavior:
- Emit a subtle ambient glow on page load.
- Visually communicate interactivity without overwhelming the design.
- Increase in brightness and thickness on hover.

**Labels:**

- Floating labels identify each string (A, D, G).
- Remain minimal and elegant.
- Gently animate to attract attention.
- Help first-time users understand navigation.

#### Transition Logic

When a user clicks a string:
1. Play the corresponding violin note audio.
2. Trigger a smooth transition into Section 2.
3. After Section 2 completes, navigate to the selected pathway.

---

### 6.2 Section 2 — Resonance Transition Sequence

**Purpose:** Act as a thematic bridge connecting the navigation hub to each pathway.

#### Duration

Approximately 1.5 seconds.

#### Visual Specification

| Element | Description |
|---|---|
| Background | Darkened overlay, reduced opacity |
| Typography | Large centered "RESONANCE" text |
| Text style | Warm golden-yellow glow, subtle pulsing animation |
| Atmosphere | Cinematic |
| Effects | Floating musical notes, soft particles, ambient fade-in/out |

#### Transition Logic

| String Clicked | Destination |
|---|---|
| A String | Section 3 |
| D String | Section 4 |
| G String | Section 5 |

---

### 6.3 Section 3 — A String Pathway: Musical Journey Through Time

**Concept:** The A String represents the chronological development of musical identity through significant milestones and performances.

#### 6.3.1 Sub-Section 3A — Music Stand Introduction

**Layout:**

| Element | Description |
|---|---|
| Environment | Dimly lit stage |
| Lighting | Single spotlight illuminating a music stand, realistic shadows |
| Atmosphere | Dark surrounding to focus attention |

**Interactive Object:** A compilation music book rests on the stand.

**Navigation Element:** A clearly visible red interaction button appears on the book. Hover states indicate clickability.

**User Interaction:** Clicking the red button transitions to Section 3B.

---

#### 6.3.2 Sub-Section 3B — Interactive Compilation Book

**Layout:**

- Camera zooms into the music book.
- Book occupies the majority of the viewport.

**Functionality:** Users may continuously press the red button to turn pages.

**Timeline Pages:**

| Chapter | Year | Content Required |
|---|---|---|
| 1 | 2019 | Images, reflections, musical milestones, achievements |
| 2 | 2022 | Images, reflections, musical milestones, achievements |
| 3 | 2024 | Images, reflections, musical milestones, achievements |
| 4 | 2026 | Images, reflections, musical milestones, achievements |

**Final Page:** After the 2026 chapter, display a "Return to Violin" button that smoothly transitions back to Section 1.

---

### 6.4 Section 4 — D String Pathway: Performance and Expression

**Concept:** The D String represents public performance, stage presence, and artistic expression.

#### Initial Scene

| Element | Description |
|---|---|
| Visual | Closed crimson theater curtain |
| Atmosphere | Professional concert hall lighting |

**User Interaction:** Clicking the curtain executes a realistic curtain-opening animation (curtain-call reveal) and transitions into performance content.

#### Performance Timeline

| Year | Presentation Options |
|---|---|
| 2019 | Interactive timeline / Carousel / Stage-style gallery |
| 2023 | — |
| 2025 | — |
| 2026 | — |

**Goal:** Allow users to observe growth in performance ability and confidence across time.

#### Navigation

A persistent "Return to Violin" button remains available throughout and returns the user to Section 1.

---

### 6.5 Section 5 — G String Pathway: Resonance Across Disciplines

**Concept:** The G String explores how the concept of resonance connects music and chemistry, demonstrating the interdisciplinary dimension of identity.

#### Layout

- Screen divided diagonally into two visual domains.
- The division should feel integrated rather than separated — emphasizing connection, not contrast.

#### Left Side — Chemistry

| Element | Content |
|---|---|
| Focus | Scientific interpretation of resonance |
| Content | Molecular resonance structures, atomic composition of violin materials, material properties influencing acoustic behavior, interactive molecular visualizations |

#### Right Side — Music

| Element | Content |
|---|---|
| Focus | Musical interpretation of resonance |
| Content | String vibration visualizations, harmonic overtones, acoustic wave behavior, sound quality comparisons |

#### Connection Layer

The center divide should visually demonstrate the relationship between both disciplines.

Possible visualizations:
- Animated waveforms crossing the boundary.
- Particle systems transforming into musical frequencies.
- Molecular structures morphing into sound-wave patterns.

**Goal:** Show that both perspectives describe the same underlying phenomenon through different languages.

#### Navigation

A "Return to Violin" button is displayed throughout the experience and smoothly transitions back to Section 1.

---

## 7. Global UX & Animation Principles

- Maintain smooth GSAP-powered transitions throughout all sections.
- Avoid abrupt scene changes.
- Ensure all interactions provide immediate visual feedback.
- Preserve a consistent visual identity across all pathways.
- Design each pathway as a distinct branch of a single narrative, not as a separate page.

---

## 8. Open Questions

| # | Question | Owner | Status |
|---|---|---|---|
| 1 | What content (images, text) will populate the A String timeline chapters (2019, 2022, 2024, 2026)? | John Kim | Pending |
| 2 | What performance video recordings are available for the D String pathway? | John Kim | Pending |
| 3 | Is violin note audio available, or does it need to be sourced? | John Kim | Pending |
| 4 | What specific molecular visualizations are intended for the G String left panel? | John Kim | Pending |
| 5 | What specific performance format is preferred for D String: timeline, carousel, or gallery? | John Kim | Pending |

---

## 9. Revision History

| Version | Date | Changes | Author |
|---|---|---|---|
| 1.0 | 2026-06-26 | Initial draft | John Kim |
