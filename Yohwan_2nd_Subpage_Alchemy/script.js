/* =========================================================
   John's Hub — Interactive Alchemy Journey
   Animation + flow controller (GSAP)
   ========================================================= */

const scenes = Array.from(document.querySelectorAll('.scene'));
const stageNavBtns = Array.from(document.querySelectorAll('[data-nav-scene]'));
const flash = document.getElementById('flash');
const zoomText = document.getElementById('zoom-text');

let current = -1;
let busy = false;

function updateStageNav(index) {
  stageNavBtns.forEach((btn) => {
    btn.classList.toggle('is-active', Number(btn.dataset.navScene) === index);
  });
}

/* ---------- Scene navigation ---------- */
function showScene(index, { withFlash = true } = {}) {
  if (index === current || busy) return;
  busy = true;

  const enter = () => {
    scenes.forEach((s, i) => s.classList.toggle('active', i === index));
    updateStageNav(index);
    current = index;
    initScene(index);
    busy = false;
  };

  if (withFlash) {
    gsap.timeline()
      .to(flash, { opacity: 0.85, duration: 0.28, ease: 'power2.in' })
      .add(enter)
      .to(flash, { opacity: 0, duration: 0.55, ease: 'power2.out' });
  } else {
    enter();
  }
}

/* ---------- Per-scene entrance animations ---------- */
function initScene(index) {
  switch (index) {
    case 0: animateLab(); break;
    case 1: animatePrep(); break;
    case 2: animateReactionSetup(); break;
    case 3: animateTransformation(); break;
    case 4: animateGold(); break;
    case 5: animateMeaning(); break;
  }
}

/* ===================== SECTION 1 ===================== */
function animateLab() {
  gsap.from('#scene-1 .hub-title', { y: -40, opacity: 0, duration: 1, ease: 'power3.out' });
  gsap.from('#scene-1 .flask-rig', { y: 60, opacity: 0, duration: 1.1, delay: 0.2, ease: 'power3.out' });
  gsap.from('#scene-1 .alch-symbol', { opacity: 0, scale: 0.5, stagger: 0.12, duration: 0.8, delay: 0.4 });
  gsap.fromTo('#scene-1 .hint-1', { opacity: 0 }, { opacity: 0.7, duration: 1, delay: 1.4 });
}

document.getElementById('hotspot-clay').addEventListener('click', () => {
  if (busy) return;
  // Camera zoom toward clay + text
  gsap.timeline()
    .to('#flask-rig-1', { scale: 1.6, y: '+=4vh', duration: 1.1, ease: 'power2.inOut' })
    .to('#scene-1 .lab-environment, #scene-1 .hub-title, #scene-1 .hint-1',
        { opacity: 0, duration: 0.7 }, '<0.2')
    .fromTo(zoomText, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.6 }, '<')
    .to(zoomText, { opacity: 0, duration: 0.5, delay: 0.7 })
    .add(() => {
      gsap.set('#flask-rig-1', { scale: 1, clearProps: 'transform' });
      showScene(1);
    });
});

/* ===================== SECTION 2 ===================== */
function animatePrep() {
  gsap.from('#flask-rig-2', { scale: 1.0, opacity: 0, duration: 0.9, ease: 'power2.out' });
  gsap.fromTo('#scene-2 .hint-2', { opacity: 0 }, { opacity: 0.7, duration: 1, delay: 0.8 });
  document.getElementById('material-panel').classList.remove('show');
}

document.getElementById('hotspot-add').addEventListener('click', () => {
  const panel = document.getElementById('material-panel');
  panel.classList.add('show');
  gsap.fromTo(panel,
    { x: 40, opacity: 0 },
    { x: 0, opacity: 1, duration: 0.6, ease: 'back.out(1.5)' });
  gsap.from('#material-panel .mat', { x: 30, opacity: 0, stagger: 0.12, duration: 0.5, delay: 0.15 });
  gsap.to('#hotspot-add', { scale: 1.4, opacity: 0, duration: 0.5 });
});

document.getElementById('btn-pour').addEventListener('click', () => {
  if (busy) return;
  showScene(2);
});

