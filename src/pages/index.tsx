import Boxes from '../components/Boxes';
import Ground from '../components/Ground';
import TargetBall from '../components/TargetBall';
import MouseBox, { BoxPosition } from '../components/MouseBox';
import React, { useState } from 'react';
import { Canvas } from 'react-three-fiber';
import { Physics } from '@react-three/cannon/dist';
import { Color } from 'three';
import './styles.scss';

export default () => {
  const [boxPositions, setBoxPositions] = useState<number[][]>([]);

  const addBox = (boxPosition: BoxPosition) => {
    setBoxPositions([...boxPositions, [boxPosition.x, boxPosition.y, 0]]);
  };

  return (
    <Canvas
      shadowMap
      onCreated={({ scene }) => {
        scene.background = new Color('lightblue');
      }}
    >
      <ambientLight />
      <pointLight position={[10, 10, 10]} castShadow />

      <MouseBox onMouseBoxClicked={addBox} />

      <Physics gravity={[0, 0, -20]}>
        <Ground />
        <TargetBall />
        <Boxes boxPositions={boxPositions} />
      </Physics>
    </Canvas>
  );
};
