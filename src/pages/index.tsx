import { PlaneDistance } from '../util/constants';
import TargetBall from '../components/TargetBall';
import React, { useRef, useState } from 'react';
import { Canvas, MeshProps, useFrame } from 'react-three-fiber';
import {
  Physics,
  usePlane,
  useBox,
  PlaneProps,
  BoxProps,
  // For some reason eslint is unable to find the cannon package?
  // eslint-disable-next-line import/no-unresolved
} from '@react-three/cannon';
import * as THREE from 'three';

import './styles.scss';
const Box = (props: BoxProps) => {
  const [boxRef] = useBox(() => ({
    mass: 1,
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

const Boxes = ({ boxPositions }: { boxPositions: number[][] }) => {
  return (
    <>
      {boxPositions.map((position, index) => (
        <Box key={index} position={position} />
      ))}
    </>
  );
};

const Plane = (props: PlaneProps) => {
  const [planeRef] = usePlane(() => ({ position: [0, 0, PlaneDistance], ...props }));
  return (
    <mesh ref={planeRef} receiveShadow>
      <planeBufferGeometry attach="geometry" args={[1000, 1000]} />
      <shadowMaterial attach="material" color="#171717" opacity={0.5} />
    </mesh>
  );
};

interface BoxPosition {
  x: number;
  y: number;
}
interface MouseBoxProps extends MeshProps {
  onMouseBoxClicked: (boxPosition: BoxPosition) => void;
}

const MouseBox = ({ onMouseBoxClicked, ...rest }: MouseBoxProps) => {
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

export default () => {
  const [boxPositions, setBoxPositions] = useState<number[][]>([]);

  const addBox = (boxPosition: BoxPosition) => {
    setBoxPositions([...boxPositions, [boxPosition.x, boxPosition.y, 0]]);
  };

  return (
    <Canvas
      shadowMap
      onCreated={({ scene }) => {
        scene.background = new THREE.Color('lightblue');
      }}
    >
      <ambientLight />
      <pointLight position={[10, 10, 10]} castShadow />

      <MouseBox onMouseBoxClicked={addBox} />

      <Physics gravity={[0, 0, -30]}>
        <Plane />
        <TargetBall />
        <Boxes boxPositions={boxPositions} />
      </Physics>
    </Canvas>
  );
};
