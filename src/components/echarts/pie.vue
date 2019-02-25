<template>
  <div id="echarts-pie" class="pie-wrap pie-console" :class="pieParams.type===3 ? '':'pie-wrap-circle'">
    <!--:class="pieParams.type!=3 ? 'pie-wing':''"-->
  </div>
</template>
<script>
import {mapState} from 'vuex'
import {GetChartPie} from '../../api/visual'
import {eventObject} from '../../utils/event'
export default {
  name: 'echarts-pie',
  props: ['pieParams'],
  data () {
    return {
      type: 0, // 判断是否显示外阴影
      // 饼状图数据基本结构配置
      legendMap: {
        sex: [
          {
            name: '女',
            textStyle: {color: 'rgba(109,46,187,1)'}
          },
          {
            name: '男',
            textStyle: {color: 'rgba(15,158,233,1)'}
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
            textStyle: {color: 'rgba(109,46,187,1)'}
          },
          {
            name: '单次',
            textStyle: {color: 'rgba(15,158,233,1)'}
          }
        ]
      },
      option: {
        color: [
          '#FFD500',
          '#7ED321',
          '#FF6660',
          '#0F9EE9',
          '#005BC9',
          '#8663FF'
        ], // ['#2187DF','#6D2EBB']
        title: {
          text: '性别比例图',
          textStyle: {
            color: '#ffffff',
            fontSize: '14',
            fontWeight: 'normal'
          }
        },
        tooltip: { // 鼠标悬浮提示消息
          show: false,
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          x: 'right',
          right: 0,
          align: 'left',
          itemWidth: 16,
          itemGap: 12,
          textStyle: {
            color: '#ffffff',
            fontSize: '12',
            fontWeight: 'normal'
          },
          icon: 'square',
          data: [
            {
              name: '女',
              textStyle: {color: '#6D2EBB'}
            },
            {
              name: '男',
              textStyle: {color: '#2187DF'}
            }
          ]
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '74%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: true,
                fontSize: 13,
                formatter: function (v) {
                  if (v.name === '女' || v.name === '多次') {
                    return '{gray|' + v.percent + '%' + '}'
                  } else if (v.name === '男' || v.name === '单次') {
                    return '{green|' + v.percent + '%' + '}'
                  } else {
                    return v.percent + '%'
                  }
                }, // '{per|{d}%}',//'{d}%',  //显示百分比
                position: 'outside',
                // padding: [30, 0, 0, 0],
                rich: {
                  gray: {
                    color: 'rgba(109,46,187,1)',
                    fontSize: 16
                  },
                  green: {
                    color: 'rgba(15,158,233,1)',
                    fontSize: 16
                  },
                  per: {
                    // lineHeight: 22,
                    // color: '#fff',
                    fontSize: 12,
                    align: 'center'
                  }
                }
              }
            },
            labelLine: { // 指向线段
              normal: {
                show: false,
                smooth: true
              }
            },
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: 'center'
                }
              },
              emphasis: { // 高亮的扇区和标签样式
                label: {
                  show: true
                }
              }
            },
            data: [
              {value: 0, name: '女'},
              {value: 0, name: '男'}
            ]
          }
        ]
      },
      roseSeries: {
        radius: [42, 70],
        center: ['50%', '50%'],
        // roseType: 'area'
        roseType: 'radius'
      }
    }
  },
  methods: {
    drawPie () {
      // 基于准备好的dom，初始化echarts实例
      let myChartPie = this.$echarts.init(document.getElementById('echarts-pie'))
      // 绘制图表
      myChartPie.setOption(this.option)
      this.myChartPie = myChartPie
    },
    // 自适应
    resizeEcharts () {
      if (this.myChartPie) {
        this.myChartPie.resize()
      }
    },
    // 定义颜色
    changeColor () {
      this.option.color = this.legendMap[this.filterParams.type].map(item => item.textStyle.color)
    },
    // 改变标题
    changeTitle () {
      this.option.title = this.$apply(this.option.title, this.pieParams.title)
    },
    // 解析返回seriesGroup
    installSeriesGroup (data) {
      data = data.seriesGroup
      this.option.legend['data'] = this.legendMap[this.filterParams.type]
      this.option.series[0].data = this.option.legend['data'].map(item => {
        return data.filter(item2 => item2.name === item.name)[0].data[0]
      })
    },
    // 转化数组 = 没有设备时候的id
    transformArray (data) {
      let arr = []
      for (let i = 0; i < data.length; i++) {
        let params = {
          name: data[i].name,
          value: '0'
        }
        arr.push(params)
      }
      this.option.series[0].data = arr
    },
    // 默认数据展示 = 可视化
    defaultShow () {
      this.option.legend['data'] = this.legendMap[this.filterParams.type]
      this.transformArray(this.legendMap[this.filterParams.type])
    },
    // 请求数据
    getData () {
      let params = JSON.parse(JSON.stringify(this.filterParams))
      if (!params.startTime) {
        this.defaultShow()
        this.drawPie()
        return
      }
      params.groupSonGuid = params.group.guid
      params.groupName = params.group.name
      delete params.group
      this.changeTitle()
      GetChartPie(params).then(res => {
        this.data = res.data
        if (this.filterParams.type === 'age') {
          this.installSeriesGroup(res.data)
          this.option.series[0] = this.$apply(this.option.series[0], this.roseSeries)
        } else {
          this.installSeriesGroup(res.data)
        }
        this.drawPie()
      })
    }
  },
  created () {
    eventObject().$on('REFRESH_DATA', this.getData)
  },
  mounted () {
    if (this.pieParams.title.text === '男女流量占比') {
      let me = this
      setTimeout(function () {
        me.showAgeData()
      }, 300)
    } else {
      this.changeColor()
      if (!this.filterParams.group || !this.filterParams.group.guid || !this.filterParams.startTime) {
        this.changeTitle()
        this.defaultShow()
        this.drawPie()
      }
    }
  },
  computed: {
    ...mapState(['filterParams'])
  },
  watch: {
    pieParams (val, oldVal) {
      this.showAgeData()
      return true
    }
  },
  beforeDestroy () {
    eventObject().$off('REFRESH_DATA', this.getData)
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .pie-wrap {
    width: 100%;
    height: 230px;
    box-sizing: border-box;
    padding: 20px;
    position: relative;
    background-color: rgba(64, 58, 73, 0.30);
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.10);
  }
  .console__main .pie-wrap{
    background-color: rgba(0,0,0,0);
  }
  .pie-wrap-circle::before {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    right: 0px;
    background: url(../../assets/public/pie-background2.png) no-repeat center center;
    background-size: 168px;
    animation-name: piepie;
    animation-duration: 10000ms;
    animation-iteration-count: infinite; /*无限循环*/
    animation-timing-function: linear;
    @keyframes piepie {
      0% {
        transform: rotate(0deg);
      }

      100% {
        transform: rotate(360deg);
      }
    }
  }

  .pie-wing::after {
    content: '';
    width: 100%;
    height: 230px;
    background: url(../../assets/public/pie-left-right.png) no-repeat center center;
    -webkit-background-size: 170px 170px;
    background-size: 300px 22px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
  }

</style>
