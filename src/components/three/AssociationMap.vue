<template>
  <div class="association-map" id="associationMap">
    <div class="flat">
      <div id="image1">
        <img src="/static/floor/qizi2.png" alt="">
        <span>主出入口</span>
      </div>
      <div id="image2">
        <img src="/static/floor/qizi1.png" alt="">
        <span>其他出入口</span>
      </div>
    </div>
    <div id="WebGL-output"></div>
    <div class="levitaten" id="levitaten">
      <div class="title">
        <div class="pull-left">{{deviceInfo.title}}</div>
        <div class="pull-right">
          <i class="el-icon-edit" @click="editGateway" style="color: #0F9EE9; cursor: pointer;"></i>
          <i class="el-icon-delete" @click="deleteGateway" style="color: #FF6660; cursor: pointer;"></i>
        </div>
      </div>
      <el-scrollbar class="device-list">
        <ul>
          <li v-for="(item, index) in deviceInfo.list" :key="index">
            <img src="/static/floor/camera1.png" width="11">
            <span>{{item.device}}</span>
            <i class="el-icon-close" @click="deleteDevice(item)"></i>
          </li>
        </ul>
      </el-scrollbar>
      <div class="add-button">
        <a href="javascript:;" @click="addDevice">添加设备</a>
      </div>
    </div>
    <div class="amount">
      <div class="gateway">
        <div class="title">出入口数量</div>
        <div class="count">5</div>
      </div>
      <div class="camera">
        <div class="title">摄像头数量</div>
        <div class="count">10</div>
      </div>
    </div>
  </div>
</template>

