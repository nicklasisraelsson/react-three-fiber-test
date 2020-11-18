import React, { useRef } from 'react';
import { MeshProps, useFrame } from 'react-three-fiber';

export interface BoxPosition {
  x: number;
  y: number;
}

export interface MouseBoxProps extends MeshProps {
  onMouseBoxClicked: (boxPosition: BoxPosition) => void;
}

export default ({ onMouseBoxClicked, ...rest }: MouseBoxProps) => {
  const boxRef = useRef<THREE.Mesh>();

  useFrame(({ mouse }) => {
    if (!boxRef.current) return;
    boxRef.current.position.x = mouse.x * 7.5;
    boxRef.current.position.y = mouse.y * 3;
  });

  return (
    <mesh
      onClick={() => {
        if (!boxRef.current) return;
        onMouseBoxClicked({ x: boxRef.current.position.x, y: boxRef.current.position.y });
      }}
      {...rest}
      ref={boxRef}
    >
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  );
};
