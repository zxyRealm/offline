<template>
  <div class="data-guest">
    <div class="data-guest-content">
      <div class="screening corner-bg">
        <screening type="age"></screening>
      </div>
      <div class="flow-diagram corner-bg" ref="pie">
        <echarts-pie ref="echartsPie" :pie-params="pieParams"></echarts-pie>
      </div>
    </div>
    <div class="table-data corner-bg" ref="line">
      <echarts-line :line-height="tabelHeight" :line-params='lineParams' ref="echartsLine"></echarts-line>
    </div>
  </div>
</template>
<script>
import screening from '../../components/screening'
import EchartsLine from '../../components/echarts/line'
import EchartsPie from '../../components/echarts/pie'

export default {
  name: 'age-analysis',
  components: {screening, EchartsLine, EchartsPie},
  data () {
    return {
      // 传递给线型图字段
      lineParams: {
        title: {text: '年龄流量图'}
      },
      pieParams: {
        type: 3,
        title: {text: '年龄比例图'}
      }
    }
  },
  methods: {
    resizeFunction () {
      let me = this
      if (!me.$refs.line) return
      let table = document.getElementById('echarts-line')
      // let tableEle = document.body.clientHeight - 420;
      table.style.height = me.$refs.line.offsetHeight + 'px'
      // 宽度
      table.style.width = me.$refs.line.offsetWidth + 'px'
      me.$refs.echartsLine.resizeEcharts()

      let tablePie = document.getElementById('echarts-pie')
      tablePie.style.width = me.$refs.pie.offsetWidth + 'px'
      me.$refs.echartsPie.resizeEcharts()
    }
  },
  created () {

  },
  computed: {
    // 首先给table高度赋值
    tabelHeight () {
      let tableEle = document.body.clientHeight - 420 + 14
      return tableEle + 'px'
    }
  },
  mounted () {
    let me = this
    window.addEventListener('resize', me.resizeFunction)
  },
  beforeRouteLeave (to, from, next) {
    let me = this
    window.removeEventListener('resize', me.resizeFunction)
    next()
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
