import React, { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls as DreiOrbitControls } from '@react-three/drei';
import { STLLoader } from 'three-stdlib';
import * as THREE from 'three';
import debounce from 'lodash.debounce';
import ReactPannellum from 'react-pannellum';

const STLViewer = ({
  fileData,
  onCameraChange,
  savedCameraPosition,
  isEditMode,
}) => {
  const [geometry, setGeometry] = useState(null);
  const { camera, gl } = useThree();

  useEffect(() => {
    const loader = new STLLoader();
    loader.load(fileData, (loadedGeometry) => {
      setGeometry(loadedGeometry);

      if (!savedCameraPosition) {
        const box = new THREE.Box3().setFromObject(
          new THREE.Mesh(loadedGeometry),
        );
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        const maxDim = Math.max(size.x, size.y, size.z);
        const fov = camera.fov * (Math.PI / 180);
        const distance = maxDim / (2 * Math.tan(fov / 2));

        camera.position.set(center.x, center.y, center.z + distance * 1.5);
        camera.lookAt(center);
      } else {
        const { position, target } = savedCameraPosition;
        camera.position.set(position.x, position.y, position.z);
        camera.lookAt(new THREE.Vector3(target.x, target.y, target.z));
      }
    });
  }, [fileData, savedCameraPosition, camera]);

  const debouncedCameraSave = debounce((cameraPosition, target) => {
    if (onCameraChange) {
      onCameraChange({
        position: {
          x: cameraPosition.x,
          y: cameraPosition.y,
          z: cameraPosition.z,
        },
        target: { x: target.x, y: target.y, z: target.z },
      });
    }
  }, 300);

  if (!geometry) return null;

  return (
    <>
      <DreiOrbitControls
        args={[camera, gl.domElement]}
        target={
          savedCameraPosition
            ? new THREE.Vector3(
                savedCameraPosition?.target?.x,
                savedCameraPosition?.target?.y,
                savedCameraPosition?.target?.z,
              )
            : undefined
        }
        onChange={(e) => {
          if (isEditMode) {
            const { position } = e.target.object;
            const target = e.target.target;
            debouncedCameraSave(position, target);
          }
        }}
      />
      <mesh geometry={geometry}>
        <meshStandardMaterial color={0x808080} />
      </mesh>
    </>
  );
};

const View = (props) => {
  const { file, savedCameraPosition, onCameraChange, isEditMode } = props?.data;
  const [blobUrl, setBlobUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const pannellumRef = useRef(null);

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

  const saveCameraPosition = debounce(() => {
    if (pannellumRef.current) {
      const viewer = ReactPannellum.getViewer('panorama');
      if (viewer) {
        const yaw = viewer.getYaw();
        const pitch = viewer.getPitch();
        const hfov = viewer.getHfov();

        onCameraChange({ yaw, pitch, hfov });
      }
    }
  }, 300);

  if (!file || !file.filename || !file.data) {
    return <p>No file provided.</p>;
  }

  const fileExtension = file.filename.split('.').pop().toLowerCase();
  const fileData = `data:${file['content-type']};base64,${file.data}`;

  if (fileExtension === 'stl') {
    return (
      <div className="container360image">
        <Canvas
          camera={{ position: [0, 0, -100], fov: 50 }}
          flat
          max-width={'100%'}
          height="auto"
          linear
          onCreated={({ gl }) => {
            gl.setSize(window.innerWidth, window.innerHeight);
            gl.forceContextRestore();
          }}
        >
          <Suspense fallback={<p>Loading...</p>}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[1, 1, 1]} intensity={0.7} />
            <STLViewer
              fileData={fileData}
              onCameraChange={onCameraChange}
              savedCameraPosition={savedCameraPosition}
              isEditMode={isEditMode}
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
      <div className="container360image" onMouseMove={saveCameraPosition}>
        <ReactPannellum
          ref={pannellumRef}
          id="panorama"
          sceneId="firstScene"
          imageSource={blobUrl}
          config={{
            autoLoad: true,
            pitch: savedCameraPosition?.pitch || 10,
            yaw: savedCameraPosition?.yaw || 180,
            hfov: savedCameraPosition?.hfov || 110,
          }}
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
