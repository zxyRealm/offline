import Sprite from '../object/Sprite'
/**
 * @desc 地图类
 * @params shape 形状
 * @params options 材质对象
 */
class Map {
  constructor() {
    this.loader = new THREE.SVGLoader()
  }

  // 创建几何体
  createGeometry() {
    return new THREE.Geometry()
  }

  // 创建拉伸几何体
  createExtrudeGeometry(shape) {
    return new THREE.ExtrudeBufferGeometry(shape, {
      depth: 5,
      bevelEnabled: true,
      bevelThickness: 1.5,
	    bevelSize: 1,
	    bevelSegments: 5
    })
  }

  // 创建材质
  createMaterial(options) {
    return new THREE.MeshPhongMaterial(options)
  }

  // 创建网格
  createMesh(shape, options, name) {
    let geo = this.createGeometry()
    let extrudeGeo = this.createExtrudeGeometry(shape)
    geo.fromBufferGeometry(extrudeGeo)
    geo.translate(-290, -214, 0)
    let mat = this.createMaterial(options, name)
    let mesh = new THREE.Mesh(geo, mat)
    mesh.name = name
    return mesh
  }

  initTemplate(url, callback, asyncCb = () => {}) {
    this.loader.load(url, data => {
      let paths = data.paths
      paths.forEach(path => {
        let shapes = path.toShapes(true)
        shapes.forEach(shape => {
          callback(path, shape)
        })
      })
      asyncCb(null)
    })
  }

  loadMap(item, group, callback) {
    
    const originPosition = (item.floor - 2) * 120 - 60

    this.initTemplate(item.url, (path, shape) => {
      const options = {
        color: path.color,
        transparent: true,
        opacity: group.position.y > 180 || group.position.y < -180 ? 0 : 1,
        side: THREE.DoubleSide
      }

      let mesh = this.createMesh(shape, options, 'store')
      mesh.rotation.set(0.5 * Math.PI, 0, 0)
      mesh.userData.originPosition = originPosition
      mesh.userData.color = {
        r: mesh.material.color.r,
        g: mesh.material.color.g,
        b: mesh.material.color.b
      }

      group.add(mesh)

    }, callback)
    group.position.y = originPosition
  }

  // board
  loadPlane(item, group, planeList) {
    const originPosition = (item.floor - 2) * 120 - 65
    group.userData.positionY = originPosition
    this.initTemplate('./static/bott.svg', (path, shape) => {
      const options = {
        color: '#1a425e',
        transparent: true,
        // opacity: 0.3
        opacity: group.position.y > 180 || group.position.y < -180 ? 0 : 0.3
      }
      
      let mesh = this.createMesh(shape, options, 'plane')
      mesh.rotation.set(0.5 * Math.PI, 0, 0)
      mesh.position.y = -5
      mesh.userData = {
        originPosition: originPosition,
        groupInfo: item
      }
      planeList.push(mesh)
      group.add(mesh)
      options.opacity ? group.userData.isShow = true : group.userData.isShow = false
    })
  }
  

  // gate sprite
  createGateLogo(logo, group) {
    const sprite = new Sprite()
    const option = {
      opacity: 0
    }
    const scale = new THREE.Vector3(20, 12, 15)
    let mesh = sprite.createPic(logo, scale, option)
    group.add(mesh)
  }

  // text sprite
  createFloorName(name, group) {
    const fontSize = 30
    let sprite = new Sprite()
    let option = {
      opacity: group.position.y > 180 || group.position.y < -180 ? 0 : 1
    }
    let mesh = sprite.createText(name, fontSize, option)
    group.add(mesh)
  }
}

export default Map;