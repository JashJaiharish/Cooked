"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function WebGLScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setHasWebGL(false);
      return;
    }

    try {
      const testCanvas = document.createElement("canvas");
      const gl = testCanvas.getContext("webgl") || testCanvas.getContext("experimental-webgl");
      if (!gl) {
        setHasWebGL(false);
        return;
      }
    } catch {
      setHasWebGL(false);
      return;
    }

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 32;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    const spaceGroup = new THREE.Group();
    scene.add(spaceGroup);

    // 1. DISTANT STARFIELD (Warm Ivory, Atmospheric Blue, Soft Peach)
    const starCount = 850;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    const colorIvory = new THREE.Color(0xf1ede4);
    const colorPeach = new THREE.Color(0xe8a27c);
    const colorAtmospheric = new THREE.Color(0x8b7fa8);

    for (let i = 0; i < starCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 90;
      starPositions[i + 1] = (Math.random() - 0.5) * 60;
      starPositions[i + 2] = (Math.random() - 0.5) * 50;

      const rand = Math.random();
      const col = rand > 0.88 ? colorPeach : rand > 0.7 ? colorAtmospheric : colorIvory;
      starColors[i] = col.r;
      starColors[i + 1] = col.g;
      starColors[i + 2] = col.b;
    }

    starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute("color", new THREE.BufferAttribute(starColors, 3));

    const starMaterial = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    const starfield = new THREE.Points(starGeometry, starMaterial);
    spaceGroup.add(starfield);

    // 2. CELESTIAL STARDUST / SUBTLE NEBULA PARTICLES
    const dustCount = 160;
    const dustGeometry = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(dustCount * 3);

    for (let i = 0; i < dustCount * 3; i += 3) {
      dustPositions[i] = (Math.random() - 0.5) * 50;
      dustPositions[i + 1] = (Math.random() - 0.5) * 35;
      dustPositions[i + 2] = (Math.random() - 0.5) * 25;
    }

    dustGeometry.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));
    const dustMaterial = new THREE.PointsMaterial({
      size: 0.22,
      color: 0xe8a27c,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending,
    });
    const dust = new THREE.Points(dustGeometry, dustMaterial);
    spaceGroup.add(dust);

    // Mouse Tracking Parallax & Gravitational Drift (Mango Media Inspired)
    let targetX = 0;
    let targetY = 0;
    let mouseNDC_X = 0;
    let mouseNDC_Y = 0;
    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;

    const onPointerMove = (event: MouseEvent) => {
      targetX = (event.clientX - windowHalfX) * 0.0003;
      targetY = (event.clientY - windowHalfY) * 0.0003;
      mouseNDC_X = (event.clientX / window.innerWidth) * 2 - 1;
      mouseNDC_Y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const onResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      windowHalfX = newWidth / 2;
      windowHalfY = newHeight / 2;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("resize", onResize);

    // Animation Loop
    let reqId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Quiet celestial drift
      spaceGroup.rotation.y += 0.0004;
      dust.rotation.y -= 0.0002;

      // Mango Media Gravitational Stardust Drift
      dust.position.x = THREE.MathUtils.lerp(dust.position.x, mouseNDC_X * 2.2, 0.03);
      dust.position.y = THREE.MathUtils.lerp(dust.position.y, mouseNDC_Y * 2.2, 0.03);

      // Gentle Parallax
      spaceGroup.rotation.x = THREE.MathUtils.lerp(
        spaceGroup.rotation.x,
        targetY * 0.3 + Math.sin(elapsed * 0.15) * 0.02,
        0.03
      );
      spaceGroup.rotation.y = THREE.MathUtils.lerp(
        spaceGroup.rotation.y,
        spaceGroup.rotation.y + targetX * 0.3,
        0.03
      );

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onResize);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }

      starGeometry.dispose();
      starMaterial.dispose();
      dustGeometry.dispose();
      dustMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  if (!hasWebGL) return null;

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    />
  );
}
