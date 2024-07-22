import { useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { useSpring } from '@react-spring/three'

export default function Meson() {
  const { nodes } = useGLTF(`/bot/${process.env.REACT_APP_MODEL}.glb`)
  const { camera } = useThree()
  useSpring(
    () => ({
      from: { y: camera.position.y + 5 },
      to: { y: camera.position.y },
      config: { friction: 100 },
      onChange: ({ value }) => ((camera.position.y = value.y), camera.lookAt(0, 0, 0)),
    }),
    [],
  )
  return <mesh geometry={nodes.Meson.geometry} material={nodes.Meson.material} position={[0, 0, 0]} rotation={[Math.PI / 2, -Math.PI / 9, 0]} />
}
