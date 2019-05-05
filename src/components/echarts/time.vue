/*
* 首页 -> 进客流、到访会员、商场当前人数 曲线图
* @author  张晓元
* @date    2019-05-05
*/
<template>
  <div
    ref="echartsWrap"
    class="time-echart--wrap"
    :style="{width: width, height: height}">
    <div :id="eid" :style="{width: width, height: height}"></div>
  </div>
</template>

<script>
import resize from './mixins/resize'
export default {
  name: 'TimeEcharts',
  mixins: [resize],
  props: {
    data: {
      type: [Object, Array],
      default: () => []
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    },
    type: { // 图表类型 flow 进客流 member 会员 current 商场当前人数
      type: String,
      default: 'flow'
    },
    id: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      chart: null,
      color: {
        flow: '#2B51ED',
        member: '#28C0B1',
        current: '#6201ED'
      },
      options: {
        color: ['#2B51ED'],
        grid: {
          width: '100%',
          height: '100%',
          top: 0,
          left: 5,
          right: 5,
          bottom: 0
        },
        xAxis: [
          {
            // type: 'category',
            boundaryGap: false,
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.23)'
              }
            },
            data: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']
          }
        ],
        yAxis: [
          {
            type: 'value',
            show: false
          }
        ],
        series: [
          {
            name: '进客流',
            type: 'line',
            data: ['0', '0', '0', '0', '0', '0', '0', '0', '120', '0', '540', '0', '330', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
            smooth: true
          }
        ]
      }
    }
  },
  created () {
  },
  mounted () {
    this.initData()
  },
  computed: {
    eid () {
      return this.id || 'custom__echarts--' + this.type
    }
  },
  methods: {
    initData () {
      this.chart = this.$echarts.init(document.getElementById(this.eid))
      this.chart.resize()
      this.chart.setOption(this.options)
      console.log(this.chart)
    },
  },
  watch: {
    type: {
      handler (val) {
        this.$set(this.options, 'color', this.color[val])
        let series = this.options.series[0]
        if (val === 'flow' && series) {
          console.log('type----------', val)
          this.$set(this.options.series[0], 'type', 'bar')
        }
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>

</style>