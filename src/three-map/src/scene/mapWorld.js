import MapDom from '../html/MapDom'
import { houseData } from '../data/house'                 // map data
// 3D Object
import Map from '../object/Map'                           // 3D map
import Gate from '../object/Gate'                         // gate
import Raycaster from '../object/Raycaster'               // raycaster
import Bloom from '../object/Bloom'                       // bloom shining
// animate
import TrackFloor from '../animation/trackFloor'          // up & down animate
import TweenFloor from '../animation/tweenFloor'          // change floor
import StateA from '../state/floor'                       // up & down state
// util
import Compile from '../util/Compile'                     // dom compile
import EventEmitter from '../util/event'
const async = require('async')                            // asynchronous
/**
 * Member
 * private: _hello
 * public: hello
 * static: get hello(){}
 */

/**
 * 上帝类，定义社群和首页中的全部方法
 * 
 * @class World
 * @param { Number } mode   场景模式
 * @paramDesc mode          0: 首页, 1: 社群
 */
export default class World {
  constructor(mode) {
    this.mode = mode
    this.clock = new THREE.Clock()
  }

  // 自然环境内的所有成员，允许在任何类中被修改
  get scene() { return this.scene }
  set scene(val) { this.scene = val }

  get camera() { return this.camera }
  set camera(val) { this.camera = val }

  get renderer() { return this.renderer }
  set renderer(val) { this.renderer = val }

  get mainGroup() { return this.mainGroup}
  set mainGroup(val) { this.mainGroup = val }

  get status() { return this.status }
  set status(val) { this.status = val }

  get controls() { return this.controls }
  set controls(val) { this.controls = val }

  get layers() { return this.layers }
  set layers(val) { this.layers = val }

  get time() { return this.time }
  set time(val) { this.time = val }

  // init scene
  init() {

    this.width = window.innerWidth                        // 画布宽
    this.height = window.innerHeight                      // 画布高
    this.container = document.body                        // canvas画布容器
    this.planeList = []                                   // board list for raycaster
    this.spriteList = []                                  // sprite list for raycaster

    // create scene
    World.scene = new THREE.Scene()
    // World.scene.background = new THREE.Color('#AAAAAA')

    // create camera
    const CAM_POS = new THREE.Vector3(500, 400, 1000)
    World.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 1, 10000)
    World.camera.position.set(CAM_POS.x, CAM_POS.y, CAM_POS.z)
    World.camera.userData.position = CAM_POS              // 备份相机初始位置值

