// 动画参数板
const TRANSFER_BOARD = {
  HALFROTATE: 0.5 * Math.PI,
  ARROWROTATE: 0.5 * Math.PI,
  ORIGIN_NONE_X: 0,                   // 隐藏楼层的初始偏转角
  ORIGIN_PLAY_X: 0.08 * Math.PI,      // 显示楼层的初始偏转角
  ORIGIN_Y: 0,                        // 隐藏楼层和显示楼层的共同初始Y偏转角
  ROTATE_X: -0.03 * Math.PI,          // 过渡偏转角
  ROTATE_Y: -0.04 * Math.PI,          // 过渡偏转角
  HIGH_POS: 250,                      // 最高点
  PASS_HIGH_POS: 110,                 // 过渡点
  MIDDLE_POS: 0,                      // 显示区
  PASS_LOW_POS: -70,                  // 过渡点
  LOW_POS: -210,                      // 最低点
  OPACITY_BLOCK: 1,                   // 完全显示
  OPACITY_NONE: 0                     // 完全隐藏
}
class World {
  constructor() {}

  // Variables in the environment that are allowed to be modified in anywhere
  get scene() {
    return this.scene
  } // scene
  set scene(val) {
    this.scene = val
  }

  get camera() {
    return this.camera
  } // camera
  set camera(val) {
    this.camera = val
  }

  get renderer() {
    return this.renderer
  } // renderer
  set renderer(val) {
    this.renderer = val
  }

  get mainGroup() {
    return this.mainGroup
  } // build group
  set mainGroup(val) {
    this.mainGroup = val
  }
}
