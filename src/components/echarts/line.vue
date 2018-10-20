<template>
  <div id="echarts-line" class="line-wrap" :style="{height: lineHeight}">
  </div>
</template>

<script>
import {mapState} from 'vuex'
import echarts from 'echarts'

export default {
  name: 'echarts-line',
  props: ['lineHeight', 'lineParams'],
  data () {
    return {
      timer: null, // 定时器
      data: [],
      // 性别比例图例字体样式
      genderLegend: [
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
        }],
      // 到店频次图例字体样式
      shopLegend: [
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
        }],
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
              backgroundColor: 'rgba(114,116,118,1)',// '#6a7985',
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
            smooth: true,
            itemStyle: {normal: {areaStyle: {type: 'default'}}},
            data: ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0']
          },
          {
            name: '出客流',
            type: 'line',
            smooth: true,
            itemStyle: {normal: {areaStyle: {type: 'default'}}},
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
    // 定义颜色
    changeColor () {
      this.option.color = this.$store.state.filterParams.type == 3 ? [
        new echarts.graphic.LinearGradient(
          0, 1, 0, 0,
          [
            {offset: 0, color: 'rgba(241,187,19,0)'},
            {offset: 1, color: 'rgba(189,146,13,1)'}
          ]
        ),
        new echarts.graphic.LinearGradient(
          0, 1, 0, 0,
          [
            {offset: 0, color: 'rgba(127,193,106,0)'},
            {offset: 1, color: 'rgba(90,178,63,1)'}
          ]
        ),
        new echarts.graphic.LinearGradient(
          0, 1, 0, 0,
          [
            {offset: 0, color: 'rgba(238,108,75,0)'},
            {offset: 1, color: 'rgba(204,83,52,1)'}
          ]
        ),
        new echarts.graphic.LinearGradient(
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
        ),
        new echarts.graphic.LinearGradient(
          0, 1, 0, 0,
          [
            {offset: 0, color: 'rgba(255,255,255,0)'},
            {offset: 1, color: 'rgba(216,216,216,1)'}
          ]
        )
      ] : [
        new echarts.graphic.LinearGradient(
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
        ),
        '#F1BB13',
        '#7FC16A',
        '#EE6C4B',
        '#DDDDDD']
    },
    // 改变标题
    changeTitle () {
      this.option.title = this.$apply(this.option.title, this.lineParams.title)
    },
    changeSeriesData () {

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
      this.timer = window.setTimeout(this.timing, 5 * 60 * 1000)// 3600000
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
      if (this.$store.state.groupSelectId == '' || !this.$store.state.groupSelectId) {
        this.drawLine()
        return
      }
      this.$http('/chart/line', {
        groupGuid: this.$store.state.groupSelectId,
        type: 1,
        dimension: 1,
        startTime: this.$getNowFormatDate(),
        endTime: this.$getNowFormatDate()
      }, false).then(res => {
        // let emptyIndex = this.backMinIndex(res.data.seriesGroup[0].data, res.data.seriesGroup[1].data) - 1
        // res.data.xAxisGroup[0].data = res.data.xAxisGroup[0].data.slice(emptyIndex)
        // res.data.seriesGroup[0].data = res.data.seriesGroup[0].data.slice(emptyIndex)
        // res.data.seriesGroup[1].data = res.data.seriesGroup[1].data.slice(emptyIndex)
        this.data = res.data
        this.option.xAxis[0] = this.$apply(this.option.xAxis[0], this.data.xAxisGroup[0])
        this.option.yAxis[0] = this.$apply(this.option.yAxis[0], this.data.yAxis) // 这个yAxis是对象形式
        this.option.series = this.$apply(this.option.series, this.data.seriesGroup)
        this.changeSeries()
        // this.option.legend['data'] = this.$legendArray(this.data.seriesGroup);
        this.drawLine()
      }).catch(error => {
        console.info(error)
      })
    },
    // 请求数据
    getData () {
      let params = this.$store.state.filterParams
      this.option.title = this.$apply(this.option.title, this.lineParams.title)
      this.$http('/chart/line', {
        groupGuid: params.groupGuid,
        type: params.type,
        dimension: params.dimension,
        startTime: params.startTime,
        endTime: params.endTime
      }).then(res => {
        this.data = res.data
        this.option.xAxis[0] = this.$apply(this.option.xAxis[0], this.data.xAxisGroup[0])
        this.option.yAxis[0] = this.$apply(this.option.yAxis[0], this.data.yAxis) // 这个yAxis是对象形式
        this.option.series = this.$apply(this.option.series, this.data.seriesGroup)
        this.changeSeries()
        // this.option.legend['data'] = this.$legendArray(this.data.seriesGroup);
        if (this.$store.state.filterParams.type == 3) {
          this.option.legend['data'] = this.addColor(['0-10岁', '11-20岁', '21-30岁', '31-40岁', '41-50岁', '50岁以上'])
        }
        if (this.$store.state.filterParams.type == 2) {
          this.option.legend['data'] = this.genderLegend
        }
        if (this.$store.state.filterParams.type == 4) {
          this.option.legend['data'] = this.shopLegend
        }
        this.drawLine()
      }).catch(error => {
        console.info(error)
      })
    },
    // 模拟假数据series
    simulateSeries (data) {
      let emptyAaray = []
      for (let i = 0; i < data.length; i++) {
        let params = {
          name: data[i],
          type: 'line',
          smooth: true,
          itemStyle: {normal: {areaStyle: {type: 'default'}}},
          data: ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0']
        }
        emptyAaray.push(params)
      }
      return emptyAaray
    },
    // 给legend字体颜色
    addColor (data) {
      let legendColor = ['#F1BB13', '#7FC16A', '#EE6C4B', '#6D2EBB', '#2187DF', '#DDDDDD']
      let a = []
      for (let i = 0, l = data.length; i < l; i++) {
        let obj = {
          name: data[i],
          textStyle: {
            color: legendColor[i]
          }
        }
        a.push(obj)
      }
      return a
    },
    // 默认数据展示 = 可视化
    defaultShow () {
      let type = this.$store.state.filterParams.type
      if (type == 2) {
        this.option.legend['data'] = this.genderLegend
        this.option.series = this.simulateSeries(['女', '男'])
      }
      if (type == 3) {
        this.option.legend['data'] = this.addColor(['0-10', '11-20', '21-30', '31-40', '41-50', '50以上'])
        this.option.series = this.simulateSeries(['0-10', '11-20', '21-30', '31-40', '41-50', '50以上'])
      }
      if (type == 4) {
        this.option.legend['data'] = this.shopLegend
        this.option.series = this.simulateSeries(['多次', '单次'])
      }
    },
    // 校对两个数组中前n个值都为0,返回最小值序列号
    backMinIndex (arr, arr2) {
      arr = arr || []
      arr2 = arr2 || []
      let [index1, index2] = [0, 0]
      for (let i = 0, len = arr.length; i < len; i++) {
        if (arr[i] > 0) {
          index1 = i
          break
        }
      }
      for (let j = 0, len2 = arr2.length; j < len2; j++) {
        if (arr2[j] > 0) {
          index2 = j
          break
        }
      }
      return index1 > index2 ? index2 : index1
    }
  },
  mounted () {
    if (this.lineParams.title.text == '客流量统计') {
      this.timing() // 定时刷新数据，一个小时一次
    } else {
      this.changeColor()
      if (!this.$store.state.filterParams.groupGuid || (this.$store.state.filterParams.groupGuid == '')) {
        this.changeTitle()
        this.defaultShow()
        this.drawLine()
      }
    }
  },
  computed: {
    ...mapState([
      'groupConsoleId'
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
  },
  beforeRouteLeave (to, from, next) {
    this.cleanTimer()
    next()
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .line-wrap {
    width: 100%;
    box-sizing: border-box;
    padding: 20px;
    background-color: rgba(64, 58, 73, 0.30);
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.10);
  }
  .console__main .line-wrap{
    background-color: rgba(0,0,0,0);
  }
</style>
