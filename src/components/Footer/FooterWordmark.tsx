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
const TRAIL_FADE = 0.038; // makes trail fade out cleanly
const DOT_RADIUS = 0.05; // Smaller Gaussian cursor radius (5% of height)

// ── Trail buffer shaders (Aspect ratio corrected to render a perfect circle) ──
const DOT_FRAG = /* glsl */ `
  uniform vec2 uPos;
  uniform float uRadius;
  varying vec2 vUv;
  void main() {
    // Scale X by 4.0 to account for the 4:1 width ratio of the text plane
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

// ── Wordmark fragment-displacement shaders (Aspect ratio corrected circle) ──
const FRAG_SHADER = /* glsl */ `
  uniform sampler2D uTex;
  uniform sampler2D uTrail;
  uniform vec2 uMouse; // cursor coordinates in [0, 1] UV space
  uniform float uChroma;
  uniform float uOpacity;
  varying vec2 vUv;

  void main() {
    // Sample the fading trail buffer
    float trail = texture2D(uTrail, vUv).r;
    
    // Wavy liquid displacement: smooth sine/cosine warp modulated by trail intensity
    vec2 waveWarp = vec2(
      sin(vUv.y * 10.0 + trail * 4.0),
      cos(vUv.x * 40.0 + trail * 4.0)
    ) * trail * 0.006;
    
    // Rubbery elastic stretch: pull/squish UV coordinates centered on the mouse position
    vec2 toMouse = vUv - uMouse;
    vec2 toMouseAspect = vec2(toMouse.x * 4.0, toMouse.y);
    float distToMouse = length(toMouseAspect);
    float rubberForce = smoothstep(0.28, 0.0, distToMouse); // expanded rubbery influence radius
    
    // Safe normalization using a tiny epsilon to prevent division-by-zero on any GPU
    float safeDist = max(distToMouse, 0.001);
    // Pull/stretch coordinates towards cursor (elastic gum/rubber effect)
    vec2 rubberWarp = (toMouseAspect / safeDist) * rubberForce * 0.048;
    rubberWarp.x /= 4.0; // scale X back to UV space
    
    // Combine wave motion and rubber squish (subtracting pulls text towards mouse smoothly)
    vec2 uvWarped = vUv + waveWarp - rubberWarp;
    
    // Chromatic aberration splits colors ONLY near the active cursor position
    // Scale X by 4.0 to calculate distance in a uniform circular space on screen
    float dist = distance(vec2(vUv.x * 4.0, vUv.y), vec2(uMouse.x * 4.0, uMouse.y));
    float chromaForce = smoothstep(0.06, 0.0, dist); // Fades completely outside a tiny cursor radius
    float shift = chromaForce * uChroma;
    
    // Sample alphas to split channels
    float ra = texture2D(uTex, uvWarped + vec2(shift, 0.0)).a;
    float ga = texture2D(uTex, uvWarped).a;
    float ba = texture2D(uTex, uvWarped - vec2(shift, 0.0)).a;
    float textAlpha = ga;
    
    // Blend: 88% solid white text, 12% color-split channel for a very soft, transparent colored fringe
    vec3 baseColor = vec3(textAlpha);
    vec3 splitColor = vec3(ra, ga, ba);
    vec3 textRGB = mix(baseColor, splitColor, 0.12);
    
    // Soft, liquid glowing fringe on edges (almost invisible, highly premium)
    vec3 glowColor = vec3(1.0) * trail * 0.005 * (1.0 - textAlpha);
    vec3 color = textRGB * textAlpha + glowColor;
    
    float finalAlpha = max(textAlpha, trail * 0.02);
    
    gl_FragColor = vec4(color, finalAlpha * uOpacity);
  }
