<template>
  <div style="height: 100%">
    <div :id="id" class="three-wrap">
    </div>
    <canvas id="testCanvas"></canvas>
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
const $d3g = {}
d3threeD($d3g)

// const Stats = THREE.Status()
export default {
  name: 'threeTest',
  props: {
    id: {
      type: String,
      default: 'bulid-3d'
    },
    pd: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      renderer: null, // 3D场景实例
      scene: '', // 场景
      camera: '', // 摄像头（即观看视角）
      object: '',
      stats: '',
      windowResize: '',
      meshList: [], // 需要添加事件的Mesh对象列表
      container: '',
      raycaster: '', // 寻找当前选中或作用的对象
      INTERSECTED: null,
      mouse: {}, // 鼠标的坐标位置
      group: '', // 场景群组对象
      mixer: '',
      clock: '',
      controls: '', // 轨迹控制器
      float32Array: [346.29998779296875, 242.5, 0, 347.29998779296875, 251.89999389648438, 0, 351.70001220703125, 251.10000610351562, 0, 356.1000061035156, 251.1999969482422, 0, 355.5, 246, 0, 351.3999938964844, 246.1999969482422, 0, 350.8999938964844, 242, 0],
      copy32Array: '',
      totalMesh: [] // 全部mesh(包括sprite)
    }
  },
  created () {
  },
  mounted () {
    this.initScene()
  },
  computed: {},
  methods: {
    /* 初始化创建场景
    * @params eid 外部容器id
    * @params pd 左右padding总距离值
    * @params floor 渲染的楼层
    * */
    initScene (floor = (this.$route.query.floor || 'F1')) {
      this.container = document.getElementById(this.id)
      this.renderer = new THREE.WebGLRenderer({antialias: true, alpha: true})
      this.renderer.setPixelRatio(window.devicePixelRatio)
      this.renderer.setClearColor(0xeeeeee)
      this.renderer.setSize(this.container.clientWidth - this.pd, this.container.clientHeight)
      //
      this.renderer.shadowMapEnabled = true
      this.renderer.shadowMapSoft = true
      this.scene = new THREE.Scene()
      // this.scene.background = new THREE.Color(0x0F0E11)
      //
      this.camera = new THREE.PerspectiveCamera(30, (this.container.clientWidth - this.pd) / this.container.clientHeight, 1, 5000)
      this.camera.position.set(0, 0, 450)
      //
      this.group = new THREE.Group()
      this.scene.add(this.group)
      var plane = new THREE.Mesh(new THREE.PlaneGeometry(580, 428, 3, 3),
        new THREE.MeshLambertMaterial({color: 0x005BC9}))
      plane.rotation.x = -Math.PI / 2
      plane.position.y = -1
      plane.receiveShadow = true
      this.scene.add(plane)
      var light = new THREE.SpotLight(0xffff00, 1, 100, Math.PI / 6, 25)
      light.position.set(2, 5, 3)
      // light.target = cube;
      light.castShadow = true

      light.shadowCameraNear = 1
      light.shadowCameraFar = 5000
      light.shadowCameraFov = 30
      light.shadowCameraVisible = true

      light.shadowMapWidth = 580
      light.shadowMapHeight = 428
      light.shadowDarkness = 0.3

      this.scene.add(light)
      //
      // let directionalLight = new THREE.DirectionalLight(0xffffff, 0.6)
      // directionalLight.position.set(0, 0, 10).normalize()
      // this.scene.add(directionalLight)
      // 通过svg文件构画出分布图
      let svgLoader = new THREE.SVGLoader()
      let psJson = JSON.parse(localStorage.getItem('group_local'))
      // console.log(psJson, new Float32Array(psJson.position))
      // let imgUrl = 'http://offline-browser-images-test.oss-cn-hangzhou.aliyuncs.com/floor_map/A684E231460F4EA080BF64C9A87EF64D/floorF1.svg'
      let texture = THREE.ImageUtils.loadTexture('static/timg.jpg', null, function (t) {
      })
      var geometry = new THREE.PlaneGeometry(580, 428, 1, 1)
      var material = new THREE.MeshBasicMaterial({map: texture})
      var mesh = new THREE.Mesh(geometry, material)
      // this.scene.add(mesh)
      // svgLoader.load('/static/origin-floor/B1.svg', (paths) => {
      //   this.group.position.x = -290
      //   this.group.position.y = 214
      //   this.group.scale.y *= -1
      //   let geometries = []
      //   let totalGeom = new THREE.Geometry()
      //   let cubeMat
      //   for (let i = 0; i < paths.length; i++) {
      //     let path = paths[i]
      //     let materialLine = new THREE.LineBasicMaterial({
      //       color: path.color,
      //       side: THREE.DoubleSide,
      //       depthWrite: false
      //     })
      //     let shapes = path.toShapes(true)
      //     // materials.push(materialLine)
      //     for (let j = 0; j < shapes.length; j++) {
      //       let shape = shapes[j]
      //       let geometry = new THREE.ShapeBufferGeometry(shape)
      //       let mesh = new THREE.Mesh(geometry, materialLine)
      //       // new THREE.Geometry().merge(totalGeom, mesh)
      //       mesh.name = i
      //       geometries.push(geometry)
      //       if (i !== 0) this.meshList.push(mesh)
      //       let ps
      //       // ps = new Contour(changeArrayLevel(mesh.geometry.attributes.position.array)).centroid()
      //       // mesh.add(this.createSpriteText(i, ps.x, ps.y))
      //       if (psJson.position.toString() === mesh.geometry.attributes.position.array.toString()) {
      //         ps = new Contour(changeArrayLevel(new Float32Array(psJson.position))).centroid()
      //         this.createSpriteText(psJson.name, ps.x, ps.y, (obj) => {
      //           mesh.add(obj)
      //         }, '/static/favicon.svg')
      //       } else {
      //         ps = new Contour(changeArrayLevel(mesh.geometry.attributes.position.array)).centroid()
      //         this.createSpriteText(i, ps.x, ps.y, (obj) => {
      //           mesh.add(obj)
      //         })
      //       }
      //       this.group.add(mesh)
      //     }
      //   }
      //   this.addFlashPoint()
      // })
      this.raycaster = new THREE.Raycaster()

      this.container.appendChild(this.renderer.domElement)
      // 轨道控制器
      this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement)
      // this.controls.enableRotate = false
      // this.controls.enablePan = false
      // console.log(this.controls)
      this.animate()
      // this.renderer.render(this.scene, this.camera)
      // 窗口变化时重置模型尺寸和摄像头视角比例
      window.addEventListener('mousemove', this.onDocumentMouseMove, false)
      window.addEventListener('click', this.onDocumentMouseClick, false)
      window.addEventListener('resize', this.onWindowResize, false)
    },

    // 窗口尺寸改变时重新渲染
    onWindowResize () {
      let el = document.getElementById(this.id)
      if (el) {
        this.camera.aspect = (el.clientWidth - this.pd) / el.clientHeight
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(el.clientWidth - this.pd, el.clientHeight)
        this.renderer.render(this.scene, this.camera)
      }
    },
    animate () {
      requestAnimationFrame(this.animate)
      this.render()
    },
    onDocumentMouseMove (event) {
      event.preventDefault()
      this.$set(this.mouse, 'x', (event.offsetX / (this.container.clientWidth - this.pd)) * 2 - 1)
      this.$set(this.mouse, 'y', -(event.offsetY / this.container.clientHeight) * 2 + 1)
    },
    addFlashPoint () {
      let vertexShader = 'varying vec3 vNormal;\n' +
        'void main(){\n' +
        '  vNormal = normalize(normalMatrix * normal);\n' +
        '  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n' +
        '}'
      let fragmentShader = 'varying vec3 vNormal;\n' +
        'void main(){\n' +
        '\tfloat intensity = pow(0.2 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);\n' +
        '  gl_FragColor = vec4( 1.0, 1.0, 0.0, 1.0 ) * intensity;\n' +
        '}'
      let customMaterial = new THREE.ShaderMaterial({
        uniforms: {},
        transparent: true,
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        side: THREE.BackSide
      })
      /* 创建一个球体
      * 第一参数 半径
      * 第二参数 球面分隔份数
      * */
      let ballGeometry = new THREE.SphereGeometry(15, 150, 100)
      let ball = new THREE.Mesh(ballGeometry, customMaterial)
      this.group.add(ball)
      // POSITION
      /* 第一个数组 时间
      * 第二个数组 坐标点
      * */
      var positionKF = new THREE.VectorKeyframeTrack('.position', [0], [ 50.14, 177.65, 0 ])
      let scaleKF = new THREE.VectorKeyframeTrack('.scale', [ 0, 1, 1.5 ], [ 1, 1, 1, 2, 2, 2, 1, 1, 1 ])
      // OPACITY
      var opacityKF = new THREE.NumberKeyframeTrack('.material.opacity', [ 1, 1, 1 ], [ 0, 0, 0, 1, 1, 1, 0, 0, 0 ])
      // create an animation sequence with the tracks
      // If a negative time value is passed, the duration will be calculated from the times of the passed tracks array
      var clip = new THREE.AnimationClip('Action', 2, [ scaleKF, opacityKF, positionKF ])
      // setup the AnimationMixer
      this.mixer = new THREE.AnimationMixer(ball)
      // create a ClipAction and set it to play
      var clipAction = this.mixer.clipAction(clip)
      clipAction.play()
      // clipAction.loop = THREE.LoopOnce
      this.clock = new THREE.Clock()
    },
    onDocumentMouseClick (event, i) {
      event.preventDefault()
      this.$set(this.mouse, 'x', (event.offsetX / (this.container.clientWidth - this.pd)) * 2 - 1)
      this.$set(this.mouse, 'y', -(event.offsetY / this.container.clientHeight) * 2 + 1)
      this.raycaster.setFromCamera(this.mouse, this.camera)
      let intersects = this.raycaster.intersectObjects(this.meshList)
      if (intersects.length > 0) {
        this.INTERSECTED = intersects[ 0 ].object
        this.$emit('handle-block-click', intersects[ 0 ].object)
      }
    },
    // 创建精灵贴纸
    createSpriteText (text, x, y, c, src) {
      // 先用画布将文字画出
      if (src) {
        let canvas = document.createElement('canvas')
        let ctx = canvas.getContext('2d')
        let img = new Image()
        img.src = src
        img.onload = function () {
          canvas.width = 600
          canvas.height = 450
          ctx.drawImage(img, 90, 0, 120, 80)
          ctx.fillStyle = '#ffff00'
          ctx.textAlign = 'center'
          ctx.font = 'Bold 200px Arial'
          ctx.lineWidth = 4
          ctx.fillText(text, 300, 144)
          let texture = new THREE.Texture(canvas)
          texture.needsUpdate = true
          // 使用Sprite显示文字
          let material = new THREE.SpriteMaterial({map: texture, transparent: true})
          let textObj = new THREE.Sprite(material)
          textObj.scale.set(0.75 * 200, 0.25 * 200, 1)
          textObj.position.set(x, y - 5, 1)
          c(textObj)
        }
      } else {
        let canvas = document.createElement('canvas')
        let ctx = canvas.getContext('2d')
        // canvas.width = 2000
        // canvas.height = 1500
        ctx.fillStyle = '#ffff00'
        ctx.font = 'Bold 100px Arial'
        ctx.lineWidth = 4
        ctx.fillText(text, 4, 104)
        let texture = new THREE.Texture(canvas)
        texture.needsUpdate = true
        // 使用Sprite显示文字
        let material = new THREE.SpriteMaterial({map: texture, transparent: true})
        let textObj = new THREE.Sprite(material)
        // textObj.scale.set(0.75 * 60, 0.25 * 60, 1)
        textObj.position.set(x, y, 1)
        c(textObj)
      }
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
      if (this.mixer && this.clock) {
        this.mixer.update(this.clock.getDelta())
      }
      this.raycaster.setFromCamera(this.mouse, this.camera)
      let intersects = this.raycaster.intersectObjects(this.scene.children)
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
    },
    // 销毁three.js 模型实例
    disposeTotal () {
      // let _this = this
      // for (let item in _this.$data) {
      //   _this.$data[item] = null
      // }
      let depthDispose = (mesh) => {
        if (mesh.children && mesh.children.length) {
          mesh.children.map(item => {
            depthDispose(item)
            item.remove()
            item = null
          })
        }
        if (mesh.geometry) {
          mesh.geometry.dispose()
          mesh.remove()
          mesh = null
        }
        if (mesh.material) {
          mesh.material.dispose()
          mesh.remove()
          mesh = null
        }
      }
    }
  },
  watch: {},
  beforeDestroy () {
    document.removeEventListener('resize', this.onWindowResize)
    document.removeEventListener('click', this.onDocumentMouseDown)
  }
}
</script>

<style lang="scss" scoped>
  .three-wrap {
    height: 100%;
    position: relative;
    canvas {
      width: 100%;
      height: 100%;
    }
  }
</style>
