<template>
  <div class="console-wrap" :style="{backgroundColor:!state?'':'#0F0E11' }">
    <ob-list-empty v-if="!state">
      <a href="javascript:void (0)" @click="selectGroupId">请选择您的社群和设备</a>
    </ob-list-empty>
    <div class="content-top" v-if="state">
      <div class="content-top-left">
        <ul class="left-ul">
          <li class="corner-bg">
            <p>客流汇总信息 </p>
            <flow-info :type="'left'" :number="inNumber" class="flow-left"></flow-info>
            <flow-info :type="'right'" :number="outNumber" class="flow-right"></flow-info>
          </li>
          <li class="corner-bg">
            <all-time class="li-all-time"></all-time>
          </li>
        </ul>
        <div class="left-div corner-bg" ref="lineConsole">
          <line-console ref="echartsLine" :line-params='lineParams'></line-console>
        </div>
      </div>
      <div class="content-top-right">
        <ul class="bottom-ul">
          <li ref='pie' class="corner-bg pie-background ">
            <pie ref="echartsPie" :pieParams="pieParams" class="pie-wrap-circle"></pie>
          </li>
          <li ref='bar' class="corner-bg">
            <bar ref="echartsBar" :ageBar="ageBar"></bar>
          </li>
        </ul>
      </div>
    </div>
    <div class="content-bottom corner-bg" v-if="state">
      <div class="customer-wrap">
        <transition-group name="list-customer" class="transition-wrap left" tag="ul">
          <li
            v-for="(item,$index) in pedestrianInData"
            :key="$index"
            class="list-customer-item"
          >
            <customer-info :index="pedestrianInData.length -$index" :detailInfo="item"></customer-info>
          </li>
        </transition-group>
      </div>
      <ul class="customer-middle">
        <li class="customer-middle-top animation-lwh-show">
        </li>
        <li class="customer-middle-center vam">
        </li>
        <li class="customer-middle-bottom animation-lwh-show">
        </li>
      </ul>
      <div class="customer-wrap">
        <transition-group name="list-customer" class="transition-wrap right" tag="ul">
          <li
            v-for="(item,$index) in pedestrianOutData"
            :key="$index"
            class="list-customer-item out-li"
          >
            <customer-info :index="pedestrianOutData.length -$index" :detailInfo="item"></customer-info>
          </li>
        </transition-group>
      </div>
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
  import { mapState } from 'vuex'
  import { eventObject } from '@/utils/event.js'

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
          seriesData: [{value: 0, name: '女'}, {value: 0, name: '男'}],
          //legendData: ['女', '男']
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
        let wsServer = 'ws://' + data; //服务器地址
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
        if (consoleTimer) {
          consoleTimer = null;
        }
        consoleTimer = setTimeout(() => {
          let table = document.getElementById("echarts-bar");
          table.style.width = me.$refs.bar.offsetWidth + "px";
          table.style.height = me.$refs.bar.offsetHeight + "px";
          me.$refs.echartsBar.resizeEcharts();

          let tablePie = document.getElementById("echarts-pie");
          tablePie.style.width = me.$refs.pie.offsetWidth + "px";
//          tablePie.style.height = me.$refs.pie.offsetHeight + "px";
          me.$refs.echartsPie.resizeEcharts();

          let tableLine = document.getElementById("echarts-line");
          tableLine.style.width = me.$refs.lineConsole.offsetWidth + "px";
          tableLine.style.height = me.$refs.lineConsole.offsetHeight + "px";
          me.$refs.echartsLine.resizeEcharts();
        }, 300)
      },
      //解析数据
      resolveDatad(data) {
        let obj = JSON.parse(data);
        //饼图 = 推送实时更新数据
        this.$set(this.pieParams.seriesData[0], "value", obj.female);
        this.$set(this.pieParams.seriesData[1], "value", obj.male);
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
        if(!pedestrian)return;
        let currentList = []; //进出客数据列表
        // status 0 进客 1 出客
        pedestrian.status?currentList = this.pedestrianOutData:currentList = this.pedestrianInData;
        // 过滤重复数据
        let last = currentList[currentList.length-1];
        if(last && (pedestrian.order==last.order)){
          return;
        }
        if(currentList.length>=4){
          currentList.splice(currentList.length-1,1)
        }
        currentList.unshift(pedestrian);
      },
      //获取长连接ip（端口号：8083）
      getwebsocketIp() {
        this.$http('/getServiceIp').then(res => {
          this.getwebsocket(res.data);
        }).catch(error => {
          console.info(error);
        });
      },
      //请求数据
      getData() {
        this.$http('/personData', {
          deviceKey: this.deviceKey
        }).then(res => {
          if(res.data && res.data.length){
            this.resolveDatad(res.data);  //假如没走这一步，当你更换设备时记录的是上一个设备的数据
          }else {
            this.defaultData();
          }
          this.getwebsocketIp();
          this.resizeFunction();
        }).catch(error => {
          this.resizeFunction();   //请求失败渲染默认数据
          console.info(error);
        });
      },
      //当请求数据为空时
      defaultData() {
        let params = {   //饼图
          type: 3,
            title: {text: '男女流量占比'},
           seriesData: [{value: 0, name: '女'}, {value: 0, name: '男'}],
        };
        this.pieParams = { ...params };
        this.lineParams = { //线图
          title: {text: '客流量统计'}
        };
        this.outNumber = 0;   //出入数
        this.inNumber = 0;    //进入数
        this.ageBar = [0, 0, 0, 0, 0, 0]; //柱图
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
      if (this.groupConsoleId != "") {
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
        this.pedestrianInData = [];
        this.pedestrianOutData = [];
        if (this.websocket) {
          this.websocket.close()
        }
        this.deviceKey = val;
        this.state = true;
        this.getData();
      }
    },
    beforeRouteLeave(to, from, next) {
      let me = this;
      //路由跳转后，不需要保存控制台的信息
      this.$store.commit('SET_GROUP_CONSOLE_ID');
      this.$store.commit('SET_GROUP_SELECT_ID');
      //解除绑定事件
      window.removeEventListener("resize", me.resizeFunction);
      eventObject().$off('resize-echarts-console');
      //关闭websocket链接
      if (!!this.websocket) {
        this.websocket.close()
      }
      next();
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .console-wrap {
    overflow: hidden;
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
          /*background-color: rgba(64, 58, 73, 0.30);*/
          /*box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.10);*/
          li {
            float: left;
            background-color: rgba(64, 58, 73, 0.30);
            box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.10);
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
          //background-size: 0%;
        }
        .pie-wrap-circle::before {
          content: '';
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0px;
          right: 0px;
          background: url('/static/img/pie-background3.png') no-repeat center center;
          background-size: 168px;
          animation-name: piepie;
          animation-duration: 10000ms;
          animation-iteration-count: infinite; /*无限循环*/
          animation-timing-function: linear;
          @keyframes piepie {
            0% {
              transform: rotate(0deg);
            }

            100% {
              transform: rotate(360deg);
            }
          }
        }
        .bottom-ul {
          height: 100%;
          li:nth-child(1) {
            //height: 44%;
          }
          li:nth-child(2) {
            margin-top: 10px;
            height:  calc(100% - 240px);//calc(56% - 10px);
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
      padding: 10px 20px;
      background-color: rgba(64, 58, 73, 0.30);
      box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.10);
    }
    .customer-wrap{
      display: inline-block;
      width: calc(50% - 170px);
      height: 100%;
      overflow: hidden;
      .transition-wrap {
        float: right;
        width: 125%;
        height: 100%;
        overflow: hidden;
        padding:10px 0;
        box-sizing: border-box;
        .list-customer-item{
          transition: all 1s;
          display: inline-block;
          float: right;
          width: 20%;
          height: 100%;
          padding-right: 10px;
          box-sizing: border-box;
          position: relative;
        }
        /* 保持左右间距对齐 */
        .out-li {
          padding-left: 10px;
          padding-right: 0px;
        }
        .list-customer-enter{
          opacity: 0;
          transform: translateX(100%);
        }
        &.right {
          float: left;
          li {
            float: left;
          }
          .list-customer-enter{
            opacity: 0;
            transform: translateX(-100%);
          }
        }
      }
    }

    .customer-middle {
      width: 320px;
      height: 100%;
      display: inline-block;
      position: relative;
      left: 8px;
      margin-right: 10px;  //保持两边的距离优雅
      li {
        display: inline-block;
        height: 100%;
      }

      .customer-middle-top, .customer-middle-bottom {
        width: 40px;
        overflow: hidden;
        background-repeat: no-repeat, no-repeat, no-repeat;
        background-position: 0 center, 10px center, 20px center;
        background-size: 14px auto, 16px auto, 18px auto;

      }
      .customer-middle-top {
        right: 6px;
        background-image: url("/static/img/in-img-3.png"), url("/static/img/in-img-2.png"), url("/static/img/in-img-1.png");
      }
      .customer-middle-center {
        position: absolute;
        width: 230px;
        background: url('/static/img/people-info.png') no-repeat center center;
        background-size: 100% auto;
        > img {
          width: 100%;
        }
      }
      .customer-middle-bottom {
        position: absolute;
        left: 276px;
        background-image: url("/static/img/out-img-1.png"), url("/static/img/out-img-2.png"), url("/static/img/out-img-3.png");
        background-position: 0 center, 12px center, 24px center;
        background-size: 18px auto, 16px auto, 14px auto;
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
