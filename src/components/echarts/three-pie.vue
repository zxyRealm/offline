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
          {key: '0-10岁', name: '0-10岁'},
          {key: '11-20岁', name: '10-20岁'},
          {key: '21-30岁', name: '20-30岁'},
          {key: '31-40岁', name: '30-40岁'},
          {key: '41-50岁', name: '40-50岁'},
          {key: '50岁以上', name: '50岁以上'}
        ],
        member: [
          {key: '非会员', name: '普通顾客'},
          {key: '会员', name: '会员'}
        ]
      },
      dataList: [
        {value: 0, name: '0-10岁'},
        {value: 0, name: '10-20岁'},
        {value: 0, name: '20-30岁'},
        {value: 0, name: '30-40岁'},
        {value: 0, name: '50岁以上'}
      ],
      options: {},
      ratio: {
        // 会员比例
        memberRatio: {
          leaguer: { // 会员
            num: 60,
            percent: '60%'
          },
          normal: { // 顾客
            num: 40,
            percent: '40%'
          }
        }
      }
    }
  },
  props: {
    id: {
      type: String,
      default: ''
    },
    data: {
      type: Array,
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
      for (let i = 0, l = this.data.length; i < l; i++) {
        total += this.data[i] ? this.data[i].typeCount : 0
      }
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
        let color = this.total ? ['#0F9EE9', '#005BC9', '#213A65', '#2C0189', '#8663FF', '#8663FF', '#A9B7CE'] : ['#403E42', '#403E42', '#403E42', '#403E42', '#403E42', '#403E42', '#403E42']
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
            formatter: '{a} <br/>{b}: {c} ({d}%)',
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
              {
                name: '0-10岁'
              },
              {
                name: '10-20岁'
              },
              {
                name: '20-30岁'
              },
              {
                name: '30-40岁'
              },
              {
                name: '40-50岁'
              },
              {
                name: '50岁以上'
              }
            ]
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              center: ['28%', '56%'],
              radius: ['35%', '80%'],
              avoidLabelOverlap: false,
              roseType: 'radius',
              label: {
                normal: {
                  show: false,
                  fontSize: 13,
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
        let color = this.total ? ['#0F9EE9', '#4D6FB5'] : ['#403E42', '#403E42']
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
            // position: function (pos, params, dom, rect, size) {
            //   // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
            //   var obj = {top: '10%'}
            //   obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5
            //   return obj
            // },
            textStyle: {
              fontSize: 12
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
      console.log('chart data----', this.data)
      switch (this.type) {
        case 'age':
          _data = this.dataMap.age.map(item => {
            let num = this.data.filter(item2 => item2.type === item.key)[0]
            return {
              name: item.name,
              value: num ? num.typeCount : 0
            }
          })
          break
        default:
          _data = this.dataMap.member.map(item => {
            let num = this.data.filter(item2 => item2.type === item.key)[0]
            return {
              name: item.name,
              value: num ? num.typeCount : 0
            }
          })
          break
      }
      this.percentList = _data
      console.log('chart data', _data)
      return _data
    }
  },
  watch: {
    data: {
      handler (val) {
        this.initData()
        console.log('data change', val)
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
    color: #0F9EE9;
  }
  .percent-wrap p{
    line-height: 19px;
  }
</style>
