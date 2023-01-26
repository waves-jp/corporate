import { Box } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { memo, useCallback, useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export const BackgroundLogo: React.FC = () => {
  const router = useRouter()

  const boxRef = useRef<HTMLDivElement>(null)

  let camera: any, scene: any, renderer: any
  let object: any, axis, light, light2

  function animation(time: number) {
    // オブジェクトが非同期で読み込まれるために
    // null ではないことを確認する
    if (object) {
      object.rotation.y = time / 10000
    }
    renderer.render(scene, camera)
  }

  const init = useCallback(() => {
    const w = boxRef.current?.clientWidth || 0
    const h = boxRef.current?.clientHeight || 0
    camera = new THREE.PerspectiveCamera(70, w / h, 0.1, 100)
    camera.position.set(1, 1, 1)
    camera.lookAt(new THREE.Vector3(0, 0, 0))

    scene = new THREE.Scene()

    light = new THREE.SpotLight(0xffffff, 40, 10, Math.PI / 4, 1, 0.9)
    scene.add(light)

    light2 = new THREE.DirectionalLight(0xffffff, 1)
    scene.add(light2)

    // GLTFLoaderを使って ファイルを読み込む
    const gltfLoader = new GLTFLoader()
    gltfLoader.load('/model/waves-logo.glb', function (data) {
      const gltf = data
      object = gltf.scene
      object.rotation.x = 100
      scene.add(object)
    })

    // 座標情報をはっきりさせるためにx=0 y=0 z=0 に軸表示のヘルパーを置く
    // axis = new THREE.AxesHelper(2000)
    // axis.position.set(0, 0, 0)
    // scene.add(axis)

    renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setAnimationLoop(animation)
    if (boxRef) boxRef.current?.appendChild(renderer.domElement)
  }, [])

  const [opacity, setOpacity] = useState(0)

  useEffect(() => {
    init()
    if (router.pathname === '/') {
      setTimeout(() => {
        setOpacity(1)
      }, 500)
    } else {
      setOpacity(0)
    }
  }, [init, router.pathname])

  return (
    <Box
      w='100%'
      h='100%'
      position='fixed'
      top='0'
      left='0'
      userSelect='none'
      pointerEvents='none'
      zIndex='10'
      ref={boxRef}
      opacity={opacity}
      transition='0.5s'
    ></Box>
  )
}
