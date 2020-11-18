import { PlaneDistance } from '../util/constants';
import { SphereProps, useSphere } from '@react-three/cannon/dist';
import React from 'react';
import { useFrame } from 'react-three-fiber';

const BallRadius = 1.5;

export default (props: SphereProps) => {
  const [ballRef, ballApi] = useSphere(() => ({
    mass: 1.5,
    isKinematic: true,
    ...props,
  }));

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ballApi.position.set(Math.sin(t * 3) * 5, Math.cos(t * 3) * 5, PlaneDistance + 1);
    ballApi.rotation.set(Math.sin(t * 6), Math.cos(t * 6), 0);
  });

  return (
    <mesh ref={ballRef} receiveShadow castShadow>
      <sphereBufferGeometry args={[BallRadius]} />
      <meshStandardMaterial color="green" />
    </mesh>
  );
};
