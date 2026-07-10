'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { MeshSurfaceSampler } from 'three/examples/jsm/math/MeshSurfaceSampler.js'

const MODEL_URL = '/model/waves-logo.glb'
const POINT_COUNT = 10000
const FIT_SIZE = 10.0
// アニメーション全体の時間スケール。1で通常速度、小さいほど遅い
const WAVE_SPEED = 0.3
// 波の変位の強さ。1で従来、値を下げると波が浅くなる
const WAVE_AMPLITUDE = 0.5
// 1回転にかける秒数
const ROTATION_PERIOD = 160
// オブジェクト全体の斜めの傾き（ラジアン）
const TILT_X = -0.35
const TILT_Z = -0.18
// 輪郭線（ワイヤーフレーム）の不透明度
const WIRE_OPACITY = 0.22
// キャンバス（ヒーロー枠全体）内でのオブジェクトの右寄せ量（シーン座標）
const OFFSET_X = 3.2
// カーソルの膨らみ効果の半径（cm）と押し出しの強さ（シーン座標）
const BULGE_RADIUS_CM = 2
const BULGE_STRENGTH = 0.7
// カーソル追従・減衰のイージング係数（小さいほど「ボワん」と遅れて動く）
const BULGE_FOLLOW = 0.14
const BULGE_FADE = 0.07
// クリック時のバースト（ブワッ）: 押し出しの強さ・半径の広がり・戻りの速さ
const BURST_STRENGTH = 2.4
const BURST_RADIUS_SCALE = 1.8
const BURST_DECAY = 0.9
// 1cmあたりのCSSピクセル数（96dpi基準）
const PX_PER_CM = 96 / 2.54

/**
 * ヒーロー右側の3Dオブジェクト。
 * ロゴアイコンの3Dモデル（waves-logo.glb）の表面をドットでサンプリングし、
 * ワイヤーフレームを重ねた輪郭表現で、波打つようにアニメーションする。
 */