/* ===================== SECTION 3 ===================== */
function animateReactionSetup() {
  const tl = gsap.timeline();
  // reset
  gsap.set('#scene-3 .fluid-green', { attr: { height: 0, y: 280 } });
  gsap.set('#scene-3 .fluid-blue', { attr: { height: 0, y: 280 } });
  gsap.set('#scene-3 .stone-floating', { opacity: 0, y: -40 });
  gsap.set('#thermo .thermo-fill', { height: '0%' });
  document.querySelector('#thermo .thermo-read').textContent = '25°C';
  document.getElementById('btn-heat').classList.remove('firing');

  tl.from('#flask-rig-3', { opacity: 0, duration: 0.6 })
    // Step 1 — green liquid pours
    .to('#scene-3 .fluid-green', { attr: { height: 70, y: 210 }, duration: 1.1, ease: 'power1.inOut' }, '+=0.2')
    // Step 2 — blue cryo enters
    .to('#scene-3 .fluid-blue', { attr: { height: 45, y: 235 }, duration: 1.0, ease: 'power1.inOut' }, '+=0.2')
    // Step 3 — philosopher's stone descends
    .to('#scene-3 .stone-floating', { opacity: 1, y: 0, duration: 1.0, ease: 'bounce.out' }, '+=0.1')
    .add(() => spawnBubbles())
    .fromTo('#btn-heat', { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 0.55, ease: 'back.out(1.4)' })
    .fromTo('#scene-3 .hint-3', { opacity: 0 }, { opacity: 0.7, duration: 0.6 }, '<');

  // gentle floating of the stone
  gsap.to('#scene-3 .stone-floating', { y: '-=8', duration: 2, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 3 });
}

function spawnBubbles() {
  const group = document.querySelector('#scene-3 .bubbles');
  if (!group || group.childElementCount) return;
  for (let i = 0; i < 10; i++) {
    const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    const cx = 60 + Math.random() * 80;
    c.setAttribute('cx', cx);
    c.setAttribute('cy', 250);
    c.setAttribute('r', 1.5 + Math.random() * 3);
    c.setAttribute('fill', 'rgba(255,255,255,0.5)');
    group.appendChild(c);
    gsap.to(c, {
      attr: { cy: 150 + Math.random() * 30 },
      opacity: 0, duration: 2 + Math.random() * 2, repeat: -1,
      delay: Math.random() * 2, ease: 'sine.in'
    });
  }
}

document.getElementById('btn-heat').addEventListener('click', () => {
  if (busy) return;
  const btn = document.getElementById('btn-heat');
  btn.classList.add('firing');
  const read = document.querySelector('#thermo .thermo-read');
  const steps = [50, 150, 250, 350, 450];
  const obj = { t: 25 };

  const tl = gsap.timeline();
  steps.forEach((target, i) => {
    tl.to(obj, {
      t: target, duration: 0.5,
      ease: 'none',
      onUpdate: () => {
        read.textContent = Math.round(obj.t) + '°C';
        gsap.set('#thermo .thermo-fill', { height: (obj.t / 450 * 100) + '%' });
      }
    }, i === 0 ? 0 : '>');
  });

  tl.add(() => {
    // at 450°C: vibrate + glow
    gsap.to('#flask-rig-3 .flask', { x: '+=2', duration: 0.05, repeat: 18, yoyo: true });
    gsap.to('#scene-3 .clay-sphere', { fill: '#fff2b0', duration: 0.6 });
  })
  .to('#flask-rig-3', { filter: 'drop-shadow(0 0 40px #B14CFF)', duration: 0.8 })
  .add(() => showScene(3), '+=0.8');
});

/* ===================== SECTION 4 ===================== */
function animateTransformation() {
  gsap.set('#vortex', { opacity: 1 });
  gsap.set('#info-4', { opacity: 0, scale: 0.85, y: 20 });

  const tl = gsap.timeline();
  // explosion / spiral vortex
  tl.fromTo('.vortex-ring, .vortex-core',
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.0, stagger: 0.12, ease: 'power3.out' })
    .to('.r-green', { rotation: 360, duration: 6, repeat: -1, ease: 'none' }, '<')
    .to('.r-purple', { rotation: -360, duration: 5, repeat: -1, ease: 'none' }, '<')
    .to('.vortex-core', { scale: 1.4, duration: 1.5, yoyo: true, repeat: -1, ease: 'sine.inOut' }, '<')
    // fade vortex back, reveal info bubble
    .to('#vortex', { opacity: 0.35, duration: 1.0 }, '+=0.6')
    .to('#info-4', { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'back.out(1.4)' }, '<0.2')
    .from('#info-4 .mirage-eras li', { y: 12, opacity: 0, stagger: 0.08, duration: 0.4 }, '<0.3')
    .from('#info-4 .mirage-actions', { y: 10, opacity: 0, duration: 0.4 }, '<0.2');
}

document.getElementById('btn-final-product').addEventListener('click', () => showScene(4));

