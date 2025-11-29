import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Text3D, Center } from '@react-three/drei';

export default function ResumeDocument({ isScanning = false }) {
    const groupRef = useRef();

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (isScanning) {
            groupRef.current.rotation.y = time * 0.5;
            groupRef.current.position.y = Math.sin(time * 2) * 0.2;
        } else {
            groupRef.current.rotation.y = Math.sin(time * 0.3) * 0.2;
        }
    });

    return (
        <group ref={groupRef}>
            <Box args={[2, 2.8, 0.05]} position={[0, 0, 0]}>
                <meshStandardMaterial
                    color={isScanning ? "#00ff88" : "#ffffff"}
                    emissive={isScanning ? "#00ff88" : "#000000"}
                    emissiveIntensity={isScanning ? 0.5 : 0}
                    metalness={0.3}
                    roughness={0.4}
                />
            </Box>

            {/* Document lines */}
            {[...Array(8)].map((_, i) => (
                <Box
                    key={i}
                    args={[1.6, 0.08, 0.06]}
                    position={[0, 1 - i * 0.3, 0.03]}
                >
                    <meshStandardMaterial
                        color={isScanning ? "#00d4ff" : "#333333"}
                        emissive={isScanning ? "#00d4ff" : "#000000"}
                        emissiveIntensity={isScanning ? 0.3 : 0}
                    />
                </Box>
            ))}

            {isScanning && (
                <Box args={[2.2, 0.1, 0.1]} position={[0, 0, 0.1]}>
                    <meshStandardMaterial
                        color="#00ff88"
                        emissive="#00ff88"
                        emissiveIntensity={2}
                        transparent
                        opacity={0.6}
                    />
                </Box>
            )}
        </group>
    );
}
