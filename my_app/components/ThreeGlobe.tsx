'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';


// ネットワークと地球儀を出力する関数
function EarthWithNetwork() {
  // groupタグに対して維持するためのuseRef
  const groupRef = useRef<THREE.Group>(null!);
  // node接続を維持するためのuseRef
  const packetRefs = useRef<Array<{
    mesh: THREE.Mesh;
    fromIndex: number;
    toIndex: number;
    progress: number;
  }>>([]);

  const radius = 1.44;
  const nodeCount = 70;
  const maxDistance = 1.2;

  //nodesとnodes同士の接続するための変数
  const { nodes, connections } = useMemo(() => {
    const generatedNodes: THREE.Vector3[] = [];
    for (let i = 0; i < nodeCount; i++) {
      const lat = Math.random() * 180 - 90;
      const lon = Math.random() * 360 - 180;
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.cos(phi);
      const z = radius * Math.sin(phi) * Math.sin(theta);
      generatedNodes.push(new THREE.Vector3(x, y, z));
    }

    // nodesを配置するためのプログラム
    const conns: number[][] = generatedNodes.map(() => []);
    for (let i = 0; i < generatedNodes.length; i++) {
      for (let j = i + 1; j < generatedNodes.length; j++) {
        if (generatedNodes[i].distanceTo(generatedNodes[j]) < maxDistance) {
          conns[i].push(j);
          conns[j].push(i);
        }
      }
    }

    return { nodes: generatedNodes, connections: conns };
  }, []);


  //nodes同士の通信をする状態を実行するためのuseEffect
  useEffect(() => {
    const packetCount = 100;
    for (let i = 0; i < packetCount; i++) {
      const fromIndex = Math.floor(Math.random() * nodes.length);
      const neighbors = connections[fromIndex];
      if (neighbors.length === 0) continue;
      const toIndex = neighbors[Math.floor(Math.random() * neighbors.length)];
      
      //パケットの設定
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.01, 2, 2),
        new THREE.MeshBasicMaterial({ color: 0x00ffff })
      );
      mesh.position.copy(nodes[fromIndex]);
      groupRef.current?.add(mesh);

      packetRefs.current.push({ mesh, fromIndex, toIndex, progress: 0 });
    }
  }, [nodes, connections]);

  //three.jsの依存により、useFrameで、groupRefに対して、回転状態を維持させている
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.0015;
    }

    packetRefs.current.forEach(packet => {
      packet.progress += 0.014;
      if (packet.progress >= 1) {
        packet.fromIndex = packet.toIndex;
        const nextCandidates = connections[packet.fromIndex];
        if (nextCandidates.length === 0) return;
        packet.toIndex = nextCandidates[Math.floor(Math.random() * nextCandidates.length)];
        packet.progress = 0;
      }

      const from = nodes[packet.fromIndex];
      const to = nodes[packet.toIndex];
      packet.mesh.position.lerpVectors(from, to, packet.progress);
    });
  });

  //　x,y,zを作成するためのbuffer　→ 接続線を作るため
  const pointPositions = useMemo(() => {
    const positions: number[] = [];
    nodes.forEach(n => positions.push(n.x, n.y, n.z));
    return new THREE.Float32BufferAttribute(positions, 3);
  }, [nodes]);

  // nodes同士の接続線作成するプログラム
  const linePositions = useMemo(() => {
    const positions: number[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].distanceTo(nodes[j]) < maxDistance) {
          positions.push(
            nodes[i].x, nodes[i].y, nodes[i].z,
            nodes[j].x, nodes[j].y, nodes[j].z
          );
        }
      }
    }
    return new THREE.Float32BufferAttribute(positions, 3);
  }, [nodes]);

  // テクスチャの読み込み
  const textureLoader = new THREE.TextureLoader();
  const cyberMap = textureLoader.load('/textures/planets/light_earth.jpg');

  // 返り値
  return (
    <group ref={groupRef}>
      {/** 地球儀 */}
      <mesh>
        <sphereGeometry args={[1.32, 64, 64]} />
        <meshPhongMaterial map={cyberMap} bumpScale={0.05} specular={new THREE.Color('white')} />
      </mesh>
      
      {/**　nodes */}
      <points geometry={new THREE.BufferGeometry().setAttribute('position', pointPositions)}>
        <pointsMaterial size={0.025} color="#00ffff" />
      </points>
      
      {/** nodes同士の接続線 */}
      <lineSegments geometry={new THREE.BufferGeometry().setAttribute('position', linePositions)}>
        <lineBasicMaterial color={0x00ffff} transparent opacity={0.7} />
      </lineSegments>
    </group>
  );
}

export default function ThreeGlobe() {
  return (
    <Canvas camera={{ position: [1, 1.5, 3], fov: 45 }}>
      {/** 環境照明 */}
      <ambientLight intensity={1.5} />
      <pointLight color="#fff" position={[5, 3, 5]} intensity={1.3} />
      {/* 星を背景に */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} />
      {/* ネットワークを張り巡らせた地球 */}
      <EarthWithNetwork />
       {/* カメラ操作 */}
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
}
