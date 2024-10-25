<template>
  <div class="container">
    <div
      ref="threeWrapRef"
      class="wrap"
    ></div>
    <div class="tool-wrap">
      <div class="button-group">
        <el-button @click="handleLoadFbx">load fbx</el-button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'

const threeWrapRef = ref('threeWrapRef')
const init = () => {
  createScene()
  createCamera()

  createRender()
  createControls()
}
onMounted(() => {
  console.log(

  )
  init()
  animate()
})


/* tool */
const handleLoadFbx = () => {
  createFBX()
}

/* scene */
let scene = null
const createScene = () => {
  scene = new THREE.Scene()
}

/* camera */
let camera = null
const createCamera = () => {
  // camera = new THREE.PerspectiveCamera(45, threeWrapRef.value.clientWidth / threeWrapRef.value.clientHeight, 1, 2000)
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000)
  camera.position.set(100, 200, 300)
}


/* renderer */
let renderer = null
const createRender = () => {
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setClearColor(0xffffff, 0)
  renderer.setPixelRatio(window.devicePixelRatio)
  // renderer.setSize(threeWrapRef.value.clientWidth, threeWrapRef.value.clientHeight)
  renderer.setSize(window.innerWidth, window.innerHeight)
  threeWrapRef.value.appendChild(renderer.domElement)
  renderer.render(scene, camera)
}

/* controls */
let controls = null
const createControls = () => {
  // 实现缩放和旋转
  controls = new OrbitControls(camera, renderer.domElement)
  controls.target.set(0, 0, 0)
}
const animate = () => {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
}

/* fbx */
const createFBX = () => {
  const loader = new FBXLoader()
  const assetsUrl = import.meta.env.BASE_URL + import.meta.env.VITE_APP_ASSETS
  loader.load(`${ assetsUrl }/source/fbx/1.fbx`, (object) => {
    console.log(object)
    object.traverse((child) => {

    })
    scene.add(object)
  })
}
</script>
<style
  lang="scss"
  scoped
>
.container {
  position: relative;
}

.tool-wrap {
  position: absolute;
  top: 0;
  left: 0;
  width: 1280px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 240px);
  gap: 12px 12px;

  .button-group {
    display: flex;
    width: 240px;
  }
}
</style>
