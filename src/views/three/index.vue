<template>
  <div id="build-3d" class="three-wrap">
  </div>
</template>

<script>
import * as THREE from 'three'
import {d3threeD, addGeoObject} from '../../utils/three'
import OrbitControls from 'three/examples/js/controls/OrbitControls'
// const THREE = require('three')
// const OrbitControls = require('three-orbit-controls')(THREE)
const $d3g = {}
d3threeD($d3g)

// const Stats = THREE.Status()
export default {
  name: 'threeTest',
  data () {
    return {
      renderer: null, // 3D场景实例
      scene: '', // 场景
      camera: '', // 摄像头（即观看视角）
      object: '',
      stats: '',
      windowResize: ''
    }
  },
  created () {
  },
  mounted () {
    this.initScene('build-3d', 40)
  },
  computed: {},
  methods: {
    /* 初始化创建场景
    * @params eid 外部容器id
    * @params pd 左右padding总距离值
    * */
    initScene (eid, pd) {
      let wrap = document.getElementById(eid)
      //
      this.scene = new THREE.Scene()
      this.scene.background = new THREE.Color(0xe8e8e8)
      //
      this.camera = new THREE.PerspectiveCamera(50, wrap.offsetWidth / wrap.offsetHeight, 1, 1000)
      this.camera.position.set(0, 0, 200)
      //
      var group = new THREE.Group()
      this.scene.add(group)
      //
      var directionalLight = new THREE.DirectionalLight(0xffffff, 0.6)
      directionalLight.position.set(0.75, 0.75, 1.0).normalize()
      this.scene.add(directionalLight)
      var ambientLight = new THREE.AmbientLight(0xf8f8f8, 0.2)
      this.scene.add(ambientLight)
      //
      var helper = new THREE.GridHelper(160, 15)
      helper.rotation.x = Math.PI / 2
      group.add(helper)
      //
      // var obj = this.initSVGObject()
      // addGeoObject(group, obj, $d3g)
      var geometry = new THREE.Geometry()
      geometry.vertices.push(new THREE.Vector3(-79.5, 70, 0))
      geometry.vertices.push(new THREE.Vector3(-65, 79.2, 0))
      geometry.vertices.push(new THREE.Vector3(-15, 76, 0))
      geometry.vertices.push(new THREE.Vector3(-22, -12, 0))
      geometry.vertices.push(new THREE.Vector3(-52, -8, 0))
      geometry.vertices.push(new THREE.Vector3(-68, 18, 0))
      geometry.vertices.push(new THREE.Vector3(-79.5, 70, 0))
      // 创建一个简单的矩形. 在这里我们左上和右下顶点被复制了两次。
      // 因为在两个三角面片里，这两个顶点都需要被用到。
      var material = new THREE.LineBasicMaterial({color: 0x000000, opacity: 0.6})
      var mesh = new THREE.Line(geometry, material)
      this.scene.add(mesh)

      this.renderer = new THREE.WebGLRenderer({antialias: true})
      this.renderer.setPixelRatio(window.devicePixelRatio)
      this.renderer.setSize(wrap.offsetWidth - pd, wrap.offsetHeight)
      wrap.appendChild(this.renderer.domElement)
      // 轨道控制器
      var controls = new OrbitControls(this.camera, this.renderer.domElement)

      this.renderer.render(this.scene, this.camera)
      this.windowResize = () => {
        let el = document.getElementById(eid)
        this.$nextTick(() => {
          if (el) {
            this.camera.aspect = (el.offsetWidth - pd) / el.offsetHeight
            this.camera.updateProjectionMatrix()
            this.renderer.setSize(el.offsetWidth - pd, el.offsetHeight)
            this.renderer.render(this.scene, this.camera)
          }
        })
      }
      // 窗口变化时重置模型尺寸和摄像头视角比例
      window.addEventListener('resize', this.windowResize, false)
    },
    initSVGObject () {
      var obj = {}
      /// The geo data from Taipei City, Keelung City, Taipei County in SVG form
      obj.paths = [
        /// Taipei City
        'M366.2182,108.9780 L368.0329,110.3682 L367.5922,112.4411 L369.9258,116.0311 L368.9827,117.3543 ' +
        'L371.5686,119.8491 L370.5599,121.7206 L372.9314,124.8009 L368.8889,126.7603 L369.2695,130.7622 ' +
        'L366.1499,130.3388 L363.4698,128.1161 L362.9256,125.6018 L360.8153,126.4025 L360.2968,124.3588 ' +
        'L361.9519,121.1623 L360.4475,118.7162 L358.1163,117.8678 L358.7094,115.7577 L361.6243,112.4576 Z',
        /// Keelung City
        'M380.2689,113.3850 L383.5604,114.2370 L383.7404,114.2386 L385.4082,115.6247 L384.9725,117.4631 ' +
        'L381.6681,117.9439 L383.0209,121.0914 L379.4649,122.7061 L373.4987,118.8487 L372.0980,114.7589 ' +
        'L377.9716,112.0707 Z',
        /// Taipei County
        'M359.4486,155.6690 L357.0422,152.7420 L355.1688,148.0173 L357.1186,145.8045 L354.1323,141.2242 ' +
        'L351.1807,141.6609 L348.9387,140.5372 L349.5415,137.8396 L347.5174,136.1694 L347.6299,129.2327 ' +
        'L351.4192,128.8067 L354.2518,125.3113 L352.5805,121.8038 L349.3190,120.9429 L344.3277,116.7676 ' +
        'L350.9772,115.1221 L354.5759,112.5371 L354.5667,110.6949 L357.4098,105.7489 L362.3963,101.8443 ' +
        'L364.4415,101.0819 L364.5314,101.0828 L364.6209,101.1230 L364.7698,101.2029 L368.1221,101.5115 ' +
        'L371.7216,104.1338 L372.2958,106.7261 L375.5949,109.6971 L377.0415,108.8875 L377.0737,108.6526 ' +
        'L377.4037,108.6165 L376.8840,109.7091 L376.7323,109.9037 L377.9416,112.0705 L371.7970,114.8736 ' +
        'L374.0935,119.4031 L380.7848,122.7963 L382.6529,121.9897 L381.5792,117.8256 L385.0339,117.3069 ' +
        'L385.4082,115.6247 L388.7014,116.3969 L389.8697,116.6024 L390.0206,116.4860 L391.0396,116.6118 ' +
        'L394.6665,116.9929 L394.4694,119.2255 L394.3172,119.4987 L395.3792,121.8977 L395.2728,124.0526 ' +
        'L397.2123,125.6350 L401.1709,126.2516 L401.2612,126.2130 L401.4086,126.6060 L400.1992,127.7733 ' +
        'L399.7769,128.0446 L399.6247,128.3179 L398.1779,129.0521 L394.2418,129.2969 L388.7324,130.9385 ' +
        'L389.2782,134.0003 L383.7237,137.0111 L381.7445,139.9336 L379.7001,139.9546 L376.1539,143.0580 ' +
        'L371.3022,144.1094 L368.6009,146.5914 L368.7361,151.1399 L363.6153,154.4980 ' +
        /// Taipei County hole.
        'M363.4600,128.3904 L366.6300,130.3829 L369.3732,129.3913 L369.5603,125.6695 L374.3989,125.1677 ' +
        'L370.8412,123.6440 L371.0684,118.8252 L369.0431,117.3157 L369.6882,115.7936 L367.8578,112.8749 ' +
        'L368.1217,110.4867 L366.5152,109.2554 L361.9554,112.3435 L358.1163,117.8678 L361.7218,120.2192 ' +
        'L360.7261,126.3232 L362.8064,125.5221 Z']
      obj.depths = [19, 20, 21]
      obj.colors = [0xC07000, 0xC08000, 0xC0A000]
      obj.center = {x: 365, y: 125}
      return obj
    },
    render () {
      var timer = Date.now() * 0.0001
      this.camera.position.x = Math.cos(timer) * 800
      this.camera.position.z = Math.sin(timer) * 800
      this.camera.lookAt(this.scene.position)
      this.scene.traverse(function (object) {
        if (object.isMesh === true) {
          object.rotation.x = timer * 5
          object.rotation.y = timer * 2.5
        }
      })
      this.renderer.render(this.scene, this.camera)
    },
    // 坐标转换
    lonlatToMercator (lon, lat, height) {
      var z = height || 0
      var x = (lon / 180.0) * 20037508.3427892
      var y = (Math.PI / 180.0) * lat
      var tmp = Math.PI / 4.0 + y / 2.0
      y = 20037508.3427892 * Math.log(Math.tan(tmp)) / Math.PI
      return {x: x, y: y, z: z}
    }
  },
  watch: {},
  beforeDestroy () {
    window.removeEventListener('resize', this.windowResize)
  }
}
</script>

<style lang="scss" scoped>
  .three-wrap {
    position: relative;
    canvas {
      width: 100%;
      height: 100%;
    }
  }
</style>
