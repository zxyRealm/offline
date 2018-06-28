<template>
  <div id="echarts-line" class="line-wrap" :style="{height: lineHeight}">

  </div>
</template>

<script>
import { mapState } from 'vuex'
  export default {
     name: "echarts-line",
     props: ['lineHeight','lineParams'],
     data() {
       return {
         timer: null, //定时器
         data: [],
            option: {
              color:['#F1BB13','#7FC16A','#EE6C4B','#6D2EBB','#2187DF','#DDDDDD'],
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
                icon: 'line',
                data:['进人数','出人数']
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
                  data : ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"]
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
                  name:'进人数',
                  type:'line',
                  smooth:true,
                  itemStyle: {normal: {areaStyle: {type: 'default'}}},
                  data:["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"]
                },
                {
                  name:'出人数',
                  type:'line',
                  areaStyle: {normal: {}},
                  smooth:true,
                  itemStyle: {normal: {areaStyle: {type: 'default'}}},
                  data:["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"]
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
        if(!!this.myChart) {
           this.myChart.resize();
        }
      },
      //定义颜色
      changeColor() {
        this.option.color =this.$store.state.filterParams.type==3 ? ['#F1BB13','#7FC16A','#EE6C4B','#6D2EBB','#2187DF','#DDDDDD'] : ['#2187DF','#6D2EBB','#F1BB13','#7FC16A','#EE6C4B','#DDDDDD'];
      },
      //改变标题
      changeTitle() {
        this.option.title = this.$apply(this.option.title,this.lineParams.title);
      },
      changeSeriesData(){

      },
      //改变Series单个项目配置
      changeSeries() {
        let params = {
           smooth:true,
           itemStyle: {normal: {areaStyle: {type: 'default'}}},
        };
         for(let i =0; i<this.option.series.length;i++) {
              this.$apply(this.option.series[i],params);
         }
      },
      //每一小时刷新一次 这里的考虑不让他重新初始化 = 控制台
      timing(){
        let me = this;
        if(!!this.timer) {
          this.timer = null;
        };
        this.timer = window.setInterval(()  => {
          me.showGenderData();
        },3600000);
      },
      //显示客流量 = 控制台
      showGenderData() {
        this.changeTitle();
        this.option.color = ['#2187DF','#6D2EBB','#F1BB13','#7FC16A','#EE6C4B','#DDDDDD'];
         if(this.$store.state.groupConsoleId == "") {
            this.drawLine();
            return;
         }
        this.$http('/chart/line', {
              groupGuid: this.$store.state.groupConsoleId, //|| '6867A6C096844AD4982F19323B6C9574',
              type: 1,
              dimension: 1,
              startTime: this.$getNowFormatDate(),
              endTime: this.$getNowFormatDate()
              }).then(res => {
              if(res.result == 1){
                this.data = res.data;
                this.option.xAxis[0] = this.$apply(this.option.xAxis[0],this.data.xAxisGroup[0]);
                this.option.yAxis[0] = this.$apply(this.option.yAxis[0],this.data.yAxis);  //这个yAxis是对象形式
                this.option.series = this.$apply( this.option.series,this.data.seriesGroup);
                this.changeSeries();
                this.option.legend['data'] = this.$legendArray(this.data.seriesGroup);
                this.drawLine();
              }
       }).catch(error => {
          console.info(error);
       });
      },
      //请求数据
      getData() {
        let params = this.$store.state.filterParams;
        this.option.title= this.$apply(this.option.title,this.lineParams.title);
        this.$http('/chart/line', {
                groupGuid: params.groupGuid,   //"6867A6C096844AD4982F19323B6C9574",
                type: params.type,
                dimension: params.dimension,
                startTime: params.startTime,
                endTime: params.endTime
              }).then(res => {
              if(res.result == 1){
                this.data = res.data;
                this.option.xAxis[0] = this.$apply(this.option.xAxis[0],this.data.xAxisGroup[0]);
                this.option.yAxis[0] = this.$apply(this.option.yAxis[0],this.data.yAxis);  //这个yAxis是对象形式
                this.option.series = this.$apply( this.option.series,this.data.seriesGroup);
                this.changeSeries();
                this.option.legend['data'] = this.$legendArray(this.data.seriesGroup);
                this.drawLine();
              }
       }).catch(error =>{
         console.info(error);
       });
      },
      //模拟假数据series
      simulateSeries(data) {
        let emptyAaray = [];
        for(let i=0;i<data.length;i++){
           let params = {
                  name: data[i],
                  type:'line',
                  smooth:true,
                  itemStyle: {normal: {areaStyle: {type: 'default'}}},
                  data:["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"]
                };
           emptyAaray.push(params);
        }
        return emptyAaray;
      },
      //默认数据展示 = 可视化
      defaultShow() {
        let type = this.$store.state.filterParams.type;
        if(type == 2) {
            this.option.legend['data'] = ['男','女'];
            this.option.series =  this.simulateSeries(this.option.legend['data']);
        }
        if(type == 3) {
            this.option.legend['data'] = ['0-10','11-20','21-30','31-40','41-50','50以上'];
            this.option.series =  this.simulateSeries(this.option.legend['data']);
        }
        if(type == 4) {
            this.option.legend['data'] = ['多次','单次'];
            this.option.series =  this.simulateSeries(this.option.legend['data']);
        }
      }
    },
    mounted() {
      //this.drawLine();
        if(this.lineParams.title.text == "客流量统计") {
            this.showGenderData();
            this.timing();  //定时刷新数据，一个小时一次
        }else {
            this.changeColor();
            this.changeTitle();
            this.defaultShow();
            this.drawLine();
        }
    },
   computed:{
         ...mapState([
            'groupConsoleId'
         ])
     },
     watch:{
         //监听vuexgroupConsoleId是否改变
        groupConsoleId(val){
            this.showGenderData();
            this.timing();  //定时刷新数据，一个小时一次
        }
     },
    beforeDestroy() {
       if(!!this.timer){window.clearInterval(this.timer);}
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
