"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./FooterWordmark.module.css";

const WORD = "BLOODNEXUS";
const TEX_W = 2048;
const TEX_H = 512;
const TRAIL_SIZE = 512;
const TRAIL_FADE = 0.035; // per-frame darken amount — controls trail length
const DOT_RADIUS = 0.08;

// ── Trail buffer shaders ─────────────────────────────────────────────────────
// A soft, gaussian-falloff blob stamped at the cursor's position each frame it
// moves, additively blended onto a target that's darkened a little every
// frame — a "flowmap" for a fading, smoke-soft motion trail.
const DOT_FRAG = /* glsl */ `
  uniform vec2 uPos;
  uniform float uRadius;
  varying vec2 vUv;
  void main() {
    float d = distance(vUv, uPos);
    float a = exp(-(d * d) / (uRadius * uRadius * 0.5));
    gl_FragColor = vec4(1.0, 1.0, 1.0, a);
  }
`;
const PASSTHROUGH_VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// ── Text plane shader ────────────────────────────────────────────────────────
// Where the trail has intensity, the letterforms genuinely bend — the UV
// sample is pushed along the trail's local gradient (liquid warp), clamped
// so it can never travel far enough to pick up a neighbouring letter. The
// glow itself is kept small and only shows in the gaps BETWEEN letters
// (masked out over the solid letter body via (1-textAlpha)) so it reads as
// a contained wisp bridging the trail, not a blown-out halo over the text.
// A tiny chromatic fringe sits only at the trail's hottest point.
const TEXT_FRAG = /* glsl */ `
  uniform sampler2D uTex;
  uniform sampler2D uTrail;
  uniform float uOpacity;
  varying vec2 vUv;

  void main() {
    float texel = 1.0 / ${TRAIL_SIZE}.0;
    float amt   = texture2D(uTrail, vUv).r;
    float left  = texture2D(uTrail, vUv - vec2(texel, 0.0)).r;
    float right = texture2D(uTrail, vUv + vec2(texel, 0.0)).r;
    float down  = texture2D(uTrail, vUv - vec2(0.0, texel)).r;
    float up    = texture2D(uTrail, vUv + vec2(0.0, texel)).r;
    vec2 grad = vec2(right - left, up - down);

    vec2 warp = grad * 1.1;
    float warpLen = length(warp);
    float maxWarp = 0.011;
    if (warpLen > maxWarp) warp *= maxWarp / warpLen;
    vec2 uvWarped = vUv + warp;

    float hot = smoothstep(0.6, 0.95, amt);
    vec2 dir = vec2(0.0016, 0.0006) * hot;
    float ra = texture2D(uTex, uvWarped + dir).a;
    float ga = texture2D(uTex, uvWarped).a;
    float ba = texture2D(uTex, uvWarped - dir).a;
    float textAlpha = max(ra, max(ga, ba));

    vec3 glow = vec3(1.0) * amt * 0.1 * (1.0 - textAlpha);
    vec3 color = vec3(ra, ga, ba) * textAlpha + glow;
    float alpha = max(textAlpha, amt * 0.08) * uOpacity;

    if (alpha < 0.02) discard;
    gl_FragColor = vec4(min(color, vec3(1.0)), alpha);
  }
`;

/**
 * Signature footer wordmark (§6.6) — WebGL "BLOODNEXUS" in its own band
 * between the nav columns and the legal row (Footer.tsx), so it never
 * overlaps either. Solid/crisp at rest — the letterforms never distort.
 * Moving the cursor over it leaves a fading, soft smoke-like glow trail
 * (flowmap trail buffer, additively combined over both letters and the gaps
 * between them) with a small chromatic-aberration fringe right at the
 * cursor's current position. Scroll drives the mesh's Y position at a
 * fraction of the page's scroll rate for a slow parallax feel. Falls back to
 * static, motionless text under prefers-reduced-motion or when WebGL isn't
 * available — no canvas is mounted in that case.
 */
