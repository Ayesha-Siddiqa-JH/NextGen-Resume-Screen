import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';

export default function AnimatedSphere({ position = [0, 0, 0], color = "#00d4ff", size = 1 }) {
    const meshRef = useRef();

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (meshRef.current) {
            // Complex floating animation
            meshRef.current.position.y = position[1] + Math.sin(time * 0.8) * 0.5 + Math.cos(time * 1.2) * 0.2;
            meshRef.current.position.x = position[0] + Math.sin(time * 0.6) * 0.3;
            
            // Multi-axis rotation with different speeds
            meshRef.current.rotation.x = time * 0.3 + Math.sin(time * 0.5) * 0.1;
            meshRef.current.rotation.y = time * 0.4 + Math.cos(time * 0.3) * 0.1;
            meshRef.current.rotation.z = Math.sin(time * 0.2) * 0.2;
            
            // Pulsing scale effect
            const scale = 1 + Math.sin(time * 2 + position[0]) * 0.1;
            meshRef.current.scale.set(scale, scale, scale);
        }
    });

    return (
        <Sphere ref={meshRef} args={[size, 128, 128]} position={position}>
            <MeshDistortMaterial
                color={color}
                attach="material"
                distort={0.6}
                speed={3}
                roughness={0.1}
                metalness={0.9}
                emissive={color}
                emissiveIntensity={0.2}
                transparent
                opacity={0.9}
            />
        </Sphere>
    );
}
