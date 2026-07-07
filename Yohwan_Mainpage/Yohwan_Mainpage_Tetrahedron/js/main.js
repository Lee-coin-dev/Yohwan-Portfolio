import { createTetrahedronScene } from "./tetrahedron.js";

const canvas = document.getElementById("tetrahedron-canvas");
const faceLabel = document.getElementById("face-label");
const discoverBtn = document.querySelector(".content__discover");

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const scene = await createTetrahedronScene(canvas);

scene.onFaceHover = (label, hint, isClickable) => {
  if (label) {
    faceLabel.textContent = isClickable ? `${label} · ${hint}` : label;
    faceLabel.classList.add("is-visible");
    canvas.style.cursor = isClickable ? "pointer" : "grab";
  } else {
    faceLabel.classList.remove("is-visible");
    canvas.style.cursor = "grab";
  }
};

const introTargets = [
  ".content__title",
  ".content__subtitle",
  ".content__dots",
  ".content__tagline",
  ".content__discover",
  ".canvas-panel__hint",
];

if (!reducedMotion) {
  gsap.timeline({ defaults: { ease: "power3.out" } })
    .to(".content__title", { opacity: 1, y: 0, duration: 1.2 })
    .to(".content__subtitle", { opacity: 1, y: 0, duration: 0.9 }, "-=0.7")
    .to(".content__dots", { opacity: 1, y: 0, duration: 0.7 }, "-=0.55")
    .to(".content__tagline", { opacity: 1, y: 0, duration: 0.9 }, "-=0.45")
    .to(".content__discover", { opacity: 1, y: 0, duration: 0.8 }, "-=0.35")
    .to(".canvas-panel__hint", { opacity: 0.55, duration: 0.8 }, "-=0.3");
} else {
  gsap.set(introTargets, { opacity: 1, y: 0 });
  gsap.set(".canvas-panel__hint", { opacity: 0.55 });
}

const discoverSequence = ["west", "middleEast", "east"];
let discoverIndex = 0;

discoverBtn.addEventListener("click", () => {
  const key = discoverSequence[discoverIndex];
  discoverIndex = (discoverIndex + 1) % discoverSequence.length;

  if (reducedMotion) {
    scene.focusFace(key);
    return;
  }

  const rotations = {
    west: { x: 0.3, y: 0.6 },
    middleEast: { x: 0.3, y: 2.6 },
    east: { x: 0.3, y: 4.7 },
  };

  const target = rotations[key];

  gsap.to(scene.rotation, {
    x: target.x,
    y: target.y,
    duration: 1.4,
    ease: "power2.inOut",
    onUpdate: () => {
      scene.tetraGroup.rotation.x = scene.rotation.x + scene.currentTilt.x;
      scene.tetraGroup.rotation.y = scene.rotation.y + scene.currentTilt.y;
    },
  });
});