export default function FooterWordmark() {
  const zoneRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [useWebGL, setUseWebGL] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) return;
    if (!window.WebGLRenderingContext) return;
    setUseWebGL(true);
  }, []);

  useEffect(() => {
    if (!useWebGL) return;
    const zone = zoneRef.current;
    const canvas = canvasRef.current;
    if (!zone || !canvas) return;

    let unmounted = false;
    let raf = 0;
    let running = false;
    let pointerActive = false;
    let pointerIdleTimer = 0;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setSize(100, 100, false);
    renderer.setClearColor(0x000000, 0);
    renderer.autoClear = false;

    // ── Text → canvas texture ────────────────────────────────────────────
    const texCanvas = document.createElement("canvas");
    texCanvas.width = TEX_W;
    texCanvas.height = TEX_H;
    const ctx = texCanvas.getContext("2d")!;

    const drawText = () => {
      ctx.clearRect(0, 0, TEX_W, TEX_H);
      const fontFamily = getComputedStyle(document.documentElement)
        .getPropertyValue("--font-anton")
        .trim();
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      if ("letterSpacing" in ctx) {
        (ctx as unknown as { letterSpacing: string }).letterSpacing = "-0.02em";
      }
      let fontSize = TEX_H * 0.82;
      const family = `${fontFamily || ""}, "Arial Black", sans-serif`;
      ctx.font = `400 ${fontSize}px ${family}`;
      while (ctx.measureText(WORD).width > TEX_W * 0.96 && fontSize > 10) {
        fontSize -= 4;
        ctx.font = `400 ${fontSize}px ${family}`;
      }
      ctx.fillText(WORD, TEX_W / 2, TEX_H / 2 + fontSize * 0.02);
    };
    drawText();

    const texture = new THREE.CanvasTexture(texCanvas);
    texture.colorSpace = THREE.SRGBColorSpace;

    if ("fonts" in document) {
      document.fonts.ready.then(() => {
        if (unmounted) return;
        drawText();
        texture.needsUpdate = true;
      });
    }

    // ── Trail buffer: small render target + fade quad + dot quad ────────
    const trailTarget = new THREE.WebGLRenderTarget(TRAIL_SIZE, TRAIL_SIZE, {
      format: THREE.RGBAFormat,
    });
    renderer.setRenderTarget(trailTarget);
    renderer.clear();
    renderer.setRenderTarget(null);

    const trailCamera = new THREE.OrthographicCamera(0, 1, 1, 0, 0, 1);
    trailCamera.position.z = 1;
    const quadGeo = new THREE.PlaneGeometry(1, 1);

    const fadeScene = new THREE.Scene();
    const fadeMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: TRAIL_FADE,
      depthTest: false,
      depthWrite: false,
    });
    const fadeMesh = new THREE.Mesh(quadGeo, fadeMat);
    fadeMesh.position.set(0.5, 0.5, 0);
    fadeScene.add(fadeMesh);

    const dotScene = new THREE.Scene();
    const dotUniforms = {
      uPos: { value: new THREE.Vector2(0.5, 0.5) },
      uRadius: { value: DOT_RADIUS },
    };
    const dotMat = new THREE.ShaderMaterial({
      vertexShader: PASSTHROUGH_VERT,
      fragmentShader: DOT_FRAG,
      uniforms: dotUniforms,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthTest: false,
      depthWrite: false,
    });
    const dotMesh = new THREE.Mesh(quadGeo, dotMat);
    dotMesh.position.set(0.5, 0.5, 0);
    dotScene.add(dotMesh);

    // ── Main scene: the text plane ───────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 2;

    const textUniforms = {
      uTex: { value: texture },
      uTrail: { value: trailTarget.texture },
      uOpacity: { value: 0.95 },
    };
    const textMat = new THREE.ShaderMaterial({
      vertexShader: PASSTHROUGH_VERT,
      fragmentShader: TEXT_FRAG,
      uniforms: textUniforms,
      transparent: true,
      depthWrite: false,
    });
    const baseWidth = 2.6;
    const textGeo = new THREE.PlaneGeometry(
      baseWidth,
      baseWidth * (TEX_H / TEX_W)
    );
    const mesh = new THREE.Mesh(textGeo, textMat);
    const BASE_Y = 0;
    mesh.position.y = BASE_Y;
    scene.add(mesh);

    // ── Sizing (getBoundingClientRect + ResizeObserver — clientWidth is
    // unreliable at mount time in this Next.js setup) ──────────────────
    const doResize = () => {
      const r = zone.getBoundingClientRect();
      const w = Math.round(r.width);
      const h = Math.round(r.height);
      if (w < 10 || h < 10) return;
      renderer.setSize(w, h, false);
      const aspect = w / h;
      camera.left = -aspect;
      camera.right = aspect;
      camera.top = 1;
      camera.bottom = -1;
      camera.updateProjectionMatrix();
      // Fill the band's width with a small margin — no forced vertical
      // overscale, so letter tops/bottoms stay fully visible.
      const targetWidth = aspect * 2 * 0.96;
      mesh.scale.setScalar(targetWidth / baseWidth);
    };
    const ro = new ResizeObserver(doResize);
    ro.observe(zone);
    doResize();

    // ── Pointer tracking, whole footer → drives the trail dot ───────────
    // Listens on the whole <footer>, not just this band, so the effect
    // follows the cursor anywhere in the footer (e.g. over the nav
    // columns), extrapolated into this band's coordinate space and clamped
    // so an out-of-band position still lands somewhere sane.
    const trackEl = zone.closest("footer") ?? zone;
    const rawUV = new THREE.Vector2(0.5, 0.5);
    // Smoothed, elastic-eased position the dot actually renders at — gives
    // the trail a springy "catch up and settle" feel instead of snapping
    // straight to the cursor.
    const smoothPos = { x: 0.5, y: 0.5 };
    const qx = gsap.quickTo(smoothPos, "x", {
      duration: 0.9,
      ease: "elastic.out(1, 0.4)",
    });
    const qy = gsap.quickTo(smoothPos, "y", {
      duration: 0.9,
      ease: "elastic.out(1, 0.4)",
    });

    const onMove = (e: PointerEvent) => {
      const r = zone.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = 1 - (e.clientY - r.top) / r.height;
      rawUV.set(
        THREE.MathUtils.clamp(x, -0.2, 1.2),
        THREE.MathUtils.clamp(y, -0.8, 1.8)
      );
      qx(rawUV.x);
      qy(rawUV.y);
      pointerActive = true;
      window.clearTimeout(pointerIdleTimer);
      pointerIdleTimer = window.setTimeout(() => {
        pointerActive = false;
      }, 80);
    };
    const onLeave = () => {
      pointerActive = false;
    };
    trackEl.addEventListener("pointermove", onMove);
    trackEl.addEventListener("pointerleave", onLeave);

    // ── Scroll parallax — mesh drifts slower than the page scrolls ──────
    gsap.registerPlugin(ScrollTrigger);
    const st = ScrollTrigger.create({
      trigger: zone,
      start: "top bottom",
      end: "bottom top",
      scrub: 0.6,
      onUpdate: (self) => {
        mesh.position.y = BASE_Y + (self.progress - 0.5) * 0.3;
      },
    });

    // ── Only render while the band is actually on/near screen (perf) ────
    const io = new IntersectionObserver(
      ([entry]) => {
        running = entry.isIntersecting;
        if (running && !raf) tick();
      },
      { rootMargin: "200px 0px" }
    );
    io.observe(zone);

    const tick = () => {
      if (!running || unmounted) {
        raf = 0;
        return;
      }

      // 1. Update the trail buffer: darken it a touch, then stamp a fresh
      //    dot at the elastic-smoothed cursor position if it's active.
      renderer.setRenderTarget(trailTarget);
      renderer.render(fadeScene, trailCamera);
      if (pointerActive) {
        dotUniforms.uPos.value.set(smoothPos.x, smoothPos.y);
        renderer.render(dotScene, trailCamera);
      }

      // 2. Render the text plane, reading the trail buffer as a texture.
      renderer.setRenderTarget(null);
      renderer.clear();
      renderer.render(scene, camera);

      raf = requestAnimationFrame(tick);
    };

    return () => {
      unmounted = true;
      cancelAnimationFrame(raf);
      window.clearTimeout(pointerIdleTimer);
      ro.disconnect();
      io.disconnect();
      st.kill();
      trackEl.removeEventListener("pointermove", onMove);
      trackEl.removeEventListener("pointerleave", onLeave);
      quadGeo.dispose();
      fadeMat.dispose();
      dotMat.dispose();
      textGeo.dispose();
      textMat.dispose();
      texture.dispose();
      trailTarget.dispose();
      renderer.dispose();
    };
  }, [useWebGL]);

  if (!useWebGL) {
    return (
      <div className={styles.zone} aria-hidden="true">
        <div className={styles.staticWrap}>
          <span className={styles.staticWordmark}>{WORD}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.zone} ref={zoneRef} aria-hidden="true">
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
}
