/**
 * Tier-2 ambient: a slow "heat haze" sun rendered with OGL.
 * Guards: low render scale (gradients survive upscaling), 30 fps cap,
 * pauses when the tab is hidden, sinks the sun as the page scrolls,
 * re-reads colors on theme change, recovers from WebGL context loss.
 */
import { Renderer, Program, Mesh, Triangle } from 'ogl';

const vertex = /* glsl */ `
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() { vUv = uv; gl_Position = vec4(position, 0.0, 1.0); }
`;

const fragment = /* glsl */ `
precision mediump float;
uniform float uTime;
uniform float uScroll;
uniform vec2 uRes;
uniform vec3 uBg;
uniform vec3 uDeep;
uniform vec3 uSun;
uniform vec3 uHaze;
varying vec2 vUv;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 4; i++) { v += a * noise(p); p *= 2.02; a *= 0.5; }
  return v;
}

void main() {
  float asp = uRes.x / uRes.y;
  vec2 p = vec2(vUv.x * asp, vUv.y);
  float t = uTime * 0.035;

  vec2 q = vec2(fbm(p * 1.4 + t), fbm(p * 1.4 - t + 3.1));
  vec2 w = p + 0.4 * q;

  vec3 col = mix(uDeep, uBg, smoothstep(0.0, 1.0, vUv.y));

  float h = fbm(w * 2.1 + vec2(t * 1.6, 0.0));
  col = mix(col, uHaze, smoothstep(0.42, 0.95, h) * (1.0 - vUv.y) * 0.6);

  // The sun sinks and warms as the visitor scrolls: a sunset over the page.
  vec2 sun = vec2(mix(0.82, 0.7, uScroll) * asp, mix(0.9, 0.42, uScroll));
  float d = length(p - sun + (q - 0.5) * 0.07);
  col = mix(col, uSun, exp(-d * d * 14.0) * 0.8);
  col = mix(col, uSun, exp(-d * 2.2) * (0.28 + 0.14 * uScroll));

  col += (hash(gl_FragCoord.xy + uTime) - 0.5) / 255.0; // dither: no banding
  gl_FragColor = vec4(col, 1.0);
}
`;

const probe = document.createElement('canvas').getContext('2d', { willReadFrequently: true });

/** Resolve any CSS color (incl. oklch) to RGB 0..1 by painting a 1px canvas. */
function cssColor(name: string): [number, number, number] {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  if (!probe) return [0.5, 0.5, 0.5];
  probe.clearRect(0, 0, 1, 1);
  probe.fillStyle = '#000';
  probe.fillStyle = value;
  probe.fillRect(0, 0, 1, 1);
  const [r, g, b] = probe.getImageData(0, 0, 1, 1).data;
  return [r / 255, g / 255, b / 255];
}

export function startSun(canvas: HTMLCanvasElement) {
  const scale = Math.min(window.devicePixelRatio || 1, 1.5) * 0.5;
  let renderer: Renderer;
  let program: Program;
  let mesh: Mesh;
  let raf = 0;
  let last = 0;
  let lost = false;
  const start = performance.now();

  function build() {
    renderer = new Renderer({ canvas, dpr: scale, alpha: false, antialias: false, powerPreference: 'low-power' });
    const gl = renderer.gl;
    program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        uScroll: { value: 0 },
        uRes: { value: [1, 1] },
        uBg: { value: cssColor('--bg') },
        uDeep: { value: cssColor('--bg-deep') },
        uSun: { value: cssColor('--sun-core') },
        uHaze: { value: cssColor('--haze') },
      },
    });
    mesh = new Mesh(gl, { geometry: new Triangle(gl), program });
    resize();
  }

  function resize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    program.uniforms.uRes.value = [window.innerWidth, window.innerHeight];
  }

  function recolor() {
    const u = program.uniforms;
    u.uBg.value = cssColor('--bg');
    u.uDeep.value = cssColor('--bg-deep');
    u.uSun.value = cssColor('--sun-core');
    u.uHaze.value = cssColor('--haze');
  }

  function frame(now: number) {
    raf = requestAnimationFrame(frame);
    if (now - last < 33) return; // ~30 fps
    last = now;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const target = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
    const u = program.uniforms;
    u.uScroll.value += (target - u.uScroll.value) * 0.08;
    u.uTime.value = (now - start) / 1000;
    renderer.render({ scene: mesh });
  }

  function play() {
    if (!raf && !lost && document.visibilityState === 'visible') raf = requestAnimationFrame(frame);
  }
  function pause() {
    cancelAnimationFrame(raf);
    raf = 0;
  }

  build();
  play();
  requestAnimationFrame(() => {
    canvas.classList.add('is-ready');
    document.documentElement.classList.add('has-sun');
  });

  let resizeTimer = 0;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(resize, 150);
  }, { passive: true });
  document.addEventListener('visibilitychange', () => (document.visibilityState === 'visible' ? play() : pause()));
  document.addEventListener('themechange', recolor);

  canvas.addEventListener('webglcontextlost', (e) => {
    e.preventDefault();
    lost = true;
    pause();
    canvas.classList.remove('is-ready');
  });
  canvas.addEventListener('webglcontextrestored', () => {
    lost = false;
    build();
    play();
    canvas.classList.add('is-ready');
  });
}
