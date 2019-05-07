<template>
  <div
    ref="echartsWrap"
    class="echarts--wrap"
    :style="{width: width, height: height}"
    :class="{'empty--data': total === 0}">
  </div>
</template>

<script>
import resize from './mixins/resize'
import { mapState } from 'vuex'

const setEchartsFontSize = () => {
  let offsetWidth = document.body.offsetWidth
  if (offsetWidth <= 1440) {
    return 12
  } else if (offsetWidth > 1440 && offsetWidth < 1600) {
    return 13
  } else {
    return 14
  }
}
export default {
  name: 'three-pie',
  mixins: [resize],
  data () {
    return {
      percentList: [],
      chart: null,
      dataMap: {
        age: [
          { key: 'child', name: '0-10' },
          { key: 'teen', name: '10-20' },
          { key: 'youth', name: '20-30' },
          { key: 'man', name: '30-40' },
          { key: 'middle', name: '40-50' },
          { key: 'old', name: '50以上' }
        ],
        member: [
          { key: 'not_member', name: '非会员' },
          { key: 'member', name: '会员' }
        ],
        gender: [
          { key: 'man', name: '男' },
          { key: 'woman', name: '女' }
        ],
        repeat: [
          { key: 'once', name: '多次' },
          { key: 'more', name: '单次' }
        ]
      },
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
      default: 'age' // 年龄比例 、会员比例
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
    mode: {
      type: String,
      default: 'vertical' // vertical horizontal
    },
    theme: { // 主题颜色
      type: String,
      default: 'white'
    }
  },
  created () {
  },
  mounted () {
    this.initData()
    window.addEventListener('resize', this.setOptions)
  },
  computed: {
    ...mapState(['currentManage']),
    randomId () {
      return `three-bar-${this.type}_${Math.random().toString()}`
    },
    total () {
      let total = 0
      this.data.map(item => {
        total += item.count
      })
      return total
    },
    modeOption () {
      let option = {
        height: '',
        right: '6%',
        bottom: '24%',
        padding: 0,
        itemHeight: 14,
        itemGap: 10,
        center: ['28%', '50%'],
        radius: ['46%', '82%']
      }
      if (this.mode === 'horizontal') {
        option = {
          right: 'auto',
          bottom: '1.5%',
          padding: 0,
          itemHeight: 13,
          itemGap: 8,
          center: ['50%', '32%'],
          radius: ['36%', '60%']
        }
        if (this.theme === 'white') option = {
          right: 'auto',
          bottom: '5%',
          padding: [0, 6],
          itemHeight: 14,
          itemGap: 12,
          center: ['50%', '32%'],
          radius: ['44%', '80%']
        }
      }
      return option
    }
  },
  methods: {
    initData () {
      /*
      *
      * 重设echarts配置信息option legend: { orient: 'horizontal', right: 'auto' } 后，图例内容不能居中显示
      * 将echarts 实例销毁重新设置相同设置信息是可以使 图例内容居中的
      */

      if (!document.getElementById(this.randomId)) {
        let container = document.createElement('div')
        container.id = this.randomId
        container.style.width = this.width
        container.style.height = this.height
        this.$refs.echartsWrap.appendChild(container)
      }
      this.$nextTick(() => {
        this.chart = this.$echarts.init(document.getElementById(this.randomId))
        this.setOptions()
        this.chart.resize()
        this.chart.setOption(this.options)
      })

    },
    // 计算百分比
    getPercent (val) {
      return (this.total ? ((val / this.total) * 100).toFixed(2) : 0) + '%'
    },
    // 根据type定义配置信息
    setOptions () {
      let _this = this
      let seriesData = this.formatData()
      console.log('series------', this.type, seriesData)
      let size = () => {
        return {
          tSize: 14,
          itemHeight: 10,
          itemGap: 6
        }
      }
      let [color ]= [[]]
      // 是否显示label信息
      let showLabel = this.theme === 'dark'
      let fontSize = setEchartsFontSize()
      let fontColor = '#252525'
      if (this.theme === 'dark') fontColor = '#fff'
      if (this.mode !== 'vertical' && this.theme === 'dark') fontSize = fontSize - 1
      switch (this.type) {
        case 'repeat':
        case 'gender':
          color = ['#005BC9', '#EA9D49']
          break
        case 'member':
          color = ['#28C0B1', '#E4DA52']
          break
        case 'age':
          color = [
            '#28C0B1',
            '#79CF62',
            '#E4DA52',
            '#EA9D49',
            '#2B51ED',
            '#6201ED'
          ]
          break
      }
      let op = this.modeOption
      // if (!this.total) color = ['#403E42', '#403E42', '#403E42', '#403E42', '#403E42']
      if (this.type === 'age') {
        let style = {
          fontSize: 12,
          top: '20%'
        }
        if (this.currentManage.type === 3) {
          style = {
            fontSize: 13,
            top: '24%'
          }
        }
        this.options = {
          color: color,
          title: {
            text: this.title,
            textStyle: {
              color: fontColor,
              fontSize: this.theme === 'dark' ? fontSize + 2 : 16,
              fontWeight: 'normal'
            }
          },
          tooltip: { // 鼠标悬浮提示消息
            show: true,
            trigger: 'item',
            formatter: '{b}: {c}',
            textStyle: {
              fontSize: 12
            }
          },
          legend: {
            orient: _this.mode,
            height: op.height,
            bottom: op.bottom,
            right: op.right,
            itemWidth: 14,
            itemHeight: fontSize,
            itemGap: op.itemGap,
            selectedMode: false,
            formatter: function (name) {
              let per = _this.getPercent(seriesData.filter(item => item.name === name)[0].value) || '0%'
              return `{name|${name}}{per|${per}}`
            },
            textStyle: {
              color: fontColor,
              padding: op.padding,
              fontSize: fontSize,
              fontWeight: 'normal',
              rich: {
                name: {
                  width: fontSize * 4,
                  fontSize: fontSize
                },
                per: {
                  width: fontSize * 3,
                  fontSize: fontSize
                }
              }
            },
            icon: 'square',
            data: [
              { name: '0-10' },
              { name: '10-20' },
              { name: '20-30' },
              { name: '30-40' },
              { name: '40-50' },
              { name: '50以上' }
            ]
          },
          series: [
            {
              name: '',
              type: 'pie',
              center: op.center,
              radius: op.radius,
              avoidLabelOverlap: false,
              roseType: 'radius',
              label: {
                normal: {
                  show: false,
                  fontSize: 12,
                  formatter: function () {
                    return ''
                  }, // '{per|{d}%}',//'{d}%',  //显示百分比
                  position: 'outside'
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
              data: seriesData
            }
          ]
        }
      } else {
        this.options = {
          color: color,
          title: {
            text: this.title,
            textStyle: {
              color: fontColor,
              fontSize: size().tSize,
              fontWeight: 'normal'
            }
          },
          tooltip: { // 鼠标悬浮提示消息
            show: false,
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)',
            textStyle: {
              fontSize: 12,
              color: '#fff'
            }
          },
          legend: {
            orient: 'vertical',
            bottom: '15%',
            right: 'auto',
            itemWidth: 16,
            itemGap: 12,
            formatter: function (name) {
              let per = _this.getPercent(seriesData.filter(item => item.name === name)[0].value) || '0%'
              return `{name|${name}}{per|${per}}`
            },
            textStyle: {
              color: fontColor,
              fontSize: '12',
              fontWeight: 'normal',
              rich: {
                name: {
                  width: fontSize * 4,
                  fontSize: fontSize
                },
                per: {
                  width: fontSize * 3,
                  fontSize: fontSize
                }
              }
            },
            icon: 'square',
            shadowColor: 'none',
            data: _this.dataMap[_this.type]
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              center: ['50%', '56%'],
              radius: ['30%', '60%'],
              label: {
                normal: {
                  show: showLabel,
                  fontSize: 12,
                  formatter: '{per|{b}} {per|{d}%}', // '{per|{d}%}',//'{d}%',  //显示百分比
                  position: 'inner',
                  rich: {
                    per: {
                      color: fontColor,
                      fontSize: 12,
                      align: 'left'
                    }
                  }
                }
              },
              labelLine: { // 指向线段
                normal: {
                  show: true
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
              data: seriesData
            }
          ]
        }
      }
      this.chart.setOption(this.options)
    },
    formatData () {
      let _data = []
      if (!this.dataMap[this.type]) return
      _data = this.dataMap[this.type].map(item => {
        let num = this.data.filter(item2 => item2.code === item.key.toUpperCase())[0]
        return {
          name: item.name,
          value: num ? num.count : 0
        }
      })
      this.percentList = _data
      return _data
    }
  },
  watch: {
    data: {
      handler () {
        this.initData()
      },
      deep: true
    },
    currentManage: {
      handler () {
        this.initData()
      },
      deep: true
    },
    mode () {
      this.setOptions()
      if (this.chart) {
        this.chart.dispose()
        this.initData()
      }
    }
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.setOptions)
  }
}
</script>

<style lang="scss" scoped>
  .echarts--wrap {
    position: relative;
  }

  .empty--data .percent-wrap {
    color: #fff;
  }

  .percent-wrap {
    position: absolute;
    top: calc(20%);
    right: 2%;
    display: inline-block;
    font-size: 12px;
    p {
      line-height: 18px;
    }
  }

  .single {
    .percent-wrap {
      top: calc(25%);
      font-size: 13px;
      p {
        line-height: 19px;
      }
    }
  }
</style>
