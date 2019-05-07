<template>
  <div :id="randomId" class="line-wrap" :style="{height: height, width: width}">
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { GetChartLine } from '@/api/visual'
import { eventObject } from '@/utils/event'
import { parseTime } from '@/utils'
import resize from './mixins/resize'

export default {
  name: 'echarts-line',
  mixins: [resize],
  props: {
    data: {
      type: Object,
      default: () => ({})
    },
    title: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '100%'
    },
    type: { // 图表类型
      type: String,
      default: ''
    }
  },
  data () {
    return {
      chart: null,
      timer: null, // 定时器
      // 比例图基本数据结构配置
      legendMap: {
        inflow: [
          {
            name: '进客流',
            value: '客流入',
            textStyle: {
              color: 'rgba(109,46,187,1)'
            }
          }
        ],
        flow: [
          {
            name: '进客流',
            value: '客流入',
            textStyle: {
              color: 'rgba(109,46,187,1)'
            }
          },
          {
            name: '出客流',
            value: '客流出',
            textStyle: {
              color: 'rgba(15,158,233,1)'
            }
          }
        ],
        gender: [
          {
            name: '女',
            textStyle: {
              color: '#EA9D49'
            }
          },
          {
            name: '男',
            textStyle: {
              color: '#2CA0F7'
            }
          }
        ],
        age: [
          { name: '0-10岁', textStyle: { color: '#28C0B1' } },
          { name: '11-20岁', textStyle: { color: '#79CF62' } },
          { name: '21-30岁', textStyle: { color: '#E4DA52' } },
          { name: '31-40岁', textStyle: { color: '#EA9D49' } },
          { name: '41-50岁', textStyle: { color: '#2B51ED' } },
          { name: '50岁以上', textStyle: { color: '#6201ED' } }
        ],
        repeat: [
          {
            name: '多次',
            textStyle: {
              color: '#EA9D49'
            }
          },
          {
            name: '单次',
            textStyle: {
              color: '#2CA0F7'
            }
          }
        ]
      },
      // 到店频次图例字体样式
      option: {
        color: ['#F1BB13', '#7FC16A', '#EE6C4B', '#6D2EBB', '#2187DF', '#DDDDDD'],
        textStyle: { // 总体字体样式
          color: '#999'
        },
        title: {
          text: this.title,
          textStyle: {
            color: '#252525',
            fontSize: '16',
            fontWeight: 'normal'
          }
        },
        tooltip: {
          show: true,
          trigger: 'axis',
          formatter: function (params) {
            let str = ''
            for (let i = 0, l = params.length; i < l; i++) {
              str += params[i].seriesName + '：&nbsp;&nbsp;' + params[i].value + '<br/>'
            }
            return str
          },
          padding: [10, 30],
          textStyle: {
            fontSize: 11
          },
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: 'rgba(114,116,118,1)', // '#6a7985',
              fontSize: 11
            }
          }
        },
        legend: {
          right: 0, // 排序方式
          textStyle: { // 字体设置
            fontSize: '12',
            fontWeight: 'normal'
          },
          icon: 'line',
          data: [
            {
              name: '进客流',
              textStyle: {
                color: 'rgba(109,46,187,1)'
              }
            },
            {
              name: '出客流',
              textStyle: {
                color: 'rgba(15,158,233,1)'
              }
            }
          ]
        },
        grid: {
          left: '1%',
          right: '3.6%',
          bottom: '1%',
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
            axisPointer: { // x轴鼠标移动虚线显示设置
              type: 'line',
              lineStyle: {
                type: 'dashed'
              }
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
            name: '进客流',
            type: 'line',
            data: ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
            smooth: true
          },
          {
            name: '出客流',
            type: 'line',
            data: ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
            smooth: true
          }
        ]
      }
    }
  },
  methods: {
    // 绘制图表
    drawLine () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById(this.randomId))
      myChart.clear() // 清除数据缓存
      myChart.setOption(this.option)
      this.chart = myChart
    },
    // 改变标题
    changeTitle () {
      this.option.title = this.$apply(this.option.title, this.title)
    },
    // 模拟假数据series
    simulateSeries (data) {
      let emptyArray = []
      for (let i = 0; i < data.length; i++) {
        let params = {
          name: data[i].name,
          type: 'line',
          smooth: true,
          data: ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0']
        }
        emptyArray.push(params)
      }
      return emptyArray
    },
    // 默认数据展示 = 可视化
    defaultShow () {
      this.option.legend['data'] = this.legendMap[this.type]
      this.option.series = this.simulateSeries(this.legendMap[this.type])
    }
  },
  mounted () {
    // 根据数据类型设置不同颜色配置参数
    this.option.color = this.legendMap[this.type].map(item => item.textStyle.color)
    if (!this.filterParams.group || !this.filterParams.group.group) {
      this.defaultShow()
      this.drawLine()
    }
  },
  computed: {
    ...mapState([
      'groupConsoleId',
      'filterParams',
      'currentManage'
    ]),
    randomId () {
      return `echarts-line-${this.type}_${Math.random().toString()}`
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .line-wrap {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }

  .console__main .line-wrap {
    background-color: rgba(0, 0, 0, 0);
  }
</style>
