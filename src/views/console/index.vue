<template>
  <div class="console-wrap">
      <div class="content-top">
            <div class="content-top-left">
                <ul class="left-ul">
                    <li>
                        <p>客流汇总信息</p>
                        <flow-info :type="'left'"  class="flow-left"></flow-info>
                        <flow-info :type="'right'" class="flow-right"></flow-info>
                    </li>
                    <li>
                        <all-time class="li-all-time"></all-time>
                    </li>
                </ul>
                <div class="left-div" ref="lineConsole">
                    <line-console ref="echartsLine" :line-params='lineParams' ></line-console>
                </div>
            </div>
            <div class="content-top-right">
                <ul class="bottom-ul">
                    <li ref='pie'> 
                        <pie ref="echartsPie" :pieParams="pieParams"></pie>
                    </li>
                    <li ref='bar'>
                        <bar ref="echartsBar"></bar>
                    </li>
                </ul>
            </div>
      </div>
      <div class="content-bottom">
            <ul class="customer-left">
                <li v-for="(value,index) in arrayData" :key="index">
                    <img src="/static/img/people.jpg">
                    <span class="order">{{`第${index}位`}}</span>
                    <div class="customer-detail">
                        <span>女</span>
                        <span>22</span>
                        <span>01/22</span>
                        <span>11:22</span>
                    </div>
                </li>
                <!-- <li>
                </li>
                <li>
                </li>
                <li>
                </li> -->
            </ul>
            <div class="customer-middle">
                <img src="/static/img/people-info.png"/>
            </div>
            <ul class="customer-right">
                 <li v-for="(value,index) in arrayData" :key="index">
                    <img src="/static/img/people.jpg">
                    <span class="order">{{`第${index}位`}}</span>
                    <div class="customer-detail">
                        <span>女</span>
                        <span>22</span>
                        <span>01/22</span>
                        <span>11:22</span>
                    </div>
                </li>
            </ul>
      </div>
  </div>
