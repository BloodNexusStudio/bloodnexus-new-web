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
const TRAIL_FADE = 0.045; // per-frame darken amount — controls trail length
const DOT_RADIUS = 0.022;

// ── Trail buffer shaders ─────────────────────────────────────────────────────
const DOT_FRAG = /* glsl */ `
  uniform vec2 uPos;
  uniform float uRadius;
  varying vec2 vUv;
  void main() {
    // Scale X by 4.0 to correct the 4:1 width-to-height ratio of the text plane and render a perfect circle
    float d = distance(vec2(vUv.x * 4.0, vUv.y), vec2(uPos.x * 4.0, uPos.y));
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
const TEXT_FRAG = /* glsl */ `
  uniform sampler2D uTex;
  uniform sampler2D uTrail;
  uniform vec2 uMouse;
  uniform vec2 uVelocity;
  uniform float uOpacity;
  varying vec2 vUv;

  void main() {
    float amt = texture2D(uTrail, vUv).r;
    
    // Aspect-ratio corrected circular distance to mouse
    float dist = distance(vec2(vUv.x * 4.0, vUv.y), vec2(uMouse.x * 4.0, uMouse.y));
    
    // Smooth Gaussian influence envelope (radius 0.13 in screen space)
    float influence = exp(-(dist * dist) / (0.13 * 0.13 * 0.5));
    
    // Drag warp: pull coordinates along the velocity vector modulated by influence (increased stretch)
    vec2 dragWarp = uVelocity * influence * 5.2;
    
    // Clamp warp to prevent extreme stretching
    float dragLen = length(dragWarp);
    float maxDrag = 0.048; // increased maximum stretch
    if (dragLen > maxDrag) {
      dragWarp *= maxDrag / dragLen;
    }
    vec2 uvWarped = vUv - dragWarp;

    float hot = smoothstep(0.6, 0.95, amt);
    vec2 dir = vec2(0.0016, 0.0006) * hot;
    float ra = texture2D(uTex, uvWarped + dir).a;
    float ga = texture2D(uTex, uvWarped).a;
    float ba = texture2D(uTex, uvWarped - dir).a;
    float textAlpha = max(ra, max(ga, ba));

    vec3 glow = vec3(1.0) * amt * 0.1 * (1.0 - textAlpha);
    vec3 color = vec3(ra, ga, ba) * textAlpha + glow;
    
    // Mask out the trail dot completely outside the letters to ensure the circle doesn't appear
    float alpha = textAlpha * uOpacity;

    if (alpha < 0.02) discard;
    gl_FragColor = vec4(min(color, vec3(1.0)), alpha);
  }
