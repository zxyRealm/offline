
export default {
  methods: {
    // 数字转楼层信息
    IntToFloor (int) {
      if (int > 0) {
        return `F${int}`
      } else {
        return `B${-int}`
      }
    }
  }
}
