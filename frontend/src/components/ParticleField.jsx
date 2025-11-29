import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function ParticleField() {
    const particlesRef = useRef();
    const particleCount = 3000; // Increased for denser field

    const particles = useMemo(() => {
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);

        for (let i = 0; i < particleCount; i++) {
            // Create more interesting distribution
            const radius = Math.random() * 30 + 10;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            
            positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = radius * Math.cos(phi);

            // Enhanced color palette with cyan, magenta, and green
            const colorChoice = Math.random();
            const color = new THREE.Color();
            if (colorChoice < 0.33) {
                color.setHSL(0.5, 0.8, 0.6); // Cyan
            } else if (colorChoice < 0.66) {
                color.setHSL(0.8, 0.8, 0.6); // Magenta
            } else {
                color.setHSL(0.3, 0.8, 0.6); // Green
            }
            
            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;
            
            // Variable sizes for depth
            sizes[i] = Math.random() * 0.15 + 0.05;
        }

        return { positions, colors, sizes };
    }, []);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (particlesRef.current) {
            // More complex rotation
            particlesRef.current.rotation.y = time * 0.03;
            particlesRef.current.rotation.x = time * 0.01;
            particlesRef.current.rotation.z = Math.sin(time * 0.5) * 0.1;
            
            // Pulsing effect
            const scale = 1 + Math.sin(time * 2) * 0.05;
            particlesRef.current.scale.set(scale, scale, scale);
        }
    });

    return (
        <points ref={particlesRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particleCount}
                    array={particles.positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={particleCount}
                    array={particles.colors}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-size"
                    count={particleCount}
                    array={particles.sizes}
                    itemSize={1}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.1}
                vertexColors
                transparent
                opacity={0.8}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </points>
    );
}
