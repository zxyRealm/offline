<template>
  <div class="zxy__switch--bar" :class="mode">
    <slot name="prefix" ></slot>
    <i v-if="data.length > maxNum" :class="arrowClass()" @click="switchBar('pre')"></i>
    <div class="switch--bar-transform" :style="wrapSize">
      <ul class="switch--bar-wrap clearfix" :style="{height: listSize.height, width:listSize.width, transform: transform}">
        <li
          class="switch--bar-item"
          :style="{margin: listSize.margin}"
          v-for="(item, $index) in data"
          @click="clickItem(item, $index)"
          :class="{active: $index === currentIndex}"
          :key="$index">
          {{item[label] | IntToFloor}}
        </li>
      </ul>
    </div>
    <i v-if="data.length > maxNum" :class="arrowClass(1)" @click="switchBar('next')"></i>
  </div>
</template>

<script>
export default {
  name: 'switch-bar',
  props: {
    data: {
      type: Array,
      default: () => []
    },
    label: {
      type: String,
      default: 'label'
    },
    // 默认选中项的序列
    initialIndex: {
      type: Number,
      default: 0
    },
    // 模式
    mode: {
      type: String,
      default: 'horizontal' // 可选值 horizontal / vertical
    },
    // 子元素之间的间隙
    offset: {
      type: Number,
      default: 2
    },
    maxNum: {
      type: Number,
      default: 5
    }
  },
  data () {
    return {
      currentIndex: 0, // 当前选中元素序列号
      translateIndex: 0, // 最左侧或者最顶部元素序列号
      transform: {},
      itemObj: null
    }
  },
  created () {
    this.currentIndex = this.initialIndex
  },
  mounted () {
    this.itemObj = document.getElementsByClassName('switch--bar-item')[0]
  },
  computed: {
    listSize () {
      return this.setStyle()
    },
    wrapSize () {
      return this.setStyle('wrap')
    }
  },
  methods: {
    // 点击子元素时重置当前选中元素状态，并触发@change
    clickItem (value, index) {
      this.currentIndex = index
      this.$emit('change', value, index)
    },
    arrowClass (type) {
      let classStr = ''
      switch (type) {
        case 1:
          classStr = 'switch--arrow_' + (this.mode === 'horizontal' ? 'right' : 'bottom')
          break
        default:
          classStr = 'switch--arrow_' + (this.mode === 'horizontal' ? 'left' : 'top')
          break
      }
      return classStr
    },
    // 向上一个
    switchBar (type) {
      let translate
      if (type === 'pre' && this.translateIndex < 0) {
        this.translateIndex++
      } else if (type === 'next' && this.translateIndex > (this.maxNum - this.data.length)) {
        this.translateIndex--
      }
      switch (this.mode) {
        case 'vertical': // 垂直模式
          translate = `translateY(${(this.itemObj.offsetHeight + this.offset) * this.translateIndex}px)`
          break
        case 'horizontal': // 水平模式
          translate = `translateX(${(this.itemObj.offsetWidth + this.offset) * this.translateIndex}px)`
          break
      }
      this.transform = translate
    },
    setStyle (type) {
      this.itemObj = document.getElementsByClassName('switch--bar-item')[0]
      let len = this.data.length
      let style = {
        height: 'auto',
        width: 'auto'
      }
      if (this.itemObj) {
        switch (this.mode) {
          case 'vertical':
            if (type === 'wrap') {
              style.maxHeight = (this.itemObj.offsetHeight * this.maxNum + this.offset * (this.maxNum - 1)) + 'px'
            } else {
              style.height = ((this.itemObj.offsetHeight + this.offset) * len) + 'px'
              style.margin = `0px 0px ${this.offset}px`
            }
            break
          case 'horizontal':
            if (type === 'wrap') {
              style.maxWidth = (this.itemObj.offsetWidth * this.maxNum + this.offset * (this.maxNum - 1)) + 'px'
            } else {
              style.width = ((this.itemObj.offsetWidth + this.offset) * len) + 'px'
              style.margin = `0px ${this.offset}px 0px 0px`
            }
            break
        }
      }
      return style
    }
  },
  filters: {
    IntToFloor (int) {
      if (Number(int)) {
        if (int > 0) {
          return `F${int}`
        } else {
          return `B${-int}`
        }
      } else {
        return int
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  $aColor: rgba(255, 255, 255, 0.7);
  .zxy__switch--bar {
    text-align: center;
    > * {
      float: left;
    }
    &.vertical {
      width: 40px;
      .switch--bar-item{
        margin-bottom: 2px;
        &:last-child{
          margin-bottom: 0;
        }
      }
      .switch--arrow_top{
        margin: 0px 10px 10px;
      }
      .switch--arrow_bottom{
        margin: 10px 10px 0px;
      }
    }
    &.horizontal {
      height: 40px;
      .switch--bar-item{
        margin-right: 2px;
        &:last-child{
          margin-right: 0;
        }
      }
      .switch--arrow_left{
        margin: 10px 10px 10px 0px;
      }
      .switch--arrow_right{
        margin: 10px 0px 10px 10px;
      }
    }
    .switch--bar-transform{
      float: left;
      overflow: hidden;
    }
    .switch--arrow{
      float: left;
      display: block;
      width: 0;
      height: 0;
      border: 10px;
      border-style: solid;
      text-align: center;
      cursor: pointer;
      &_left{
        @extend .switch--arrow;
        border-color: transparent $aColor transparent transparent;
      }
      &_right{
        @extend .switch--arrow;
        border-color: transparent transparent transparent $aColor;
      }
      &_top{
        @extend .switch--arrow;
        border-color: transparent transparent $aColor;
      }
      &_bottom{
        @extend .switch--arrow;
        border-color: $aColor transparent transparent;
      }
    }
    .switch--bar-item {
      float: left;
      width: 40px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      background: rgba(255, 255, 255, 0.08);
      cursor: pointer;
      user-select: none;
      &:hover{
        background: rgba(255, 255, 255, 0.16);
      }
      &.active{
        background: #005BC9;
      }
    }
  }
</style>
