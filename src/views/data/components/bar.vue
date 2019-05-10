<template>
  <div class="bar-wrap">
    <div :id="randomId" class="bar-echarts"></div>
    <div class="custom-legend">
      <div class="legend-item">
        <p>客流量汇总</p>
        <strong>{{analyseData.total}}</strong>
      </div>
      <div class="legend-item">
        <p>客流量峰值</p>
        <strong>{{analyseData.peak}}</strong>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import resize from '@/utils/mixins/resize'
export default {
  name: 'echarts-bar',
  mixins: [resize],
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      chart: null,
      seriesMap: {

      },
      option: {
        title: {
          text: '客流统计表',
          textStyle: {
            color: '#252525',
            fontSize: '16',
            fontWeight: 'lighter'
          }
        },
        // color: [
        //   '#EA9D49',
        //   '#2CA0F7'
        // ],
        textStyle: { // 总体字体样式
          color: '#999'
        },
        tooltip: {
          show: true,
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'line', // 默认为直线，可选为：'line' | 'shadow'
            lineStyle: {
              type: 'dashed'
            }
          },
          formatter: function (params) {
            let total = 0
            let str = ''
            params.forEach(item => {
              str += `<br />${item.seriesName}：${item.value}`
              total += Number(item.value)
            })
            return `总人数：${total}${str}`
          }
        },
        legend: {
          top: '10%',
          left: '2%', // 排序方式
          textStyle: { // 字体设置
            fontSize: '12',
            fontWeight: 'normal'
          },
          data: [
            '进客流',
            '出客流'
            // { name: '进客流'},
            // { name: '出客流'}
          ]
        },
        grid: {
          top: '20%',
          left: '2%',
          bottom: '5%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: true,
            axisLine: { // 坐标轴线相关设置
              show: false
            },
            axisTick: { // 坐标刻度相关设置
              show: false
            },
            data: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: { // 坐标轴线相关设置
              show: false
            },
            axisTick: { // 坐标刻度相关设置
              show: false
            },
            axisPointer: { // y轴鼠标移动虚线不显示
              show: false
            },
            splitLine: { // y轴横线不显示
              show: true,
              lineStyle: {
                color: '#F0F0F0'
              }
            }
          }
        ],
        series: [
          {
            name: '出客流',
            type: 'bar',
            stack: '客流',
            barWidth: '60%',
            itemStyle: {
              color: '#EA9D49'
            },
            data: []
            // itemStyle: {normal: {label: {show: true, position: 'top'}}},
            // data: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']
          },
          {
            name: '进客流',
            type: 'bar',
            stack: '客流',
            barWidth: '60%',
            itemStyle: {
              color: '#2CA0F7'
            },
            data: []
            // itemStyle: {normal: {label: {show: true, position: 'top'}}},
            // data: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']
          }
        ]
      }
    }
  },
  methods: {
    // 绘制图表
    drawBar () {
      let myChart = this.$echarts.init(document.getElementById(this.randomId))
      myChart.setOption(this.option)
      this.chart = myChart
    }
  },
  computed: {
    randomId () {
      return `echarts-bar-${this.type}_${Math.random()}`
    },
    analyseData () {
      let [total, peak] = [0, 0]
      let totalArray = [0] // reduce空数组时报错
      this.option.series.map(item => {
        totalArray = totalArray.concat(item.data)
      })
      total = totalArray.reduce((pre, cur) => {
        return Number(pre) + Number(cur)
      })
      return {
        total: total, // 客流汇总
        peak: peak // 客流峰值
      }
    }
  },
  mounted () {
    this.drawBar()
  },
  watch: {
    data: { // 监听数组
      handler (val) {
        this.option.xAxis[0].data = val.xAxis
        this.option.series.map(item => {
          let v =  (val.series || []).filter(item2 => item.name === item2.name)[0]
          item.data = v ? v.data : []
          return item
        })
        this.$nextTick(() => {
          this.drawBar()
        })
      },
      deep: true
      // immediate: true
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .bar-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    .bar-echarts{
      width: calc(100% - 300px);
      height: 100%;
    }
  }
  .custom-legend{
    position: absolute;
    top: 25%;
    right: 50px;
    .legend-item{
      width: 234px;
      height: 118px;
      padding: 22px;
      border-radius: 4px;
      text-align: center;
      color: #fff;
      box-sizing: border-box;
      &:first-child{
        margin-bottom: 30px;
        background: #2B51ED;
      }
      &:last-child{
        background: #EA9D49;
      }
      p{
        font-size: 16px;
        line-height: 22px;
      }
      strong{
        margin-top: 12px;
        line-height: 50px;
        font-size: 36px;
        font-weight: normal;
      }
    }
  }
  .console__main .bar-wrap{
    background-color: rgba(0,0,0,0);
  }
</style>
