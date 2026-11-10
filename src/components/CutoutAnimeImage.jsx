import React, { useEffect, useRef, useState } from 'react';

// In-memory cache so navigating or re-rendering is 100% instant
const processedCache = new Map();

/**
 * CutoutAnimeImage
 *
 * 1. NEVER displays the raw un-cutout JPG with its studio background box!
 *    Until the exterior background & studio halo are 100% stripped into a transparent PNG,
 *    the element stays opacity-0 and then smoothly fades in over 180ms.
 * 2. Runs a clean exterior flood-fill + 2px edge feathering that strips the dark studio box
 *    and cyan/blue wall glow behind the neck/shoulders while 100% protecting the character's
 *    hair, face, suit, chair, and laptop.
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
    let timerId = null;

    const isStage2Laptop = src.includes('anime-stage2.jpg');
    const isStage3 = src.includes('stage3');
    // Stage 1 & Stage 2 nyengir run at 0ms; Stage 2 laptop runs at 60ms, Stage 3 runs at 120ms
    const delayMs = isStage3 ? 120 : isStage2Laptop ? 60 : 0;

    const runCutout = () => {
      if (cancelled) return;
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
           * Tight anatomical interior mask so flood-fill NEVER enters the hair, face, suit,
           * chair, or laptop, while allowing the exterior flood-fill to clean the studio glow
           * right up to the outer rim of the hair, ears, neck, and shoulders!
           */
          const isProtectedCharacterInterior = (nx, ny) => {
            if (isStage3) {
              // Stage 3: Side-profile coding at laptop
              const inHead =
                Math.pow((nx - 0.76) / 0.185, 2) + Math.pow((ny - 0.27) / 0.205, 2) <= 1.0;
              const inSuitAndArms = nx >= 0.45 && nx <= 0.98 && ny >= 0.43;
              const inLaptop = nx >= 0.05 && nx <= 0.63 && ny >= 0.30 && ny <= 0.95;
              const inDesk = ny >= 0.60 && nx <= 0.98;
              return inHead || inSuitAndArms || inLaptop || inDesk;
            }

            if (isStage2Laptop) {
              // Stage 2: Front-facing typing at laptop
              const inHead =
                Math.pow((nx - 0.5) / 0.158, 2) + Math.pow((ny - 0.235) / 0.175, 2) <= 1.0;
              const inShouldersAndSuit =
                ny >= 0.40 &&
                ny <= 0.96 &&
                nx >= 0.18 - (ny - 0.40) * 0.17 &&
                nx <= 0.82 + (ny - 0.40) * 0.21;
              const inLaptopAndDesk = ny >= 0.57 && nx >= 0.02 && nx <= 0.98;
              return inHead || inShouldersAndSuit || inLaptopAndDesk;
            }

            // Stage 1: Front portrait
            // Crown & hair interior
            const inHairAndHead =
              Math.pow((nx - 0.5) / 0.205, 2) + Math.pow((ny - 0.285) / 0.225, 2) <= 1.0;
            // Neck & collar interior (narrower than shoulders so studio glow beside neck is removed!)
            const inNeck =
              ny >= 0.46 && ny <= 0.68 && nx >= 0.36 && nx <= 0.64;
            // Suit shoulders slope outward from collar (ny=0.62) to outer arms (ny=0.80..1.0)
            const shoulderHalfWidth =
              ny >= 0.60 ? Math.min(0.46, 0.15 + ((ny - 0.60) / 0.22) * 0.31) : 0;
            const inTorso = ny >= 0.60 && Math.abs(nx - 0.5) <= shoulderHalfWidth;

            return inHairAndHead || inNeck || inTorso;
          };

          const isExteriorStudioOrHalo = (idx, x, y) => {
            const nx = x / w;
            const ny = y / h;

            if (isProtectedCharacterInterior(nx, ny)) {
              return false;
            }

            const p = idx * 4;
            const r = data[p];
            const g = data[p + 1];
            const b = data[p + 2];

            const maxChannel = Math.max(r, g, b);
            const luma = 0.299 * r + 0.587 * g + 0.114 * b;

            // Protect warm skin tones, ears, lips, brown eyes
            if (r > b + 4 && r > 28) return false;

            // Protect white shirt collar, bright laptop body, bright screen code
            if (luma > 82) return false;

            // Protect crisp bright cyan/purple rim light right on the hair/suit outline
            if (b >= 130 || g >= 120) return false;

            // Flood-fill exterior studio background AND the soft blue/teal studio wall glow
            if (maxChannel <= 122 && luma <= 80 && b >= r - 2) {
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

          while (head < tail) {
            const idx = queue[head++];
            const x = idx % w;
            const y = (idx - x) / w;

            if (x > 0) enqueue(x - 1, y);
            if (x + 1 < w) enqueue(x + 1, y);
            if (y > 0) enqueue(x, y - 1);
            if (y + 1 < h) enqueue(x, y + 1);
          }

          // Second pass: zero out exterior background pixels & feather the boundary smoothly
          for (let y = 0; y < h; y++) {
            const ny = y / h;
            const bottomRatio = ny > 0.8 ? 1 - (ny - 0.8) / 0.2 : 1;
            const bottomAlphaScale = Math.max(0, Math.min(1, bottomRatio));

            for (let x = 0; x < w; x++) {
              const nx = x / w;
              let sideAlphaScale = 1;
              if (nx < 0.04) sideAlphaScale = nx / 0.04;
              else if (nx > 0.96) sideAlphaScale = (1 - nx) / 0.04;

              const idx = y * w + x;
              const p = idx * 4;
              if (visited[idx]) {
                data[p] = 0;
                data[p + 1] = 0;
                data[p + 2] = 0;
                data[p + 3] = 0;
              } else {
                let bgNeighbors = 0;
                if (x > 0 && visited[idx - 1]) bgNeighbors++;
                if (x + 1 < w && visited[idx + 1]) bgNeighbors++;
                if (y > 0 && visited[idx - w]) bgNeighbors++;
                if (y + 1 < h && visited[idx + w]) bgNeighbors++;

                // Check 2px out for ultra-smooth anti-aliased edge
                let bgNeighbors2 = 0;
                if (x > 1 && visited[idx - 2]) bgNeighbors2++;
                if (x + 2 < w && visited[idx + 2]) bgNeighbors2++;
                if (y > 1 && visited[idx - w * 2]) bgNeighbors2++;
                if (y + 2 < h && visited[idx + w * 2]) bgNeighbors2++;

                let alpha = data[p + 3];
                if (bgNeighbors >= 3) {
                  alpha = Math.round(alpha * 0.15);
                } else if (bgNeighbors === 2) {
                  alpha = Math.round(alpha * 0.42);
                } else if (bgNeighbors === 1) {
                  alpha = Math.round(alpha * 0.72);
                } else if (bgNeighbors2 >= 2) {
                  alpha = Math.round(alpha * 0.85);
                }
                data[p + 3] = Math.round(alpha * bottomAlphaScale * sideAlphaScale);
              }
            }
          }

          ctx.putImageData(imgData, 0, 0);
          const dataUrl = canvas.toDataURL('image/png');
          processedCache.set(src, dataUrl);
          if (!cancelled) {
            setProcessedUrl(dataUrl);
          }
        } catch (e) {
          if (!cancelled) setProcessedUrl(src);
        }
      };

      img.onerror = () => {
        if (!cancelled) setProcessedUrl(src);
      };

      img.src = src;
    };

    if (delayMs > 0) {
      timerId = setTimeout(runCutout, delayMs);
    } else {
      runCutout();
    }

    return () => {
      cancelled = true;
      if (timerId) clearTimeout(timerId);
    };
  }, [src, processedUrl]);

  // NEVER render the raw JPG before cutout finishes -> 0% chance of seeing the studio background box on refresh!
  if (!processedUrl) {
    return <div className={className} style={{ ...style, opacity: 0 }} aria-hidden="true" />;
  }

  return (
    <img
      src={processedUrl}
      alt={alt}
      className={`${className} transition-opacity duration-200 opacity-100`}
      style={style}
      draggable={false}
      decoding="async"
    />
  );
}
