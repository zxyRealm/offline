<template>
  <div ref="personWrap" class="person__pie--wrap">
    <!--<span-->
      <!--class="return__ratio&#45;&#45;icon">-->
      <span
        :key="item"
        v-for="item in iconCount"
        class="iconfont return__ratio--icon"
        :class="item > girlInt ? 'icon-nan':'icon-nv'"></span>
    <!--</span>-->
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
      // console.log(child.clientWidth, this.iconCount, mr)
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
      color: #79787B;
    }
  }
  .person__pie--wrap{
    display: block;
    overflow: hidden;
  }
  .return__ratio--icon{
    display: inline-block;
    width: 10px;
    color: #005BC9;
    font-size: 30px;
    letter-spacing: -20px;
    height: 24px;
    margin-right: 7px;
    text-indent: -10px;
    &.icon-nv{
      color: #8663FF;
    }
    &:last-child{
      margin-right: 0;
    }
  }
</style>
