/**
 * violin-3d.js
 * Blender에서 export한 바이올린(assets/violin.glb)을 #violin-3d-container에 불러오고,
 * 예전 SVG 바이올린이 갖고 있던 인터랙션을 그대로 재현합니다:
 *   - G/D/A 줄 hover 시 glow
 *   - 클릭 시 해당 줄 음 재생 + resonance 전환 트리거
 *   - hover한 줄 위로 활이 이동, hover 없으면 원래 위치로 복귀
 *
 * script.js에 이미 있는 전역 함수(window.selectString, window.highlightString)를
 * 그대로 호출하기 때문에 script.js는 따로 수정할 필요 없습니다.
 */

import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const container = document.getElementById("violin-3d-container");

// ── 씬 / 카메라 / 렌더러 설정 ─────────────────────────────────────
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  35,
  container.clientWidth / container.clientHeight,
  0.1,
  100
);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
container.appendChild(renderer.domElement);

// ── 조명 (따뜻한 메인 라이트 + 차가운 림 라이트) ──────────────────
scene.add(new THREE.AmbientLight(0xffe8c8, 0.55));

const key = new THREE.DirectionalLight(0xffe8c8, 1.6);
key.position.set(2, 3, 2);
scene.add(key);

const rim = new THREE.DirectionalLight(0x88aaff, 0.5);
rim.position.set(-2, 1, -2);
scene.add(rim);

// ── Blender 오브젝트 이름 → 앱에서 쓰는 "g"/"d"/"a" 키 매핑 ──────
// (E-STRING은 원래 SVG 디자인에서도 장식용이라 인터랙션 대상에서 제외)
const STRING_MESH_NAMES = {
  "A-STRING": "a",
  "D-STRING": "d",
  "G-STRING": "g",
};

const stringMeshes = {}; // "g" | "d" | "a" -> THREE.Mesh
let violinRoot = null;
let bowMesh = null;

// ── 모델 로드 ──────────────────────────────────────────────────
const loader = new GLTFLoader();
loader.load(
  "assets/violin.glb",
  (gltf) => {
    violinRoot = gltf.scene;
    scene.add(violinRoot);

    violinRoot.traverse((obj) => {
      if (!obj.isMesh) return;

      const key = STRING_MESH_NAMES[obj.name];
      if (key) {
        obj.userData.stringKey = key;

        // 줄들이 머티리얼을 공유하고 있을 수 있어서, 복제해서 각자
        // 독립적으로 hover glow를 줄 수 있게 함
        if (obj.material) {
          obj.material = obj.material.clone();
        }
        if (obj.material && !obj.material.emissive) {
          obj.material.emissive = new THREE.Color(0x000000);
        }
        obj.userData.baseEmissiveIntensity = obj.material?.emissiveIntensity ?? 0;
        stringMeshes[key] = obj;
        return;
      }

      if (/bow/i.test(obj.name)) {
        bowMesh = obj;
      }
    });

    frameObject(violinRoot);
    setupBowFollow();
  },
  undefined,
  (err) => {
    console.error("Could not load assets/violin.glb —", err);
  }
);

// ── 모델을 화면 중앙에 맞추고 카메라 각도/거리 설정 ────────────────
function frameObject(object) {
  const box = new THREE.Box3().setFromObject(object);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());

  object.position.sub(center);
  object.rotation.z = THREE.MathUtils.degToRad(-45);
  object.rotation.y = THREE.MathUtils.degToRad(-125);

  const maxDim = Math.max(size.x, size.y, size.z);
  const distance = maxDim * 1.6;
  camera.position.set(0, maxDim * 0.05, distance);
  camera.lookAt(0, 0, 0);
}

// ── 활(bow) 관련 상태값 ────────────────────────────────────────
const bowTarget = new THREE.Vector3();
const bowRestPosition = new THREE.Vector3();
let bowRange = null;
let prevBowTarget = new THREE.Vector3();
const stringBowPoints = {}; // "g" | "d" | "a" -> hover 시 활이 이동할 좌표
let bowBaseRotationZ = 0;
let currentTiltZ = 0;

