/**
 * Create all kinds of Sprite
 * 
 * @class                     Sprite
 * @constructor               init variable
 */
class Sprite {
  
  constructor () {}

  /**
    * create text sprite
    * 
    * @param { String } text             text will be filled
    * @param { Number } fontSize         font size
    * @param { Object } extraOption      some extra material option
    * @return { Object }                 sprite mesh
    */
  createText (text, fontSize, extraOption) {
    const depth = 1000                                // camera depth
    const scale = depth * ((1 / 50) * fontSize)       // canvas scale ratio
    // create a canvas
    let canvas = document.createElement('canvas')
    canvas.height = canvas.width = fontSize * 32

    let ctx = canvas.getContext('2d')
    ctx.fillStyle = '#ffffff'
    ctx.font = fontSize + "px '微软雅黑'"
    ctx.fillText(text, canvas.width / 2, canvas.height / 2)

    // create texture
    let texture = new THREE.Texture(canvas)
    texture.needsUpdate = true  // texture matrix can be manual update

    // create text sprite object
    let option = Object.assign({
      map: texture,
      transparent: true, 
      depthTest: false,
    }, extraOption)
    let sprite = this._createSprite(option)
    
    sprite.name = 'text'
    sprite.scale.set(scale, scale, scale)
    sprite.position.set(-291, 10, 0)
    return sprite
  }

  /**
    * create text sprite
    * 
    * @param { String } picUrl             pictrue will be load
    * @param { Object } extraOption        some extra material option
    * @return { Object }                   sprite mesh
    */
  createPic (picUrl, scale, extraOption) {
    if (!extraOption) {
      extraOption = {opacity: 1}
    }
    let option = Object.assign({
      map: new THREE.TextureLoader().load(picUrl),
      transparent: true, 
      depthTest: false
    }, extraOption)
    let sprite = this._createSprite(option)
    
    sprite.name = 'flag'
    sprite.scale.set(scale.x, scale.y, scale.z)
    sprite.position.set(0, 10, 0)
    
    return sprite
  }

  /**
    * create general sprite
    * 
    * @param { Object } obj              material Option
    * @return { 3dObject }               material Object
    */
  _createSprite (obj) {
    let material = new THREE.SpriteMaterial(obj)
    let sprite = new THREE.Sprite(material)
    return sprite
  }
}

export default Sprite