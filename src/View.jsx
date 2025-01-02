import React, { Suspense, useState, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { STLLoader } from 'three-stdlib';
import * as THREE from 'three';
import ReactPannellum from 'react-pannellum';

const STLViewer = ({ fileData }) => {
  const [geometry, setGeometry] = useState(null);
  const { camera, controls } = useThree();

  useEffect(() => {
    const loader = new STLLoader();
    loader.load(fileData, (loadedGeometry) => {
      setGeometry(loadedGeometry);

      // Calculează bounding box-ul
      const box = new THREE.Box3().setFromObject(
        new THREE.Mesh(loadedGeometry),
      );
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());

      // Ajustează camera să fie centrată pe obiect
      const maxDim = Math.max(size.x, size.y, size.z);
      const fov = camera.fov * (Math.PI / 180);
      const distance = maxDim / (2 * Math.tan(fov / 2));

      camera.position.set(center.x, center.y, center.z + distance * 1.5);
      camera.lookAt(center);

      if (controls) {
        controls.target.copy(center);
        controls.update();
      }
    });
  }, [fileData, camera, controls]);

  if (!geometry) return null;

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial color={0x808080} />
    </mesh>
  );
};

const View = (props) => {
  const { file } = props?.data;
  const [blobUrl, setBlobUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (file?.data) {
      setIsLoading(true);
      const blob = new Blob([Buffer.from(file.data, 'base64')], {
        type: file['content-type'],
      });
      const url = URL.createObjectURL(blob);
      setBlobUrl(url);
      setIsLoading(false);

      return () => {
        URL.revokeObjectURL(url);
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
      <div className="container360image">
        <Canvas
          camera={{ fov: 50 }}
          flat
          style={{ maxWidth: '100%', height: '500px' }}
          onCreated={({ gl }) => {
            gl.setSize(window.innerWidth, window.innerHeight);
            gl.forceContextRestore();
          }}
        >
          <Suspense fallback={<p>Loading...</p>}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[1, 1, 1]} intensity={0.7} />
            <STLViewer fileData={fileData} />
            <OrbitControls
              enableDamping
              dampingFactor={0.1}
              rotateSpeed={0.1}
              zoomSpeed={0.1}
            />
          </Suspense>
        </Canvas>
      </div>
    );
  } else if (['jpg', 'jpeg', 'png'].includes(fileExtension)) {
    if (isLoading || !blobUrl) {
      return <p>Loading 3D file...</p>;
    }

    return (
      <div className="container360image">
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
