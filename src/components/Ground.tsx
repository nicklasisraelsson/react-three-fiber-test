import { PlaneDistance } from '../util/constants';
import React from 'react';
import { PlaneProps, usePlane } from '@react-three/cannon/dist';

export default (props: PlaneProps) => {
  const [planeRef] = usePlane(() => ({ position: [0, 0, PlaneDistance], ...props }));
  return (
    <mesh ref={planeRef} receiveShadow>
      <planeBufferGeometry attach="geometry" args={[1000, 1000]} />
      <shadowMaterial attach="material" color="#171717" opacity={0.5} />
    </mesh>
  );
};
