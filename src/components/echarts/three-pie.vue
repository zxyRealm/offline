<template>
  <div class="echarts--wrap" :style="{width: width, height: height}">
    <div :id="eid" :style="{width: width, height: height}"></div>
    <div class="percent-wrap" v-if="type === 'age'">
      <p v-for="(item, $index) in dataList" :key="$index">{{getPercent(item.value)}}</p>
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
      chart: null,
      dataList: [
        {value: 10, name: '0-10岁'},
        {value: 25, name: '10-20岁'},
        {value: 30, name: '20-30岁'},
        {value: 20, name: '30-40岁'},
        {value: 20, name: '50岁以上'}
      ],
      options: {}
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
    this.setOptions()
  },
  mounted () {
    this.initData()
  },
  computed: {
    eid () {
      return this.id || 'echarts_' + this.type
    }
  },
  methods: {
    initData () {
      this.chart = echarts.init(document.getElementById(this.eid))
      this.chart.setOption(this.options)
    },
    // 计算百分比
    getPercent (val) {
      let total = 0
      for (let i = 0, l = this.dataList.length; i < l; i++) {
        total += this.dataList[i].value
      }
      return ((val / total) * 100).toFixed(2) + '%'
    },
    // 根据type定义配置信息
    setOptions () {
      if (this.type === 'age') {
        this.options = {
          color: ['#0F9EE9', '#005BC9', '#213A65', '#2C0189', '#8663FF', '#A9B7CE'], // ['#2187DF','#6D2EBB']
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
            itemGap: 10,
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
              data: [
                {value: 10, name: '0-10岁'},
                {value: 25, name: '10-20岁'},
                {value: 30, name: '20-30岁'},
                {value: 20, name: '30-40岁'},
                {value: 20, name: '50岁以上'}
              ]
            }
          ]
        }
      } else {
        this.options = {
          color: ['#0F9EE9', '#4D6FB5'], // ['#2187DF','#6D2EBB']
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
                  formatter: '{per|{b}}\n{per|{d}%}', // '{per|{d}%}',//'{d}%',  //显示百分比
                  position: 'outside',
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
              data: [
                {value: 10, name: '会员'},
                {value: 150, name: '普通顾客'}
              ]
            }
          ]
        }
      }
    }
  },
  watch: {}
}
</script>

<style scoped>
  .echarts--wrap{
    position: relative;
  }
  .percent-wrap{
    position: absolute;
    top: 20px;
    right: 2%;
    display: inline-block;
    font-size: 12px;
    color: #0F9EE9;
  }
  .percent-wrap p{
    line-height: 22px;
  }
</style>
