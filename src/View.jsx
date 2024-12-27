import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { STLLoader } from 'three-stdlib';

import ReactPannellum from 'react-pannellum';

const STLViewer = ({ fileData }) => {
  const [geometry, setGeometry] = useState(null);

  useEffect(() => {
    const loader = new STLLoader();
    loader.load(fileData, (loadedGeometry) => {
      setGeometry(loadedGeometry);
    });
  }, [fileData]);

  if (!geometry) return null;

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial color={0x00ff00} />
    </mesh>
  );
};

const View = (props) => {
  const { file } = props?.data;
  const [blobUrl, setBlobUrl] = useState(null);

  useEffect(() => {
    if (file?.data) {
      const blob = new Blob([Buffer.from(file.data, 'base64')], {
        type: file['content-type'],
      });
      setBlobUrl(URL.createObjectURL(blob));

      return () => {
        URL.revokeObjectURL(blobUrl);
      };
    }
  }, [file]);

  if (!file || !file.filename || !file.data) {
    return <p>No file provided.</p>;
  }

  const fileExtension = file.filename.split('.').pop().toLowerCase();
  const fileData = `data:${file['content-type']};base64,${file.data}`;

  if (fileExtension === 'stl') {
    return (
      <Canvas
        style={{ width: '100%', height: '500px' }}
        onCreated={({ gl }) => {
          gl.setSize(window.innerWidth, window.innerHeight);
          gl.forceContextRestore();
        }}
      >
        <Suspense fallback={<p>Loading...</p>}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[1, 1, 1]} intensity={0.7} />
          <STLViewer fileData={fileData} />
          <OrbitControls />
        </Suspense>
      </Canvas>
    );
  } else if (['jpg', 'jpeg', 'png'].includes(fileExtension) && blobUrl) {
    return (
      <div style={{ width: '100%', height: '500px' }}>
        <ReactPannellum
          id="panorama"
          sceneId="firstScene"
          imageSource={blobUrl}
          config={{ autoLoad: true, pitch: 10, yaw: 180, hfov: 110 }}
        />
      </div>
    );
  } else {
    return (
      <p>Unsupported file type. Supported types: .stl, .jpg, .jpeg, .png</p>
    );
  }
};

export default View;
