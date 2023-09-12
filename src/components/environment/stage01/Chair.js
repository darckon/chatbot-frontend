import { useGLTF } from '@react-three/drei'

export default function Chair() {
  const { nodes, materials } =  useGLTF(`/bot/${process.env.REACT_APP_MODEL}.glb`)

  return (
      <mesh geometry={nodes.Chair.geometry} position={[-0.39, 0.65, 0.64]} rotation={[1.6, -0.345, 0.0002]} scale={1} material={materials.Level}>
      </mesh>
  )
}