<script>
import * as THREE from 'three'
require('three/examples/js/controls/OrbitControls')
require('three/examples/js/loaders/SVGLoader')
export default {
  name: 'association-map',
  data () {
    return {
      renderer: null,
      scene: null,
      camera: null,
      group: null,
      axesHelper: null,
      textList: [],
      spriteList: [],
      deviceInfo: {
        list: [
          {device: '北门1', id: '1'},
          {device: '北门2', id: '2'},
          {device: '北门3', id: '3'}
        ],
        title: '北门'
      },
      gateway: [
        {text: '北门', position: {x: -8, y: 36}, flat: 'qizi1'},
        {text: '南门', position: {x: 81, y: 31}, flat: 'qizi2'},
        {text: '西门', position: {x: -113, y: 11}, flat: 'qizi1'}
      ],
      width: null,
      height: null,
      offsetLeft: null,
      offsetTop: null
    }
  },
  methods: {
    init () {
      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      this.renderer.setSize(this.width, this.height)
      this.renderer.setClearColor('#ffffff', 1.0)
      this.scene = new THREE.Scene()
      this.scene.background = new THREE.Color('#232027')
      this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 1, 1000)
      this.camera.position.set(0, 0, 250)
      this.scene.add(this.camera)

      this.group = new THREE.Group()
      this.scene.add(this.group)
      this.loadSvg()

      document.getElementById('WebGL-output').appendChild(this.renderer.domElement)
      window.addEventListener('mousedown', this.onDocumentMouseClick, false)
      window.addEventListener('resize', this.onWindowResize, false)
    },
    initGateway () {
      for (let i in this.gateway) {
        this.createSprite(this.gateway[i])
      }
    },
    loadSvg () {
      let svgLoad = new THREE.SVGLoader()
      svgLoad.load('/static/floor/floorF1.svg', (paths) => {
        this.group.position.x = -290 * 0.4
        this.group.position.y = 214 * 0.4
        this.group.scale.set(0.4, -0.4, 0.4)
        let materials = []
        for (let i = 0; i < paths.length; i++) {
          if (i === 0) continue
          let path = paths[i]
          let materialLine = new THREE.LineBasicMaterial({
            color: new THREE.Color('#403E42'),
            side: THREE.DoubleSide,
            depthWrite: false
          })

          let shapes = path.toShapes(true)
          materials.push(materialLine)
          for (let j = 0; j < shapes.length; j++) {
            let shape = shapes[j]
            let geometry = new THREE.ShapeBufferGeometry(shape)
            let mesh = new THREE.Mesh(geometry, materialLine)

            let edges = new THREE.EdgesHelper(mesh, '#979797')
            edges.material.linewidth = 1
            this.group.add(edges)
            this.group.add(mesh)
          }
        }
      })
    },
    initMouseEvent () {
      let body = document.getElementsByTagName('body')[0]
      let imge1 = document.getElementById('image1')
      let imge2 = document.getElementById('image2')
      imge2.onmousedown = (event) => {
        let box = document.createElement('img')
        box.src = '/static/floor/qizi1.png'
        box.style.width = '10px'
        box.style.position = 'absolute'
        let divX = event.clientX - imge2.children[0].offsetWidth / 2
        let divY = event.clientY - imge2.children[0].offsetHeight / 2
        box.style.left = divX + 'px'
        box.style.top = divY + 'px'
        body.appendChild(box)

        document.onmousemove = (event) => {
          event = event || window.event
          let divX = event.clientX - imge2.children[0].offsetWidth / 2
          let divY = event.clientY - imge2.children[0].offsetHeight / 2
          box.style.left = divX + 'px'
          box.style.top = divY + 'px'
        }

        box.onmousedown = (event) => {
          event = event || window.event
          document.onmousemove = null
          body.removeChild(box)
          let newScreen = this.screenToWorld({x: event.clientX, y: event.clientY})
          // todo：模态框
          this.$emit('addGateway', newScreen, 'qizi1')
        }
      }
      imge1.onmousedown = (event) => {
        let box = document.createElement('img')
        box.style.width = '10px'
        box.src = '/static/floor/qizi2.png'
        box.style.position = 'absolute'
        let divX = event.clientX - imge1.children[0].offsetWidth / 2
        let divY = event.clientY - imge1.children[0].offsetHeight / 2
        box.style.left = divX + 'px'
        box.style.top = divY + 'px'
        body.appendChild(box)

        document.onmousemove = (event) => {
          event = event || window.event
          // console.log(event.clientX)
          let divX = event.clientX - imge1.children[0].offsetWidth / 2
          let divY = event.clientY - imge1.children[0].offsetHeight / 2
          box.style.left = divX + 'px'
          box.style.top = divY + 'px'
        }

        box.onmousedown = (event) => {
          event = event || window.event
          document.onmousemove = null
          body.removeChild(box)
          let newScreen = this.screenToWorld({x: event.clientX, y: event.clientY})
          // todo：模态框
          this.$emit('addGateway', newScreen, 'qizi2')
        }
      }
    },
    // 屏幕坐标转世界坐标
    screenToWorld (screenPoint) {
      this.offsetLeft = document.getElementById('associationMap').offsetLeft
      this.offsetTop = document.getElementById('associationMap').offsetTop
      // 获取屏幕坐标投影在相机上的x和y轴的值
      let pX = ((screenPoint.x - this.offsetLeft) / this.width) * 2 - 1
      let pY = -((screenPoint.y - this.offsetTop) / this.height) * 2 + 1
      // let p = new THREE.Vector3(pX, pY, -1).unproject(this.camera);
      // 设置二维向量
      // let p2 = new THREE.Vector2(pX, pY);
      // 获取z轴深度 即视距
      let zd = this.camera.position.z
      // 获取相机角度 (180-45)/2
      let za = 67.5 * Math.PI / 180
      // 获取世界坐标中的x轴边界
      let bx = (zd / Math.tan(za)) * (this.width / this.height)
      // 获取世界坐标中的y轴边界
      let by = zd / Math.tan(za)
      // 获取世界坐标中x轴的实际坐标点
      let sx = pX * bx
      // 获取世界坐标中y轴的实际坐标点
      let sy = pY * by
      // console.log(sx, sy)
      return {x: sx, y: sy}
    },
    onDocumentMouseClick (event) {
      if (document.getElementById('associationMap')) {
        this.offsetLeft = document.getElementById('associationMap').offsetLeft
        this.offsetTop = document.getElementById('associationMap').offsetTop
        let mouse = {
          x: ((event.clientX - this.offsetLeft) / (this.width)) * 2 - 1,
          y: -((event.clientY - this.offsetTop) / this.height) * 2 + 1
        }
        let screenAlex = {
          x: event.clientX - this.offsetLeft,
          y: event.clientY - this.offsetTop
        }
        let raycaster = new THREE.Raycaster()
        raycaster.setFromCamera(mouse, this.camera)
        let intersects = raycaster.intersectObjects(this.spriteList)
        if (intersects.length > 0) {
          this.createLevitatenBox(screenAlex)
        } else {
          let box = document.getElementById('levitaten')
          let boxLeft = box.offsetLeft
          let boxRight = box.offsetWidth + box.offsetLeft
          let boxTop = box.offsetTop
          let boxBottom = box.offsetHeight + box.offsetTop

          if (event.clientX - this.offsetLeft < boxLeft ||
            event.clientX - this.offsetLeft > boxRight ||
            event.clientY - this.offsetTop < boxTop ||
            event.clientY - this.offsetTop > boxBottom) { this.createLevitatenBox() }
        }
      }
    },
    onWindowResize () {
      if (document.getElementById('associationMap')) {
        this.width = document.getElementById('associationMap').clientWidth
        this.height = document.getElementById('associationMap').clientHeight
        this.camera.aspect = this.width / this.height
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(this.width, this.height)
      }
    },
    // 创建悬浮盒子
    createLevitatenBox (screenAlex) {
      let levitaten = document.getElementById('levitaten')
      if (screenAlex) {
        levitaten.style.top = screenAlex.y - 172 + 'px'
        levitaten.style.left = screenAlex.x - 100 + 'px'
        levitaten.style.display = 'block'
      } else {
        levitaten.style.display = 'none'
      }
    },
    // 创建文字和图片贴纸
    createSprite (obj) {
      // 创建图片
      let sprite = this.createPictureSprite(obj)
      sprite.scale.set(6, 8, 6)
      sprite.position.set(obj.position.x, obj.position.y, 1)
      this.scene.add(sprite)

      // 创建文字
      let textObj = this.createTextSprite(obj)
      textObj.scale.set(0.75 * 17, 0.25 * 25, 100)
      textObj.position.set(obj.position.x + 2.7, obj.position.y + 6, 1)
      this.scene.add(textObj)

      // 文字贴图的参数传递到图片贴图的userData中
      sprite.userData = { text: obj.text }

      // 将文字保存到数组中
      this.textList.push(textObj)
      // 将图片贴图保存到数组中
      this.spriteList.push(sprite)
    },
    // 创建图片贴纸
    createPictureSprite (obj) {
      let spriteMaterial = new THREE.SpriteMaterial({
        map: new THREE.ImageUtils.loadTexture('/static/floor/' + obj.flat + '.png'),
        depthTest: false,
        blending: THREE.AdditiveBlending
      })
      let sprite = new THREE.Sprite(spriteMaterial)
      return sprite
    },
    // 创建文字贴纸
    createTextSprite (obj) {
      let canvas = document.createElement('canvas')
      let ctx = canvas.getContext('2d')
      ctx.fillStyle = '#ffffff'
      ctx.font = 'Normal 110px Arial'
      ctx.lineWidth = 4
      ctx.fillText(obj.text, 4, 104)
      let texture = new THREE.Texture(canvas)
      texture.needsUpdate = true
      // 使用Sprite显示文字
      let material = new THREE.SpriteMaterial({map: texture, transparent: true})
      let textObj = new THREE.Sprite(material)
      return textObj
    },
    // 添加设备
    addDevice () {
      this.$emit('addDevice', this.deviceInfo)
    },
    deleteDevice (deviceItem) {
      this.$emit('deleteDevice', deviceItem)
    },
    // 编辑出入口
    editGateway () {
      this.$emit('editGateway', this.deviceInfo.title)
    },
    // 删除出入口
    deleteGateway () {
      this.$emit('deleteGateway', this.deviceInfo.title)
    },
    // 获取设备列表
    getDevice (deviceInfo) {
      this.deviceInfo = deviceInfo
    },
    // 动画循环
    animate () {
      requestAnimationFrame(this.animate)
      this.renderer.render(this.scene, this.camera)
    }
  },
  mounted () {
    this.width = document.getElementById('associationMap').clientWidth
    this.height = document.getElementById('associationMap').clientHeight
    this.offsetLeft = document.getElementById('associationMap').offsetLeft
    this.offsetTop = document.getElementById('associationMap').offsetTop
    this.init()
    this.initGateway()
    this.animate()
    this.initMouseEvent()
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.onWindowResize)
    window.removeEventListener('click', this.onDocumentMouseClick)
  }
}
</script>

