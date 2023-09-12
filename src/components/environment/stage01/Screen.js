import { Text, useAnimations, useGLTF } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useEffect, useState } from 'react'
import { gsap } from 'gsap';


export default function Screen(props) {
  const { nodes, materials, animations } = useGLTF('/bot/chatbot_v2.glb')
  const { ref } = useAnimations(animations)
  const [ textGpt, setTextGpt ] = useState('')
  const fontProps = { fontSize: 0.05, letterSpacing: -0.05, lineHeight: 1, 'material-toneMapped': false }
  const [moveCamera, setMoveCamera] = useState(false);
  const api = process.env.REACT_APP_API_BACKEND

  const { camera } = useThree();


  useEffect(() => {
    props.callTest(callTestHijo)
  })

  const setAnimation = (animationRef) => {
    animationRef(1)
  }

  const callTestHijo = async (e, animationRef) => {
    const promptGpt = e.prompt
    let data = {x: 1.2, y: 0.1, z: 0.2, duration:1 }
    moveCameraToNewPosition(data)
    await fetch(`${api}/api/v1/assistant-ms/prompt`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ promptGpt })
    })
      .then((response) => response.json())
      .then((data) => {
        setTextGpt(data.message.answer)
        setAnimation(animationRef)
        console.log(data.message.answer);
      })
  }

  const fullScreen = () => {
    let data = {x: 0.7, y: 0.3, z: -0.6, duration:1 }
    gsap.to(camera.position, {
      x: data.x,
      y: data.y,
      z: data.z,
      duration: data.duration,
      onUpdate: function(){
        camera.lookAt(0, 0, 0)
      }
    });
  }


  const moveCameraToNewPosition = (data) => {
    gsap.to(camera.position, {
      x: data.x,
      y: data.y,
      z: data.z,
      duration: data.duration,
      onUpdate: function(){
        camera.lookAt(0,0,0)
      }
    });
  };
  
  const maxWidth = 1.5

  return (
    <group ref={ref} {...props} dispose={null} position={[-0.38, 0.68, 0.62]} rotation={[1.58, -0.345, 0.0002]} scale={1}>
      <group>
        <mesh 
        className='cursor'
        geometry={nodes.Screen.geometry}
        scale={1}
        material={materials.Level}
        onDoubleClick={fullScreen}>
          <group style={{width :"100%"}}>
            <Text 
            color="white"
            position={[0.47, -0.61, -0.4]}
            rotation={[-1.47, 3.17, -0.345]}
            {...fontProps}
            maxWidth={maxWidth}
            scale={0.3}>
              {textGpt}
            </Text>
          </group>
        </mesh>
      </group>
    </group>
  )
}
