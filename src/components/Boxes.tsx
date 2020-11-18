import React from 'react';
import { BoxProps, useBox } from '@react-three/cannon/dist';

const Box = (props: BoxProps) => {
  const [boxRef] = useBox(() => ({
    mass: 0.5,
    rotation: [0.4, 0.2, 0.5],
    ...props,
  }));

  return (
    <mesh ref={boxRef} castShadow receiveShadow>
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
};

export default ({ boxPositions }: { boxPositions: number[][] }) => {
  return (
    <>
      {boxPositions.map((position, index) => (
        <Box key={index} position={position} />
      ))}
    </>
  );
};
