<template>
  <div id="echarts-line" class="line-wrap" :style="{height: lineHeight}">
  </div>
</template>

<script>
import {mapState} from 'vuex'
import echarts from 'echarts'
import {GetChartLine} from '../../api/visual'
export default {
  name: 'echarts-line',
  props: ['lineHeight', 'lineParams'],
  data () {
    return {
      timer: null, // 定时器
      data: [],
      // 比例图基本数据结构配置
      legendMap: {
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
          text: '进出客流量图',
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
            // color: '#ffffff',
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
            boundaryGap: false,
            axisPointer: { // x轴鼠标移动虚线显示设置
              type: 'line',
              lineStyle: {
                type: 'dashed'
              }
            },
            data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24']
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
            name: '进客流',
            type: 'line',
            // smooth: true,
            // itemStyle: {normal: {areaStyle: {type: 'default'}}},
            data: ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0']
          },
          {
            name: '出客流',
            type: 'line',
            // smooth: true,
            // itemStyle: {normal: {areaStyle: {type: 'default'}}},
            data: ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0']
          }
        ]
      }
    }
  },
  created () {
  },
  methods: {
    // 绘制图表
    drawLine () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('echarts-line'))
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
        smooth: true,
        itemStyle: {normal: {areaStyle: {type: 'default'}}}
      }
      for (let i = 0; i < this.option.series.length; i++) {
        this.$apply(this.option.series[i], params)
      }
    },
    // 每一小时刷新一次 这里的考虑不让他重新初始化 = 控制台
    timing () {
      let me = this
      me.showGenderData()
      this.cleanTimer()
      this.timer = window.setTimeout(this.timing, 1000 * 60 * 5)// 3600000
    },
    cleanTimer () {
      if (this.timer) {
        window.clearTimeout(this.timer)
      }
    },
    // 显示客流量 = 控制台
    showGenderData () {
      this.changeTitle()
      this.option.color = [new echarts.graphic.LinearGradient(
        0, 1, 0, 0,
        [
          {offset: 0, color: 'rgba(166,91,223,0)'},
          {offset: 1, color: 'rgba(109,46,187,1)'}
        ]
      ),
      new echarts.graphic.LinearGradient(
        0, 1, 0, 0,
        [
          {offset: 0, color: 'rgba(34,205,246,0)'},
          {offset: 1, color: 'rgba(15,158,233,1)'}
        ]
      ), '#F1BB13', '#7FC16A', '#EE6C4B', '#DDDDDD']
      if (!this.$store.state.groupSelectId) {
        this.drawLine()
        return
      }
      // console.log('echart line-------', this.filterParams)
      GetChartLine(this.filterParams).then(res => {
        this.data = res.data
        this.option.xAxis[0] = this.$apply(this.option.xAxis[0], this.data.xAxisGroup[0])
        this.option.yAxis[0] = this.$apply(this.option.yAxis[0], this.data.yAxis) // 这个yAxis是对象形式
        // this.option.series = this.$apply(this.option.series, this.data.seriesGroup)
        this.option.series = this.option.legend['data'].map(item => {
          return res.data.seriesGroup.filter(item2 => item2.name === item.name)[0]
        })
        this.changeSeries()
        this.drawLine()
      })
    },
    // 请求数据
    getData () {
      let params = JSON.parse(JSON.stringify(this.filterParams))
      params.endTime = params.endTime + ' 23:59:59'
      params.startTime = params.startTime + ' 00:00:00'
      params.groupSonGuid = params.group.guid
      params.groupName = params.group.name
      delete params.group
      this.option.title = this.$apply(this.option.title, this.lineParams.title)
      GetChartLine(params).then(res => {
        let data = res.data
        this.option.xAxis[0] = this.$apply(this.option.xAxis[0], data.xAxisGroup[0])
        this.option.yAxis[0] = this.$apply(this.option.yAxis[0], data.yAxis) // 这个yAxis是对象形式
        this.option.legend['data'] = this.legendMap[this.filterParams.type] // 根据type类型设置配置信息
        this.option.series = this.legendMap[this.filterParams.type].map(item => {
          let val = data.seriesGroup.filter(item2 => item2.name === (item.value || item.name))[0]
          val.name = item.name
          return val
        })
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
          itemStyle: {normal: {areaStyle: {type: 'default'}}},
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
    if (this.lineParams.title.text == '客流量统计') {
      this.timing() // 定时刷新数据，一个小时一次
    } else {
      // 根据数据类型设置不同颜色配置参数
      this.option.color = this.legendMap[this.filterParams.type].map(item => item.textStyle.color)
      if (!this.filterParams.group || !this.filterParams.group.group) {
        this.changeTitle()
        this.defaultShow()
        this.drawLine()
      }
    }
  },
  computed: {
    ...mapState([
      'groupConsoleId',
      'filterParams'
    ])
  },
  watch: {
    // 监听vuex groupConsoleId是否改变
    groupConsoleId (val) {
      this.timing() // 定时刷新数据，一个小时一次
    }
  },
  beforeDestroy () {
    this.cleanTimer()
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
