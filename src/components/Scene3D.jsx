import React, { useEffect, useRef } from 'react';
import {
  WebGLRenderer, Scene, PerspectiveCamera, Group, BufferGeometry, BufferAttribute,
  ShaderMaterial, LineSegments, Points, Vector3,
} from 'three';
import { buildNetwork } from './networkGraph';
import { sceneStore } from '../sceneStore';

/*
 * Latar 3D: topologi jaringan tiga lapis (Core / Distribution / Access).
 * Satu set node yang sama punya dua tata letak:
 *   - organik (force-directed)  -> terlihat seperti jaringan hidup
 *   - hierarki tiga lapis       -> diagram core / distribution / access
 * Shader melakukan morph di antara keduanya mengikuti scroll, kamera berpindah
 * sisi di setiap section, dan klik mengirim gelombang kejut ke seluruh jaringan.
 */

const POSES = {
  hero:         { x:  3.1, y:  0.1, z: 14.5, morph: 0.00, spin: 0.0, tilt: 0.18, alpha: 1.00 },
  capabilities: { x: -4.6, y:  0.0, z: 16.0, morph: 0.25, spin: 1.3, tilt: 0.25, alpha: 0.55 },
  works:        { x:  4.8, y:  0.2, z: 16.0, morph: 0.60, spin: 2.4, tilt: 0.12, alpha: 0.45 },
  repos:        { x: -4.6, y: -0.1, z: 16.5, morph: 0.35, spin: 3.4, tilt: 0.22, alpha: 0.40 },
  vault:        { x:  4.6, y:  0.0, z: 16.0, morph: 1.00, spin: 4.4, tilt: 0.10, alpha: 0.48 },
  trajectory:   { x: -4.4, y:  0.0, z: 16.5, morph: 0.80, spin: 5.3, tilt: 0.16, alpha: 0.40 },
  dispatch:     { x:  0.0, y:  0.0, z: 13.5, morph: 0.00, spin: 6.2, tilt: 0.20, alpha: 0.65 },
};
const IDS = Object.keys(POSES);
const POSE_KEYS = ['x', 'y', 'z', 'morph', 'spin', 'tilt', 'alpha'];

const CAPTIONS = [
  'Fig. 01 — Topologi jaringan · klik untuk kirim sinyal',
  'Fig. 02 — Menata ulang menjadi hierarki',
  'Fig. 03 — Core · Distribution · Access',
];

/* ------------------------------------------------------------------ */
/*  Shader                                                              */
/* ------------------------------------------------------------------ */
const COMMON = /* glsl */`
uniform float uTime;
uniform float uMorph;
uniform float uPixel;
uniform float uNear;
uniform float uFar;
uniform vec3  uShockOrigin;
uniform float uShockT;

vec3 drift(vec3 a) {
  return 0.07 * vec3(
    sin(uTime * 0.45 + a.y * 1.7 + a.z * 0.9),
    cos(uTime * 0.38 + a.z * 1.3 + a.x * 0.8),
    sin(uTime * 0.31 + a.x * 1.1 + a.y * 0.7)
  );
}
float shockBand(vec3 p) {
  float r    = uShockT * 7.5;
  float life = clamp(1.0 - uShockT / 2.4, 0.0, 1.0);
  float x    = (distance(p, uShockOrigin) - r) * 0.9;
  return exp(-x * x) * life;
}
vec3 pushed(vec3 p, float band) {
  return p + normalize(p - uShockOrigin + vec3(0.0001)) * band * 0.3;
}
`;

const EDGE_VERT = /* glsl */`
${COMMON}
attribute vec3  aB;
attribute float aW;
varying float vAlpha;
varying float vBand;
void main() {
  vec3 p = mix(position, aB, uMorph) + drift(position);
  float band = shockBand(p);
  p = pushed(p, band);
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  float fog = 1.0 - smoothstep(uNear, uFar, -mv.z);
  vAlpha = aW * (0.35 + 0.65 * fog);
  vBand  = band;
}
`;

const EDGE_FRAG = /* glsl */`
uniform vec3  uLine;
uniform vec3  uHot;
uniform float uAlpha;
varying float vAlpha;
varying float vBand;
void main() {
  vec3 c = mix(uLine, uHot, clamp(vBand * 1.6, 0.0, 1.0));
  gl_FragColor = vec4(c, (vAlpha * 0.5 + vBand * 0.8) * uAlpha);
}
`;

