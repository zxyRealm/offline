<template>
  <div class="three__map--wrap" style="height: 100%">
    <div :id="id" class="three-wrap">
    </div>
    <ul class="three__floor--wrap">
      <li
        class="three__floor--item"
        v-for="(item, $index) in floorList"
        :class="{active: item.active}"
        :key="$index">{{IntToFloor(item.floor)}}</li>
    </ul>
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
import Mixins from '@/utils/mixins'
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
  mixins: [Mixins],
  props: {
    id: {
      type: String,
      default: 'build-3d'
    },
    pd: {
      type: Number,
      default: 0
    },
    floor: {
      type: [Array],
      default: () => []
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
      copy32Array: '',
      totalMesh: [], // 全部mesh(包括sprite)
      currentFloor: '' // 当前楼层信息
    }
  },
  created () {
  },
  mounted () {
    this.initScene()
  },
  computed: {
    floorList: {
      get () {
        let List = this.floor[0].subGroupSon || []
        if (!this.currentFloor) {
          List.map(item => {
            if (item.floor === 1) {
              this.$set(item, 'active', true)
            }
            return item
          })
          this.currentFloor = List.filter(item => item.floor === 1)[0]
        }
        return List
      },
      set (val) {
        this.floorList = val
      }
    }
  },
  methods: {
    /* 初始化创建场景
    * @params eid 外部容器id
    * @params pd 左右padding总距离值
    * @params floor 渲染的楼层
    * */
    initScene () {
      this.container = document.getElementById(this.id)
      this.renderer = new THREE.WebGLRenderer({antialias: true, alpha: true})
      this.renderer.setPixelRatio(window.devicePixelRatio)
      this.renderer.setClearColor(0xeeeeee)
      this.renderer.setSize(this.container.clientWidth - this.pd, this.container.clientHeight)
      this.scene = new THREE.Scene()
      this.scene.background = new THREE.Color(0x17151A)
      this.camera = new THREE.PerspectiveCamera(56, (this.container.clientWidth - this.pd) / this.container.clientHeight, 1, 5000)
      this.camera.position.set(0, 0, 450)
      this.scene.add(this.camera)
      this.group = new THREE.Group()
      this.scene.add(this.group)
      // 通过svg文件构画出分布图
      this.loadSvg()
      this.raycaster = new THREE.Raycaster()
      // 轨道控制器
      this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement)
      this.controls.enableRotate = false
      // this.controls.enablePan = false
      this.animate()
      // this.renderer.render(this.scene, this.camera)
      // 窗口变化时重置模型尺寸和摄像头视角比例
      this.container.appendChild(this.renderer.domElement)
      // window.addEventListener('mousemove', this.onDocumentMouseMove, false)
      window.addEventListener('click', this.onDocumentMouseClick, false)
      window.addEventListener('resize', this.onWindowResize, false)
    },
    // 渲染svg地图模型
    loadSvg (url) {
      let svgLoader = new THREE.SVGLoader()
      url = url || this.currentFloor.mapUrl
      svgLoader.load(url, (paths) => {
        this.group.position.x = -290
        this.group.position.y = 214
        this.group.scale.set(1, -1, 1)
        for (let i = 0; i < paths.length; i++) {
          let path = paths[i]
          let materialLine = new THREE.LineBasicMaterial({
            color: new THREE.Color('#403E42'),
            side: THREE.DoubleSide,
            depthWrite: false
          })
          let shapes = path.toShapes(true)
          for (let j = 0; j < shapes.length; j++) {
            let shape = shapes[j]
            let geometry = new THREE.ShapeBufferGeometry(shape)
            let mesh = new THREE.Mesh(geometry, materialLine)
            let edges = new THREE.EdgesHelper(mesh, '#979797')
            this.group.add(edges)
            mesh.name = i
            if (i !== 0) this.meshList.push(mesh)
            this.group.add(mesh)
          }
        }
      })
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
    onDocumentMouseClick (event, i) {
      event.preventDefault()
      this.$set(this.mouse, 'x', (event.offsetX / (this.container.clientWidth - this.pd)) * 2 - 1)
      this.$set(this.mouse, 'y', -(event.offsetY / this.container.clientHeight) * 2 + 1)
      this.raycaster.setFromCamera(this.mouse, this.camera)
      let intersects = this.raycaster.intersectObjects(this.meshList)
      if (intersects.length > 0) {
        if (this.INTERSECTED !== intersects[ 0 ].object) {
          if (this.INTERSECTED) this.INTERSECTED.material.color.setHex(this.INTERSECTED.currentHex)
          this.INTERSECTED = intersects[ 0 ].object
          this.INTERSECTED.currentHex = this.INTERSECTED.material.color.getHex()
          this.INTERSECTED.material.color.setHex(0xff0000)
          this.$emit('handle-block-click', intersects[ 0 ].object)
        }
      } else {
        if (this.INTERSECTED) this.INTERSECTED.material.color.setHex(this.INTERSECTED.currentHex)
        this.INTERSECTED = null
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
      let intersects = this.raycaster.intersectObjects(this.meshList)
      // if (intersects.length > 0) {
      //   if (this.INTERSECTED !== intersects[ 0 ].object) {
      //     if (this.INTERSECTED) this.INTERSECTED.material.color.setHex(this.INTERSECTED.currentHex)
      //     this.INTERSECTED = intersects[ 0 ].object
      //     this.INTERSECTED.currentHex = this.INTERSECTED.material.color.getHex()
      //     this.INTERSECTED.material.color.setHex(0xff0000)
      //   }
      // } else {
      //   if (this.INTERSECTED) this.INTERSECTED.material.color.setHex(this.INTERSECTED.currentHex)
      //   this.INTERSECTED = null
      // }
      this.renderer.render(this.scene, this.camera)
    },
    // 销毁three.js 模型实例
    disposeTotal () {
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
    },
    // 改变楼层展示
    changeFloor (int) {
      this.currentFloor = this.floorList.filter(item => item.floor === int)[0]
      this.floorList.map(item => {
        if (this.currentFloor.id === item.id) {
          this.$set(item, 'active', true)
        } else {
          this.$set(item, 'active', false)
        }
        return item
      })
      this.loadSvg(this.currentFloor.mapUrl)
    }
  },
  watch: {},
  beforeDestroy () {
    document.removeEventListener('resize', this.onWindowResize)
    document.removeEventListener('click', this.onDocumentMouseDown)
    if (this.renderer) {
      this.disposeTotal(this.scene)
      this.scene.remove(this.scene.children)
      this.renderer.dispose()
    }
  }
}
</script>

<style lang="scss" scoped>
  .three__map--wrap{
    position: relative;
  }
  .three__floor--wrap{
    position: absolute;
    width: 30px;
    top: 45%;
    left: 10px;
    transform: translateY(-50%);
    .three__floor--item{
      height: 30px;
      line-height: 30px;
      margin-bottom: 2px;
      text-align: center;
      background: rgba(15, 14, 17, 0.7);
      color: #fff;
      &:last-child{
        margin-bottom: 0;
      }
      &.active{
        background: rgba(28, 56, 108, 0.7);
      }
    }
  }
  .three-wrap {
    height: 100%;
    position: relative;
    canvas {
      width: 100%;
      height: 100%;
    }
  }
</style>
