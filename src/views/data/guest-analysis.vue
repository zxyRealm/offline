<template>
  <div class="data-guest">
    <div class="data-guest-content">
      <div class="screening corner-bg">
        <screening :type="flowType"></screening>
      </div>
      <div class="flow-diagram corner-bg" ref="line">
        <echarts-line :line-height="'320px'" :line-params='lineParams' ref="echartsLine"></echarts-line>
        <el-menu :default-active="flowType" class="custom-nav" mode="horizontal" @select="handleSelect">
          <el-menu-item index="flow">总客流图</el-menu-item>
          <el-menu-item index="inflow">去重客流图</el-menu-item>
        </el-menu>
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
        title: {text: ''}
      },
      tableHeight: 0,
      flowType: 'flow' // 客流图类型 flow 总客流图 inflow 去重客流图
    }
  },
  methods: {
    handleSelect (type) {
      let filters = JSON.parse(JSON.stringify(this.$store.state.filterParams))
      filters.type = type
      this.flowType = type
      this.$store.commit('SET_FILTER_PARAMS', filters)
      eventObject().$emit('REFRESH_DATA', '')
      eventObject().$emit('CHANGE_TYPE', type)
    },
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
  beforeDestroy () {
    window.removeEventListener('resize', this.resizeFunction)
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
  .flow-diagram{
    position: relative;
    .custom-nav{
      position: absolute;
      top: 20px;
      left: 30px;
      font-size: 14px;
      background: transparent!important;
      z-index: 1111;
      border: none;
      .el-menu-item{
        height: 24px;
        line-height: 24px;
        padding: 0 4px;
        margin-right: 15px;
        background: transparent!important;
        &:hover,&.focus, &:visited, &:active{
          color: #fff;
        }
        &.is-active{
          color: #fff;
        }
      }
      span{
        display: inline-block;
        margin-right: 15px;
        padding: 0 2px;
        line-height: 24px;
        cursor: pointer;
        &.active{
          border-bottom:2px solid #3a8ee6;
        }
      }
    }
  }
</style>
