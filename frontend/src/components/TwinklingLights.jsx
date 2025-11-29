import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function TwinklingLights() {
    const lightsRef = useRef();
    const lightCount = 50;

    const lights = useMemo(() => {
        const positions = new Float32Array(lightCount * 3);
        const colors = new Float32Array(lightCount * 3);
        const intensities = new Float32Array(lightCount);

        for (let i = 0; i < lightCount; i++) {
            // Distribute lights in a more focused area
            positions[i * 3] = (Math.random() - 0.5) * 40;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

            // Colorful lights - cyan, magenta, yellow, white
            const colorChoice = Math.random();
            const color = new THREE.Color();
            if (colorChoice < 0.25) {
                color.setHSL(0.5, 1, 0.6); // Cyan
            } else if (colorChoice < 0.5) {
                color.setHSL(0.8, 1, 0.6); // Magenta
            } else if (colorChoice < 0.75) {
                color.setHSL(0.15, 1, 0.6); // Yellow
            } else {
                color.setHSL(0, 0, 1); // White
            }
            
            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;
            
            intensities[i] = Math.random() * 0.5 + 0.5;
        }

        return { positions, colors, intensities };
    }, []);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (lightsRef.current) {
            // Gentle rotation
            lightsRef.current.rotation.y = time * 0.02;
            lightsRef.current.rotation.x = time * 0.01;
            
            // Update light intensities for pulsing/twinkling
            const intensities = lightsRef.current.geometry.attributes.intensity.array;
            for (let i = 0; i < lightCount; i++) {
                const pulseSpeed = Math.random() * 2 + 0.5;
                const pulseIntensity = Math.sin(time * pulseSpeed + i * 0.5) * 0.3 + 0.7;
                intensities[i] = pulseIntensity;
            }
            lightsRef.current.geometry.attributes.intensity.needsUpdate = true;
        }
    });

    return (
        <group ref={lightsRef}>
            {Array.from({ length: lightCount }, (_, i) => (
                <mesh key={i} position={[
                    lights.positions[i * 3],
                    lights.positions[i * 3 + 1],
                    lights.positions[i * 3 + 2]
                ]}>
                    <sphereGeometry args={[0.05, 8, 8]} />
                    <meshBasicMaterial
                        color={[
                            lights.colors[i * 3],
                            lights.colors[i * 3 + 1],
                            lights.colors[i * 3 + 2]
                        ]}
                        transparent
                        opacity={lights.intensities[i]}
                    />
                </mesh>
            ))}
        </group>
    );
}
