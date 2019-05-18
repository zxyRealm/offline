import World from '../scene/mapWorld'
import { ScreenToWorld } from '../util/TransformAlex'
import Sprite from '../object/Sprite';                    // sprite
class Gate {
  constructor() {}
  
  /**
   * handle drag and click down event, and picture will transform to sprite
   * 
   * @param { domElement } el     parent element
   * @param { event } e           window event
   */
  createGate (el, e, spriteList) {
    if (e.target && (e.target.nodeName.toUpperCase() === 'IMG')) {
      // get img src
      let src = e.target.src.split('/').pop()
      // gateEl -> div -> img
      let img = el.children[0].children[0]
      let box = document.createElement('img')
      // picture will position at the mouse center
      let divX = event.clientX - img.offsetWidth / 2
      let divY = event.clientY - img.offsetHeight / 2
      
      box.src = `./static/${src}`
      box.style.width = '20px'
      box.style.position = 'absolute'
      box.style.left = divX + 'px'
      box.style.top = divY + 'px'
      document.body.appendChild(box)
      
      // when mouse move, gate picture please follow my hand
      document.onmousemove = function (event) {
        event = event || window.event
        let divX = event.clientX - img.offsetWidth / 2
        let divY = event.clientY - img.offsetHeight / 2
        box.style.left = divX + 'px'
        box.style.top = divY + 'px'
      }

      // when mouse click, gate picture please breaking the dimension
      box.onmousedown = function (event) {
        event = event || window.event
        document.onmousemove = null
        document.body.removeChild(box)
        let newScreen = ScreenToWorld({x: event.clientX, y: event.clientY})
        
        // create gate sprite
        let sprite = new Sprite()
        let scale = new THREE.Vector3(12, 7, 8)
        let mesh = sprite.createPic(box.src, scale)
        mesh.position.x = newScreen.x
        mesh.position.y = 10
        mesh.position.z = -newScreen.y
        
        World.mainGroup.children[World.mainGroup.userData.visible].add(mesh)
        spriteList.push(mesh)
        // todo: text

      }
    }
  }

  createLevitateBox (screenAlex) {
    var levitaten = document.getElementById('device__popper--wrap')
    if (screenAlex) {
      var hl = document.getElementsByClassName('horizontal-line')[0]
      var line = document.getElementsByClassName('add-button')[0]
      line.setAttribute('data-visible', false)
      hl.style.width = '0px'
      // if (!communityData.self) {
      //   document.getElementsByClassName('pull-right')[0].style.display = 'none'
      //   document.getElementsByClassName('pull-left')[0].style.marginRight = '0px'
      //   line.innerHTML = ''
      // }
      var wy = screenAlex.y - 172
      var wx = screenAlex.x - 100
      if (wx < 0 ) {
        wx = 0
      }
      if (wy < 0) {
        if ((wx + 114> screenAlex.x) && 150 > screenAlex.y) {
          hl.style.top = screenAlex.y + 'px'
          hl.style.right = -24 + 'px'
          hl.style.width = 22 + 'px'
          line.setAttribute('data-visible', true)
          wx -= 44
        }
        wy = 0
      }
      levitaten.style.top = wy + 'px'
      levitaten.style.left = wx + 'px'
      levitaten.style.display = 'block'
    } else {
      levitaten.style.display = 'none'
    }
  }
}
export default Gate