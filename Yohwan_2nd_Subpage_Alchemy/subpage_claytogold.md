# Clay to Gold — Page Requirements Document


| Field            | Value                 |
| ---------------- | --------------------- |
| **Page**         | 2nd Subpage — Alchemy |
| **Version**      | 1.0                   |
| **Status**       | Draft                 |
| **Last Updated** | 2026-06-26            |
| **Author**       | John Kim              |


---

## 1. Overview

### 1.1 Purpose

An interactive, story-driven portfolio page framed as an alchemical experiment. The visitor explores a medieval-futuristic laboratory, adds reagents, triggers a chemical reaction, and discovers a piece of gold — a metaphor for John's intellectual journey across humanities research and chemistry.

### 1.2 Core Concept

The narrative follows the metaphor of alchemy: raw clay (origin) is transformed into gold (discovery of passion) through a sequence of reactions representing real intellectual experiences.

Key narrative anchors:


| Narrative Element                                       | Section   |
| ------------------------------------------------------- | --------- |
| The Mirage of the Middle East (Concord Review research) | Section 4 |
| Pioneer Academics blood-chemistry research              | Section 6 |


### 1.3 Experience Flow

```
[Section 1: The Laboratory]
        ↓ click clay hotspot
[Section 2: Preparation Phase]
        ↓ click material hotspot
[Section 3: Alchemical Reaction Setup]
        ↓ press "HEAT TO 450°C"
[Section 4: Transformation & Identity]
        ↓ click "See the Final Product"
[Section 5: The Gold]
        ↓ click gold nugget
[Section 6: The Meaning of the Gold]
        ↓ click "Back to the Alchemy Experiment"
[Section 1: The Laboratory] ← loop restart
```

---

## 2. Goals

### 2.1 Primary Goals

- Visually depict intellectual transformation from raw curiosity to purposeful discovery.
- Communicate an interdisciplinary identity spanning humanities and chemistry.
- Create an immersive, story-driven experience that feels unique and memorable.

### 2.2 Out of Scope

- Backend or server-side components.
- 3D rendering (all assets are SVG/CSS-based).
- Mobile layout (desktop-first).

---

## 3. Technical Requirements

### 3.1 Core Technologies


| Technology | Role                                    |
| ---------- | --------------------------------------- |
| HTML5      | Page structure                          |
| CSS3       | Styling, animations, gradients          |
| SVG        | Lab assets (flask, clay, gold, crystal) |


### 3.2 Animation & Interaction Libraries


| Library        | Role                                                  |
| -------------- | ----------------------------------------------------- |
| GSAP (via CDN) | All timeline animations, transitions, particle motion |


> No build step required. All assets are hand-built SVG/CSS rather than 3D renders. Camera zoom and lighting are simulated with transforms, gradients, and glows.

---

## 4. Visual Design

### 4.1 Color Palette


| Name                     | Hex       | Usage                                     |
| ------------------------ | --------- | ----------------------------------------- |
| Gold                     | `#D4AF37` | Primary accent, gold reveal (Section 5–6) |
| Dark Walnut Brown        | `#3B2A1A` | Laboratory wood surfaces                  |
| Deep Charcoal            | `#1A1A1A` | Background                                |
| Emerald Green            | `#00C853` | HAuCl₄ liquid                             |
| Pale Cryogenic Blue      | `#AEEFFF` | Liquid H₂                                 |
| Violet                   | `#B14CFF` | Philosopher's Stone core                  |
| Soft Pink Radiation Glow | `#FF77D9` | Philosopher's Stone aura                  |


### 4.2 Overall Atmosphere

> "A medieval alchemist accidentally built a futuristic chemistry lab."

Environmental elements:

- Medieval stone walls
- Wooden shelves filled with books
- Vintage wooden laboratory tables
- Brass scientific instruments
- Alchemical symbols engraved throughout the room
- Multiple flasks and beakers scattered around the workspace

### 4.3 Global Ambient Animations

- Smooth fade-in transitions
- Floating dust particles
- Gentle flask bubbling
- Dynamic glow effects
- Magical particle systems
- Ambient laboratory lighting

---

## 5. Page Architecture

```
Section 1: The Laboratory
    └─ Click clay hotspot → zoom + fade

Section 2: Preparation Phase
    └─ Click material hotspot → pour sequence

Section 3: Alchemical Reaction Setup
    └─ Press "HEAT TO 450°C" → temperature rise

Section 4: Transformation & Identity
    └─ Click "See the Final Product"

Section 5: The Gold
    └─ Click gold nugget

Section 6: The Meaning of the Gold
    └─ Click "Back to the Alchemy Experiment" → loop restart
```

Navigation controls:

- Navigation dots on the right side allow jumping between sections.
- Keyboard `←` / `→` arrow keys also navigate (prototype convenience).

---

## 6. Section Specifications

### 6.1 Section 1 — The Laboratory

#### Layout


| Element        | Description                                                                                                      |
| -------------- | ---------------------------------------------------------------------------------------------------------------- |
| Header         | Centered "John's Hub" — italicized, gold outline on every letter, metallic shine animation, floating glow        |
| Environment    | Medieval stone walls, wooden shelves, books, brass instruments, alchemical symbols, scattered flasks and beakers |
| Main Focus     | Large glass flask on a futuristic heating platform                                                               |
| Flask Contents | Marble-like clay sphere — beige-white coloration, subtle surface texture, slight rotation animation              |


#### Interactive Element

A glowing red interaction point appears over the clay.


| State | Behavior                                                                                   |
| ----- | ------------------------------------------------------------------------------------------ |
| Hover | Pulsing glow, expanding red ring                                                           |
| Click | Camera zooms toward clay → text appears: "Magnifying on the clay..." → fade into Section 2 |


