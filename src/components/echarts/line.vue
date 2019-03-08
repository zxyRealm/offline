<template>
  <div id="echarts-line" class="line-wrap" :style="{height: lineHeight}">
  </div>
</template>

<script>
import {mapState} from 'vuex'
import Moment from 'moment'
import {GetChartLine} from '../../api/visual'
import {eventObject} from '../../utils/event'
import {parseTime} from '../../utils'

export default {
  name: 'echarts-line',
  props: ['lineHeight', 'lineParams'],
  data () {
    return {
      timer: null, // 定时器
      data: [],
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
        sex: [
          {
            name: '女',
            textStyle: {
              color: 'rgba(109,46,187,1)'
            }
          },
          {
            name: '男',
            textStyle: {
              color: 'rgba(15,158,233,1)'
            }
          }
        ],
        age: [
          {name: '0-10岁', textStyle: {color: '#FFD500'}},
          {name: '11-20岁', textStyle: {color: '#7ED321'}},
          {name: '21-30岁', textStyle: {color: '#FF6660'}},
          {name: '31-40岁', textStyle: {color: '#0F9EE9'}},
          {name: '41-50岁', textStyle: {color: '#005BC9'}},
          {name: '50岁以上', textStyle: {color: '#8663FF'}}
        ],
        repeat: [
          {
            name: '多次',
            textStyle: {
              color: 'rgba(109,46,187,1)'
            }
          },
          {
            name: '单次',
            textStyle: {
              color: 'rgba(15,158,233,1)'
            }
          }
        ]
      },
      // 到店频次图例字体样式
      option: {
        color: ['#F1BB13', '#7FC16A', '#EE6C4B', '#6D2EBB', '#2187DF', '#DDDDDD'],
        textStyle: { // 总体字体样式
          color: '#ffffff'
        },
        title: {
          text: '',
          textStyle: {
            color: '#ffffff',
            fontSize: '14',
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
              // padding: [15, 17, 15, 17]
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
        toolbox: {},
        grid: {
          left: '1%',
          right: '3.6%',
          bottom: '1%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            // boundaryGap: false,
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
            axisPointer: { // y轴鼠标移动虚线不显示
              show: false
            },
            splitLine: { // y轴横线不显示
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
            name: '进客流',
            type: 'line',
            data: ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0']
          },
          {
            name: '出客流',
            type: 'line',
            data: ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0']
          }
        ]
      }
    }
  },
  created () {
    eventObject().$on('REFRESH_DATA', this.getData)
  },
  methods: {
    // 绘制图表
    drawLine () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('echarts-line'))
      myChart.clear() // 清除数据缓存
      myChart.setOption(this.option)
      this.myChart = myChart
    },
    // 自适应图表
    resizeEcharts () {
      if (this.myChart) {
        this.myChart.resize()
      }
    },
    // 改变标题
    changeTitle () {
      this.option.title = this.$apply(this.option.title, this.lineParams.title)
    },
    // 改变Series单个项目配置
    changeSeries () {
      let params = {
        smooth: true
      }
      for (let i = 0; i < this.option.series.length; i++) {
        this.$apply(this.option.series[i], params)
      }
    },
    // 请求数据
    getData () {
      let params = JSON.parse(JSON.stringify(this.filterParams))
      if (!params.startTime) {
        this.$tip('请选择时间', 'error')
        this.defaultShow()
        this.drawLine()
        return
      }
      params.groupSonGuid = params.group.guid
      params.groupName = params.group.name
      delete params.group
      this.option.title = this.$apply(this.option.title, this.lineParams.title)
      this.option.color = this.legendMap[this.filterParams.type].map(item => item.textStyle.color)
      GetChartLine(params).then(res => {
        let data = res.data
        this.option.xAxis[0] = this.$apply(this.option.xAxis[0], data.xaxisGroup)
        this.option.yAxis[0] = this.$apply(this.option.yAxis[0], data.yAxis) // 这个yAxis是对象形式
        this.option.legend['data'] = this.legendMap[this.filterParams.type] // 根据type类型设置配置信息
        this.option.series = this.legendMap[this.filterParams.type].map(item => {
          let val = data.seriesGroup.filter(item2 => item2.name === (item.value || item.name))[0]
          val.name = item.name
          return val
        })
        if (this.filterParams.timeIntervalUnit === 'hour' && parseTime(new Date(), '{y}-{m}-{d}') === parseTime(this.filterParams.startTime, '{y}-{m}-{d}')) {
          let num = Number(parseTime(new Date(), '{h}')) + 1
          this.option.series.map(item => {
            item.data = item.data.slice(0, num)
            return item
          })
        }
        this.changeSeries()
        this.drawLine()
      }).catch(error => {
        console.info(error)
      })
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
      this.option.legend['data'] = this.legendMap[this.filterParams.type]
      this.option.series = this.simulateSeries(this.legendMap[this.filterParams.type])
    }
  },
  mounted () {
    // 根据数据类型设置不同颜色配置参数
    this.option.color = this.legendMap[this.filterParams.type].map(item => item.textStyle.color)
    if (!this.filterParams.group || !this.filterParams.group.group) {
      this.changeTitle()
      this.defaultShow()
      this.drawLine()
    }
  },
  computed: {
    ...mapState([
      'groupConsoleId',
      'filterParams'
    ])
  },
  watch: {
  },
  beforeDestroy () {
    eventObject().$off('REFRESH_DATA', this.getData)
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .line-wrap {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 20px;
    background-color: rgba(64, 58, 73, 0.30);
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.10);
  }
  .console__main .line-wrap{
    background-color: rgba(0,0,0,0);
  }
</style>
