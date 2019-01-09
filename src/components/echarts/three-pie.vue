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
import echarts from 'echarts'
export default {
  name: 'three-pie',
  mixins: [resize],
  data () {
    return {
      percentList: [],
      chart: null,
      dataMap: {
        age: [
          {key: 'child', name: '0-10岁'},
          {key: 'teen', name: '10-20岁'},
          {key: 'youth', name: '20-30岁'},
          {key: 'man', name: '30-40岁'},
          {key: 'middle', name: '40-50岁'},
          {key: 'old', name: '50岁以上'}
        ],
        member: [
          {key: 'not_member', name: '非会员'},
          {key: 'member', name: '会员'}
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
    }
  },
  created () {
  },
  mounted () {
    this.chart = echarts.init(document.getElementById(this.eid))
    this.initData()
  },
  computed: {
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
      this.chart.setOption(this.options)
    },
    // 计算百分比
    getPercent (val) {
      return (this.total ? ((val / this.total) * 100).toFixed(2) : 0) + '%'
    },
    // 根据type定义配置信息
    setOptions () {
      let seriesData = this.formatData()
      if (this.type === 'age') {
      // #979797
        let color = this.total ? [
          '#FFD500',
          '#7ED321',
          '#FF6660',
          '#0F9EE9',
          '#005BC9',
          '#8663FF'
        ] : ['#403E42', '#403E42', '#403E42', '#403E42', '#403E42', '#403E42']
        this.options = {
          color: color, // ['#2187DF','#6D2EBB']
          title: {
            text: this.title,
            textStyle: {
              color: '#ffffff',
              fontSize: '14',
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
            top: 20,
            right: '20%',
            align: 'left',
            itemWidth: 16,
            itemHeight: 10,
            itemGap: 7,
            textStyle: {
              color: '#ffffff',
              fontSize: '12',
              fontWeight: 'normal'
            },
            icon: 'square',
            data: [
              {name: '0-10岁'},
              {name: '10-20岁'},
              {name: '20-30岁'},
              {name: '30-40岁'},
              {name: '40-50岁'},
              {name: '50岁以上'}
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
                  formatter: function (v) {
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
        let color = this.total ? ['#005BC9', '#0F9EE9'] : ['#403E42', '#403E42']
        this.options = {
          color: color, // ['#2187DF','#6D2EBB']
          title: {
            text: this.title,
            textStyle: {
              color: '#ffffff',
              fontSize: '14',
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
              fontSize: '12',
              fontWeight: 'normal'
            },
            icon: 'square',
            data: [
              {
                name: '0-10岁'
              },
              {
                name: '10-20岁'
              }
            ]
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
                    // gray: {
                    //   color: 'rgba(109,46,187,1)',
                    //   fontSize: 12
                    // },
                    // green: {
                    //   color: 'rgba(15,158,233,1)',
                    //   fontSize: 12
                    // },
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
      switch (this.type) {
        case 'age':
          _data = this.dataMap.age.map(item => {
            let num = this.data.filter(item2 => item2.code === item.key.toUpperCase())[0]
            return {
              name: item.name,
              value: num ? num.count : 0
            }
          })
          break
        default:
          _data = this.dataMap.member.map(item => {
            let num = this.data.filter(item2 => item2.code === item.key.toUpperCase())[0]
            return {
              name: item.name,
              value: num ? num.count : 0
            }
          })
          break
      }
      this.percentList = _data
      return _data
    }
  },
  watch: {
    data: {
      handler (val) {
        this.initData()
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
  .empty--data .percent-wrap{
    color: #fff;
  }
  .percent-wrap{
    position: absolute;
    top: 22px;
    right: 2%;
    display: inline-block;
    font-size: 12px;
  }
  .percent-wrap p{
    line-height: 19px;
  }
</style>