const NODE_VERT = /* glsl */`
${COMMON}
attribute vec3  aB;
attribute float aTier;
attribute float aSeed;
varying float vTier;
varying float vAlpha;
varying float vBand;
void main() {
  vec3 p = mix(position, aB, uMorph) + drift(position);
  float band = shockBand(p);
  p = pushed(p, band);
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  float depth = -mv.z;
  float size  = aTier > 1.5 ? 11.0 : (aTier > 0.5 ? 7.0 : 4.0);
  gl_PointSize = max(size * uPixel * (14.0 / depth) * (1.0 + band * 1.6), 2.0 * uPixel);
  float fog = 1.0 - smoothstep(uNear, uFar, depth);
  float tw  = 0.88 + 0.12 * sin(uTime * 1.1 + aSeed * 40.0);
  vAlpha = (0.4 + 0.6 * fog) * tw;
  vTier  = aTier;
  vBand  = band;
}
`;

const NODE_FRAG = /* glsl */`
uniform vec3  uNode;
uniform vec3  uAccent;
uniform vec3  uHot;
uniform float uAlpha;
varying float vTier;
varying float vAlpha;
varying float vBand;
void main() {
  vec2  c = abs(gl_PointCoord - 0.5);
  float m = max(c.x, c.y);
  float a = 1.0;
  if (vTier > 1.5) {
    a = max(step(0.36, m), 1.0 - step(0.15, m));
  } else if (vTier > 0.5) {
    a = max(step(0.33, m), 1.0 - step(0.08, m));
  }
  if (a < 0.5) discard;
  vec3 col = vTier > 1.5 ? uAccent : (vTier > 0.5 ? mix(uNode, uAccent, 0.5) : uNode);
  col = mix(col, uHot, clamp(vBand * 1.4, 0.0, 1.0));
  gl_FragColor = vec4(col, vAlpha * uAlpha * (vTier > 0.5 ? 1.0 : 0.75));
}
`;

const PACKET_VERT = /* glsl */`
${COMMON}
attribute vec3  aA1;
attribute vec3  aB0;
attribute vec3  aB1;
attribute float aSpeed;
attribute float aOff;
varying float vAlpha;
void main() {
  float t  = fract(uTime * aSpeed + aOff);
  vec3 pa  = mix(position, aA1, t);
  vec3 pb  = mix(aB0, aB1, t);
  vec3 dr  = mix(drift(position), drift(aA1), t);
  vec3 p   = mix(pa, pb, uMorph) + dr;
  vec4 mv  = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  float depth = -mv.z;
  gl_PointSize = max(5.0 * uPixel * (14.0 / depth), 2.0 * uPixel);
  float fog = 1.0 - smoothstep(uNear, uFar, depth);
  vAlpha = sin(t * 3.14159265) * (0.35 + 0.65 * fog);
}
`;

const PACKET_FRAG = /* glsl */`
uniform vec3  uHot;
uniform float uAlpha;
varying float vAlpha;
void main() {
  gl_FragColor = vec4(uHot, vAlpha * uAlpha);
}
`;

