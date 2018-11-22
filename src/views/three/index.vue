<template>
  <div id="build-3d" class="three-wrap">
  </div>
</template>

<script>
/* 使用three.js examples/js 中插件需要在webpack.base.conf.js module.rules 中添加配置项否侧导入会报错无法正常使用
*  以使用OrbitControls插件为例 首先npm i --save exports-loader imports-loader (模块名不可写错)
* webpack.base.conf.js中 module.rules下添加配置：
* {
    test: require.resolve('three/examples/js/controls/OrbitControls'),
    use: 'imports-loader?THREE=three'
  },
  {
    test: require.resolve('three/examples/js/controls/OrbitControls'),
    use: 'exports-loader?THREE.OrbitControls'
  }
* 配置完成后 在需要使用的地方 require('three/examples/js/controls/OrbitControls')
* 或者 import OrbitControls from 'three/examples/js/controls/OrbitControls'
* */

import * as THREE from 'three'
import {d3threeD, addGeoObject} from '../../utils/three'
// three.js控制器插件 文件引入后才可使用THREE.OrbitControls() 构造函数
require('three/examples/js/controls/OrbitControls')
require('three/examples/js/loaders/SVGLoader')
// require('three/examples/js/')
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
      windowResize: '',
      meshList: [],
      container: ''
    }
  },
  created () {
  },
  mounted () {
    this.initScene('build-3d', 40)
    this.animate()
  },
  computed: {},
  methods: {
    /* 初始化创建场景
    * @params eid 外部容器id
    * @params pd 左右padding总距离值
    * */
    initScene (eid, pd) {
      this.container = document.getElementById(eid)
      //
      this.scene = new THREE.Scene()
      this.scene.background = new THREE.Color(0xeeeeee)
      //
      this.camera = new THREE.PerspectiveCamera(56, (this.container.clientWidth - pd) / this.container.clientHeight, 1, 5000)
      this.camera.position.set(0, 0, 400)
      //
      var group = new THREE.Group()
      this.scene.add(group)
      //
      var directionalLight = new THREE.DirectionalLight(0xffffff, 0.6)
      directionalLight.position.set(0.75, 0.75, 1.0).normalize()
      this.scene.add(directionalLight)
      var ambientLight = new THREE.AmbientLight(0xf8f8f8, 0.2)
      this.scene.add(ambientLight)

      var planeGeometry = new THREE.PlaneGeometry(300, 160, 1, 1)
      var planeMaterial = new THREE.MeshBasicMaterial({color: 0xcccccc})
      var plane = new THREE.Mesh(planeGeometry, planeMaterial)
      // plane.rotation.x = -0.5 * Math.PI
      // plane.position.x = 5
      // group.add(plane)
      var svgLoader = new THREE.SVGLoader()
      svgLoader.load('static/chengxiyintai.svg', (paths) => {
        // var group = new THREE.Group()
        // group.scale.multiplyScalar(0.5)
        group.position.x = -290
        group.position.y = 214
        group.scale.y *= -1
        for (var i = 0; i < paths.length; i++) {
          var path = paths[i]
          var material = new THREE.MeshBasicMaterial({
            color: path.color,
            side: THREE.DoubleSide,
            depthWrite: false
          })
          var shapes = path.toShapes(true)
          for (var j = 0; j < shapes.length; j++) {
            var shape = shapes[j]
            var geometry = new THREE.ShapeBufferGeometry(shape)
            var mesh = new THREE.Mesh(geometry, material)
            this.meshList.push(mesh)
            group.add(mesh)
          }
        }
        document.addEventListener('click', this.onDocumentMouseDown, false)
        this.scene.add(group)
        // document.addEventListener('mouseover', this.onDocumentMouseDown, false)
      })
      // var spriteMap = new THREE.TextureLoader().load('texture/UV_Grid_Sm.jpg')
      // var spriteMaterial = new THREE.SpriteMaterial({map: spriteMap, color: 0xff0000})
      // var sprite = new THREE.Sprite(spriteMaterial)
      // this.scene.add(sprite)
      var axes = new THREE.AxesHelper(150)
      this.scene.add(axes)
      //
      var obj = this.initSVGObject()
      // addGeoObject(group, obj, $d3g)

      this.renderer = new THREE.WebGLRenderer({antialias: true})
      this.renderer.setPixelRatio(window.devicePixelRatio)
      this.renderer.setClearColor(0xeeeeee)
      this.renderer.setSize(this.container.clientWidth - pd, this.container.clientHeight)
      this.container.appendChild(this.renderer.domElement)
      // 轨道控制器
      var controls = new THREE.OrbitControls(this.camera, this.renderer.domElement)
      controls.enableRotate = false
      console.log(controls)
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
    animate () {
      requestAnimationFrame(this.animate)
      this.renderer.render(this.scene, this.camera)
    },
    addGlobalEvent (e) {},
    // 添加全局的点击事件
    onDocumentMouseDown (event) {
      event.preventDefault()
      // 基于屏幕点击位置，创建一个Vector3向量
      var vector = new THREE.Vector3((event.clientX / (window.innerWidth)) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1, 0.5)
      // 将屏幕上的点击位置转换成Three.js场景中的坐标
      vector = vector.unproject(this.camera)
      // THREE.Raycaster 从相机的位置 向场景中鼠标的点击位置发射光线
      let raycaster = new THREE.Raycaster(this.camera.position, vector.sub(this.camera.position).normalize())
      // 使用intersectObjects方法来判断指定的对象中哪些被该光线照射到了
      let intersects = raycaster.intersectObjects(this.meshList)
      console.log(this.meshList, intersects)
      if (intersects.length > 0) {
        let current = intersects[1] || intersects[0]
        console.log(current)
        console.log(current.object)
        current.object.material.color = new THREE.Color(0xff0000)
      }
    },
    // 创建精灵贴纸
    createSprite (geometry, url, scale, posY) {
      // 设置精灵材质
      let spriteMaterial = new THREE.SpriteMaterial({
        opacity: 1,
        // color: 0xffffff,
        map: new THREE.TextureLoader().load(url)
      })
      // 设置map位置 - 仅针对此图片
      // spriteMaterial.map.offset = new THREE.Vector2(0.2 * 2, 0)
      // spriteMaterial.map.repeat = new THREE.Vector2(1 / 5, 1)
      spriteMaterial.depthTest = false
      // 设置背景不可见
      // spriteMaterial.blending = THREE.AdditiveBlending

      // 设置精灵缩放和相对位置
      let sprite = new THREE.Sprite(spriteMaterial)
      console.log(sprite)
      sprite.scale.set(scale, scale, scale)
      sprite.position.set(0, posY, 0)

      // 在物体上添加贴图
      geometry.add(sprite)
    },
    initSVGObject () {
      var obj = {}
      /// The geo data from Taipei City, Keelung City, Taipei County in SVG form
      obj.paths = ['M54.9,182.6l-4-35l8.7-2.2l-1.5-8.4l104.4-16.4l20.9,13.7l3.3,37.5l38.6-6l9.9-3.8l-3.4-12.7l-6.6,2' +
        'l-3-19.4l20.7-25.1l85.9-26.1l45.1,4.7l32.6-7.8v-9.4l82.1-57.1c9.4-3.9,14.3-5.9,14.7-5.9c14.6-1.2,26.9,1,37.1,6.6' +
        'c3,1.6,7,4.8,12,9.6c2.5,3.3,4.7,6.1,6.5,8.4c2.8,3.5,5,6.7,7.1,9.3c-2.4,0-4.3,0.1-5.7,0.2l3.5,34.5l0.6,35.8l-5.2,24.8' +
        'l2.8,28.4l-17.3,2.3l8.3,58.1l16.4-2.4l5.2,37.4l-3.6,0.9l4,20.6l-27,9.3l-14.7,28.6l-30.1,9.6c-8,1.1-15.1,1.9-21.3,2.5' +
        'c-6.2,0.6-12,1.2-17.3,1.7l-20.4-8.1l-12.7,4.5v10.6l-44.3,5.2l-36,4.7l-1.5-5.2l-29.9,4.8v7.1l-68.5,8.7l-42.3,9.8L170,386.9' +
        'l-25.2,8.7l-3.8-6.9l-26,9.7l1.6,5.5l-63.7,19.7l-11.8-34.9l-30.3-62.4l-6-142.7l18-0.9v-5.8l22.8,1.6L54.9,182.6Z',
        'M464.8,221l23.8-3.7l5.2,34.8l-30.7,4.5l1.2,8.5l3.8-0.5l1.8,8.1l-4.5,0.9l-18.3,6.3l-4-28.9l-6.6-8.4' +
        'l4.6-0.6l-0.7-6.6c2.7-0.3,4.8-0.6,6.2-0.8c1.4-0.2,2.4-0.3,3-0.3l0.5,3.8l17-3.2L464.8,221z'
      ]
      obj.depths = [1, 1, 1, 2]
      obj.colors = [0x0F0E11, 0x2759A8, 0xC0A000, 0xff0000]
      obj.center = {x: 280, y: 200}
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