`;

export default function FooterWordmark() {
  const zoneRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const smokeContainerRef = useRef<HTMLDivElement>(null);
  const [useWebGL, setUseWebGL] = useState(false);
  const lastSpawnPos = useRef({ x: 0, y: 0 });
  const prevPos = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) return;
    if (!window.WebGLRenderingContext) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
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

      // 85% of TEX_H — leaves safe room for capital ascenders at top/bottom of canvas
      const fontSize = TEX_H * 0.85;
      // Anton is weight 400! Set weight 400 so the browser matches the Anton font instead of falling back.
      const family = `${fontFamily || "Anton"}, "Arial Black", Impact, sans-serif`;
      ctx.font = `400 ${fontSize}px ${family}`;

      // Measure actual text width and compute scale to fill full canvas width
      const measured = ctx.measureText(WORD);
      const textW = measured.width;
      // Use 80% fill instead of 92% to give ~10% safety margins on left/right, preventing horizontal viewport clipping
      const scaleX = (TEX_W * 0.80) / textW;

      ctx.save();
      ctx.translate(TEX_W / 2, TEX_H / 2);
      ctx.scale(scaleX, 1.0);
      ctx.fillText(WORD, 0, 0);
      ctx.restore();
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

    // Retries at 200ms, 800ms, and 2000ms to guarantee late-loading webfonts are redrawn
    const fontTimers = [200, 800, 2000].map((delay) =>
      setTimeout(() => {
        if (unmounted) return;
        drawText();
        texture.needsUpdate = true;
      }, delay)
    );

    // ── Trail buffer ─────────────────────────────────────────────────────
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

    // ── Main scene ────────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 2;

    const textUniforms = {
      uTex: { value: texture },
      uTrail: { value: trailTarget.texture },
      uMouse: { value: new THREE.Vector2(999, 999) },
      uVelocity: { value: new THREE.Vector2(0, 0) },
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
    // Position mesh close to bottom of absolute container
    const SHIFT_Y = -0.08;
    mesh.position.y = SHIFT_Y;
    scene.add(mesh);

    // ── Resize handler ────────────────────────────────────────────────────
    const doResize = () => {
      const r = zone.getBoundingClientRect();
      const w = Math.round(r.width);
      const h = Math.round(r.height);
      if (w < 10 || h < 10) return;
      renderer.setSize(w, h, false);
      const aspect = w / h;

      // Width: fill full canvas width edge-to-edge
      const targetWidth = aspect * 2;
      const currentScale = targetWidth / baseWidth;

      // Height: scale so mesh fills the zone height completely
      // meshBaseH = 0.65 (baseWidth * TEX_H/TEX_W), camera height = 2 (top=1 to bottom=-1)
      // We want mesh.scale.y * 0.65 = camera height
      // Height: scale Y to perfect aspect ratio to fit camera viewport exactly without stretching or clipping
      const scaleY = 2.0 / 0.65;

      camera.left = -aspect;
      camera.right = aspect;
      // Camera tracks the shifted mesh exactly — no clipping on any edge
      // Mesh center at SHIFT_Y=-0.08, half-height=1.0, and moves up to ±0.15 via scroll parallax.
      const halfH = 1.0;
      const PAD = 0.03; // tiny breathing room so edges don't hard-clip
      const maxParallaxOffset = 0.18; // safe margin for scroll offset
      camera.top    =  halfH + SHIFT_Y + maxParallaxOffset + PAD;   // ~1.13
      camera.bottom = -halfH + SHIFT_Y - maxParallaxOffset - PAD;   // ~-1.29
      camera.updateProjectionMatrix();

      mesh.scale.set(currentScale, scaleY, 1.0);
    };
    const ro = new ResizeObserver(doResize);
    ro.observe(zone);
    doResize();

    // ── Pointer tracking + GSAP Elastic QuickTo ───────────────────────────
    const trackEl = zone.closest("footer") ?? zone;
    const rawUV = new THREE.Vector2(0.5, 0.5);
    const smoothPos = { x: 0.5, y: 0.5 };
    const qx = gsap.quickTo(smoothPos, "x", {
      duration: 1.4,
      ease: "elastic.out(1.2, 0.75)",
    });
    const qy = gsap.quickTo(smoothPos, "y", {
      duration: 1.4,
      ease: "elastic.out(1.2, 0.75)",
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

      // ── Smoke Spawner (Increased Density) ────────────────────────────────
      const smokeContainer = smokeContainerRef.current;
      if (smokeContainer) {
        const rect = smokeContainer.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const dist = Math.hypot(
          mouseX - lastSpawnPos.current.x,
          mouseY - lastSpawnPos.current.y
        );

        // Spawn more frequently (threshold 4px instead of 8px)
        if (dist > 4) {
          // Spawn 5 particles instead of 2 for maximum smoke density
          for (let i = 0; i < 5; i++) {
            const particle = document.createElement("div");
            particle.className = styles.smokeParticle;

            const r1 = Math.floor(Math.random() * 30) + 35;
            const r2 = 100 - r1;
            const r3 = Math.floor(Math.random() * 30) + 35;
            const r4 = 100 - r3;
            const r5 = Math.floor(Math.random() * 30) + 35;
            const r6 = 100 - r5;
            const r7 = Math.floor(Math.random() * 30) + 35;
            const r8 = 100 - r7;
            particle.style.borderRadius = `${r1}% ${r2}% ${r3}% ${r4}% / ${r5}% ${r6}% ${r7}% ${r8}%`;
            particle.style.transform = `rotate(${Math.random() * 360}deg)`;

            const offsetX = (Math.random() - 0.5) * 12;
            const offsetY = (Math.random() - 0.5) * 12;
            particle.style.left = `${mouseX + offsetX}px`;
            particle.style.top = `${mouseY + offsetY}px`;
            smokeContainer.appendChild(particle);

            // Richer initial opacity (0.28 instead of 0.16) and larger scales
            gsap.fromTo(particle,
              { opacity: 0.28, scale: 0.5 },
              {
                x: "random(-32, 32)",
                y: "random(-85, -50)",
                scale: "random(1.4, 2.4)",
                opacity: 0,
                duration: "random(1.0, 1.6)",
                ease: "power1.out",
                onComplete: () => {
                  particle.remove();
                },
              }
            );
          }
          lastSpawnPos.current = { x: mouseX, y: mouseY };
        }
      }

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

    // ── Scroll parallax ───────────────────────────────────────────────────
    gsap.registerPlugin(ScrollTrigger);
    const st = ScrollTrigger.create({
      trigger: zone,
      start: "top bottom",
      end: "bottom top",
      scrub: 0.6,
      onUpdate: (self) => {
        mesh.position.y = SHIFT_Y + (self.progress - 0.5) * 0.3;
      },
    });

    // ── Intersection Observer ─────────────────────────────────────────────
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

      let vx = 0;
      let vy = 0;
      if (pointerActive) {
        vx = smoothPos.x - prevPos.current.x;
        vy = smoothPos.y - prevPos.current.y;
        prevPos.current.x = smoothPos.x;
        prevPos.current.y = smoothPos.y;
      } else {
        prevPos.current.x = 0.5;
        prevPos.current.y = 0.5;
      }

      renderer.setRenderTarget(trailTarget);
      renderer.render(fadeScene, trailCamera);
      if (pointerActive) {
        dotUniforms.uPos.value.set(smoothPos.x, smoothPos.y);
        renderer.render(dotScene, trailCamera);
      }

      renderer.setRenderTarget(null);
      renderer.clear();
      
      // Update WebGL shader uniforms for the circular elastic drag
      if (pointerActive) {
        textUniforms.uMouse.value.set(smoothPos.x, smoothPos.y);
        textUniforms.uVelocity.value.set(vx, vy);
      } else {
        textUniforms.uMouse.value.set(999.0, 999.0);
        textUniforms.uVelocity.value.set(0.0, 0.0);
      }

      renderer.render(scene, camera);

      raf = requestAnimationFrame(tick);
    };

    return () => {
      unmounted = true;
      cancelAnimationFrame(raf);
      window.clearTimeout(pointerIdleTimer);
      fontTimers.forEach(clearTimeout);
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
      <div ref={smokeContainerRef} className={styles.smokeContainer} />
    </div>
  );
}
