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
              },
              tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
              },
              legend: {
                orient: 'vertical',
                x: 'right',
                data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
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
                    emphasis: {
                      show: true,
                      textStyle: {
                        fontSize: '30',
                        fontWeight: 'bold'
                      }
                    }
                  },
                  labelLine: {
                    normal: {
                      show: false
                    }
                  },
                  data:[
                    {value:335, name:'直接访问'},
                    {value:310, name:'邮件营销'},
                    {value:234, name:'联盟广告'},
                    {value:135, name:'视频广告'},
                    {value:1548, name:'搜索引擎'}
                  ]
                }
              ]
            }
          }
      },
      methods: {
        drawPie(){
          // 基于准备好的dom，初始化echarts实例
          let myChart = this.$echarts.init(document.getElementById('echarts-pie'));
          // 绘制图表
          myChart.setOption(this.option);
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
  }
</style>
