"use client"

import * as THREE from 'three';

export function createGlobe(textureUrl: string) {
  const sphereGeometry = new THREE.SphereGeometry(1, 64, 64);
  const texture = new THREE.TextureLoader().load(textureUrl);
  const material = new THREE.MeshStandardMaterial({ map: texture });
  return new THREE.Mesh(sphereGeometry, material);
}

