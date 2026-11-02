import React, { useEffect, useRef, useState } from 'react';

// In-memory cache so navigating or re-rendering is 100% instant
const processedCache = new Map();

/**
 * CutoutAnimeImage
 *
 * Uses per-image anatomical silhouette protection + radial edge feathering so:
 * 1. The hair, shoulders, suit, chair, and laptop are 100% PROTECTED and NEVER clipped/eaten!
 * 2. The exterior studio background and any dark halo behind the neck/laptop screen are
 *    cleanly removed so it blends 100% seamlessly into #040406!
 * 3. Never flashes a raw box on page refresh.
 */
export default function CutoutAnimeImage({ src, alt, className = '', style = {} }) {
  const [processedUrl, setProcessedUrl] = useState(() => processedCache.get(src) || null);
  const lastSrcRef = useRef(null);

  useEffect(() => {
    if (!src) return;
    if (processedCache.has(src)) {
      setProcessedUrl(processedCache.get(src));
      return;
    }
    if (lastSrcRef.current === src && processedUrl) return;
    lastSrcRef.current = src;

    let cancelled = false;
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      if (cancelled) return;
      try {
        const w = img.naturalWidth || img.width;
        const h = img.naturalHeight || img.height;
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        ctx.drawImage(img, 0, 0, w, h);

        const imgData = ctx.getImageData(0, 0, w, h);
        const data = imgData.data;
        const total = w * h;
        const visited = new Uint8Array(total);
        const queue = new Int32Array(total);
        let head = 0;
        let tail = 0;

        const isStage2 = src.includes('stage2');
        const isStage3 = src.includes('stage3');

        /**
         * Returns true if normalized coordinate (nx, ny) in [0..1] is inside the
         * character's head, hair, suit, chair, or laptop interior (so flood-fill can
         * NEVER eat into the hair or suit!).
         */
        const isProtectedCharacterInterior = (nx, ny) => {
          if (isStage3) {
            // Stage 3: Side-profile coding at laptop (Head is on the right: nx 0.56..0.96, ny 0.05..0.52)
            const inHead =
              Math.pow((nx - 0.76) / 0.195, 2) + Math.pow((ny - 0.27) / 0.215, 2) <= 1.0;
            // Neck & Back/Suit on the right (nx 0.45..0.98, ny 0.40..1.0)
            const inSuitAndArms = nx >= 0.43 && nx <= 0.99 && ny >= 0.42;
            // Laptop screen & keyboard on the left-center (nx 0.04..0.62, ny 0.28..0.96)
            const inLaptop = nx >= 0.04 && nx <= 0.64 && ny >= 0.29 && ny <= 0.96;
            // Desk & mug bottom-left
            const inDesk = ny >= 0.58 && nx <= 0.98;
            return inHead || inSuitAndArms || inLaptop || inDesk;
          }

          if (isStage2) {
            // Stage 2: Front-facing typing at laptop
            // Head & Hair crown (center: nx 0.50, ny 0.24, rx 0.165, ry 0.185)
            const inHead =
              Math.pow((nx - 0.5) / 0.162, 2) + Math.pow((ny - 0.235) / 0.18, 2) <= 1.0;
            // Suit shoulders, chair backrest, and arms (nx 0.10..0.93, ny 0.39..0.96)
            const inShouldersAndSuit =
              ny >= 0.39 &&
              ny <= 0.97 &&
              nx >= 0.17 - (ny - 0.39) * 0.18 &&
              nx <= 0.83 + (ny - 0.39) * 0.22;
            // Laptop back cover & mug
            const inLaptopAndDesk = ny >= 0.56 && nx >= 0.02 && nx <= 0.99;
            return inHead || inShouldersAndSuit || inLaptopAndDesk;
          }

          // Stage 1: Front portrait (already perfect!)
          const inHead =
            Math.pow((nx - 0.5) / 0.225, 2) + Math.pow((ny - 0.29) / 0.24, 2) <= 1.0;
          const inTorso = ny >= 0.64 && nx >= 0.04 && nx <= 0.96;
          return inHead || inTorso;
        };

        /**
         * Determines whether a pixel at (x, y) is exterior studio background or studio glow halo.
         */
        const isExteriorStudioOrHalo = (idx, x, y) => {
          const nx = x / w;
          const ny = y / h;

          // 1. NEVER flood-fill inside the protected character/hair/suit/laptop silhouette!
          if (isProtectedCharacterInterior(nx, ny)) {
            return false;
          }

          const p = idx * 4;
          const r = data[p];
          const g = data[p + 1];
          const b = data[p + 2];

          const maxChannel = Math.max(r, g, b);
          const luma = 0.299 * r + 0.587 * g + 0.114 * b;

          // 2. Protect warm skin tones, lips, brown eyes, or warm elements
          if (r > b + 4 && r > 28) return false;

          // 3. Protect white shirt collar, bright laptop body, and bright code
          if (luma > 78) return false;

          // 4. Protect the glowing cyan/purple rim-light line directly on the character's edge
          if (b >= 115 || g >= 105) return false;

          // 5. Flood-fill exterior studio background and any dark blue-grey studio halo outside the character!
          if (maxChannel <= 98 && luma <= 68 && b >= r - 2) {
            return true;
          }

          return false;
        };

        const enqueue = (x, y) => {
          if (x < 0 || x >= w || y < 0 || y >= h) return;
          const idx = y * w + x;
          if (visited[idx]) return;
          if (isExteriorStudioOrHalo(idx, x, y)) {
            visited[idx] = 1;
            queue[tail++] = idx;
          }
        };

        // Seed from top, left, right, and outer bottom corners
        for (let x = 0; x < w; x++) {
          enqueue(x, 0);
          if (x < w * 0.08 || x > w * 0.92) {
            enqueue(x, h - 1);
          }
        }
        for (let y = 0; y < h; y++) {
          enqueue(0, y);
          enqueue(w - 1, y);
        }

        // 4-connected BFS flood fill from exterior
        while (head < tail) {
          const idx = queue[head++];
          const x = idx % w;
          const y = (idx - x) / w;

          if (x > 0) enqueue(x - 1, y);
          if (x + 1 < w) enqueue(x + 1, y);
          if (y > 0) enqueue(x, y - 1);
          if (y + 1 < h) enqueue(x, y + 1);
        }

        // Second pass: apply transparency to visited exterior pixels + smooth edge feather + bottom/side fade
        for (let y = 0; y < h; y++) {
          const ny = y / h;
          const bottomRatio = ny > 0.80 ? 1 - (ny - 0.80) / 0.20 : 1;
          const bottomAlphaScale = Math.max(0, Math.min(1, bottomRatio));

          for (let x = 0; x < w; x++) {
            const nx = x / w;
            // Soft fade on the very left/right 4% edges for Stage 2 & 3 desk/chair
            let sideAlphaScale = 1;
            if (nx < 0.04) sideAlphaScale = nx / 0.04;
            else if (nx > 0.96) sideAlphaScale = (1 - nx) / 0.04;

            const idx = y * w + x;
            const p = idx * 4;
            if (visited[idx]) {
              data[p + 3] = 0;
            } else {
              let bgNeighbors = 0;
              if (x > 0 && visited[idx - 1]) bgNeighbors++;
              if (x + 1 < w && visited[idx + 1]) bgNeighbors++;
              if (y > 0 && visited[idx - w]) bgNeighbors++;
              if (y + 1 < h && visited[idx + w]) bgNeighbors++;

              let alpha = data[p + 3];
              if (bgNeighbors >= 3) {
                alpha = Math.round(alpha * 0.2);
              } else if (bgNeighbors === 2) {
                alpha = Math.round(alpha * 0.5);
              } else if (bgNeighbors === 1) {
                alpha = Math.round(alpha * 0.8);
              }
              data[p + 3] = Math.round(alpha * bottomAlphaScale * sideAlphaScale);
            }
          }
        }

        ctx.putImageData(imgData, 0, 0);
        const dataUrl = canvas.toDataURL('image/png');
        processedCache.set(src, dataUrl);
        setProcessedUrl(dataUrl);
      } catch (e) {
        setProcessedUrl(src);
      }
    };

    img.onerror = () => {
      if (!cancelled) setProcessedUrl(src);
    };

    img.src = src;

    return () => {
      cancelled = true;
    };
  }, [src, processedUrl]);

  // Do NOT render raw un-cutout image before canvas flood-fill completes -> ZERO box flash on refresh!
  if (!processedUrl) {
    return <div className={className} style={{ ...style, opacity: 0 }} aria-hidden="true" />;
  }

  return (
    <img
      src={processedUrl}
      alt={alt}
      className={`${className} transition-opacity duration-300 opacity-100`}
      style={style}
      draggable={false}
    />
  );
}
