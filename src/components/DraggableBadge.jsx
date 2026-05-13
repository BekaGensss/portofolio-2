import * as THREE from 'three';
import { useRef, useState, Suspense } from 'react';
import { Canvas, extend, useThree, useFrame } from '@react-three/fiber';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import { useTexture, Environment } from '@react-three/drei';

extend({ MeshLineGeometry, MeshLineMaterial });

function Band({ textureUrl }) {
  const band1 = useRef(), band2 = useRef(), fixed = useRef(), j1 = useRef(), j2 = useRef(), j3 = useRef(), card = useRef();
  const vec = new THREE.Vector3(), ang = new THREE.Vector3(), rot = new THREE.Vector3(), dir = new THREE.Vector3();
  const { width, height } = useThree((state) => state.size);
  const [curve1] = useState(() => new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()]));
  const [curve2] = useState(() => new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()]));
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
      // Calculate corners
      const cardPos = card.current.translation();
      const cardRot = card.current.rotation();
      const topLeft = new THREE.Vector3(-0.6, 2.1/2 - 0.15, 0.025).applyQuaternion(cardRot).add(cardPos);
      const topRight = new THREE.Vector3(0.6, 2.1/2 - 0.15, 0.025).applyQuaternion(cardRot).add(cardPos);

      // Curve 1 (Left hole to neck)
      curve1.points[0].copy(topLeft);
      curve1.points[1].copy(j3.current.translation());
      curve1.points[2].copy(j2.current.translation());
      curve1.points[3].copy(j1.current.translation());
      curve1.points[4].copy(fixed.current.translation());
      
      // Curve 2 (Right hole to neck)
      curve2.points[0].copy(topRight);
      curve2.points[1].copy(j3.current.translation());
      curve2.points[2].copy(j2.current.translation());
      curve2.points[3].copy(j1.current.translation());
      curve2.points[4].copy(fixed.current.translation());

      band1.current.geometry.setPoints(curve1.getPoints(32));
      band2.current.geometry.setPoints(curve2.getPoints(32));
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
          <CuboidCollider args={[0.8, 1.05, 0.01]} />
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
              <boxGeometry args={[1.6, 2.1, 0.04]} />
              <meshStandardMaterial color="#f0f0f0" roughness={0.1} metalness={0.1} />
            </mesh>
            
            {/* Front Photo */}
            <mesh position={[0, 0, 0.021]}>
              <planeGeometry args={[1.5, 2.0]} />
              <meshBasicMaterial map={texture} side={THREE.FrontSide} />
            </mesh>

            {/* Back (Empty or Logo) */}
            <mesh position={[0, 0, -0.021]} rotation={[0, Math.PI, 0]}>
              <planeGeometry args={[1.5, 2.0]} />
              <meshStandardMaterial color="#1a1a1a" />
            </mesh>

            {/* Holes for the lanyard */}
            <mesh position={[-0.6, 2.1/2 - 0.15, 0.025]}>
              <cylinderGeometry args={[0.06, 0.06, 0.06]} />
              <meshBasicMaterial color="#000" />
            </mesh>
            <mesh position={[0.6, 2.1/2 - 0.15, 0.025]}>
              <cylinderGeometry args={[0.06, 0.06, 0.06]} />
              <meshBasicMaterial color="#000" />
            </mesh>
          </group>
        </RigidBody>
      </group>
      <mesh ref={band1}>
        <meshLineGeometry />
        <meshLineMaterial 
          transparent opacity={0.9} color="#d4af37" 
          depthTest={false} resolution={[width, height]} 
          lineWidth={15} sizeAttenuation={false}
        />
      </mesh>
      <mesh ref={band2}>
        <meshLineGeometry />
        <meshLineMaterial 
          transparent opacity={0.9} color="#d4af37" 
          depthTest={false} resolution={[width, height]} 
          lineWidth={15} sizeAttenuation={false}
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