<style lang="scss" scoped>
  .association-map{
    height: 100%;
    background: rgba(64,58,73,0.30);
    position: relative;
  }
  .flat{
    position: absolute;
    top: 30px;
    right: 24px;
    user-select: none;
    div{
      cursor: pointer;
      margin-bottom: 5px;
      img {
        width: 10px;
        top: 3px;
        position: relative;
      }
      span{
        font-size: 12px;
        color: #0f9ce7;
      }
    }
  }
  .levitaten{
    width: 114px;
    height: 140px;
    /*color: #235cc2;*/
    background-color: rgba(35, 92, 194, 0.3);
    position: absolute;
    top: 30px;
    left: 30px;
    padding: 5px;
    font-size: 12px;
    box-sizing: border-box;
    display: none;
    /*transition: all linear 500ms;*/
    .title{
      padding: 3px 5px;
      color: #ffffff;
      overflow: hidden;
      border-bottom: 1px dashed #979797;
    }
    .device-list{
      height: 85px;
      overflow: hidden;
      ul{
        margin: 0;
        padding: 4px 2px 0;
        text-decoration: none;
        color: #ffffff;
      }
      li{
        height: 27px;
        line-height: 27px;
        list-style: none;
        position: relative;
        span{
          top: -3px;
          margin-left: 5px;
          position: absolute;
        }
        i{
          position: absolute;
          cursor: pointer;
          right: 0;
          top: 7px;
          color: rgba(255, 255, 255, 0.3);
        }
      }
    }
    .add-button > a{
      margin-left: 14px;
      color: #0f9ee9;
      text-decoration: none;
    }
    &:before {
      content: '';
      position: absolute;
      top: 140px;
      left: 50%;
      background: rgba(255, 255, 255, 0.5);
      width: 1px;
      height: 30px;
    }
    &:after {
      content: '';
      position: absolute;
      top: 170px;
      left: 50%;
      background: #ffffff;
      background: rgba(255, 255, 255, 0.5);
      width: 30px;
      height: 1px;
    }
  }
  .pull-left{
    float: left;
  }
  .pull-right{
    float: right;
  }
  .amount{
    position: absolute;
    top: 144px;
    right: 50px;
    user-select: none;
    .gateway, .count{
      margin-bottom: 40px;
      text-align: center;
    }
    .title{
      font-size: 12px;
      color: rgba(255, 255, 255, 0.5);
      margin-bottom: 4px;
    }
    .count{
      font-size: 24px;
      color: #ffffff;
    }
  }
</style>
