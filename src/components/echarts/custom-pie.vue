<template>
  <div ref="personWrap" class="person__pie--wrap">
    <span
      v-for="item in iconCount"
      :key="item"
      :class="{boy: item > girlInt}"
      class="return__ratio--icon">
      <img v-if="item <= girlInt" src="@/assets/three/return_girl_icon.png" alt="">
      <img  src="@/assets/three/return_boy_icon.png" v-else alt="">
    </span>
  </div>
</template>

<script>
export default {
  name: 'custom-pie',
  props: {
    total: {
      type: [Number],
      default: 0
    },
    percent: {
      type: [Number, String], // 0 - 100
      default: 50
    },
    itemMargin: {
      type: Number,
      default: 8
    }
  },
  data () {
    return {
      wrapWidth: '',
      iconCount: 18,
      iconWidth: ''
    }
  },
  created () {
  },
  mounted () {
    this.$nextTick(() => {
      window.addEventListener('resize', this.setCount)
    })
    this.setCount()
  },
  computed: {
    girlInt: {
      get () {
        let num = typeof this.percent === 'string' && this.percent.indexOf('%') > 0 ? this.percent.replace('%', '') : this.percent
        let int = this.total ? Math.floor((num / 100) * this.iconCount) : (this.iconCount / 2)
        return int
      },
      set () {}
    }
  },
  methods: {
    setCount () {
      let child = this.$refs.personWrap.children[0]
      let mr = parseInt(this.getStyle(child, 'marginRight'), 10)
      let count = Math.floor((this.$refs.personWrap.clientWidth + mr) / (child.clientWidth + mr))
      this.iconCount = count % 2 ? count - 1 : count
      console.log(child.clientWidth, mr)
    },
    /* 获取元素样式
    * {Object} ele 要获取的元素dom对象
    * {String} name 要获取的样式名
    * */
    getStyle (ele, name) {
      if (ele) {
        /*
        * 利用判断是否支持currentStyle（是否为ie）来通过不同方法获取style
        */
        let finalStyle = ele.currentStyle ? ele.currentStyle : document.defaultView.getComputedStyle(ele, null)
        return finalStyle[name]
      } else {
        console.error('element is not exist')
        return ''
      }
    }
  },
  watch: {},
  beforeDestroy () {
    window.removeEventListener('resize', this.setCount)
  }
}
</script>

<style lang="scss" scoped>
  .empty--data{
    .return__ratio--icon{
      /*background-image: url(../../assets/three/return_girl_icon.png);*/
      &.boy{
        /*background-image: url(../../assets/three/return_boy_icon.png);*/
      }
    }
  }
  .person__pie--wrap{
    display: block;
    overflow: hidden;
  }
  .return__ratio--icon{
    float: left;
    display: block;
    width: 10px;
    height: 24px;
    margin-right: 7px;
    /*background-image: url(../../assets/three/return_girl_icon@2x.png);*/
    background-size: 100% auto;
    img {
      width: 100%;
    }
    &.boy{
      /*background-image: url(../../assets/three/return_boy_icon@2x.png);*/
    }
    &:last-child{
      margin-right: 0;
    }
  }
</style>
