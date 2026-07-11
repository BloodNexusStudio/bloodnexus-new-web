"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { GAMES } from "@/data/games";
import Link from "next/link";
import styles from "./HeroCarousel.module.css";

// ── Cylindrical-drum constants ────────────────────────────────────────────────
const DRUM_R   = 7.0;                 // ring radius (world units)
const CAM_Z    = 10.0;                // camera z
const FOV      = 55;                  // vertical FOV (°)
const CARD_W   = 3.6;                 // card width (world units)
const CARD_H   = CARD_W * (10 / 16); // 16:10 aspect
const STEP     = Math.PI / 2;         // 90° per card — 4 cards fill the ring
const DUR      = 0.85;
const EASE     = "expo.out";
const DRAG_S   = 0.003;              // rad / px
const AUTOPLAY = 4800;

const RING_RADII = Array.from({ length: 20 }, (_, i) => 150 + i * 32);

// ── Shaders ───────────────────────────────────────────────────────────────────
const VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const FRAG = /* glsl */ `
  varying vec2 vUv;
  uniform sampler2D uTex;
  uniform float uOpacity;
  uniform float uHasTex;
  void main() {
    vec4 tex      = texture2D(uTex, vUv);
    vec4 fallback = vec4(0.016, 0.031, 0.12, 1.0);
    vec4 col      = mix(fallback, tex, uHasTex);
    gl_FragColor  = vec4(col.rgb, col.a * uOpacity);
  }
`;

