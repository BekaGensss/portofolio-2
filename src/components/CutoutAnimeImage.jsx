import React, { useEffect, useRef, useState } from 'react';

// In-memory cache so navigating or re-rendering is 100% instant
const processedCache = new Map();

/**
 * CutoutAnimeImage
 * Cleanly removes 100% of the exterior studio background AND the dark studio radial glow/halo
 * behind the neck, ears, and shoulders by:
 * 1. Flood-filling from all outer edges up to the character's crisp black ink outline or bright rim-light.
 * 2. Converting any semi-dark blue/grey studio glow pixels adjacent to the exterior into pure
 *    transparent alpha, so there is ZERO grey/navy halo behind the character on both mobile and desktop!
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

        /**
         * Determines whether a pixel at (x, y) is part of the exterior dark studio
         * or the radial blue-grey studio glow/halo behind the character.
         */
        const isExteriorStudioOrHalo = (idx, x, y) => {
          const p = idx * 4;
          const r = data[p];
          const g = data[p + 1];
          const b = data[p + 2];

          const maxChannel = Math.max(r, g, b);
          const luma = 0.299 * r + 0.587 * g + 0.114 * b;

          // 1. Protect warm skin tones, lips, brown eyes, or warm elements (red > blue)
          if (r > b + 4 && r > 28) return false;

          // 2. Protect white shirt collar, bright highlights, laptop body, and bright code
          if (luma > 78) return false;

          // 3. Protect the crisp bright cyan/purple rim-light line directly on the character's edge
          if (b >= 115 || g >= 105) return false;

          // 4. Protect the interior of the hair & head silhouette
          const normX = Math.abs(x - w * 0.5) / (w * 0.5);
          const normY = y / h;
          const inHairInterior = normY > 0.07 && normY < 0.44 && normX < 0.25;
          if (inHairInterior) {
            return maxChannel <= 18 && luma <= 15;
          }

          // 5. Protect the interior of the dark suit torso (center-bottom)
          const inTorsoInterior = normY >= 0.68 && normX < 0.42;
          if (inTorsoInterior) {
            return maxChannel <= 16 && luma <= 14;
          }

          // 6. Everywhere in the exterior & behind the neck/ears/shoulders:
          // Flood-fill all dark studio & radial blue/grey halo pixels (up to B=105, Luma=72)
          // because the character's ears/jaw/neck have a very dark ink outline (luma < 14) or warm skin (R > B).
          // Wait: to avoid entering the suit or ear through the dark ink line, stop at crisp black ink lines
          // when they border skin or bright rim-light!
          if (maxChannel <= 98 && luma <= 68 && b >= r - 2) {
            return true;
          }

          return false;
        };

        // Helper: check if a pixel is adjacent to warm skin or bright collar/laptop (i.e. character ink outline)
        const isCharacterInkBarrier = (x, y) => {
          const radius = 3;
          for (let dy = -radius; dy <= radius; dy++) {
            const ny = y + dy;
            if (ny < 0 || ny >= h) continue;
            for (let dx = -radius; dx <= radius; dx++) {
              const nx = x + dx;
              if (nx < 0 || nx >= w) continue;
              const np = (ny * w + nx) * 4;
              const nr = data[np];
              const ng = data[np + 1];
              const nb = data[np + 2];
              const nluma = 0.299 * nr + 0.587 * ng + 0.114 * nb;
              // Next to warm skin OR bright collar/rim-light
              if ((nr > nb + 12 && nr > 65) || nluma > 105 || nb > 135) {
                return true;
              }
            }
          }
          return false;
        };

        const enqueue = (x, y) => {
          if (x < 0 || x >= w || y < 0 || y >= h) return;
          const idx = y * w + x;
          if (visited[idx]) return;

          const p = idx * 4;
          const r = data[p];
          const g = data[p + 1];
          const b = data[p + 2];
          const luma = 0.299 * r + 0.587 * g + 0.114 * b;

          // Stop flood-fill at the character's black ink line (very dark pixel right next to skin/collar)
          if (luma < 22 && isCharacterInkBarrier(x, y)) {
            return;
          }

          if (isExteriorStudioOrHalo(idx, x, y)) {
            visited[idx] = 1;
            queue[tail++] = idx;
          }
        };

        // Seed from all 4 outer edges (top, left, right, and outer bottom corners)
        for (let x = 0; x < w; x++) {
          enqueue(x, 0);
          if (x < w * 0.12 || x > w * 0.88) {
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

        // Second pass: clean up any remaining soft halo pixels within 6px of visited background
        // and apply smooth bottom fade so the torso/desk blends seamlessly into #040406
        for (let y = 0; y < h; y++) {
          const bottomRatio = y > h * 0.82 ? 1 - (y - h * 0.82) / (h * 0.18) : 1;
          const bottomAlphaScale = Math.max(0, Math.min(1, bottomRatio));

          for (let x = 0; x < w; x++) {
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
                alpha = 0;
              } else if (bgNeighbors === 2) {
                alpha = Math.round(alpha * 0.35);
              } else if (bgNeighbors === 1) {
                alpha = Math.round(alpha * 0.7);
              }
              data[p + 3] = Math.round(alpha * bottomAlphaScale);
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
