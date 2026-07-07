/* String Pathway — scene controller */

const SCENES = {
  hub: document.getElementById("section-hub"),
  resonance: document.getElementById("section-resonance"),
  a: document.getElementById("section-a"),
  d: document.getElementById("section-d"),
  g: document.getElementById("section-g"),
};

const ROUTES = { a: "section-a", d: "section-d", g: "section-g" };

let activeScene = "hub";
let selectedString = null;
let bookPageIndex = 0;
let carouselIndex = 0;
let connectionRAF = null;

const bookPages = document.querySelectorAll(".book-page");
const performanceSlides = document.querySelectorAll(".performance-slide");

/* ── Scene transitions ── */
function showScene(name) {
  Object.entries(SCENES).forEach(([key, el]) => {
    if (!el) return;
    const isActive = key === name;
    el.classList.toggle("scene--active", isActive);
    el.setAttribute("aria-hidden", isActive ? "false" : "true");
  });
  activeScene = name;

  if (name === "g") startConnectionCanvas();
  else stopConnectionCanvas();
}

function transitionTo(fromEl, toEl, onComplete) {
  gsap.timeline({
    onComplete,
  })
    .to(fromEl, { opacity: 0, duration: 0.5, ease: "power2.inOut" })
    .set(fromEl, { visibility: "hidden", pointerEvents: "none" })
    .set(toEl, { visibility: "visible", pointerEvents: "auto", opacity: 0 })
    .to(toEl, { opacity: 1, duration: 0.6, ease: "power2.out" });
}

function goToHub() {
  resetPathways();
  const current = SCENES[activeScene];
  const hub = SCENES.hub;

  gsap.timeline({
    onComplete: () => {
      Object.values(SCENES).forEach((el) => {
        el.classList.remove("scene--active");
        el.setAttribute("aria-hidden", "true");
      });
      hub.classList.add("scene--active");
      hub.setAttribute("aria-hidden", "false");
      gsap.set(hub, { opacity: 1, visibility: "visible" });
      activeScene = "hub";
      selectedString = null;
      stopConnectionCanvas();
    },
  })
    .to(current, { opacity: 0, duration: 0.6, ease: "power2.inOut" })
    .fromTo(hub, { opacity: 0 }, { opacity: 1, duration: 0.7, ease: "power2.out" }, "-=0.2");
}

function resetPathways() {
  bookPageIndex = 0;
  carouselIndex = 0;

  document.getElementById("a-stand").hidden = false;
  document.getElementById("a-stand").style.opacity = "";
  document.getElementById("a-book").classList.remove("is-revealed");
  document.getElementById("a-book").setAttribute("aria-hidden", "true");
  gsap.set("#music-book-closed", { scale: 1, clearProps: "transform" });
  document.getElementById("btn-turn-page").hidden = false;
  document.getElementById("btn-return-a").hidden = true;

  document.getElementById("performance-stage").hidden = true;
  document.getElementById("curtain-prompt").hidden = false;
  document.getElementById("btn-return-d").hidden = true;
  gsap.set(["#curtain-left", "#curtain-right"], { x: "0%" });

  bookPages.forEach((page, i) => {
    page.classList.toggle("book-page--active", i === 0);
    page.classList.remove("book-page--turned");
    page.style.visibility = "";
    page.style.opacity = "";
  });

  performanceSlides.forEach((slide, i) => {
    slide.classList.toggle("performance-slide--active", i === 0);
  });
  updateCarouselDots();
}

/* ── Section 1: String interaction ── */
function initHub() {
  const strings = document.querySelectorAll(".string-hit, .string-label");

  strings.forEach((el) => {
    const key = el.dataset.string;
    if (!key) return;

    el.addEventListener("mouseenter", () => highlightString(key, true));
    el.addEventListener("mouseleave", () => highlightString(key, false));
    el.addEventListener("click", () => selectString(key));
  });
}

function highlightString(key, on) {
  const line = document.querySelector(`.string[data-string="${key}"]`);
  if (line) line.classList.toggle("string--hover", on);
}

function selectString(key) {
  if (activeScene !== "hub") return;
  selectedString = key;
  ViolinAudio.playNote(key);
  playResonanceTransition(key);
}

