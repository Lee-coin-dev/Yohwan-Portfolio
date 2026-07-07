import * as THREE from "three";
import { createFaceTextures, FACE_LABELS, FACE_HINTS } from "./textures.js";
import { FACE_LINKS } from "./symbols.js";

const VERTICES = {
  apex: new THREE.Vector3(0, 1, 0),
  base1: new THREE.Vector3(0, -1 / 3, (2 * Math.sqrt(2)) / 3),
  base2: new THREE.Vector3(-Math.sqrt(3) / 2, -1 / 3, -Math.sqrt(2) / 6),
  base3: new THREE.Vector3(Math.sqrt(3) / 2, -1 / 3, -Math.sqrt(2) / 6),
};

const FACES = [
  { key: "west", verts: [VERTICES.apex, VERTICES.base1, VERTICES.base2] },
  { key: "middleEast", verts: [VERTICES.apex, VERTICES.base2, VERTICES.base3] },
  { key: "east", verts: [VERTICES.apex, VERTICES.base3, VERTICES.base1] },
  { key: "identity", verts: [VERTICES.base1, VERTICES.base3, VERTICES.base2] },
];

const DRAG_THRESHOLD = 8;

function ensureOutwardWinding(vertices) {
  const tri = new THREE.Triangle(vertices[0], vertices[1], vertices[2]);
  const normal = new THREE.Vector3();
  tri.getNormal(normal);

  const centroid = new THREE.Vector3();
  vertices.forEach((v) => centroid.add(v));
  centroid.divideScalar(3);

  if (normal.dot(centroid) < 0) {
    return [vertices[0], vertices[2], vertices[1]];
  }

  return vertices;
}

function inflateVertices(vertices, amount = 0.015) {
  const ordered = ensureOutwardWinding(vertices);
  const tri = new THREE.Triangle(ordered[0], ordered[1], ordered[2]);
  const normal = new THREE.Vector3();
  tri.getNormal(normal);

  return ordered.map((v) => v.clone().add(normal.clone().multiplyScalar(amount)));
}

function createFaceMesh(vertices, canvas, key) {
  const inflated = inflateVertices(vertices);
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(9);
  const uvs = new Float32Array(6);

  inflated.forEach((v, i) => {
    positions[i * 3] = v.x;
    positions[i * 3 + 1] = v.y;
    positions[i * 3 + 2] = v.z;
  });

  uvs.set([0.5, 1, 0, 0, 1, 0]);

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
  geometry.computeVertexNormals();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.premultiplyAlpha = false;

  const material = new THREE.MeshStandardMaterial({
    map: texture,
    roughness: 0.82,
    metalness: 0.02,
    flatShading: true,
    transparent: false,
    opacity: 1,
    depthWrite: true,
    depthTest: true,
    emissive: new THREE.Color(0x000000),
    emissiveIntensity: 0,
    side: THREE.FrontSide,
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.userData.faceKey = key;
  mesh.renderOrder = 1;
  return mesh;
}

function createFaceOutline(vertices) {
  const ordered = ensureOutwardWinding(vertices);
  const loop = [...ordered, ordered[0]];
  const geometry = new THREE.BufferGeometry().setFromPoints(loop);
  const material = new THREE.LineBasicMaterial({
    color: 0xd4e2f0,
    transparent: true,
    opacity: 0.92,
  });

  return new THREE.Line(geometry, material);
}

function createEdgeLines() {
  const edges = [
    [VERTICES.apex, VERTICES.base1],
    [VERTICES.apex, VERTICES.base2],
    [VERTICES.apex, VERTICES.base3],
    [VERTICES.base1, VERTICES.base2],
    [VERTICES.base2, VERTICES.base3],
    [VERTICES.base3, VERTICES.base1],
  ];

  const group = new THREE.Group();

  edges.forEach(([a, b]) => {
    const core = new THREE.BufferGeometry().setFromPoints([a.clone(), b.clone()]);
    const halo = new THREE.BufferGeometry().setFromPoints([
      a.clone().multiplyScalar(1.004),
      b.clone().multiplyScalar(1.004),
    ]);

    group.add(new THREE.Line(core, new THREE.LineBasicMaterial({
      color: 0x1a2535,
      transparent: true,
      opacity: 0.95,
    })));

    group.add(new THREE.Line(halo, new THREE.LineBasicMaterial({
      color: 0xc8d8ea,
      transparent: true,
      opacity: 0.88,
    })));
  });

  return group;
}

function createApexGlow() {
  const geometry = new THREE.SphereGeometry(0.028, 12, 12);
  const material = new THREE.MeshBasicMaterial({
    color: 0xb4c8e6,
    transparent: true,
    opacity: 0.7,
  });
  const glow = new THREE.Mesh(geometry, material);
  glow.position.copy(VERTICES.apex.clone().multiplyScalar(1.015));

  const light = new THREE.PointLight(0xaac0e0, 0.7, 2);

  const group = new THREE.Group();
  group.add(glow);
  group.add(light);
  return group;
}

function createParticles(count = 120) {
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 8;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 6 - 2;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    color: 0x6a8099,
    size: 0.015,
    transparent: true,
    opacity: 0.35,
    depthWrite: false,
  });

  return new THREE.Points(geometry, material);
}

