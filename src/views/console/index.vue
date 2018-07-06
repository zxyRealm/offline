<template>
  <div class="console-wrap">
    <div class="tip" v-if="!state">
      <div @click="selectGroupId">暂无数据，请选择您的社群和设备</div>
    </div>
    <div class="content-top" v-if="state">
      <div class="content-top-left">
        <ul class="left-ul corner-bg">
          <li>
            <p>客流汇总信息 </p>
            <flow-info :type="'left'" :number="inNumber" class="flow-left"></flow-info>
            <flow-info :type="'right'" :number="outNumber" class="flow-right"></flow-info>
          </li>
          <li>
            <all-time class="li-all-time"></all-time>
          </li>
        </ul>
        <div class="left-div corner-bg" ref="lineConsole">
          <line-console ref="echartsLine" :line-params='lineParams'></line-console>
        </div>
      </div>
      <div class="content-top-right">
        <ul class="bottom-ul">
          <li ref='pie' class="corner-bg">
            <pie ref="echartsPie" :pieParams="pieParams"></pie>
          </li>
          <li ref='bar' class="corner-bg">
            <bar ref="echartsBar" :ageBar="ageBar"></bar>
          </li>
        </ul>
      </div>
    </div>
    <div class="content-bottom corner-bg" v-if="state">
      <ul class="customer-left">
        <li v-for="(value,index) in pedestrianInData" :key="index">
          <customer-info :index="pedestrianInData.length -index" :detailInfo="value"></customer-info>
        </li>
      </ul>
      <ul class="customer-middle">
        <li class="customer-middle-top animation-lwh-show">
          <div>
            <img src="/static/img/in-img-1.png"/>
            <img src="/static/img/in-img-2.png"/>
            <img src="/static/img/in-img-3.png"/>
          </div>
        </li>
        <li class="customer-middle-center">
          <div><img src="/static/img/people-info.png"/></div>
        </li>
        <li class="customer-middle-bottom animation-lwh-show">
          <div>
            <img src="/static/img/out-img-1.png"/>
            <img src="/static/img/out-img-2.png"/>
            <img src="/static/img/out-img-3.png"/>
          </div>
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
  import {mapState} from 'vuex'
  import {eventObject} from '@/utils/event.js'

  export default {
    name: "console",
    components: {FlowInfo, AllTime, bar, pie, lineConsole, CustomerInfo},
    data() {
      return {
        state: false,    //是否有数据
        deviceKey: '',   //设备序列号
        pedestrianInData: [], //进客流
        pedestrianOutData: [], //出客流
        pieParams: {   //饼图
          type: 3,
          title: {text: '男女流量占比'},
          seriesData: [{value: 0, name: '男性占比'}, {value: 0, name: '女性占比'}],
          legendData: ['男性占比', '女性占比']
        },
        lineParams: { //线图
          title: {text: '客流量统计'}
        },
        outNumber: 0,   //出入数
        inNumber: 0,    //进入数
        ageBar: [0, 0, 0, 0, 0, 0],  //柱图
        websocket: null,
      }
    },
    methods: {
      selectGroupId() {
        eventObject().$emit('change', '快点操作啊！');
      },
      getwebsocket(data) {
        let me = this;
        let wsServer = 'ws://' + data + ':8083'; //服务器地址
        this.websocket = new WebSocket(wsServer);
        this.websocket.onopen = function (evt) {
          //已经建立连接
          me.websocket.send(me.deviceKey + '_channel');  //向服务器发送消息
          console.info("已经连接");
        };
        this.websocket.onmessage = function (evt) {
          //收到服务器消息，使用evt.data提取
          me.resolveDatad(evt.data);
        };
        this.websocket.onclose = function (evt) {
          console.info("已经关闭连接");
        };
        this.websocket.onerror = function (evt) {
          console.info("产生异常");
        };

      },
      resizeFunction() {
        let me = this;
        if (!me.$refs.bar) return;
        let consoleTimer = null;   //定时器
        if(consoleTimer){
          consoleTimer = null;
        }
        consoleTimer = setTimeout(()=> {
        let table = document.getElementById("echarts-bar");
        table.style.width = me.$refs.bar.offsetWidth + "px";
        table.style.height = me.$refs.bar.offsetHeight + "px";
        me.$refs.echartsBar.resizeEcharts();

        let tablePie = document.getElementById("echarts-pie");
        tablePie.style.width = me.$refs.pie.offsetWidth + "px";
        tablePie.style.height = me.$refs.pie.offsetHeight + "px";
        me.$refs.echartsPie.resizeEcharts();

        let tableLine = document.getElementById("echarts-line");
        tableLine.style.width = me.$refs.lineConsole.offsetWidth + "px";
        tableLine.style.height = me.$refs.lineConsole.offsetHeight + "px";
        me.$refs.echartsLine.resizeEcharts();
        },300)
      },
      //解析数据
      resolveDatad(data) {
        let obj = JSON.parse(data);
        //饼图 = 推送实时更新数据
        this.$set(this.pieParams.seriesData[0], "value", obj.male);
        this.$set(this.pieParams.seriesData[1], "value", obj.female);
        //饼图 = 数据更新
        if (!!this.$refs.echartsPie) {
          this.$refs.echartsPie.consoleEmit()
        }
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
        if (!pedestrian) return;
        if (pedestrian) {
          if (pedestrian.status == 0) { //进客
            this.pedestrianInData.length == 4 ? (this.pedestrianInData.pop() && this.pedestrianInData.unshift(pedestrian)) : this.pedestrianInData.unshift(pedestrian);
          } else if (pedestrian.status == 1) { //出客
            this.pedestrianOutData.length == 4 ? (this.pedestrianOutData.pop() && this.pedestrianOutData.unshift(pedestrian)) : this.pedestrianOutData.unshift(pedestrian);
          }
        }
      },
      //获取长连接ip（端口号：8083）
      getwebsocketIp() {
        this.$http('/getServiceIp', {}).then(res => {
          if (res.result == 1) {
            this.getwebsocket(res.data);
          }
        }).catch(error => {
          console.info(error);
        });
      },
      //请求数据
      getData() {
        this.$http('/personData', {
          deviceKey: this.deviceKey
        }).then(res => {
          if (res.result == 1) {
            if (!res.data || res.data.length == 0) {
              this.getwebsocketIp();
              this.resizeFunction();
              return;
            }
            this.resolveDatad(res.data);
            this.getwebsocketIp();
            this.resizeFunction();
          }
        }).catch(error => {
          this.resizeFunction();  //请求失败渲染默认数据
          console.info(error);
        });
      }
    },
    created() {
      eventObject().$on('resize-echarts-console', msg => { //eventObject接收事件  == 控制控制台的图表重置
        this.resizeFunction();
      });
    },
    mounted() {
      let me = this;
      window.addEventListener('resize', me.resizeFunction);
      if (this.$store.state.groupConsoleId != "") {
        this.deviceKey = this.$store.state.groupConsoleId;
        this.state = true;
        this.getData();
        //this.getwebsocketIp();
      }
    },
    computed: {
      ...mapState([
        'groupConsoleId'
      ])
    },
    watch: {
      //监听vuex groupConsoleId是否改变
      groupConsoleId(val) {
        if (!val || val == "") {
          this.state = false;
          return;
        }
        this.deviceKey = val;
        this.state = true;
        this.getData();
      }
    },
    beforeRouteLeave(to, from, next) {
      let me = this;
      //路由跳转后，不需要保存控制台的信息
      this.$store.dispatch('SET_GROUP_CONSOLEID');
      this.$store.dispatch('SET_GROUP_SELECT_ID');
      //解除绑定事件
      window.removeEventListener("resize", me.resizeFunction);
      eventObject().$off('resize-echarts-console');
      //关闭websocket链接
      if (!!this.websocket) {this.websocket.close()};
      next();
    }

  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .console-wrap {
    box-sizing: border-box;
    height: 100%;
    /*min-width: 1240px;*/
    background: #0F0E11;
    .tip {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      div {
        width: 720px;
        height: 110px;
        text-align: center;
        line-height: 110px;
        background: rgba(1, 8, 20, 0.10);
        border: 2px dashed rgba(151, 151, 151, 0.30);
        opacity: 0.5;
        font-size: 12px;
        color: #FFFFFF;
        cursor: pointer;
      }
    }
    .content-top {
      height: 72%;
      .content-top-left, .content-top-right {
        float: left;
      }
      .content-top-left {
        height: 100%;
        width: 60%;
        box-sizing: border-box;
        .left-ul {
          height: 31%;
          background-color: rgba(64, 58, 73, 0.30);
          box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.10);
          li {
            float: left;
          }
          li:nth-child(1) {
            width: 60%;
            height: 100%;
            box-sizing: border-box;
            padding: 20px;
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
          box-sizing: border-box;
        }
      }
      .content-top-right {
        height: 100%;
        margin-left: 10px;
        width: calc(40% - 10px);
        box-sizing: border-box;
        .pie-wrap {
          background-size: 28%;
        }
        .bottom-ul {
          height: 100%;
          li:nth-child(1) {
            height: 44%;
          }
          li:nth-child(2) {
            margin-top: 10px;
            height: calc(56% - 10px);
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
      background-color: rgba(64, 58, 73, 0.30);
      box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.10);
    }
    .customer-left {
      width: calc(50% - 170px);
      height: 100%;
      display: inline-block;
      li {
        float: right;
        width: 25%;
        height: 100%;
        /*background: url(/static/img/background-img-in.png) no-repeat center;*/
        /*background-size: 100% 100%;*/
        /*margin-right: 11px;*/
        padding-right: 10px;
        box-sizing: border-box;
        position: relative;
      }
    }
    .customer-middle {
      width: 320px;
      height: 100%;
      display: inline-block;
      position: relative;
      left: 8px;
      li {
        display: inline-block;
        height: 100%;
      }
      .customer-middle-top, .customer-middle-bottom {
        width: 40px;
        overflow: hidden;
      }
      .customer-middle-top {
        position: relative;
        right: 6px;
        div {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          img {
            width: 18px;
            position: absolute;
          }
          img:nth-child(1) {
            right: 0%;
          }
          img:nth-child(2) {
            right: 28%;
            width: 16px;
          }
          img:nth-child(3) {
            right: 58%;
            width: 14px;
          }
        }
      }
      .customer-middle-center {
        position: absolute;
        width: 230px;
        //  width: 72%;
        //  background: url(/static/img/people-info.png) no-repeat center;
        //  background-size: 100% 100%;
        div {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          img {
            width: 230px;
          }
        }

      }
      .customer-middle-bottom {
        position: absolute;
        left: 276px;
        div {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          img {
            width: 18px;
            position: absolute;
          }
          img:nth-child(1) {
            left: 0%;
          }
          img:nth-child(2) {
            left: 28%;
            width: 16px;
          }
          img:nth-child(3) {
            left: 58%;
            width: 14px;
          }
        }
      }

    }
    .customer-right {
      width: calc(50% - 170px);
      height: 100%;
      display: inline-block;
      float: right;
      li {
        float: left;
        width: 25%;
        height: 100%;
        /*background: url(/static/img/background-image.png) no-repeat center;*/
        /*background-size: 100% 100%;*/
        //margin-left: 11px;
        position: relative;
        padding-left: 10px;
        box-sizing: border-box;
      }
      &::after {
        content: '';
        width: 0;
        height: 0;
        clear: both;
      }
    }
    //动画效果
    .animation-lwh-show {
      position: relative;
      animation-name: skyset;
      animation-duration: 3000ms;
      animation-iteration-count: infinite; /*无限循环*/
      animation-timing-function: linear;
      @keyframes skyset {
        0% {
          opacity: 0.5;
        }
        25% {
          opacity: 0.25;
        }
        75% {
          opacity: 0.75;
        }
        100% {
          opacity: 1;
        }
      }
    }
  }
</style>