// ── 활 hover-follow 세팅 (위치, 회전, 항상 앞에 그리기, 줄별 좌표) ──
function setupBowFollow() {
  if (!bowMesh) {
    console.warn('No object with "bow" in its name was found in violin.glb');
    return;
  }

  scene.attach(bowMesh);

  // 활을 항상 맨 위 레이어로 그리기 (깊이 판정 무시)
  bowMesh.renderOrder = 999;
  const bowMaterials = Array.isArray(bowMesh.material) ? bowMesh.material : [bowMesh.material];
  bowMaterials.forEach((mat) => {
    if (!mat) return;
    mat.depthTest = false;
    mat.depthWrite = false;
  });

  // 활의 기본 각도 (여기 숫자로 조절)
  const BOW_ROTATION_OFFSET = { x: 0, y: 60, z: 0 };
  bowMesh.rotation.x += THREE.MathUtils.degToRad(BOW_ROTATION_OFFSET.x);
  bowMesh.rotation.y += THREE.MathUtils.degToRad(BOW_ROTATION_OFFSET.y);
  bowMesh.rotation.z += THREE.MathUtils.degToRad(BOW_ROTATION_OFFSET.z);
  bowBaseRotationZ = bowMesh.rotation.z;

  bowRestPosition.copy(bowMesh.position);
  bowTarget.copy(bowRestPosition);
  prevBowTarget.copy(bowRestPosition);

  const box = new THREE.Box3().setFromObject(violinRoot);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());
  bowRange = { size, center };

  const strY = (key) => {
    const strBox = new THREE.Box3().setFromObject(stringMeshes[key]);
    return strBox.getCenter(new THREE.Vector3()).y;
  };

  // G → 왼쪽, D → 가운데, A → 오른쪽 (SPREAD로 좌우 폭 조절)
  const SPREAD = 0.35;
  const halfWidth = (box.max.x - center.x) * SPREAD;
  stringBowPoints.g = new THREE.Vector3(center.x - halfWidth, strY("g"), bowRestPosition.z);
  stringBowPoints.d = new THREE.Vector3(center.x, strY("d"), bowRestPosition.z);
  stringBowPoints.a = new THREE.Vector3(center.x + halfWidth, strY("a"), bowRestPosition.z);
}

// ── 레이캐스팅 (마우스가 3D 줄 위에 있는지 감지) ───────────────────
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

function updatePointer(event) {
  const rect = renderer.domElement.getBoundingClientRect();
  pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
}

// ── hover 시 glow on/off + 커서 모양 ────────────────────────────
function setHover(mesh, on) {
  if (!mesh) return;
  const stringKey = mesh.userData.stringKey;

  if (typeof window.highlightString === "function") {
    window.highlightString(stringKey, on);
  }

  if (mesh.material?.emissive) {
    mesh.material.emissive.set(on ? 0xe8c547 : 0x000000);
    mesh.material.emissiveIntensity = on ? 1.1 : mesh.userData.baseEmissiveIntensity;
  }

  container.style.cursor = on ? "pointer" : "default";
}

// ── 공용 hover 상태 (3D 캔버스 + HTML 라벨 버튼 둘 다 이 함수로 처리) ──
let hoveredKey = null;

function updateHoveredString(key) {
  if (key === hoveredKey) return;

  setHover(hoveredKey ? stringMeshes[hoveredKey] : null, false);
  setHover(key ? stringMeshes[key] : null, true);
  hoveredKey = key;

  if (bowMesh) {
    bowTarget.copy(key && stringBowPoints[key] ? stringBowPoints[key] : bowRestPosition);
  }
}

renderer.domElement.addEventListener("pointermove", (event) => {
  if (!violinRoot) return;
  updatePointer(event);
  raycaster.setFromCamera(pointer, camera);

  const hits = raycaster.intersectObjects(Object.values(stringMeshes));
  const hit = hits[0]?.object ?? null;
  updateHoveredString(hit ? hit.userData.stringKey : null);
});

renderer.domElement.addEventListener("pointerleave", () => {
  updateHoveredString(null);
});

renderer.domElement.addEventListener("click", () => {
  if (!hoveredKey) return;
  if (typeof window.selectString === "function") {
    window.selectString(hoveredKey);
  }
});

// HTML .string-label 버튼도 3D 줄과 동일하게 hover 연동
document.querySelectorAll(".string-label[data-string]").forEach((label) => {
  const key = label.dataset.string;
  label.addEventListener("mouseenter", () => updateHoveredString(key));
  label.addEventListener("mouseleave", () => {
    if (hoveredKey === key) updateHoveredString(null);
  });
});

// ── 리사이즈 처리 ───────────────────────────────────────────────
window.addEventListener("resize", () => {
  const { clientWidth, clientHeight } = container;
  if (!clientWidth || !clientHeight) return;
  camera.aspect = clientWidth / clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(clientWidth, clientHeight);
});

// ── 렌더 루프 (매 프레임 활 위치/각도 갱신 + 화면 그리기) ───────────
function animate() {
  requestAnimationFrame(animate);

  if (bowMesh) {
    bowMesh.position.lerp(bowTarget, 0.12);

    const velocityX = bowTarget.x - prevBowTarget.x;
    const BOW_TILT_SCALE = 4;
    const MAX_TILT = THREE.MathUtils.degToRad(8);
    const targetTilt = THREE.MathUtils.clamp(
      velocityX * BOW_TILT_SCALE,
      -MAX_TILT,
      MAX_TILT
    );
    currentTiltZ = THREE.MathUtils.lerp(currentTiltZ, targetTilt, 0.1);
    bowMesh.rotation.z = bowBaseRotationZ + currentTiltZ;
    prevBowTarget.copy(bowTarget);
  }

  renderer.render(scene, camera);
}
animate();