<template>
    <div id="echarts-pie" class="pie-wrap" :class="pieParams.type!=3 ? 'pie-wing':''">
        
    </div>
</template>
<script>
    export default {
      name: "echarts-pie",
      props: ['pieParams'],
      data(){
          return {
            type: 0,  //判断是否显示外阴影
            option: {
              color:['#F1BB13','#7FC16A','#EE6C4B','#6D2EBB','#2187DF','#DDDDDD'], //['#2187DF','#6D2EBB']
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
                  fontWeight: 'lighter',
                },
                icon:'square',
                data:['男性占比','女性占比']
              },
              series: [
                  {
                      name:'访问来源',
                      type:'pie',
                      radius: ['50%', '70%'],
                      avoidLabelOverlap: false,
                      label: {
                        normal: {
                          show: true,
                          formatter:'{d}%',  //显示百分比
                          position: 'outside'
                        },
                      },
                      labelLine: {
                        normal: {
                          show: false
                        }
                      },
                      itemStyle : { normal: {label : {show: true, position: 'center'}}},
                      data:[]
                 }
              ]
            },
             roseSeries: {
                radius : [50, 100],
                center : ['50%', '50%'],
                roseType: 'area',
                type: 'pie'
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
          if(!!this.myChartPie){
            this.myChartPie.resize();
          }
       },
       //定义颜色
      changeColor() {
        this.option.color = this.$store.state.filterParams.type==3 ? ['#F1BB13','#7FC16A','#EE6C4B','#6D2EBB','#2187DF','#DDDDDD'] : ['#2187DF','#6D2EBB','#F1BB13','#7FC16A','#EE6C4B','#DDDDDD'];
      },
      //改变标题
      changeTitle() {
        this.option.title= this.$apply(this.option.title,this.pieParams.title);
      },
      //年龄分布数据渲染 = 控制台
      showAgeData() {
          this.changeTitle();
          this.option.color = ['#2187DF','#6D2EBB','#F1BB13','#7FC16A','#EE6C4B','#DDDDDD'];
          this.option.series[0].label.fontWeight = "bolder";
          this.option.series[0].data = this.pieParams.seriesData;
          this.option.legend.data = this.pieParams.legendData;
          this.drawPie();
      },
        //请求数据
       getData() {
        let params = this.$store.state.filterParams;
        this.changeTitle();
        this.$http('/chart/pie',{
              groupGuid: "D680EFBC958C4B4E8E05C4FCA6FF4329",
              type: this.$store.state.filterParams.type,
              dimension: 2,
              startTime: "2018-06-01",
              endTime: "2018-06-06"
        }).then(res => {
            if(res.result == 1){
                this.data = res.data;
                if(this.$store.state.filterParams.type == 3){
                    this.option.series = this.$apply( this.option.series[0],this.data.seriesGroup[0]);
                    this.option.legend['data'] = this.$legendArray(this.data.seriesGroup[0].data);
                    this.option.series = this.$apply(this.option.series,this.roseSeries);
                }else {
                    this.option.series = this.$apply( this.option.series,this.data.seriesGroup);
                    this.option.legend['data'] = this.$legendArray(this.data.seriesGroup);
                }
                this.drawPie();
            }
        });
        }
      },
      mounted(){
        if(this.pieParams.title.text == "男女流量占比") {
          let me = this;
          setTimeout(function(){
               me.showAgeData();
          },300);
        }else {
           this.changeColor();
           this.getData();
        }
      },
      watch: {
        
      }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .pie-wrap{
     width: 100%;
     height: 230px;
     box-sizing: border-box;
     padding: 20px;
     background: url('/static/img/pie-background.png') no-repeat center center;
     background-size: 160px 160px; 
     position: relative;
  }
  .pie-wing::after {
    content: '';
    width: 100%;
    height: 230px;
    background: url(/static/img/pie-left-right.png) no-repeat center center;
    -webkit-background-size: 170px 170px;
    background-size: 300px  22px;
    position: absolute;
    top: 0;
    left:0;
  }
  
</style>
