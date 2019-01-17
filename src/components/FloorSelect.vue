<template>
  <div class="floor__select--wrap" :aria-expanded="dropShow">
    <ul v-show="dropShow" class="fs__dropdown--wrap" @mousedown="cancelBlur">
      <li v-for="(item,$index) in floorList"
          @click="selectFloor($index)"
          class="fs__dropdown--item"
          :class="{active:item.select}"
          :key="$index">{{item.name}}</li>
    </ul>
    <el-input ref="floorInput" :placeholder="placeholder" @focus="dropShow = true" @blur="dropShow = false"  readonly v-model.trim="showText"></el-input>
  </div>
</template>

<script>

export default {
  name: 'floor-select',
  props: {
    value: {
      type: [Array],
      default: () => []
    },
    single: { // 是否使用单层选取效果
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: '请选取楼层'
    }
  },
  data () {
    return {
      visible: false,
      dropShow: false,
      isSelf: false,
      showText: '',
      startIndex: '', // 第一次选中的元素的序列
      floorList: [
        {name: 'B6', value: -6},
        {name: 'B5', value: -5},
        {name: 'B4', value: -4},
        {name: 'B3', value: -3},
        {name: 'B2', value: -2},
        {name: 'B1', value: -1},
        {name: 'F1', value: 1},
        {name: 'F2', value: 2},
        {name: 'F3', value: 3},
        {name: 'F4', value: 4},
        {name: 'F5', value: 5},
        {name: 'F6', value: 6},
        {name: 'F7', value: 7},
        {name: 'F8', value: 8},
        {name: 'F9', value: 9},
        {name: 'F10', value: 10},
        {name: 'F11', value: 11},
        {name: 'F12', value: 12},
        {name: 'F13', value: 13},
        {name: 'F14', value: 14},
        {name: 'F15', value: 15},
        {name: 'F16', value: 16},
        {name: 'F17', value: 17},
        {name: 'F18', value: 18}
      ],
      selectList: []
    }
  },
  created () {
  },
  mounted () {
    this.setSelected()
  },
  computed: {
  },
  methods: {
    // 点击下拉框是不触发input 的失焦事件
    cancelBlur (e) {
      if (e && e.preventDefault()) {
        e.preventDefault()
      } else {
        window.event.returnValue = false
      }
    },
    // 选择楼层
    selectFloor (index) {
      let selected = this.floorList.filter(item => item.select)
      if (this.single) { //  单层选中后自动隐藏下拉框
        this.floorList.map((item) => {
          this.$set(item, 'select', false)
          return item
        })
        this.$set(this.floorList[index], 'select', true)
        this.$emit('input', this.floorList.filter(item => item.select).map(item => item.value))
        this.$refs.floorInput.blur()
      } else if (!selected.length) {
        this.startIndex = index
        this.$set(this.floorList[index], 'select', true)
      } else if (selected.length === 1) {
        this.selectList = []
        // 当选择第二个时将其与第一个之间的值全部变成选中状态
        // 当第一个选中值序列比第二个小
        if (this.startIndex < index) {
          this.floorList.map((item, index2) => {
            if (index2 >= this.startIndex && index2 <= index) {
              this.$set(item, 'select', true)
              // 保存所有选中值
              this.selectList.push(item)
            }
            return item
          })
          this.$emit('input', this.selectList.map(item => item.value))
          // 选中第二个后自动隐藏下拉框
          this.$refs.floorInput.blur()
        } else { // 当第一个选中值序列比第二个大时
          this.floorList.map((item, index2) => {
            if (index2 <= this.startIndex && index2 >= index) {
              this.$set(item, 'select', true)
              this.selectList.push(item)
            }
            return item
          })
          this.$emit('input', this.selectList.map(item => item.value))
          this.$refs.floorInput.blur()
        }
      } else if (selected.length >= 2) {
        this.floorList.map((item) => {
          this.$set(item, 'select', false)
          return item
        })
        this.startIndex = index
        this.$set(this.floorList[index], 'select', true)
      }
    },
    // 设置默认值已选中状态
    setSelected () {
      if (this.value.length) {
        this.showText = `${this.backText(this.value[0])}-${this.backText(this.value[this.value.length - 1])}`
        let setObj = new Set(this.value)
        this.floorList.map(item => {
          if (setObj.has(item.value)) this.$set(item, 'select', true)
          return item
        })
      } else {
        this.showText = ''
        this.floorList.map(item => {
          this.$set(item, 'select', false)
          return item
        })
      }
    },
    backText (int) {
      if (int > 0) {
        return `F${int}`
      } else {
        return `B${-int}`
      }
    }
  },
  watch: {
    value: {
      handler (val) {
        this.setSelected()
      },
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>
.floor__select--wrap{
  position: relative;
  outline: 0;
  &:after{
    position: absolute;
    content: '';
    right: 4px;
    height: 100%;
    width: 30px;
    background: url(/static/img/select_arrow_icon.png) no-repeat center;
    background-size: 10px auto;
    transition: transform 0.5s;
    transform: rotate(0deg);
  }
  &[aria-expanded]{
    &:after{
      transform: rotate(180deg);
    }
  }
}
.fs__dropdown--wrap{
  position: absolute;
  top: 32px;
  left: 0;
  width: 100%;
  padding: 4px 6px;
  border-radius: 4px;
  box-sizing: border-box;
  overflow: hidden;
  z-index: 99;
  background: #fff;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.30);
  .fs__dropdown--item{
    float: left;
    width: 36px;
    margin-right: 4px;
    margin-bottom: 2px;
    line-height: 18px;
    text-align: center;
    background: #F7F7F7;
    cursor: pointer;
    &.active,&:hover{
      background: rgba(15,158,233,0.20);
    }
    &:nth-child(6n) {
      margin-right: 0;
    }
  }
}
</style>
