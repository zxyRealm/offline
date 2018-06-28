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
              tooltip: {    //鼠标悬浮提示消息
                show: false, 
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
                data:['男','女']
              },
              series: [
                  {
                      name:'访问来源',
                      type:'pie',
                      radius: ['50%', '74%'],
                      avoidLabelOverlap: false,
                      label: {
                        normal: {
                          fontSize: 16,
                          show: true,
                          formatter: '{per|{d}%}',//'{d}%',  //显示百分比
                          position: 'outside',
                          rich: {
                            per: {
                              lineHeight: 22,
                              align: 'center'
                            }
                          }
                        },
                        
                      },
                      labelLine: {  //指向线段
                        normal: {
                          show: false,
                          smooth: true
                        }
                      },
                      itemStyle : { 
                        normal:{
                          label : {
                             show: true,
                             position: 'center'
                            },
                        },
                        emphasis: {  //高亮的扇区和标签样式
                            label: {
                              show: true
                            }
                        }
                      },
                      data:[
                          {value:0, name:'男'},
                          {value:0, name:'女'}
                      ]
                 }
              ]
            },
             roseSeries: {
                radius : [50, 80],
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
      //控制台刷新数据更新饼图
      consoleEmit() {
        this.showAgeData();
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
      //解析返回seriesGroup
      installSeriesGroup(data)  {
          data = [
              {
                data: [
                  {
                    name: "男性",
                    value: "0"
                  }
                ],
                name: "男性",
                type: "pie"
              },
              {
                data: [
                  {
                    name: "女性",
                    value: "0"
                  }
                ],
                name: "女性",
                type: "pie"
              }
      ]
        let emptyArray = [];
         for(let i=0;i<data.length;i++){
           emptyArray.push(data[i]['data'][0]);
        }
        this.option.series[0].data = this.$apply(this.option.series[0].data,emptyArray);
        this.option.legend['data'] = this.$legendArray(data);
      },
      //转化数组 = 没有设备时候的id
      transfromArray(data) {
        let arr = [];
          for(let i=0;i<data.length;i++){
            let params = {
                 name: data[i],
                 value: "0"
            };
            arr.push(params);
          }
          this.option.series[0].data = arr;
      },
      //默认数据展示 = 可视化
      defaultShow() {
        let type = this.$store.state.filterParams.type;
        if(type == 3) {
            this.option.legend['data'] = ['0-10','11-20','21-30','31-40','41-50','50以上'];
            this.transfromArray( this.option.legend['data']);
        }
        if(type == 4) {
            this.option.legend['data'] = ['多次','单次'];
            this.transfromArray( this.option.legend['data']);
        }
      },
        //请求数据
       getData() {
        let params = this.$store.state.filterParams;
        this.changeTitle();
        this.$http('/chart/pie',{
              groupGuid: params.groupGuid,
              type: params.type,
              dimension: params.dimension,
              startTime: params.startTime,
              endTime: params.endTime
        }).then(res => {
            if(res.result == 1){
                this.data = res.data;
                if(this.$store.state.filterParams.type == 3){
                     this.installSeriesGroup();
                    this.option.series = this.$apply(this.option.series,this.roseSeries);
                }else {
                   this.installSeriesGroup();
                }
                this.option.legend['data'] = this.$legendArray(this.data.seriesGroup);
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
           this.changeTitle();
           this.defaultShow();
           this.drawPie();
        }
      },
      watch: {
        pieParams(val,oldVal) {
          console.info(val,"dadfddffas");
          return true;
        }
        
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
  canvas {
       z-index: 99999!important;
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
    z-index: 0;
  }
  
</style>