</template>
<script>
  import FlowInfo from './componets/FlowInfo.vue'
  import AllTime from './componets/AllTime.vue'
  import bar from '@/components/echarts/bar.vue'
  import pie from '@/components/echarts/pie.vue'
  import lineConsole from '@/components/echarts/line.vue'
  export default {
      name: "console",
      components: {FlowInfo,AllTime,bar,pie,lineConsole},
      data() {
        return {
            arrayData: [1,2,3,4],
            pieParams: {
                type: 3,
                title: {text: '男女流量占比'},
                seriesData: [ {value:75, name:'男性占比'},{value:15, name:'女性占比'}],
                legendData: ['男性占比','女性占比']
            },
            lineParams: {
                title: {text: '客流量统计'}
            },
           ageBar: [],
           consoleData: []  //控制台数据
        }
      },
      methods: {
          resizeFunction() {
            let me = this;
            let table = document.getElementById("echarts-bar");
            table.style.height = me.$refs.bar.offsetHeight +"px";
            table.style.width = me.$refs.bar.offsetWidth +"px";
            me.$refs.echartsBar.resizeEcharts();

            let tablePie = document.getElementById("echarts-pie");
            tablePie.style.width = me.$refs.pie.offsetWidth +"px";
            //tablePie.style.height = me.$refs.pie.offsetHeight +"px";
            me.$refs.echartsPie.resizeEcharts();

            let tableLine = document.getElementById("echarts-line");
            tableLine.style.width = me.$refs.lineConsole.offsetWidth +"px";
            tableLine.style.height = me.$refs.lineConsole.offsetHeight +"px";
            me.$refs.echartsLine.resizeEcharts();
          },
          //请求数据
          getData() {
            this.$http('/personData',{
                deviceKey: "D680EFBC958C4B4E8E05C4FCA6FF4329"
                }).then(res => {
                    if(res.result == 1){
                        this.consoleData = res.data;
                    }
            });
          }
      },
      created() {
        //this.getData();
      },
        mounted() {
            let me = this;
            window.addEventListener('resize',me.resizeFunction);
            me.resizeFunction();
        },
      beforeRouteLeave(to, from , next) {
        let me = this;
        window.removeEventListener("resize",me.resizeFunction);
        next();
     }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
   .console-wrap { 
       background: black;
       box-sizing: border-box;
       height: 100%;
       min-width: 1240px;
       .content-top {
          height: 72%;
          .content-top-left,.content-top-right {
            float: left;
          }
          .content-top-left {
            height: 100%;
            width: 60%;
            box-sizing: border-box;
            .left-ul {
                height: 31%;
                li {
                     float: left;
                } 
                li:nth-child(1) {
                     width: 60%;
                     height: 100%;
                     box-sizing: border-box;
                     padding: 20px;
                     border: 1px solid red;
                     position: relative;
                     .flow-info-wrap {
                        top: calc(50% - 17px);
                        position: absolute;
                     }
                     .flow-left {
                        margin-left: 40px;
                     }
                     .flow-right {
                         right: 20px;
                     }
                }
                li:nth-child(2) {
                    position: relative;
                     margin-left: 10px;
                     width: calc(40% - 10px);
                     height: 100%;
                     border: 1px solid red;
                     box-sizing: border-box;
                     .li-all-time {
                        position: absolute;
                        top: calc(50% - 41px);
                     }
                }
            }
            .left-div {
                margin-top: 10px;
                height: calc(69% - 10px);
                border: 1px solid red;
                box-sizing: border-box;
            }
          }
          .content-top-right {
            height: 100%;
            margin-left: 10px;
            width: calc(40% - 10px);
            box-sizing: border-box;
            .bottom-ul {
                height: 100%;
                 li:nth-child(1) {
                     height: 44%;
                     border: 1px solid red;
                }
                li:nth-child(2) {
                     margin-top: 10px;
                     height: calc(56% - 10px);
                     border: 1px solid red;
                     box-sizing: border-box;
                }
            }
          }
       }
       .content-bottom {
          width: 100%;
          margin-top: 10px;
          height: calc(28% - 10px);
          min-height: 168px;
          box-sizing: border-box;
          padding: 20px;
          border: 1px solid green;
       }
       .customer-left  {
           width:calc(40% - 20px);
           height: 100%;
           display: inline-block;
            li {
                float: left;
                width: 22%;
                height: 100%;
                background: url(/static/img/background-image.png) no-repeat center;
                background-size: 100% 100%;
                margin-right: 10px;
                position: relative;
                img {
                    display: block;
                    width: 100%;
                    height: 100%;
                    box-sizing: border-box;
                    padding: 20px 12px;
                }
                span.order {
                    position: absolute;
                    top: -6px;
                    left: calc(50% - 28px);
                    opacity: 0.6;
                    background: #6D2EBB;
                    padding: 0 10px;
                }
                div.customer-detail {
                    position: absolute;
                    bottom: 20px;
                    right: 12px;
                    font-size: 12px;
                    span {
                        text-align: center;
                        line-height: 16px;
                        display: block;
                        width: 46px;
                        height: 16px;
                        margin-bottom: 4px;
                        opacity: 0.4;
                        background: #000000;
                    }
                }
            }
       }
       .customer-middle  {
           width: 20%;
           height: 100%;
           display: inline-block;
           img {
               height: 156px;
           }
       }
       .customer-right  {
           width: calc(40% - 20px);
           height: 100%;
           display: inline-block;
           float: right;
            li {
                float: right;
                width: 22%;
                height: 100%;
                background: url(/static/img/background-image.png) no-repeat center;
                background-size: 100% 100%;
                margin-left: 10px;
                position: relative;
                img {
                    display: block;
                    width: 100%;
                    height: 100%;
                    box-sizing: border-box;
                    padding: 20px 12px;
                }
                span.order {
                    position: absolute;
                    top: -6px;
                    left: calc(50% - 28px);
                    opacity: 0.6;
                    background: #6D2EBB;
                    padding: 0 10px;
                }
                div.customer-detail {
                    position: absolute;
                    bottom: 20px;
                    right: 12px;
                    font-size: 12px;
                    span {
                        text-align: center;
                        line-height: 16px;
                        display: block;
                        width: 46px;
                        height: 16px;
                        margin-bottom: 4px;
                        opacity: 0.4;
                        background: #000000;
                    }
                }
            }
       }
   }
</style>
