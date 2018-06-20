<template>
  <div id="echarts-bar" class="bar-wrap">

  </div>
</template>

<script>
  export default {
     name: "echarts-bar",
     props: [],
     data() {
       return {
         data: [],
            option: {
               title: {
                text: '年龄分布',
                 textStyle: {
                  color: '#ffffff',
                  fontSize: '14',
                  fontWeight: 'lighter'
                }
              },
                 textStyle: {   //总体字体样式
                color: "#ffffff"
              },
            color: ['#247CD0'],
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
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
                    data : ['0-10', '11-20', '21-30', '31-40', '41-50', '51以上'],
                    axisTick: {
                        alignWithLabel: true
                    }
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
                    name:'直接访问',
                    type:'bar',
                    barWidth: '60%',
                    itemStyle : { normal: {label : {show: true, position: 'top'}}},
                    data:[10, 52, 200, 334, 390, 330]
                }
            ]
            }
       }
    },
    created() {
       
    },
    methods: {
      //传递数据赋值给series.data
      translateData(data) {
         this.option.series.data = data;
      },
      changexAxisData(data) {
         this.option.xAxis.data = data;
      },
      // 绘制图表
      drawLine() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('echarts-bar'));
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
  .bar-wrap {
    width: 100%;
    box-sizing: border-box;
    padding: 20px;
  }
</style>
