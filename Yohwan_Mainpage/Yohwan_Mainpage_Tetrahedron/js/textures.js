import {
  VIOLIN_SVG,
  FLASK_SVG,
  BOAT_SVG,
  IDENTITY_SVG,
} from "./symbols.js";

const SIZE = 512;
const FACE_INSET = 0.1;

function svgToImage(svgString) {
  return new Promise((resolve, reject) => {
    const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const img = new Image();

    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load symbol SVG"));
    };
    img.src = url;
  });
}

function clipFaceTriangle(ctx) {
  const pad = SIZE * FACE_INSET;
  ctx.beginPath();
  ctx.moveTo(SIZE / 2, pad);
  ctx.lineTo(pad, SIZE - pad);
  ctx.lineTo(SIZE - pad, SIZE - pad);
  ctx.closePath();
  ctx.clip();
}

function drawSymbolCentered(ctx, img, boxScale) {
  const box = SIZE * boxScale;
  const cx = SIZE / 2;
  const cy = SIZE * 0.57;
  const aspect = img.naturalWidth / img.naturalHeight;

  let drawW = box;
  let drawH = box;

  if (aspect > 1) {
    drawH = box / aspect;
  } else {
    drawW = box * aspect;
  }

  ctx.drawImage(img, cx - drawW / 2, cy - drawH / 2, drawW, drawH);
}

function forceOpaqueCanvas(ctx) {
  const imageData = ctx.getImageData(0, 0, SIZE, SIZE);
  const data = imageData.data;

  for (let i = 3; i < data.length; i += 4) {
    data[i] = 255;
  }

  ctx.putImageData(imageData, 0, 0);
}

async function createFaceTexture(color, svgString, options = {}) {
  const { isIdentity = false, symbolScale = 0.56 } = options;
  const canvas = document.createElement("canvas");
  canvas.width = SIZE;
  canvas.height = SIZE;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = color;
  ctx.fillRect(0, 0, SIZE, SIZE);

  ctx.save();
  clipFaceTriangle(ctx);

  ctx.fillStyle = color;
  ctx.fillRect(0, 0, SIZE, SIZE);

  if (svgString) {
    const img = await svgToImage(svgString);
    drawSymbolCentered(ctx, img, symbolScale);
  }

  ctx.restore();

  drawFaceBorder(ctx, isIdentity);
  forceOpaqueCanvas(ctx);

  return canvas;
}

function drawFaceBorder(ctx, isIdentity = false) {
  const cx = SIZE / 2;
  const pad = SIZE * FACE_INSET;

  ctx.save();
  ctx.lineJoin = "miter";

  ctx.strokeStyle = isIdentity ? "#8fa8c4" : "#dce8f4";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(cx, pad);
  ctx.lineTo(pad, SIZE - pad);
  ctx.lineTo(SIZE - pad, SIZE - pad);
  ctx.closePath();
  ctx.stroke();

  ctx.strokeStyle = isIdentity ? "#3a4d66" : "#1e2a3a";
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.restore();
}

export const FACE_COLORS = {
  west: "#7D2238",
  middleEast: "#C9962A",
  east: "#5CA3F5",
  identity: "#0B1830",
};

export const FACE_LABELS = {
  west: "West — String Pathway",
  middleEast: "Middle East — Alchemy Journey",
  east: "East — Rowing Portfolio",
  identity: "Identity — Convergence",
};

export const FACE_HINTS = {
  west: "Click to explore the violin",
  middleEast: "Click to enter the laboratory",
  east: "Click to row the course",
  identity: "Where three worlds converge",
};

export async function createFaceTextures() {
  const [west, middleEast, east, identity] = await Promise.all([
    createFaceTexture(FACE_COLORS.west, VIOLIN_SVG, { symbolScale: 0.5 }),
    createFaceTexture(FACE_COLORS.middleEast, FLASK_SVG, { symbolScale: 0.46 }),
    createFaceTexture(FACE_COLORS.east, BOAT_SVG, { symbolScale: 0.48 }),
    createFaceTexture(FACE_COLORS.identity, IDENTITY_SVG, { isIdentity: true, symbolScale: 0.42 }),
  ]);

  return { west, middleEast, east, identity };
}
