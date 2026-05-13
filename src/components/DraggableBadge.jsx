import * as THREE from 'three';
import { useRef, useState, Suspense } from 'react';
import { Canvas, extend, useThree, useFrame } from '@react-three/fiber';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import { useTexture, Environment } from '@react-three/drei';

extend({ MeshLineGeometry, MeshLineMaterial });

function Band({ textureUrl }) {
  const band = useRef(), fixed = useRef(), j1 = useRef(), j2 = useRef(), j3 = useRef(), card = useRef();
  const vec = new THREE.Vector3(), ang = new THREE.Vector3(), rot = new THREE.Vector3(), dir = new THREE.Vector3();
  const { width, height } = useThree((state) => state.size);
  const [curve] = useState(() => new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()]));
  const [dragged, drag] = useState(false);
  
  const texture = useTexture(textureUrl);
  texture.colorSpace = THREE.SRGBColorSpace;

  // Lanyard joints
  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.45, 0]]);

  useFrame((state) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z });
    }
    if (fixed.current) {
      // Calculate catmul curve
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.translation());
      curve.points[2].copy(j1.current.translation());
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(32));
      // Tilt it back towards the screen
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }
  });

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} angularDamping={2} linearDamping={2} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} angularDamping={2} linearDamping={2}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} angularDamping={2} linearDamping={2}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} angularDamping={2} linearDamping={2}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[2, 0, 0]} ref={card} angularDamping={2} linearDamping={2} type={dragged ? 'kinematicPosition' : 'dynamic'}>
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            onPointerUp={(e) => {
              e.target.releasePointerCapture(e.pointerId);
              drag(false);
            }}
            onPointerDown={(e) => {
              e.target.setPointerCapture(e.pointerId);
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())));
            }}
          >
            {/* The Badge Base */}
            <mesh>
              <boxGeometry args={[1.6, 2.25, 0.04]} />
              <meshStandardMaterial color="#f0f0f0" roughness={0.1} metalness={0.1} />
            </mesh>
            
            {/* Front Photo */}
            <mesh position={[0, 0, 0.021]}>
              <planeGeometry args={[1.5, 2.15]} />
              <meshBasicMaterial map={texture} side={THREE.FrontSide} />
            </mesh>

            {/* Back (Empty or Logo) */}
            <mesh position={[0, 0, -0.021]} rotation={[0, Math.PI, 0]}>
              <planeGeometry args={[1.5, 2.15]} />
              <meshStandardMaterial color="#1a1a1a" />
            </mesh>

            {/* Hole for the lanyard */}
            <mesh position={[0, 1.125 - 0.15, 0.025]}>
              <cylinderGeometry args={[0.06, 0.06, 0.06]} />
              <meshBasicMaterial color="#000" />
            </mesh>
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial 
          transparent 
          opacity={0.9} 
          color="#d4af37" /* Gold lanyard */
          depthTest={false} 
          resolution={[width, height]} 
          lineWidth={1.5} 
        />
      </mesh>
    </>
  );
}

export default function DraggableBadge({ photoUrl = '/profile.jpg' }) {
  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 50,
      pointerEvents: 'none', /* Let clicks pass through the empty space */
    }}>
      <div style={{ width: '100%', height: '100%', pointerEvents: 'auto' }}>
        <Canvas camera={{ position: [0, 0, 13], fov: 25 }}>
          <ambientLight intensity={Math.PI} />
          <Environment preset="city" />
          <Suspense fallback={null}>
            <Physics debug={false} interpolate gravity={[0, -30, 0]} timeStep={1 / 60}>
              <Band textureUrl={photoUrl} />
            </Physics>
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}
