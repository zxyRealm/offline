<template>
  <div id="build-3d" class="three-wrap">
  </div>
</template>

<script>
import * as THREE from 'three'
export default {
  name: 'threeTest',
  data () {
    return {
      renderer: null, // 3D场景实例
      scene: '', // 场景
      camera: '' // 摄像头（即观看视角）
    }
  },
  created () {},
  mounted () {
    // this.initScene('build-3d', 40)
  },
  computed: {},
  methods: {
    /* 初始化创建场景
    * @params eid 外部容器id
    * @params pd 左右padding总距离值
    * */
    initScene (eid, pd) {
      let wrap = document.getElementById(eid)
      this.scene = new THREE.Scene()
      this.camera = new THREE.PerspectiveCamera(75, wrap.offsetWidth / wrap.offsetHeight, 0.1, 1000)
      this.renderer = new THREE.WebGLRenderer()
      this.renderer.setSize(wrap.clientWidth - pd, wrap.clientHeight)
      wrap.appendChild(this.renderer.domElement)
      var geometry = new THREE.BoxGeometry(1, 1, 1)
      var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
      var cube = new THREE.Mesh(geometry, material)
      this.scene.add(cube)
      this.camera.position.z = 5
      var animate = () => {
        requestAnimationFrame(animate)
        cube.rotation.x += 0.01
        cube.rotation.y += 0.01
        this.renderer.render(this.scene, this.camera)
      }
      animate()
      window.addEventListener('resize', this.onWindowResize(), false)
    },
    onWindowResize (eid, pd) {
      let el = document.getElementById(eid)
      if (el) {
        this.camera.aspect = el.offsetWidth / el.offsetHeight
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(el.clientWidth - pd, el.clientHeight)
      }
    }
  },
  watch: {}
}
</script>

<style lang="scss" scoped>
.three-wrap {
  canvas{
    width: 100%;
    height: 100%;
  }
}
</style>
