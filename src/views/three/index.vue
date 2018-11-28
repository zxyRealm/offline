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
import fonts from 'three/examples/fonts/gentilis_regular.typeface.json'
import {Contour, changeArrayLevel, d3threeD, addGeoObject} from '../../utils/three'
// import * as TWEEN from ''
// three.js控制器插件 文件引入后才可使用THREE.OrbitControls() 构造函数
require('three/examples/js/controls/OrbitControls')
require('three/examples/js/loaders/SVGLoader')
require('three/examples/js/loaders/PLYLoader')
// require('three/examples/js/libs/tween.min')
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
      container: '',
      raycaster: '',
      INTERSECTED: null,
      mouse: {},
      group: '',
      mixer: '',
      clock: '',
      controls: '',
      float32Array: [346.29998779296875, 242.5, 0, 347.29998779296875, 251.89999389648438, 0, 351.70001220703125, 251.10000610351562, 0, 356.1000061035156, 251.1999969482422, 0, 355.5, 246, 0, 351.3999938964844, 246.1999969482422, 0, 350.8999938964844, 242, 0],
      copy32Array: ''
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
      this.camera.position.set(0, 0, 500)
      //
      this.group = new THREE.Group()
      this.scene.add(this.group)
      //
      let directionalLight = new THREE.DirectionalLight(0xffffff, 0.6)
      directionalLight.position.set(0, 0, 10).normalize()
      this.scene.add(directionalLight)

      let svgLoader = new THREE.SVGLoader()
      svgLoader.load('/static/copy.svg', (paths) => {
        this.group.position.x = -290
        this.group.position.y = 214
        this.group.scale.y *= -1
        for (let i = 0; i < paths.length; i++) {
          let path = paths[i]
          // console.log(i, path)
          let material = new THREE.MeshBasicMaterial({
            color: path.color,
            side: THREE.DoubleSide,
            depthWrite: false
          })
          let shapes = path.toShapes(true)
          for (let j = 0; j < shapes.length; j++) {
            let shape = shapes[j]
            // console.log(i, shape)
            let geometry = new THREE.ShapeBufferGeometry(shape)
            let mesh = new THREE.Mesh(geometry, material)
            if (i !== 0) this.meshList.push(mesh)
            // console.log(i, mesh)
            // let ps = path.subPaths[0].currentPoint
            // if (mesh.geometry.attributes.position.array.toString() === this.float32Array.toString()) {
            // console.log(i, mesh.geometry.attributes.position.array)
            let ps = new Contour(changeArrayLevel(mesh.geometry.attributes.position.array)).centroid()
            mesh.add(this.createSpriteText(i, ps.x, ps.y))
            // }
            this.group.add(mesh)
          }
        }
      })

      let geometry = new THREE.CircleBufferGeometry(5, 20, 0, Math.PI * 2)
      let light = new THREE.PointLight(0xffff00, 2, 20)
      light.color.setRGB(1, 1, 0)
      this.group.add(light)
      let material = new THREE.MeshBasicMaterial({color: 0xffff00})
      let emitter = new THREE.Mesh(geometry, material)
      emitter.position.set(54.9, 182.6, 1)
      light.add(emitter)
      // console.log(new THREE.Color('rgba(255,255,0)'))
      let scaleKF = new THREE.VectorKeyframeTrack('.scale', [ 0, 1, 1.5 ], [ 1, 1, 1, 2, 2, 2, 1, 1, 1 ])
      // COLOR
      var colorKF = new THREE.ColorKeyframeTrack('.material.color', [ 1, 1, 0 ], [ 1, 1, 0, 1, 1, 0, 1, 1, 0 ], THREE.InterpolateDiscrete)
      // OPACITY
      var opacityKF = new THREE.NumberKeyframeTrack('.material.opacity', [ 1, 1, 1 ], [ 0, 0, 0, 1, 1, 1, 0, 0, 0 ])
      // create an animation sequence with the tracks
      // If a negative time value is passed, the duration will be calculated from the times of the passed tracks array
      var clip = new THREE.AnimationClip('Action', 2, [ scaleKF, colorKF, opacityKF ])
      // setup the AnimationMixer
      this.mixer = new THREE.AnimationMixer(emitter)
      // create a ClipAction and set it to play
      var clipAction = this.mixer.clipAction(clip)
      clipAction.play()
      clipAction.loop = THREE.LoopOnce
      this.clock = new THREE.Clock()

      // var material = new THREE.MeshBasicMaterial({})
      // this.scene.add(new THREE.Mesh(new THREE.ShapeGeometry(this.drawShape()), material))
      //
      // var obj = this.initSVGObject()
      // addGeoObject(this.group, obj, $d3g)
      this.raycaster = new THREE.Raycaster()
      this.renderer = new THREE.WebGLRenderer({antialias: true})
      this.renderer.setPixelRatio(window.devicePixelRatio)
      this.renderer.setClearColor(0xeeeeee)
      this.renderer.setSize(this.container.clientWidth - pd, this.container.clientHeight)
      this.container.appendChild(this.renderer.domElement)
      // 轨道控制器
      this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement)
      this.controls.enableRotate = false
      console.log(this.controls)
      this.renderer.render(this.scene, this.camera)
      console.log(this.scene)
      // 窗口变化时重置模型尺寸和摄像头视角比例
      window.addEventListener('mousemove', this.onDocumentMouseMove, false)
      window.addEventListener('click', this.onDocumentMouseClick, false)
      window.addEventListener('resize', this.onWindowResize, false)
    },

    // 窗口尺寸改变时重新渲染
    onWindowResize () {
      let el = document.getElementById('build-3d')
      if (el) {
        this.camera.aspect = (el.clientWidth - 40) / el.clientHeight
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(el.clientWidth - 40, el.clientHeight)
        this.renderer.render(this.scene, this.camera)
      }
    },
    animate () {
      // this.controls.update()
      requestAnimationFrame(this.animate)
      this.render()
    },
    onDocumentMouseMove (event) {
      event.preventDefault()
      this.$set(this.mouse, 'x', (event.offsetX / (this.container.clientWidth - 40)) * 2 - 1)
      this.$set(this.mouse, 'y', -(event.offsetY / this.container.clientHeight) * 2 + 1)
    },
    addGlobalEvent (e) {},
    // 添加全局的点击事件
    onDocumentMouseDown (event) {
      event.preventDefault()
      console.log(event)
      // 基于屏幕点击位置，创建一个Vector3向量
      this.camera.updateMatrixWorld()
      // let vector = new THREE.Vector3(mouse.x, mouse.y, 1)
      // 将屏幕上的点击位置转换成Three.js场景中的坐标
      // vector = vector.unproject(this.camera)
      this.raycaster.setFromCamera(this.mouse, this.camera)
      // THREE.Raycaster 从相机的位置 向场景中鼠标的点击位置发射光线
      // let raycaster = new THREE.Raycaster(this.camera.position, vector.sub(this.camera.position).normalize())
      // 使用intersectObjects方法来判断指定的对象中哪些被该光线照射到了
      // let intersects = this.raycaster.intersectObjects(this.meshList)
      // if (intersects.length > 0) {
      //   let current = intersects[0]
      //   console.log(current)
      //   console.log(current.object)
      //   current.object.material.color = new THREE.Color(0xff0000)
      // }
    },
    onDocumentMouseClick (event) {

    },
    // 创建精灵贴纸
    createSpriteText (text, x, y) {
      // 先用画布将文字画出
      let canvas = document.createElement('canvas')
      let ctx = canvas.getContext('2d')
      ctx.fillStyle = '#ffff00'
      ctx.font = 'Bold 100px Arial'
      ctx.lineWidth = 4
      ctx.fillText(text, 4, 104)
      let texture = new THREE.Texture(canvas)
      texture.needsUpdate = true
      // 使用Sprite显示文字
      let material = new THREE.SpriteMaterial({map: texture, transparent: true})
      let textObj = new THREE.Sprite(material)
      textObj.scale.set(0.75 * 60, 0.25 * 60, 1)
      textObj.position.set(x, y, 10)
      return textObj
    },
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
    /* 创建模型
    * @params shape 模型的几何形状
    * @params extrudeSettings 模型配置
    * @params color 模型填充色
    * @params x,y,z 模型原点坐标
    * @params rx,ry,rz 旋转角
    * @params s 缩放比例
    * */
    addShape (shape, extrudeSettings, color, x, y, z, rx, ry, rz, s) {
      // flat shape with texture
      // note: default UVs generated by ShapeBufferGeometry are simply the x- and y-coordinates of the vertices
      // extruded shape
      var geometry = new THREE.ExtrudeBufferGeometry(shape, extrudeSettings)
      var mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({color: color}))
      mesh.position.set(x, y, z - 75)
      mesh.rotation.set(rx, ry, rz)
      mesh.scale.set(s, s, s)
      this.group.add(mesh)
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
        'l4.6-0.6l-0.7-6.6c2.7-0.3,4.8-0.6,6.2-0.8c1.4-0.2,2.4-0.3,3-0.3l0.5,3.8l17-3.2L464.8,221z',
        'M407.8,105.4h11c-0.3-11.3,2.4-19.9,8.1-25.8c8.5-8.8,15.7-14.4,18.9-15.6c2.2-0.8,5-1.9,8.5-3.3' +
        'c9.8-7.2,15.6-12.6,17.4-16.2c1.8-3.6,3.1-6.5,3.9-8.5l6.3-7.4l8.4-6l-1.5-11l-82.2,57.2l0.6,21L407.8,105.4z'
      ]
      obj.depths = [1, 1, 1, 2]
      obj.colors = [0x0F0E11, 0x2759A8, 0x00ff00, 0xff0000]
      obj.center = {x: 280, y: 200}
      return obj
    },
    drawShape () {
      // create a basic shape
      var shape = new THREE.Shape()

      // startpoint
      shape.moveTo(12, 10)

      // straight line upwards
      shape.lineTo(10, 40)

      // the top of the figure, curve to the right
      shape.bezierCurveTo(15, 25, 25, 25, 30, 40)

      // spline back down
      shape.splineThru(
        [new THREE.Vector2(32, 30),
          new THREE.Vector2(28, 20),
          new THREE.Vector2(30, 10)
        ])

      // curve at the bottom
      shape.quadraticCurveTo(20, 15, 10, 10)

      // add 'eye' hole one
      var hole1 = new THREE.Path()
      hole1.absellipse(16, 24, 2, 3, 0, Math.PI * 2, true)
      shape.holes.push(hole1)

      // add 'eye hole 2'
      var hole2 = new THREE.Path()
      hole2.absellipse(23, 24, 2, 3, 0, Math.PI * 2, true)
      shape.holes.push(hole2)

      // add 'mouth'
      var hole3 = new THREE.Path()
      hole3.absellipse(20, 16, 2, 0, Math.PI, true)
      shape.holes.push(hole3)

      // return the shape
      return shape
    },
    render () {
      var delta = this.clock.getDelta()
      if (this.mixer) {
        this.mixer.update(delta)
      }
      this.raycaster.setFromCamera(this.mouse, this.camera)
      var intersects = this.raycaster.intersectObjects(this.meshList)
      if (intersects.length > 0) {
        if (this.INTERSECTED !== intersects[ 0 ].object) {
          if (this.INTERSECTED) this.INTERSECTED.material.color.setHex(this.INTERSECTED.currentHex)
          this.INTERSECTED = intersects[ 0 ].object
          this.INTERSECTED.currentHex = this.INTERSECTED.material.color.getHex()
          this.INTERSECTED.material.color.setHex(0xff0000)
        }
      } else {
        if (this.INTERSECTED) this.INTERSECTED.material.color.setHex(this.INTERSECTED.currentHex)
        this.INTERSECTED = null
      }
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
    document.removeEventListener('resize', this.onWindowResize())
    document.removeEventListener('click', this.onDocumentMouseDown)
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