/* ── Section 2: Resonance ── */
function playResonanceTransition(stringKey) {
  const resonance = SCENES.resonance;
  const hub = SCENES.hub;

  resonance.classList.add("scene--active");
  resonance.setAttribute("aria-hidden", "false");
  spawnResonanceEffects();

  gsap.timeline({
    onComplete: () => enterPathway(stringKey),
  })
    .to(hub, { opacity: 0, duration: 0.4, ease: "power2.in" })
    .fromTo(resonance, { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0)
    .to(resonance, { opacity: 0, duration: 0.4, ease: "power2.out", delay: 1.1 })
    .set(resonance, { visibility: "hidden" })
    .set(hub, { visibility: "hidden", opacity: 0 });
}

function spawnResonanceEffects() {
  const particles = document.getElementById("resonance-particles");
  const notes = document.getElementById("resonance-notes");
  particles.innerHTML = "";
  notes.innerHTML = "";

  const noteSymbols = ["♩", "♪", "♫", "♬"];

  for (let i = 0; i < 20; i++) {
    const p = document.createElement("div");
    p.className = "resonance-particle";
    p.style.left = `${Math.random() * 100}%`;
    p.style.top = `${Math.random() * 100}%`;
    particles.appendChild(p);

    gsap.fromTo(p,
      { opacity: 0, scale: 0 },
      { opacity: 0.8, scale: 1, duration: 0.6, delay: Math.random() * 0.5,
        y: -30 - Math.random() * 60, x: (Math.random() - 0.5) * 80,
        ease: "sine.out" }
    );
    gsap.to(p, { opacity: 0, duration: 0.5, delay: 0.8 + Math.random() * 0.5 });
  }

  for (let i = 0; i < 6; i++) {
    const n = document.createElement("div");
    n.className = "resonance-note";
    n.textContent = noteSymbols[i % noteSymbols.length];
    n.style.left = `${15 + Math.random() * 70}%`;
    n.style.top = `${20 + Math.random() * 60}%`;
    notes.appendChild(n);

    gsap.fromTo(n,
      { opacity: 0, y: 20 },
      { opacity: 0.7, y: -40 - Math.random() * 40, duration: 1.2, delay: 0.1 + i * 0.12, ease: "sine.out" }
    );
    gsap.to(n, { opacity: 0, duration: 0.4, delay: 1.0 });
  }
}

function enterPathway(stringKey) {
  const target = SCENES[stringKey];
  showScene(stringKey);
  gsap.fromTo(target, { opacity: 0 }, { opacity: 1, duration: 0.7, ease: "power2.out" });
}

/* ── Section 3: A String ── */
function initAString() {
  document.getElementById("btn-open-book").addEventListener("click", openBook);
  document.getElementById("btn-turn-page").addEventListener("click", turnBookPage);
  document.getElementById("btn-return-a").addEventListener("click", goToHub);
}

function openBook() {
  const stand = document.getElementById("a-stand");
  const bookScene = document.getElementById("a-book");
  const closedBook = document.getElementById("music-book-closed");

  gsap.timeline({
    onComplete: () => {
      stand.hidden = true;
      bookScene.classList.add("is-revealed");
      bookScene.setAttribute("aria-hidden", "false");
    },
  })
    .to(closedBook, { scale: 2.8, duration: 0.75, ease: "power2.inOut", transformOrigin: "50% 100%" })
    .to(stand, { opacity: 0, duration: 0.35 }, "-=0.15");
}

function turnBookPage() {
  if (bookPageIndex >= bookPages.length - 1) return;

  const current = bookPages[bookPageIndex];
  const next = bookPages[bookPageIndex + 1];

  gsap.timeline()
    .to(current, { rotateY: 90, opacity: 0.3, duration: 0.5, ease: "power2.in", transformOrigin: "left center" })
    .call(() => {
      current.classList.remove("book-page--active");
      current.classList.add("book-page--turned");
      current.style.visibility = "hidden";
      next.classList.add("book-page--active");
      next.style.visibility = "visible";
    })
    .fromTo(next, { rotateY: -90, opacity: 0 }, { rotateY: 0, opacity: 1, duration: 0.5, ease: "power2.out", transformOrigin: "left center" });

  bookPageIndex++;

  if (bookPageIndex >= bookPages.length - 1) {
    document.getElementById("btn-turn-page").hidden = true;
    document.getElementById("btn-return-a").hidden = false;
  }
}

/* ── Section 4: D String ── */
function initDString() {
  const prompt = document.getElementById("curtain-prompt");
  const left = document.getElementById("curtain-left");
  const right = document.getElementById("curtain-right");

  function openCurtain() {
    prompt.hidden = true;

    gsap.timeline({
      onComplete: () => {
        document.getElementById("performance-stage").hidden = false;
        document.getElementById("btn-return-d").hidden = false;
        gsap.from(".performance-stage", { opacity: 0, y: 30, duration: 0.6, ease: "power2.out" });
      },
    })
      .to(left, { x: "-100%", duration: 1.2, ease: "power3.inOut" })
      .to(right, { x: "100%", duration: 1.2, ease: "power3.inOut" }, 0);
  }

  prompt.addEventListener("click", openCurtain);
  left.addEventListener("click", openCurtain);
  right.addEventListener("click", openCurtain);

  document.getElementById("carousel-prev").addEventListener("click", () => moveCarousel(-1));
  document.getElementById("carousel-next").addEventListener("click", () => moveCarousel(1));
  document.getElementById("btn-return-d").addEventListener("click", goToHub);

  buildCarouselDots();
}

function buildCarouselDots() {
  const container = document.getElementById("carousel-dots");
  container.innerHTML = "";
  performanceSlides.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.className = `carousel-dot${i === 0 ? " carousel-dot--active" : ""}`;
    dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
    dot.addEventListener("click", () => goToSlide(i));
    container.appendChild(dot);
  });
}

