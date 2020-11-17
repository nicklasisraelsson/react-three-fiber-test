import React, { useRef, useState } from 'react';
import { Canvas, MeshProps, useFrame, Vector3 } from 'react-three-fiber';
import * as THREE from 'three';

import './styles.scss';

const Box = (props: MeshProps) => {
  const boxRef = useRef<THREE.Mesh>();
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    if (!boxRef.current) return;

    boxRef.current.rotation.x = boxRef.current.rotation.y += 0.05;
  });

  return (
    <mesh
      {...props}
      ref={boxRef}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
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

const Boxes = ({ boxPositions }: { boxPositions: Vector3[] }) => {
  return (
    <>
      {boxPositions.map((position, index) => (
        <Box key={index} position={position} />
      ))}
    </>
  );
};

export default () => {
  const [boxPositions, setBoxPositions] = useState<Vector3[]>([]);

  const addBox = (boxPosition: BoxPosition) => {
    setBoxPositions([...boxPositions, [boxPosition.x, boxPosition.y, 0]]);
  };

  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />

      <MouseBox
        onMouseBoxClicked={(boxPosition) => {
          addBox(boxPosition);
        }}
        position={[0, 0, 0]}
      />

      <Boxes boxPositions={boxPositions} />
    </Canvas>
  );
};
