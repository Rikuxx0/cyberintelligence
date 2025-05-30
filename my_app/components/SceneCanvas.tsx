"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { createGlobe } from './Globe';
import { createAttackLines } from './AttackLines';

export default function SceneCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 3, 5);
    scene.add(light);

    const earth = createGlobe('/textures/plants/dnb_land_ocean_ice.2012.3600x1800.jpg');
    scene.add(earth);

    const lines = createAttackLines();
    lines.forEach(line => scene.add(line));

    const animate = () => {
      requestAnimationFrame(animate);
      earth.rotation.y += 0.001;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      container.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="w-full h-screen" />;
}