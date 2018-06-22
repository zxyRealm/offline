<template>
  <div class="console-wrap">
      <div class="content-top">
            <div class="content-top-left">
                <ul class="left-ul">
                    <li>
                        <p>客流汇总信息 </p>
                        <flow-info :type="'left'" :number="inNumber"  class="flow-left"></flow-info>
                        <flow-info :type="'right'"  :number="outNumber" class="flow-right"></flow-info>
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
                        <bar ref="echartsBar" :ageBar="ageBar"></bar>
                    </li>
                </ul>
            </div>
      </div>
      <div class="content-bottom">
            <ul class="customer-left">
                <li v-for="(value,index) in pedestrianInData" :key="index">
                    <customer-info :index="pedestrianInData.length -index" :detailInfo="value"></customer-info>
                </li>
            </ul>
            <ul class="customer-middle">
                <li class="customer-middle-top animation-lwh-show">
                    <img src="/static/img/in-img-1.png"/>
                    <img src="/static/img/in-img-2.png"/>
                    <img src="/static/img/in-img-3.png"/> 
                </li>
                <li class="customer-middle-center"> 
                    <!-- <img src="/static/img/people-info.png"/> -->
                </li>
                <li class="customer-middle-bottom animation-lwh-show">
                    <img src="/static/img/out-img-1.png"/>
                    <img src="/static/img/out-img-2.png"/>
                    <img src="/static/img/out-img-3.png"/> 
                </li>
            </ul>
            <ul class="customer-right">
                 <li v-for="(value,index) in pedestrianOutData" :key="index">
                   <customer-info :index="pedestrianOutData.length-index" :detailInfo="value"></customer-info>
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
  import CustomerInfo from './componets/CustomerInfo.vue'
  export default {
      name: "console",
      components: {FlowInfo,AllTime,bar,pie,lineConsole,CustomerInfo},
      data() {
        return {
            pedestrianInData: [],
            pedestrianOutData: [],
            pieParams: {   //饼图
                type: 3,
                title: {text: '男女流量占比'},
                seriesData: [ {value:0, name:'男性占比'},{value:0, name:'女性占比'}],
                legendData: ['男性占比','女性占比']
            },
            lineParams: { //线图
                title: {text: '客流量统计'}
            },
            outNumber: 0,  
            inNumber: 0,
            ageBar: [],  //柱图
            websocket: {},
        }
      },
      methods: {
          getwebsocket() {
              let me = this;
              let wsServer = 'ws://192.168.20.122:8082'; //服务器地址
              this.websocket = new WebSocket(wsServer);
                // alert(websocket.readyState);//查看websocket当前状态
                this.websocket.onopen = function (evt) {
                    //已经建立连接
                   me.websocket.send("YF_V1-RT6PZ0" + '_channel');  //向服务器发送消息
                };
                this.websocket.onmessage = function (evt) {
                 //收到服务器消息，使用evt.data提取
                  console.info(evt.data,"ddddd");
                  me.resolveDatad(evt.data);
                };
                //  websocket.onclose = function (evt) {
                //   //已经关闭连接
                // };
                // websocket.onerror = function (evt) {
                // //产生异常
                // }; 
               
                let params = {"age":"[8,9,0,1,0,55,0]",
                "female":5,"inNumber":++this.inNumber,
                "male":8,"outNumber":++this.outNumber,
                "pedestrian":[{"age":0,"gender":0,"img":"","order":13,"status":1,"time":1529642071000}],
                "pedestrianNumber":1,"time":1529642071000};
                setInterval(() => {
                     me.resolveDatad22(params);
                },6000);
          },
          resizeFunction() {
            let me = this;
            let table = document.getElementById("echarts-bar");
            table.style.width = me.$refs.bar.offsetWidth +"px";
            table.style.height = me.$refs.bar.offsetHeight +"px";
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
            //解析数据
          resolveDatad22(data) {
            let obj =data;
            //饼图 = 推送实时更新数据
            this.$set(this.pieParams.seriesData[0],"value",obj.male);
            this.$set(this.pieParams.seriesData[1],"value",obj.female);
            //饼图 = 数据更新
            this.$refs.echartsPie.consoleEmit();
            //进出人数
            this.outNumber = obj.outNumber;
            this.inNumber = obj.inNumber;
            //柱状图
            this.ageBar = JSON.parse(obj.age);
            //图片展示
            this.typePedestrian(obj.pedestrian[0]);
          },
          //解析数据
          resolveDatad(data) {
            let obj = JSON.parse(data);
            //饼图 = 推送实时更新数据
            this.$set(this.pieParams.seriesData[0],"value",obj.male);
            this.$set(this.pieParams.seriesData[1],"value",obj.female);
            //进出人数
            this.outNumber = obj.outNumber;
            this.inNumber = obj.inNumber;
            //柱状图
            this.ageBar = JSON.parse(obj.age);
            //图片展示
            this.typePedestrian(obj.pedestrian[0]);
          },
          //判断数据类型，并且限定大小4
          typePedestrian(pedestrian) {
             if(!pedestrian) return;
             if(pedestrian){
                 if(pedestrian.status == 0){ //进客
                    this.pedestrianInData.length==4? (this.pedestrianInData.pop()&&this.pedestrianInData.unshift(pedestrian)):this.pedestrianInData.unshift(pedestrian);
                 }else if(pedestrian.status == 1) { //出客
                    this.pedestrianOutData.length==4? (this.pedestrianOutData.pop()&&this.pedestrianOutData.unshift(pedestrian)):this.pedestrianOutData.unshift(pedestrian);
                 }
             }
          },
          //请求数据
          getData() {
            this.$http('/personData',{
                  deviceKey: "YF_V1-RT6PZ0"
                }).then(res => {
                    if(res.result == 1){
                        this.resolveDatad(res.data);
                        // console.info(res.data,"res.data");
                        setTimeout(() => {
                                 this.getwebsocket();
                        },2000)
                    }
            });
          }
      },
      created() {
        this.getData();
      },
    mounted() {
        let me = this;
        window.addEventListener('resize',me.resizeFunction);
        me.resizeFunction();
    },
      beforeRouteLeave(to, from , next) {
        let me = this;
        window.removeEventListener("resize",me.resizeFunction);
        //关闭websocket链接
        this.websocket.close();
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
                         right: 52px;
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
           width:calc(37% - 20px);
           height: 100%;
           display: inline-block;
            li {
                float: right;
                width: 22%;
                height: 100%;
                background: url(/static/img/background-img-in.png) no-repeat center;
                background-size: 100% 100%;
                margin-right: 10px;
                position: relative;
            }
       }
       .customer-middle  {
           width: 28%;
           height: 100%;
           display: inline-block;
           li {
             display: inline-block;
             height: 100%
           }
           .customer-middle-top,.customer-middle-bottom {
             width: 12%;
             overflow: hidden;
           }
            .customer-middle-top {
                position: relative;
               img {
                   width: 36%;
                   position: absolute;
                   height: 32%;
               }
               img:nth-child(1) {
                    right: 0%;
                    top: 34%;
               }
               img:nth-child(2) {
                   right: 28%;
                    height: 28%;
                    top: 36%;
               }
               img:nth-child(3) {
                   right: 58%;
                   height: 23%;
                   top: 38%;
               }
            }
           .customer-middle-center {
             width: 72%;
             background: url(/static/img/people-info.png) no-repeat center;
             background-size: 100% 100%;
           }
          .customer-middle-bottom {
               
               img {
                   width: 36%;
                   position: absolute;
                   height: 32%;
               }
               img:nth-child(1) {
                    left: 0%;
                    top: 34%;
               }
               img:nth-child(2) {
                   left: 28%;
                    height: 28%;
                    top: 36%;
               }
               img:nth-child(3) {
                   left: 58%;
                   height: 23%;
                   top: 38%;
               }
           }
           
       }
       .customer-right  {
           width: calc(37% - 20px);
           height: 100%;
           display: inline-block;
           float: right;
            li {
                float: left;
                width: 22%;
                height: 100%;
                background: url(/static/img/background-image.png) no-repeat center;
                background-size: 100% 100%;
                margin-right: 12px;
                position: relative;
            }
        &::after {
            content:'';
            width: 0;
            height: 0;
            clear: both;
        }
       }
       //动画效果
       .animation-lwh-show {
            position: relative;
                -webkit-animation-name: skyset;
                -webkit-animation-duration: 3000ms;
                -webkit-animation-iteration-count: infinite; /*无限循环*/
                -webkit-animation-timing-function: linear;
                @-webkit-keyframes skyset {
                    0% { opacity: 0;}
                    50%{ opacity: 0.5;}
                    100% {opacity: 1;}
                }
       }  
   }
</style>
