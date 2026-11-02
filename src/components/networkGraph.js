/*
 * Generator topologi jaringan tiga lapis (core / distribution / access).
 * Deterministik (seeded) supaya bentuknya selalu sama setiap kali dimuat.
 *
 * Mengembalikan dua tata letak untuk node yang SAMA:
 *   A = layout organik (force-directed)  -> terlihat seperti jaringan hidup
 *   B = layout hierarki tiga lapis       -> diagram core/distribution/access
 * Shader melakukan morph di antara keduanya mengikuti scroll.
 */

const mulberry32 = (a) => () => {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const TARGET_RADIUS = 4.7;

const normalize = (p, n) => {
    let cx = 0, cy = 0, cz = 0;
    for (let i = 0; i < n; i++) { cx += p[i * 3]; cy += p[i * 3 + 1]; cz += p[i * 3 + 2]; }
    cx /= n; cy /= n; cz /= n;
    let maxR = 0;
    for (let i = 0; i < n; i++) {
        p[i * 3] -= cx; p[i * 3 + 1] -= cy; p[i * 3 + 2] -= cz;
        const r = Math.hypot(p[i * 3], p[i * 3 + 1], p[i * 3 + 2]);
        if (r > maxR) maxR = r;
    }
    const s = TARGET_RADIUS / (maxR || 1);
    for (let i = 0; i < n * 3; i++) p[i] *= s;
};

const layoutOrganic = (n, tier, edges, rnd) => {
    const p = new Float64Array(n * 3);
    for (let i = 0; i < n; i++) {
        const r = tier[i] === 2 ? 0.8 : tier[i] === 1 ? 2.4 : 4.0;
        const u = rnd() * 2 - 1;
        const th = rnd() * Math.PI * 2;
        const s = Math.sqrt(1 - u * u);
        p[i * 3] = r * s * Math.cos(th);
        p[i * 3 + 1] = r * u;
        p[i * 3 + 2] = r * s * Math.sin(th);
    }

    const rest = (a, b) => {
        const t = tier[a] + tier[b];
        return t >= 4 ? 1.8 : t === 3 ? 2.2 : t === 2 ? 1.6 : t === 1 ? 1.3 : 1.0;
    };
    const gravity = [0.012, 0.022, 0.05];
    const f = new Float64Array(n * 3);
    const iters = 260;

    for (let it = 0; it < iters; it++) {
        f.fill(0);

        for (let i = 0; i < n; i++) {
            for (let j = i + 1; j < n; j++) {
                const dx = p[i * 3] - p[j * 3];
                const dy = p[i * 3 + 1] - p[j * 3 + 1];
                const dz = p[i * 3 + 2] - p[j * 3 + 2];
                const d2 = dx * dx + dy * dy + dz * dz + 0.04;
                const k = 0.9 / (d2 * Math.sqrt(d2));
                f[i * 3] += dx * k; f[i * 3 + 1] += dy * k; f[i * 3 + 2] += dz * k;
                f[j * 3] -= dx * k; f[j * 3 + 1] -= dy * k; f[j * 3 + 2] -= dz * k;
            }
        }

        for (let e = 0; e < edges.length; e++) {
            const a = edges[e][0], b = edges[e][1];
            const dx = p[b * 3] - p[a * 3];
            const dy = p[b * 3 + 1] - p[a * 3 + 1];
            const dz = p[b * 3 + 2] - p[a * 3 + 2];
            const d = Math.sqrt(dx * dx + dy * dy + dz * dz) + 1e-6;
            const k = (0.12 * (d - rest(a, b))) / d;
            f[a * 3] += dx * k; f[a * 3 + 1] += dy * k; f[a * 3 + 2] += dz * k;
            f[b * 3] -= dx * k; f[b * 3 + 1] -= dy * k; f[b * 3 + 2] -= dz * k;
        }

        for (let i = 0; i < n; i++) {
            const g = gravity[tier[i]];
            f[i * 3] -= p[i * 3] * g; f[i * 3 + 1] -= p[i * 3 + 1] * g; f[i * 3 + 2] -= p[i * 3 + 2] * g;
        }

        const step = 0.35 * (1 - it / iters) + 0.02;
        for (let i = 0; i < n; i++) {
            let dx = f[i * 3] * step, dy = f[i * 3 + 1] * step, dz = f[i * 3 + 2] * step;
            const m = Math.hypot(dx, dy, dz);
            if (m > 0.35) { const s = 0.35 / m; dx *= s; dy *= s; dz *= s; }
            p[i * 3] += dx; p[i * 3 + 1] += dy; p[i * 3 + 2] += dz;
        }
    }
    normalize(p, n);
    return p;
};

const layoutTiers = (n, nCore, nDist, nAccess, parent, rnd) => {
    const p = new Float64Array(n * 3);
    const TAU = Math.PI * 2;

    for (let c = 0; c < nCore; c++) {
        const ang = (c / nCore) * TAU + 0.6;
        p[c * 3] = Math.cos(ang) * 1.5;
        p[c * 3 + 1] = 3.6;
        p[c * 3 + 2] = Math.sin(ang) * 1.5;
    }

    const distAngle = (d) => (d / nDist) * TAU;
    for (let d = 0; d < nDist; d++) {
        const i = nCore + d;
        const ang = distAngle(d);
        p[i * 3] = Math.cos(ang) * 3.6;
        p[i * 3 + 1] = 0.7 + (d % 2 ? 0.22 : -0.22);
        p[i * 3 + 2] = Math.sin(ang) * 3.6;
    }

    const groups = Array.from({ length: nDist }, () => []);
    for (let a = 0; a < nAccess; a++) {
        const i = nCore + nDist + a;
        groups[parent[i] - nCore].push(i);
    }
    const wedge = (TAU / nDist) * 0.9;
    groups.forEach((list, d) => {
        list.forEach((i, k) => {
            const ang = distAngle(d) + ((k + 0.5) / list.length - 0.5) * wedge;
            const r = 5.6 + (rnd() - 0.5) * 0.9;
            p[i * 3] = Math.cos(ang) * r;
            p[i * 3 + 1] = -2.7 + (rnd() - 0.5) * 0.5 + (k % 2 ? 0.15 : -0.15);
            p[i * 3 + 2] = Math.sin(ang) * r;
        });
    });

    normalize(p, n);
    return p;
};

export const buildNetwork = ({ nAccess = 96, seed = 7 } = {}) => {
    const rnd = mulberry32(seed);
    const nCore = 4;
    const nDist = 12;
    const n = nCore + nDist + nAccess;

    const tier = new Uint8Array(n);
    const parent = new Int16Array(n).fill(-1);
    const edges = [];

    for (let i = 0; i < nCore; i++) tier[i] = 2;
    for (let i = 0; i < nDist; i++) tier[nCore + i] = 1;

    for (let i = 0; i < nCore; i++) {
        for (let j = i + 1; j < nCore; j++) edges.push([i, j, 1.0]);
    }

    for (let d = 0; d < nDist; d++) {
        const di = nCore + d;
        const c1 = d % nCore;
        const c2 = (c1 + 1 + Math.floor(rnd() * (nCore - 1))) % nCore;
        edges.push([di, c1, 0.8], [di, c2, 0.6]);
        edges.push([di, nCore + ((d + 1) % nDist), 0.55]);
        parent[di] = c1;
    }

    for (let a = 0; a < nAccess; a++) {
        const ai = nCore + nDist + a;
        const d = Math.floor((a * nDist) / nAccess);
        parent[ai] = nCore + d;
        edges.push([ai, nCore + d, 0.5]);
        if (rnd() < 0.22) {
            edges.push([ai, nCore + ((d + 1 + Math.floor(rnd() * 2)) % nDist), 0.3]);
        }
    }

    const posA = layoutOrganic(n, tier, edges, rnd);
    const posB = layoutTiers(n, nCore, nDist, nAccess, parent, rnd);

    return {
        n, tier, edges,
        posA: Float32Array.from(posA),
        posB: Float32Array.from(posB),
        rnd,
    };
};
