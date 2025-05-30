'use client'

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber' ;
import { OrbitControls, Stars} from '@react-three/drei';
import * as THREE from 'three';

function Earth() {
    const earthRef = useRef<THREE.Mesh>(null!);

    //　回転アニメーション
    useFrame(() => {
        if (earthRef.current) {
            earthRef.current.rotation.y += 0.0015
        }
    });

    // テクスチャの読み込み
    const textureLoader = new THREE.TextureLoader();
    const cyberMap = textureLoader.load('/textures/planets/light_earth.jpg');
    
    return (
        <mesh ref={earthRef}>
            <sphereGeometry args={[1.45, 64, 64]} />
            <meshPhongMaterial 
                map={cyberMap}
                bumpScale={0.05}
                specular={new THREE.Color('white')}
            />
        </mesh>
    );
}

export default function ThreeGlobe() {
    return (
        <Canvas camera={{ position: [1, 1.5, 3], fov: 45}}>
            {/** 環境照明 */}
            <ambientLight intensity={1.5} />
            <pointLight color="#fff" position={[5, 3, 5]} intensity={1.3} />
            {/* 星を背景に */}
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} />
            {/* 地球 */}
            <Earth />
            {/* カメラ操作 */}
            <OrbitControls enableZoom={true} />
        </Canvas>
    );
}