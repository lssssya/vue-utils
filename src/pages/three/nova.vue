<template>
  <div class="container">
    <div ref="novaWrapRef"></div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const novaWrapRef = ref('novaWrapRef')
const init = () => {
  createScene()
  createCamera()
  createRender()
  createControls()
  createPoints()
}
onMounted(() => {
  init()
  animate()
})


/* scene */
let scene = null
const createScene = () => {
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0x160016)
}

/* camera */
let camera = null
const createCamera = () => {
  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000)
  camera.position.set(0, 4, 21)
}

/* renderer */
let renderer = null
const createRender = () => {
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  novaWrapRef.value.appendChild(renderer.domElement)
}
window.addEventListener('resize', event => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})

/* controls */
let controls = null
const createControls = () => {
  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.enablePan = false
}

let gu = {
  time: { value: 0 }
}

let sizes = []
let shift = []
const pushShift = () => {
  shift.push(
    Math.random() * Math.PI,
    Math.random() * Math.PI * 2,
    (Math.random() * 0.9 + 0.1) * Math.PI * 0.1,
    Math.random() * 0.9 + 0.1
  )
}

const starCount = 50000
let pts = new Array(starCount).fill().map(() => {
  sizes.push(Math.random() * 1.5 + 0.5)
  pushShift()
  return new THREE.Vector3().randomDirection().multiplyScalar(Math.random() * 0.5 + 9.5)
})
const nebulaCount = 100000
for (let i = 0; i < nebulaCount; i++) {
  let r = 10, R = 30
  let rand = Math.pow(Math.random(), 1.5)
  let radius = Math.sqrt(R * R * rand + (1 - rand) * r * r)
  pts.push(new THREE.Vector3().setFromCylindricalCoords(radius, Math.random() * 2 * Math.PI, (Math.random() - 0.5) * 2))
  sizes.push(Math.random() * 1.5 + 0.5)
  pushShift()
}
let geometry = new THREE.BufferGeometry().setFromPoints(pts)
geometry.setAttribute('sizes', new THREE.Float32BufferAttribute(sizes, 1))
geometry.setAttribute('shift', new THREE.Float32BufferAttribute(shift, 4))
let material = new THREE.PointsMaterial({
  size: 0.125,
  transparent: true,
  depthTest: false,
  blending: THREE.AdditiveBlending,
  onBeforeCompile: shader => {
    shader.uniforms.time = gu.time
    shader.vertexShader = `
      uniform float time;
      attribute float sizes;
      attribute vec4 shift;
      varying vec3 vColor;
      ${ shader.vertexShader }
    `.replace(
      'gl_PointSize = size;',
      'gl_PointSize = size * sizes;'
    ).replace(
      '#include <color_vertex>',
      `#include <color_vertex>
        float d = length(abs(position) / vec3(40., 10., 40));
        d = clamp(d, 0., 1.);
        vColor = mix(vec3(227., 155., 0.), vec3(100., 50., 255.), d) / 255.;
      `
    ).replace(
      '#include <begin_vertex>',
      `#include <begin_vertex>
        float t = time;
        float moveT = mod(shift.x + shift.z * t, PI2);
        float moveS = mod(shift.y + shift.z * t, PI2);
        transformed += vec3(cos(moveS) * sin(moveT), cos(moveT), sin(moveS) * sin(moveT)) * shift.w;
      `
    )
    console.log(shader.vertexShader)
    shader.fragmentShader = `
      varying vec3 vColor;
      ${ shader.fragmentShader }
    `.replace(
      '#include <clipping_planes_fragment>',
      `#include <clipping_planes_fragment>
        float d = length(gl_PointCoord.xy - 0.5);
        //if (d > 0.5) discard;
      `
    ).replace(
      'vec4 diffuseColor = vec4( diffuse, opacity );',
      'vec4 diffuseColor = vec4( vColor, smoothstep(0.5, 0.1, d)/* * 0.5 + 0.5*/ );'
    )
    console.log(shader.fragmentShader)
  }
})

/* point */
let points = null
const createPoints = () => {
  points = new THREE.Points(geometry, material)
  points.rotation.order = 'ZYX'
  points.rotation.z = 0.2
  scene.add(points)
}

const animate = () => {
  let clock = new THREE.Clock()
  renderer.setAnimationLoop(() => {
    controls.update()
    let t = clock.getElapsedTime() * 0.5
    gu.time.value = t * Math.PI
    points.rotation.y = t * 0.05
    renderer.render(scene, camera)
  })
}


</script>
<style
  lang="scss"
  scoped
>
</style>
