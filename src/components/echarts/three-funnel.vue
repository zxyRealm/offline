<template>
  <div class="echarts--wrap" :style="{width: width, height: height}">
    <div :id="eid" :style="{width: width, height: height}"></div>
  </div>
</template>

<script>
import resize from './mixins/resize'
import echarts from 'echarts'
export default {
  name: 'three-funnel',
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
      default: '' // 年龄比例 、会员比例
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
      this.options = {
        color: ['rgba(15, 158, 233, 1)', 'rgba(15, 158, 233, 0.85)', 'rgba(15, 158, 233, 0.65)', 'rgba(15, 158, 233, 0.45)', 'rgba(15, 158, 233, 0.3)', 'rgba(15, 158, 233, 0.2)'], // ['#2187DF','#6D2EBB']
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
          show: false
          // data: ['N.1 娱乐', 'N.2 娱乐', 'N.3 娱乐', 'N.4 娱乐', 'N.5 娱乐']
        },
        series: [
          {
            name: '访问来源',
            type: 'funnel',
            center: ['30%', '50%'],
            radius: ['35%', '84%'],
            min: 0,
            max: 100,
            minSize: '0%',
            maxSize: '100%',
            sort: 'descending',
            gap: 3,
            label: {
              normal: {
                show: true,
                fontSize: 13,
                formatter: '{b}  {d}%', // '{per|{d}%}',//'{d}%',  //显示百分比
                position: 'outside'
              }
            },
            labelLine: { // 指向线段
              normal: {
                // show: true
              }
            },
            itemStyle: {
              normal: {
                borderWidth: 0
              },
              emphasis: { // 高亮的扇区和标签样式
                label: {
                  show: true
                }
              }
            },
            data: [
              {value: 10, name: 'N.1 娱乐'},
              {value: 18, name: 'N.2 娱乐'},
              {value: 22, name: 'N.3 娱乐'},
              {value: 25, name: 'N.4 娱乐'},
              {value: 80, name: 'N.5 娱乐'}
            ]
          }
        ]
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