---

### 6.2 Section 2 — Preparation Phase

**Camera Position:** Zoomed directly onto the flask; flask dominates the screen.

#### Interactive Hotspot

A second glowing red interaction point near the flask opening.

Label text:

> "Add: HAuCl₄ / Liquid H₂ / Philosopher's Stone"

#### Visual Asset Specifications


| Asset               | Appearance                                                                                   |
| ------------------- | -------------------------------------------------------------------------------------------- |
| HAuCl₄              | Bright translucent green liquid, slight swirling motion                                      |
| Liquid H₂           | Pale blue cryogenic liquid, mist effects around container, frost particles                   |
| Philosopher's Stone | Floating crystal, violet core, pink radiation aura, highly reflective surface, slow rotation |


#### Interaction

User clicks hotspot → red glow intensifies → materials begin entering flask → continue to Section 3.

---

### 6.3 Section 3 — Alchemical Reaction Setup

#### Material Addition Sequence


| Step | Material                     | Visual Effects                                                |
| ---- | ---------------------------- | ------------------------------------------------------------- |
| 1    | HAuCl₄ pours into flask      | Green liquid swirl, glass reflections                         |
| 2    | Liquid H₂ enters             | Blue vapor, cryogenic mist                                    |
| 3    | Philosopher's Stone descends | Violet sparks, pink radiation trails, crystal resonance pulse |


#### Flask State After Addition

- Clay sphere
- Green solution
- Blue cryogenic fluid
- Floating Philosopher's Stone

#### Heating Interface


| Element      | Description                                     |
| ------------ | ----------------------------------------------- |
| Button Text  | "HEAT TO 450°C"                                 |
| Button Style | Brass machinery aesthetic, red indicator lights |
| Sound        | Mechanical activation sound on press            |


#### Heating Animation

Temperature meter rises: `50°C → 150°C → 250°C → 350°C → 450°C`

At 450°C:

- Flask vibrates.
- Contents glow.
- Energy accumulates.
- Continue to Section 4.

---

### 6.4 Section 4 — Transformation & Identity

#### Reaction Sequence (1 second after reaching 450°C)

**Visual Explosion:**


| Element   | Description                                                                                 |
| --------- | ------------------------------------------------------------------------------------------- |
| Source    | Green and purple energy erupts from flask                                                   |
| Animation | Spiral vortex formation → green aura expansion → purple aura expansion → full-screen engulf |


#### Information Panel

A large centered text panel appears with the following content:


| Element           | Content                                                                                                           |
| ----------------- | ----------------------------------------------------------------------------------------------------------------- |
| Title             | The Mirage of the Middle East                                                                                     |
| Body              | Concord Review research paper — exploration of perception vs. reality, hidden narratives, overlooked perspectives |
| Resume Connection | Humanities research + scientific inquiry + cultural exploration + intellectual curiosity                          |


#### Continue Button


| Property | Value                        |
| -------- | ---------------------------- |
| Position | Slightly below screen center |
| Text     | "See the Final Product"      |
| Action   | Proceed to Section 5         |


---

### 6.5 Section 5 — The Gold

**Scene:** Return to the laboratory, centered on the table.

#### Gold Appearance


| Element  | Description                                                          |
| -------- | -------------------------------------------------------------------- |
| Surface  | Highly reflective, intense golden glow, metallic surface details     |
| Lighting | Cinematic                                                            |
| Effects  | Sparkles, lens flares, rotating shine streaks, classic treasure glow |


#### Background Context

Visible around the gold:

- Broken flask fragments
- Scattered glass
- Residual green-purple particles (evidence of the completed alchemical reaction)

#### Interaction


| State | Behavior            |
| ----- | ------------------- |
| Hover | Gold glows brighter |
| Click | Enter Section 6     |


---

### 6.6 Section 6 — The Meaning of the Gold

**Screen Layout:** Large screen-centered text bubble fills most of the viewport.

**Core Message:**

> "The gold represents the discovery of my passion for chemistry."

#### Featured Content


| Block                      | Content                                                                                          |
| -------------------------- | ------------------------------------------------------------------------------------------------ |
| Pioneer Academics Research | Blood chemistry research, scientific investigation, analytical thinking                          |
| Identity Connection        | Chemistry connects to: curiosity, discovery, pattern recognition, understanding unseen processes |


#### Final Button


| Property | Value                                                                  |
| -------- | ---------------------------------------------------------------------- |
| Position | Beneath text, comfortable spacing                                      |
| Text     | "Back to the Alchemy Experiment"                                       |
| Action   | Returns to Section 1, restarts experience loop, smooth fade transition |


---

## 7. Global UX & Animation Principles

- All section-to-section transitions use GSAP timelines.
- Avoid abrupt scene changes; all transitions should feel narrative-driven.
- Every visual element should reinforce the alchemy metaphor.
- Ensure all interactions provide immediate visual feedback.

---

## 8. Open Questions


| #   | Question                                                                               | Owner    | Status  |
| --- | -------------------------------------------------------------------------------------- | -------- | ------- |
| 1   | What specific content from *The Mirage of the Middle East* should appear in Section 4? | John Kim | Pending |
| 2   | What specific content from Pioneer Academics research should appear in Section 6?      | John Kim | Pending |
| 3   | Should the laboratory background be a static illustration or fully animated?           | John Kim | Pending |
| 4   | Is a mechanical activation sound file available for the heating button?                | John Kim | Pending |


---

## 9. Revision History


| Version | Date       | Changes       | Author   |
| ------- | ---------- | ------------- | -------- |
| 1.0     | 2026-06-26 | Initial draft | John Kim |