/* ------------------------------------------------------------------ */
/*  Geometri                                                            */
/* ------------------------------------------------------------------ */
const buildGeometries = (net, packetCount) => {
  const { n, tier, edges, posA, posB, rnd } = net;
  const m = edges.length;

  const ePos = new Float32Array(m * 6);
  const eB = new Float32Array(m * 6);
  const eW = new Float32Array(m * 2);
  edges.forEach(([a, b, w], k) => {
    [a, b].forEach((idx, s) => {
      const o = (k * 2 + s) * 3;
      ePos.set(posA.subarray(idx * 3, idx * 3 + 3), o);
      eB.set(posB.subarray(idx * 3, idx * 3 + 3), o);
      eW[k * 2 + s] = w;
    });
  });
  const edgeGeo = new BufferGeometry();
  edgeGeo.setAttribute('position', new BufferAttribute(ePos, 3));
  edgeGeo.setAttribute('aB', new BufferAttribute(eB, 3));
  edgeGeo.setAttribute('aW', new BufferAttribute(eW, 1));

  const nodeGeo = new BufferGeometry();
  nodeGeo.setAttribute('position', new BufferAttribute(Float32Array.from(posA), 3));
  nodeGeo.setAttribute('aB', new BufferAttribute(Float32Array.from(posB), 3));
  const aTier = new Float32Array(n);
  const aSeed = new Float32Array(n);
  for (let i = 0; i < n; i++) { aTier[i] = tier[i]; aSeed[i] = rnd(); }
  nodeGeo.setAttribute('aTier', new BufferAttribute(aTier, 1));
  nodeGeo.setAttribute('aSeed', new BufferAttribute(aSeed, 1));

  const backbone = edges.filter((e) => e[2] >= 0.5);
  const pPos = new Float32Array(packetCount * 3);
  const pA1 = new Float32Array(packetCount * 3);
  const pB0 = new Float32Array(packetCount * 3);
  const pB1 = new Float32Array(packetCount * 3);
  const pSpeed = new Float32Array(packetCount);
  const pOff = new Float32Array(packetCount);
  for (let k = 0; k < packetCount; k++) {
    const e = backbone[Math.floor(rnd() * backbone.length)];
    const flip = rnd() < 0.5;
    const a = flip ? e[1] : e[0];
    const b = flip ? e[0] : e[1];
    pPos.set(posA.subarray(a * 3, a * 3 + 3), k * 3);
    pA1.set(posA.subarray(b * 3, b * 3 + 3), k * 3);
    pB0.set(posB.subarray(a * 3, a * 3 + 3), k * 3);
    pB1.set(posB.subarray(b * 3, b * 3 + 3), k * 3);
    pSpeed[k] = 0.12 + rnd() * 0.18;
    pOff[k] = rnd();
  }
  const packetGeo = new BufferGeometry();
  packetGeo.setAttribute('position', new BufferAttribute(pPos, 3));
  packetGeo.setAttribute('aA1', new BufferAttribute(pA1, 3));
  packetGeo.setAttribute('aB0', new BufferAttribute(pB0, 3));
  packetGeo.setAttribute('aB1', new BufferAttribute(pB1, 3));
  packetGeo.setAttribute('aSpeed', new BufferAttribute(pSpeed, 1));
  packetGeo.setAttribute('aOff', new BufferAttribute(pOff, 1));

  return { edgeGeo, nodeGeo, packetGeo };
};

const lerp = (a, b, t) => a + (b - a) * t;
const smooth = (t) => t * t * (3 - 2 * t);

