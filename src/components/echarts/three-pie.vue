<template>
  <div
    ref="echartsWrap"
    class="echarts--wrap"
    :style="{width: width, height: height}"
    :class="{'empty--data': total === 0}">
  </div>
</template>

<script>
import tool from '@/utils/mixins/tool'
import { mapState } from 'vuex'

export default {
  name: 'three-pie',
  mixins: [tool],
  data () {
    const _this = this
    return {
      percentList: [],
      chart: null,
      colorMap: {
        age: [
          '#28C0B1',
          '#79CF62',
          '#E4DA52',
          '#EA9D49',
          '#2B51ED',
          '#6201ED'
        ],
        member: ['#28C0B1', '#E4DA52'],
        gender: ['#005BC9', '#EA9D49'],
        repeat: ['#005BC9', '#EA9D49']
      },
      dataMap: {
        age: [
          { key: 'inAgeChildTotal', name: '0-10' },
          { key: 'inAgeTeenTotal', name: '11-20' },
          { key: 'inAgeYouthTotal', name: '21-30' },
          { key: 'inAgeManTotal', name: '31-40' },
          { key: 'inAgeMiddleTotal', name: '41-50' },
          { key: 'inAgeOldTotal', name: '50以上' }
        ],
        member: [
          { key: 'not_member', name: '非会员' },
          { key: 'member', name: '会员' }
        ],
        gender: [
          { key: 'inManTotal', name: '男' },
          { key: 'inWomanTotal', name: '女' }
        ],
        repeat: [
          { key: 'inFirstTotal', name: '多次' },
          { key: 'inRepeatTotal', name: '单次' }
        ]
      },
      options: {
        title: {
          textStyle: {
            fontWeight: 'normal'
          }
        },
        tooltip: { // 鼠标悬浮提示消息
          show: false,
          trigger: 'item',
          textStyle: {
            fontSize: 12,
            color: '#fff'
          }
        },
        legend: {
          orient: _this.mode,
          itemWidth: 14,
          selectedMode: false,
          textStyle: {
            fontSize: '12',
            fontWeight: 'normal'
          },
          icon: 'square',
          shadowColor: 'none'
        },
        series: [
          {
            // roseType: 'radius',
            type: 'pie'
          }
        ]
      }
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
    },
    props: {
      default () {
        return {}
      }
    }
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
    // 数据列表value值总和
    total () {
      let total = 0
      this.data.map(item => {
        total += item[this.propsData.value]
      })
      return total
    },

    propsData () {
      return Object.assign({name: 'name', value: 'value'}, this.props)
    },

    // 根据type、theme、mode 定义配置信息
    calculateOption () {
      let _this = this
      // 格式化传入data数据
      let seriesData = this.formatData()
      // 自适应字体大小
      let fontSize = this.setEchartsFontSize()
      let fontColor = this.theme === 'white' ? '#252525' : '#fff'
      // let color = this.total ? _this.colorMap[_this.type] : ['#403E42', '#403E42', '#403E42', '#403E42', '#403E42']

      let option = {
        color: _this.colorMap[_this.type],
        textStyle: {
          color: fontColor
        },
        title: {
          text: _this.title,
          textStyle: {
            color: fontColor,
            fontSize: _this.theme === 'dark' ? fontSize + 2 : 16
          }
        },
        tooltip: {
          show: true
        },
        legend: {
          formatter (name) {
            let per = _this.getPercent(seriesData.filter(item => item.name === name)[0].value) || '0%'
            return `{name|${name}}{per|${per}}`
          },
          textStyle: {
            size: fontSize,
            rich: {
              name: {
                width: fontSize * 4
              },
              per: {
                width: fontSize * 3
              }
            }
          }
        },
        series: [
          {
            labelLine: { // 指向线段
              show: false
            },
            avoidLabelOverlap: false,
            data: seriesData
          }
        ]
      }

      switch (this.theme) {
        case 'dark':
          if (this.type === 'age') {
            switch (this.mode) {
              case 'horizontal':
                option = this.extend(true, option, {
                  legend: {
                    right: 'auto',
                    bottom: '1.4%',
                    padding: 0,
                    itemHeight: 12,
                    itemGap: 8
                  },
                  series: [
                    {
                      label: {
                        show: false
                      },
                      center: ['50%', '32%'],
                      radius: ['36%', '54%']
                    }
                  ]
                })
                break
              default:
                option = this.extend(true, option, {
                  legend: {
                    orient: 'vertical',
                    height: '',
                    right: '6%',
                    bottom: '24%',
                    padding: 0,
                    itemHeight: 14,
                    itemGap: 10
                  },
                  series: [
                    {
                      label: {
                        show: false
                      },
                      center: ['28%', '50%'],
                      radius: ['46%', '78%']
                    }
                  ]
                })
                break
            }
          } else {
            // dark 主题时根据屏幕宽度区分不同模式
            switch (this.mode) {
              case 'horizontal':
                option = this.extend(true, option, {
                  legend: {
                    show: false
                  },
                  series: [
                    {
                      label: {
                        show: true,
                        formatter: '{per|{b}}\n{per|{d}%}',
                        position: 'inner',
                        rich: {
                          per: {
                            fontSize: 12,
                            lineHeight: 14,
                            align: 'left'
                          }
                        }
                      },
                      center: ['50%', '56%'],
                      radius: ['30%', '60%']
                    }
                  ]
                })
                break
              default:
                option = this.extend(true, option, {
                  legend: {
                    show: true,
                    orient: 'vertical',
                    right: '8%',
                    top: '40%',
                    itemGap: 16
                  },
                  series: [
                    {
                      label: {
                        show: false
                      },
                      center: ['20%', '60%'],
                      radius: ['30%', '60%']
                    }
                  ]
                })
                break
            }
          }
          break
        default:
          if (this.type === 'age') {
            option = this.extend(true, option, {
              legend: {
                right: 'auto',
                bottom: '5%',
                padding: [0, 6],
                itemHeight: 14,
                itemGap: 12
              },
              series: [
                {
                  label: {
                    show: false
                  },
                  center: ['50%', '32%'],
                  radius: ['45%', '64%']
                }
              ]
            })
          } else {
            option = this.extend(true, option, {
              legend: {
                show: true,
                bottom: '8%',
                right: 'auto',
                itemWidth: 16,
                itemGap: 14,
                textStyle: {
                  size: 16
                }
              },
              series: [
                {
                  center: ['50%', '40%'],
                  radius: ['60%', '80%'],
                  label: {
                    show: false
                  }
                }
              ]
            })
          }
          break
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
    // 设置echarts 配置信息
    setOptions () {
      // 格式化传入data数据
      let op = this.calculateOption
      this.options = this.extend(true, this.options, op)
      this.chart.setOption(this.options)
    },
    // 格式化传入data 数据
    formatData () {
      let _data = []
      if (!this.dataMap[this.type]) return
      _data = this.dataMap[this.type].map(item => {
        let num
        try {
          num = this.data.filter(item2 => item2[this.propsData.name].toUpperCase() === item.key.toUpperCase())[0]
        } catch (error) {
          console.error(`props attribute ${this.propsData.name} key not exist`)
        }
        return {
          name: item.name,
          value: num ? num[this.propsData.value] : 0
        }
      })
      this.percentList = _data
      return _data
    },
    // 设置echarts 字体大小
    setEchartsFontSize () {
      const offsetWidth = document.body.offsetWidth
      let size = 12
      if (offsetWidth <= 1440) {
        size = 12
      } else if (offsetWidth > 1440 && offsetWidth < 1600) {
        size = 13
      } else {
        size = 14
      }
      if (this.mode !== 'vertical' && this.theme === 'dark') size = size - 1
      return size
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
