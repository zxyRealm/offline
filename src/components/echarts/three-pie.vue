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
            formatter: '{a} <br/>{b}: {c} ({d}%)'
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
              center: ['30%', '50%'],
              radius: ['35%', '84%'],
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
            show: true,
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
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
              radius: ['35%', '60%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: true,
                  fontSize: 13,
                  formatter: '{b}\n{per|{d}%}', // '{per|{d}%}',//'{d}%',  //显示百分比
                  position: 'outside',
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
                {value: 100, name: '会员'},
                {value: 15, name: '普通顾客'}
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
    top: 14px;
    right: 20%;
    display: inline-block;
    font-size: 12px;
    color: #0F9EE9;
  }
  .percent-wrap p{
    line-height: 26px;
  }
</style>
