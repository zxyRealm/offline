<template>
    <div class="echarts--wrap" :style="{width: width, height: height}" :class="{'empty--data': total === 0}">
        <div :id="eid" :style="{width: width, height: height}"></div>
        <div class="percent-wrap" v-if="type === 'age'">
            <p v-for="(item, $index) in percentList" :key="$index">{{getPercent(item.value)}}</p>
        </div>
    </div>
</template>

<script>
import resize from './mixins/resize'
import { mapState } from 'vuex'

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
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    },
    title: {
      type: String,
      default: ''
    },
    mode: {
      type: String,
      default: 'vertical'
    }
  },
  created () {
  },
  mounted () {
    this.chart = this.$echarts.init(document.getElementById(this.eid))
    this.initData()
  },
  computed: {
    ...mapState(['currentManage']),
    eid () {
      return this.id || 'echarts_' + this.type
    },
    total () {
      let total = 0
      this.data.map(item => {
        total += item.count
      })
      return total
    }
  },
  methods: {
    initData () {
      this.setOptions()
      this.chart.resize()
      this.chart.setOption(this.options)
    },
    // 计算百分比
    getPercent (val) {
      return (this.total ? ((val / this.total) * 100).toFixed(2) : 0) + '%'
    },
    // 根据type定义配置信息
    setOptions () {
      let _this = this
      let seriesData = this.formatData()
      let size = () => {
        return {
          tSize: 14,
          itemHeight: 10,
          itemGap: 6
        }
      }
      let color = []
      switch (this.type) {
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
            '#6201ED']
          break
      }
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
              color: '#ffffff',
              fontSize: size().tSize,
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
            orient: 'vertical',
            top: style.top,
            right: '20%',
            align: 'left',
            itemWidth: 16,
            itemHeight: size().itemHeight,
            itemGap: size().itemGap,
            formatter: function (name) {
              // console.log(arguments, seriesData.filter(item => item.name === name)[0].count)
              let space = ' '
              switch (name) {
                case '0-10':
                  space = '  '
                  break
                case '50以上':
                  space = ''
                  break
              }
              let per = space + _this.getPercent(seriesData.filter(item => item.name === name)[0].value)
              return `${name}${space}         ${per}`
            },
            textStyle: {
              color: '#ffffff',
              fontSize: style.fontSize,
              fontWeight: 'normal'
            },
            icon: 'square',
            data: [
              { name: '0-10', percent: '10%' },
              { name: '10-20', percent: '15%' },
              { name: '20-30',percent: '20%' },
              { name: '30-40', percent: '18%' },
              { name: '40-50', percent: '32%' },
              { name: '50以上', percent: '10%' }
            ]
          },
          series: [
            {
              name: '',
              type: 'pie',
              center: ['28%', '56%'],
              radius: ['36%', '60%'],
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
              color: '#ffffff',
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
            top: 15,
            right: '30%',
            align: 'left',
            itemWidth: 16,
            itemGap: 12,
            textStyle: {
              color: '#ffffff',
              background: '#fff',
              fontSize: '12',
              fontWeight: 'normal'
            },
            icon: 'square',
            shadowColor: 'none',
            data: []
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              center: ['50%', '56%'],
              radius: ['30%', '60%'],
              label: {
                normal: {
                  show: true,
                  fontSize: 12,
                  formatter: '{per|{b}} {per|{d}%}', // '{per|{d}%}',//'{d}%',  //显示百分比
                  position: 'inner',
                  rich: {
                    per: {
                      color: '#fff',
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
    }
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
