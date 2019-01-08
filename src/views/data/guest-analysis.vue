<template>
  <div class="data-guest">
    <div class="data-guest-content">
      <div class="screening corner-bg">
        <screening type="flow"></screening>
      </div>
      <div class="flow-diagram corner-bg" ref="line">
        <echarts-line :line-height="'320px'" :line-params='lineParams' ref="echartsLine"></echarts-line>
      </div>
    </div>
    <div class="table-data corner-bg" ref="table">
      <table-data ref="element-table"></table-data>
    </div>
  </div>
</template>
<script>
import screening from '../../components/screening'
import EchartsLine from '../../components/echarts/line'
import TableData from '../../components/table/index'
import {eventObject} from '@/utils/event.js'

export default {
  name: 'guest-analysis',
  components: {screening, EchartsLine, TableData},
  data () {
    return {
      // 传递给线型图字段
      lineParams: {
        title: {text: '进/出客流量图'}
      },
      tableHeight: 0
    }
  },
  methods: {
    resizeFunction () {
      let me = this
      if (!me.$refs.line) return
      let line = document.getElementById('echarts-line')
      // this.tableHeight = this.$refs.table.offsetHeight;
      // let tableEle = document.body.clientHeight - 420;
      line.style.height = me.$refs.line.offsetHeight + 'px'
      // 宽度
      line.style.width = me.$refs.line.offsetWidth + 'px'
      me.$refs.echartsLine.resizeEcharts()
      // 表格高度
      // if(this.$refs.table)this.$refs.table.initSize();
    }
  },
  mounted () {
    // 浏览器窗口监听
    let me = this
    window.addEventListener('resize', me.resizeFunction)
  },
  beforeRouteLeave (to, from, next) {
    let me = this
    window.removeEventListener('resize', me.resizeFunction)
    next()
  },
  computed: {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .data-guest {
    .data-guest-content {
      .screening, .flow-diagram {
        height: 320px;
      }
    }
    .table-data {
      /*background-color: rgba(64, 58, 73, 0.30);*/
      box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.10);
    }
  }
</style>