/* ------------------------------------------------------------------ */
/*  Komponen                                                            */
/* ------------------------------------------------------------------ */
export default function Scene3D() {
  const hostRef = useRef(null);
  const capRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const narrowAtStart = window.innerWidth < 820;

    const canvas = document.createElement('canvas');
    canvas.setAttribute('aria-hidden', 'true');
    canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block;';
    let renderer;
    try {
      renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'default' });
    } catch (err) {
      sceneStore.set({ webgl: 'none' });
      return undefined;
    }
    host.appendChild(canvas);
    renderer.setClearColor(0x000000, 0);
    sceneStore.set({ webgl: 'ok' });

    const scene = new Scene();
    const camera = new PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0, 15);
    const group = new Group();
    scene.add(group);

    const net = buildNetwork({ nAccess: narrowAtStart ? 52 : 96, seed: 7 });
    const { edgeGeo, nodeGeo, packetGeo } = buildGeometries(net, narrowAtStart ? 26 : 46);

    const U = {
      uTime: { value: 0 }, uMorph: { value: 0 }, uPixel: { value: 1 },
      uNear: { value: 8 }, uFar: { value: 30 }, uAlpha: { value: 1 },
      uShockOrigin: { value: new Vector3() }, uShockT: { value: 99 },
      uLine: { value: new Vector3(226 / 255, 241 / 255, 99 / 255) },
      uNode: { value: new Vector3(244 / 255, 243 / 255, 239 / 255) },
      uAccent: { value: new Vector3(226 / 255, 241 / 255, 99 / 255) },
      uHot: { value: new Vector3(1, 1, 0.9) },
    };
    const mat = (vertexShader, fragmentShader) =>
      new ShaderMaterial({ uniforms: U, vertexShader, fragmentShader, transparent: true, depthTest: false, depthWrite: false });
    const edgeMat = mat(EDGE_VERT, EDGE_FRAG);
    const nodeMat = mat(NODE_VERT, NODE_FRAG);
    const packetMat = mat(PACKET_VERT, PACKET_FRAG);

    const edges = new LineSegments(edgeGeo, edgeMat);
    const nodes = new Points(nodeGeo, nodeMat);
    const packets = new Points(packetGeo, packetMat);
    [edges, nodes, packets].forEach((o, i) => { o.frustumCulled = false; o.renderOrder = i; group.add(o); });

    const st = {
      w: window.innerWidth, h: window.innerHeight,
      px: 0, py: 0, spx: 0, spy: 0,
      smoothPos: -1, anchors: [], stage: -1, morph: 0,
      shock: 99, t: 0, last: performance.now(), acc2: 0,
      frames: 0, acc: 0, slow: 0, eco: false,
      running: false, raf: 0,
    };
    const pose = { x: 0, y: 0, z: 15, morph: 0, spin: 0, tilt: 0, alpha: 1 };
    const tmp = new Vector3();

    const setCaption = () => {
      if (capRef.current) capRef.current.textContent = CAPTIONS[Math.max(0, st.stage)];
    };

    const getScale = () => {
      const narrow = st.w < 820;
      return {
        x: narrow ? 0 : Math.min(1, st.w / 1440),
        z: narrow ? 3.5 : 0,
        a: narrow ? 0.5 : 1,
        s: narrow ? 0.9 : 1,
      };
    };

    const computeAnchors = () => {
      const sy = window.scrollY;
      const list = [];
      IDS.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const r = el.getBoundingClientRect();
        list.push({ pos: sy + r.top + r.height * 0.5, pose: POSES[id] });
      });
      list.sort((a, b) => a.pos - b.pos);
      st.anchors = list;
    };

    const samplePose = (pos) => {
      const A = st.anchors;
      const copy = (src) => POSE_KEYS.forEach((k) => { pose[k] = src[k]; });
      if (!A.length) { copy(POSES.hero); return; }
      if (pos <= A[0].pos) { copy(A[0].pose); return; }
      const last = A[A.length - 1];
      if (pos >= last.pos) { copy(last.pose); return; }
      for (let i = 0; i < A.length - 1; i++) {
        if (pos <= A[i + 1].pos) {
          const f = smooth((pos - A[i].pos) / (A[i + 1].pos - A[i].pos));
          POSE_KEYS.forEach((k) => { pose[k] = lerp(A[i].pose[k], A[i + 1].pose[k], f); });
          return;
        }
      }
    };

    const applyQuality = () => {
      const base = Math.min(window.devicePixelRatio || 1, st.w < 820 ? 1.25 : 1.5);
      const pr = st.eco || st.slow > 0 ? 1 : base;
      renderer.setPixelRatio(pr);
      renderer.setSize(st.w, st.h, false);
      U.uPixel.value = pr;
      packets.visible = !(st.eco || st.slow > 1);
    };

    const resize = () => {
      st.w = window.innerWidth;
      st.h = window.innerHeight;
      camera.aspect = st.w / st.h;
      camera.updateProjectionMatrix();
      applyQuality();
      computeAnchors();
    };

    const render = (dt) => {
      st.t += dt;
      const sc = getScale();
      const s = sceneStore.get();

      const target = window.scrollY + st.h * 0.5;
      st.smoothPos = st.smoothPos < 0 || reduced ? target : st.smoothPos + (target - st.smoothPos) * (1 - Math.exp(-dt * 5));
      samplePose(st.smoothPos);

      const targetMorph = s.mode === 'mesh' ? 0 : s.mode === 'layers' ? 1 : pose.morph;
      st.morph += (targetMorph - st.morph) * (reduced ? 1 : 1 - Math.exp(-dt * 3));

      const k = 1 - Math.exp(-dt * 3);
      st.spx += (st.px - st.spx) * k;
      st.spy += (st.py - st.spy) * k;

      group.position.set(pose.x * sc.x, pose.y, 0);
      group.scale.setScalar(sc.s);
      group.rotation.set(
        pose.tilt + st.spy * 0.14,
        pose.spin + (reduced ? 0 : st.t * 0.035) + st.spx * 0.24,
        0
      );
      camera.position.set(st.spx * 0.35, -st.spy * 0.2, pose.z + sc.z);

      U.uMorph.value = st.morph;
      U.uAlpha.value = pose.alpha * sc.a;
      U.uTime.value = reduced ? 0 : st.t;

      if (st.shock < 3) st.shock += dt;
      U.uShockT.value = st.shock < 3 ? st.shock : 99;

      const stage = st.morph < 0.3 ? 0 : st.morph < 0.75 ? 1 : 2;
      if (stage !== st.stage) { st.stage = stage; setCaption(); }

      renderer.render(scene, camera);
    };

    const schedule = () => {
      if (!st.raf && st.running) st.raf = requestAnimationFrame(tick); // eslint-disable-line no-use-before-define
    };

    function tick(now) {
      st.raf = 0;
      if (!st.running) return;
      let dt = Math.min((now - st.last) / 1000, 0.1);
      st.last = now;

      if (st.eco) {
        st.acc2 += dt;
        if (st.acc2 < 1 / 30) { schedule(); return; }
        dt = st.acc2;
        st.acc2 = 0;
      }

      render(dt);

      // Turunkan kualitas otomatis jika perangkat lambat.
      if (!st.eco) {
        st.frames += 1;
        st.acc += dt;
        if (st.frames === 90) {
          if (st.acc / st.frames > 0.034 && st.slow < 2) { st.slow += 1; applyQuality(); }
          st.frames = 0;
          st.acc = 0;
        }
      }
      if (!reduced) schedule();
    }

    const syncRun = () => {
      const s = sceneStore.get();
      const should = !document.hidden && !s.paused && s.power !== 'off';
      canvas.style.display = s.power === 'off' ? 'none' : 'block';
      const eco = s.power === 'eco';
      if (eco !== st.eco) { st.eco = eco; applyQuality(); }
      if (should && !st.running) {
        st.running = true;
        st.last = performance.now();
        schedule();
      } else if (!should && st.running) {
        st.running = false;
        if (st.raf) cancelAnimationFrame(st.raf);
        st.raf = 0;
      }
    };

    const onMove = (e) => {
      st.px = (e.clientX / st.w) * 2 - 1;
      st.py = (e.clientY / st.h) * 2 - 1;
      if (reduced) schedule();
    };

    const onDown = (e) => {
      if (e.button !== 0) return;
      if (e.target && e.target.closest && e.target.closest('input, textarea, select')) return;
      camera.updateMatrixWorld();
      tmp.set((e.clientX / st.w) * 2 - 1, -((e.clientY / st.h) * 2 - 1), 0.5).unproject(camera);
      tmp.sub(camera.position).normalize();
      tmp.multiplyScalar(camera.position.distanceTo(group.position)).add(camera.position);
      group.updateMatrixWorld();
      group.worldToLocal(tmp);
      U.uShockOrigin.value.copy(tmp);
      st.shock = 0;
      if (reduced) schedule();
    };

    let resizeTimer = 0;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => { resize(); if (reduced) schedule(); }, 120);
    };
    const onScroll = () => { if (reduced) schedule(); };
    const onContextLost = (e) => { e.preventDefault(); st.running = false; };

    let ro;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(onResize);
      ro.observe(document.body);
    }
    const unsub = sceneStore.subscribe(syncRun);

    window.addEventListener('resize', onResize);
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('visibilitychange', syncRun);
    canvas.addEventListener('webglcontextlost', onContextLost);

    resize();
    setCaption();
    const settle = setTimeout(() => { computeAnchors(); st.stage = -1; }, 400);
    syncRun();

    return () => {
      st.running = false;
      if (st.raf) cancelAnimationFrame(st.raf);
      clearTimeout(resizeTimer);
      clearTimeout(settle);
      unsub();
      if (ro) ro.disconnect();
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', syncRun);
      canvas.removeEventListener('webglcontextlost', onContextLost);
      [edgeGeo, nodeGeo, packetGeo].forEach((g) => g.dispose());
      [edgeMat, nodeMat, packetMat].forEach((m) => m.dispose());
      renderer.dispose();
      renderer.forceContextLoss();
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
    };
  }, []);

  return (
    <>
      <div ref={hostRef} aria-hidden="true" className="fixed inset-0 z-0 pointer-events-none" />
      <div
        ref={capRef}
        aria-hidden="true"
        className="hidden min-[1320px]:block fixed left-6 bottom-24 z-[5] pointer-events-none font-mono text-[10.5px] tracking-[0.2em] uppercase text-stone/70 whitespace-nowrap"
        style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
      />
    </>
  );
}
