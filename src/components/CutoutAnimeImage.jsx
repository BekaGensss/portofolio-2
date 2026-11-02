import React, { useEffect, useRef, useState } from 'react';

// In-memory cache so navigating or re-rendering is 100% instant
const processedCache = new Map();

/**
 * CutoutAnimeImage
 * Cleanly removes 100% of the exterior studio background AND the dark studio vignette halo
 * behind the neck/shoulders by flood-filling from all 4 outer edges up to the bright
 * blue/cyan rim-light outline or bright skin/collar, while protecting the top hair crown.
 *
 * IMPORTANT: Never renders the raw un-cutout JPG before processing finishes, eliminating
 * any square box flash on page refresh!
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
         * or the dark circular vignette halo behind the neck/ears.
         */
        const isExteriorStudioOrHalo = (idx, x, y) => {
          const p = idx * 4;
          const r = data[p];
          const g = data[p + 1];
          const b = data[p + 2];

          const maxChannel = Math.max(r, g, b);
          const luma = 0.299 * r + 0.587 * g + 0.114 * b;

          // 1. Protect warm skin tones, lips, brown eyes, or warm elements (red > blue)
          if (r > b + 6 && r > 32) return false;

          // 2. Protect white shirt collar, bright highlights, and bright laptop screen code
          if (luma > 56) return false;

          // 3. Protect the glowing cyan/blue rim-light outline on the shoulders, suit, & hair!
          if (b >= 72 || g >= 64) return false;

          // 4. Protect the top hair crown (center-top region) from deep flood-fill
          const normX = Math.abs(x - w * 0.5) / (w * 0.5);
          const normY = y / h;
          const inTopHairCrown = normY > 0.08 && normY < 0.42 && normX < 0.27;

          if (inTopHairCrown) {
            return maxChannel <= 22 && luma <= 18;
          }

          // 5. Everywhere else (including the dark circle behind the neck/ears):
          // flood-fill all dark studio & dark navy vignette pixels up to the bright rim-light!
          if (maxChannel <= 64 && luma <= 48 && b >= r - 4) {
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

        // Seed from all 4 outer edges
        for (let x = 0; x < w; x++) {
          enqueue(x, 0);
          enqueue(x, h - 1);
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

        // Apply transparency to visited exterior pixels + smooth edge feather + bottom fade
        for (let y = 0; y < h; y++) {
          const bottomRatio = y > h * 0.80 ? 1 - (y - h * 0.80) / (h * 0.20) : 1;
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
                alpha = Math.round(alpha * 0.25);
              } else if (bgNeighbors === 2) {
                alpha = Math.round(alpha * 0.55);
              } else if (bgNeighbors === 1) {
                alpha = Math.round(alpha * 0.82);
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
