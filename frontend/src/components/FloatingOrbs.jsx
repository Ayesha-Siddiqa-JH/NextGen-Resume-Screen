import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function FloatingOrbs() {
    const orbsRef = useRef();
    const orbCount = 8;

    const orbs = useMemo(() => {
        const positions = new Float32Array(orbCount * 3);
        const colors = new Float32Array(orbCount * 3);
        const sizes = new Float32Array(orbCount);

        for (let i = 0; i < orbCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 20;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

            const color = new THREE.Color();
            const hue = Math.random();
            color.setHSL(hue, 0.8, 0.6);
            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;
            
            sizes[i] = Math.random() * 0.3 + 0.1;
        }

        return { positions, colors, sizes };
    }, []);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (orbsRef.current) {
            orbsRef.current.rotation.y = time * 0.1;
            orbsRef.current.rotation.x = time * 0.05;
            
            const positions = orbsRef.current.geometry.attributes.position.array;
            for (let i = 0; i < orbCount; i++) {
                const i3 = i * 3;
                const originalY = positions[i3 + 1];
                positions[i3 + 1] = originalY + Math.sin(time * 2 + i) * 0.5;
            }
            orbsRef.current.geometry.attributes.position.needsUpdate = true;
        }
    });

    return (
        <group ref={orbsRef}>
            {Array.from({ length: orbCount }, (_, i) => (
                <mesh key={i} position={[
                    orbs.positions[i * 3],
                    orbs.positions[i * 3 + 1],
                    orbs.positions[i * 3 + 2]
                ]}>
                    <sphereGeometry args={[orbs.sizes[i], 16, 16]} />
                    <meshStandardMaterial
                        color={[
                            orbs.colors[i * 3],
                            orbs.colors[i * 3 + 1],
                            orbs.colors[i * 3 + 2]
                        ]}
                        emissive={[
                            orbs.colors[i * 3],
                            orbs.colors[i * 3 + 1],
                            orbs.colors[i * 3 + 2]
                        ]}
                        emissiveIntensity={0.5}
                        transparent
                        opacity={0.6}
                        roughness={0.2}
                        metalness={0.8}
                    />
                </mesh>
            ))}
        </group>
    );
}
