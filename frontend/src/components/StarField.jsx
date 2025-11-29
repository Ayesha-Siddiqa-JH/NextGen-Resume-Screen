import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function StarField() {
    const starFieldRef = useRef();
    const starCount = 300; // Simpler for better performance

    const [positions, colors] = useMemo(() => {
        const pos = new Float32Array(starCount * 3);
        const cols = new Float32Array(starCount * 3);

        for (let i = 0; i < starCount; i++) {
            // Create star positions - closer to camera
            pos[i * 3] = (Math.random() - 0.5) * 60;
            pos[i * 3 + 1] = Math.random() * 40 - 10;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 40 - 20;

            // Gold and white colors
            const colorChoice = Math.random();
            if (colorChoice < 0.6) {
                // Gold
                cols[i * 3] = 1;     // R
                cols[i * 3 + 1] = 0.843; // G  
                cols[i * 3 + 2] = 0;     // B
            } else if (colorChoice < 0.8) {
                // Bright gold
                cols[i * 3] = 1;     // R
                cols[i * 3 + 1] = 0.9;   // G
                cols[i * 3 + 2] = 0.3;   // B
            } else {
                // White
                cols[i * 3] = 1;     // R
                cols[i * 3 + 1] = 1;     // G
                cols[i * 3 + 2] = 0.95;  // B
            }
        }

        return [pos, cols];
    }, []);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (starFieldRef.current) {
            // Simple rotation
            starFieldRef.current.rotation.y = time * 0.01;
            
            // Simple falling animation
            const pos = starFieldRef.current.geometry.attributes.position.array;
            for (let i = 0; i < starCount; i++) {
                const i3 = i * 3;
                pos[i3 + 1] -= 0.05; // Fall down
                
                // Reset if too low
                if (pos[i3 + 1] < -30) {
                    pos[i3 + 1] = 30;
                    pos[i3] = (Math.random() - 0.5) * 60;
                    pos[i3 + 2] = (Math.random() - 0.5) * 40 - 20;
                }
            }
            starFieldRef.current.geometry.attributes.position.needsUpdate = true;
        }
    });

    return (
        <points ref={starFieldRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={starCount}
                    array={positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={starCount}
                    array={colors}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={3}
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