// Normalise angle to [-π, π]
function normAngle(a: number): number {
  return a - Math.round(a / (2 * Math.PI)) * (2 * Math.PI);
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function HeroCarousel() {
  const N = GAMES.length; // 4

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedRef = useRef(false);

  // Three.js
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const pivotRef   = useRef<THREE.Group | null>(null);
  const meshesRef  = useRef<THREE.Mesh[]>([]);
  const pivotYRef  = useRef(0); // cumulative Y rotation (never modded — clean wrapping)

  // Drag
  const drag = useRef({ down: false, startX: 0, startPivotY: 0 });

  // Overlay
  const overlayRef = useRef<HTMLDivElement>(null);

  // ── Navigation ───────────────────────────────────────────────────────────
  const go = useCallback(
    (dir: number) => {
      const newY = pivotYRef.current - dir * STEP;
      pivotYRef.current = newY;
      const idx = Math.round(-newY / STEP);
      const newActive = ((idx % N) + N) % N;
      setActive(newActive);
      if (pivotRef.current) {
        gsap.killTweensOf(pivotRef.current.rotation);
        gsap.to(pivotRef.current.rotation, { y: newY, duration: DUR, ease: EASE });
      }
    },
    [N],
  );

  // ── Staggered text reveal ────────────────────────────────────────────────
  const revealText = useCallback(() => {
    if (!overlayRef.current || reducedRef.current) return;
    gsap.fromTo(
      overlayRef.current.querySelectorAll("[data-reveal]"),
      { y: 28, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.72, ease: "power3.out", stagger: 0.07, clearProps: "transform" },
    );
  }, []);

  useEffect(() => {
    revealText();
  }, [active, revealText]);

  // ── Three.js init ────────────────────────────────────────────────────────
  useEffect(() => {
    reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const canvas  = canvasRef.current!;
    const section = canvas.closest("section") as HTMLElement;

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(FOV, 16 / 9, 0.1, 200);
    camera.position.z = CAM_Z;
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setSize(100, 100, false);
    renderer.setClearColor(0x000000, 0);

    const doResize = () => {
      const r = section.getBoundingClientRect();
      const W = Math.round(r.width);
      const H = Math.round(r.height);
      if (W < 10 || H < 10) return;
      renderer.setSize(W, H, false);
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(doResize);
    ro.observe(section);
    doResize();

    // ── Pivot group: rotating this IS the drum rotation ─────────────────
    const pivot = new THREE.Group();
    pivotRef.current = pivot;
    scene.add(pivot);

    const geo    = new THREE.PlaneGeometry(CARD_W, CARD_H, 1, 1);
    const meshes: THREE.Mesh[] = [];
    const imgs: HTMLImageElement[] = [];
    let unmounted = false;

    GAMES.forEach((game, i) => {
      const angle = i * STEP; // each card's fixed angle on the ring

      const mat = new THREE.ShaderMaterial({
        vertexShader: VERT,
        fragmentShader: FRAG,
        uniforms: {
          uTex:    { value: new THREE.Texture() },
          uOpacity:{ value: 0.0 },
          uHasTex: { value: 0.0 },
        },
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
      });

      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(
        DRUM_R * Math.sin(angle),
        0,
        DRUM_R * Math.cos(angle),
      );
      mesh.rotation.y = angle;
      pivot.add(mesh);
      meshes.push(mesh);

      // Native Image load — bypasses THREE.TextureLoader's ImageBitmap path
      // which silently drops callbacks under React StrictMode double-mount.
      // No crossOrigin: images are same-origin, setting it causes SecurityError
      // in WebGL's texImage2D (tainted canvas) which Three.js swallows silently.
      const img = new Image();
      imgs.push(img);
      img.onload = () => {
        if (unmounted) return;
        const tex = new THREE.Texture(img);
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.needsUpdate = true;
        (mat.uniforms.uTex.value as THREE.Texture).dispose();
        mat.uniforms.uTex.value = tex;
        mat.uniforms.uHasTex.value = 1.0;
      };
      img.onerror = () => console.error("[HeroCarousel] img failed:", game.keyArt);
      img.src = game.keyArt;
    });
    meshesRef.current = meshes;

    // ── Render loop: per-frame scale + opacity derived from drum angle ────
    let raf: number;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const pivotY = pivot.rotation.y;

      meshes.forEach((mesh, i) => {
        const raw = i * STEP + pivotY;
        const eff = normAngle(raw);
        const abs = Math.abs(eff);
        const c   = Math.max(0, Math.cos(abs)); // 1 at 0°, 0 at 90°

        // Scale: full at centre, shrinks as card rotates away
        mesh.scale.setScalar(c * 0.68 + 0.32);

        // Opacity: cos^1.6 curve — smooth cross-fade during transition
        const mat = mesh.material as THREE.ShaderMaterial;
        mat.uniforms.uOpacity.value = Math.pow(c, 1.6);

        // Active card renders on top
        mesh.renderOrder = 100 - Math.round(abs * 25);
      });

      renderer.render(scene, camera);
    };
    tick();

    return () => {
      unmounted = true;
      imgs.forEach((img) => { img.onload = null; img.onerror = null; });
      cancelAnimationFrame(raf);
      ro.disconnect();
      geo.dispose();
      meshes.forEach((m) => {
        const mat = m.material as THREE.ShaderMaterial;
        (mat.uniforms.uTex.value as THREE.Texture | null)?.dispose();
        mat.dispose();
      });
      // Must dispose on real unmount (e.g. navigating away and back) or the
      // old WebGL context leaks and corrupts compositing for the rest of the
      // page on remount — content after the hero renders as solid black
      // despite fully correct DOM/CSS. React StrictMode's dev-only synthetic
      // double-invoke re-triggers this same cleanup on the same canvas node;
      // that's a harmless dev-mode blip and production never runs StrictMode,
      // so correctness on real navigation wins over avoiding it.
      renderer.dispose();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Autoplay ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (paused || reducedRef.current) return;
    const id = setInterval(() => go(1), AUTOPLAY);
    return () => clearInterval(id);
  }, [paused, go]);

  // ── Pointer handlers ──────────────────────────────────────────────────────
  const onPDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest("[data-nodrag]")) return;
    drag.current = { down: true, startX: e.clientX, startPivotY: pivotYRef.current };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    setPaused(true);
    if (pivotRef.current) gsap.killTweensOf(pivotRef.current.rotation);
  };

  const onPMove = (e: React.PointerEvent) => {
    if (drag.current.down) {
      const dx = e.clientX - drag.current.startX;
      if (pivotRef.current) {
        pivotRef.current.rotation.y = drag.current.startPivotY + dx * DRAG_S;
      }
    }
  };

  const onPUp = () => {
    if (!drag.current.down) return;
    drag.current.down = false;
    if (!pivotRef.current) return;
    const curY     = pivotRef.current.rotation.y;
    const snapIdx  = Math.round(-curY / STEP);
    const snappedY = -snapIdx * STEP;
    const snappedActive = ((snapIdx % N) + N) % N;
    pivotYRef.current = snappedY;
    setActive(snappedActive);
    gsap.to(pivotRef.current.rotation, { y: snappedY, duration: 0.6, ease: EASE });
    setPaused(false);
  };

  // ── Thumbnail direct jump (shortest-path rotation) ────────────────────────
  const jumpTo = useCallback(
    (i: number) => {
      const rawDiff   = i - active;
      const shortDiff = rawDiff - Math.round(rawDiff / N) * N;
      const newY      = pivotYRef.current - shortDiff * STEP;
      pivotYRef.current = newY;
      setActive(i);
      if (pivotRef.current) {
        gsap.killTweensOf(pivotRef.current.rotation);
        gsap.to(pivotRef.current.rotation, { y: newY, duration: DUR, ease: EASE });
      }
    },
    [active, N],
  );

  const current = GAMES[active];

  return (
    <section
      className={styles.section}
      aria-roledescription="carousel"
      aria-label="Featured games"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Per-slide blurred background tint */}
      <div className={styles.bg} aria-hidden="true">
        {GAMES.map((g, i) => (
          <div
            key={g.slug}
            className={styles.bgLayer}
            style={{ backgroundImage: `url(${g.keyArt})`, opacity: i === active ? 1 : 0 }}
          />
        ))}
        <div className={styles.bgTint} />

        {/* Warped topographic contour rings */}
        <svg
          className={styles.rings}
          viewBox="0 0 1000 1000"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <filter id="bn-topo" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.0042"
                numOctaves={2}
                seed={11}
                result="n"
              />
              <feDisplacementMap in="SourceGraphic" in2="n" scale={80} />
            </filter>
          </defs>
          <g filter="url(#bn-topo)" fill="none" stroke="rgba(242,239,233,0.14)" strokeWidth={1.4}>
            {RING_RADII.map((r) => (
              <circle key={r} cx={500} cy={540} r={r} />
            ))}
          </g>
        </svg>
      </div>

      {/* WebGL canvas stage */}
      <div
        className={styles.stage}
        onPointerDown={onPDown}
        onPointerMove={onPMove}
        onPointerUp={onPUp}
        onPointerCancel={onPUp}
      >
        <canvas ref={canvasRef} className={styles.canvas} />
      </div>

      {/* Top label */}
      <div className={`container ${styles.topLabel}`}>
        <p className="label">Featured Games</p>
      </div>

      {/* Synchronized staggered DOM text reveal */}
      <div className={`container ${styles.overlay}`} ref={overlayRef}>
        <div className={styles.badges} data-reveal>
          <span className={styles.status}>{current.status}</span>
          {current.genre && (
            <span className={styles.category}>{current.genre}</span>
          )}
        </div>
        <h2 className={styles.cardTitle} data-reveal>
          {current.title}
        </h2>
        <p className={styles.hook} data-reveal>
          {current.hook}
        </p>
        <Link
          href={`/games/${current.slug}`}
          className="pill pill--primary"
          data-reveal
          data-nodrag
        >
          Launch
        </Link>
      </div>

      {/* Right-side navigation */}
      <div className={styles.side} data-nodrag>
        <div className={styles.arrows}>
          <button
            className={styles.arrow}
            aria-label="Previous game"
            onClick={() => go(-1)}
          >
            ↑
          </button>
          <button
            className={styles.arrow}
            aria-label="Next game"
            onClick={() => go(1)}
          >
            ↓
          </button>
        </div>
        <Link href="/games" className={styles.seeAll}>
          See All Games <span aria-hidden="true">→</span>
        </Link>
      </div>

      {/* Thumbnail strip */}
      <div className={styles.thumbs} data-nodrag>
        {GAMES.map((game, i) => (
          <button
            key={game.slug}
            className={styles.thumb}
            data-active={i === active}
            aria-label={`Show ${game.title}`}
            onClick={() => jumpTo(i)}
          >
            <img src={game.keyArt} alt="" aria-hidden="true" />
          </button>
        ))}
      </div>
    </section>
  );
}
