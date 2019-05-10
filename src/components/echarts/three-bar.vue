<template>
  <div class="echarts--wrap" :style="{width: width, height: height}">
    <div :id="randomId" :style="{width: width, height: height}"></div>
  </div>
</template>

<script>
import resize from './mixins/resize'
export default {
  name: 'three-pie',
  mixins: [resize],
  data () {
    return {
      chart: null,
      seriesData: [],
      options: {}
    }
  },
  props: {
    id: {
      type: String,
      default: ''
    },
    data: {
      type: [Array, Object],
      default: () => []
    },
    type: {
      type: String,
      default: 'industry' // 业态
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    },
    title: {
      type: String,
      default: ''
    },
    theme: { // 主题颜色 dark、white
      type: String,
      default: 'white'
    }
  },
  created () {
    this.setOptions()
  },
  mounted () {
    this.initData()
  },
  computed: {
    randomId () {
      return `echarts-line-${this.type}_${Math.random().toString()}`
    }
  },
  methods: {
    initData () {
      this.chart = this.$echarts.init(document.getElementById(this.randomId))
      this.chart.resize()
      this.chart.setOption(this.options)
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
          show: true,
          trigger: 'axis',
          padding: [8, 10],
          backgroundColor: 'rgba(59, 92, 131, 0.42)',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
            shadowStyle: {
              opacity: 0.1,
              color: '#fff',
              type: 'dashed'
            }
          },
          formatter: '时间：{b}:00<br />{a}：{c}',
          textStyle: {
            fontSize: 12
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '4%',
          containLabel: true
        },
        xAxis: [
          {
            name: '时间',
            type: 'category',
            data: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
            axisTick: {
              alignWithLabel: false,
              interval: 0
            },
            axisLine: {
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.07)'
              }
            },
            axisLabel: {
              interval: 2,
              color: '#fff',
              fontSize: 12,
              align: 'center'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              color: '#fff'
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.07)',
                type: 'dashed'
              }
            }
          }
        ],
        series: [
          {
            name: '人流量',
            type: 'bar',
            itemStyle: {
              color: '#71C7F4'
            },
            emphasis: { // 高亮时属性配置
              itemStyle: {
                color: '#0F9EE9'
              }
            },
            data: ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0']
          }
        ]
      }
    }
  },
  watch: {
    data: {
      handler (val) {
        this.chart.setOption({series: [{
          name: '人流量',
          type: 'bar',
          data: val.data
        }]})
      },
      deep: true
    }
  }
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