/* ===================== SECTION 5 ===================== */
function animateGold() {
  gsap.fromTo('#gold-stage',
    { scale: 0.4, opacity: 0, y: 30 },
    { scale: 1, opacity: 1, y: 0, duration: 1.2, ease: 'back.out(1.5)' });
  gsap.from('#scene-5 .debris .shard', { opacity: 0, scale: 0, stagger: 0.1, duration: 0.6, delay: 0.4 });
  gsap.fromTo('#scene-5 .hint-5', { opacity: 0 }, { opacity: 0.7, duration: 1, delay: 1.2 });
  // sparkle bursts
  burstSparkles();
}

function burstSparkles() {
  const stage = document.getElementById('gold-stage');
  for (let i = 0; i < 14; i++) {
    const s = document.createElement('span');
    s.style.cssText = `position:absolute;width:4px;height:4px;border-radius:50%;
      background:#fff6cf;box-shadow:0 0 8px #ffe75e;pointer-events:none;left:50%;top:50%;`;
    stage.appendChild(s);
    gsap.fromTo(s,
      { x: 0, y: 0, opacity: 1, scale: 1 },
      {
        x: (Math.random() - 0.5) * 360,
        y: (Math.random() - 0.5) * 280,
        opacity: 0, scale: 0,
        duration: 1.2 + Math.random(),
        delay: Math.random() * 2,
        repeat: -1, ease: 'power2.out'
      });
  }
}

document.getElementById('hotspot-gold').addEventListener('click', () => {
  if (busy) return;
  gsap.timeline()
    .to('#gold-stage', { scale: 1.25, duration: 0.5, ease: 'power2.in' })
    .to('.lens-flare', { scale: 2, opacity: 0, duration: 0.5 }, '<')
    .add(() => showScene(5));
});

/* ===================== SECTION 6 ===================== */
function animateMeaning() {
  gsap.fromTo('#info-6',
    { opacity: 0, scale: 0.9, y: 24 },
    { opacity: 1, scale: 1, y: 0, duration: 0.9, ease: 'back.out(1.3)' });
  gsap.from('#info-6 .gold-tags li', { y: 12, opacity: 0, stagger: 0.08, duration: 0.4, delay: 0.35 });
  gsap.from('#info-6 .gold-actions', { y: 10, opacity: 0, duration: 0.4, delay: 0.5 });
}

document.getElementById('btn-restart').addEventListener('click', () => {
  // restart the loop
  showScene(0);
});

/* ---------- top / stage navigation ---------- */
stageNavBtns.forEach((btn) => {
  btn.addEventListener('click', () => showScene(Number(btn.dataset.navScene)));
});

const alchemyHome = document.querySelector('[data-nav="alchemy"]');
if (alchemyHome) {
  alchemyHome.addEventListener('click', (e) => {
    e.preventDefault();
    showScene(0);
  });
}

/* =========================================================
   FLOATING DUST PARTICLES (shared ambient canvas)
   ========================================================= */
(function dust() {
  const canvas = document.getElementById('dust-canvas');
  const ctx = canvas.getContext('2d');
  let w, h, motes = [];

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  const COUNT = Math.min(90, Math.floor(window.innerWidth / 14));
  for (let i = 0; i < COUNT; i++) {
    motes.push({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 1.8 + 0.4,
      vx: (Math.random() - 0.5) * 0.25,
      vy: -(Math.random() * 0.35 + 0.1),
      a: Math.random() * 0.5 + 0.15,
      hue: Math.random() > 0.8 ? 'rgba(174,239,255,' : 'rgba(212,175,55,'
    });
  }

  function tick() {
    ctx.clearRect(0, 0, w, h);
    for (const m of motes) {
      m.x += m.vx; m.y += m.vy;
      if (m.y < -5) { m.y = h + 5; m.x = Math.random() * w; }
      if (m.x < -5) m.x = w + 5; if (m.x > w + 5) m.x = -5;
      ctx.beginPath();
      ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
      ctx.fillStyle = m.hue + m.a + ')';
      ctx.shadowBlur = 6; ctx.shadowColor = m.hue + '0.6)';
      ctx.fill();
    }
    requestAnimationFrame(tick);
  }
  tick();
})();

/* ---------- keyboard nav (prototype convenience) ---------- */
window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') showScene(Math.min(current + 1, scenes.length - 1));
  if (e.key === 'ArrowLeft') showScene(Math.max(current - 1, 0));
});

/* ---------- boot ---------- */
showScene(0, { withFlash: false });
