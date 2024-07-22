import { Canvas } from '@react-three/fiber'
import { Loader, OrbitControls, PresentationControls } from '@react-three/drei'
import Robot from './components/chatbot/Robot'
import Level from './components/stages/stage_1/Level'
import Sudo from './components/stages/stage_1/Sudo'
import Camera from './components/stages/stage_1/Camera'
import Cactus from './components/stages/stage_1/Cactus'
import Icon from './components/stages/stage_1/Icon'
import SohoTxt from './components/stages/stage_1/SohoTxt'
import Chair from './components/stages/stage_1/Chair'
import Screen from './components/stages/stage_1/Screen'
import  Form  from 'react-bootstrap/Form'
import  Button  from 'react-bootstrap/Button'
import { Suspense } from 'react'



export default function App() {
  let textGpt=''
  let childRef = ''
  let animationRef = ''

  const callTest = (asd) => {
     childRef = asd
  };

  const runAnimation = (asd) => {
    animationRef = asd
  }

  const setAnimation = (op) => {
    animationRef(op)
  }

  const callTest2 = (promp, animationRef) => {
    childRef(promp, animationRef)
 };


  const submitForm = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const payload = Object.fromEntries(formData)
    textGpt = payload
    setAnimation(2)
    callTest2(textGpt, animationRef)
    console.log(payload)
  }

  return (
    <>
      <form className="conentInput" onSubmit={submitForm}>
        <Form.Group>
          <Form.Control  className="prompt" type="text" name="prompt" placeholder="Ingrese prompt" ></Form.Control>
        </Form.Group>
        <Button className="btn btn-primary" variant="primary" type="submit">Enviar</Button>
      </form>
      <Canvas  shadows  flat dpr={[1, 2]} camera={{position: [ 2, 2, 7], fov: 35, }}>
        <Suspense fallback={null}>
          <OrbitControls/>
          <color attach="background" args={['#e0b7ff']} />
            <ambientLight />

            <PresentationControls snap global zoom={0.8} rotation={[0, -Math.PI / 4, 0]} polar={[0, Math.PI / 4]} azimuth={[-Math.PI / 4, Math.PI / 4]}>
              <group position-y={-0.75} dispose={null}>
                <Robot runAnimation={runAnimation}/>
                <SohoTxt />
                <Chair />
                <Level />
                <Sudo />
                <Camera />
                <Cactus />
                <Icon />
                <Screen callTest={callTest}/>
              </group>
            </PresentationControls>
        </Suspense>
      </Canvas>
     <Loader 
        dataStyles={{ bottom: '10px', fontSize: '15px' }}
        dataInterpolation={(p) => {
          return `Hackaton 2023 Cristian Rojas ${p.toFixed(2)}%`}
        }/>
    </>
  )
}