export function HeroObject() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = ref.current
    if (!container) return
    let disposed = false

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100)
    camera.position.set(0, 0, 7.5)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // 傾きは外側グループに固定し、内側グループだけを回転させる
    const tiltGroup = new THREE.Group()
    tiltGroup.rotation.set(TILT_X, 0, TILT_Z)
    tiltGroup.position.x = OFFSET_X
    scene.add(tiltGroup)
    const group = new THREE.Group()
    tiltGroup.add(group)

    const disposables: { dispose: () => void }[] = []

    // モデル読み込み後にアニメーションループから参照する描画対象
    let model: {
      points: THREE.Points
      base: Float32Array
      wire: THREE.Mesh
      wireBase: Float32Array
      flatAxis: number
      wideAxis: number
    } | null = null

    new GLTFLoader().load(MODEL_URL, (gltf) => {
      if (disposed) return

      gltf.scene.updateMatrixWorld(true)
      let source: THREE.Mesh | undefined
      gltf.scene.traverse((obj) => {
        if (!source && (obj as THREE.Mesh).isMesh) source = obj as THREE.Mesh
      })
      if (!source) return

      // ワールド変換を焼き込み、中央寄せ＋表示サイズへ正規化
      const geometry = (source.geometry as THREE.BufferGeometry).clone()
      geometry.applyMatrix4(source.matrixWorld)
      geometry.computeBoundingBox()
      const box = geometry.boundingBox!
      const size = box.getSize(new THREE.Vector3())
      const center = box.getCenter(new THREE.Vector3())
      geometry.translate(-center.x, -center.y, -center.z)
      const scale = FIT_SIZE / Math.max(size.x, size.y, size.z)
      geometry.scale(scale, scale, scale)
      disposables.push(geometry)

      // 板状モデルの法線方向（最薄軸）に波を立て、最長軸に沿って伝播させる
      const dims = [size.x, size.y, size.z]
      const flatAxis = dims.indexOf(Math.min(...dims))
      const wideAxis = dims.indexOf(Math.max(...dims))

      // メッシュ表面からドットをサンプリング（元モデルは58頂点しかないため）
      const sampler = new MeshSurfaceSampler(new THREE.Mesh(geometry)).build()
      const positions = new Float32Array(POINT_COUNT * 3)
      const sampled = new THREE.Vector3()
      for (let i = 0; i < POINT_COUNT; i++) {
        sampler.sample(sampled)
        positions[i * 3] = sampled.x
        positions[i * 3 + 1] = sampled.y
        positions[i * 3 + 2] = sampled.z
      }
      const pointsGeometry = new THREE.BufferGeometry()
      pointsGeometry.setAttribute(
        'position',
        new THREE.BufferAttribute(positions, 3),
      )
      const dotsMaterial = new THREE.PointsMaterial({
        color: 0x43606d,
        size: 0.03,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.85,
      })
      const points = new THREE.Points(pointsGeometry, dotsMaterial)
      disposables.push(pointsGeometry, dotsMaterial)

      const wireMaterial = new THREE.MeshBasicMaterial({
        color: 0x8fa6b0,
        wireframe: true,
        transparent: true,
        opacity: WIRE_OPACITY,
      })
      const wire = new THREE.Mesh(geometry, wireMaterial)
      disposables.push(wireMaterial)

      group.add(points)
      group.add(wire)
      model = {
        points,
        base: positions.slice(),
        wire,
        wireBase: Float32Array.from(
          geometry.attributes.position.array as Float32Array,
        ),
        flatAxis,
        wideAxis,
      }
      if (reducedMotion) renderWave(0)
    })

    const resize = () => {
      const w = container.clientWidth
      const h = container.clientHeight
      renderer.setSize(w, h)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(container)

    // カーソル位置（NDC）と膨らみの強さ。イージングで遅れて追従させる
    const pointer = {
      targetX: 0,
      targetY: 0,
      x: 0,
      y: 0,
      targetStrength: 0,
      strength: 0,
      burst: 0,
    }
    const isInside = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      return (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      )
    }
    const onMouseMove = (e: MouseEvent) => {
      if (isInside(e)) {
        const rect = container.getBoundingClientRect()
        pointer.targetX = ((e.clientX - rect.left) / rect.width) * 2 - 1
        pointer.targetY = -(((e.clientY - rect.top) / rect.height) * 2 - 1)
        pointer.targetStrength = 1
      } else {
        pointer.targetStrength = 0
      }
    }
    const onMouseDown = (e: MouseEvent) => {
      if (isInside(e)) pointer.burst = 1
    }
    const onMouseLeave = () => {
      pointer.targetStrength = 0
    }
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mousedown', onMouseDown)
    document.documentElement.addEventListener('mouseleave', onMouseLeave)

    // カーソルの視線レイをオブジェクトのローカル空間へ変換するための道具
    const raycaster = new THREE.Raycaster()
    const rayOrigin = new THREE.Vector3()
    const rayDir = new THREE.Vector3()
    const invMatrix = new THREE.Matrix4()

    // base の頂点座標に波の変位（＋カーソルの膨らみ）を加えて attr に書き込む
    const applyWave = (
      attr: THREE.BufferAttribute,
      base: Float32Array,
      t: number,
      flatAxis: number,
      wideAxis: number,
      bulge?: {
        origin: THREE.Vector3
        dir: THREE.Vector3
        radius: number
        strength: number
      },
    ) => {
      for (let i = 0; i < attr.count; i++) {
        let x = base[i * 3]
        let y = base[i * 3 + 1]
        let z = base[i * 3 + 2]
        const along = [x, y, z][wideAxis]
        const swell =
          WAVE_AMPLITUDE *
          (0.38 * Math.sin(along * 1.5 + t * 1.7) +
            0.12 * Math.sin(along * 3.1 + t * 1.1))
        const offset = [0, 0, 0]
        offset[flatAxis] = swell
        x += offset[0]
        y += offset[1]
        z += offset[2]

        if (bulge && bulge.strength > 0.001) {
          // カーソルの視線レイからの距離で膨らみを判定する（面の向きに依存しない）
          const wx = x - bulge.origin.x
          const wy = y - bulge.origin.y
          const wz = z - bulge.origin.z
          const s = wx * bulge.dir.x + wy * bulge.dir.y + wz * bulge.dir.z
          const qx = bulge.origin.x + bulge.dir.x * s
          const qy = bulge.origin.y + bulge.dir.y * s
          const qz = bulge.origin.z + bulge.dir.z * s
          const dx = x - qx
          const dy = y - qy
          const dz = z - qz
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)
          if (dist < bulge.radius && dist > 1e-4) {
            const falloff = (1 - dist / bulge.radius) ** 2
            const push = (falloff * bulge.strength) / dist
            x += dx * push
            y += dy * push
            z += dz * push
          }
        }

        attr.setXYZ(i, x, y, z)
      }
      attr.needsUpdate = true
    }

    const renderWave = (time: number) => {
      if (model) {
        const t = time * WAVE_SPEED
        const { points, base, wire, wireBase, flatAxis, wideAxis } = model
        group.rotation.y = time * ((Math.PI * 2) / ROTATION_PERIOD)
        group.updateMatrixWorld(true)

        // カーソルを遅れて追従させ、強さもなめらかに増減（「ボワん」の質感）
        pointer.x += (pointer.targetX - pointer.x) * BULGE_FOLLOW
        pointer.y += (pointer.targetY - pointer.y) * BULGE_FOLLOW
        pointer.strength +=
          (pointer.targetStrength - pointer.strength) * BULGE_FADE
        // クリックのバーストは一気に立ち上げて指数減衰ですぐ戻す
        pointer.burst *= BURST_DECAY

        // 画面上の半径（cm→px）をシーン座標へ換算し、視線レイをローカル空間へ変換
        const visibleHeight =
          2 *
          camera.position.z *
          Math.tan(THREE.MathUtils.degToRad(camera.fov / 2))
        const worldPerPx = visibleHeight / container.clientHeight
        const bulgeRadius = BULGE_RADIUS_CM * PX_PER_CM * worldPerPx
        raycaster.setFromCamera(new THREE.Vector2(pointer.x, pointer.y), camera)
        invMatrix.copy(group.matrixWorld).invert()
        rayOrigin.copy(raycaster.ray.origin).applyMatrix4(invMatrix)
        rayDir.copy(raycaster.ray.direction).transformDirection(invMatrix)

        const bulge = {
          origin: rayOrigin,
          dir: rayDir,
          radius: bulgeRadius * (1 + pointer.burst * (BURST_RADIUS_SCALE - 1)),
          strength:
            pointer.strength * BULGE_STRENGTH + pointer.burst * BURST_STRENGTH,
        }
        applyWave(
          points.geometry.getAttribute('position') as THREE.BufferAttribute,
          base,
          t,
          flatAxis,
          wideAxis,
          bulge,
        )
        applyWave(
          wire.geometry.getAttribute('position') as THREE.BufferAttribute,
          wireBase,
          t,
          flatAxis,
          wideAxis,
        )
      }
      renderer.render(scene, camera)
    }

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    let raf = 0
    if (!reducedMotion) {
      const clock = new THREE.Clock()
      const animate = () => {
        renderWave(clock.getElapsedTime())
        raf = requestAnimationFrame(animate)
      }
      raf = requestAnimationFrame(animate)
    }

    return () => {
      disposed = true
      cancelAnimationFrame(raf)
      observer.disconnect()
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mousedown', onMouseDown)
      document.documentElement.removeEventListener('mouseleave', onMouseLeave)
      renderer.dispose()
      disposables.forEach((d) => d.dispose())
      container.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={ref} aria-hidden className='h-full w-full' />
}
