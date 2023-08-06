import { Stars} from '@react-three/drei';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Mesh } from 'three';

const AnimatedStars = () => {
  const starsRef = useRef<Mesh>(null);

  useFrame(() => {
    if (!starsRef.current) return;
    starsRef.current.rotation.x += 0.0002;
    starsRef.current.rotation.y += 0.0001;
    starsRef.current.rotation.z += 0.0002;
  });

  return <Stars depth={300} radius={1500} ref={starsRef} />;
};

export default AnimatedStars;
