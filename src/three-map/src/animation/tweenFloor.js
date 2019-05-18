import World from '../scene/mapWorld'

/**
 * change single and multi by some tween, and bind some status at group's userData
 * 
 * @class
 * @param { Number } mode   scene mode
 * @paramDesc mode          0: home, 1: association
 */
class TweenFloor {
  constructor () {
    this.options = this._getTweenValue()
  }

  // only home
  singleToMulti () {
    World.mainGroup.children.forEach(group => {
      if (group.visible) {

        let position = Object.assign(this.options.cameraCurrent, { cy: group.position.y })
        let target = Object.assign(this.options.cameraOrigin, { cy: group.userData.positionY })
        
        group.children.forEach((mesh) => {
          if (mesh.name === 'store') {
            this.options.setColor(mesh, mesh.userData.color)
          } else if(mesh.name === 'flag') {
            this.options.setOpacity(mesh, 0)
          }
        })

        this._sport(position, target, group, ()=>{
          World.controls.target.copy(World.scene.position)
          World.mainGroup.userData.active = 0
          World.status = 'multi'
        })
      }

      if (group.userData.isShow){
        group.visible = true
      }
    })
  }

  multiToSingle (intersect, mode) {
    
    let key, value
    let color = { r: 0.59, g: 0.59, b: 0.59 }
    
    // two way to single : click button, click board
    if (typeof intersect === 'object') {
      key = 'name'
      value = intersect.object.parent.name
    } else {
      key = 'floor'
      value = intersect
    }
    
    World.mainGroup.children.forEach(group => {
      if (group.userData[key] !== value) {
        group.visible = false
      } else {
        // this means that when 'single status', mainGroup needs to record which floor is visible.
        World.mainGroup.userData.visible = value - 1
        // correct controls: drag the scene will make camera's perspective unstable
        // so we must reset and update by ourselves
        World.controls.reset()
        World.controls.update()
        World.controls.target.copy(World.scene.position)
        World.status = 'single'

        group.children.forEach(mesh => {
          if (mesh.name === 'store') {
            this.options.setColor(mesh, color)
          }
          if (mesh.name === 'plane') {
            this.options.setOpacity(mesh, 0.3)
          } else {
            this.options.setOpacity(mesh, 1)
          }
        })
        
        // judge mode: if association, no animation; if home, tween animation
        // association, there is no angle, u can see the scene as a plane, so y is 800
        if (mode) {
          World.camera.position.set(0, 800, 0)
          group.position.y = 200
        } else {
          let position = Object.assign(this.options.cameraCurrent, { cy: group.position.y })
          let target = Object.assign(this.options.cameraSport, { cy: 200 })
          this._sport(position, target, group)
        }

      }
    })
  }

  singleToSingle (floor) {
    
    let color = { r: 0.59, g: 0.59, b: 0.59 }

    World.controls.target.copy(World.scene.position)
    World.status = 'single'

    World.mainGroup.children.forEach((group, val) => {
      
      if (group.visible) {
        group.visible = false
        group.position.y = group.userData.positionY
        group.children.forEach(mesh => {
          if (mesh.name === 'store') {
            this.options.setColor(mesh, mesh.userData.color)
          } else if(mesh.name === 'flag') {
            this.options.setOpacity(mesh, 0)
          }
        })
      }

      if (group.userData.floor === floor) {
        World.mainGroup.userData.visible = val
        group.visible = true
        group.position.y = 200;
        group.children.forEach(mesh => {
          if (mesh.name === 'store') {
            this.options.setColor(mesh, color)
          }
          if (mesh.name === 'plane') {
            this.options.setOpacity(mesh, 0.3)
          } else {
            this.options.setOpacity(mesh, 1)
          }
        })
      }

    })

  }
  
  // set origin position value
  _getTweenValue () {
    return {
      cameraCurrent: {
        x: World.camera.position.x,
        y: World.camera.position.y,
        z: World.camera.position.z
      },
      cameraOrigin: {
        x: World.camera.userData.position.x,
        y: World.camera.userData.position.y,
        z: World.camera.userData.position.z
      },
      cameraSport: {
        x: World.camera.position.x - 500,
        y: World.camera.position.y + 400,
        z: World.camera.position.z - 850
      },
      cameraSportX: {
        x: World.camera.position.x - 500,
        y: World.camera.position.y + 400,
        z: World.camera.position.z - 1000
      },
      setColor: (mesh, color) => {
        mesh.material.color.r = color.r
        mesh.material.color.g = color.g
        mesh.material.color.b = color.b
      },
      setOpacity: (mesh, opacity) => {
        mesh.material.opacity = opacity
      }
    }
  }

  _sport (position, target, group, complete = ()=>{}) {
    let tween = new TWEEN.Tween(position).to(target, 2000)
    tween.onUpdate(() => {
      World.camera.position.x = position.x;
      World.camera.position.y = position.y;
      World.camera.position.z = position.z;
      group.position.y = position.cy;
      World.camera.lookAt(new THREE.Vector3(0, 0, 0));
    })
    .onComplete(() => {
      complete()
    })
    .easing(TWEEN.Easing.Linear.None)
    .start()
  }
}

export default TweenFloor