function updateCarouselDots() {
  document.querySelectorAll(".carousel-dot").forEach((dot, i) => {
    dot.classList.toggle("carousel-dot--active", i === carouselIndex);
  });
}

function moveCarousel(dir) {
  goToSlide(carouselIndex + dir);
}

function goToSlide(index) {
  const max = performanceSlides.length - 1;
  const next = Math.max(0, Math.min(max, index));
  if (next === carouselIndex) return;

  const current = performanceSlides[carouselIndex];
  const target = performanceSlides[next];
  const slideDir = next > carouselIndex ? 1 : -1;

  gsap.timeline()
    .to(current, { opacity: 0, x: -30 * slideDir, duration: 0.35, ease: "power2.in" })
    .call(() => {
      current.classList.remove("performance-slide--active");
      target.classList.add("performance-slide--active");
    })
    .fromTo(target, { opacity: 0, x: 30 * slideDir }, { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" });

  carouselIndex = next;
  updateCarouselDots();
}

/* ── Section 5: G String — connection canvas ── */
function initGString() {
  document.getElementById("btn-return-g").addEventListener("click", goToHub);
}

let connectionResizeHandler = null;

function startConnectionCanvas() {
  const canvas = document.getElementById("connection-canvas");
  if (!canvas || connectionRAF) return;
  const ctx = canvas.getContext("2d");
  let t = 0;

  function resize() {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = canvas.offsetHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  connectionResizeHandler = resize;
  window.addEventListener("resize", connectionResizeHandler);

  function draw() {
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    ctx.clearRect(0, 0, w, h);

    const midX = w / 2;

    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.strokeStyle = `rgba(232, 197, 71, ${0.15 + i * 0.05})`;
      ctx.lineWidth = 1;

      for (let x = 0; x <= w; x += 2) {
        const norm = x / w;
        const chemWave = Math.sin(norm * 8 + t + i * 0.5) * 20;
        const musicWave = Math.sin(norm * 12 - t + i * 0.3) * 15;
        const blend = chemWave * (1 - norm) + musicWave * norm;
        const y = h / 2 + blend + Math.sin(t * 0.5 + i) * 10;

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    for (let i = 0; i < 12; i++) {
      const px = midX + Math.sin(t * 1.5 + i) * 30;
      const py = (h / 12) * i + Math.cos(t + i * 0.8) * 15;
      const r = 2 + Math.sin(t * 2 + i) * 1;
      ctx.beginPath();
      ctx.fillStyle = `rgba(232, 197, 71, ${0.3 + Math.sin(t + i) * 0.2})`;
      ctx.arc(px, py, r, 0, Math.PI * 2);
      ctx.fill();
    }

    t += 0.025;
    connectionRAF = requestAnimationFrame(draw);
  }

  stopConnectionCanvas();
  draw();
}

function stopConnectionCanvas() {
  if (connectionRAF) {
    cancelAnimationFrame(connectionRAF);
    connectionRAF = null;
  }
  if (connectionResizeHandler) {
    window.removeEventListener("resize", connectionResizeHandler);
    connectionResizeHandler = null;
  }
}

/* ── Boot ── */
initHub();
initAString();
initDString();
initGString();

/* Hub entrance animation */
gsap.from(".violin-assembly", { opacity: 0, scale: 0.9, duration: 1.2, ease: "power2.out", delay: 0.2 });
gsap.from(".string-label", { opacity: 0, y: 20, duration: 0.6, stagger: 0.15, ease: "power2.out", delay: 0.8 });
gsap.from(".hub-hint", { opacity: 0, duration: 0.6, delay: 1.4 });
