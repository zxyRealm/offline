<template>
  <div id="echarts-line" class="line-wrap" :style="{height: lineHeight}">

  </div>
</template>

<script>
  export default {
     name: "echarts-line",
     props: ['lineHeight','lineParams'],
     data() {
       return {
         data: [],
            option: {
              color:['#F1BB13','#7FC16A','#EE6C4B','#6D2EBB','#2187DF','#DDDDDD'], //['#2187DF','#6D2EBB'，'#F1BB13','#7FC16A','#EE6C4B','#DDDDDD'] 
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
                  fontWeight: 'lighter',
                },
                icon: 'line',   //'img:///static/img/Rectangle 28(1).png',
                data:['邮件营销','联盟广告']
              },
              toolbox: {
                
              },
              grid: {
                left: '1%',
                right: '3%',
                bottom: '1%',
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
                  smooth:true,
                  itemStyle: {normal: {areaStyle: {type: 'default'}}},
                  data:[120, 132, 101, 134, 90, 230, 210]
                },
                {
                  name:'联盟广告',
                  type:'line',
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
      //自适应图表
      resizeEcharts() {
        this.myChart.resize();
      },
      //定义颜色
      changeColor() {
        this.option.color =this.$store.state.filterParams.type==3 ? ['#F1BB13','#7FC16A','#EE6C4B','#6D2EBB','#2187DF','#DDDDDD'] : ['#2187DF','#6D2EBB','#F1BB13','#7FC16A','#EE6C4B','#DDDDDD'];
      },
      //请求数据
      getData() {
        let params = this.$store.state.filterParams;
        this.option.title= this.$apply(this.option.title,this.lineParams.title);
        this.$http('/chart/line', {
              groupGuid: "D680EFBC958C4B4E8E05C4FCA6FF4329",
              type: this.$store.state.filterParams.type,
              dimension: 2,
              startTime: "2018-06-01",
              endTime: "2018-06-06"
              }).then(res => {
              if(res.result == 1){
                this.data = res.data;
                this.option.xAxis[0] = this.$apply(this.option.xAxis[0],this.data.xAxisGroup[0]);
                this.option.yAxis[0] = this.$apply(this.option.yAxis[0],this.data.yAxis);  //这个yAxis是对象形式
                this.option.series = this.$apply( this.option.series,this.data.seriesGroup);
                this.option.legend['data'] = this.$legendArray(this.data.seriesGroup);
                this.drawLine();
              }
       });
      }
    },
    mounted() {
       this.changeColor();
       this.getData();
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
