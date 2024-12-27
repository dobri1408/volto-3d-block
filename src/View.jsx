import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';
import { Pannellum } from 'pannellum-react';

const STLViewer = ({ file }) => {
  const { scene } = useGLTF(file);
  return <primitive object={scene} />;
};

const View = ({ file }) => {
  if (!file) {
    return <p>No file provided.</p>;
  }

  if (file.endsWith('.stl')) {
    return (
      <Canvas style={{ width: '100%', height: '500px' }}>
        <Suspense fallback={<p>Loading...</p>}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[1, 1, 1]} intensity={0.7} />
          <STLViewer file={file} />
          <OrbitControls />
        </Suspense>
      </Canvas>
    );
  } else if (file.endsWith('.jpg') || file.endsWith('.png')) {
    return (
      <Pannellum
        width="100%"
        height="500px"
        image={file}
        pitch={10}
        yaw={180}
        hfov={110}
        autoLoad
      />
    );
  } else {
    return <p>Unsupported file type.</p>;
  }
};

export default View;
