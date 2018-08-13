<template>
  <div id="echarts-bar" class="bar-wrap">

  </div>
</template>

<script>
import echarts from 'echarts'

export default {
  name: 'echarts-bar',
  props: {
    ageBar: Array
  },
  data () {
    return {
      data: [],
      option: {
        title: {
          text: '年龄分布',
          textStyle: {
            color: '#ffffff',
            fontSize: '14',
            fontWeight: 'lighter'
          }
        },
        textStyle: { // 总体字体样式
          color: '#ffffff'
        },
        color: [new echarts.graphic.LinearGradient(
          0, 0, 0, 1,
          [
            {offset: 0, color: 'rgba(133,93,182,1)'},
            {offset: 1, color: 'rgba(36,124,208,1)'}
          ]
        )],
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
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['0-10', '11-20', '21-30', '31-40', '41-50', '51以上'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisPointer: { // y轴鼠标移动虚线不显示
              show: false
            },
            splitLine: { // y轴横线不显示
              show: false
            }
          }
        ],
        series: [
          {
            name: '直接访问',
            type: 'bar',
            barWidth: '40%',
            itemStyle: {normal: {label: {show: true, position: 'top'}}},
            data: [0, 0, 0, 0, 0, 0]
          }
        ]
      }
    }
  },
  created () {
  },
  methods: {
    // 传递数据赋值给series.data
    translateData (data) {
      this.option.series[0].data = data
    },
    changexAxisData (data) {
      this.option.xAxis[0].data = data
    },
    // 绘制图表
    drawBar () {
      let myChart = this.$echarts.init(document.getElementById('echarts-bar'))
      this.option.series[0].data = this.ageBar
      myChart.setOption(this.option)
      this.myChart = myChart
    },
    resizeEcharts () {
      if (this.myChart) {
        this.myChart.resize()
      }
    }
  },
  computed: {},
  mounted () {
    this.drawBar()
  },
  watch: {
    ageBar: { // 监听数组
      handler (val, oldVal) {
        this.drawBar()
      },
      deep: true
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .bar-wrap {
    width: 100%;
    box-sizing: border-box;
    padding: 20px;
    background-color: rgba(64, 58, 73, 0.30);
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.10);
  }
</style>
