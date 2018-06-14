<template>
    <div id="echarts-pie" class="pie-wrap">

    </div>
</template>

<script>
    export default {
      name: "echarts-pie",
      data(){
          return {
            option: {
              title: {
                text: '性别比例图',
                 textStyle: {
                  color: '#ffffff',
                  fontSize: '14',
                  fontWeight: 'lighter'
                }
              },
              tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
              },
              legend: {
                orient: 'vertical',
                x: 'right',
                right: 0,
                textStyle: {
                  color: '#ffffff',
                  fontSize: '12',
                  fontWeight: 'lighter'
                },
                data:['男','女']
              },
              series: [
                  {
                      name:'访问来源',
                      type:'pie',
                      radius: ['50%', '70%'],
                      avoidLabelOverlap: false,
                      label: {
                        normal: {
                          show: false,
                          position: 'center'
                        },
                        // emphasis: {  //是否在斌状图中心显示信息
                        //   show: true,
                        //   textStyle: {
                        //     fontSize: '30',
                        //     fontWeight: 'bold'
                        //   }
                        // }
                      },
                      labelLine: {
                        normal: {
                          show: false
                        }
                      },
                      data:[
                        {value:335, name:'男'},
                        {value:1548, name:'女'}
                     ]
                 }
              ]
            }
          }
      },
      methods: {
        drawPie(){
          // 基于准备好的dom，初始化echarts实例
          let myChartPie = this.$echarts.init(document.getElementById('echarts-pie'));
          // 绘制图表
          myChartPie.setOption(this.option);
          this.myChartPie = myChartPie;
        },
        //自适应
        resizeEcharts() {
         this.myChartPie.resize();
       },
        //请求数据
       getPieData() {
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
      mounted(){
        this.drawPie();
      }
    }
</script>

<style scoped>
  .pie-wrap{
     width: 100%;
     height: 230px;
     box-sizing: border-box;
     padding: 20px;
  }
</style>
