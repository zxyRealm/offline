import World from '../scene/mapWorld'
import StateA from '../state/Floor'
class TrackFloor {

  constructor () {}

  init () {
    this.stateA = new StateA(World.mainGroup)
    this.stateA.init()

    this.floorHeight = 120
    this.upHeight = 0
    this.downHeight = this.floorHeight
    // position frame speed
    this.positionSpeed = 2
    // opacity frame speed
    this.opacitySpeed = 0.3 * this.positionSpeed / this.floorHeight
    // shop opacity frame speed
    this.opacitySpeed2 = 1 * this.positionSpeed / this.floorHeight
  }

  down (high, low, group) {

    this.downHeight -= this.positionSpeed
    group.position.y -= this.positionSpeed
    group.children[low].userData.isShow = false
    group.children[high].userData.isShow = true
    group.children[high].visible = true
    
    group.children[low].children.forEach(item => {
      if (item.name === 'plane') {
        item.material.opacity -= this.opacitySpeed
      } else {
        item.material.opacity -= this.opacitySpeed2
      }
    })
    
    group.children[high].children.forEach(item => {
      if (item.name === 'plane') {
        item.material.opacity += this.opacitySpeed
      } else {
        item.material.opacity += this.opacitySpeed2
      }
    })
    
    // Complete
    if (this.downHeight <= 0) {
      this.downHeight = this.floorHeight // reset height
      this.stateA.downEnd()
    }
  }

  beforeUp () {
    this.stateA.upBegin()
  }

  beforeDown () {
    this.stateA.downBegin()
  }

  up (high, low, group) {
    this.upHeight += this.positionSpeed
    group.position.y += this.positionSpeed
    group.children[high].userData.isShow = false
    group.children[low].userData.isShow = true
    group.children[low].visible = true
    
    group.children[low].children.forEach(item => {
      if (item.name === 'plane') {
        item.material.opacity += this.opacitySpeed
      } else {
        item.material.opacity += this.opacitySpeed2
      }
    })
    
    group.children[high].children.forEach(item => {
      if (item.name === 'plane') {
        item.material.opacity -= this.opacitySpeed
      } else {
        item.material.opacity -= this.opacitySpeed2
      }
    })
    if (this.upHeight >= this.floorHeight) {
      this.upHeight = 0
      this.stateA.upEnd()
    }
  }
}
export default TrackFloor
