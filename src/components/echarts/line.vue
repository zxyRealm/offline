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
              title: {
                text: '进出客流量图',
                color: '#ffffff'
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
                  data : ['周一','周二','周三','周四','周五','周六','周日']
                }
              ],
              yAxis : [
                {
                  type : 'value'
                }
              ],
              series : [
                {
                  name:'邮件营销',
                  type:'line',
                  stack: '总量',
                  areaStyle: {normal: {}},
                  data:[120, 132, 101, 134, 90, 230, 210]
                },
                {
                  name:'联盟广告',
                  type:'line',
                  stack: '总量',
                  areaStyle: {normal: {}},
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
      },
      //请求数据
      getLineData() {
        let params = {

        };
        this.$http({
         url: '',
         data: ''
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
