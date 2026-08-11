/* String Pathway — scene controller */

const SCENES = {
  hub: document.getElementById("section-hub"),
  a: document.getElementById("section-a"),
  d: document.getElementById("section-d"),
  g: document.getElementById("section-g"),
};

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
  updateNavActive(name);

  if (name === "g") startConnectionCanvas();
  else stopConnectionCanvas();
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
      updateNavActive("hub");
      stopConnectionCanvas();
    },
  })
    .to(current, { opacity: 0, duration: 0.6, ease: "power2.inOut" })
    .fromTo(hub, { opacity: 0 }, { opacity: 1, duration: 0.7, ease: "power2.out" }, "-=0.2");
}

function resetPathways() {
  bookPageIndex = 0;
  carouselIndex = 0;

  const bookScene = document.getElementById("a-book");
  bookScene.classList.add("is-revealed");
  bookScene.setAttribute("aria-hidden", "false");
  updateBookNavButtons();

  document.getElementById("performance-stage").hidden = true;
  document.getElementById("curtain-prompt").hidden = false;
  document.getElementById("btn-return-d").hidden = true;
  gsap.set(["#curtain-left", "#curtain-right"], { x: "0%" });

  bookPages.forEach((page, i) => {
    page.classList.toggle("book-page--active", i === 0);
    page.classList.remove("book-page--turned");
    page.style.visibility = "";
    page.style.opacity = "";
    page.style.transform = "";
  });

  performanceSlides.forEach((slide, i) => {
    slide.classList.toggle("performance-slide--active", i === 0);
  });
  updateCarouselDots();
}

function updateNavActive(scene) {
  document.querySelectorAll("[data-nav-string]").forEach((btn) => {
    btn.classList.toggle("is-active", btn.dataset.navString === scene);
  });
  const violinLink = document.querySelector('[data-nav="hub"]');
  if (violinLink) {
    violinLink.classList.toggle("is-active", scene === "hub");
    if (scene === "hub") violinLink.setAttribute("aria-current", "page");
    else violinLink.removeAttribute("aria-current");
  }
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
  enterPathway(key);
}

function enterPathway(stringKey) {
  const hub = SCENES.hub;
  const target = SCENES[stringKey];
  if (!target) return;

  if (stringKey === "a") {
    resetPathways();
  }

  gsap.timeline({
    onComplete: () => {
      showScene(stringKey);
      gsap.set(target, { opacity: 1, visibility: "visible" });
    },
  })
    .to(hub, { opacity: 0, duration: 0.45, ease: "power2.in" })
    .set(hub, { visibility: "hidden" })
    .fromTo(target, { opacity: 0 }, { opacity: 1, duration: 0.55, ease: "power2.out" });
}

/* ── Top navigation ── */
function initNav() {
  const violinLink = document.querySelector('[data-nav="hub"]');
  if (violinLink) {
    violinLink.addEventListener("click", (e) => {
      e.preventDefault();
      if (activeScene === "hub") return;
      goToHub();
    });
  }

  document.querySelectorAll("[data-nav-string]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.dataset.navString;
      if (!key || !SCENES[key]) return;

      if (activeScene === "hub") {
        selectString(key);
        return;
      }

      if (activeScene === key) return;

      resetPathways();
      const from = SCENES[activeScene];
      const to = SCENES[key];

      gsap.timeline({
        onComplete: () => {
          showScene(key);
          selectedString = key;
          gsap.set(to, { opacity: 1, visibility: "visible" });
        },
      })
        .to(from, { opacity: 0, duration: 0.4, ease: "power2.in" })
        .fromTo(to, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power2.out" });
    });
  });
}

/* ── Section 3: A String ── */
function initAString() {
  document.getElementById("btn-book-prev").addEventListener("click", () => goToBookPage(bookPageIndex - 1));
  document.getElementById("btn-book-next").addEventListener("click", () => goToBookPage(bookPageIndex + 1));
  document.getElementById("btn-return-a").addEventListener("click", goToHub);
  updateBookNavButtons();
}

function updateBookNavButtons() {
  const prev = document.getElementById("btn-book-prev");
  const next = document.getElementById("btn-book-next");
  if (!prev || !next) return;
  prev.disabled = bookPageIndex <= 0;
  next.disabled = bookPageIndex >= bookPages.length - 1;
}

let bookTurning = false;

function goToBookPage(index) {
  if (bookTurning) return;
  const max = bookPages.length - 1;
  const nextIndex = Math.max(0, Math.min(max, index));
  if (nextIndex === bookPageIndex) return;

  const current = bookPages[bookPageIndex];
  const target = bookPages[nextIndex];
  const goingForward = nextIndex > bookPageIndex;

  bookTurning = true;

  if (goingForward) {
    gsap.timeline({
      onComplete: () => {
        bookTurning = false;
        updateBookNavButtons();
      },
    })
      .to(current, { rotateY: 90, opacity: 0.3, duration: 0.45, ease: "power2.in", transformOrigin: "left center" })
      .call(() => {
        current.classList.remove("book-page--active");
        current.classList.add("book-page--turned");
        current.style.visibility = "hidden";
        target.classList.add("book-page--active");
        target.classList.remove("book-page--turned");
        target.style.visibility = "visible";
      })
      .fromTo(
        target,
        { rotateY: -90, opacity: 0 },
        { rotateY: 0, opacity: 1, duration: 0.45, ease: "power2.out", transformOrigin: "left center" }
      );
  } else {
    gsap.timeline({
      onComplete: () => {
        bookTurning = false;
        updateBookNavButtons();
      },
    })
      .to(current, { rotateY: -90, opacity: 0.3, duration: 0.45, ease: "power2.in", transformOrigin: "left center" })
      .call(() => {
        current.classList.remove("book-page--active");
        current.classList.remove("book-page--turned");
        current.style.visibility = "hidden";
        target.classList.add("book-page--active");
        target.classList.remove("book-page--turned");
        target.style.visibility = "visible";
      })
      .fromTo(
        target,
        { rotateY: 90, opacity: 0 },
        { rotateY: 0, opacity: 1, duration: 0.45, ease: "power2.out", transformOrigin: "left center" }
      );
  }

  bookPageIndex = nextIndex;
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

/* ── Section 5: G String — woods + connection canvas ── */
function initGString() {
  document.getElementById("btn-return-g").addEventListener("click", goToHub);

  const tabs = document.querySelectorAll(".wood-tab");
  const panels = document.querySelectorAll("[data-wood-panel]");
  const swatch = document.getElementById("wood-swatch");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const wood = tab.dataset.wood;
      if (!wood) return;

      tabs.forEach((t) => {
        const on = t === tab;
        t.classList.toggle("is-active", on);
        t.setAttribute("aria-selected", on ? "true" : "false");
      });

      panels.forEach((panel) => {
        const on = panel.dataset.woodPanel === wood;
        panel.classList.toggle("is-active", on);
        panel.hidden = !on;
      });

      if (swatch) swatch.dataset.wood = wood;
    });
  });
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

/* Expose for violin-3d.js */
window.selectString = selectString;
window.highlightString = highlightString;

/* ── Boot ── */
initNav();
initHub();
initAString();
initDString();
initGString();
updateNavActive("hub");

gsap.from(".hub-hint", { opacity: 0, duration: 0.6, delay: 1.4 });
