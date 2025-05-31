import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';

// 地球＋ノードをまとめるグループ
function EarthWithNetwork() {
    const groupRef = useRef<THREE.Group>(null!);

    // 地球のテクスチャ
    const textureLoader = new THREE.TextureLoader();
    const cyberMap = textureLoader.load('/textures/planets/light_earth.jpg');

    // 回転アニメーション
    useFrame(() => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.0015;
        }
    });

    // 球体座標の計算関数
    function generateSphereCoords(lat: number, lon: number, radius: number) {
        const phi = (90 - lat) * (Math.PI / 180);
        const theta = (lon + 180) * (Math.PI / 180);
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.cos(phi);
        const z = radius * Math.sin(phi) * Math.sin(theta);
        return new THREE.Vector3(x, y, z);
    }

    const radius = 1.47;
    const nodeCount = 95;
    const maxDistance = 1.2;
    const nodes: THREE.Vector3[] = [];

    // ノード座標生成
    for (let i = 0; i < nodeCount; i++) {
        const lat = Math.random() * 180 - 90;
        const lon = Math.random() * 360 - 180;
        nodes.push(generateSphereCoords(lat, lon, radius));
    }

    // 点用ジオメトリ
    const pointPositions: number[] = [];
    nodes.forEach(node => {
        pointPositions.push(node.x, node.y, node.z);
    });
    const pointGeometry = new THREE.BufferGeometry();
    pointGeometry.setAttribute('position', new THREE.Float32BufferAttribute(pointPositions, 3));

    // 線用ジオメトリ
    const linePositions: number[] = [];
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            if (nodes[i].distanceTo(nodes[j]) < maxDistance) {
                linePositions.push(
                    nodes[i].x, nodes[i].y, nodes[i].z,
                    nodes[j].x, nodes[j].y, nodes[j].z
                );
            }
        }
    }
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));

    return (
        <group ref={groupRef}>
            {/* 地球本体 */}
            <mesh>
                <sphereGeometry args={[1.34, 64, 64]} />
                <meshPhongMaterial 
                    map={cyberMap}
                    bumpScale={0.05}
                    specular={new THREE.Color('white')}
                />
            </mesh>

            {/* ノード（点） */}
            <points geometry={pointGeometry}>
                <pointsMaterial size={0.03} color="#00ffff" />
            </points>

            {/* ライン */}
            <lineSegments geometry={lineGeometry}>
                <lineBasicMaterial 
                    color={0x00ffff}
                    transparent
                    opacity={0.6}
                />
            </lineSegments>
        </group>
    );
}

export default function ThreeGlobe() {
    return (
        <Canvas camera={{ position: [1.1, 1.5, 3], fov: 45 }}>
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
