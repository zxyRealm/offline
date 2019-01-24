<template>
  <div class="all-time-wrap">
    <div class="identify"><span>客行分析设备</span></div>
    <div class="change-time">
      <span ref="dd">{{this.dd}}</span>
      <span ref="d">{{this.d}}</span>
      <div>:</div>
      <span ref="tt">{{this.tt}}</span>
      <span ref="t">{{this.t}}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: ['type'],
  data () {
    return {
      showTime: {},
      dd: '',
      d: '',
      tt: '',
      t: '',
      data: [0, 0, 0, 0] // 数据
    }
  },
  methods: {
    time () {
      let now = new Date()
      let hh = now.getHours() // 时
      let mm = now.getMinutes() // 分
      let clock = ''
      if (hh < 10) clock += '0'
      clock += hh + ':'
      if (mm < 10) clock += '0'
      clock += mm
      this.dd = Math.floor(hh / 10)
      this.d = hh % 10
      this.tt = Math.floor(mm / 10)
      this.t = mm % 10
    },
    setTime () {
      let me = this
      me.time()
      this.clearShowTime()
      this.showTime = window.setTimeout(this.setTime, 1000) // 默认是一分钟60000
    },
    clearShowTime () {
      if (this.showTime) window.clearTimeout(this.showTime)
    }
  },
  created () {
    this.time()
  },
  mounted () {
    this.setTime()
  },
  watch: {
    dd (val, oldVal) {
      this.$refs.dd.classList.add('animation-lwh-show')
      let timer = window.setTimeout(() => {
        if (!this.$refs.dd) return
        this.$refs.dd.classList.remove('animation-lwh-show')
        window.clearTimeout(timer)
      }, 6000)
    },
    d (val, oldVal) {
      this.$refs.d.classList.add('animation-lwh-show')
      let timer = window.setTimeout(() => {
        if (!this.$refs.d) return
        this.$refs.d.classList.remove('animation-lwh-show')
        window.clearTimeout(timer)
      }, 6000)
    },
    tt (val, oldVal) {
      this.$refs.tt.classList.add('animation-lwh-show')
      let timer = window.setTimeout(() => {
        if (!this.$refs.tt) return
        this.$refs.tt.classList.remove('animation-lwh-show')
        window.clearTimeout(timer)
      }, 6000)
    },
    t (val, oldVal) {
      this.$refs.t.classList.add('animation-lwh-show')
      let timer = window.setTimeout(() => {
        if (!this.$refs.t) return
        this.$refs.t.classList.remove('animation-lwh-show')
        window.clearTimeout(timer)
      }, 6000)
    }
  },
  computed: {},
  beforeRouteLeave () {
    this.clearShowTime()
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .all-time-wrap {
    width: 100%;
    text-align: center;
    div.identify {
      line-height: 80px;
      height: 80px;
      width: 176px;
      margin: 0 auto;
      background: url(../../../assets/console/device-name-bg@2x.png) no-repeat center;
      background-size: 100% 100%;
      span {
        padding: 3px 26px;
      }
    }
    .change-time {
      margin-top: 12px;
      span {
        display: inline-block;
        width: 30px;
        height: 30px;
        border: 1px solid #103E77;
        border-radius: 1px;
        text-align: center;
        line-height: 30px;
      }
      div {
        display: inline;
      }
    }
    //动画效果
    .animation-lwh-show {
      position: relative;
      animation-name: skyset;
      animation-duration: 2000ms;
      animation-iteration-count: 1; /*无限循环*/
      animation-timing-function: linear;
      @keyframes skyset {
        0% {
          transform: rotate3d(1, 0, 0, 180deg) scale(1);
        }
        50% {
          transform: rotate3d(1, 0, 0, 90deg) scale(1);
        }
        100% {
          transform: rotate3d(1, 0, 0, 0deg) scale(1);
        }
      }
    }
  }
</style>
