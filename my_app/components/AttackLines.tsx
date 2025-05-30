"use client"

import * as THREE from 'three';

export function createAttackLines(count = 30): THREE.Line[] {
  const lines: THREE.Line[] = [];
  const material = new THREE.LineBasicMaterial({ color: 0xff0000 });

  for (let i = 0; i < count; i++) {
    const from = new THREE.Vector3(
      Math.random() * 2 - 1,
      Math.random() * 2 - 1,
      Math.random() * 2 - 1
    ).normalize().multiplyScalar(1.01);
    const to = new THREE.Vector3(
      Math.random() * 2 - 1,
      Math.random() * 2 - 1,
      Math.random() * 2 - 1
    ).normalize().multiplyScalar(1.2);

    const geometry = new THREE.BufferGeometry().setFromPoints([from, to]);
    const line = new THREE.Line(geometry, material);
    lines.push(line);
  }

  return lines;
}