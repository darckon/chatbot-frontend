import { useAnimations, useGLTF } from '@react-three/drei'
import { useEffect } from 'react'

export default function Cactus(props) {
  const { nodes, materials, animations } =  useGLTF('/bot/chatbot_v2.glb')
  const { ref, actions } = useAnimations(animations)

  useEffect(() => {
    actions['DefaultCactus'].reset().fadeIn(0.5).play()
  })

  return (
    <group ref={ref} {...props} dispose={null} scale={0.5}>
      <group  position={[-0.85, 0.8, -1.26]}  scale={1}>
       <primitive object={nodes.rigCactus} />
        <skinnedMesh
          geometry={nodes.Cactus.geometry}
          material={materials.Cactus}
          skeleton={nodes.Cactus.skeleton}>
        </skinnedMesh>
        </group>
    </group>
  )
}
