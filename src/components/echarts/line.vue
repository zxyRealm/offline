<template>
  <div id="echarts-line" class="line-wrap" :style="{height: lineHeight}">

  </div>
</template>

<script>
  export default {
     name: "echarts-line",
     props: ['lineHeight'],
     data() {
       return {
         data: [],
            option: {
              textStyle: {   //总体字体样式
                color: "#ffffff"
              },
              title: {
                text: '进出客流量图',
                textStyle: {
                  color: '#ffffff',
                  fontSize: '14',
                  fontWeight: 'lighter'
                }
              },
              tooltip : {
                trigger: 'axis',
                axisPointer: {
                  type: 'cross',
                  label: {
                    backgroundColor: '#6a7985'
                  }
                }
              },
              legend: {
                right: 0,  //排序方式
                 textStyle: {  //字体设置
                  color: '#ffffff',
                  fontSize: '12',
                  fontWeight: 'lighter'
                },
                data:['邮件营销','联盟广告']
              },
              toolbox: {
                
              },
              grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
              },
              xAxis : [
                {
                  type : 'category',
                  boundaryGap : false,
                  axisPointer: {  //x轴鼠标移动虚线显示设置
                    type: 'line',
                    lineStyle: {
                      type: 'dashed'
                    }
                  },
                  data : ['周一','周二','周三','周四','周五','周六','周日']
                }
              ],
              yAxis : [
                {
                  type : 'value',
                  axisPointer: {  //y轴鼠标移动虚线不显示
                    show: false
                  },
                  splitLine:{     //y轴横线不显示 
                    show: false
                    }
                }
              ],
              series : [
                {
                  name:'邮件营销',
                  type:'line',
                  // stack: '总量',
                  areaStyle: {
                    normal: {
                      color : "rgba(0,0,0,0)", // 图表中各个图区域的边框线拐点颜色
                                lineStyle: {
                                    color:"#A65ADF" // 图表中各个图区域的边框线颜色
                                },
                        type: 'default',
                        opacity: 0.8, // 图表中各个图区域的透明度
                        color: "#A65ADF" // 图表中各个图区域的颜色
                    }
                  },
                  smooth:true,
                  itemStyle: {normal: {areaStyle: {type: 'default'}}},
                  backgroundColor: {

                  },
                  data:[120, 132, 101, 134, 90, 230, 210]
                },
                {
                  name:'联盟广告',
                  type:'line',
                  // stack: '总量',
                  areaStyle: {normal: {}},
                   smooth:true,
                   itemStyle: {normal: {areaStyle: {type: 'default'}}},
                  data:[220, 182, 191, 234, 290, 330, 310]
                }
              ]
            }
       }
    },
    created() {
       
    },
    methods: {
      // 绘制图表
      drawLine() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('echarts-line'));
        myChart.setOption(this.option);
        this.myChart = myChart;
      },
      resizeEcharts() {
        this.myChart.resize();
       
      },
      //请求数据
      getLineData() {
        let params = this.$store.state.filterParams;
        this.$http({
         url: '',
         data: params
       }).then(res => {
          if(res.result == 1){
             this.data = res.data;
             this.option.xAxis = this.data.xAxisGroup;
             this.option.yAxis = this.data.yAxis;  //这个yAxis是对象形式
             this.option.series = this.data.seriesGroup;
          }
       });
      }
    },
    mounted() {
       this.drawLine();
    }

  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .line-wrap {
    width: 100%;
    box-sizing: border-box;
    padding: 20px;
  }
</style>
