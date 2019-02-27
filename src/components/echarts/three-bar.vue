<template>
  <div class="echarts--wrap" :style="{width: width, height: height}">
    <div :id="eid" :style="{width: width, height: height}"></div>
  </div>
</template>

<script>
import resize from './mixins/resize'
import echarts from 'echarts'
export default {
  name: 'three-pie',
  mixins: [resize],
  data () {
    return {
      chart: null,
      dataList: [
        {value: 10, name: '0-10岁'},
        {value: 25, name: '10-20岁'},
        {value: 30, name: '20-30岁'},
        {value: 20, name: '30-40岁'},
        {value: 20, name: '50岁以上'}
      ],
      options: {}
    }
  },
  props: {
    id: {
      type: String,
      default: ''
    },
    data: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      default: 'industry' // 业态
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    },
    title: {
      type: String,
      default: ''
    }
  },
  created () {
    this.setOptions()
  },
  mounted () {
    this.initData()
  },
  computed: {
    eid () {
      return this.id || 'echarts_bar_' + this.type
    }
  },
  methods: {
    initData () {
      this.chart = echarts.init(document.getElementById(this.eid))
      this.chart.resize()
      this.chart.setOption(this.options)
    },
    // 计算百分比
    getPercent (val) {
      let total = 0
      for (let i = 0, l = this.dataList.length; i < l; i++) {
        total += this.dataList[i].value
      }
      return ((val / total) * 100).toFixed(2) + '%'
    },
    // 根据type定义配置信息
    setOptions () {
      this.options = {
        color: ['#3398DB'],
        title: {
          text: this.title,
          textStyle: {
            color: '#ffffff',
            fontSize: '14',
            fontWeight: 'normal'
          }
        },
        tooltip: {
          show: false,
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '10%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisTick: {
              alignWithLabel: false
            },
            axisLine: {
              lineStyle: {
                color: '#fff'
              }
            },
            axisLabel: {
              interval: 0,
              rotate: -30,
              color: '#fff',
              fontSize: 12
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              color: '#fff'
            },
            axisLine: {
              lineStyle: {
                color: '#fff'
              }
            },
            splitLine: {
              show: false
            }
          }
        ],
        series: [
          {
            name: '直接访问',
            type: 'bar',
            barWidth: '60%',
            data: [10, 52, 200, 334, 390, 330, 220],
            label: {
              show: true,
              position: 'top'
            }
          }
        ]
      }
    }
  },
  watch: {}
}
</script>

<style scoped>
  .echarts--wrap{
    position: relative;
  }
  .percent-wrap{
    position: absolute;
    top: 20px;
    right: 2%;
    display: inline-block;
    font-size: 12px;
    color: #0F9EE9;
  }
  .percent-wrap p{
    line-height: 22px;
  }
</style>
