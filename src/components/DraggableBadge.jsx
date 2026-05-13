import * as THREE from 'three'
import { useEffect, useRef, useState, Suspense, useMemo } from 'react'
import { Canvas, extend, useThree, useFrame } from '@react-three/fiber'
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei'
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier'
import { MeshLineGeometry, MeshLineMaterial } from 'meshline'

extend({ MeshLineGeometry, MeshLineMaterial })

// Preload Vercel Assets
const TAG_MODEL_URL = 'https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/5huRVDzcoDwnbgrKUo1Lzs/53b6dd7d6b4ffcdbd338fa60265949e1/tag.glb'
useGLTF.preload(TAG_MODEL_URL)

export default function DraggableBadge({ photoUrl }) {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas 
        camera={{ position: [0, 0, 13], fov: 25 }} 
        gl={{ antialias: true, alpha: true, toneMapping: THREE.ReinhardToneMapping }}
        style={{ touchAction: 'none' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={2} />
        <Suspense fallback={null}>
          <Physics interpolate gravity={[0, -40, 0]} timeStep={1 / 60}>
            <Band photoUrl={photoUrl} />
          </Physics>
          <Environment background={false}>
            <Lightformer intensity={5} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
            <Lightformer intensity={2} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
            <Lightformer intensity={2} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          </Environment>
        </Suspense>
      </Canvas>
    </div>
  )
}

function Band({ photoUrl, maxSpeed = 50, minSpeed = 10 }) {
  const band = useRef(), fixed = useRef(), j1 = useRef(), j2 = useRef(), j3 = useRef(), card = useRef() // prettier-ignore
  const vec = new THREE.Vector3(), ang = new THREE.Vector3(), rot = new THREE.Vector3(), dir = new THREE.Vector3() // prettier-ignore
  const segmentProps = { type: 'dynamic', canSleep: true, colliders: false, angularDamping: 2, linearDamping: 2 }
  
  const { nodes, materials } = useGLTF(TAG_MODEL_URL)
  const userTexture = useTexture(photoUrl)
  userTexture.flipY = true

  // Create high-quality band texture
  const bandTexture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 1024
    canvas.height = 128
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = '#000000'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = '#d4af37' // Gold
    ctx.font = 'bold 64px Outfit, sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    const text = 'BARA KUSUMA • '
    const textWidth = ctx.measureText(text).width
    for (let i = 0; i < 15; i++) {
      ctx.fillText(text, i * textWidth + textWidth / 2, canvas.height / 2)
    }
    const texture = new THREE.CanvasTexture(canvas)
    texture.wrapS = THREE.RepeatWrapping
    return texture
  }, [])
  
  const { size } = useThree()
  const [curve] = useState(() => new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()]))
  const [dragged, drag] = useState(false)
  const [hovered, hover] = useState(false)

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]) // prettier-ignore
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]) // prettier-ignore
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]) // prettier-ignore
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.45, 0]]) // prettier-ignore

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab'
      return () => void (document.body.style.cursor = 'auto')
    }
  }, [hovered, dragged])

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera)
      dir.copy(vec).sub(state.camera.position).normalize()
      vec.add(dir.multiplyScalar(state.camera.position.length()))
      ;[card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp())
      card.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z })
    }
    if (fixed.current) {
      // Stabilize physics
      ;[j1, j2].forEach((ref) => {
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation())
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())))
        ref.current.lerped.lerp(ref.current.translation(), delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)))
      })
      // Update curve
      curve.points[0].copy(j3.current.translation())
      curve.points[1].copy(j2.current.lerped)
      curve.points[2].copy(j1.current.lerped)
      curve.points[3].copy(fixed.current.translation())
      
      if (band.current?.geometry) {
        band.current.geometry.setPoints(curve.getPoints(32))
      }
      
      // Card tilt
      ang.copy(card.current.angvel())
      rot.copy(card.current.rotation())
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z })
    }
  })

  curve.curveType = 'chordal'

  return (
    <>
      <group position={[0, 8, 0]}> {/* Higher anchor */}
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody 
          position={[0, -2, 0]} 
          ref={card} 
          {...segmentProps} 
          type={dragged ? 'kinematicPosition' : 'dynamic'}
        >
          <CuboidCollider args={[0.8, 1.125, 0.05]} />
          
          <group 
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e) => { e.target.releasePointerCapture(e.pointerId); drag(false); }}
            onPointerDown={(e) => { e.target.setPointerCapture(e.pointerId); drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation()))); }}
          >
            {/* Vercel Tag Card */}
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial 
                color="#0a0a0a" 
                clearcoat={1} 
                clearcoatRoughness={0.1} 
                roughness={0.2} 
                metalness={0.9} 
              />
            </mesh>
            
            {/* User Photo - Corrected scaling and orientation */}
            <mesh position={[0, 0.45, 0.015]}>
              <planeGeometry args={[0.5, 0.7]} />
              <meshBasicMaterial map={userTexture} transparent />
            </mesh>

            {/* Clips from the GLTF */}
            <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial 
          transparent
          color="white" 
          depthTest={false} 
          resolution={[size.width, size.height]} 
          useMap 
          map={bandTexture} 
          repeat={[-5, 1]} 
          lineWidth={1.2} 
        />
      </mesh>
    </>
  )
}
