/* ============================================================
   John Kim — Regatta Portfolio
   GSAP + ScrollTrigger + MotionPathPlugin
   ============================================================ */

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const mm = gsap.matchMedia();

mm.add(
  {
    motionOK: "(prefers-reduced-motion: no-preference)",
    reduceMotion: "(prefers-reduced-motion: reduce)",
  },
  (context) => {
    const { reduceMotion } = context.conditions;

    /* ---------- Reduced motion: show everything statically ---------- */
    if (reduceMotion) {
      gsap.set(".milestone", { autoAlpha: 1, xPercent: -50, yPercent: -50 });
      gsap.set("#boat", {
        motionPath: {
          path: "#riverPath",
          align: "#riverPath",
          alignOrigin: [0.5, 0.5],
          autoRotate: true,
          start: 0.02,
          end: 0.02,
        },
      });
      return;
    }

    /* ---------- Hero: fade out as the race begins ---------- */
    gsap.to(".hero-text, .hero-badge, .hero-scroll-hint", {
      autoAlpha: 0,
      y: -60,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom 35%",
        scrub: true,
      },
    });

    /* ---------- Starting dock: fade out as the boat departs ---------- */
    gsap.to("#dock", {
      autoAlpha: 0,
      ease: "none",
      scrollTrigger: {
        trigger: "#race",
        start: "top 55%",
        end: "top 15%",
        scrub: true,
      },
    });

    /* ---------- The boat: rows down the stream as you scroll ---------- */
    const RACE_START = "top 45%";
    const RACE_END = "bottom 55%";

    gsap.to("#boat", {
      motionPath: {
        path: "#riverPath",
        align: "#riverPath",
        alignOrigin: [0.5, 0.5],
        autoRotate: true,
      },
      ease: "none",
      scrollTrigger: {
        trigger: "#race",
        start: RACE_START,
        end: RACE_END,
        scrub: 0.6,
        invalidateOnRefresh: true,
      },
    });

    /* ---------- Oars: stroke back and forth, driven by scroll ---------- */
    const portOars = gsap.utils.toArray(".oar-port");
    const starOars = gsap.utils.toArray(".oar-star");

    gsap.set(portOars, { transformOrigin: "50% 100%" }); // pivot at the oarlock
    gsap.set(starOars, { transformOrigin: "50% 0%" });

    const portSet = portOars.map((el) => gsap.quickSetter(el, "rotation", "deg"));
    const starSet = starOars.map((el) => gsap.quickSetter(el, "rotation", "deg"));

    const STROKES = 22; // full strokes over the 1500m
    const SWEEP = 26; // max oar sweep in degrees

    ScrollTrigger.create({
      trigger: "#race",
      start: RACE_START,
      end: RACE_END,
      onUpdate: (self) => {
        const angle = Math.sin(self.progress * Math.PI * 2 * STROKES) * SWEEP;
        portSet.forEach((set) => set(angle));
        starSet.forEach((set) => set(-angle));
      },
    });

    /* ---------- Water current: drifts past as you scroll ---------- */
    gsap.to(".current", {
      strokeDashoffset: -600,
      ease: "none",
      scrollTrigger: {
        trigger: "#race",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    /* ---------- Distance markers: tick in from the left ---------- */
    gsap.utils.toArray(".marker").forEach((marker) => {
      gsap.from(marker, {
        autoAlpha: 0,
        x: -30,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: marker,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });
    });

    /* ---------- Milestone bubbles: fade in, then fade out as
                  the boat passes each 300m mark ---------- */
    gsap.utils.toArray(".milestone").forEach((bubble) => {
      gsap.set(bubble, { xPercent: -50, yPercent: -50 });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: bubble,
            start: "top 95%",
            end: "bottom 15%",
            scrub: true,
          },
        })
        .fromTo(
          bubble,
          { autoAlpha: 0, y: 70, scale: 0.96 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 1, ease: "none" }
        )
        .to(bubble, { autoAlpha: 1, duration: 1.6, ease: "none" }) // hold
        .to(bubble, { autoAlpha: 0, y: -70, scale: 0.96, duration: 1, ease: "none" });
    });

    /* ---------- Lane-number wire (~450m to go) ---------- */
    gsap.from("#laneWire", {
      autoAlpha: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: "#laneWire",
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });

    // flags sway gently from the wire
    gsap.utils.toArray("#laneWire .flag").forEach((flag, i) => {
      gsap.set(flag, { transformOrigin: "50% 0%" });
      gsap.to(flag, {
        rotation: i % 2 ? 5 : -5,
        duration: 1.4 + i * 0.13,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
    });

    /* ---------- Background warmth: cool water → red heat ----------
       The harder the race gets, the warmer it burns — an exothermic
       finish. Animated via CSS variables on :root. */
    gsap.to("html", {
      "--bg-top": "#43111a",
      "--bg-bottom": "#7c2020",
      ease: "none",
      scrollTrigger: {
        trigger: "#race",
        start: "top 60%",
        end: "bottom bottom",
        scrub: true,
      },
    });

    /* ---------- Finish line: wiggles as the boat reaches it ---------- */
    const wiggle = gsap
      .timeline({ paused: true })
      .set("#finishLine", { transformOrigin: "50% 50%" })
      .to("#finishLine", { rotation: -2.6, scaleY: 1.18, duration: 0.1, ease: "power1.inOut" })
      .to("#finishLine", { rotation: 2.2, scaleY: 0.92, duration: 0.12, ease: "power1.inOut" })
      .to("#finishLine", { rotation: -1.7, scaleY: 1.1, duration: 0.12, ease: "power1.inOut" })
      .to("#finishLine", { rotation: 1.2, scaleY: 0.96, duration: 0.14, ease: "power1.inOut" })
      .to("#finishLine", { rotation: 0, scaleY: 1, duration: 0.5, ease: "elastic.out(1, 0.3)" });

    ScrollTrigger.create({
      trigger: "#finishLine",
      start: "top 70%",
      onEnter: () => wiggle.restart(),
      onEnterBack: () => wiggle.restart(),
    });

    return () => {}; // matchMedia handles cleanup
  }
);

/* Recalculate positions once fonts/layout settle */
window.addEventListener("load", () => ScrollTrigger.refresh());