    // create renderer
    World.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    })
    World.renderer.setPixelRatio(window.devicePixelRatio)
    World.renderer.setSize(window.innerWidth, window.innerHeight)
    // World.renderer.autoClear = false;
    // World.renderer.toneMapping = THREE.ReinhardToneMapping;
    // gamma矫正，表现出来的效果是光晕的大小，人眼真实感增强
    // World.renderer.gammaInput = true;
    // World.renderer.gammaOutput = true;
    this.container.appendChild(World.renderer.domElement)

    World.mainGroup = new THREE.Group()                   // 商场总分组
    World.layers = new THREE.Layers()
    World.layers.set(0)
    World.status = 'multi'                                // 初始化场景状态

    // 构建环境
    this.createControls()
    this.createLight()
    // this.createShine({x: 0, y: 0, z: 0 })
    this.eventCollection()
    // this.tweenTest()

    // 初始化TweenFloor类 - 切换楼层动画
    this.tweenFloor = new TweenFloor()
    // 出入口类
    this.gate = new Gate()
    
    // 初始化map类 - 每一层中的所有元素
    this.map = new Map()
    this.buildingRise()

    // 闪点通道
    this.bloom = new Bloom()
    this.bloomComposer = this.bloom.setBloomPass()
    this.finalComposer = this.bloom.setFinalPass()
    // setInterval(() => {
      this.bloom.shining({
        x: Math.random() * 400 - 200,
        y: 180,
        z: Math.random() * 200 - 100
      })
    // }, 2000)

    // TrackFloor类 - 上下楼动画
    this.animateFloor = new TrackFloor()
    this.animateFloor.init()

    this.animate()
  }

  tweenTest () {
    let geometry = new THREE.SphereGeometry(10, 32, 32)
    let material = new THREE.MeshBasicMaterial({
      color: '#ff0000'
    })
    let mesh = new THREE.Mesh(geometry, material)
    World.scene.add(mesh)

    let position = {
      x: 1,
      y: 1,
      z: 1
    }
    let target = {
      x: 0.2, 
      y: 0.2,
      z: 0.2
    }
    let tween = new TWEEN.Tween(position).to(target, 2000)
    tween.onUpdate(() => {
      mesh.scale.x = position.x;
      mesh.scale.y = position.y;
      mesh.scale.z = position.z;
    })
    .easing(TWEEN.Easing.Linear.None)
    .start()
  }

  // 创建时间流
  animate() {
    TWEEN.update()

    var delta = this.clock.getDelta();

    if (Bloom.mixer) {
      Bloom.mixer.update( delta );
    }

    if (StateA.up) this.upFloor()
    if (StateA.down) this.downFloor()

    requestAnimationFrame(() => {
      this.animate()
    })
    World.renderer.render(World.scene, World.camera)
    // 渲染闪点
    World.camera.layers.set( 1);
    this.bloomComposer.render();
    World.camera.layers.set( 0 );
    // 渲染整个场景，将覆盖在bloom通道上
    this.finalComposer.render()

    World.controls.update()
  }

  // create mall
  buildingRise() {
    // async：After all the pictures are loaded, the configuration mode method is executed.
    async.each(houseData, (item, cb) => {
      let group = new THREE.Group()                            // create group
      group.name = item.name
      group.userData.floor = item.floor                        // Store the original floor in userdata
      group.userData.dynamicFloor = item.floor                 // Store the dynamic floor：change with up&down animation
      group.userData.name = item.name                          // Store the object-group name

      this.map.loadMap(item, group, cb)
      this.map.loadPlane(item, group, this.planeList)
      this.map.createFloorName(item.name, group)
      if (item.gateArr) {                                      // check in data gateArr
        item.gateArr.forEach(gate => {
          this.map.createGateLogo(gate.logo, group)
        })
      }

      World.mainGroup.add(group)
    }, () => {
      this._modeDiffHandle()
      World.scene.add(World.mainGroup)
    });
  }

  // use as buildRise()
  _modeDiffHandle () {
    // if mode is association, then first scene status is single
    if (this.mode) {
      this.changeFloor(1)
    } 
  }

  // go up - single frame
  upFloor() {
    const high = StateA.count + 3
    const low = StateA.count - 1
    this.animateFloor.up(high, low, World.mainGroup)
  }

  // go down - single frame
  downFloor() {
    const high = StateA.count + 4
    const low = StateA.count
    this.animateFloor.down(high, low, World.mainGroup)
  }

  // switch：s - m
  singleToMulti() {
    this.tweenFloor.singleToMulti()
  }

  // switch: s - s
  singleToSingle(floor) {
    this.tweenFloor.singleToSingle(floor, this.mode)
  }

  // switch: m - s
  multiToSingle(intersect) {
    this.tweenFloor.multiToSingle(intersect, this.mode)
  }

  // switch: to single, 2 position, from multi, from single
  changeFloor(floor) {
    if (World.status === 'multi') {
      this.multiToSingle(floor)
    } else {
      this.singleToSingle(floor)
    }
  }

  // switch: to single, from multi and raycaster
  onDocumentMouseClick(event) {

    let raycaster = new Raycaster(event)
    let rayList = [] // raycaster field
    
    if (World.status === 'multi') {

      rayList = this.planeList.slice(StateA.count, StateA.count + 4)
      raycaster.handleEvent(rayList, (intersects) => {
        this.multiToSingle(intersects[0])
      })

    } else {
      
      let screenAlex = { x: event.clientX, y: event.clientY }
      rayList = this.spriteList
      raycaster.handleEvent(rayList, (intersects) => {

        this.gate.createLevitateBox(screenAlex)

      }, () => {
        
        var box = document.getElementById('device__popper--wrap')
        var boxLeft = box.offsetLeft
        var boxRight = box.offsetWidth + box.offsetLeft
        var boxTop = box.offsetTop
        var boxBottom = box.offsetHeight + box.offsetTop
  
        if (event.clientX < boxLeft ||
          event.clientX > boxRight ||
          event.clientY < boxTop ||
          event.clientY > boxBottom) {
            this.gate.createLevitateBox()
        }
      })
    }
  }

  // create orbit controls
  createControls() {
    World.controls = new THREE.OrbitControls(World.camera, World.renderer.domElement)
    World.controls.enableZoom = true
    World.controls.enableRotate = true
    World.controls.screenSpacePanning = true
    // save the start status of object, then camera animation will know a reference value 
    World.controls.saveState();
  }

  // create light
  createLight() {
    // warm light
    let AmbientLight = new THREE.AmbientLight(0xffffff, 0.2);
    World.scene.add(AmbientLight);
    // sky light
    let light = new THREE.HemisphereLight(0xffffff, 0x000000, 0.9);
    World.scene.add(light);
  }

  createAlex() {
    let axesHelper = new THREE.AxesHelper(100);
    World.scene.add(axesHelper);
  }

  eventCollection() {
    const upfloorEl2 = document.getElementById('button-ul')
    if (this.mode === 0) {
      const upfloorEl = upfloorEl2.childNodes[5]
      const downfloorEl = upfloorEl2.childNodes[7]
      const allEl = document.getElementById('all')
      upfloorEl.addEventListener('click', () => {
        this.animateFloor.beforeUp()
      }, false)
      
      downfloorEl.addEventListener('click', () => {
        this.animateFloor.beforeDown()
      }, false)
      
      allEl.addEventListener('click', () => {
        this.singleToMulti()
      }, false)

      
    } else {
      const gateEl = document.getElementById('gate-group')
      gateEl.addEventListener('click', (e) => {
        this.gate.createGate(gateEl, e, this.spriteList)
      }, false)
    }
    
    
    const floor = document.getElementById('floor')
    

    window.addEventListener('mousedown', () => {
      this.onDocumentMouseClick(event)
    }, false)
    
    floor.addEventListener('click', (e) => {
      if (e.target && e.target.nodeName.toUpperCase() === 'A') {
        this.changeFloor(parseInt(e.target.innerHTML))
      }
    }, false)
    
    
  }

  // compile dom 
  domCompile() {
    // const root = document.querySelector('#app')
    // const data = {
    //   mode: this.mode,
    //   floorList: [{ name: 1 }, { name: 2 }, { name: 3 }, { name: 4 }, { name: 5 }]
    // }
    // new Compile(root, data);
  }
}

const floorList = [ 
  { name: 1 },
  { name: 2 },
  { name: 3 },
  { name: 4 },
  { name: 5 }
]
new MapDom(0, floorList)

var world = new World(0)
world.init()