`;

export default function FooterWordmark() {
  const zoneRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const smokeContainerRef = useRef<HTMLDivElement>(null);
  const lastSpawnPos = useRef({ x: 0, y: 0 });
  const [useWebGL, setUseWebGL] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) return;
    if (!window.WebGLRenderingContext) return;
    requestAnimationFrame(() => {
      setUseWebGL(true);
    });
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

    // ── Safe Canvas Drawing (Centered, no vertical scale to prevent cuts) ──
    const texCanvas = document.createElement("canvas");
    texCanvas.width = TEX_W;
    texCanvas.height = TEX_H;
    const ctx = texCanvas.getContext("2d")!;

    const drawText = () => {
      ctx.clearRect(0, 0, TEX_W, TEX_H);
      const fontFamily = getComputedStyle(document.documentElement)
        .getPropertyValue("--font-display")
        .trim();
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      if ("letterSpacing" in ctx) {
        (ctx as unknown as { letterSpacing: string }).letterSpacing = "0.08em";
      }
      const fontSize = TEX_H * 0.65; // safe font size with generous padding margins
      const family = `${fontFamily || ""}, "Arial Black", sans-serif`;
      ctx.font = `900 ${fontSize}px ${family}`;

      ctx.save();
      ctx.translate(TEX_W / 2, TEX_H / 2);
      ctx.scale(0.96, 1.0); // Spans closer to the horizontal edges
      ctx.fillText(WORD, 0, fontSize * 0.02);
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

    // ── Trail buffer setup ───────────────────────────────────────────────
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

    // ── Main Scene Setup ──────────────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 2;

    const textUniforms = {
      uTex: { value: texture },
      uTrail: { value: trailTarget.texture },
      uMouse: { value: new THREE.Vector2(999, 999) },
      uRadius: { value: DOT_RADIUS },
      uChroma: { value: 0.001 }, // subtle color split
      uOpacity: { value: 1.0 },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader: PASSTHROUGH_VERT,
      fragmentShader: FRAG_SHADER,
      uniforms: textUniforms,
      transparent: true,
      depthWrite: false,
    });

    const baseWidth = 2.6;
    const baseHeight = baseWidth * (TEX_H / TEX_W); // 2.6 * 0.25 = 0.65
    const geometry = new THREE.PlaneGeometry(baseWidth, baseHeight);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // ── Resize handler (Fit aspect ratios and apply WebGL vertical stretch) ──
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

      // Extend close to borders (0.96 matches original layout)
      const targetWidth = aspect * 2 * 0.96;
      const currentScale = targetWidth / baseWidth;
      // Stretches height vertically by 1.48x natively in WebGL vector space
      mesh.scale.set(currentScale, currentScale * 1.48, 1.0);
    };
    const ro = new ResizeObserver(doResize);
    ro.observe(zone);
    doResize();

    // ── Mouse/Pointer Tracker ─────────────────────────────────────────────
    const trackEl = zone.closest("footer") ?? zone;
    const rawUV = new THREE.Vector2(0.5, 0.5);
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
        THREE.MathUtils.clamp(x, 0, 1),
        THREE.MathUtils.clamp(y, 0, 1)
      );
      qx(rawUV.x);
      qy(rawUV.y);
      pointerActive = true;

      // ── Spawns GSAP Smoke Particles ─────────────────────────────────────
      const smokeContainer = smokeContainerRef.current;
      if (smokeContainer) {
        const rect = smokeContainer.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const dist = Math.hypot(
          mouseX - lastSpawnPos.current.x,
          mouseY - lastSpawnPos.current.y
        );

        if (dist > 5) {
          for (let i = 0; i < 2; i++) {
            const particle = document.createElement("div");
            particle.className = styles.smokeParticle;
            const offsetX = (Math.random() - 0.5) * 8;
            const offsetY = (Math.random() - 0.5) * 8;
            particle.style.left = `${mouseX + offsetX}px`;
            particle.style.top = `${mouseY + offsetY}px`;
            smokeContainer.appendChild(particle);

            // Animate particle floating upwards, expanding and dissolving (longer duration for volumetric effect)
            gsap.to(particle, {
              x: "random(-28, 28)",
              y: "random(-75, -40)",
              scale: "random(2.0, 4.0)",
              opacity: 0,
              duration: "random(1.0, 1.6)",
              ease: "power1.out",
              onComplete: () => {
                particle.remove();
              },
            });
          }

          lastSpawnPos.current = { x: mouseX, y: mouseY };
        }
      }

      window.clearTimeout(pointerIdleTimer);
      pointerIdleTimer = window.setTimeout(() => {
        pointerActive = false;
      }, 60);
    };

    const onLeave = () => {
      pointerActive = false;
    };

    trackEl.addEventListener("pointermove", onMove);
    trackEl.addEventListener("pointerleave", onLeave);

    // ── Scroll Parallax ──────────────────────────────────────────────────
    gsap.registerPlugin(ScrollTrigger);
    const st = ScrollTrigger.create({
      trigger: zone,
      start: "top bottom",
      end: "bottom top",
      scrub: 0.6,
      onUpdate: (self) => {
        mesh.position.y = (self.progress - 0.5) * 0.35;
      },
    });

    // ── Intersection Observer ───────────────────────────────────────────
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

      renderer.setRenderTarget(trailTarget);
      renderer.render(fadeScene, trailCamera);
      if (pointerActive) {
        dotUniforms.uPos.value.set(smoothPos.x, smoothPos.y);
        renderer.render(dotScene, trailCamera);
      }

      renderer.setRenderTarget(null);
      renderer.clear();

      // Pass exact cursor coordinates in UV [0,1] space for local aberration
      if (pointerActive) {
        textUniforms.uMouse.value.set(smoothPos.x, smoothPos.y);
      } else {
        textUniforms.uMouse.value.set(999.0, 999.0);
      }

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
      geometry.dispose();
      material.dispose();
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
