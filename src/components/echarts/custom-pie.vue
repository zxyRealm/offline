<template>
  <div
    ref="personWrap"
    id="person__pie--wrap"
    class="person__pie--wrap vam"
    :class="size">
      <span
        :key="item"
        v-for="item in iconCount"
        class="iconfont icon-huitoukebili"
        :style="customStyle"
        :class="item > girlInt ? 'icon-nan':'icon-nv'"></span>
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
    },
    size: {
      type: String,
      default: 'small'
    }
  },
  data () {
    return {
      wrapWidth: '',
      iconCount: 18,
      iconWidth: '',
      customStyle: {}
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
      set () {
      }
    }
  },
  methods: {
    setCount () {
      let child = this.$refs.personWrap.children[0]
      let mr = parseInt(this.getStyle(child, 'marginRight'), 10)
      let count = Math.floor((this.$refs.personWrap.clientWidth + mr) / (child.clientWidth + mr))
      this.iconCount = count % 2 ? count - 1 : count
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
  .empty--data {
    .icon-huitoukebili {
      color: #79787B;
      &.icon-nv, &.icon-nan {
        color: #79787B;
      }
    }
  }

  .person__pie--wrap {
    display: block;
    overflow: hidden;
  }

  .icon-huitoukebili {
    display: inline-block;
    color: #005BC9;
    font-size: 30px;
    letter-spacing: -10px;
    margin-right: 7px;
    text-indent: -10px;
    &.icon-nv {
      color: #8663FF;
    }
    &:last-child {
      margin-right: 0;
    }
  }
  .large{
    .icon-huitoukebili{
      font-size: 60px;
      letter-spacing: -20px;
      text-indent: -20px;
    }
  }
</style>