export class TetrahedronScene {
  constructor(canvas) {
    this.canvas = canvas;
    this.faceMeshes = [];
    this.hoveredFace = null;
    this.isDragging = false;
    this.hasDragged = false;
    this.dragStart = { x: 0, y: 0 };
    this.rotation = { x: 0.25, y: 0 };
    this.autoRotateSpeed = 0.15;
    this.targetTilt = { x: 0, y: 0 };
    this.currentTilt = { x: 0, y: 0 };
    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();
    this.reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    this.ready = this.init();
  }

  async init() {
    this.scene = new THREE.Scene();
    this.scene.background = null;

    this.camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    this.camera.position.set(0, 0.08, 3.15);
    this.camera.lookAt(0, 0, 0);

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;
    this.renderer.sortObjects = true;

    this.tetraGroup = new THREE.Group();
    this.scene.add(this.tetraGroup);

    const textures = await createFaceTextures();
    FACES.forEach(({ key, verts }) => {
      const mesh = createFaceMesh(verts, textures[key], key);
      this.faceMeshes.push(mesh);
      this.tetraGroup.add(mesh);
      this.tetraGroup.add(createFaceOutline(verts));
    });

    this.tetraGroup.add(createEdgeLines());
    this.tetraGroup.add(createApexGlow());
    this.scene.add(createParticles(60));

    const ambient = new THREE.AmbientLight(0x304060, 0.6);
    const keyLight = new THREE.DirectionalLight(0xc0d4f0, 1.1);
    keyLight.position.set(2, 3, 4);
    const fillLight = new THREE.DirectionalLight(0x406080, 0.4);
    fillLight.position.set(-3, 1, 2);

    this.scene.add(ambient, keyLight, fillLight);
    this.resize();
    this.bindEvents();
    this.animate();
  }

  bindEvents() {
    this.onPointerDown = this.handlePointerDown.bind(this);
    this.onPointerMove = this.handlePointerMove.bind(this);
    this.onPointerUp = this.handlePointerUp.bind(this);
    this.onResize = this.resize.bind(this);

    this.canvas.addEventListener("pointerdown", this.onPointerDown);
    window.addEventListener("pointermove", this.onPointerMove);
    window.addEventListener("pointerup", this.onPointerUp);
    window.addEventListener("resize", this.onResize);
  }

  handlePointerDown(event) {
    this.isDragging = true;
    this.hasDragged = false;
    this.dragStart = { x: event.clientX, y: event.clientY };
    this.canvas.setPointerCapture(event.pointerId);
  }

