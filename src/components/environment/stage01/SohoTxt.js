import { useSpring } from '@react-spring/core'
import { MeshWobbleMaterial, useAnimations, useGLTF, useMatcapTexture } from '@react-three/drei'
import { useEffect } from 'react'

export default function SohoTxt(props) {
  const { nodes, materials, animations } =  useGLTF('/bot/chatbot_v2.glb')
  const { ref, actions } = useAnimations(animations)
  const [matcap] = useMatcapTexture('74A192_041B0D_194C33_235B4C', 1024)
  const [springs] = useSpring(() => ({ config: { mass: 2, tension: 200 } }))


  useEffect(() => {
    actions['ArmatureAction'].reset().fadeIn(0.5).play()
  })

  return (
    <group ref={ref} {...props} dispose={null} scale={0.5} position={[-0.38, 0.6, 0.40]}>
      <mesh geometry={nodes.SohoText.geometry} position={[-0.70, 1.2, 0.80]} rotation={[1.58, 0, -1.6]} scale={0.25} ></mesh>

      <group  position={[-0.71, 1.266, 0.375]}  scale={0.1}>
      <primitive object={nodes.rigBarraSoho} />
      <skinnedMesh
        castShadow
        receiveShadow
        geometry={nodes.barraSoho.geometry}
        position={[2, 2, 2]}
        rotation={[0, 0, -1.6]}
        scale={1}
        skeleton={nodes.barraSoho.skeleton}
        {...springs}>
          <meshMatcapMaterial matcap={matcap} />
      </skinnedMesh>
      </group>
    </group>
  )
}
