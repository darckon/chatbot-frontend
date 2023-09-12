/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.13 chatbot_v2.glb 
*/

import { useEffect, useState } from 'react'
import { useGLTF, useAnimations, Text  } from '@react-three/drei'
import { gptApi } from '../../services/gptService'

export default function Robot(props) {
  const { nodes, materials, animations } = useGLTF('/bot/chatbot_v2.glb')
  const { ref, actions } = useAnimations(animations)

  useEffect(() => {
    props.runAnimation(setAnimation)
    actions['Rob_Sentado'].reset().fadeIn(0.5).play()
  })

  const setAnimation = (op) => {
    switch (op) {
      case 1:
        console.log('pase opcion 1')
        actions['Rob_Writting'].fadeIn(0.5).stop()
        actions['Rob_Sentado'].fadeIn(0.5).play()
      break;

      case 2:
        console.log('pase opcion 2')
        actions['Rob_Sentado'].fadeIn(0.5).stop()
        actions['Rob_Writting'].fadeIn(0.5).play()
      break;
    
      default:
        break;
    }
  }

  return (
    <group ref={ref} {...props} dispose={null} scale={0.5}>
        <group position={[0.3, 1.18, -0.8]} scale={0.3}>
          <primitive object={nodes.Bone} />
          <skinnedMesh
            geometry={nodes.Mesh023.geometry}
            material={materials.Visor}
            skeleton={nodes.Mesh023.skeleton}>
          </skinnedMesh>
          <skinnedMesh
            geometry={nodes.Mesh023_1.geometry}
            material={materials.Visor}
            skeleton={nodes.Mesh023_1.skeleton}>
          </skinnedMesh>
        </group>
      </group>
  )
}

useGLTF.preload('/bot/chatbot_v2.glb')