  handlePointerMove(event) {
    const rect = this.canvas.getBoundingClientRect();
    this.pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    this.targetTilt.x = this.pointer.y * 0.04;
    this.targetTilt.y = this.pointer.x * 0.04;

    if (this.isDragging) {
      const deltaX = event.clientX - this.dragStart.x;
      const deltaY = event.clientY - this.dragStart.y;

      if (Math.hypot(deltaX, deltaY) > DRAG_THRESHOLD) {
        this.hasDragged = true;
      }

      this.rotation.y += deltaX * 0.008;
      this.rotation.x += deltaY * 0.008;
      this.rotation.x = THREE.MathUtils.clamp(this.rotation.x, -0.55, 0.55);
      this.dragStart = { x: event.clientX, y: event.clientY };
    }

    this.updateHover();
  }

  handlePointerUp(event) {
    if (!this.hasDragged && this.hoveredFace) {
      const key = this.hoveredFace.userData.faceKey;
      const link = FACE_LINKS[key];

      if (link) {
        window.location.href = link;
      }
    }

    this.isDragging = false;
    if (this.canvas.hasPointerCapture(event.pointerId)) {
      this.canvas.releasePointerCapture(event.pointerId);
    }
  }

  updateHover() {
    this.raycaster.setFromCamera(this.pointer, this.camera);
    const intersects = this.raycaster.intersectObjects(this.faceMeshes);

    const nextFace = intersects.length > 0 ? intersects[0].object : null;

    if (nextFace !== this.hoveredFace) {
      if (this.hoveredFace) {
        this.setFaceHighlight(this.hoveredFace, false);
      }
      this.hoveredFace = nextFace;

      if (this.hoveredFace) {
        const key = this.hoveredFace.userData.faceKey;
        this.setFaceHighlight(this.hoveredFace, true);
        this.onFaceHover?.(FACE_LABELS[key], FACE_HINTS[key], Boolean(FACE_LINKS[key]));
      } else {
        this.onFaceHover?.(null, null, false);
      }
    }
  }

  setFaceHighlight(mesh, active) {
    mesh.material.emissive.set(active ? 0x2a3a52 : 0x000000);
    mesh.material.emissiveIntensity = active ? 0.22 : 0;
    mesh.material.roughness = active ? 0.68 : 0.78;
  }

  focusFace(key) {
    const rotations = {
      west: { x: 0.3, y: 0.6 },
      middleEast: { x: 0.3, y: 2.6 },
      east: { x: 0.3, y: 4.7 },
      identity: { x: -1.2, y: 0 },
    };

    const target = rotations[key] || { x: 0.25, y: 0 };
    this.rotation.x = target.x;
    this.rotation.y = target.y;
  }

  resize() {
    const parent = this.canvas.parentElement;
    const width = parent.clientWidth;
    const height = parent.clientHeight;

    if (width === 0 || height === 0) return;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height, false);
  }

  animate() {
    this.animationId = requestAnimationFrame(() => this.animate());

    if (!this.isDragging && !this.reducedMotion) {
      this.rotation.y += this.autoRotateSpeed * 0.005;
    }

    this.currentTilt.x += (this.targetTilt.x - this.currentTilt.x) * 0.06;
    this.currentTilt.y += (this.targetTilt.y - this.currentTilt.y) * 0.06;

    this.tetraGroup.rotation.x = this.rotation.x + this.currentTilt.x;
    this.tetraGroup.rotation.y = this.rotation.y + this.currentTilt.y;

    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  }

  dispose() {
    cancelAnimationFrame(this.animationId);
    this.canvas.removeEventListener("pointerdown", this.onPointerDown);
    window.removeEventListener("pointermove", this.onPointerMove);
    window.removeEventListener("pointerup", this.onPointerUp);
    window.removeEventListener("resize", this.onResize);
    this.renderer?.dispose();
  }
}

export async function createTetrahedronScene(canvas) {
  const scene = new TetrahedronScene(canvas);
  await scene.ready;
  return scene;
}
