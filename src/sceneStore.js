/*
 * Store kecil untuk berbagi status adegan 3D antara HUD, modal, dan Scene3D
 * tanpa memicu render ulang React di setiap frame.
 *   mode  : 'auto' (ikut scroll) | 'mesh' (organik) | 'layers' (hierarki)
 *   power : 'on' | 'eco' | 'off'
 *   paused: true saat modal terbuka (render dihentikan, hemat GPU)
 *   webgl : 'pending' | 'ok' | 'none'
 */
let snapshot = { mode: 'auto', power: 'on', paused: false, webgl: 'pending' };
const listeners = new Set();

export const sceneStore = {
  get: () => snapshot,
  subscribe: (fn) => {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },
  set: (patch) => {
    const next = { ...snapshot, ...patch };
    const changed = Object.keys(next).some((k) => next[k] !== snapshot[k]);
    if (!changed) return;
    snapshot = next;
    listeners.forEach((fn) => fn());
  },
};
